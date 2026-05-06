import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth, useTheme } from '../../context'
import {
  FiHome, FiBook, FiUsers, FiMessageSquare, FiSettings,
  FiMenu, FiX, FiLogOut, FiSun, FiMoon, FiImage, FiStar,
  FiPlusCircle, FiList, FiMail
} from 'react-icons/fi'
import { FaUniversity } from 'react-icons/fa'

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: FiHome, exact: true },
  { label: 'Universities', icon: FaUniversity, children: [
    { label: 'All Universities', to: '/admin/universities', icon: FiList },
    { label: 'Add University', to: '/admin/universities/add', icon: FiPlusCircle },
  ]},
  { label: 'Applications', to: '/admin/applications', icon: FiUsers },
  { label: 'Blog', icon: FiBook, children: [
    { label: 'All Blogs', to: '/admin/blogs', icon: FiList },
    { label: 'Add Blog', to: '/admin/blogs/add', icon: FiPlusCircle },
  ]},
  { label: 'Testimonials', to: '/admin/testimonials', icon: FiStar },
  { label: 'Contact Queries', to: '/admin/contacts', icon: FiMail },
  { label: 'Settings', to: '/admin/settings', icon: FiSettings },
]

function NavItem({ item, collapsed, onClick }) {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const isActive = item.to ? (item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to)) : item.children?.some(c => location.pathname.startsWith(c.to))

  if (item.children) return (
    <div>
      <button onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
        <item.icon className="w-5 h-5 flex-shrink-0" />
        {!collapsed && <><span className="flex-1 text-left">{item.label}</span><FiMenu className={`w-4 h-4 transition-transform ${open ? 'rotate-90' : ''}`} /></>}
      </button>
      <AnimatePresence>
        {open && !collapsed && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden ml-4 mt-1 space-y-1">
            {item.children.map(child => (
              <Link key={child.to} to={child.to} onClick={onClick}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${location.pathname === child.to ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                <child.icon className="w-4 h-4" /> {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <Link to={item.to} onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
      <item.icon className="w-5 h-5 flex-shrink-0" />
      {!collapsed && item.label}
    </Link>
  )
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const { logout, admin } = useAuth()
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/admin/login') }

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 ${mobile ? 'w-72' : collapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        {(!collapsed || mobile) && (
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center text-white font-bold text-sm">M</div>
            <span className="font-bold text-gray-900 dark:text-white text-sm">Admin Panel</span>
          </Link>
        )}
        {!mobile && (
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500">
            <FiMenu className="w-4 h-4" />
          </button>
        )}
        {mobile && <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><FiX className="w-5 h-5" /></button>}
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <NavItem key={item.label} item={item} collapsed={!mobile && collapsed} onClick={() => mobile && setSidebarOpen(false)} />
        ))}
      </nav>

      <div className="p-3 border-t border-gray-200 dark:border-gray-800">
        {(!collapsed || mobile) && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
              {admin?.name?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{admin?.name || 'Admin'}</div>
              <div className="text-xs text-gray-500 truncate">{admin?.email}</div>
            </div>
          </div>
        )}
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
          <FiLogOut className="w-5 h-5 flex-shrink-0" />
          {(!collapsed || mobile) && 'Logout'}
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-shrink-0"><Sidebar /></div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
            <motion.div initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden flex">
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 h-16 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <FiMenu className="w-5 h-5" />
            </button>
            <Link to="/" target="_blank" className="text-sm text-blue-600 hover:underline hidden sm:block">← View Website</Link>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggle} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
              {dark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
