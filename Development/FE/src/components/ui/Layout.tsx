import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Navigation } from './Navigation'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const isInventoryPage = location.pathname === '/inventory'

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className={isInventoryPage ? '' : 'container mx-auto px-6 py-8 max-w-7xl'}>
        {children}
      </main>
    </div>
  )
}
