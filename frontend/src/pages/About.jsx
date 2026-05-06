import { FadeIn, StaggerContainer, StaggerItem } from '../components/ui/Animations'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { SEO } from '../utils/seo'

const team = [
  { name: 'Lakshya Yadav', role: 'Founder & Counselor', exp: 'MBBS Graduate from Russia', emoji: '👨‍⚕️' },
]

const milestones = [
  { year: '2018', event: 'Started MBBS in Russia' },
  { year: '2020', event: 'Navigated COVID challenges abroad' },
  { year: '2023', event: 'Completed MBBS and returned to India' },
  { year: '2024', event: 'Started helping students with genuine guidance' },
]

export default function About() {
  return (
    <div className="pt-20">
      <SEOHead {...SEO.about} canonical="/about" />
      <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">About MBBS Russia Guide</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">Helping Indian students achieve their MBBS dreams in Russia.</p>
          </FadeIn>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <span className="badge bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-3">Our Story</span>
              <h2 className="section-title mb-4">From Student to Guide</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                I'm Lakshya, and I completed my MBBS from Russia. The journey wasn't easy—navigating admissions, visas, and settling in a foreign country was overwhelming. But the experience transformed my life.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                After returning to India, I realized many students face the same challenges I did. That's why I started MBBS Russia Guide—to help aspiring doctors like you get genuine guidance based on real experience, not just business.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[['Real', 'Experience'], ['Honest', 'Guidance'], ['Student', 'First'], ['No', 'Hidden Fees']].map(([n, l]) => (
                  <div key={l} className="card p-4 text-center">
                    <div className="text-lg font-black text-blue-600">{n}</div>
                    <div className="text-sm text-gray-500">{l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-4">
                {[
                  { icon: '🎓', title: 'Real Student Experience', desc: 'I studied MBBS in Russia myself. I know exactly what you'll face and how to prepare for it.' },
                  { icon: '💯', title: 'Honest Advice', desc: 'No fake promises or exaggerated claims. I'll tell you the reality—both good and challenging aspects.' },
                  { icon: '🤝', title: 'Personal Support', desc: 'From choosing the right university to settling in Russia, I guide you based on my own journey.' },
                  { icon: '📞', title: 'Always Available', desc: 'Have questions? Reach out anytime on WhatsApp. I'm here to help, not just sell.' },
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
            <h2 className="section-title">Who Am I?</h2>
            <p className="section-subtitle">Your guide who walked this path before you.</p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 gap-6 max-w-md mx-auto">
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
            <h2 className="section-title">My Journey</h2>
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
            <h2 className="text-3xl font-black text-white mb-4">Let Me Help You</h2>
            <p className="text-white/80 mb-8">Get honest guidance from someone who's been through it all.</p>
            <Link to="/apply" className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors inline-block">Get Free Consultation</Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
