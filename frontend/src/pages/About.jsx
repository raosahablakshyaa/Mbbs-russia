import { FadeIn, StaggerContainer, StaggerItem } from '../components/ui/Animations'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { SEO } from '../utils/seo'

const team = [
  { name: 'Kamaldeep', role: 'Founder & Counselor', exp: 'Currently Studying MBBS in Russia', emoji: '👨⚕️' },
]

const milestones = [
  { icon: '🎓', event: 'Started MBBS journey in Russia', desc: 'Left India to pursue my medical dream' },
  { icon: '🌍', event: 'Adapting to Russian life', desc: 'Learning the language, culture, and medical system' },
  { icon: '📚', event: 'Currently studying MBBS', desc: 'Attending classes, clinical training, and exams' },
  { icon: '💡', event: 'Started helping Indian students', desc: 'Sharing real experience and guidance while studying' },
  { icon: '🎯', event: 'Building KelMedica', desc: 'Helping more students from India join top universities' },
]

export default function About() {
  return (
    <div className="pt-20">
      <SEOHead {...SEO.about} canonical="/about" />
      <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">About KelMedica</h1>
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
                I am Kamaldeep, currently pursuing my MBBS in Russia. As an Indian student studying here, I understand exactly what you will go through - the admission process, visa challenges, and adapting to life in Russia.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                While studying here, I realized many Indian students need genuine guidance from someone who is actually experiencing this journey. That is why I started KelMedica - to help aspiring doctors like you with honest advice based on my real, ongoing experience in Russia.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[['Genuine', 'Experience'], ['Honest', 'Guidance'], ['Student', 'First'], ['Transparent', 'Process']].map(([n, l]) => (
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
                  { icon: '🎓', title: 'Current Student Experience', desc: 'I am studying MBBS in Russia right now. I know exactly what you will face because I am living it every day.' },
                  { icon: '💯', title: 'Real-Time Guidance', desc: 'Get advice from someone who is currently in Russia, not someone who studied years ago. I share what is happening now.' },
                  { icon: '🤝', title: 'Personal Support', desc: 'From admission to settling in Russia, I guide you based on my current experience as a student here.' },
                  { icon: '📞', title: 'Always Available', desc: 'Have questions? Reach out anytime on WhatsApp. I am here to help fellow Indian students.' },
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
            <p className="section-subtitle">Your guide who is currently walking this path.</p>
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
          <div className="space-y-6 max-w-2xl mx-auto">
            {milestones.map((m, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="card p-6 flex gap-4 items-start">
                  <span className="text-4xl flex-shrink-0">{m.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{m.event}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{m.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-black text-white mb-4">Let Me Help You</h2>
            <p className="text-white/80 mb-8">Get honest guidance from someone who has been through it all.</p>
            <Link to="/apply" className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors inline-block">Get Free Consultation</Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
