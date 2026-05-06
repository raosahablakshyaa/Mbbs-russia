import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context'
import { FiSun, FiMoon, FiMenu, FiX, FiChevronDown } from 'react-icons/fi'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Russia', to: '/russia' },
  {
    label: 'Universities', to: '/universities',
    sub: [
      { label: 'All Universities', to: '/universities' },
      { label: 'Tula State University', to: '/universities/tula-state-university' },
      { label: 'Pskov State University', to: '/universities/pskov-state-university' },
      { label: 'Mari State University', to: '/universities/mari-state-university' },
      { label: 'Tver State Medical University', to: '/universities/tver-state-medical-university' },
      { label: 'Novgorod State University', to: '/universities/novgorod-state-university' },
    ]
  },
  { label: 'Fees', to: '/fees' },
  { label: 'Admission', to: '/admission' },
  { label: 'Eligibility', to: '/eligibility' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdown, setDropdown] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setDropdown(null) }, [location])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img src="https://as2.ftcdn.net/jpg/06/98/84/79/1000_F_698847976_0djgwN06xjaCZKpWHWVFnAdQKFhRfhCo.webp" alt="KelMedica" className="h-10 w-10 rounded-full object-cover" />
            <div className="hidden sm:block">
              <div className="font-bold text-gray-900 dark:text-white text-lg leading-tight">KelMedica</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <div key={link.to} className="relative group"
                onMouseEnter={() => link.sub && setDropdown(link.label)}
                onMouseLeave={() => setDropdown(null)}>
                <NavLink to={link.to}
                  className={({ isActive }) => `flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}>
                  {link.label}
                  {link.sub && <FiChevronDown className="w-3 h-3" />}
                </NavLink>
                {link.sub && dropdown === link.label && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50">
                    {link.sub.map(s => (
                      <Link key={s.to} to={s.to}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors">
                        {s.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button onClick={toggle} className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {dark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            <Link to="/apply" className="hidden sm:inline-flex btn-primary text-sm py-2 px-4">
              Apply Now
            </Link>
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              {open ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {navLinks.map(link => (
                <div key={link.to}>
                  <NavLink to={link.to}
                    className={({ isActive }) => `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                    {link.label}
                  </NavLink>
                  {link.sub && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.sub.slice(1).map(s => (
                        <Link key={s.to} to={s.to} className="block px-4 py-2 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600">
                          → {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/apply" className="block btn-primary text-center mt-4">Apply Now</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
