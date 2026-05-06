const mongoose = require('mongoose')

const UniversitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  city: { type: String, required: true },
  country: { type: String, default: 'Russia' },
  founded: Number,
  about: String,
  description: String,
  tuitionFees: String,
  hostelFees: String,
  totalFees: String,
  duration: { type: String, default: '6 Years' },
  medium: { type: String, default: 'English' },
  recognition: [String],
  ranking: Number,
  eligibility: [String],
  admissionProcess: [String],
  facilities: [String],
  officialWebsite: String,
  googleMapsLink: String,
  youtubeLink: String,
  bannerImage: String,
  galleryImages: [String],
  hostelPhotos: [String],
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.models.University || mongoose.model('University', UniversitySchema)
