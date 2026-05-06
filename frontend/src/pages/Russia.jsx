import { Link } from 'react-router-dom'
import { FadeIn, StaggerContainer, StaggerItem } from '../components/ui/Animations'
import { FiArrowRight, FiMapPin, FiThermometer, FiUsers } from 'react-icons/fi'
import { FaLandmark, FaUniversity, FaPassport } from 'react-icons/fa'

const facts = [
  { icon: FaLandmark, label: 'Capital', value: 'Moscow' },
  { icon: FiUsers, label: 'Population', value: '144 Million' },
  { icon: FiThermometer, label: 'Climate', value: 'Continental' },
  { icon: FiMapPin, label: 'Area', value: '17.1M km²' },
  { icon: FaUniversity, label: 'Medical Universities', value: '60+' },
  { icon: FaPassport, label: 'Indian Students', value: '15,000+' },
]

const cities = [
  { name: 'Moscow', desc: 'Capital city with world-class infrastructure and top medical universities.', emoji: '🏙️' },
  { name: 'Tula', desc: 'Historic city 200km from Moscow, home to Tula State University.', emoji: '🏛️' },
  { name: 'Tver', desc: 'Beautiful city on the Volga river with excellent medical facilities.', emoji: '🌊' },
  { name: 'Pskov', desc: 'Ancient city near Estonia border with affordable living costs.', emoji: '🏰' },
  { name: 'Yoshkar-Ola', desc: 'Capital of Mari El Republic, home to Mari State University.', emoji: '🌿' },
  { name: 'Novgorod', desc: 'One of Russia\'s oldest cities with a rich cultural heritage.', emoji: '⛪' },
]

export default function Russia() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-red-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1513326738677-b964603b136d?w=1600')] bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="text-6xl mb-4">🇷🇺</div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Russia — A Land of<br /><span className="text-yellow-400">World-Class Medical Education</span></h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">Russia is home to some of the world's finest medical universities, offering affordable MBBS programs recognized globally.</p>
            <Link to="/universities" className="btn-red inline-flex items-center gap-2">Explore Universities <FiArrowRight /></Link>
          </FadeIn>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="section-title">Russia at a Glance</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {facts.map(f => (
              <StaggerItem key={f.label}>
                <div className="card p-5 text-center">
                  <f.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="font-bold text-gray-900 dark:text-white">{f.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{f.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* About Russia for MBBS */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <span className="badge bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-3">Why Russia?</span>
              <h2 className="section-title mb-4">Russia for MBBS — The Smart Choice</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>Russia has been a preferred destination for Indian medical students for over 3 decades. With 60+ medical universities, many of which are NMC-approved, Russia offers a world-class MBBS education at highly affordable fees.</p>
                <p>The Russian government actively welcomes international students, and Indian students form one of the largest groups studying medicine in Russia. Universities have dedicated Indian student support cells, Indian food options, and cultural integration programs.</p>
                <p>The MBBS degree from Russia (called MD in Russia) is equivalent to the Indian MBBS degree and is recognized by WHO, NMC, and medical councils worldwide.</p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[['60+', 'Medical Universities'], ['15,000+', 'Indian Students'], ['50+', 'Years of Excellence'], ['100%', 'NMC Compliance']].map(([n, l]) => (
                  <div key={l} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                    <div className="text-2xl font-black text-blue-600">{n}</div>
                    <div className="text-sm text-gray-500">{l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {['🏥 Advanced Teaching Hospitals', '📚 Research-Oriented Curriculum', '🌍 Globally Recognized Degree', '💰 Affordable Tuition Fees', '🏠 Safe Campus Hostels', '🍛 Indian Food Available', '✈️ Easy Visa Process', '👨‍⚕️ Experienced Faculty'].map((item, i) => (
                  <div key={i} className="card p-4 text-sm text-gray-700 dark:text-gray-300 font-medium">{item}</div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* University Cities */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="section-title">University Cities in Russia</h2>
            <p className="section-subtitle">Explore the cities where top medical universities are located.</p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map(city => (
              <StaggerItem key={city.name}>
                <div className="card p-6">
                  <div className="text-4xl mb-3">{city.emoji}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{city.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{city.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-black text-white mb-4">Start Your MBBS Journey in Russia</h2>
            <p className="text-white/80 mb-8">Get free expert counseling and secure your admission today.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/apply" className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors">Apply Now</Link>
              <Link to="/universities" className="bg-blue-700 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-800 transition-colors border border-blue-500">View Universities</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
