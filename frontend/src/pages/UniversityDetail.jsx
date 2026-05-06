import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { universityAPI } from '../api'
import { FadeIn } from '../components/ui/Animations'
import { FiMapPin, FiClock, FiGlobe, FiYoutube, FiArrowRight } from 'react-icons/fi'
import { FaCheckCircle, FaStar } from 'react-icons/fa'
import { Skeleton } from '../components/ui/Skeleton'

const staticData = {
  'tula-state-university': {
    name: 'Tula State University', city: 'Tula', country: 'Russia', founded: 1930,
    about: 'Tula State University is one of the leading universities in Russia, located in the historic city of Tula, just 200km from Moscow. The medical faculty offers a 6-year MBBS program in English medium, recognized by NMC and WHO.',
    tuitionFees: '₹3–4.5 Lakh/year', hostelFees: '₹60,000/year', totalFees: '₹3.6–5.1 Lakh/year',
    duration: '6 Years', medium: 'English', ranking: 1,
    recognition: ['NMC Approved', 'WHO Listed', 'ECFMG Recognized'],
    facilities: ['Modern Library', 'Advanced Labs', 'Sports Complex', 'Indian Canteen', 'Wi-Fi Campus', '24/7 Security'],
    eligibility: ['NEET Qualified', '50% in PCB', 'Age 17+', 'Valid Passport'],
    admissionProcess: ['Submit online application', 'Receive invitation letter (7-10 days)', 'Apply for student visa', 'Book flight to Tula', 'University enrollment & hostel allotment'],
    officialWebsite: 'https://tsu.tula.ru',
  },
  'pskov-state-university': {
    name: 'Pskov State University', city: 'Pskov', country: 'Russia', founded: 1932,
    about: 'Pskov State University is located in the ancient city of Pskov, near the Estonian border. It offers affordable MBBS education with a strong focus on practical clinical training.',
    tuitionFees: '₹3–3.5 Lakh/year', hostelFees: '₹55,000/year', totalFees: '₹3.55–4.05 Lakh/year',
    duration: '6 Years', medium: 'English', ranking: 2,
    recognition: ['NMC Approved', 'WHO Listed'],
    facilities: ['Research Labs', 'Teaching Hospital', 'Student Hostel', 'Indian Food', 'Sports Facilities'],
    eligibility: ['NEET Qualified', '50% in PCB', 'Age 17+', 'Valid Passport'],
    admissionProcess: ['Online application', 'Invitation letter', 'Visa processing', 'Travel to Pskov', 'Enrollment'],
    officialWebsite: 'https://pskgu.ru',
  },
  'mari-state-university': {
    name: 'Mari State University', city: 'Yoshkar-Ola', country: 'Russia', founded: 1972,
    about: 'Mari State University is located in Yoshkar-Ola, the capital of the Mari El Republic. It is known for its excellent medical faculty and affordable fees.',
    tuitionFees: '₹4–5 Lakh/year', hostelFees: '₹65,000/year', totalFees: '₹4.65–5.65 Lakh/year',
    duration: '6 Years', medium: 'English', ranking: 3,
    recognition: ['NMC Approved', 'WHO Listed'],
    facilities: ['Modern Campus', 'Teaching Hospital', 'Library', 'Indian Canteen', 'Hostel'],
    eligibility: ['NEET Qualified', '50% in PCB', 'Age 17+', 'Valid Passport'],
    admissionProcess: ['Apply online', 'Get invitation letter', 'Visa application', 'Travel', 'Join university'],
    officialWebsite: 'https://marsu.ru',
  },
  'tver-state-medical-university': {
    name: 'Tver State Medical University', city: 'Tver', country: 'Russia', founded: 1936,
    about: 'Tver State Medical University is a dedicated medical university located on the banks of the Volga river. It has a long history of training medical professionals and is highly regarded for its clinical training.',
    tuitionFees: '₹3.5–5 Lakh/year', hostelFees: '₹70,000/year', totalFees: '₹4.2–5.7 Lakh/year',
    duration: '6 Years', medium: 'English', ranking: 4,
    recognition: ['NMC Approved', 'WHO Listed', 'MCI Recognized'],
    facilities: ['Dedicated Medical Campus', 'University Hospital', 'Simulation Lab', 'Indian Food', 'Hostel', 'Library'],
    eligibility: ['NEET Qualified', '50% in PCB', 'Age 17+', 'Valid Passport'],
    admissionProcess: ['Submit application', 'Receive letter', 'Visa processing', 'Travel to Tver', 'Enrollment'],
    officialWebsite: 'https://tvergma.ru',
  },
  'novgorod-state-university': {
    name: 'Novgorod State University', city: 'Veliky Novgorod', country: 'Russia', founded: 1993,
    about: 'Novgorod State University, named after Yaroslav the Wise, is one of Russia\'s oldest cities\' universities. It offers quality medical education at very affordable fees.',
    tuitionFees: '₹3–4 Lakh/year', hostelFees: '₹60,000/year', totalFees: '₹3.6–4.6 Lakh/year',
    duration: '6 Years', medium: 'English', ranking: 5,
    recognition: ['NMC Approved', 'WHO Listed'],
    facilities: ['Modern Labs', 'Teaching Hospital', 'Library', 'Sports Complex', 'Hostel'],
    eligibility: ['NEET Qualified', '50% in PCB', 'Age 17+', 'Valid Passport'],
    admissionProcess: ['Online application', 'Invitation letter', 'Visa', 'Travel', 'Enrollment'],
    officialWebsite: 'https://novsu.ru',
  },
}

export default function UniversityDetail() {
  const { slug } = useParams()
  const [university, setUniversity] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    universityAPI.getOne(slug)
      .then(res => setUniversity(res.data.data))
      .catch(() => setUniversity(staticData[slug] || null))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div className="pt-20 max-w-7xl mx-auto px-4 py-16 space-y-6">
      <Skeleton className="h-64 w-full rounded-2xl" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )

  if (!university) return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🏫</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">University Not Found</h2>
        <Link to="/universities" className="btn-primary mt-4 inline-block">View All Universities</Link>
      </div>
    </div>
  )

  const u = university

  return (
    <div className="pt-20">
      {/* Banner */}
      <div className="relative h-72 md:h-96 bg-gradient-to-br from-blue-900 to-blue-700 overflow-hidden">
        {u.bannerImage && <img src={u.bannerImage} alt={u.name} className="w-full h-full object-cover opacity-40" />}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <div className="flex flex-wrap gap-2 mb-3">
              {u.recognition?.map(r => (
                <span key={r} className="badge bg-green-500 text-white"><FaCheckCircle className="w-3 h-3 mr-1" />{r}</span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white">{u.name}</h1>
            <div className="flex items-center gap-2 text-white/80 mt-2">
              <FiMapPin className="w-4 h-4" /> {u.city}, {u.country || 'Russia'}
              {u.founded && <span className="ml-4">Est. {u.founded}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <FadeIn>
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About {u.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{u.about || u.description}</p>
              </div>
            </FadeIn>

            {/* Fee Structure */}
            <FadeIn>
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Fee Structure</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead><tr className="bg-blue-50 dark:bg-blue-900/20">
                      {['Fee Type', 'Amount'].map(h => <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {[
                        ['Tuition Fees', u.tuitionFees],
                        ['Hostel Fees', u.hostelFees],
                        ['Total Per Year', u.totalFees],
                        ['Course Duration', u.duration || '6 Years'],
                        ['Medium', u.medium || 'English'],
                      ].map(([k, v]) => v && (
                        <tr key={k} className="border-t border-gray-100 dark:border-gray-700">
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-sm">{k}</td>
                          <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white text-sm">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>

            {/* Facilities */}
            {u.facilities?.length > 0 && (
              <FadeIn>
                <div className="card p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Campus Facilities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {u.facilities.map(f => (
                      <div key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Admission Process */}
            {u.admissionProcess?.length > 0 && (
              <FadeIn>
                <div className="card p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Admission Process</h2>
                  <div className="space-y-3">
                    {u.admissionProcess.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* YouTube */}
            {u.youtubeLink && (
              <FadeIn>
                <div className="card p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FiYoutube className="text-red-500" /> University Video Tour
                  </h2>
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <iframe src={u.youtubeLink.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title="University Tour" />
                  </div>
                </div>
              </FadeIn>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <FadeIn>
              <div className="card p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Information</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Tuition Fees', value: u.tuitionFees, icon: '💰' },
                    { label: 'Hostel Fees', value: u.hostelFees, icon: '🏠' },
                    { label: 'Duration', value: u.duration || '6 Years', icon: '⏱️' },
                    { label: 'Medium', value: u.medium || 'English', icon: '📚' },
                    { label: 'City', value: u.city, icon: '📍' },
                  ].map(item => item.value && (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <span className="text-sm text-gray-500">{item.icon} {item.label}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Eligibility */}
                {u.eligibility?.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Eligibility</h4>
                    {u.eligibility.map(e => (
                      <div key={e} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <FaCheckCircle className="w-3.5 h-3.5 text-green-500" /> {e}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 space-y-3">
                  <Link to="/apply" className="btn-primary w-full text-center block">Apply Now</Link>
                  <a href="tel:+919999999999" className="btn-secondary w-full text-center block">Free Counseling</a>
                  {u.officialWebsite && (
                    <a href={u.officialWebsite} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-sm text-blue-600 hover:underline">
                      <FiGlobe className="w-4 h-4" /> Official Website
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}
