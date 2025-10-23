import { useEffect, useState } from 'react'
import { InventorySidebar } from '../components/InventorySidebar'
import { InventoryList } from '../components/InventoryList'
import { AddItemModal } from '../components/AddItemModal'
import { api, type InventoryItem } from '../lib/api'

export function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('All')

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
    setShowAddModal(true)
  }

  const handleRequestItem = () => {
    console.log('Request item clicked')
    // TODO: Open request modal
  }

  // Filter items based on search and status
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await api.updateInventoryStatus(id, status)
      await loadItems() // Reload items
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  return (
    <>
      <div className="flex h-[calc(100vh-64px)] bg-gray-50">
        <InventorySidebar 
          onAddItem={handleAddItem}
          onRequestItem={handleRequestItem}
          onFilterChange={setFilterStatus}
          currentFilter={filterStatus}
        />
        <InventoryList 
          items={filteredItems.map(item => ({
            id: item.id,
            name: item.name,
            status: item.status as 'Available' | 'In Use' | 'Needs Repair',
            icon: item.icon as any
          }))}
          loading={loading}
          onStatusChange={handleStatusChange}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      <AddItemModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadItems}
      />
    </>
  )
}

