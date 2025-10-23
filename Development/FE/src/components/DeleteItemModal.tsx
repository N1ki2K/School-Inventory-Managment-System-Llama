import { X } from 'lucide-react'

interface DeleteItemModalProps {
  isOpen: boolean
  itemName: string
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
}

export function DeleteItemModal({ isOpen, itemName, onClose, onConfirm, loading }: DeleteItemModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-black">Delete Item</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-gray-700 mb-6">
          Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

