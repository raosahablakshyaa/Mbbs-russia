# MBBS Russia Guide — Full Stack Website

A complete production-ready education consultancy website for Indian students seeking MBBS in Russia.

## 🏗️ Project Structure

```
russia study/
├── frontend/          # React + Vite + Tailwind CSS
└── backend/           # Node.js + Express + MongoDB
```

## 🚀 Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, React Router DOM, Axios, Recharts  
**Backend:** Node.js, Express.js, MongoDB + Mongoose, JWT Auth, Cloudinary, Nodemailer  
**Deployment:** Vercel (both frontend & backend)

---

## ⚡ Local Development Setup

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
# Fill in your environment variables in .env
npm install
npm run dev
# Backend runs on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd frontend
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🌐 Vercel Deployment

### Deploy Backend

```bash
cd backend
npm install -g vercel
vercel login
vercel

# Set environment variables in Vercel dashboard:
# MONGODB_URI, JWT_SECRET, CLOUDINARY_CLOUD_NAME,
# CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET,
# EMAIL_USER, EMAIL_PASS, ADMIN_EMAIL, ADMIN_PASSWORD
```

### Deploy Frontend

```bash
cd frontend
# Update .env with your backend URL:
# VITE_API_URL=https://your-backend.vercel.app/api
vercel
```

---

## 🔐 Admin Access

- URL: `https://your-site.vercel.app/admin/login`
- Default Email: `admin@mbbsrussiaguide.com`
- Default Password: `admin123`
- **⚠️ Change password immediately after first login!**

---

## 📋 Environment Variables

### Backend (.env)
| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT tokens (use a long random string) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `EMAIL_USER` | Gmail address for notifications |
| `EMAIL_PASS` | Gmail app password |
| `ADMIN_EMAIL` | Default admin email |
| `ADMIN_PASSWORD` | Default admin password |

### Frontend (.env)
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL |

---

## 📁 Pages

| Page | Route |
|------|-------|
| Home | `/` |
| Russia Overview | `/russia` |
| Universities | `/universities` |
| University Detail | `/universities/:slug` |
| MBBS Fees | `/fees` |
| Admission Process | `/admission` |
| Eligibility | `/eligibility` |
| Apply Now | `/apply` |
| About Us | `/about` |
| Contact | `/contact` |
| Blog | `/blog` |
| Blog Detail | `/blog/:slug` |
| Admin Login | `/admin/login` |
| Admin Dashboard | `/admin` |

---

## 🔌 API Endpoints

### Public
- `GET /api/universities` — List universities
- `GET /api/universities/:slug` — University detail
- `GET /api/blogs` — List blogs
- `GET /api/blogs/:slug` — Blog detail
- `POST /api/applications` — Submit application
- `POST /api/contacts` — Submit contact form
- `GET /api/testimonials` — List testimonials

### Admin (JWT Required)
- `POST /api/auth/login` — Admin login
- `GET /api/auth/me` — Get current admin
- `POST /api/universities` — Create university
- `PUT /api/universities/:id` — Update university
- `DELETE /api/universities/:id` — Delete university
- `POST /api/blogs` — Create blog
- `PUT /api/blogs/:id` — Update blog
- `DELETE /api/blogs/:id` — Delete blog
- `GET /api/applications` — List applications
- `PATCH /api/applications/:id/status` — Update status
- `GET /api/contacts` — List contact queries
- `GET /api/dashboard/stats` — Dashboard stats
- `POST /api/upload` — Upload image to Cloudinary

---

## 🎨 Features

- ✅ Modern premium UI with glassmorphism
- ✅ Dark/Light mode
- ✅ Fully responsive (mobile-first)
- ✅ Smooth Framer Motion animations
- ✅ SEO optimized with meta tags
- ✅ Dynamic university pages from database
- ✅ Blog CMS with rich content
- ✅ Student application management
- ✅ Contact query management
- ✅ Cloudinary image uploads
- ✅ JWT authentication
- ✅ Email notifications
- ✅ WhatsApp floating button
- ✅ FAQ accordion
- ✅ Testimonials slider
- ✅ Fee comparison tables
- ✅ Admin dashboard with charts
- ✅ Vercel serverless deployment

---

## 📦 MongoDB Setup

1. Create a free cluster at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a database user
3. Whitelist IP: `0.0.0.0/0` (for Vercel)
4. Copy connection string to `MONGODB_URI`

## ☁️ Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Go to Dashboard → copy Cloud Name, API Key, API Secret
3. Add to environment variables

## 📧 Gmail Setup (Email Notifications)

1. Enable 2-Factor Authentication on Gmail
2. Go to Google Account → Security → App Passwords
3. Generate app password for "Mail"
4. Use that as `EMAIL_PASS`
# Mbbs-russia
