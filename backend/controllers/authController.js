const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const connectDB = require('../utils/db')

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

const seedAdmin = async () => {
  const count = await Admin.countDocuments()
  if (count === 0) {
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10)
    await Admin.create({ name: 'Admin', email: process.env.ADMIN_EMAIL || 'admin@mbbsrussiaguide.com', password: hashed, role: 'superadmin' })
    console.log('Default admin created')
  }
}

exports.login = async (req, res) => {
  try {
    await connectDB()
    await seedAdmin()
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' })

    const admin = await Admin.findOne({ email: email.toLowerCase() })
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' })

    const match = await bcrypt.compare(password, admin.password)
    if (!match) return res.status(401).json({ message: 'Invalid credentials' })

    res.json({ token: signToken(admin._id), name: admin.name, email: admin.email, role: admin.role })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.me = async (req, res) => {
  res.json({ name: req.admin.name, email: req.admin.email, role: req.admin.role })
}

exports.updateProfile = async (req, res) => {
  try {
    await connectDB()
    const { name, email } = req.body
    const admin = await Admin.findByIdAndUpdate(req.admin._id, { name, email }, { new: true }).select('-password')
    res.json({ name: admin.name, email: admin.email })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.updatePassword = async (req, res) => {
  try {
    await connectDB()
    const { currentPassword, newPassword } = req.body
    const admin = await Admin.findById(req.admin._id)
    const match = await bcrypt.compare(currentPassword, admin.password)
    if (!match) return res.status(400).json({ message: 'Current password is incorrect' })
    admin.password = await bcrypt.hash(newPassword, 10)
    await admin.save()
    res.json({ message: 'Password updated' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
