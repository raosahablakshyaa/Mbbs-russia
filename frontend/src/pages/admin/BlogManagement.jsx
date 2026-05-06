import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogAPI } from '../../api'
import toast from 'react-hot-toast'
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi'

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    blogAPI.getAll()
      .then(res => setBlogs(res.data.data || []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return
    try {
      await blogAPI.delete(id)
      setBlogs(prev => prev.filter(b => b._id !== id))
      toast.success('Blog deleted')
    } catch {
      toast.error('Failed to delete')
    }
  }

  const filtered = blogs.filter(b => b.title?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Blog Management</h1>
          <p className="text-gray-500 text-sm">{blogs.length} articles</p>
        </div>
        <Link to="/admin/blogs/add" className="btn-primary flex items-center gap-2 text-sm">
          <FiPlus className="w-4 h-4" /> Add Blog
        </Link>
      </div>

      <div className="card p-4">
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search blogs..."
            className="input-field pl-10 py-2.5 text-sm" />
        </div>

        {loading ? (
          <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-14 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-3">📝</div>
            <p>No blogs yet. <Link to="/admin/blogs/add" className="text-blue-600 hover:underline">Write one</Link></p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  {['Title', 'Category', 'Status', 'Date', 'Actions'].map(h => (
                    <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.map(blog => (
                  <tr key={blog._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1 max-w-xs">{blog.title}</div>
                      <div className="text-xs text-gray-500">{blog.slug}</div>
                    </td>
                    <td className="py-3 px-3">
                      {blog.category && <span className="badge bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-xs">{blog.category}</span>}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`badge text-xs ${blog.isPublished ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                        {blog.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-xs text-gray-500">{new Date(blog.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <Link to={`/admin/blogs/edit/${blog._id}`} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                          <FiEdit2 className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(blog._id, blog.title)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
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
