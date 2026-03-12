import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ClipboardList, User, Settings, LogOut, ArrowLeft } from 'lucide-react'

function ObserverLayout({ children, title, subtitle, showBack = false, backTo = '/observer' }) {
  const location = useLocation()

  const navItems = [
    { path: '/observer', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/observer/history', label: 'Observation History', icon: ClipboardList },
    { path: '/observer/profile', label: 'Profile', icon: User },
    { path: '/observer/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-white">

      {/* Sidebar */}
      <div className="w-52 fixed h-full flex flex-col border-r border-gray-300" style={{ backgroundColor: '#CEE1E6' }}>
        <div className="px-5 py-5">
          <img src="/Logo.svg" alt="WalkthroughPro" className="h-20"
            onError={(e) => { e.target.style.display = 'none' }} />
        </div>

        <nav className="flex flex-col gap-1 flex-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.path} to={item.path}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg ${
                  location.pathname === item.path
                    ? 'bg-blue-900 text-white'
                    : 'text-gray-700 hover:bg-blue-100'
                }`}>
                <Icon size={16} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Link to="/login" className="flex items-center gap-2 px-6 py-5 text-red-500 text-sm font-medium hover:text-red-700">
          <LogOut size={16} /> Log out
        </Link>
      </div>

      {/* Right Side */}
      <div className="ml-52 flex-1 flex flex-col">
        <div className="sticky top-0 z-10 px-8 py-5 border-b border-gray-300" style={{ backgroundColor: '#CEE1E6' }}>
          <div className="flex items-center gap-3">
            {showBack && (
              <Link to={backTo} className="text-gray-600 hover:text-gray-800">
                <ArrowLeft size={20} />
              </Link>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
              {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#f4f7f8] px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default ObserverLayout