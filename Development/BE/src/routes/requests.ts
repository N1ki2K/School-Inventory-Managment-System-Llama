import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Get all requests
router.get('/', async (req, res) => {
  try {
    const requests = await prisma.request.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(requests)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests' })
  }
})

// Create new request
router.post('/', async (req, res) => {
  try {
    const { itemId, itemName, requestedBy, notes } = req.body
    
    const request = await prisma.request.create({
      data: {
        itemId,
        itemName,
        requestedBy,
        notes,
        status: 'Pending'
      }
    })
    res.status(201).json(request)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create request' })
  }
})

// Update request status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    
    const request = await prisma.request.update({
      where: { id: req.params.id },
      data: { status }
    })
    res.json(request)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update request' })
  }
})

// Delete request
router.delete('/:id', async (req, res) => {
  try {
    await prisma.request.delete({
      where: { id: req.params.id }
    })
    res.json({ message: 'Request deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete request' })
  }
})

export { router as requestRouter }

