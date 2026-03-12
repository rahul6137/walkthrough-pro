import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleLogin = () => {
    if (form.email && form.password) {
      navigate('/observer')
    }
  }

  return (
    <div className="min-h-screen bg-[#dde8ed]">
      <Navbar />
      <div className="flex items-center justify-center py-20">
        <div className="bg-white rounded-2xl shadow p-10 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
  <img src="/Logo.svg" alt="WalkthroughPro" className="h-20"
    onError={(e) => { e.target.style.display = 'none' }} />
</div>
            <h2 className="text-2xl font-bold text-blue-900">Welcome Back</h2>
            <p className="text-gray-500 text-sm mt-1">Sign in to your account to continue</p>
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-1 block">Email Address</label>
            <input type="email" placeholder="you@school.edu"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>

          <div className="mb-2">
            <label className="text-sm text-gray-700 mb-1 block">Password</label>
            <input type="password" placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>

          <div className="text-right mb-5">
            <Link to="/forgot-password" className="text-sm text-gray-500 hover:underline">Forgot password?</Link>
          </div>

          <button onClick={handleLogin}
            className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800">
            Sign In
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login