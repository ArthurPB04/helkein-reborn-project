
import express from 'express';
import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware to check if user is authenticated
const isAuthenticated = (req: any, res: any, next: any) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Não autenticado' });
  }
  next();
};

// Middleware to check if user is admin
const isAdmin = async (req: any, res: any, next: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    });
    
    if (user?.role !== 'Admin') {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    
    next();
  } catch (error) {
    console.error('Admin check error:', error);
    return res.status(500).json({ error: 'Erro ao verificar permissões' });
  }
};

// Get all posts (with pagination)
router.get('/', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const [posts, totalPosts] = await Promise.all([
      prisma.post.findMany({
        skip,
        take: limit,
        where: {
          publishedAt: {
            not: null
          }
        },
        include: {
          author: {
            select: {
              id: true,
              nickname: true
            }
          },
          categories: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },
          _count: {
            select: {
              comments: true
            }
          }
        },
        orderBy: {
          publishedAt: 'desc'
        }
      }),
      prisma.post.count({
        where: {
          publishedAt: {
            not: null
          }
        }
      })
    ]);
    
    return res.json({
      posts,
      pagination: {
        total: totalPosts,
        pages: Math.ceil(totalPosts / limit),
        page,
        limit
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    return res.status(500).json({ error: 'Erro ao buscar posts' });
  }
});

// Get a single post by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = (req as any).userId;
    
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            nickname: true
          }
        },
        categories: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }
    
    // Check if post is paid and user has access
    if (post.isPaid) {
      // If not authenticated
      if (!userId) {
        return res.status(401).json({
          error: 'Conteúdo premium. Por favor, faça login.',
          post: {
            ...post,
            content: null // Don't send content for paid posts to non-authenticated users
          }
        });
      }
      
      // Check user role
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      
      // If not admin or subscriber, deny access to paid content
      if (user && user.role !== 'Admin' && user.role !== 'Assinante') {
        return res.status(403).json({
          error: 'Conteúdo exclusivo para assinantes',
          post: {
            ...post,
            content: null // Don't send content for paid posts to non-subscribers
          }
        });
      }
    }
    
    return res.json({ post });
  } catch (error) {
    console.error('Get post error:', error);
    return res.status(500).json({ error: 'Erro ao buscar post' });
  }
});

// Create a new post (admin only)
router.post('/', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { title, content, excerpt, isPaid, categoryIds } = req.body;
    
    // Generate slug from title
    let slug = slugify(title, { lower: true });
    
    // Check if slug already exists
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    });
    
    // If slug exists, append a random string
    if (existingPost) {
      const randomStr = Math.random().toString(36).substring(2, 8);
      slug = `${slug}-${randomStr}`;
    }
    
    // Create post
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        isPaid: isPaid || false,
        publishedAt: new Date(),
        authorId: (req as any).userId,
        categories: {
          connect: categoryIds?.map((id: string) => ({ id })) || []
        }
      },
      include: {
        author: {
          select: {
            id: true,
            nickname: true
          }
        },
        categories: true
      }
    });
    
    return res.status(201).json({ post });
  } catch (error) {
    console.error('Create post error:', error);
    return res.status(500).json({ error: 'Erro ao criar post' });
  }
});

// Update a post (admin only)
router.put('/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, isPaid, categoryIds, publishedAt } = req.body;
    
    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id }
    });
    
    if (!existingPost) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }
    
    // Generate a new slug if title changed
    let slug = existingPost.slug;
    if (title && title !== existingPost.title) {
      slug = slugify(title, { lower: true });
      
      // Check if new slug already exists (except for this post)
      const slugExists = await prisma.post.findFirst({
        where: {
          slug,
          id: { not: id }
        }
      });
      
      // If slug exists, append a random string
      if (slugExists) {
        const randomStr = Math.random().toString(36).substring(2, 8);
        slug = `${slug}-${randomStr}`;
      }
    }
    
    // Update post
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt,
        isPaid: isPaid !== undefined ? isPaid : undefined,
        publishedAt,
        categories: categoryIds ? {
          set: [],  // Remove existing connections
          connect: categoryIds.map((id: string) => ({ id }))
        } : undefined
      },
      include: {
        author: {
          select: {
            id: true,
            nickname: true
          }
        },
        categories: true
      }
    });
    
    return res.json({ post });
  } catch (error) {
    console.error('Update post error:', error);
    return res.status(500).json({ error: 'Erro ao atualizar post' });
  }
});

// Delete a post (admin only)
router.delete('/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id }
    });
    
    if (!existingPost) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }
    
    // Delete post
    await prisma.post.delete({
      where: { id }
    });
    
    return res.json({ message: 'Post excluído com sucesso' });
  } catch (error) {
    console.error('Delete post error:', error);
    return res.status(500).json({ error: 'Erro ao excluir post' });
  }
});

export default router;
