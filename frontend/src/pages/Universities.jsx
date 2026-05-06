import { useEffect, useState } from 'react'
import { universityAPI } from '../api'
import UniversityCard from '../components/ui/UniversityCard'
import { CardSkeleton } from '../components/ui/Skeleton'
import { FadeIn, StaggerContainer, StaggerItem } from '../components/ui/Animations'
import { FiSearch, FiFilter } from 'react-icons/fi'

const staticUniversities = [
  { _id: '1', name: 'Tula State University', slug: 'tula-state-university', city: 'Tula', tuitionFees: '₹3–4.5L/yr', duration: '6 Years', medium: 'English', recognition: ['NMC', 'WHO'], ranking: 1 },
  { _id: '2', name: 'Pskov State University', slug: 'pskov-state-university', city: 'Pskov', tuitionFees: '₹3–3.5L/yr', duration: '6 Years', medium: 'English', recognition: ['NMC', 'WHO'], ranking: 2 },
  { _id: '3', name: 'Mari State University', slug: 'mari-state-university', city: 'Yoshkar-Ola', tuitionFees: '₹4–5L/yr', duration: '6 Years', medium: 'English', recognition: ['NMC', 'WHO'], ranking: 3 },
  { _id: '4', name: 'Tver State Medical University', slug: 'tver-state-medical-university', city: 'Tver', tuitionFees: '₹3.5–5L/yr', duration: '6 Years', medium: 'English', recognition: ['NMC', 'WHO'], ranking: 4 },
  { _id: '5', name: 'Novgorod State University', slug: 'novgorod-state-university', city: 'Novgorod', tuitionFees: '₹3–4L/yr', duration: '6 Years', medium: 'English', recognition: ['NMC', 'WHO'], ranking: 5 },
]

export default function Universities() {
  const [universities, setUniversities] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    universityAPI.getAll()
      .then(res => setUniversities(res.data.data || []))
      .catch(() => setUniversities(staticUniversities))
      .finally(() => setLoading(false))
  }, [])

  const list = (universities.length > 0 ? universities : staticUniversities).filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) || u.city?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="pt-20">
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Medical Universities in Russia</h1>
            <p className="text-white/80 text-lg mb-8">NMC-approved universities with affordable fees for Indian students.</p>
            <div className="max-w-md mx-auto relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search universities or cities..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map(u => (
                <StaggerItem key={u._id}><UniversityCard university={u} /></StaggerItem>
              ))}
            </StaggerContainer>
          )}
          {!loading && list.length === 0 && (
            <div className="text-center py-20 text-gray-500">No universities found matching "{search}"</div>
          )}
        </div>
      </section>
    </div>
  )
}
