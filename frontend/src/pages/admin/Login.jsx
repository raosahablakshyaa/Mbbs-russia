import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { authAPI } from '../../api'
import { useAuth } from '../../context'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authAPI.login(form)
      login(res.data)
      toast.success('Welcome back!')
      navigate('/admin')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <img src="https://as2.ftcdn.net/jpg/06/98/84/79/1000_F_698847976_0djgwN06xjaCZKpWHWVFnAdQKFhRfhCo.webp" alt="KelMedica" className="w-16 h-16 rounded-full object-cover mx-auto mb-4" />
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">KelMedica Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                type="email" placeholder="admin@mbbsrussiaguide.com" required className="input-field pl-10" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                type={showPass ? 'text' : 'password'} placeholder="••••••••" required className="input-field pl-10 pr-10" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-xs text-gray-500 mt-6">Default: admin@mbbsrussiaguide.com / admin123</p>
      </motion.div>
    </div>
  )
}
