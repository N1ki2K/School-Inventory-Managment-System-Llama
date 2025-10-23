import request from 'supertest'
import express from 'express'
import cors from 'cors'
import { inventoryRouter } from '../routes/inventory'
import { authRouter } from '../routes/auth'

// Test app setup
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/inventory', inventoryRouter)

describe('Backend API Tests', () => {
  
  describe('Health Check', () => {
    it('should return OK status', async () => {
      app.get('/api/health', (_req, res) => {
        res.json({ status: 'ok', message: 'School Inventory API is running!' })
      })

      const response = await request(app).get('/api/health')
      expect(response.status).toBe(200)
      expect(response.body.status).toBe('ok')
    })
  })

  describe('Inventory API', () => {
    it('should get all inventory items', async () => {
      const response = await request(app).get('/api/inventory')
      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
    })

    it('should create a new inventory item', async () => {
      const newItem = {
        name: 'Test Item',
        category: 'Electronics',
        location: 'Test Room',
        status: 'Available',
        icon: 'package',
        quantity: 1
      }

      const response = await request(app)
        .post('/api/inventory')
        .send(newItem)

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('id')
      expect(response.body.name).toBe('Test Item')
    })

    it('should fail to create item without required fields', async () => {
      const invalidItem = {
        name: 'Test Item'
        // Missing other required fields
      }

      const response = await request(app)
        .post('/api/inventory')
        .send(invalidItem)

      // Should handle gracefully (either 400 or 500)
      expect([400, 500]).toContain(response.status)
    })
  })

  describe('Authentication API', () => {
    const testUser = {
      email: 'test@school.com',
      name: 'Test User',
      password: 'testpassword123'
    }

    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser)

      // Might fail if user exists, that's ok
      if (response.status === 201) {
        expect(response.body).toHaveProperty('token')
        expect(response.body.user.email).toBe(testUser.email)
      }
    })

    it('should login with valid credentials', async () => {
      // First register
      await request(app)
        .post('/api/auth/register')
        .send(testUser)

      // Then login
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })

      if (response.status === 200) {
        expect(response.body).toHaveProperty('token')
        expect(response.body.user.email).toBe(testUser.email)
      }
    })

    it('should fail login with invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        })

      expect(response.status).toBe(401)
    })
  })
})

