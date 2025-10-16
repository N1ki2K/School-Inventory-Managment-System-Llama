import { Package, Users, BarChart3, Settings } from 'lucide-react'

export function HomePage() {
  const stats = [
    { label: 'Total Items', value: '1,234', icon: Package },
    { label: 'Active Users', value: '45', icon: Users },
    { label: 'Categories', value: '12', icon: BarChart3 },
    { label: 'Locations', value: '8', icon: Settings },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the School Inventory Management System2
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {label}
                </p>
                <p className="text-2xl font-bold">{value}</p>
              </div>
              <Icon className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <span className="text-sm">New item added: Laptop Dell XPS 13</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-blue-500 rounded-full" />
              <span className="text-sm">Item updated: Projector Epson</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-yellow-500 rounded-full" />
              <span className="text-sm">Maintenance due: Printer HP</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 text-sm bg-accent rounded-md hover:bg-accent/80">
              Add New Item
            </button>
            <button className="w-full text-left px-4 py-2 text-sm bg-accent rounded-md hover:bg-accent/80">
              Generate Report
            </button>
            <button className="w-full text-left px-4 py-2 text-sm bg-accent rounded-md hover:bg-accent/80">
              Manage Categories
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
