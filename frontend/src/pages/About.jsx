import { FadeIn, StaggerContainer, StaggerItem } from '../components/ui/Animations'
import { Link } from 'react-router-dom'

const team = [
  { name: 'Dr. Rajesh Kumar', role: 'Founder & Chief Counselor', exp: '15+ Years Experience', emoji: '👨‍⚕️' },
  { name: 'Priya Mehta', role: 'Senior Admission Advisor', exp: '10+ Years Experience', emoji: '👩‍💼' },
  { name: 'Amit Sharma', role: 'Visa & Documentation Expert', exp: '8+ Years Experience', emoji: '👨‍💼' },
  { name: 'Sunita Patel', role: 'Student Relations Manager', exp: '6+ Years Experience', emoji: '👩‍🎓' },
]

const milestones = [
  { year: '2008', event: 'Founded MBBS Russia Guide' },
  { year: '2012', event: 'Placed 500+ students in Russia' },
  { year: '2016', event: 'Expanded to 10+ universities' },
  { year: '2020', event: 'Achieved 100% visa success rate' },
  { year: '2023', event: '5000+ students placed successfully' },
  { year: '2024', event: 'Launched digital counseling platform' },
]

export default function About() {
  return (
    <div className="pt-20">
      <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">About MBBS Russia Guide</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">India's most trusted education consultancy for MBBS admissions in Russia since 2008.</p>
          </FadeIn>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <span className="badge bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-3">Our Mission</span>
              <h2 className="section-title mb-4">Making Medical Dreams Affordable</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                MBBS Russia Guide was founded with a single mission: to make quality medical education accessible to every Indian student who dreams of becoming a doctor, regardless of their financial background.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                We have been helping Indian students secure admissions in top NMC-approved Russian medical universities since 2008. With over 5000 students successfully placed, we are India's most trusted MBBS abroad consultancy.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[['5000+', 'Students Placed'], ['15+', 'Years Experience'], ['100%', 'Visa Success'], ['20+', 'Partner Universities']].map(([n, l]) => (
                  <div key={l} className="card p-4 text-center">
                    <div className="text-2xl font-black text-blue-600">{n}</div>
                    <div className="text-sm text-gray-500">{l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-4">
                {[
                  { icon: '🎯', title: 'Expert Guidance', desc: 'Our counselors have personally studied or worked in Russia and provide first-hand guidance.' },
                  { icon: '🔒', title: 'Transparent Process', desc: 'No hidden fees, no false promises. Complete transparency in every step of the admission process.' },
                  { icon: '🤝', title: 'End-to-End Support', desc: 'From application to landing in Russia, we support you at every step of your journey.' },
                  { icon: '📞', title: '24/7 Support', desc: 'Our team is available round the clock to answer your queries and provide assistance.' },
                ].map(item => (
                  <div key={item.title} className="card p-5 flex gap-4">
                    <span className="text-3xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="section-title">Meet Our Expert Team</h2>
            <p className="section-subtitle">Experienced counselors dedicated to your success.</p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(member => (
              <StaggerItem key={member.name}>
                <div className="card p-6 text-center">
                  <div className="text-5xl mb-4">{member.emoji}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-blue-600 text-sm font-medium mt-1">{member.role}</p>
                  <p className="text-gray-500 text-xs mt-1">{member.exp}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="section-title">Our Journey</h2>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900 -translate-x-1/2" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className={`flex items-center gap-6 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="card p-4 inline-block">
                        <div className="font-bold text-blue-600">{m.year}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{m.event}</div>
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-gray-950 flex-shrink-0 z-10" />
                    <div className="flex-1" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-black text-white mb-4">Start Your Journey With Us</h2>
            <p className="text-white/80 mb-8">Join 5000+ students who trusted us with their medical career.</p>
            <Link to="/apply" className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors inline-block">Apply Now — Free</Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
