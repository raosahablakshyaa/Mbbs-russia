const Blog = require('../models/Blog')
const connectDB = require('../utils/db')

exports.getAll = async (req, res) => {
  try {
    await connectDB()
    const { search, category } = req.query
    let query = {}
    if (!req.admin) query.isPublished = true
    if (search) query.title = { $regex: search, $options: 'i' }
    if (category && category !== 'All') query.category = category
    const data = await Blog.find(query).sort({ createdAt: -1 })
    res.json({ data })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getOne = async (req, res) => {
  try {
    await connectDB()
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true })
    if (!blog) return res.status(404).json({ message: 'Blog not found' })
    res.json({ data: blog })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.create = async (req, res) => {
  try {
    await connectDB()
    const blog = await Blog.create(req.body)
    res.status(201).json({ data: blog })
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Slug already exists' })
    res.status(500).json({ message: err.message })
  }
}

exports.update = async (req, res) => {
  try {
    await connectDB()
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!blog) return res.status(404).json({ message: 'Blog not found' })
    res.json({ data: blog })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.delete = async (req, res) => {
  try {
    await connectDB()
    await Blog.findByIdAndDelete(req.params.id)
    res.json({ message: 'Blog deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
