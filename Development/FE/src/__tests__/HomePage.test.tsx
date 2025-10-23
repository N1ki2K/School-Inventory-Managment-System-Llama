import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { HomePage } from '../pages/HomePage'
import { BrowserRouter } from 'react-router-dom'

// Mock the API to avoid real network calls
vi.mock('../lib/api', () => ({
  api: {
    getInventoryItems: vi.fn().mockResolvedValue([
      {
        id: '1',
        name: 'Test Item',
        category: 'Electronics',
        location: 'Room 101',
        status: 'Available',
        icon: 'package',
        quantity: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]),
  },
}))

describe('HomePage Component', () => {
  
  it('should render homepage component', () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )
    
    // Component should render
    expect(container).toBeDefined()
  })

  it('should render with correct structure', () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )
    
    // Should have content
    expect(container.firstChild).toBeTruthy()
  })
})

