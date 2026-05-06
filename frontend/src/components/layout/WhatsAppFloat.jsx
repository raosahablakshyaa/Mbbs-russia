import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { useState } from 'react'

export default function WhatsAppFloat() {
  const [show, setShow] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {show && (
          <motion.div initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 w-72 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <FaWhatsapp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">KelMedica</div>
                <div className="text-xs text-green-500 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span> Online
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              👋 Hi! Need help with MBBS admissions in Russia? Chat with our expert counselor now!
            </p>
            <a href="https://wa.me/917404213051?text=Hi, I need help with MBBS admission in Russia"
              target="_blank" rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-2.5 rounded-xl text-sm font-semibold transition-colors">
              Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button onClick={() => setShow(!show)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 transition-colors">
        <FaWhatsapp className="w-7 h-7 text-white" />
      </motion.button>
    </div>
  )
}
