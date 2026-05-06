import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMapPin, FiClock, FiDollarSign, FiArrowRight } from 'react-icons/fi'
import { FaCheckCircle } from 'react-icons/fa'

export default function UniversityCard({ university }) {
  const { name, slug, city, tuitionFees, duration, medium, recognition, bannerImage, ranking } = university

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }}
      className="card overflow-hidden group">
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700">
        {bannerImage ? (
          <img src={bannerImage} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white/20 text-6xl font-bold">{name?.[0]}</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {ranking && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-lg">
            Rank #{ranking}
          </div>
        )}
        <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
          {recognition?.slice(0, 2).map(r => (
            <span key={r} className="badge bg-green-500/90 text-white text-xs">
              <FaCheckCircle className="w-3 h-3 mr-1" /> {r}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1 line-clamp-1">{name}</h3>
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mb-4">
          <FiMapPin className="w-3.5 h-3.5" /> {city}, Russia
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <FiDollarSign className="w-4 h-4 text-blue-600 mx-auto mb-1" />
            <div className="text-xs font-semibold text-gray-900 dark:text-white">{tuitionFees}</div>
            <div className="text-xs text-gray-500">Per Year</div>
          </div>
          <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <FiClock className="w-4 h-4 text-green-600 mx-auto mb-1" />
            <div className="text-xs font-semibold text-gray-900 dark:text-white">{duration || '6 Years'}</div>
            <div className="text-xs text-gray-500">Duration</div>
          </div>
          <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-xs font-semibold text-gray-900 dark:text-white text-center">{medium || 'English'}</div>
            <div className="text-xs text-gray-500">Medium</div>
          </div>
        </div>

        <Link to={`/universities/${slug}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors group">
          View Details <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}
