import { Link, useLocation } from 'react-router-dom'
import { FiChevronRight, FiHome } from 'react-icons/fi'

const routeLabels = {
  '': 'Home',
  'russia': 'MBBS in Russia',
  'universities': 'Universities',
  'fees': 'MBBS Fees',
  'admission': 'Admission Process',
  'eligibility': 'Eligibility',
  'apply': 'Apply Now',
  'about': 'About Us',
  'contact': 'Contact',
  'blog': 'Blog',
}

export default function Breadcrumb({ custom }) {
  const location = useLocation()
  const paths = location.pathname.split('/').filter(Boolean)

  if (location.pathname === '/') return null

  const crumbs = [
    { label: 'Home', to: '/' },
    ...paths.map((p, i) => ({
      label: custom?.[i] || routeLabels[p] || p.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      to: '/' + paths.slice(0, i + 1).join('/'),
    }))
  ]

  // BreadcrumbList schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: `https://mbbs-russia.vercel.app${c.to}`,
    }))
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav aria-label="Breadcrumb" className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <ol className="flex items-center gap-1.5 flex-wrap">
            {crumbs.map((crumb, i) => (
              <li key={crumb.to} className="flex items-center gap-1.5">
                {i > 0 && <FiChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />}
                {i === 0 && <FiHome className="w-3.5 h-3.5 text-gray-400" />}
                {i === crumbs.length - 1 ? (
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium" aria-current="page">{crumb.label}</span>
                ) : (
                  <Link to={crumb.to} className="text-xs text-blue-600 hover:underline font-medium">{crumb.label}</Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  )
}
