import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FadeIn } from '../components/ui/Animations'
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi'

const steps = [
  { num: '01', title: 'Apply Online', desc: 'Fill our simple application form with your personal details, academic records, and NEET score. Our team reviews your application within 24 hours.', icon: '📝', color: 'from-blue-500 to-blue-700', docs: ['10th & 12th Marksheets', 'NEET Scorecard', 'Passport Copy', 'Passport Photos'] },
  { num: '02', title: 'Get Admission Letter', desc: 'After document verification, we apply to your chosen university. You receive an official invitation/admission letter within 7–10 working days.', icon: '📨', color: 'from-purple-500 to-purple-700', docs: ['University Invitation Letter', 'Admission Confirmation', 'Fee Payment Receipt'] },
  { num: '03', title: 'Visa Processing', desc: 'We assist you with the complete Russian student visa process including documentation, embassy appointment, and visa fee payment.', icon: '🛂', color: 'from-green-500 to-green-700', docs: ['Visa Application Form', 'Medical Certificate', 'HIV Test Report', 'Bank Statement'] },
  { num: '04', title: 'Flight Booking', desc: 'Book your flight to Russia. We guide you on the best routes, airports, and travel tips. Most students fly to Moscow and then take a train/bus.', icon: '✈️', color: 'from-orange-500 to-orange-700', docs: ['Flight Tickets', 'Travel Insurance', 'Foreign Exchange'] },
  { num: '05', title: 'Travel to Russia', desc: 'Our team receives you at the airport and assists with settling in. We provide complete support during your first days in Russia.', icon: '🚀', color: 'from-red-500 to-red-700', docs: ['All Original Documents', 'University Letter', 'Emergency Contacts'] },
  { num: '06', title: 'University Joining', desc: 'Complete your university enrollment, get your hostel room, student ID, and start your MBBS journey. Welcome to your new life!', icon: '🎓', color: 'from-teal-500 to-teal-700', docs: ['University Registration', 'Hostel Allotment', 'Student ID Card', 'Course Schedule'] },
]

export default function Admission() {
  return (
    <div className="pt-20">
      <section className="py-16 bg-gradient-to-br from-purple-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Admission Procedure</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">Simple 6-step process to secure your MBBS seat in Russia. We handle everything for you.</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-teal-600 hidden md:block" />
            <div className="space-y-8">
              {steps.map((step, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex gap-6 md:gap-8">
                    <div className="flex-shrink-0 relative z-10">
                      <motion.div whileHover={{ scale: 1.1 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl shadow-lg`}>
                        {step.icon}
                      </motion.div>
                    </div>
                    <div className="flex-1 card p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step {step.num}</span>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{step.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.docs.map(doc => (
                          <span key={doc} className="flex items-center gap-1 text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full">
                            <FiCheckCircle className="w-3 h-3" /> {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn className="mt-12 text-center">
            <div className="card p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Ready to Start?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Our expert counselors will guide you through every step. Apply now and get a free consultation.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/apply" className="btn-primary inline-flex items-center gap-2">Apply Now <FiArrowRight /></Link>
                <a href="tel:+919999999999" className="btn-secondary inline-flex items-center gap-2">Call for Help</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
