import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function ForgotPassword() {
  return (
    <div className="min-h-screen bg-[#dde8ed]">
      <Navbar />
      <div className="flex items-center justify-center py-24">
        <div className="bg-white rounded-2xl shadow p-10 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-3xl">🚀</span>
              <span className="font-bold text-blue-900 text-xl">Walkthrough<span className="text-blue-500">Pro</span></span>
            </div>
            <h2 className="text-2xl font-bold text-blue-900">Forgot Password?</h2>
            <p className="text-gray-500 text-sm mt-1">Enter your email and we'll send you a reset link</p>
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-700 mb-1 block">Email Address</label>
            <input type="email" placeholder="you@school.edu"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>

          <button className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800">
            Send Reset Link
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            <Link to="/login" className="hover:underline">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword