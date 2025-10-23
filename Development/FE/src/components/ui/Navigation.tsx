import { Link, useLocation } from 'react-router-dom'
import { School, Menu } from 'lucide-react'

export function Navigation() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/inventory', label: 'Inventory' },
    { path: '/requests', label: 'Requests' },
    { path: '/reports', label: 'Reports' },
    { path: '/settings', label: 'Settings' },
  ]

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-8">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <School className="h-10 w-10 text-blue-600" strokeWidth={2} />
          <div className="flex flex-col text-sm font-medium leading-tight text-black">
            <div>School</div>
            <div>Inventory</div>
            <div>Management</div>
            <div>System</div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`text-base font-medium transition-colors relative pb-1 ${
                location.pathname === path
                  ? 'text-black'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {label}
              {location.pathname === path && (
                <div className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </Link>
          ))}
          <button className="text-gray-600 hover:text-black transition-colors">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  )
}
