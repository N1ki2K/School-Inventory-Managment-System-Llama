import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { InventoryPage } from './pages/InventoryPage'
import { Layout } from './components/ui/Layout'

export function Router() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
    </Layout>
  )
}
