import { Package, Users, BarChart3, MapPin } from 'lucide-react'

export function HomePage() {
  const stats = [
    { label: 'Total Items', value: '156', icon: Package, color: 'bg-blue-50 text-blue-600' },
    { label: 'Available', value: '89', icon: Package, color: 'bg-green-50 text-green-600' },
    { label: 'In Use', value: '45', icon: Users, color: 'bg-purple-50 text-purple-600' },
    { label: 'Locations', value: '12', icon: MapPin, color: 'bg-orange-50 text-orange-600' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to the School Inventory Management System
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {label}
                </p>
                <p className="text-3xl font-bold text-black mt-2">{value}</p>
              </div>
              <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-black mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 bg-green-500 rounded-full mt-2" />
              <div>
                <p className="text-sm text-black font-medium">New item added</p>
                <p className="text-sm text-gray-500">Laptop Dell XPS 13 - 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <p className="text-sm text-black font-medium">Item checked out</p>
                <p className="text-sm text-gray-500">Projector Epson - 4 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 bg-yellow-500 rounded-full mt-2" />
              <div>
                <p className="text-sm text-black font-medium">Maintenance needed</p>
                <p className="text-sm text-gray-500">Printer HP - 1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-black mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 text-sm font-medium bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-black">
              Add New Item
            </button>
            <button className="w-full text-left px-4 py-3 text-sm font-medium bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-black">
              Generate Report
            </button>
            <button className="w-full text-left px-4 py-3 text-sm font-medium bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-black">
              View All Requests
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
