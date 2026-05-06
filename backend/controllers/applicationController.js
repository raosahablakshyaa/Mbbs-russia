const StudentApplication = require('../models/StudentApplication')
const connectDB = require('../utils/db')
const nodemailer = require('nodemailer')

const sendNotification = async (application) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    })
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Application: ${application.fullName}`,
      html: `<h2>New MBBS Application</h2>
        <p><strong>Name:</strong> ${application.fullName}</p>
        <p><strong>Phone:</strong> ${application.phone}</p>
        <p><strong>Email:</strong> ${application.email}</p>
        <p><strong>NEET Score:</strong> ${application.neetScore || 'Not provided'}</p>
        <p><strong>University:</strong> ${application.preferredUniversity || 'Not specified'}</p>
        <p><strong>Message:</strong> ${application.message || 'None'}</p>`
    })
  } catch (e) {
    console.error('Email notification failed:', e.message)
  }
}

exports.submit = async (req, res) => {
  try {
    await connectDB()
    const application = await StudentApplication.create(req.body)
    sendNotification(application)
    res.status(201).json({ message: 'Application submitted successfully', data: application })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getAll = async (req, res) => {
  try {
    await connectDB()
    const { status, search } = req.query
    let query = {}
    if (status && status !== 'All') query.status = status
    if (search) query.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
    ]
    const data = await StudentApplication.find(query).sort({ createdAt: -1 })
    res.json({ data })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.updateStatus = async (req, res) => {
  try {
    await connectDB()
    const app = await StudentApplication.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
    res.json({ data: app })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.delete = async (req, res) => {
  try {
    await connectDB()
    await StudentApplication.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
