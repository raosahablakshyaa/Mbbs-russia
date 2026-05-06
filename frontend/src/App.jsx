import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider, AuthProvider } from './context'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppFloat from './components/layout/WhatsAppFloat'
import ProtectedRoute from './components/layout/ProtectedRoute'

// Public Pages
import Home from './pages/Home'
import Russia from './pages/Russia'
import Universities from './pages/Universities'
import UniversityDetail from './pages/UniversityDetail'
import Fees from './pages/Fees'
import Admission from './pages/Admission'
import Eligibility from './pages/Eligibility'
import Apply from './pages/Apply'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'

// Admin Pages
import AdminLogin from './pages/admin/Login'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import ManageUniversities from './pages/admin/ManageUniversities'
import AddUniversity from './pages/admin/AddUniversity'
import Applications from './pages/admin/Applications'
import BlogManagement from './pages/admin/BlogManagement'
import AddBlog from './pages/admin/AddBlog'
import Testimonials from './pages/admin/Testimonials'
import ContactQueries from './pages/admin/ContactQueries'
import AdminSettings from './pages/admin/AdminSettings'

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" toastOptions={{ duration: 4000, style: { borderRadius: '12px', fontFamily: 'Inter, sans-serif' } }} />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/russia" element={<PublicLayout><Russia /></PublicLayout>} />
            <Route path="/universities" element={<PublicLayout><Universities /></PublicLayout>} />
            <Route path="/universities/:slug" element={<PublicLayout><UniversityDetail /></PublicLayout>} />
            <Route path="/fees" element={<PublicLayout><Fees /></PublicLayout>} />
            <Route path="/admission" element={<PublicLayout><Admission /></PublicLayout>} />
            <Route path="/eligibility" element={<PublicLayout><Eligibility /></PublicLayout>} />
            <Route path="/apply" element={<PublicLayout><Apply /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
            <Route path="/blog/:slug" element={<PublicLayout><BlogDetail /></PublicLayout>} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="universities" element={<ManageUniversities />} />
              <Route path="universities/add" element={<AddUniversity />} />
              <Route path="universities/edit/:id" element={<AddUniversity />} />
              <Route path="applications" element={<Applications />} />
              <Route path="blogs" element={<BlogManagement />} />
              <Route path="blogs/add" element={<AddBlog />} />
              <Route path="blogs/edit/:id" element={<AddBlog />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="contacts" element={<ContactQueries />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
