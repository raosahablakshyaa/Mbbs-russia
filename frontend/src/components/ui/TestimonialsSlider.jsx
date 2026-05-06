import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'

export default function TestimonialsSlider({ testimonials = [] }) {
  const [current, setCurrent] = useState(0)
  const [auto, setAuto] = useState(true)

  const next = useCallback(() => setCurrent(c => (c + 1) % testimonials.length), [testimonials.length])
  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    if (!auto || testimonials.length === 0) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [auto, next, testimonials.length])

  if (!testimonials.length) return null

  const t = testimonials[current]

  return (
    <div className="relative" onMouseEnter={() => setAuto(false)} onMouseLeave={() => setAuto(true)}>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto">
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className={`w-4 h-4 ${i < (t.rating || 5) ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 italic">"{t.message}"</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {t.name?.[0] || 'S'}
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">{t.name}</div>
              <div className="text-sm text-gray-500">{t.university} • {t.year}</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button onClick={prev} className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
          <FiChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-blue-600 w-6' : 'bg-gray-300 dark:bg-gray-600'}`} />
          ))}
        </div>
        <button onClick={next} className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
