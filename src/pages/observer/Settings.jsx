import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff, LogOut, Trash2, X } from 'lucide-react'
import ObserverLayout from './ObserverLayout'

function Settings() {
  const navigate = useNavigate()
  const [show, setShow] = useState({ current: false, new: false, confirm: false })
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [showDeletePass, setShowDeletePass] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState('')
  const [pwLoading, setPwLoading] = useState(false)

  const handleChangePassword = async () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      setPwError('Please fill in all fields')
      return
    }
    if (passwords.new !== passwords.confirm) {
      setPwError('New passwords do not match')
      return
    }
    if (passwords.new.length < 8) {
      setPwError('Password must be at least 8 characters')
      return
    }

    setPwLoading(true)
    setPwError('')
    setPwSuccess('')

    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword: passwords.current, newPassword: passwords.new })
      })

      const data = await res.json()
      if (!res.ok) {
        setPwError(data.message)
        return
      }

      setPwSuccess('Password updated successfully!')
      setPasswords({ current: '', new: '', confirm: '' })

    } catch (err) {
      setPwError('Server error. Please try again.')
    } finally {
      setPwLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setDeleteError('Please enter your password')
      return
    }

    setDeleteLoading(true)
    setDeleteError('')

    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/delete-account`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password: deletePassword })
      })

      const data = await res.json()
      if (!res.ok) {
        setDeleteError(data.message)
        return
      }

      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/login')

    } catch (err) {
      setDeleteError('Server error. Please try again.')
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <ObserverLayout title="Settings" subtitle="Manage your account security">

      <div className="max-w-lg mx-auto space-y-4">

        {/* Change Password */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
            <Lock size={18} className="text-blue-900" /> Change Password
          </h3>

          {pwError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
              {pwError}
            </div>
          )}
          {pwSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-lg mb-4">
              {pwSuccess}
            </div>
          )}

          {[
            { label: 'Current Password *', key: 'current' },
            { label: 'New Password *', key: 'new', hint: 'Minimum 8 characters' },
            { label: 'Confirm New Password *', key: 'confirm' },
          ].map(({ label, key, hint }) => (
            <div key={key} className="mb-4">
              <label className="text-sm text-gray-700 mb-1 block">{label}</label>
              <div className="relative">
                <input type={show[key] ? 'text' : 'password'}
                  value={passwords[key]}
                  onChange={e => setPasswords({ ...passwords, [key]: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-[#f5f5ec] focus:outline-none focus:ring-2 focus:ring-blue-300 pr-10" />
                <button onClick={() => setShow(s => ({ ...s, [key]: !s[key] }))}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                  {show[key] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
            </div>
          ))}

          <button onClick={handleChangePassword} disabled={pwLoading}
            className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 disabled:opacity-50 mt-2">
            {pwLoading ? 'Updating...' : 'Update Password'}
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
          <button onClick={() => setShowDeleteModal(true)}
            className="w-full border border-red-300 text-red-500 py-3 rounded-xl text-sm font-medium hover:bg-red-50 flex items-center justify-center gap-2">
            <Trash2 size={16} /> Delete Account
          </button>
          <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/login') }}
            className="w-full border border-red-300 text-red-500 py-3 rounded-xl text-sm font-medium hover:bg-red-50 flex items-center justify-center gap-2">
            <LogOut size={16} /> Logout
          </button>
        </div>

      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 text-lg">Delete Account</h3>
              <button onClick={() => { setShowDeleteModal(false); setDeleteError(''); setDeletePassword('') }}
                className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-600 text-sm font-medium">⚠️ This action cannot be undone!</p>
              <p className="text-red-500 text-sm mt-1">All your observations and data will be permanently deleted.</p>
            </div>

            <p className="text-gray-600 text-sm mb-4">Enter your password to confirm account deletion:</p>

            {deleteError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                {deleteError}
              </div>
            )}

            <div className="relative mb-6">
              <input
                type={showDeletePass ? 'text' : 'password'}
                placeholder="Enter your password"
                value={deletePassword}
                onChange={e => setDeletePassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-[#f5f5ec] focus:outline-none focus:ring-2 focus:ring-red-300 pr-10" />
              <button onClick={() => setShowDeletePass(!showDeletePass)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                {showDeletePass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex gap-3">
              <button onClick={() => { setShowDeleteModal(false); setDeleteError(''); setDeletePassword('') }}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleDeleteAccount} disabled={deleteLoading}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-red-600 disabled:opacity-50">
                {deleteLoading ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}

    </ObserverLayout>
  )
}

export default Settings