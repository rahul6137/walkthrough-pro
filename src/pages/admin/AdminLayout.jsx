import { Link, useLocation } from 'react-router-dom'

function AdminLayout({ children, title, subtitle }) {
  const location = useLocation()

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '⊞' },
    { path: '/admin/teachers', label: 'Teachers', icon: '👤' },
    { path: '/admin/reports', label: 'Observation Reports', icon: '📄' },
    { path: '/admin/analytics', label: 'Domain Analytics', icon: '📊' },
    { path: '/admin/subscription', label: 'Subscription', icon: '💳' },
  ]

  return (
    <div className="flex min-h-screen bg-white">

      {/* Sidebar - Fixed */}
      <div className="w-48 fixed h-full flex flex-col border-r border-gray-300" style={{ backgroundColor: '#CEE1E6' }}>
        <div className="flex items-center gap-2 px-4 py-5">
          <img src="/logoAdmin.svg" alt="logo" className="h-20"
            onError={(e) => { e.target.style.display = 'none' }} />
          
        </div>

        <nav className="flex flex-col gap-1 flex-1 px-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg ${
                location.pathname === item.path
                  ? 'bg-blue-900 text-white'
                  : 'text-gray-700 hover:bg-blue-100'
              }`}>
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link to="/login"
          className="flex items-center gap-2 px-6 py-5 text-red-500 text-sm font-medium hover:text-red-700">
          🚪 Log out
        </Link>
      </div>

      {/* Right Side */}
      <div className="ml-48 flex-1 flex flex-col">

        {/* Top Bar - Sticky */}
        <div className="sticky top-0 z-10 px-8 py-5 border-b border-gray-300" style={{ backgroundColor: '#CEE1E6' }}>
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>

        {/* Page Content */}
        <div className="flex-1 bg-white px-8 py-6">
          {children}
        </div>

      </div>
    </div>
  )
}

export default AdminLayout