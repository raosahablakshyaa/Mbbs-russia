import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { universityAPI, uploadAPI } from '../../api'
import { FiUpload, FiX, FiSave } from 'react-icons/fi'

const initialForm = {
  name: '', slug: '', city: '', country: 'Russia', about: '', tuitionFees: '', hostelFees: '',
  totalFees: '', duration: '6 Years', medium: 'English', recognition: '', ranking: '',
  eligibility: '', admissionProcess: '', officialWebsite: '', googleMapsLink: '',
  youtubeLink: '', facilities: '', isActive: true,
}

export default function AddUniversity() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [bannerPreview, setBannerPreview] = useState('')

  useEffect(() => {
    if (id) {
      universityAPI.getAll().then(res => {
        const u = res.data.data?.find(x => x._id === id)
        if (u) {
          setForm({
            ...initialForm, ...u,
            recognition: Array.isArray(u.recognition) ? u.recognition.join(', ') : u.recognition || '',
            eligibility: Array.isArray(u.eligibility) ? u.eligibility.join('\n') : u.eligibility || '',
            admissionProcess: Array.isArray(u.admissionProcess) ? u.admissionProcess.join('\n') : u.admissionProcess || '',
            facilities: Array.isArray(u.facilities) ? u.facilities.join(', ') : u.facilities || '',
          })
          setBannerPreview(u.bannerImage || '')
        }
      }).catch(() => {})
    }
  }, [id])

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    if (name === 'name' && !id) {
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
      setForm(f => ({ ...f, bannerImage: res.data.url }))
      setBannerPreview(res.data.url)
      toast.success('Image uploaded!')
    } catch {
      toast.error('Upload failed. Using preview only.')
      setBannerPreview(URL.createObjectURL(file))
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.city || !form.tuitionFees) return toast.error('Fill required fields: Name, City, Fees')
    setLoading(true)
    try {
      const payload = {
        ...form,
        recognition: form.recognition.split(',').map(s => s.trim()).filter(Boolean),
        eligibility: form.eligibility.split('\n').map(s => s.trim()).filter(Boolean),
        admissionProcess: form.admissionProcess.split('\n').map(s => s.trim()).filter(Boolean),
        facilities: form.facilities.split(',').map(s => s.trim()).filter(Boolean),
        ranking: form.ranking ? Number(form.ranking) : undefined,
      }
      if (id) {
        await universityAPI.update(id, payload)
        toast.success('University updated!')
      } else {
        await universityAPI.create(payload)
        toast.success('University added!')
      }
      navigate('/admin/universities')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save')
    } finally {
      setLoading(false)
    }
  }

  const Field = ({ label, name, type = 'text', placeholder, required, rows, hint }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {rows ? (
        <textarea name={name} value={form[name]} onChange={handleChange} rows={rows} placeholder={placeholder} className="input-field resize-none text-sm" />
      ) : (
        <input name={name} value={form[name]} onChange={handleChange} type={type} placeholder={placeholder} required={required} className="input-field text-sm" />
      )}
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  )

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">{id ? 'Edit University' : 'Add University'}</h1>
        <p className="text-gray-500 text-sm">Fill in the university details below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-gray-900 dark:text-white">Basic Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="University Name" name="name" required placeholder="e.g. Tula State University" />
            <Field label="URL Slug" name="slug" placeholder="e.g. tula-state-university" hint="Auto-generated from name" />
            <Field label="City" name="city" required placeholder="e.g. Tula" />
            <Field label="Country" name="country" placeholder="Russia" />
            <Field label="Ranking" name="ranking" type="number" placeholder="e.g. 1" />
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} id="isActive" className="w-4 h-4 rounded" />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">Active (visible on website)</label>
            </div>
          </div>
          <Field label="About University" name="about" rows={4} placeholder="Describe the university..." />
        </div>

        {/* Fees */}
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-gray-900 dark:text-white">Fee Structure</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field label="Tuition Fees" name="tuitionFees" required placeholder="e.g. ₹3–4.5 Lakh/year" />
            <Field label="Hostel Fees" name="hostelFees" placeholder="e.g. ₹60,000/year" />
            <Field label="Total Fees" name="totalFees" placeholder="e.g. ₹3.6–5.1 Lakh/year" />
            <Field label="Duration" name="duration" placeholder="6 Years" />
            <Field label="Medium" name="medium" placeholder="English" />
          </div>
        </div>

        {/* Recognition & Details */}
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-gray-900 dark:text-white">Recognition & Details</h2>
          <Field label="Recognition (comma-separated)" name="recognition" placeholder="NMC Approved, WHO Listed, ECFMG Recognized" hint="Separate multiple recognitions with commas" />
          <Field label="Facilities (comma-separated)" name="facilities" placeholder="Modern Library, Advanced Labs, Sports Complex, Indian Canteen" />
          <Field label="Eligibility (one per line)" name="eligibility" rows={3} placeholder="NEET Qualified&#10;50% in PCB&#10;Age 17+" hint="Enter each requirement on a new line" />
          <Field label="Admission Process (one step per line)" name="admissionProcess" rows={4} placeholder="Submit online application&#10;Receive invitation letter&#10;Apply for student visa" hint="Enter each step on a new line" />
        </div>

        {/* Links */}
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-gray-900 dark:text-white">Links & Media</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Official Website" name="officialWebsite" placeholder="https://university.ru" />
            <Field label="YouTube Video Link" name="youtubeLink" placeholder="https://youtube.com/watch?v=..." />
            <Field label="Google Maps Link" name="googleMapsLink" placeholder="https://maps.google.com/..." />
          </div>

          {/* Banner Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Banner Image</label>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Paste image URL (https://...)"
                value={form.bannerImage || ''}
                onChange={e => {
                  const url = e.target.value
                  setForm(f => ({ ...f, bannerImage: url }))
                  if (url) setBannerPreview(url)
                }}
                onPaste={e => {
                  const url = e.clipboardData.getData('text')
                  setForm(f => ({ ...f, bannerImage: url }))
                  if (url) setBannerPreview(url)
                }}
                className="input-field text-sm"
              />
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                {bannerPreview ? (
                  <div className="relative inline-block">
                    <img src={bannerPreview} alt="Banner" className="h-32 rounded-lg object-cover" onError={(e) => {
                      e.target.style.display = 'none'
                      toast.error('Invalid image URL')
                    }} />
                    <button type="button" onClick={() => { setBannerPreview(''); setForm(f => ({ ...f, bannerImage: '' })) }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                      <FiX className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">{uploading ? 'Uploading...' : 'Click to upload banner image'}</p>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={loading}
            className="btn-primary flex items-center gap-2 disabled:opacity-60">
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiSave className="w-4 h-4" />}
            {loading ? 'Saving...' : id ? 'Update University' : 'Add University'}
          </button>
          <button type="button" onClick={() => navigate('/admin/universities')} className="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  )
}
