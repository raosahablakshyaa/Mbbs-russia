const express = require('express')
const router = express.Router()
const University = require('../models/University')
const Blog = require('../models/Blog')
const connectDB = require('../utils/db')

const SITE_URL = 'https://mbbs-russia.vercel.app'

const staticRoutes = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/russia', priority: '0.9', changefreq: 'weekly' },
  { url: '/universities', priority: '0.9', changefreq: 'weekly' },
  { url: '/fees', priority: '0.9', changefreq: 'weekly' },
  { url: '/admission', priority: '0.8', changefreq: 'monthly' },
  { url: '/eligibility', priority: '0.8', changefreq: 'monthly' },
  { url: '/apply', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog', priority: '0.8', changefreq: 'daily' },
  { url: '/about', priority: '0.6', changefreq: 'monthly' },
  { url: '/contact', priority: '0.6', changefreq: 'monthly' },
]

router.get('/sitemap.xml', async (req, res) => {
  try {
    await connectDB()
    const [universities, blogs] = await Promise.all([
      University.find({ isActive: true }).select('slug updatedAt'),
      Blog.find({ isPublished: true }).select('slug updatedAt'),
    ])

    const today = new Date().toISOString().split('T')[0]

    const urls = [
      ...staticRoutes.map(r => `
  <url>
    <loc>${SITE_URL}${r.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`),
      ...universities.map(u => `
  <url>
    <loc>${SITE_URL}/universities/${u.slug}</loc>
    <lastmod>${u.updatedAt?.toISOString().split('T')[0] || today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`),
      ...blogs.map(b => `
  <url>
    <loc>${SITE_URL}/blog/${b.slug}</loc>
    <lastmod>${b.updatedAt?.toISOString().split('T')[0] || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`),
    ]

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join('')}
</urlset>`

    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.send(xml)
  } catch (err) {
    res.status(500).send('Error generating sitemap')
  }
})

router.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.send(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml`)
})

module.exports = router
