import { useState } from 'react'
import { Plus, Search, Filter } from 'lucide-react'

export function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - replace with actual data fetching
  const inventoryItems = [
    {
      id: 1,
      name: 'Dell Laptop XPS 13',
      category: 'Electronics',
      location: 'Computer Lab A',
      status: 'Available',
      lastUpdated: '2024-01-15',
    },
    {
      id: 2,
      name: 'Epson Projector',
      category: 'Audio/Visual',
      location: 'Classroom 101',
      status: 'In Use',
      lastUpdated: '2024-01-14',
    },
    {
      id: 3,
      name: 'HP LaserJet Printer',
      category: 'Office Equipment',
      location: 'Main Office',
      status: 'Maintenance',
      lastUpdated: '2024-01-13',
    },
    {
      id: 4,
      name: 'marian',
      category: 'Office Equipment',
      location: 'Main Office',
      status: 'Debel',
      lastUpdated: '2007-01-13',
    },
  ]

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">
            Manage your school's inventory items
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          <span>Add Item</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-input rounded-md hover:bg-accent">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">Name</th>
                <th className="text-left p-4 font-medium">Category</th>
                <th className="text-left p-4 font-medium">Location</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Last Updated</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/50">
                  <td className="p-4 font-medium">{item.name}</td>
                  <td className="p-4 text-muted-foreground">{item.category}</td>
                  <td className="p-4 text-muted-foreground">{item.location}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Available'
                          ? 'bg-green-100 text-green-800'
                          : item.status === 'In Use'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">{item.lastUpdated}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-primary hover:text-primary/80 text-sm">
                        Edit
                      </button>
                      <button className="text-destructive hover:text-destructive/80 text-sm">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
