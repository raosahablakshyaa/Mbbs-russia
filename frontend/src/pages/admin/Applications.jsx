import { useEffect, useState } from 'react'
import { applicationAPI } from '../../api'
import toast from 'react-hot-toast'
import { FiSearch, FiTrash2, FiDownload, FiFilter } from 'react-icons/fi'

const STATUS_COLORS = {
  New: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
  Contacted: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600',
  Processing: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
  Admitted: 'bg-green-100 dark:bg-green-900/30 text-green-600',
}

export default function Applications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const load = () => {
    applicationAPI.getAll()
      .then(res => setApplications(res.data.data || []))
      .catch(() => setApplications([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    try {
      await applicationAPI.updateStatus(id, status)
      setApplications(prev => prev.map(a => a._id === id ? { ...a, status } : a))
      toast.success('Status updated')
    } catch {
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return
    try {
      await applicationAPI.delete(id)
      setApplications(prev => prev.filter(a => a._id !== id))
      toast.success('Deleted')
    } catch {
      toast.error('Failed to delete')
    }
  }

  const filtered = applications.filter(a => {
    const matchSearch = a.fullName?.toLowerCase().includes(search.toLowerCase()) || a.email?.toLowerCase().includes(search.toLowerCase()) || a.phone?.includes(search)
    const matchStatus = statusFilter === 'All' || a.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Student Applications</h1>
          <p className="text-gray-500 text-sm">{applications.length} total applications</p>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="relative flex-1 min-w-48">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, phone..."
              className="input-field pl-10 py-2.5 text-sm w-full" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field py-2.5 text-sm w-auto">
            {['All', 'New', 'Contacted', 'Processing', 'Admitted'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-3">📋</div>
            <p>No applications found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  {['Student', 'Phone', 'NEET Score', 'University', 'Status', 'Date', 'Actions'].map(h => (
                    <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.map(app => (
                  <tr key={app._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-medium text-gray-900 dark:text-white text-sm">{app.fullName}</div>
                      <div className="text-xs text-gray-500">{app.email}</div>
                    </td>
                    <td className="py-3 px-3 text-sm text-gray-600 dark:text-gray-400">{app.phone}</td>
                    <td className="py-3 px-3 text-sm font-semibold text-gray-900 dark:text-white">{app.neetScore || '—'}</td>
                    <td className="py-3 px-3 text-sm text-gray-600 dark:text-gray-400 max-w-[150px] truncate">{app.preferredUniversity || '—'}</td>
                    <td className="py-3 px-3">
                      <select value={app.status || 'New'} onChange={e => updateStatus(app._id, e.target.value)}
                        className={`text-xs font-semibold px-2 py-1 rounded-lg border-0 cursor-pointer ${STATUS_COLORS[app.status || 'New']}`}>
                        {['New', 'Contacted', 'Processing', 'Admitted'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="py-3 px-3 text-xs text-gray-500">{new Date(app.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="py-3 px-3">
                      <button onClick={() => handleDelete(app._id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
