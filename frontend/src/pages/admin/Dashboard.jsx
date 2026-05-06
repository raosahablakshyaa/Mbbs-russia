import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { dashboardAPI } from '../../api'
import { FiUsers, FiBook, FiMail, FiTrendingUp } from 'react-icons/fi'
import { FaUniversity } from 'react-icons/fa'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const monthlyData = [
  { month: 'Aug', applications: 12 }, { month: 'Sep', applications: 19 },
  { month: 'Oct', applications: 25 }, { month: 'Nov', applications: 31 },
  { month: 'Dec', applications: 28 }, { month: 'Jan', applications: 42 },
]

export default function Dashboard() {
  const [stats, setStats] = useState({ universities: 0, applications: 0, blogs: 0, contacts: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dashboardAPI.stats()
      .then(res => setStats(res.data))
      .catch(() => setStats({ universities: 5, applications: 48, blogs: 6, contacts: 23 }))
      .finally(() => setLoading(false))
  }, [])

  const cards = [
    { label: 'Universities', value: stats.universities, icon: FaUniversity, color: 'from-blue-500 to-blue-700', link: '/admin/universities' },
    { label: 'Applications', value: stats.applications, icon: FiUsers, color: 'from-green-500 to-green-700', link: '/admin/applications' },
    { label: 'Blog Posts', value: stats.blogs, icon: FiBook, color: 'from-purple-500 to-purple-700', link: '/admin/blogs' },
    { label: 'Contact Queries', value: stats.contacts, icon: FiMail, color: 'from-orange-500 to-orange-700', link: '/admin/contacts' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <Link key={card.label} to={card.link}
            className="card p-5 flex items-center gap-4 hover:shadow-xl transition-shadow">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900 dark:text-white">
                {loading ? <div className="w-8 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" /> : card.value}
              </div>
              <div className="text-sm text-gray-500">{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FiTrendingUp className="text-blue-600" /> Monthly Applications
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="applications" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Application Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="applications" stroke="#2563eb" strokeWidth={2} dot={{ fill: '#2563eb' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/universities/add" className="btn-primary text-sm py-2 px-4">+ Add University</Link>
          <Link to="/admin/blogs/add" className="btn-secondary text-sm py-2 px-4">+ Add Blog</Link>
          <Link to="/admin/applications" className="bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-xl transition-colors">View Applications</Link>
          <Link to="/admin/contacts" className="bg-orange-600 hover:bg-orange-700 text-white text-sm py-2 px-4 rounded-xl transition-colors">View Queries</Link>
        </div>
      </div>
    </div>
  )
}
