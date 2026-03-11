import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="bg-[#dde8ed] px-8 py-4 flex items-center justify-between">
      
      {/* Left - Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl">🚀</span>
        <span className="font-bold text-blue-900 text-xl">
          Walkthrough<span className="text-blue-500">Pro</span>
        </span>
      </Link>

      {/* Center - Nav Links */}
      <div className="flex items-center gap-2 bg-white rounded-full px-6 py-2 shadow-sm">
        <Link to="/" className={`px-4 py-1 rounded-full text-sm font-medium ${location.pathname === '/' ? 'font-bold text-gray-800' : 'text-gray-500 hover:text-gray-800'}`}>
          Home
        </Link>
        <Link to="/pricing" className={`px-4 py-1 rounded-full text-sm font-medium ${location.pathname === '/pricing' ? 'font-bold text-gray-800' : 'text-gray-500 hover:text-gray-800'}`}>
          Pricing
        </Link>
        <Link to="/" className="px-4 py-1 rounded-full text-sm font-medium text-gray-500 hover:text-gray-800">
          How it works
        </Link>
        <Link to="/login" className={`px-4 py-1 rounded-full text-sm font-bold ${location.pathname === '/login' ? 'text-blue-900' : 'text-gray-500 hover:text-gray-800'}`}>
          Login
        </Link>
      </div>

      {/* Right - Profile & Logout */}
      <div className="flex items-center gap-2">
        <button className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100">
          👤
        </button>
        <button className="w-10 h-10 rounded-full border border-red-200 bg-white flex items-center justify-center text-red-500 hover:bg-red-50">
          🚪
        </button>
      </div>

    </nav>
  )
}

export default Navbar