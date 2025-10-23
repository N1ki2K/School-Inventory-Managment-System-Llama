import { Router, type Router as RouterType } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router: RouterType = Router()
const prisma = new PrismaClient()

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, name, password } = req.body
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'user'
      }
    })
    
    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    )
    
    return res.status(201).json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token
    })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to register user' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.password)
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    )
    
    return res.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token
    })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to login' })
  }
})

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true, role: true }
    })
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    return res.json(user)
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
})

export { router as authRouter }

