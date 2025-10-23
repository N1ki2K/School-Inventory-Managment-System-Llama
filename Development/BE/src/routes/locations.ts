import { Router, type Router as RouterType } from 'express'

const router: RouterType = Router()

// In-memory storage for now
let locations = [
  'Computer Lab A',
  'Computer Lab B',
  'Classroom 101',
  'Main Office',
  'Storage Room',
  'IT Department'
]

// Get all locations
router.get('/', (_req, res) => {
  res.json(locations)
})

// Add location
router.post('/', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ error: 'Location name is required' })
  }
  if (locations.includes(name)) {
    return res.status(400).json({ error: 'Location already exists' })
  }
  locations.push(name)
  return res.status(201).json({ name })
})

// Delete location
router.delete('/:name', (req, res) => {
  const { name } = req.params
  const index = locations.indexOf(decodeURIComponent(name))
  if (index === -1) {
    return res.status(404).json({ error: 'Location not found' })
  }
  locations.splice(index, 1)
  return res.json({ message: 'Location deleted successfully' })
})

export { router as locationsRouter }

