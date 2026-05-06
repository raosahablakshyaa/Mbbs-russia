const University = require('../models/University')
const connectDB = require('../utils/db')

exports.getAll = async (req, res) => {
  try {
    await connectDB()
    const { limit, search } = req.query
    let query = {}
    if (search) query.name = { $regex: search, $options: 'i' }
    // Public: only active; admin: all
    if (!req.admin) query.isActive = true

    let q = University.find(query).sort({ ranking: 1, createdAt: -1 })
    if (limit) q = q.limit(Number(limit))
    const data = await q
    res.json({ data })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getOne = async (req, res) => {
  try {
    await connectDB()
    const university = await University.findOne({ slug: req.params.slug, isActive: true })
    if (!university) return res.status(404).json({ message: 'University not found' })
    res.json({ data: university })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.create = async (req, res) => {
  try {
    await connectDB()
    const university = await University.create(req.body)
    res.status(201).json({ data: university })
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Slug already exists' })
    res.status(500).json({ message: err.message })
  }
}

exports.update = async (req, res) => {
  try {
    await connectDB()
    const university = await University.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!university) return res.status(404).json({ message: 'University not found' })
    res.json({ data: university })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.delete = async (req, res) => {
  try {
    await connectDB()
    await University.findByIdAndDelete(req.params.id)
    res.json({ message: 'University deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
