import { Link } from 'react-router-dom'
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook, FiYoutube, FiTwitter } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const footerLinks = {
  'Quick Links': [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Universities', to: '/universities' },
    { label: 'MBBS Fees', to: '/fees' },
    { label: 'Admission Process', to: '/admission' },
    { label: 'Eligibility', to: '/eligibility' },
  ],
  'Universities': [
    { label: 'Tula State University', to: '/universities/tula-state-university' },
    { label: 'Pskov State University', to: '/universities/pskov-state-university' },
    { label: 'Mari State University', to: '/universities/mari-state-university' },
    { label: 'Tver State Medical University', to: '/universities/tver-state-medical-university' },
    { label: 'Novgorod State University', to: '/universities/novgorod-state-university' },
  ],
  'Resources': [
    { label: 'Blog', to: '/blog' },
    { label: 'Apply Now', to: '/apply' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Russia Overview', to: '/russia' },
  ]
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center text-white font-bold text-xl">M</div>
              <div>
                <div className="font-bold text-white text-lg">MBBS Russia Guide</div>
                <div className="text-xs text-blue-400">Your Trusted Education Partner</div>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              We help Indian students achieve their dream of becoming doctors by providing expert guidance for MBBS admissions in top NMC-approved Russian medical universities.
            </p>
            <div className="space-y-3">
              <a href="tel:+919999999999" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                <FiPhone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                +91 99999 99999
              </a>
              <a href="mailto:info@mbbsrussiaguide.com" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                <FiMail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                info@mbbsrussiaguide.com
              </a>
              <div className="flex items-start gap-3 text-sm">
                <FiMapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                123, Medical Hub, Connaught Place, New Delhi - 110001
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: FaWhatsapp, href: 'https://wa.me/919999999999', color: 'hover:text-green-400' },
                { icon: FiFacebook, href: '#', color: 'hover:text-blue-400' },
                { icon: FiInstagram, href: '#', color: 'hover:text-pink-400' },
                { icon: FiYoutube, href: '#', color: 'hover:text-red-400' },
                { icon: FiTwitter, href: '#', color: 'hover:text-sky-400' },
              ].map(({ icon: Icon, href, color }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 ${color} transition-colors`}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} MBBS Russia Guide. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
