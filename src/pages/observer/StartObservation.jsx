import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import ObserverLayout from './ObserverLayout'

const teachers = ['Sarah Thompson', 'Michael Chen', 'Jennifer Martinez', 'Robert Davis', 'Emily Rodriguez']
const subjects = ['Mathematics', 'Science', 'English', 'History', 'Social Studies', 'Art']

function StartObservation() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ teacher: '', subject: '', classPeriod: '', date: '', time: '' })

  return (
    <ObserverLayout title="Start Observation" subtitle="Complete the form to begin" showBack backTo="/observer">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        {[
          { label: 'Select Teacher *', key: 'teacher', type: 'select', options: teachers, placeholder: 'Choose a teacher' },
          { label: 'Subject *', key: 'subject', type: 'select', options: subjects, placeholder: 'Choose a subject' },
        ].map(({ label, key, options, placeholder }) => (
          <div key={key} className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative">
              <select className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-[#f5f5ec] focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none"
                value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}>
                <option value="">{placeholder}</option>
                {options.map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        ))}

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Class / Period</label>
          <input type="text" placeholder="e.g., Period 3, Grade 10"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-[#f5f5ec] focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={form.classPeriod} onChange={e => setForm({ ...form, classPeriod: e.target.value })} />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
          <input type="date"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-[#f5f5ec] focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
          <input type="time"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-[#f5f5ec] focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
        </div>

        <button onClick={() => navigate('/observer/form', { state: form })}
          className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-800">
          Continue to Observation Form
        </button>
      </div>

    </ObserverLayout>
  )
}

export default StartObservation