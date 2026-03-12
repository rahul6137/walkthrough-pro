import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, X, Save } from 'lucide-react'
import ObserverLayout from './ObserverLayout'

function EditProfile() {
  const navigate = useNavigate()
  const [certs, setCerts] = useState([
    { title: 'Danielson Framework Certified', valid: 'Valid through: December 2027' },
    { title: 'Instructional Coaching Certificate', valid: 'Valid through: June 2026' },
  ])

  return (
    <ObserverLayout title="Edit Profile" subtitle="Update your information" showBack backTo="/observer/profile">

      <div className="max-w-lg mx-auto space-y-4">

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">MJ</div>
            <div className="absolute bottom-0 right-0 w-7 h-7 bg-teal-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-teal-700">
              <Camera size={14} />
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">Click camera icon to change photo</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-blue-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[['First Name *', 'Michael'], ['Last Name *', 'Johnson']].map(([label, val]) => (
              <div key={label}>
                <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                <input defaultValue={val} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-[#f5f5ec] focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
            ))}
          </div>
          {[['Title/Role *', 'Instructional Observer'], ['Email Address *', 'dr.johnson@school.edu'], ['Phone Number', '+1 (555) 123-4567']].map(([label, val]) => (
            <div key={label} className="mb-4">
              <label className="text-xs text-gray-500 mb-1 block">{label}</label>
              <input defaultValue={val} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-[#f5f5ec] focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-blue-900 mb-4">Professional Information</h3>
          {[['School District *', 'Springfield District'], ['Specialization', 'Danielson Framework'], ['Years of Experience', '15']].map(([label, val]) => (
            <div key={label} className="mb-4">
              <label className="text-xs text-gray-500 mb-1 block">{label}</label>
              <input defaultValue={val} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-[#f5f5ec] focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-blue-900">Certifications</h3>
            <button className="text-blue-600 text-sm hover:underline">+ Add</button>
          </div>
          {certs.map((cert, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-3 mb-3 flex justify-between items-start">
              <div>
                <div className="font-semibold text-gray-800 text-sm">{cert.title}</div>
                <div className="text-xs text-gray-500">{cert.valid}</div>
              </div>
              <button onClick={() => setCerts(certs.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-blue-900 mb-4">About Me</h3>
          <label className="text-xs text-gray-500 mb-1 block">Professional Bio</label>
          <textarea rows={4} placeholder="Share your background, expertise, and approach to instructional observation..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-[#f5f5ec] focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none" />
          <div className="text-xs text-gray-400 mt-1">87 / 500 characters</div>
        </div>

        <div className="flex gap-3 pb-6">
          <button onClick={() => navigate('/observer/profile')}
            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={() => navigate('/observer/profile')}
            className="flex-1 bg-blue-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-blue-800 flex items-center justify-center gap-2">
            <Save size={16} /> Save Changes
          </button>
        </div>

      </div>
    </ObserverLayout>
  )
}

export default EditProfile