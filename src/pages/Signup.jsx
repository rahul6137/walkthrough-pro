import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', phone: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleSignup = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError('Please fill in all fields')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        return
      }

      navigate('/login')

    } catch (err) {
      setError('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#dde8ed]">
      <Navbar />
      <div className="flex items-center justify-center py-16">
        <div className="bg-white rounded-2xl shadow p-10 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <img src="/logo.png" alt="WalkthroughPro" className="h-12"
                onError={(e) => { e.target.style.display = 'none' }} />
            </div>
            <h2 className="text-2xl font-bold text-blue-900">Create Account</h2>
            <p className="text-gray-500 text-sm mt-1">Join thousands of educators using WalkthroughPro</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="text-sm text-gray-700 mb-1 block">First Name</label>
              <input type="text" placeholder="First"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-700 mb-1 block">Last Name</label>
              <input type="text" placeholder="Last"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-1 block">Email Address</label>
            <input type="email" placeholder="you@school.edu"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="mb-4">
  <label className="text-sm text-gray-700 mb-1 block">Phone Number</label>
  <input type="tel" placeholder="+1 (555) 123-4567"
    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
    value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
</div>
          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-1 block">Password</label>
            <input type="password" placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-700 mb-1 block">Confirm Password</label>
            <input type="password" placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} />
          </div>

          <button onClick={handleSignup} disabled={loading}
            className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-50">
            {loading ? 'Creating Account...' : 'Create Account'}
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