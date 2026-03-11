import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="bg-[#dde8ed] px-8 py-4 flex items-center justify-between">

      {/* Left - Logo Image */}
      <Link to="/">
        <img src="/Logo.svg" alt="WalkthroughPro" className="h-20" />
      </Link>

      {/* Center - Nav Links */}
      <div className="flex items-center gap-2 bg-white rounded-full px-6 py-2 shadow-sm">
        <Link to="/" className={`px-4 py-1 rounded-full text-sm font-medium ${location.pathname === '/' ? 'font-bold text-gray-800' : 'text-gray-500 hover:text-gray-800'}`}>
          Home
        </Link>
        <Link to="/pricing" className={`px-4 py-1 rounded-full text-sm font-medium ${location.pathname === '/pricing' ? 'text-gray-800' : 'text-gray-500 hover:text-gray-800'}`}>
          Pricing
        </Link>
        <a href="/#how-it-works" className="px-4 py-1 rounded-full text-sm font-medium text-gray-500 hover:text-gray-800">
  How it works
</a>
        <Link to="/login" className={`px-4 py-1 rounded-full text-sm font-medium ${location.pathname === '/login' ? 'text-gray-800' : 'text-gray-500 hover:text-gray-800'}`}>
          Login
        </Link>
      </div>

      {/* Right - Profile & Logout */}
      <div className="flex items-center gap-2">
        {/* Profile Image */}
        <button className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
          <img src="/Profile.svg" alt="Profile" className="w-full h-full object-cover" 
            onError={(e) => { e.target.style.display='none' }} />
        </button>
        <button className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
          <img src="/Logout.svg" alt="Logout" className="w-full h-full object-cover" 
            onError={(e) => { e.target.style.display='none' }} />
        </button>
        {/* Logout Button */}

      </div>

    </nav>
  )
}

export default Navbar