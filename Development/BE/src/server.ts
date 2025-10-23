import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { inventoryRouter } from './routes/inventory.js'
import { authRouter } from './routes/auth.js'
import { requestRouter } from './routes/requests.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}))
app.use(express.json())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/inventory', inventoryRouter)
app.use('/api/requests', requestRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'School Inventory API is running!' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📊 API available at http://localhost:${PORT}/api`)
})

