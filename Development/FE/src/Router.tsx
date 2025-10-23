import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { InventoryPage } from './pages/InventoryPage' // Fixed import path
import { RequestsPage } from './pages/RequestsPage'
import { ReportsPage } from './pages/ReportsPage'
import { SettingsPage } from './pages/SettingsPage'
import { Layout } from './components/ui/Layout'

export function Router() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Layout>
  )
}
