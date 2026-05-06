import { useEffect, useState } from 'react'
import { testimonialAPI } from '../../api'
import toast from 'react-hot-toast'
import { FiPlus, FiTrash2, FiEdit2, FiSave, FiX } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'

const empty = { name: '', university: '', year: '', message: '', rating: 5 }

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  const load = () => {
    testimonialAPI.getAll()
      .then(res => setTestimonials(res.data.data || []))
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.message) return toast.error('Name and message required')
    setSaving(true)
    try {
      if (editing) {
        await testimonialAPI.update(editing, form)
        toast.success('Updated!')
      } else {
        await testimonialAPI.create(form)
        toast.success('Added!')
      }
      load()
      setForm(empty)
      setEditing(null)
      setShowForm(false)
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = t => {
    setForm({ name: t.name, university: t.university, year: t.year, message: t.message, rating: t.rating || 5 })
    setEditing(t._id)
    setShowForm(true)
  }

  const handleDelete = async id => {
    if (!window.confirm('Delete this testimonial?')) return
    try {
      await testimonialAPI.delete(id)
      setTestimonials(prev => prev.filter(t => t._id !== id))
      toast.success('Deleted')
    } catch {
      toast.error('Failed')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Testimonials</h1>
        <button onClick={() => { setShowForm(!showForm); setEditing(null); setForm(empty) }}
          className="btn-primary flex items-center gap-2 text-sm">
          <FiPlus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="card p-6">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">{editing ? 'Edit' : 'Add'} Testimonial</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Student Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Student name" required className="input-field text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">University</label>
                <input value={form.university} onChange={e => setForm(f => ({ ...f, university: e.target.value }))} placeholder="University name" className="input-field text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Year</label>
                <input value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} placeholder="e.g. 3rd Year" className="input-field text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Rating</label>
                <select value={form.rating} onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))} className="input-field text-sm">
                  {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message *</label>
              <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={3} placeholder="Student testimonial..." required className="input-field resize-none text-sm" />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 text-sm disabled:opacity-60">
                <FiSave className="w-4 h-4" /> {saving ? 'Saving...' : editing ? 'Update' : 'Add'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); setForm(empty) }} className="btn-secondary text-sm flex items-center gap-2">
                <FiX className="w-4 h-4" /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          [...Array(4)].map((_, i) => <div key={i} className="card p-6 h-40 animate-pulse bg-gray-100 dark:bg-gray-800" />)
        ) : testimonials.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-gray-500 card p-6">
            <div className="text-4xl mb-3">⭐</div>
            <p>No testimonials yet.</p>
          </div>
        ) : (
          testimonials.map(t => (
            <div key={t._id} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} className={`w-3.5 h-3.5 ${i < (t.rating || 5) ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(t)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <FiEdit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(t._id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3 line-clamp-3">"{t.message}"</p>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</div>
                <div className="text-xs text-gray-500">{t.university} {t.year && `• ${t.year}`}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
