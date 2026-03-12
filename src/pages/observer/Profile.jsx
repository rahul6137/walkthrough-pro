import { Link } from 'react-router-dom'
import { Mail, Phone, Building2, Award, BarChart2, Calendar } from 'lucide-react'
import ObserverLayout from './ObserverLayout'

function Profile() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const initials = `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase()

  return (
    <ObserverLayout title="Profile" subtitle="Observer Information">

      <div className="max-w-lg mx-auto space-y-4">

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            {initials || 'U'}
          </div>
          <h2 className="text-xl font-bold text-blue-900">{user.firstName} {user.lastName}</h2>
          <p className="text-gray-500 text-sm mb-4">Instructional Observer</p>
          <Link to="/observer/edit-profile">
            <button className="bg-blue-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">
              Edit Profile
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-blue-900 mb-4">Contact Information</h3>
          {[
            { icon: Mail, label: 'Email', value: user.email || 'Not provided' },
            { icon: Phone, label: 'Phone', value: user.phone || 'Not provided' },
            { icon: Building2, label: 'School District', value: user.district || 'Not provided' },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                <Icon size={18} className="text-blue-700" />
                <div>
                  <div className="text-xs text-gray-400">{item.label}</div>
                  <div className="font-semibold text-gray-800">{item.value}</div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-blue-900 mb-4">Observer Statistics</h3>
          {[
            { icon: BarChart2, label: 'Member Since', value: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A' },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Icon size={16} className="text-blue-700" />{item.label}
                </div>
                <span className="font-bold text-blue-900">{item.value}</span>
              </div>
            )
          })}
        </div>

      </div>
    </ObserverLayout>
  )
}

export default Profile