import { Projector, Laptop, Highlighter, UsbIcon, Mouse, Briefcase, Package, Search } from 'lucide-react'

interface InventoryItem {
  id: string
  name: string
  status: 'Available' | 'In Use' | 'Needs Repair'
  icon: 'projector' | 'laptop' | 'markers' | 'usb' | 'mouse' | 'briefcase' | 'package'
}

const iconMap = {
  projector: Projector,
  laptop: Laptop,
  markers: Highlighter,
  usb: UsbIcon,
  mouse: Mouse,
  briefcase: Briefcase,
  package: Package,
}

interface InventoryListProps {
  items?: InventoryItem[]
  loading?: boolean
  onStatusChange?: (id: string, status: string) => void
  searchTerm?: string
  onSearchChange?: (term: string) => void
}

const defaultItems: InventoryItem[] = [
  { id: '1', name: 'Projector', status: 'Available', icon: 'projector' },
  { id: '2', name: 'Laptop', status: 'In Use', icon: 'laptop' },
  { id: '3', name: 'Markers', status: 'Needs Repair', icon: 'markers' },
  { id: '4', name: 'USB Drive', status: 'Available', icon: 'usb' },
  { id: '5', name: 'Mouse', status: 'Available', icon: 'mouse' },
  { id: '6', name: 'Mouse', status: 'Available', icon: 'briefcase' },
]

export function InventoryList({ items = defaultItems, loading = false, onStatusChange, searchTerm = '', onSearchChange }: InventoryListProps) {
  const getActionButton = (item: InventoryItem) => {
    const { id, status } = item
    
    if (status === 'Available') {
      return (
        <button 
          onClick={() => onStatusChange?.(id, 'In Use')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Check Out
        </button>
      )
    }
    if (status === 'In Use') {
      return (
        <button 
          onClick={() => onStatusChange?.(id, 'Available')}
          className="bg-white hover:bg-gray-50 text-black px-6 py-2 rounded-lg border border-gray-300 text-sm font-medium transition-colors"
        >
          Return
        </button>
      )
    }
    if (status === 'Needs Repair') {
      return (
        <button 
          onClick={() => onStatusChange?.(id, 'Available')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Return
        </button>
      )
    }
    return (
      <button className="bg-white hover:bg-gray-50 text-black px-6 py-2 rounded-lg border border-gray-300 text-sm font-medium transition-colors">
        Check
      </button>
    )
  }

  const getStatusColor = (status: string) => {
    if (status === 'Available') return 'text-black'
    if (status === 'In Use') return 'text-black'
    if (status === 'Needs Repair') return 'text-red-600 font-medium'
    return 'text-black'
  }

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 overflow-auto">
        <div className="p-8 max-w-7xl">
          <h1 className="text-3xl font-semibold text-black mb-8">School Inventory</h1>
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Loading items...</p>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex-1 bg-gray-50 overflow-auto">
        <div className="p-8 max-w-7xl">
          <h1 className="text-3xl font-semibold text-black mb-8">School Inventory</h1>
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No items found. Start the backend server and seed the database!</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-8 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-black">School Inventory</h1>
          
          {/* Search Bar */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          {/* Header */}
          <div className="grid grid-cols-[60px_1fr_150px_150px] gap-4 px-4 py-3 mb-2">
            <div className="text-sm font-medium text-gray-600">Item</div>
            <div></div>
            <div className="text-sm font-medium text-gray-600">Status</div>
            <div></div>
          </div>

          {/* Items */}
          <div className="space-y-2">
            {items.map((item) => {
              const Icon = iconMap[item.icon] || Mouse
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-[60px_1fr_150px_150px] gap-4 items-center px-4 py-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                    <Icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <div className="text-lg font-normal text-black">{item.name}</div>
                  <div className={`text-base ${getStatusColor(item.status)}`}>
                    {item.status}
                  </div>
                  <div className="flex justify-end">
                    {getActionButton(item)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
