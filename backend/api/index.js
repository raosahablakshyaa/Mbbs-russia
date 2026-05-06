require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const app = express()

// Security
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}))

// Rate limiting
app.use('/api/applications', rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: 'Too many requests' }))
app.use('/api/contacts', rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: 'Too many requests' }))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Routes
app.use('/api/auth', require('../routes/auth'))
app.use('/api/universities', require('../routes/universities'))
app.use('/api/blogs', require('../routes/blogs'))
app.use('/api/applications', require('../routes/applications'))
app.use('/api/contacts', require('../routes/contacts'))
app.use('/api/testimonials', require('../routes/testimonials'))
app.use('/api/dashboard', require('../routes/dashboard'))
app.use('/api/upload', require('../routes/upload'))

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// 404
app.use('/api/*', (req, res) => res.status(404).json({ message: 'Route not found' }))

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Internal server error' })
})

module.exports = app
