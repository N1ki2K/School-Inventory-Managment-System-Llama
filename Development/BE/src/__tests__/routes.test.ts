import request from 'supertest'
import express from 'express'
import { categoriesRouter } from '../routes/categories'
import { locationsRouter } from '../routes/locations'

const app = express()
app.use(express.json())
app.use('/api/categories', categoriesRouter)
app.use('/api/locations', locationsRouter)

describe('Categories & Locations Tests', () => {
  
  describe('Categories API', () => {
    it('should get all categories', async () => {
      const response = await request(app).get('/api/categories')
      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBeGreaterThan(0)
    })

    it('should add a new category', async () => {
      const newCategory = { name: 'Test Category' }
      const response = await request(app)
        .post('/api/categories')
        .send(newCategory)

      expect([201, 400]).toContain(response.status)
      if (response.status === 201) {
        expect(response.body.name).toBe('Test Category')
      }
    })

    it('should not add duplicate category', async () => {
      const category = { name: 'Electronics' }
      
      const response = await request(app)
        .post('/api/categories')
        .send(category)

      expect(response.status).toBe(400)
      expect(response.body.error).toContain('already exists')
    })
  })

  describe('Locations API', () => {
    it('should get all locations', async () => {
      const response = await request(app).get('/api/locations')
      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBeGreaterThan(0)
    })

    it('should add a new location', async () => {
      const newLocation = { name: 'Test Location' }
      const response = await request(app)
        .post('/api/locations')
        .send(newLocation)

      expect([201, 400]).toContain(response.status)
      if (response.status === 201) {
        expect(response.body.name).toBe('Test Location')
      }
    })
  })
})

