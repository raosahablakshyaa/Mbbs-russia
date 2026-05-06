const mongoose = require('mongoose')

const ContactQuerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: String,
  message: { type: String, required: true },
  replied: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.models.ContactQuery || mongoose.model('ContactQuery', ContactQuerySchema)
