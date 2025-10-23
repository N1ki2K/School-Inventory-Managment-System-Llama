import { useEffect, useState } from 'react'
import { Plus, Check, X } from 'lucide-react'
import { api, type Request } from '../lib/api'

export function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewRequest, setShowNewRequest] = useState(false)
  const [newRequest, setNewRequest] = useState({
    itemName: '',
    requestedBy: '',
    notes: '',
  })

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = async () => {
    try {
      setLoading(true)
      const data = await api.getRequests()
      setRequests(data)
    } catch (error) {
      console.error('Failed to load requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.createRequest({
        itemId: '0', // TODO: Select from inventory
        itemName: newRequest.itemName,
        requestedBy: newRequest.requestedBy,
        notes: newRequest.notes,
      })
      setShowNewRequest(false)
      setNewRequest({ itemName: '', requestedBy: '', notes: '' })
      loadRequests()
    } catch (error) {
      console.error('Failed to create request:', error)
    }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.updateRequestStatus(id, status)
      loadRequests()
    } catch (error) {
      console.error('Failed to update request:', error)
    }
  }

  const getStatusColor = (status: string) => {
    if (status === 'Approved') return 'bg-green-100 text-green-800'
    if (status === 'Rejected') return 'bg-red-100 text-red-800'
    return 'bg-yellow-100 text-yellow-800'
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-black">Requests</h1>
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
          <p className="text-gray-500">Loading requests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Requests</h1>
          <p className="text-gray-600 mt-2">Manage inventory requests</p>
        </div>
        <button
          onClick={() => setShowNewRequest(!showNewRequest)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          New Request
        </button>
      </div>

      {showNewRequest && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Create New Request</h3>
          <form onSubmit={handleCreateRequest} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Item Name</label>
              <input
                type="text"
                required
                value={newRequest.itemName}
                onChange={(e) => setNewRequest({ ...newRequest, itemName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="What item do you need?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Requested By</label>
              <input
                type="text"
                required
                value={newRequest.requestedBy}
                onChange={(e) => setNewRequest({ ...newRequest, requestedBy: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Notes (Optional)</label>
              <textarea
                value={newRequest.notes}
                onChange={(e) => setNewRequest({ ...newRequest, notes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={3}
                placeholder="Any additional details..."
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowNewRequest(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="border-b">
                <th className="text-left p-4 font-medium text-gray-700">Item</th>
                <th className="text-left p-4 font-medium text-gray-700">Requested By</th>
                <th className="text-left p-4 font-medium text-gray-700">Status</th>
                <th className="text-left p-4 font-medium text-gray-700">Date</th>
                <th className="text-left p-4 font-medium text-gray-700">Notes</th>
                <th className="text-left p-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No requests yet. Create your first request!
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr key={request.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium text-black">{request.itemName}</td>
                    <td className="p-4 text-gray-600">{request.requestedBy}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-gray-600 max-w-xs truncate">
                      {request.notes || '-'}
                    </td>
                    <td className="p-4">
                      {request.status === 'Pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateStatus(request.id, 'Approved')}
                            className="p-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded"
                            title="Approve"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(request.id, 'Rejected')}
                            className="p-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded"
                            title="Reject"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
