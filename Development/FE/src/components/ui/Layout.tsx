import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Navigation } from './Navigation'
import { Github, Heart } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const isInventoryPage = location.pathname === '/inventory'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 flex flex-col">
      <Navigation />
      <main className={isInventoryPage ? 'flex-1' : 'container mx-auto px-6 py-8 max-w-7xl flex-1'}>
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">About</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                School Inventory Management System helps you track and manage all your school's inventory items efficiently.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Dashboard</a></li>
                <li><a href="/inventory" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Inventory</a></li>
                <li><a href="/requests" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Requests</a></li>
                <li><a href="/reports" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Reports</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-1 text-sm text-gray-600 mb-4 sm:mb-0">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for Education</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <span className="text-sm text-gray-600">© 2025 School Inventory System</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
