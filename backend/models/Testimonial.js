const mongoose = require('mongoose')

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  university: String,
  year: String,
  message: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema)
