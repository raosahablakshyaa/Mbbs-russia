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

    // Get monthly application data for last 6 months
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyApplications = await StudentApplication.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ])

    // Format monthly data
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthlyData = monthlyApplications.map(item => ({
      month: monthNames[item._id.month - 1],
      applications: item.count
    }))

    res.json({ universities, applications, blogs, contacts, monthlyData })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
