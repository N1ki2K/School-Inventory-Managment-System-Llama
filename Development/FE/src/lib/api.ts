const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

// API client
class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
  }

  // Inventory methods
  async getInventoryItems() {
    return this.request<InventoryItem[]>('/inventory')
  }

  async getInventoryItem(id: string) {
    return this.request<InventoryItem>(`/inventory/${id}`)
  }

  async createInventoryItem(data: Partial<InventoryItem>) {
    return this.request<InventoryItem>('/inventory', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateInventoryItem(id: string, data: Partial<InventoryItem>) {
    return this.request<InventoryItem>(`/inventory/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async updateInventoryStatus(id: string, status: string) {
    return this.request<InventoryItem>(`/inventory/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
  }

  async deleteInventoryItem(id: string) {
    return this.request<{ message: string }>(`/inventory/${id}`, {
      method: 'DELETE',
    })
  }

  // Auth methods
  async login(email: string, password: string) {
    return this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(email: string, name: string, password: string) {
    return this.request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, name, password }),
    })
  }

  async getCurrentUser(token: string) {
    return this.request<User>('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  // Requests methods
  async getRequests() {
    return this.request<Request[]>('/requests')
  }

  async createRequest(data: Partial<Request>) {
    return this.request<Request>('/requests', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateRequestStatus(id: string, status: string) {
    return this.request<Request>(`/requests/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
  }

  // Categories methods
  async getCategories() {
    return this.request<string[]>('/categories')
  }

  async createCategory(name: string) {
    return this.request<{ name: string }>('/categories', {
      method: 'POST',
      body: JSON.stringify({ name }),
    })
  }

  async deleteCategory(name: string) {
    return this.request<{ message: string }>(`/categories/${encodeURIComponent(name)}`, {
      method: 'DELETE',
    })
  }

  // Locations methods
  async getLocations() {
    return this.request<string[]>('/locations')
  }

  async createLocation(name: string) {
    return this.request<{ name: string }>('/locations', {
      method: 'POST',
      body: JSON.stringify({ name }),
    })
  }

  async deleteLocation(name: string) {
    return this.request<{ message: string }>(`/locations/${encodeURIComponent(name)}`, {
      method: 'DELETE',
    })
  }
}

// Types
export interface InventoryItem {
  id: string
  name: string
  category: string
  location: string
  status: string
  icon: string
  description?: string
  quantity: number
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  name: string
  role: string
}

export interface Request {
  id: string
  itemId: string
  itemName: string
  requestedBy: string
  status: string
  notes?: string
  createdAt: string
  updatedAt: string
}

// Export singleton instance
export const api = new ApiClient(API_BASE_URL)

