import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ChevronDown } from 'lucide-react'
import { authAPI, tasksAPI } from '../services/api'
import { clearAuthToken } from '../utils/auth'

// Custom Status Dropdown Component
function StatusDropdown({ status, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const statusOptions = [
    { value: 'todo', label: 'Todo', emoji: '📋', bg: 'bg-yellow-100', border: 'border-yellow-400', text: 'text-yellow-800', hoverBg: 'hover:bg-yellow-200' },
    { value: 'in-progress', label: 'In Progress', emoji: '🔄', bg: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-800', hoverBg: 'hover:bg-blue-200' },
    { value: 'done', label: 'Done', emoji: '✅', bg: 'bg-green-100', border: 'border-green-400', text: 'text-green-800', hoverBg: 'hover:bg-green-200' },
  ]

  const currentStatus = statusOptions.find(s => s.value === status) || statusOptions[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(value) {
    onChange(value)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${currentStatus.bg} ${currentStatus.border} ${currentStatus.text}`}
      >
        <span>{currentStatus.emoji}</span>
        <span>{currentStatus.label}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-lg border border-gray-200 py-2 z-10 overflow-hidden">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                status === option.value
                  ? `${option.bg} ${option.text}`
                  : `text-gray-700 hover:${option.bg.replace('100', '50')}`
              } ${option.hoverBg}`}
            >
              <span>{option.emoji}</span>
              <span>{option.label}</span>
              {status === option.value && (
                <span className="ml-auto">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setLoading(true)
      const [userRes, tasksRes] = await Promise.all([
        authAPI.getMe(),
        tasksAPI.getAll()
      ])
      setUser(userRes.data.data.user)
      setTasks(tasksRes.data.data.tasks || [])
    } catch (err) {
      if (err.response?.status === 401) {
        clearAuthToken()
        toast.error('Session expired. Please login again.')
        navigate('/login')
      } else {
        toast.error('Failed to load data')
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateTask(e) {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    setCreating(true)
    setError('')

    try {
      const response = await tasksAPI.create({
        title: newTaskTitle.trim(),
        status: 'todo'
      })
      const newTask = response.data.data.task
      setTasks(prev => [...prev, newTask])
      setNewTaskTitle('')
      toast.success('Task created successfully!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task')
    } finally {
      setCreating(false)
    }
  }

  async function handleStatusChange(taskId, newStatus) {
    try {
      await tasksAPI.updateStatus(taskId, newStatus)
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ))
      toast.success(`Task status updated to ${newStatus}`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status')
    }
  }

  function handleLogout() {
    clearAuthToken()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Task List</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Create Task Form */}
        <form onSubmit={handleCreateTask} className="mb-8 bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Task</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Enter task title..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={creating}
            />
            <button
              type="submit"
              disabled={creating || !newTaskTitle.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creating ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </form>

        {/* Tasks List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Tasks ({tasks.length})
            </h2>
          </div>

          {tasks.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No tasks yet. Create your first task above!
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <li key={task.id} className="px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex-1 min-w-0 mr-4">
                    <h3 className="text-gray-900 font-medium text-base">{task.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Created: {new Date(task.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <StatusDropdown
                    status={task.status}
                    onChange={(newStatus) => handleStatusChange(task.id, newStatus)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
