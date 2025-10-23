import { Router, type Router as RouterType } from 'express'

const router: RouterType = Router()

// In-memory storage for now (you can add to Prisma schema later)
let categories = [
  'Electronics',
  'Office Supplies',
  'Furniture',
  'Audio/Visual',
  'Sports Equipment',
  'Other'
]

// Get all categories
router.get('/', (_req, res) => {
  res.json(categories)
})

// Add category
router.post('/', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ error: 'Category name is required' })
  }
  if (categories.includes(name)) {
    return res.status(400).json({ error: 'Category already exists' })
  }
  categories.push(name)
  return res.status(201).json({ name })
})

// Delete category
router.delete('/:name', (req, res) => {
  const { name } = req.params
  const index = categories.indexOf(name)
  if (index === -1) {
    return res.status(404).json({ error: 'Category not found' })
  }
  categories.splice(index, 1)
  return res.json({ message: 'Category deleted successfully' })
})

export { router as categoriesRouter }

