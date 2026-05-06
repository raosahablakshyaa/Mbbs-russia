import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { blogAPI } from '../api'
import { Skeleton } from '../components/ui/Skeleton'
import { FiCalendar, FiClock, FiArrowLeft, FiShare2 } from 'react-icons/fi'
import toast from 'react-hot-toast'

const staticContent = {
  'mbbs-in-russia-fees-2024': {
    title: 'MBBS in Russia Fees 2024 — Complete Guide for Indian Students',
    category: 'Fees', readTime: '5 min', createdAt: '2024-01-15',
    content: `<h2>MBBS in Russia Fees 2024</h2>
<p>Russia has emerged as one of the top destinations for Indian students seeking affordable MBBS education. The total cost of MBBS in Russia is significantly lower than private medical colleges in India.</p>
<h3>Tuition Fees</h3>
<p>The tuition fees for MBBS in Russia range from ₹3 lakh to ₹5 lakh per year depending on the university. Here is a breakdown:</p>
<ul>
<li><strong>Tula State University:</strong> ₹3–4.5 lakh/year</li>
<li><strong>Pskov State University:</strong> ₹3–3.5 lakh/year</li>
<li><strong>Mari State University:</strong> ₹4–5 lakh/year</li>
<li><strong>Tver State Medical University:</strong> ₹3.5–5 lakh/year</li>
<li><strong>Novgorod State University:</strong> ₹3–4 lakh/year</li>
</ul>
<h3>Hostel Fees</h3>
<p>Hostel fees in Russia are very affordable, ranging from ₹55,000 to ₹70,000 per year. Most universities provide safe and comfortable hostel facilities for international students.</p>
<h3>Total Cost for 6 Years</h3>
<p>The total cost of completing MBBS in Russia including tuition, hostel, food, and other expenses ranges from ₹22 lakh to ₹35 lakh for the entire 6-year course.</p>
<p>Compare this to private MBBS in India which can cost ₹50 lakh to ₹1 crore or more!</p>`,
  },
}

export default function BlogDetail() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    blogAPI.getOne(slug)
      .then(res => setBlog(res.data.data))
      .catch(() => setBlog(staticContent[slug] || null))
      .finally(() => setLoading(false))
  }, [slug])

  const share = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  if (loading) return (
    <div className="pt-20 max-w-4xl mx-auto px-4 py-16 space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-64 w-full rounded-2xl" />
      {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
    </div>
  )

  if (!blog) return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">📰</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h2>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    </div>
  )

  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6 text-sm">
          <FiArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {blog.category && <span className="badge bg-blue-100 dark:bg-blue-900/30 text-blue-600">{blog.category}</span>}
            <span className="flex items-center gap-1 text-sm text-gray-500"><FiCalendar className="w-4 h-4" />{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span className="flex items-center gap-1 text-sm text-gray-500"><FiClock className="w-4 h-4" />{blog.readTime || '5 min read'}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">{blog.title}</h1>
          {blog.excerpt && <p className="text-lg text-gray-600 dark:text-gray-400">{blog.excerpt}</p>}
        </div>

        {blog.featuredImage && (
          <div className="rounded-2xl overflow-hidden mb-8 h-72">
            <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="card p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
            style={{ lineHeight: '1.8', color: 'inherit' }} />
        </div>

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Link to="/blog" className="btn-secondary text-sm">← More Articles</Link>
          <button onClick={share} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
            <FiShare2 className="w-4 h-4" /> Share
          </button>
        </div>

        <div className="mt-8 card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Ready to Apply for MBBS in Russia?</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Get free expert counseling and secure your admission today.</p>
          <Link to="/apply" className="btn-primary text-sm inline-block">Apply Now — Free</Link>
        </div>
      </div>
    </div>
  )
}
