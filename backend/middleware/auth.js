const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const connectDB = require('../utils/db')

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'No token provided' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    await connectDB()
    const admin = await Admin.findById(decoded.id).select('-password')
    if (!admin) return res.status(401).json({ message: 'Admin not found' })

    req.admin = admin
    next()
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}

module.exports = auth
