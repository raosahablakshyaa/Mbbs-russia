const mongoose = require('mongoose')

const StudentApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  city: String,
  neetScore: String,
  preferredUniversity: String,
  message: String,
  status: { type: String, enum: ['New', 'Contacted', 'Processing', 'Admitted'], default: 'New' },
}, { timestamps: true })

module.exports = mongoose.models.StudentApplication || mongoose.model('StudentApplication', StudentApplicationSchema)
