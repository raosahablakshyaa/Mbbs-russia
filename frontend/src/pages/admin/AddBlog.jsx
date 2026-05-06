import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { blogAPI, uploadAPI } from '../../api'
import { FiSave, FiUpload, FiX } from 'react-icons/fi'

const categories = ['Fees', 'Universities', 'Comparison', 'Exams', 'Visa', 'Life in Russia', 'General']

const initialForm = {
  title: '', slug: '', excerpt: '', content: '', category: '', readTime: '',
  metaTitle: '', metaDescription: '', isPublished: false, featuredImage: '',
}

export default function AddBlog() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [imgPreview, setImgPreview] = useState('')

  useEffect(() => {
    if (id) {
      blogAPI.getAll().then(res => {
        const b = res.data.data?.find(x => x._id === id)
        if (b) { setForm({ ...initialForm, ...b }); setImgPreview(b.featuredImage || '') }
      }).catch(() => {})
    }
  }, [id])

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    if (name === 'title' && !id) {
      setForm(f => ({ ...f, slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }))
    }
  }

  const handleImageUpload = async e => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await uploadAPI.upload(fd)
      setForm(f => ({ ...f, featuredImage: res.data.url }))
      setImgPreview(res.data.url)
      toast.success('Image uploaded!')
    } catch {
      setImgPreview(URL.createObjectURL(file))
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.title || !form.content) return toast.error('Title and content are required')
    setLoading(true)
    try {
      if (id) {
        await blogAPI.update(id, form)
        toast.success('Blog updated!')
      } else {
        await blogAPI.create(form)
        toast.success('Blog published!')
      }
      navigate('/admin/blogs')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">{id ? 'Edit Blog' : 'Add Blog'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-gray-900 dark:text-white">Blog Details</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required placeholder="Blog title..." className="input-field text-sm" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">URL Slug</label>
              <input name="slug" value={form.slug} onChange={handleChange} placeholder="blog-url-slug" className="input-field text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="input-field text-sm">
                <option value="">Select Category</option>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Read Time</label>
              <input name="readTime" value={form.readTime} onChange={handleChange} placeholder="e.g. 5 min" className="input-field text-sm" />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} id="isPublished" className="w-4 h-4 rounded" />
              <label htmlFor="isPublished" className="text-sm font-medium text-gray-700 dark:text-gray-300">Publish immediately</label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Excerpt</label>
            <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} placeholder="Short description for blog listing..." className="input-field resize-none text-sm" />
          </div>
        </div>

        {/* Featured Image */}
        <div className="card p-6">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Featured Image</h2>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
            {imgPreview ? (
              <div className="relative inline-block">
                <img src={imgPreview} alt="Featured" className="h-40 rounded-lg object-cover" />
                <button type="button" onClick={() => { setImgPreview(''); setForm(f => ({ ...f, featuredImage: '' })) }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center">
                  <FiX className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">{uploading ? 'Uploading...' : 'Click to upload featured image'}</p>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="card p-6">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Content *</h2>
          <textarea name="content" value={form.content} onChange={handleChange} rows={16}
            placeholder="Write your blog content here... You can use HTML tags for formatting."
            className="input-field resize-none text-sm font-mono" required />
          <p className="text-xs text-gray-500 mt-2">Supports HTML formatting: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, etc.</p>
        </div>

        {/* SEO */}
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-gray-900 dark:text-white">SEO Settings</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Meta Title</label>
            <input name="metaTitle" value={form.metaTitle} onChange={handleChange} placeholder="SEO title (60 chars max)" className="input-field text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Meta Description</label>
            <textarea name="metaDescription" value={form.metaDescription} onChange={handleChange} rows={2} placeholder="SEO description (160 chars max)" className="input-field resize-none text-sm" />
          </div>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 disabled:opacity-60">
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiSave className="w-4 h-4" />}
            {loading ? 'Saving...' : id ? 'Update Blog' : 'Publish Blog'}
          </button>
          <button type="button" onClick={() => navigate('/admin/blogs')} className="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  )
}
