
import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, nickname, password } = req.body;
    
    // Check if email or nickname already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { nickname }
        ]
      }
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        error: 'Email ou nome de usuário já está em uso' 
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        nickname,
        password: hashedPassword,
        role: 'Membro'
      },
      select: {
        id: true,
        email: true,
        nickname: true,
        role: true,
        createdAt: true
      }
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );
    
    return res.json({
      user,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      error: 'Erro ao registrar usuário' 
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Credenciais inválidas' 
      });
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Credenciais inválidas' 
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );
    
    return res.json({
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        role: user.role,
        createdAt: user.createdAt
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      error: 'Erro ao realizar login' 
    });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    // JWT verification would happen in a middleware
    const userId = (req as any).userId;
    
    if (!userId) {
      return res.status(401).json({ 
        error: 'Não autenticado' 
      });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        nickname: true,
        role: true,
        createdAt: true
      }
    });
    
    if (!user) {
      return res.status(404).json({ 
        error: 'Usuário não encontrado' 
      });
    }
    
    return res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({ 
      error: 'Erro ao buscar usuário' 
    });
  }
});

export default router;
