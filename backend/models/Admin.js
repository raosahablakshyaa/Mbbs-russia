const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
}, { timestamps: true })

module.exports = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)
