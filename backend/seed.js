require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connected')
}

const University = require('./models/University')
const Blog = require('./models/Blog')
const Testimonial = require('./models/Testimonial')

const universities = [
  {
    name: 'Tula State University', slug: 'tula-state-university', city: 'Tula', country: 'Russia', founded: 1930, ranking: 1,
    about: 'Tula State University is one of the leading universities in Russia, located in the historic city of Tula, just 200km from Moscow. The medical faculty offers a 6-year MBBS program in English medium, recognized by NMC and WHO.',
    tuitionFees: '₹3–4.5 Lakh/year', hostelFees: '₹60,000/year', totalFees: '₹3.6–5.1 Lakh/year',
    duration: '6 Years', medium: 'English',
    recognition: ['NMC Approved', 'WHO Listed', 'ECFMG Recognized'],
    facilities: ['Modern Library', 'Advanced Labs', 'Sports Complex', 'Indian Canteen', 'Wi-Fi Campus', '24/7 Security'],
    eligibility: ['NEET Qualified', '50% in PCB', 'Age 17+', 'Valid Passport'],
    admissionProcess: ['Submit online application', 'Receive invitation letter (7-10 days)', 'Apply for student visa', 'Book flight to Tula', 'University enrollment & hostel allotment'],
    officialWebsite: 'https://tsu.tula.ru', isActive: true,
  },
  {
    name: 'Pskov State University', slug: 'pskov-state-university', city: 'Pskov', country: 'Russia', founded: 1932, ranking: 2,
    about: 'Pskov State University is located in the ancient city of Pskov, near the Estonian border. It offers affordable MBBS education with a strong focus on practical clinical training.',
    tuitionFees: '₹3–3.5 Lakh/year', hostelFees: '₹55,000/year', totalFees: '₹3.55–4.05 Lakh/year',
    duration: '6 Years', medium: 'English',
    recognition: ['NMC Approved', 'WHO Listed'],
    facilities: ['Research Labs', 'Teaching Hospital', 'Student Hostel', 'Indian Food', 'Sports Facilities'],
    eligibility: ['NEET Qualified', '50% in PCB', 'Age 17+', 'Valid Passport'],
    admissionProcess: ['Online application', 'Invitation letter', 'Visa processing', 'Travel to Pskov', 'Enrollment'],
    officialWebsite: 'https://pskgu.ru', isActive: true,
  },
  {
    name: 'Mari State University', slug: 'mari-state-university', city: 'Yoshkar-Ola', country: 'Russia', founded: 1972, ranking: 3,
    about: 'Mari State University is located in Yoshkar-Ola, the capital of the Mari El Republic. It is known for its excellent medical faculty and affordable fees for international students.',
    tuitionFees: '₹4–5 Lakh/year', hostelFees: '₹65,000/year', totalFees: '₹4.65–5.65 Lakh/year',
    duration: '6 Years', medium: 'English',
    recognition: ['NMC Approved', 'WHO Listed'],
    facilities: ['Modern Campus', 'Teaching Hospital', 'Library', 'Indian Canteen', 'Hostel'],
    eligibility: ['NEET Qualified', '50% in PCB', 'Age 17+', 'Valid Passport'],
    admissionProcess: ['Apply online', 'Get invitation letter', 'Visa application', 'Travel', 'Join university'],
    officialWebsite: 'https://marsu.ru', isActive: true,
  },
  {
    name: 'Tver State Medical University', slug: 'tver-state-medical-university', city: 'Tver', country: 'Russia', founded: 1936, ranking: 4,
    about: 'Tver State Medical University is a dedicated medical university located on the banks of the Volga river. It has a long history of training medical professionals and is highly regarded for clinical training.',
    tuitionFees: '₹3.5–5 Lakh/year', hostelFees: '₹70,000/year', totalFees: '₹4.2–5.7 Lakh/year',
    duration: '6 Years', medium: 'English',
    recognition: ['NMC Approved', 'WHO Listed', 'MCI Recognized'],
    facilities: ['Dedicated Medical Campus', 'University Hospital', 'Simulation Lab', 'Indian Food', 'Hostel', 'Library'],
    eligibility: ['NEET Qualified', '50% in PCB', 'Age 17+', 'Valid Passport'],
    admissionProcess: ['Submit application', 'Receive letter', 'Visa processing', 'Travel to Tver', 'Enrollment'],
    officialWebsite: 'https://tvergma.ru', isActive: true,
  },
  {
    name: 'Novgorod State University', slug: 'novgorod-state-university', city: 'Veliky Novgorod', country: 'Russia', founded: 1993, ranking: 5,
    about: 'Novgorod State University, named after Yaroslav the Wise, offers quality medical education at very affordable fees in one of Russia\'s oldest and most historic cities.',
    tuitionFees: '₹3–4 Lakh/year', hostelFees: '₹60,000/year', totalFees: '₹3.6–4.6 Lakh/year',
    duration: '6 Years', medium: 'English',
    recognition: ['NMC Approved', 'WHO Listed'],
    facilities: ['Modern Labs', 'Teaching Hospital', 'Library', 'Sports Complex', 'Hostel'],
    eligibility: ['NEET Qualified', '50% in PCB', 'Age 17+', 'Valid Passport'],
    admissionProcess: ['Online application', 'Invitation letter', 'Visa', 'Travel', 'Enrollment'],
    officialWebsite: 'https://novsu.ru', isActive: true,
  },
]

const blogs = [
  {
    title: 'MBBS in Russia Fees 2024 — Complete Guide for Indian Students',
    slug: 'mbbs-in-russia-fees-2024',
    excerpt: 'Complete breakdown of MBBS fees in Russia including tuition, hostel, food and other expenses for Indian students.',
    content: `<h2>MBBS in Russia Fees 2024</h2><p>Russia has emerged as one of the top destinations for Indian students seeking affordable MBBS education. The total cost of MBBS in Russia is significantly lower than private medical colleges in India.</p><h3>Tuition Fees</h3><p>The tuition fees for MBBS in Russia range from ₹3 lakh to ₹5 lakh per year depending on the university.</p><ul><li><strong>Tula State University:</strong> ₹3–4.5 lakh/year</li><li><strong>Pskov State University:</strong> ₹3–3.5 lakh/year</li><li><strong>Mari State University:</strong> ₹4–5 lakh/year</li><li><strong>Tver State Medical University:</strong> ₹3.5–5 lakh/year</li><li><strong>Novgorod State University:</strong> ₹3–4 lakh/year</li></ul><h3>Total 6-Year Cost</h3><p>The total cost including tuition, hostel, food, and other expenses ranges from ₹22 lakh to ₹35 lakh for the entire 6-year course. Compare this to private MBBS in India which costs ₹50 lakh to ₹1 crore!</p>`,
    category: 'Fees', readTime: '5 min', isPublished: true,
  },
  {
    title: 'Top 5 Cheapest MBBS Universities in Russia for Indian Students',
    slug: 'cheapest-mbbs-universities-russia',
    excerpt: 'Discover the most affordable NMC-approved Russian medical universities with complete fee structure and admission details.',
    content: `<h2>Cheapest MBBS Universities in Russia</h2><p>Russia offers some of the most affordable MBBS programs in the world. Here are the top 5 cheapest NMC-approved universities for Indian students.</p><h3>1. Pskov State University</h3><p>With tuition fees of just ₹3–3.5 lakh per year, Pskov State University is the most affordable option for Indian students.</p><h3>2. Tula State University</h3><p>Located just 200km from Moscow, Tula State University offers excellent education at ₹3–4.5 lakh per year.</p><h3>3. Novgorod State University</h3><p>One of Russia's oldest universities offering MBBS at ₹3–4 lakh per year in a historic city setting.</p>`,
    category: 'Universities', readTime: '7 min', isPublished: true,
  },
  {
    title: 'NEET Qualified? Here\'s Why Russia is Your Best MBBS Option',
    slug: 'neet-qualified-mbbs-russia-best-option',
    excerpt: 'If you are NEET qualified but couldn\'t get a government seat in India, Russia offers the best value for money MBBS education.',
    content: `<h2>NEET Qualified? Choose Russia for MBBS</h2><p>Every year, lakhs of Indian students qualify NEET but don't get government medical college seats. Private colleges in India charge ₹50 lakh to ₹1 crore for MBBS. Russia offers a much better alternative.</p><h3>Why Russia After NEET?</h3><ul><li>NMC approved universities</li><li>Fees just ₹3–5 lakh per year</li><li>English medium instruction</li><li>WHO recognized degree</li><li>Valid for FMGE/NEXT exam</li></ul><h3>FMGE Pass Rate</h3><p>Students from top Russian universities have shown improving FMGE pass rates. With proper preparation from day 1, you can clear FMGE and practice in India.</p>`,
    category: 'General', readTime: '6 min', isPublished: true,
  },
]

const testimonials = [
  { name: 'Priya Sharma', university: 'Tula State University', year: '3rd Year', message: 'MBBS Russia Guide made my dream come true. The entire process from application to visa was handled smoothly. I am now in my 3rd year and loving every moment of my medical journey!', rating: 5 },
  { name: 'Rahul Verma', university: 'Tver State Medical University', year: '2nd Year', message: 'I was confused about studying abroad but the counselors here guided me perfectly. The fees are very affordable and the university facilities are excellent. Highly recommend!', rating: 5 },
  { name: 'Anjali Singh', university: 'Mari State University', year: '4th Year', message: 'Best decision of my life! The support from MBBS Russia Guide was outstanding. They helped with everything — admission, visa, accommodation. Now in 4th year and very happy.', rating: 5 },
  { name: 'Vikram Patel', university: 'Pskov State University', year: '1st Year', message: 'Just joined Pskov State University this year. The campus is beautiful and the faculty is very supportive. MBBS Russia Guide made the whole process stress-free for me and my family.', rating: 5 },
  { name: 'Sneha Gupta', university: 'Novgorod State University', year: '5th Year', message: 'Almost done with my MBBS! Russia has been an amazing experience. The clinical training here is top-notch. Thank you MBBS Russia Guide for helping me choose the right university.', rating: 5 },
]

async function seed() {
  try {
    await connectDB()

    // Clear existing data
    await University.deleteMany({})
    await Blog.deleteMany({})
    await Testimonial.deleteMany({})

    // Insert seed data
    await University.insertMany(universities)
    console.log(`✅ ${universities.length} universities seeded`)

    await Blog.insertMany(blogs)
    console.log(`✅ ${blogs.length} blogs seeded`)

    await Testimonial.insertMany(testimonials)
    console.log(`✅ ${testimonials.length} testimonials seeded`)

    console.log('\n🎉 Database seeded successfully!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seed failed:', err.message)
    process.exit(1)
  }
}

seed()
