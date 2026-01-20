import React from 'react'
import { Link } from 'react-router-dom'

export default function ServerError() {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        {/* 500 Number */}
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
          500
        </h1>
        
        {/* Error Message */}
        <div className="mt-4">
          <h2 className="text-3xl font-semibold text-white mb-2">
            Server Error
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Something went wrong on our end. Please try again later or contact support if the problem persists.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <svg
            className="w-64 h-48 mx-auto text-gray-700"
            viewBox="0 0 200 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="50" y="20" width="100" height="30" rx="4" stroke="currentColor" strokeWidth="2" />
            <rect x="50" y="60" width="100" height="30" rx="4" stroke="currentColor" strokeWidth="2" />
            <rect x="50" y="100" width="100" height="30" rx="4" stroke="currentColor" strokeWidth="2" />
            <circle cx="65" cy="35" r="5" fill="#ef4444" />
            <circle cx="65" cy="75" r="5" fill="#ef4444" />
            <circle cx="65" cy="115" r="5" fill="#22c55e" />
            <line x1="80" y1="35" x2="135" y2="35" stroke="currentColor" strokeWidth="2" />
            <line x1="80" y1="75" x2="135" y2="75" stroke="currentColor" strokeWidth="2" />
            <line x1="80" y1="115" x2="135" y2="115" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRefresh}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
          <Link
            to="/"
            className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-200"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
