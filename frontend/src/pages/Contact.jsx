import { useState } from 'react'
import toast from 'react-hot-toast'
import { contactAPI } from '../api'
import { FadeIn } from '../components/ui/Animations'
import { FiPhone, FiMail, FiMapPin, FiSend, FiClock } from 'react-icons/fi'
import { FaWhatsapp, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import SEOHead from '../components/SEOHead'
import { SEO } from '../utils/seo'

const contactInfo = [
  { icon: FiPhone, label: 'Phone', value: '+91 74042 13051', href: 'https://wa.me/917404213051', color: 'text-blue-600' },
  { icon: FaWhatsapp, label: 'WhatsApp', value: '+91 74042 13051', href: 'https://wa.me/917404213051', color: 'text-green-600' },
  { icon: FiMail, label: 'Email', value: 'lakshyayadav314@gmail.com', href: 'mailto:lakshyayadav314@gmail.com', color: 'text-red-600' },
  { icon: FiMapPin, label: 'Office', value: '123, Medical Hub, Connaught Place, New Delhi - 110001', href: '#', color: 'text-purple-600' },
  { icon: FiClock, label: 'Hours', value: 'Mon–Sat: 9 AM – 7 PM IST', href: '#', color: 'text-orange-600' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return toast.error('Please fill required fields')
    setLoading(true)
    try {
      await contactAPI.submit(form)
      toast.success('Message sent! We will reply within 24 hours.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      toast.error('Failed to send. Please call us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20">
      <SEOHead {...SEO.contact} canonical="/contact" />
      <section className="py-16 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Contact Us</h1>
            <p className="text-white/80 text-lg">Get in touch with our expert counselors. We're here to help!</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <FadeIn>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get In Touch</h2>
              <div className="space-y-4 mb-8">
                {contactInfo.map(item => (
                  <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="flex items-start gap-4 card p-4 hover:border-blue-200 dark:hover:border-blue-800 transition-colors group">
                    <div className={`w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center ${item.color} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">{item.label}</div>
                      <div className="text-gray-900 dark:text-white font-medium text-sm">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex gap-3 mb-8">
                {[
                  { icon: FaWhatsapp, href: 'https://wa.me/919999999999', color: 'bg-green-500 hover:bg-green-600' },
                  { icon: FaFacebook, href: '#', color: 'bg-blue-600 hover:bg-blue-700' },
                  { icon: FaInstagram, href: '#', color: 'bg-pink-500 hover:bg-pink-600' },
                  { icon: FaYoutube, href: '#', color: 'bg-red-600 hover:bg-red-700' },
                ].map(({ icon: Icon, href, color }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-white transition-colors`}>
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden h-56 bg-gray-200 dark:bg-gray-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9!2d77.2!3d28.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzAwLjAiTiA3N8KwMTInMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Office Location" />
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn delay={0.2}>
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name *</label>
                      <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" required className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
                      <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="Phone number" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email *</label>
                    <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} type="email" placeholder="your@email.com" required className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
                    <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="How can we help?" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message *</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5} placeholder="Your message..." required className="input-field resize-none" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-4 disabled:opacity-60">
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiSend className="w-5 h-5" />}
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
