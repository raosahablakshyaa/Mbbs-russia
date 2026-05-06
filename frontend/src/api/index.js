import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(config => {
  const admin = JSON.parse(localStorage.getItem('admin') || 'null')
  if (admin?.token) config.headers.Authorization = `Bearer ${admin.token}`
  return config
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('admin')
      window.location.href = '/admin/login'
    }
    return Promise.reject(err)
  }
)

export default api

// API helpers
export const universityAPI = {
  getAll: (params) => api.get('/universities', { params }),
  getOne: (slug) => api.get(`/universities/${slug}`),
  create: (data) => api.post('/universities', data),
  update: (id, data) => api.put(`/universities/${id}`, data),
  delete: (id) => api.delete(`/universities/${id}`),
}

export const blogAPI = {
  getAll: (params) => api.get('/blogs', { params }),
  getOne: (slug) => api.get(`/blogs/${slug}`),
  create: (data) => api.post('/blogs', data),
  update: (id, data) => api.put(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`),
}

export const applicationAPI = {
  submit: (data) => api.post('/applications', data),
  getAll: (params) => api.get('/applications', { params }),
  updateStatus: (id, status) => api.patch(`/applications/${id}/status`, { status }),
  delete: (id) => api.delete(`/applications/${id}`),
}

export const contactAPI = {
  submit: (data) => api.post('/contacts', data),
  getAll: () => api.get('/contacts'),
  markReplied: (id) => api.patch(`/contacts/${id}/replied`),
  delete: (id) => api.delete(`/contacts/${id}`),
}

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
}

export const uploadAPI = {
  upload: (formData) => api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
}

export const dashboardAPI = {
  stats: () => api.get('/dashboard/stats'),
}

export const testimonialAPI = {
  getAll: () => api.get('/testimonials'),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
}
