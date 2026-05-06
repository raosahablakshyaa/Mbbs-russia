const Testimonial = require('../models/Testimonial')
const connectDB = require('../utils/db')

exports.getAll = async (req, res) => {
  try {
    await connectDB()
    const query = req.admin ? {} : { isActive: true }
    const data = await Testimonial.find(query).sort({ createdAt: -1 })
    res.json({ data })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.create = async (req, res) => {
  try {
    await connectDB()
    const t = await Testimonial.create(req.body)
    res.status(201).json({ data: t })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.update = async (req, res) => {
  try {
    await connectDB()
    const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ data: t })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.delete = async (req, res) => {
  try {
    await connectDB()
    await Testimonial.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
