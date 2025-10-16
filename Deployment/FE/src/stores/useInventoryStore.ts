import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface InventoryItem {
  id: number
  name: string
  category: string
  location: string
  status: 'Available' | 'In Use' | 'Maintenance' | 'Out of Service'
  lastUpdated: string
  description?: string
  serialNumber?: string
  purchaseDate?: string
  warrantyExpiry?: string
}

interface InventoryState {
  items: InventoryItem[]
  searchTerm: string
  selectedCategory: string
  selectedStatus: string
  isLoading: boolean
  error: string | null
}

interface InventoryActions {
  setItems: (items: InventoryItem[]) => void
  addItem: (item: Omit<InventoryItem, 'id'>) => void
  updateItem: (id: number, updates: Partial<InventoryItem>) => void
  deleteItem: (id: number) => void
  setSearchTerm: (term: string) => void
  setSelectedCategory: (category: string) => void
  setSelectedStatus: (status: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearFilters: () => void
}

export const useInventoryStore = create<InventoryState & InventoryActions>()(
  devtools(
    (set, get) => ({
      // State
      items: [],
      searchTerm: '',
      selectedCategory: '',
      selectedStatus: '',
      isLoading: false,
      error: null,

      // Actions
      setItems: (items) => set({ items }),
      
      addItem: (item) => {
        const newItem: InventoryItem = {
          ...item,
          id: Math.max(...get().items.map(i => i.id), 0) + 1,
        }
        set((state) => ({ items: [...state.items, newItem] }))
      },
      
      updateItem: (id, updates) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        }))
      },
      
      deleteItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },
      
      setSearchTerm: (term) => set({ searchTerm: term }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setSelectedStatus: (status) => set({ selectedStatus: status }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      
      clearFilters: () => {
        set({
          searchTerm: '',
          selectedCategory: '',
          selectedStatus: '',
        })
      },
    }),
    {
      name: 'inventory-store',
    }
  )
)
