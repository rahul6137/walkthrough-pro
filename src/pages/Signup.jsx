import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Signup() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#dde8ed]">
      <Navbar />
      <div className="flex items-center justify-center py-16">
        <div className="bg-white rounded-2xl shadow p-10 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
  <img src="/Logo.svg" alt="WalkthroughPro" className="h-20"
    onError={(e) => { e.target.style.display = 'none' }} />
</div>
            <h2 className="text-2xl font-bold text-blue-900">Create Account</h2>
            <p className="text-gray-500 text-sm mt-1">Join thousands of educators using WalkthroughPro</p>
          </div>

          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="text-sm text-gray-700 mb-1 block">First Name</label>
              <input type="text" placeholder="First"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-700 mb-1 block">Last Name</label>
              <input type="text" placeholder="Last"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-1 block">Email Address</label>
            <input type="email" placeholder="you@school.edu"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-1 block">Password</label>
            <input type="password" placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-700 mb-1 block">Confirm Password</label>
            <input type="password" placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>

          <button onClick={() => navigate('/login')}
            className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800">
            Create Account
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup