import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogAPI } from '../api'
import { FadeIn, StaggerContainer, StaggerItem } from '../components/ui/Animations'
import { Skeleton } from '../components/ui/Skeleton'
import { FiSearch, FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi'
import SEOHead from '../components/SEOHead'
import { SEO } from '../utils/seo'

const staticBlogs = [
  { _id: '1', title: 'MBBS in Russia Fees 2024 — Complete Guide for Indian Students', slug: 'mbbs-in-russia-fees-2024', excerpt: 'Complete breakdown of MBBS fees in Russia including tuition, hostel, food and other expenses for Indian students.', category: 'Fees', readTime: '5 min', createdAt: '2024-01-15', featuredImage: '' },
  { _id: '2', title: 'Top 5 Cheapest MBBS Universities in Russia for Indian Students', slug: 'cheapest-mbbs-universities-russia', excerpt: 'Discover the most affordable NMC-approved Russian medical universities with complete fee structure and admission details.', category: 'Universities', readTime: '7 min', createdAt: '2024-01-20', featuredImage: '' },
  { _id: '3', title: 'MBBS Abroad After NEET — Russia vs Other Countries', slug: 'mbbs-abroad-after-neet-russia', excerpt: 'Comparing MBBS abroad options after NEET. Why Russia is the best choice for Indian students seeking affordable medical education.', category: 'Comparison', readTime: '8 min', createdAt: '2024-02-01', featuredImage: '' },
  { _id: '4', title: 'Russia vs India MBBS — Which is Better in 2024?', slug: 'russia-vs-india-mbbs', excerpt: 'Detailed comparison of MBBS in Russia vs India covering fees, quality, recognition, career prospects and more.', category: 'Comparison', readTime: '10 min', createdAt: '2024-02-10', featuredImage: '' },
  { _id: '5', title: 'NMC Approved Universities in Russia — Complete List 2024', slug: 'nmc-approved-universities-russia', excerpt: 'Official list of NMC (National Medical Commission) approved Russian medical universities for Indian students.', category: 'Universities', readTime: '6 min', createdAt: '2024-02-15', featuredImage: '' },
  { _id: '6', title: 'FMGE Exam Guide for Students Returning from Russia', slug: 'fmge-exam-guide-russia-students', excerpt: 'Everything you need to know about FMGE/NEXT exam for Indian students who completed MBBS from Russia.', category: 'Exams', readTime: '9 min', createdAt: '2024-02-20', featuredImage: '' },
]

const categories = ['All', 'Fees', 'Universities', 'Comparison', 'Exams', 'Visa', 'Life in Russia']

export default function Blog() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    blogAPI.getAll()
      .then(res => setBlogs(res.data.data || []))
      .catch(() => setBlogs(staticBlogs))
      .finally(() => setLoading(false))
  }, [])

  const list = (blogs.length > 0 ? blogs : staticBlogs).filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || b.category === category
    return matchSearch && matchCat
  })

  return (
    <div className="pt-20">
      <SEOHead {...SEO.blog} canonical="/blog" />
      <section className="py-16 bg-gradient-to-br from-indigo-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">MBBS Russia Blog</h1>
            <p className="text-white/80 text-lg mb-8">Expert articles, guides and tips for Indian students planning MBBS in Russia.</p>
            <div className="max-w-md mx-auto relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-700'}`}>
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card p-6 space-y-3">
                  <Skeleton className="h-40 w-full rounded-xl" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map(blog => (
                <StaggerItem key={blog._id}>
                  <Link to={`/blog/${blog.slug}`} className="card overflow-hidden group block">
                    <div className="h-44 bg-gradient-to-br from-blue-900 to-indigo-700 overflow-hidden">
                      {blog.featuredImage ? (
                        <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20 text-5xl font-black">📰</div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        {blog.category && <span className="badge bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">{blog.category}</span>}
                        <span className="flex items-center gap-1 text-xs text-gray-500"><FiClock className="w-3 h-3" />{blog.readTime || '5 min'}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{blog.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">{blog.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-gray-500"><FiCalendar className="w-3 h-3" />{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span className="text-blue-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Read <FiArrowRight className="w-3 h-3" /></span>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
          {!loading && list.length === 0 && (
            <div className="text-center py-20 text-gray-500">No articles found.</div>
          )}
        </div>
      </section>
    </div>
  )
}
