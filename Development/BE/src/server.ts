import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { inventoryRouter } from './routes/inventory.js'
import { authRouter } from './routes/auth.js'
import { requestRouter } from './routes/requests.js'
import { categoriesRouter } from './routes/categories.js'
import { locationsRouter } from './routes/locations.js'

dotenv.config()

const app = express()
const PORT = parseInt(process.env.PORT || '3001', 10)

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
app.use('/api/categories', categoriesRouter)
app.use('/api/locations', locationsRouter)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'School Inventory API is running!' })
})

// Start server
const HOST = process.env.HOST || '0.0.0.0' // Bind to all interfaces for external access
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`)
  console.log(`📊 API available at http://${HOST}:${PORT}/api`)
  console.log(`🌍 Accessible from network: http://<your-ip>:${PORT}`)
})

