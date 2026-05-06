const University = require('../models/University')
const Blog = require('../models/Blog')
const StudentApplication = require('../models/StudentApplication')
const ContactQuery = require('../models/ContactQuery')
const connectDB = require('../utils/db')

exports.getStats = async (req, res) => {
  try {
    await connectDB()
    const [universities, applications, blogs, contacts] = await Promise.all([
      University.countDocuments(),
      StudentApplication.countDocuments(),
      Blog.countDocuments(),
      ContactQuery.countDocuments(),
    ])
    res.json({ universities, applications, blogs, contacts })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
