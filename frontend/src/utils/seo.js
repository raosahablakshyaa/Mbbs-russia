// Central SEO configuration for all pages
export const SITE = {
  name: 'KelMedica',
  url: 'https://mbbs-russia.vercel.app',
  logo: 'https://as2.ftcdn.net/jpg/06/98/84/79/1000_F_698847976_0djgwN06xjaCZKpWHWVFnAdQKFhRfhCo.webp',
  phone: '+917404213051',
  phoneDisplay: '+91 74042 13051',
  whatsapp: '917404213051',
  email: 'lakshyayadav314@gmail.com',
  address: '123, Medical Hub, Connaught Place, New Delhi - 110001',
  foundingYear: '2008',
  description: 'KelMedica helps Indian students get admission in top NMC-approved Russian medical universities at affordable fees. Expert counseling, visa assistance & complete support.',
}

export const SEO = {
  home: {
    title: 'MBBS in Russia 2025 — Fees, Admission & Top Universities | KelMedica',
    description: 'Study MBBS in Russia at ₹3–5 lakh/year. NMC-approved universities, English medium, WHO recognized degree. Free counseling for Indian students. Apply now!',
    keywords: 'MBBS in Russia, study MBBS in Russia, MBBS Russia fees, Russia medical universities, MBBS abroad, NMC approved universities Russia, MBBS for Indian students',
  },
  russia: {
    title: 'MBBS in Russia for Indian Students 2025 — Complete Guide | KelMedica',
    description: 'Complete guide to studying MBBS in Russia. Learn about Russian medical universities, fees, eligibility, admission process and life in Russia for Indian students.',
    keywords: 'MBBS in Russia for Indian students, study medicine in Russia, Russian medical universities, MBBS abroad after NEET',
  },
  universities: {
    title: 'Top NMC Approved Medical Universities in Russia 2025 | KelMedica',
    description: 'List of top NMC-approved Russian medical universities for Indian students. Compare fees, facilities, rankings and admission process. Find the best university for MBBS in Russia.',
    keywords: 'NMC approved universities Russia, top medical colleges Russia, best MBBS university Russia Indian students, Russian medical universities list',
  },
  fees: {
    title: 'MBBS in Russia Fees 2025 — Complete Fee Structure | KelMedica',
    description: 'Complete MBBS fees in Russia 2025. Tuition fees ₹3–5 lakh/year, hostel fees, total cost for 6 years. Cheapest MBBS universities in Russia for Indian students.',
    keywords: 'MBBS Russia fees, MBBS in Russia total fees, cheapest MBBS abroad, low cost MBBS Russia, MBBS Russia fee structure 2025',
  },
  admission: {
    title: 'MBBS Admission in Russia 2025 — Step by Step Process | KelMedica',
    description: 'Complete MBBS admission process in Russia for Indian students. Step-by-step guide from application to joining university. Visa assistance included.',
    keywords: 'MBBS admission Russia, MBBS Russia admission process, how to get admission MBBS Russia, Russia MBBS admission 2025',
  },
  eligibility: {
    title: 'MBBS in Russia Eligibility Criteria 2025 for Indian Students | KelMedica',
    description: 'Eligibility criteria for MBBS in Russia: 50% in PCB, NEET qualified, age 17+. Check complete requirements for Indian students to study MBBS in Russia.',
    keywords: 'MBBS Russia eligibility, NEET score for MBBS Russia, eligibility criteria MBBS abroad, MBBS Russia requirements Indian students',
  },
  apply: {
    title: 'Apply for MBBS in Russia 2025 — Free Counseling | KelMedica',
    description: 'Apply for MBBS admission in Russia. Free expert counseling, complete documentation support, visa assistance. Get your admission letter in 7-10 days.',
    keywords: 'apply MBBS Russia, MBBS Russia application, MBBS abroad application, free MBBS counseling Russia',
  },
  about: {
    title: 'About KelMedica — Trusted MBBS Abroad Consultancy',
    description: 'KelMedica — Your trusted education partner for MBBS in Russia. Expert counselors providing genuine guidance based on real experience.',
    keywords: 'KelMedica, MBBS abroad consultancy India, best MBBS consultant Russia, trusted MBBS abroad agency',
  },
  contact: {
    title: 'Contact KelMedica — Free Counseling for MBBS in Russia',
    description: 'Contact our expert counselors for free MBBS in Russia counseling. Call, WhatsApp or email us. Office in New Delhi. Available Mon-Sat 9AM-7PM.',
    keywords: 'MBBS Russia counseling, contact KelMedica, free MBBS abroad counseling, MBBS Russia helpline',
  },
  blog: {
    title: 'MBBS in Russia Blog — Latest News, Fees & Admission Updates 2025 | KelMedica',
    description: 'Expert articles on MBBS in Russia — fees, admission, universities, NEET requirements, student life and more. Stay updated with latest MBBS abroad news.',
    keywords: 'MBBS Russia blog, MBBS abroad news, MBBS Russia updates 2025, study medicine Russia articles',
  },
}

export const universityMeta = (university) => ({
  title: `${university.name} MBBS Fees, Admission 2025 | KelMedica`,
  description: `${university.name} MBBS fees ${university.tuitionFees}, ${university.duration} English medium program. NMC approved. Complete details on admission, hostel, facilities for Indian students.`,
  keywords: `${university.name}, ${university.name} MBBS fees, ${university.name} admission, ${university.city} medical university, MBBS ${university.city} Russia`,
})

export const blogMeta = (blog) => ({
  title: `${blog.title} | KelMedica`,
  description: blog.excerpt || blog.title,
  keywords: `${blog.category} MBBS Russia, ${blog.title.toLowerCase()}`,
})
