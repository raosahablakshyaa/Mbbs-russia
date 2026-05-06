import { useState } from 'react'
import { useAuth } from '../../context'
import toast from 'react-hot-toast'
import api from '../../api'
import { FiSave, FiUser, FiLock } from 'react-icons/fi'

export default function AdminSettings() {
  const { admin, login } = useAuth()
  const [profile, setProfile] = useState({ name: admin?.name || '', email: admin?.email || '' })
  const [password, setPassword] = useState({ current: '', newPass: '', confirm: '' })
  const [saving, setSaving] = useState(false)

  const handleProfileSave = async e => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await api.put('/auth/profile', profile)
      login({ ...admin, ...res.data })
      toast.success('Profile updated!')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordSave = async e => {
    e.preventDefault()
    if (password.newPass !== password.confirm) return toast.error('Passwords do not match')
    if (password.newPass.length < 6) return toast.error('Password must be at least 6 characters')
    setSaving(true)
    try {
      await api.put('/auth/password', { currentPassword: password.current, newPassword: password.newPass })
      toast.success('Password changed!')
      setPassword({ current: '', newPass: '', confirm: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-black text-gray-900 dark:text-white">Settings</h1>

      {/* Profile */}
      <div className="card p-6">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FiUser className="text-blue-600" /> Profile Settings
        </h2>
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
            <input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} className="input-field text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
            <input value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} type="email" className="input-field text-sm" />
          </div>
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 text-sm disabled:opacity-60">
            <FiSave className="w-4 h-4" /> Save Profile
          </button>
        </form>
      </div>

      {/* Password */}
      <div className="card p-6">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FiLock className="text-blue-600" /> Change Password
        </h2>
        <form onSubmit={handlePasswordSave} className="space-y-4">
          {[
            { label: 'Current Password', key: 'current' },
            { label: 'New Password', key: 'newPass' },
            { label: 'Confirm New Password', key: 'confirm' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{f.label}</label>
              <input type="password" value={password[f.key]} onChange={e => setPassword(p => ({ ...p, [f.key]: e.target.value }))} className="input-field text-sm" />
            </div>
          ))}
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 text-sm disabled:opacity-60">
            <FiSave className="w-4 h-4" /> Change Password
          </button>
        </form>
      </div>
    </div>
  )
}
