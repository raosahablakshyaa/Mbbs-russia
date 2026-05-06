import { Link } from 'react-router-dom'
import { FadeIn, StaggerContainer, StaggerItem } from '../components/ui/Animations'
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'
import SEOHead from '../components/SEOHead'
import { SEO } from '../utils/seo'

const criteria = [
  { title: 'Academic Qualification', icon: '📚', items: ['Passed 10+2 or equivalent', 'Minimum 50% marks in PCB (Physics, Chemistry, Biology)', '45% for SC/ST/OBC candidates', 'English as a subject in 10+2'] },
  { title: 'NEET Requirement', icon: '🏥', items: ['NEET qualification is mandatory', 'Valid NEET scorecard required', 'No minimum NEET score for Russia', 'NEET score must be from current/previous year'] },
  { title: 'Age Requirement', icon: '🎂', items: ['Minimum age: 17 years', 'Maximum age: No upper limit', 'Age calculated as on December 31 of admission year'] },
  { title: 'Documents Required', icon: '📄', items: ['Valid Indian Passport (6+ months validity)', '10th & 12th Marksheets & Certificates', 'NEET Scorecard', 'Birth Certificate', 'Medical Fitness Certificate', 'HIV Test Report', 'Passport-size Photographs'] },
]

const dosDonts = {
  dos: ['Apply early for better university options', 'Keep all documents ready in advance', 'Get passport made before applying', 'Consult our experts for guidance', 'Check NMC approved university list', 'Prepare for FMGE exam from day 1'],
  donts: ['Don\'t apply without NEET qualification', 'Don\'t choose non-NMC approved universities', 'Don\'t pay fees without proper documentation', 'Don\'t ignore Russian language learning', 'Don\'t fall for fake agents', 'Don\'t delay visa application'],
}

export default function Eligibility() {
  return (
    <div className="pt-20">
      <SEOHead {...SEO.eligibility} canonical="/eligibility" />
      <section className="py-16 bg-gradient-to-br from-teal-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Eligibility Criteria</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">Check if you are eligible for MBBS admission in Russia. Simple requirements for Indian students.</p>
          </FadeIn>
        </div>
      </section>

      {/* Quick Check */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 text-white text-center mb-12">
              <h2 className="text-2xl font-bold mb-6">Quick Eligibility Check</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: '📊', title: '50% in PCB', desc: 'Minimum 50% marks in Physics, Chemistry & Biology in 10+2' },
                  { icon: '🏆', title: 'NEET Qualified', desc: 'Valid NEET qualification is mandatory as per NMC guidelines' },
                  { icon: '🎂', title: 'Age 17+', desc: 'Minimum age of 17 years on or before December 31 of admission year' },
                ].map(item => (
                  <div key={item.title} className="glassmorphism rounded-2xl p-5">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {criteria.map(c => (
              <StaggerItem key={c.title}>
                <div className="card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{c.icon}</span>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{c.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {c.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Dos and Don'ts */}
          <FadeIn>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6 border-l-4 border-green-500">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" /> Do's
                </h3>
                <ul className="space-y-2">
                  {dosDonts.dos.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card p-6 border-l-4 border-red-500">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                  <FiXCircle className="text-red-500" /> Don'ts
                </h3>
                <ul className="space-y-2">
                  {dosDonts.donts.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <FiXCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="mt-10 text-center">
            <Link to="/apply" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
              Apply Now — Check Your Eligibility
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
