import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff, LogOut, Trash2 } from 'lucide-react'
import ObserverLayout from './ObserverLayout'

function Settings() {
  const navigate = useNavigate()
  const [show, setShow] = useState({ current: false, new: false, confirm: false })

  return (
    <ObserverLayout title="Settings" subtitle="Manage your account security">

      <div className="max-w-lg mx-auto space-y-4">

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
            <Lock size={18} className="text-blue-900" /> Change Password
          </h3>
          {[
            { label: 'Current Password *', key: 'current' },
            { label: 'New Password *', key: 'new', hint: 'Minimum 8 characters' },
            { label: 'Confirm New Password *', key: 'confirm' },
          ].map(({ label, key, hint }) => (
            <div key={key} className="mb-4">
              <label className="text-sm text-gray-700 mb-1 block">{label}</label>
              <div className="relative">
                <input type={show[key] ? 'text' : 'password'}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-[#f5f5ec] focus:outline-none focus:ring-2 focus:ring-blue-300 pr-10" />
                <button onClick={() => setShow(s => ({ ...s, [key]: !s[key] }))}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                  {show[key] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
            </div>
          ))}
          <button className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 mt-2">
            Update Password
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
          <button className="w-full border border-red-300 text-red-500 py-3 rounded-xl text-sm font-medium hover:bg-red-50 flex items-center justify-center gap-2">
            <Trash2 size={16} /> Delete Account
          </button>
          <button onClick={() => navigate('/login')}
            className="w-full border border-red-300 text-red-500 py-3 rounded-xl text-sm font-medium hover:bg-red-50 flex items-center justify-center gap-2">
            <LogOut size={16} /> Logout
          </button>
        </div>

      </div>
    </ObserverLayout>
  )
}

export default Settings