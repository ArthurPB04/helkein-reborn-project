
import React from 'react';
import PostCard from './PostCard';

// Example post data
const samplePosts = [
  {
    id: '1',
    title: 'Desenvolvimento Fullstack com React e Node.js',
    slug: 'desenvolvimento-fullstack-react-nodejs',
    excerpt: 'Uma introdução às tecnologias modernas para desenvolvimento fullstack usando React e Node.js.',
    publishedAt: '2023-05-15T10:30:00Z',
    isPaid: false,
    categories: ['Programação', 'Web'],
    author: {
      name: 'João Silva',
      avatar: '/placeholder.svg',
    }
  },
  {
    id: '2',
    title: 'Dominando TypeScript em 2023',
    slug: 'dominando-typescript-2023',
    excerpt: 'Aprenda os recursos mais recentes do TypeScript e como aplicá-los em seus projetos.',
    publishedAt: '2023-06-20T14:15:00Z',
    isPaid: true,
    categories: ['TypeScript', 'Programação'],
    author: {
      name: 'Maria Oliveira',
      avatar: '/placeholder.svg',
    }
  },
  {
    id: '3',
    title: 'Estratégias Avançadas de SEO para Desenvolvedores',
    slug: 'estrategias-avancadas-seo-desenvolvedores',
    excerpt: 'Como otimizar seus sites para mecanismos de busca diretamente no código.',
    publishedAt: '2023-07-05T09:45:00Z',
    isPaid: false,
    categories: ['SEO', 'Marketing'],
    author: {
      name: 'Pedro Santos',
      avatar: '/placeholder.svg',
    }
  }
];

interface PostListProps {
  filterCategory?: string;
}

const PostList: React.FC<PostListProps> = ({ filterCategory }) => {
  // Filter posts by category if filterCategory is provided
  const posts = filterCategory
    ? samplePosts.filter(post => post.categories.some(cat => 
        cat.toLowerCase() === filterCategory.toLowerCase()
      ))
    : samplePosts;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostList;
