import { ChevronRight } from 'lucide-react'

interface InventorySidebarProps {
  onAddItem?: () => void
  onRequestItem?: () => void
}

export function InventorySidebar({ onAddItem, onRequestItem }: InventorySidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 space-y-6 flex-shrink-0">
      {/* Category Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-black">Category</h3>
        
        <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
          <span>Room</span>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      {/* Status Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-black">Status</h3>
        
        <div className="space-y-2">
          <div className="text-sm text-gray-700 cursor-pointer hover:text-black">All</div>
          <div className="text-sm text-gray-700 cursor-pointer hover:text-black">Available</div>
          <div className="text-sm text-gray-700 cursor-pointer hover:text-black">Needs Repair</div>
        </div>
      </div>

      {/* Add Item Section */}
      <div className="pt-6 border-t border-gray-200 space-y-3">
        <div className="text-sm font-semibold text-black">Add item</div>
        
        <button
          onClick={onAddItem}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
        >
          Add Item
        </button>
        
        <button
          onClick={onRequestItem}
          className="w-full bg-white hover:bg-gray-50 text-black font-medium py-2.5 px-4 rounded-lg border border-gray-300 transition-colors"
        >
          Request item
        </button>
      </div>
    </div>
  )
}
