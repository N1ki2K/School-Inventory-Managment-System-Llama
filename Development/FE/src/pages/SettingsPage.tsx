import { useState, useEffect } from 'react'
import { User, MapPin, Tag, Bell, Shield } from 'lucide-react'
import { api } from '../lib/api'

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [categories, setCategories] = useState<string[]>([])
  const [locations, setLocations] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState('')
  const [newLocation, setNewLocation] = useState('')

  useEffect(() => {
    if (activeTab === 'categories') {
      loadCategories()
    } else if (activeTab === 'locations') {
      loadLocations()
    }
  }, [activeTab])

  const loadCategories = async () => {
    try {
      const data = await api.getCategories()
      setCategories(data)
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const loadLocations = async () => {
    try {
      const data = await api.getLocations()
      setLocations(data)
    } catch (error) {
      console.error('Failed to load locations:', error)
    }
  }

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategory.trim()) return
    try {
      await api.createCategory(newCategory)
      setNewCategory('')
      loadCategories()
    } catch (error) {
      console.error('Failed to add category:', error)
      alert('Failed to add category')
    }
  }

  const handleDeleteCategory = async (name: string) => {
    if (!confirm(`Delete category "${name}"?`)) return
    try {
      await api.deleteCategory(name)
      loadCategories()
    } catch (error) {
      console.error('Failed to delete category:', error)
    }
  }

  const handleAddLocation = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLocation.trim()) return
    try {
      await api.createLocation(newLocation)
      setNewLocation('')
      loadLocations()
    } catch (error) {
      console.error('Failed to add location:', error)
      alert('Failed to add location')
    }
  }

  const handleDeleteLocation = async (name: string) => {
    if (!confirm(`Delete location "${name}"?`)) return
    try {
      await api.deleteLocation(name)
      loadLocations()
    } catch (error) {
      console.error('Failed to delete location:', error)
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black">Settings</h1>
        <p className="text-gray-600 mt-2">Configure system settings and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Sidebar */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <nav className="space-y-1">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="md:col-span-3 bg-white rounded-lg border border-gray-200 p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-black">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Admin User"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue="admin@school.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Role</label>
                  <input
                    type="text"
                    value="Administrator"
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-black">Manage Categories</h2>
              <div className="space-y-3">
                {categories.map(cat => (
                  <div key={cat} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="text-gray-700">{cat}</span>
                    <button 
                      onClick={() => handleDeleteCategory(cat)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <form onSubmit={handleAddCategory} className="flex gap-3">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Add Category
                </button>
              </form>
            </div>
          )}

          {activeTab === 'locations' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-black">Manage Locations</h2>
              <div className="space-y-3">
                {locations.map(loc => (
                  <div key={loc} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="text-gray-700">{loc}</span>
                    <button 
                      onClick={() => handleDeleteLocation(loc)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <form onSubmit={handleAddLocation} className="flex gap-3">
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="New location name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Add Location
                </button>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-black">Notification Preferences</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Email notifications for new requests</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Notify when items need repair</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Daily inventory summary</span>
                </label>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-black">Security Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
