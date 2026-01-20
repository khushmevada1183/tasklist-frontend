import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          404
        </h1>
        
        {/* Error Message */}
        <div className="mt-4">
          <h2 className="text-3xl font-semibold text-white mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
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
            <rect x="40" y="30" width="120" height="90" rx="8" stroke="currentColor" strokeWidth="2" />
            <circle cx="100" cy="65" r="20" stroke="currentColor" strokeWidth="2" />
            <path d="M92 60 L108 60 M92 70 L108 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M60 100 L140 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="70" cy="45" r="3" fill="currentColor" />
            <circle cx="85" cy="45" r="3" fill="currentColor" />
            <circle cx="100" cy="45" r="3" fill="currentColor" />
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
