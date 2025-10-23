import { Link, useLocation } from 'react-router-dom'
import { School, Home, Package, FileText, BarChart3, Settings, Bell, User, Search } from 'lucide-react'
import { useState } from 'react'

export function Navigation() {
  const location = useLocation()
  const [searchOpen, setSearchOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/inventory', label: 'Inventory', icon: Package },
    { path: '/requests', label: 'Requests', icon: FileText },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
      <div className="flex h-20 items-center justify-between px-8 max-w-7xl mx-auto">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
          <div className="relative">
            <School className="h-12 w-12 text-blue-600" strokeWidth={2} />
            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-gray-900">School</span>
            <span className="text-sm font-semibold text-blue-600">Inventory</span>
            <span className="text-xs font-medium text-gray-600">Management System</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all relative group ${
                location.pathname === path
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
              {location.pathname === path && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-blue-600 rounded-t-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-gray-900">Admin User</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
            <button className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-semibold hover:shadow-lg transition-all">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar (Expandable) */}
      {searchOpen && (
        <div className="border-t border-gray-200 bg-gray-50 px-8 py-4">
          <div className="max-w-7xl mx-auto">
            <input
              type="text"
              placeholder="Search inventory, requests, reports..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              autoFocus
            />
          </div>
        </div>
      )}
    </nav>
  )
}
