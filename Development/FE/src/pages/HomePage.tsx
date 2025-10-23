import { useEffect, useState } from 'react'
import { Package, Users, MapPin } from 'lucide-react'
import { api, type InventoryItem } from '../lib/api'

export function HomePage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      const data = await api.getInventoryItems()
      setItems(data)
    } catch (error) {
      console.error('Failed to load items:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalItems = items.length
  const availableItems = items.filter(i => i.status === 'Available').length
  const inUseItems = items.filter(i => i.status === 'In Use').length
  const uniqueLocations = new Set(items.map(i => i.location)).size

  const stats = [
    { label: 'Total Items', value: totalItems.toString(), icon: Package, color: 'bg-blue-50 text-blue-600' },
    { label: 'Available', value: availableItems.toString(), icon: Package, color: 'bg-green-50 text-green-600' },
    { label: 'In Use', value: inUseItems.toString(), icon: Users, color: 'bg-purple-50 text-purple-600' },
    { label: 'Locations', value: uniqueLocations.toString(), icon: MapPin, color: 'bg-orange-50 text-orange-600' },
  ]

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <p className="text-gray-600 mt-2">Loading...</p>
        </div>
      </div>
    )
  }

  const recentItems = items.slice(0, 3)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to the School Inventory Management System
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {label}
                </p>
                <p className="text-3xl font-bold text-black mt-2">{value}</p>
              </div>
              <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-black mb-4">Recent Items</h3>
          <div className="space-y-4">
            {recentItems.map(item => (
              <div key={item.id} className="flex items-start space-x-3">
                <div className={`h-2 w-2 rounded-full mt-2 ${
                  item.status === 'Available' ? 'bg-green-500' :
                  item.status === 'In Use' ? 'bg-blue-500' : 'bg-red-500'
                }`} />
                <div>
                  <p className="text-sm text-black font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.status} - {item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-black mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 text-sm font-medium bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-black">
              Add New Item
            </button>
            <button className="w-full text-left px-4 py-3 text-sm font-medium bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-black">
              Generate Report
            </button>
            <button className="w-full text-left px-4 py-3 text-sm font-medium bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-black">
              View All Requests
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
