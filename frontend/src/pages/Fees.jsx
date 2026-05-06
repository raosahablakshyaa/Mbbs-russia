import { Link } from 'react-router-dom'
import { FadeIn } from '../components/ui/Animations'
import { FiArrowRight } from 'react-icons/fi'
import SEOHead from '../components/SEOHead'
import { SEO } from '../utils/seo'

const fees = [
  { name: 'Tula State University', tuition: '₹3–4.5 Lakh', hostel: '₹60,000', food: '₹40,000', total: '₹4–5.5 Lakh', duration: '6 Years', medium: 'English' },
  { name: 'Pskov State University', tuition: '₹3–3.5 Lakh', hostel: '₹55,000', food: '₹38,000', total: '₹3.55–4.05 Lakh', duration: '6 Years', medium: 'English' },
  { name: 'Mari State University', tuition: '₹4–5 Lakh', hostel: '₹65,000', food: '₹42,000', total: '₹4.65–5.65 Lakh', duration: '6 Years', medium: 'English' },
  { name: 'Tver State Medical University', tuition: '₹3.5–5 Lakh', hostel: '₹70,000', food: '₹45,000', total: '₹4.2–5.7 Lakh', duration: '6 Years', medium: 'English' },
  { name: 'Novgorod State University', tuition: '₹3–4 Lakh', hostel: '₹60,000', food: '₹40,000', total: '₹3.6–4.6 Lakh', duration: '6 Years', medium: 'English' },
]

const otherCosts = [
  { item: 'One-time Registration Fee', cost: '₹50,000–₹80,000' },
  { item: 'Medical Insurance (per year)', cost: '₹15,000–₹25,000' },
  { item: 'Flight Tickets (one way)', cost: '₹25,000–₹40,000' },
  { item: 'Visa & Documentation', cost: '₹15,000–₹20,000' },
  { item: 'Personal Expenses (per year)', cost: '₹30,000–₹50,000' },
  { item: 'Books & Study Material', cost: '₹10,000–₹20,000' },
]

export default function Fees() {
  return (
    <div className="pt-20">
      <SEOHead {...SEO.fees} canonical="/fees" />
      <section className="py-16 bg-gradient-to-br from-green-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">MBBS Fees in Russia</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">Complete transparent fee structure for all top Russian medical universities for Indian students.</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-10">
            <h2 className="section-title mb-2">University-wise Fee Comparison</h2>
            <p className="text-gray-500">All fees are approximate and in Indian Rupees (₹). Actual fees may vary slightly.</p>
          </FadeIn>
          <FadeIn>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    {['University', 'Tuition/Year', 'Hostel/Year', 'Food/Year', 'Total/Year', 'Duration', 'Medium'].map(h => (
                      <th key={h} className="px-5 py-4 text-left text-sm font-semibold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fees.map((row, i) => (
                    <tr key={i} className={`border-t border-gray-100 dark:border-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50 dark:bg-gray-800/30'}`}>
                      <td className="px-5 py-4 font-semibold text-gray-900 dark:text-white text-sm">{row.name}</td>
                      <td className="px-5 py-4 text-green-600 font-semibold text-sm">{row.tuition}</td>
                      <td className="px-5 py-4 text-gray-600 dark:text-gray-400 text-sm">{row.hostel}</td>
                      <td className="px-5 py-4 text-gray-600 dark:text-gray-400 text-sm">{row.food}</td>
                      <td className="px-5 py-4 text-blue-600 font-bold text-sm">{row.total}</td>
                      <td className="px-5 py-4 text-gray-600 dark:text-gray-400 text-sm">{row.duration}</td>
                      <td className="px-5 py-4 text-sm"><span className="badge bg-blue-100 dark:bg-blue-900/30 text-blue-600">{row.medium}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <FadeIn>
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">Other Costs to Consider</h3>
                <div className="space-y-3">
                  {otherCosts.map(c => (
                    <div key={c.item} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{c.item}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{c.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">💡 Total 6-Year Cost Estimate</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Cheapest Option (Pskov)', value: '~₹22–25 Lakhs' },
                    { label: 'Average Cost', value: '~₹25–30 Lakhs' },
                    { label: 'Premium Option (Tver)', value: '~₹28–35 Lakhs' },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-blue-100 dark:border-blue-800 last:border-0">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                      <span className="text-sm font-bold text-blue-600">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/20 rounded-xl text-sm text-green-700 dark:text-green-400">
                  ✅ Compare: Private MBBS in India costs ₹50–1 Crore+
                </div>
                <Link to="/apply" className="btn-primary w-full text-center block mt-4">Get Exact Fee Quote</Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
