import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { universityAPI } from '../../api'
import toast from 'react-hot-toast'
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi'

export default function ManageUniversities() {
  const [universities, setUniversities] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState(null)

  const load = () => {
    universityAPI.getAll()
      .then(res => setUniversities(res.data.data || []))
      .catch(() => setUniversities([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return
    setDeleting(id)
    try {
      await universityAPI.delete(id)
      toast.success('University deleted')
      setUniversities(prev => prev.filter(u => u._id !== id))
    } catch {
      toast.error('Failed to delete')
    } finally {
      setDeleting(null)
    }
  }

  const filtered = universities.filter(u => u.name?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Universities</h1>
          <p className="text-gray-500 text-sm">{universities.length} universities</p>
        </div>
        <Link to="/admin/universities/add" className="btn-primary flex items-center gap-2 text-sm">
          <FiPlus className="w-4 h-4" /> Add University
        </Link>
      </div>

      <div className="card p-4">
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search universities..."
            className="input-field pl-10 py-2.5 text-sm" />
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-3">🏫</div>
            <p>No universities found. <Link to="/admin/universities/add" className="text-blue-600 hover:underline">Add one</Link></p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  {['University', 'City', 'Fees/Year', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.map(u => (
                  <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 overflow-hidden">
                          {u.bannerImage ? <img src={u.bannerImage} alt="" className="w-full h-full object-cover" /> : u.name?.[0]}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm">{u.name}</div>
                          <div className="text-xs text-gray-500">{u.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-sm text-gray-600 dark:text-gray-400">{u.city}</td>
                    <td className="py-3 px-3 text-sm font-semibold text-green-600">{u.tuitionFees}</td>
                    <td className="py-3 px-3">
                      <span className={`badge ${u.isActive !== false ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                        {u.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <Link to={`/admin/universities/edit/${u._id}`}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                          <FiEdit2 className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(u._id, u.name)} disabled={deleting === u._id}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50">
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
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
