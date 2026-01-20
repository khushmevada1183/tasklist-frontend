import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authAPI } from '../services/api'
import { setAuthToken } from '../utils/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await authAPI.login({ email, password })
      // Response structure: { success, message, data: { user, token } }
      const token = response.data?.data?.token || response.data?.token
      if (token) {
        setAuthToken(token)
        toast.success('Login successful!')
        navigate('/dashboard')
      } else {
        toast.error('Login failed: No token received')
      }
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message || 'Login failed'
      toast.error(errMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-white flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 h-screen">
        {/* Left: Image + Logo */}
        <div className="md:col-span-2 relative bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center overflow-hidden h-full hidden md:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-800/90"></div>
          <div className="relative z-10 text-center text-white p-8">
            <h2 className="text-4xl font-bold mb-4">Task List App</h2>
            <p className="text-xl text-blue-100">Organize your tasks efficiently</p>
          </div>
          <div className="absolute top-6 left-6">
            <span className="text-2xl font-bold text-white">📝 TaskList</span>
          </div>
        </div>

        {/* Right: Form card */}
        <div className="md:col-span-1 flex items-center justify-center px-6 h-full">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-extrabold">Welcome Back!! <span aria-hidden>👋</span></h1>
              <p className="text-sm text-gray-400 mt-2">Please Login to your Account</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="user@example.com"
                  aria-label="Email"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pr-10 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    placeholder="Enter your password"
                    aria-label="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:opacity-95 transition disabled:opacity-60"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
              <div className="flex items-center justify-center gap-3 text-gray-400 text-sm">
                <span className="h-px w-14 bg-gray-300 inline-block" />
                <span>OR</span>
                <span className="h-px w-14 bg-gray-300 inline-block" />
              </div>
              <button type="button" className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-3 bg-white hover:bg-gray-50 transition">
                <svg width="18" height="18" viewBox="0 0 48 48" className="inline-block" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#EA4335" d="M24 9.5c3.9 0 7 1.3 9.2 3.1l6.8-6.5C35.9 3.1 30.3 1 24 1 14.9 1 6.9 5.9 2.7 13.6l7.9 6.1C12.1 14.1 17.6 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.5 24.5c0-1.6-.2-3.1-.6-4.5H24v9h12.7c-.5 2.6-2 4.8-4.2 6.3l6.6 5.1C44.1 36.1 46.5 30.7 46.5 24.5z"/>
                  <path fill="#4A90E2" d="M10.6 29.7C9.7 27.9 9.2 26 9.2 24s.5-3.9 1.4-5.7l-7.9-6.1C.9 14.9 0 19.3 0 24s.9 9.1 3.7 13.1l6.9-7.4z"/>
                  <path fill="#FBBC05" d="M24 46.9c6.3 0 11.9-2.1 16.3-5.7l-6.6-5.1c-2 1.3-4.6 2-7.7 2-6.4 0-11.9-4.6-14-10.9l-7.9 6.1C6.9 42.9 14.9 46.9 24 46.9z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
              <p className="text-center text-sm text-gray-400">
                Don't have an Account?{' '}
                <Link to="/register" className="font-semibold text-gray-900 hover:underline">Sign-up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
