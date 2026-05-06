import { useEffect, useState } from 'react'
import { contactAPI } from '../../api'
import toast from 'react-hot-toast'
import { FiTrash2, FiCheckCircle, FiSearch } from 'react-icons/fi'

export default function ContactQueries() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    contactAPI.getAll()
      .then(res => setContacts(res.data.data || []))
      .catch(() => setContacts([]))
      .finally(() => setLoading(false))
  }, [])

  const markReplied = async id => {
    try {
      await contactAPI.markReplied(id)
      setContacts(prev => prev.map(c => c._id === id ? { ...c, replied: true } : c))
      toast.success('Marked as replied')
    } catch { toast.error('Failed') }
  }

  const handleDelete = async id => {
    if (!window.confirm('Delete this query?')) return
    try {
      await contactAPI.delete(id)
      setContacts(prev => prev.filter(c => c._id !== id))
      toast.success('Deleted')
    } catch { toast.error('Failed') }
  }

  const filtered = contacts.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Contact Queries</h1>
        <p className="text-gray-500 text-sm">{contacts.filter(c => !c.replied).length} unread queries</p>
      </div>

      <div className="card p-4">
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search queries..."
            className="input-field pl-10 py-2.5 text-sm" />
        </div>

        {loading ? (
          <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-3">📬</div>
            <p>No contact queries.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(c => (
              <div key={c._id} className={`card p-4 ${!c.replied ? 'border-l-4 border-blue-500' : 'opacity-70'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">{c.name}</span>
                      {!c.replied && <span className="badge bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-xs">New</span>}
                      {c.replied && <span className="badge bg-green-100 dark:bg-green-900/30 text-green-600 text-xs">Replied</span>}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{c.email} {c.phone && `• ${c.phone}`} • {new Date(c.createdAt).toLocaleDateString('en-IN')}</div>
                    {c.subject && <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{c.subject}</div>}
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{c.message}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {!c.replied && (
                      <button onClick={() => markReplied(c._id)} className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors" title="Mark as replied">
                        <FiCheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => handleDelete(c._id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
