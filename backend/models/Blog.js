const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  excerpt: String,
  content: { type: String, required: true },
  featuredImage: String,
  category: String,
  readTime: String,
  metaTitle: String,
  metaDescription: String,
  isPublished: { type: Boolean, default: false },
  author: { type: String, default: 'MBBS Russia Guide' },
}, { timestamps: true })

module.exports = mongoose.models.Blog || mongoose.model('Blog', BlogSchema)
