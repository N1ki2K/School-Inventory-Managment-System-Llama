import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await prisma.inventoryItem.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(items)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory items' })
  }
})

// Get single item
router.get('/:id', async (req, res) => {
  try {
    const item = await prisma.inventoryItem.findUnique({
      where: { id: req.params.id }
    })
    if (!item) {
      return res.status(404).json({ error: 'Item not found' })
    }
    res.json(item)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch item' })
  }
})

// Create new item
router.post('/', async (req, res) => {
  try {
    const { name, category, location, status, icon, description, quantity } = req.body
    
    const item = await prisma.inventoryItem.create({
      data: {
        name,
        category,
        location,
        status: status || 'Available',
        icon: icon || 'package',
        description,
        quantity: quantity || 1
      }
    })
    res.status(201).json(item)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' })
  }
})

// Update item
router.put('/:id', async (req, res) => {
  try {
    const { name, category, location, status, icon, description, quantity } = req.body
    
    const item = await prisma.inventoryItem.update({
      where: { id: req.params.id },
      data: {
        ...(name && { name }),
        ...(category && { category }),
        ...(location && { location }),
        ...(status && { status }),
        ...(icon && { icon }),
        ...(description !== undefined && { description }),
        ...(quantity !== undefined && { quantity })
      }
    })
    res.json(item)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' })
  }
})

// Delete item
router.delete('/:id', async (req, res) => {
  try {
    await prisma.inventoryItem.delete({
      where: { id: req.params.id }
    })
    res.json({ message: 'Item deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' })
  }
})

// Update item status (check out / return)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    
    const item = await prisma.inventoryItem.update({
      where: { id: req.params.id },
      data: { status }
    })
    res.json(item)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' })
  }
})

export { router as inventoryRouter }

