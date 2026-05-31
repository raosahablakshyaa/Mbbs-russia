import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCheckCircle, FiPhone } from 'react-icons/fi'
import { FaGraduationCap, FaHospital, FaGlobe, FaShieldAlt, FaMoneyBillWave, FaUserMd } from 'react-icons/fa'
import { universityAPI, testimonialAPI } from '../api'
import UniversityCard from '../components/ui/UniversityCard'
import TestimonialsSlider from '../components/ui/TestimonialsSlider'
import FAQ from '../components/ui/FAQ'
import { FadeIn, StaggerContainer, StaggerItem } from '../components/ui/Animations'
import { CardSkeleton } from '../components/ui/Skeleton'
import SEOHead from '../components/SEOHead'
import { SEO, SITE } from '../utils/seo'

const whyCards = [
  { icon: FaMoneyBillWave, title: 'Affordable Fees', desc: 'MBBS in Russia costs ₹3–5 lakh/year, far cheaper than private colleges in India.', color: 'from-green-400 to-emerald-600' },
  { icon: FaShieldAlt, title: 'NMC Approved', desc: 'All listed universities are approved by the National Medical Commission of India.', color: 'from-blue-400 to-blue-600' },
  { icon: FaGlobe, title: 'WHO Recognized', desc: 'Degrees recognized globally by WHO, enabling practice worldwide.', color: 'from-purple-400 to-purple-600' },
  { icon: FaGraduationCap, title: 'English Medium', desc: 'Courses taught in English with Russian language support for clinical training.', color: 'from-orange-400 to-red-500' },
  { icon: FaHospital, title: 'Modern Hospitals', desc: 'State-of-the-art teaching hospitals with advanced medical equipment.', color: 'from-pink-400 to-rose-600' },
  { icon: FaUserMd, title: 'Global Degree', desc: 'MD degree equivalent to MBBS, valid for FMGE/NEXT exam in India.', color: 'from-cyan-400 to-teal-600' },
]

const feeRows = [
  { name: 'Tula State University', tuition: '₹3–4.5L', hostel: '₹60K', total: '₹3.6–5.1L', duration: '6 Yrs' },
  { name: 'Pskov State University', tuition: '₹3–3.5L', hostel: '₹55K', total: '₹3.55–4.05L', duration: '6 Yrs' },
  { name: 'Mari State University', tuition: '₹4–5L', hostel: '₹65K', total: '₹4.65–5.65L', duration: '6 Yrs' },
  { name: 'Tver State Medical University', tuition: '₹3.5–5L', hostel: '₹70K', total: '₹4.2–5.7L', duration: '6 Yrs' },
  { name: 'Novgorod State University', tuition: '₹3–4L', hostel: '₹60K', total: '₹3.6–4.6L', duration: '6 Yrs' },
]

const admissionSteps = [
  { step: '01', title: 'Apply Online', desc: 'Fill our simple application form with your details and NEET score.' },
  { step: '02', title: 'Get Admission Letter', desc: 'Receive official invitation letter from the university within 7–10 days.' },
  { step: '03', title: 'Visa Processing', desc: 'We assist with student visa documentation and embassy appointment.' },
  { step: '04', title: 'Flight Booking', desc: 'Book your flight to Russia. We guide you on the best routes.' },
  { step: '05', title: 'Travel to Russia', desc: 'Our team receives you at the airport and assists with settling in.' },
  { step: '06', title: 'University Joining', desc: 'Complete enrollment, get hostel room, and start your MBBS journey!' },
]

const faqs = [
  { q: 'Is MBBS from Russia valid in India?', a: 'Yes, MBBS from NMC-approved Russian universities is valid in India. Students must clear the FMGE/NEXT screening exam to practice in India.' },
  { q: 'What is the total cost of MBBS in Russia?', a: 'The total cost including tuition, hostel, food, and other expenses ranges from ₹20–35 lakhs for the entire 6-year course.' },
  { q: 'Is NEET mandatory for MBBS in Russia?', a: 'Yes, as per NMC regulations, NEET qualification is mandatory for Indian students seeking MBBS admission abroad.' },
  { q: 'What is the medium of instruction?', a: 'Most universities offer MBBS in English medium. Russian language is taught as a subject for clinical interactions.' },
  { q: 'Are Russian medical universities safe for Indian students?', a: 'Yes, Russia is considered safe for Indian students. Universities have dedicated Indian student cells and support systems.' },
  { q: 'What documents are required for admission?', a: '10th & 12th marksheets, NEET scorecard, passport, passport-size photos, birth certificate, and medical fitness certificate.' },
]

export default function Home() {
  const [universities, setUniversities] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([universityAPI.getAll({ limit: 4 }), testimonialAPI.getAll()])
      .then(([uRes, tRes]) => {
        setUniversities(uRes.data.data || [])
        setTestimonials(tRes.data.data || [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        logo: { '@type': 'ImageObject', url: SITE.logo },
        contactPoint: { '@type': 'ContactPoint', telephone: SITE.phone, contactType: 'customer service', areaServed: 'IN', availableLanguage: ['English', 'Hindi'] },
        address: { '@type': 'PostalAddress', streetAddress: '123, Medical Hub, Connaught Place', addressLocality: 'New Delhi', addressRegion: 'Delhi', postalCode: '110001', addressCountry: 'IN' },
      },
      {
        '@type': 'LocalBusiness',
        name: SITE.name,
        image: SITE.logo,
        telephone: SITE.phone,
        email: SITE.email,
        url: SITE.url,
        address: { '@type': 'PostalAddress', streetAddress: '123, Medical Hub, Connaught Place', addressLocality: 'New Delhi', addressRegion: 'Delhi', postalCode: '110001', addressCountry: 'IN' },
        openingHours: 'Mo-Sa 09:00-19:00',
        priceRange: 'Free Counseling',
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/universities?search={search_term_string}` }, 'query-input': 'required name=search_term_string' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ]
  }

  return (
    <div className="overflow-x-hidden">
      <SEOHead {...SEO.home} canonical="/" schema={homeSchema} />
      {/* Hero */}
      <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div key={i} className="absolute w-2 h-2 bg-white/10 rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [-20, 20], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }} />
          ))}
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/90 text-sm mb-6">
              <FiCheckCircle className="w-4 h-4 text-green-400" />
              NMC Approved Universities • NEET Required
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Study MBBS in<br />
              <span className="text-yellow-400">Russia</span> at<br />
              Affordable Fees
            </h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-lg">
              Get admission in top NMC-approved Russian medical universities. Expert counseling, visa assistance & complete support for Indian students.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/apply" className="btn-red text-base px-8 py-4 flex items-center gap-2">
                Apply Now <FiArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+917404213051" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-all">
                <FiPhone className="w-5 h-5" /> Free Counseling
              </a>
            </div>
            <div className="flex flex-wrap gap-6">
              {[['Genuine', 'Guidance'], ['Current', 'Student'], ['Honest', 'Support']].map(([num, label]) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-black text-yellow-400">{num}</div>
                  <div className="text-white/70 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block">
            <div className="relative">
              <div className="glassmorphism rounded-3xl p-8 text-white">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">🎓</div>
                  <h3 className="text-xl font-bold">Quick Eligibility Check</h3>
                </div>
                {[
                  { label: 'NEET Qualified', check: true },
                  { label: '50% in PCB (10+2)', check: true },
                  { label: 'Age 17+ years', check: true },
                  { label: 'Valid Passport', check: true },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0">
                    <FiCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/90">{item.label}</span>
                  </div>
                ))}
                <Link to="/apply" className="block mt-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-center py-3 rounded-xl transition-colors">
                  Check My Eligibility →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-950 to-transparent" />
      </section>

      {/* Why MBBS in Russia */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="badge bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-3">Why Russia?</span>
            <h2 className="section-title">Why Choose MBBS in Russia?</h2>
            <p className="section-subtitle max-w-2xl mx-auto">Russia offers world-class medical education at a fraction of the cost compared to private colleges in India.</p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyCards.map((card) => (
              <StaggerItem key={card.title}>
                <div className="card p-6 group">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <card.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{card.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Top Universities */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="badge bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-3">Top Picks</span>
            <h2 className="section-title">Top Russian Medical Universities</h2>
            <p className="section-subtitle">NMC-approved universities with affordable fees and excellent facilities.</p>
          </FadeIn>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : universities.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {universities.map(u => (
                <StaggerItem key={u._id}><UniversityCard university={u} /></StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {feeRows.map((u, i) => (
                <div key={i} className="card p-6">
                  <div className="w-full h-36 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-white/30 text-4xl font-bold">{u.name[0]}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{u.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">Russia • {u.duration}</p>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-500">Fees/Year</span>
                    <span className="font-semibold text-blue-600">{u.tuition}</span>
                  </div>
                  <Link to={`/universities/${u.name.toLowerCase().replace(/\s+/g, '-')}`} className="block text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/universities" className="btn-primary inline-flex items-center gap-2">
              View All Universities <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Fee Comparison */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="badge bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-3">Fee Structure</span>
            <h2 className="section-title">MBBS Fees Comparison</h2>
            <p className="section-subtitle">Transparent fee structure for all top Russian medical universities.</p>
          </FadeIn>
          <FadeIn>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    {['University', 'Tuition/Year', 'Hostel/Year', 'Total/Year', 'Duration'].map(h => (
                      <th key={h} className="px-6 py-4 text-left text-sm font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {feeRows.map((row, i) => (
                    <tr key={i} className={`border-t border-gray-100 dark:border-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors ${i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{row.name}</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">{row.tuition}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{row.hostel}</td>
                      <td className="px-6 py-4 text-blue-600 font-bold">{row.total}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
          <div className="text-center mt-8">
            <Link to="/fees" className="btn-primary inline-flex items-center gap-2">
              Detailed Fee Structure <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="badge bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-3">Simple Process</span>
            <h2 className="section-title">Admission Process</h2>
            <p className="section-subtitle">Get admitted to your dream Russian medical university in 6 easy steps.</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {admissionSteps.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="card p-6 relative overflow-hidden group">
                  <div className="absolute top-4 right-4 text-6xl font-black text-gray-100 dark:text-gray-800 group-hover:text-blue-100 dark:group-hover:text-blue-900/30 transition-colors select-none">{s.step}</div>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg mb-4">{s.step}</div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{s.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="badge bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mb-3">Student Stories</span>
            <h2 className="section-title">What Our Students Say</h2>
            <p className="section-subtitle">Real experiences from Indian students studying MBBS in Russia.</p>
          </FadeIn>
          <TestimonialsSlider testimonials={testimonials.length > 0 ? testimonials : [
            { name: 'Priya Sharma', university: 'Tula State University', year: '3rd Year', message: 'KelMedica made my dream come true. The entire process from application to visa was handled smoothly. I am now in my 3rd year and loving every moment!', rating: 5 },
            { name: 'Rahul Verma', university: 'Tver State Medical University', year: '2nd Year', message: 'I was confused about studying abroad but the counselors here guided me perfectly. The fees are very affordable and the university is excellent.', rating: 5 },
            { name: 'Anjali Singh', university: 'Mari State University', year: '4th Year', message: 'Best decision of my life! The support from KelMedica was outstanding. They helped with everything — admission, visa, accommodation.', rating: 5 },
          ]} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="badge bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-3">FAQs</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know about MBBS in Russia.</p>
          </FadeIn>
          <FadeIn><FAQ items={faqs} /></FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Start Your MBBS Journey?</h2>
            <p className="text-white/80 text-lg mb-8">Get free counseling from our experts and secure your seat in a top Russian medical university.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/apply" className="btn-red text-base px-8 py-4">Apply Now — It's Free</Link>
              <a href="https://wa.me/917404213051" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-all">
                WhatsApp: +91 74042 13051
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
