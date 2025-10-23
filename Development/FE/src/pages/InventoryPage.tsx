import { useEffect, useState } from 'react'
import { InventorySidebar } from '../components/InventorySidebar'
import { InventoryList } from '../components/InventoryList'
import { api, type InventoryItem } from '../lib/api'

export function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      setLoading(true)
      const data = await api.getInventoryItems()
      setItems(data)
    } catch (error) {
      console.error('Failed to load items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddItem = () => {
    console.log('Add item clicked')
    // TODO: Open modal to add item
  }

  const handleRequestItem = () => {
    console.log('Request item clicked')
    // TODO: Open modal to request item
  }

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await api.updateInventoryStatus(id, status)
      await loadItems() // Reload items
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50">
      <InventorySidebar 
        onAddItem={handleAddItem}
        onRequestItem={handleRequestItem}
      />
      <InventoryList 
        items={items.map(item => ({
          id: item.id,
          name: item.name,
          status: item.status as 'Available' | 'In Use' | 'Needs Repair',
          icon: item.icon as any
        }))}
        loading={loading}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}

