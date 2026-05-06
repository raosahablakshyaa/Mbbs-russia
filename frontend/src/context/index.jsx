import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()
const AuthContext = createContext()

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try { return JSON.parse(localStorage.getItem('admin')) } catch { return null }
  })

  const login = (data) => { setAdmin(data); localStorage.setItem('admin', JSON.stringify(data)) }
  const logout = () => { setAdmin(null); localStorage.removeItem('admin') }

  return (
    <AuthContext.Provider value={{ admin, login, logout, isAuth: !!admin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
export const useAuth = () => useContext(AuthContext)
