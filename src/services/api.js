import axios from 'axios'
import { getAuthToken, clearAuthToken } from '../utils/auth'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach Authorization header for authenticated requests
api.interceptors.request.use((config) => {
  const publicEndpoints = ['/api/auth/login', '/api/auth/register']
  const isPublicEndpoint = publicEndpoints.some(endpoint => config.url?.includes(endpoint))
  
  if (!isPublicEndpoint) {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
}, (err) => Promise.reject(err))

// Response interceptor to handle 401 errors (expired/invalid token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      clearAuthToken()
      // Only redirect if not already on login/register page
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  getMe: () => api.get('/api/auth/me'),
}

// Tasks API
export const tasksAPI = {
  getAll: () => api.get('/api/tasks'),
  getById: (id) => api.get(`/api/tasks/${id}`),
  create: (data) => api.post('/api/tasks', data),
  updateStatus: (id, status) => api.patch(`/api/tasks/${id}`, { status }),
}

export default api
