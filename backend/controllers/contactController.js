const ContactQuery = require('../models/ContactQuery')
const connectDB = require('../utils/db')

exports.submit = async (req, res) => {
  try {
    await connectDB()
    const contact = await ContactQuery.create(req.body)
    res.status(201).json({ message: 'Message sent successfully', data: contact })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getAll = async (req, res) => {
  try {
    await connectDB()
    const data = await ContactQuery.find().sort({ createdAt: -1 })
    res.json({ data })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.markReplied = async (req, res) => {
  try {
    await connectDB()
    await ContactQuery.findByIdAndUpdate(req.params.id, { replied: true })
    res.json({ message: 'Marked as replied' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.delete = async (req, res) => {
  try {
    await connectDB()
    await ContactQuery.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
