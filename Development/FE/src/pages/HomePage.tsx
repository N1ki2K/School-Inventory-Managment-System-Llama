import { useEffect, useState } from 'react'
import { Package, Users, MapPin, BarChart3, Settings } from 'lucide-react'
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
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg animate-pulse">
          <h1 className="text-4xl font-bold mb-2">Loading...</h1>
          <p className="text-blue-100 text-lg">Please wait while we fetch your data</p>
        </div>
      </div>
    )
  }

  const recentItems = items.slice(0, 3)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Welcome Back! 👋</h1>
        <p className="text-blue-100 text-lg">
          Here's what's happening with your school inventory today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }, index) => (
          <div
            key={label}
            className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
              </div>
              <div className={`p-4 rounded-xl ${color} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${color.includes('blue') ? 'bg-blue-600' : color.includes('green') ? 'bg-green-600' : color.includes('purple') ? 'bg-purple-600' : 'bg-orange-600'}`}
                  style={{ width: `${Math.min((parseInt(value) / Math.max(totalItems, 1)) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Items */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Package className="h-5 w-5 mr-2 text-blue-600" />
              Recent Items
            </h3>
            <a href="/inventory" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All →
            </a>
          </div>
          <div className="space-y-4">
            {recentItems.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No items yet</p>
            ) : (
              recentItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    item.status === 'Available' ? 'bg-green-100 text-green-600' :
                    item.status === 'In Use' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                  }`}>
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.location}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.status === 'Available' ? 'bg-green-100 text-green-800' :
                    item.status === 'In Use' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Quick Actions
          </h3>
          <div className="space-y-3">
            <a 
              href="/inventory" 
              className="flex items-center justify-between w-full px-4 py-4 text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all shadow-sm hover:shadow-md group"
            >
              <span className="flex items-center">
                <Package className="h-5 w-5 mr-3" />
                Add New Item
              </span>
              <span className="text-blue-200 group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a 
              href="/reports" 
              className="flex items-center justify-between w-full px-4 py-4 text-sm font-medium bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-lg transition-all group"
            >
              <span className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-3 text-gray-600" />
                Generate Report
              </span>
              <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a 
              href="/settings" 
              className="flex items-center justify-between w-full px-4 py-4 text-sm font-medium bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-lg transition-all group"
            >
              <span className="flex items-center">
                <Settings className="h-5 w-5 mr-3 text-gray-600" />
                Manage Categories
              </span>
              <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
