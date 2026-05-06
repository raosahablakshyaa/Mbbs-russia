import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { applicationAPI } from '../api'
import { FadeIn } from '../components/ui/Animations'
import { FiUser, FiPhone, FiMail, FiMapPin, FiSend } from 'react-icons/fi'

const universities = ['Tula State University', 'Pskov State University', 'Mari State University', 'Tver State Medical University', 'Novgorod State University', 'Not Sure (Need Guidance)']

const initialForm = { fullName: '', phone: '', email: '', city: '', neetScore: '', preferredUniversity: '', message: '' }

export default function Apply() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.fullName || !form.phone || !form.email) return toast.error('Please fill all required fields')
    if (!/^\d{10}$/.test(form.phone)) return toast.error('Enter valid 10-digit phone number')
    if (!/\S+@\S+\.\S+/.test(form.email)) return toast.error('Enter valid email address')
    setLoading(true)
    try {
      await applicationAPI.submit(form)
      setSubmitted(true)
      toast.success('Application submitted successfully! We will contact you within 24 hours.')
    } catch {
      toast.error('Failed to submit. Please try again or call us directly.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md mx-auto px-4">
        <div className="text-7xl mb-6">🎉</div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Application Submitted!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Thank you, <strong>{form.fullName}</strong>! Our counselor will contact you within 24 hours on <strong>{form.phone}</strong>.</p>
        <div className="card p-6 text-left mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">What happens next?</h3>
          {['Our counselor calls you within 24 hours', 'Free 30-min consultation session', 'University shortlisting based on your profile', 'Complete admission guidance & support'].map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0">{i + 1}</span> {s}
            </div>
          ))}
        </div>
        <button onClick={() => { setSubmitted(false); setForm(initialForm) }} className="btn-secondary">Submit Another Application</button>
      </motion.div>
    </div>
  )

  return (
    <div className="pt-20">
      <section className="py-16 bg-gradient-to-br from-blue-900 to-red-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Apply for MBBS in Russia</h1>
            <p className="text-white/80 text-lg">Fill the form below and our expert counselor will contact you within 24 hours.</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="card p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Free Application Form</h2>
                <p className="text-gray-500 mt-1">No application fee • 100% Free Counseling</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name *</label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" required className="input-field pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number *</label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" required className="input-field pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address *</label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="your@email.com" required className="input-field pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">City</label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input name="city" value={form.city} onChange={handleChange} placeholder="Your city" className="input-field pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">NEET Score</label>
                    <input name="neetScore" value={form.neetScore} onChange={handleChange} placeholder="e.g. 450" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Preferred University</label>
                    <select name="preferredUniversity" value={form.preferredUniversity} onChange={handleChange} className="input-field">
                      <option value="">Select University</option>
                      {universities.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message (Optional)</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Any specific questions or requirements..." className="input-field resize-none" />
                </div>
                <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                  ) : (
                    <><FiSend className="w-5 h-5" /> Submit Application — It's Free</>
                  )}
                </motion.button>
                <p className="text-center text-xs text-gray-500">By submitting, you agree to be contacted by our counselors. Your data is safe with us.</p>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
