import { useState } from 'react'
import { Search, Eye } from 'lucide-react'
import AdminLayout from './AdminLayout'

const reports = [
  { id: 1, teacher: 'Sarah Thompson', observer: 'Dr. Johnson', subject: 'Mathematics', date: 'March 5, 2026', score: 3.4, status: 'completed' },
  { id: 2, teacher: 'Michael Chen', observer: 'Dr. Johnson', subject: 'Science', date: 'March 4, 2026', score: 3.1, status: 'completed' },
  { id: 3, teacher: 'Jennifer Martinez', observer: 'Ms. Williams', subject: 'English', date: 'March 3, 2026', score: 3.8, status: 'completed' },
  { id: 4, teacher: 'Robert Davis', observer: 'Dr. Johnson', subject: 'History', date: 'March 2, 2026', score: 2.9, status: 'completed' },
  { id: 5, teacher: 'Emily Rodriguez', observer: 'Ms. Williams', subject: 'Science', date: 'March 1, 2026', score: 3.6, status: 'completed' },
]

function scoreColor(score) {
  if (score >= 3.5) return 'text-green-500'
  if (score >= 2.5) return 'text-blue-500'
  return 'text-orange-500'
}

function ObservationReports() {
  const [search, setSearch] = useState('')

  return (
    <AdminLayout title="Observation Reports" subtitle="5 observations this month">

      <div className="flex gap-3 mb-4">
        <div className="flex-1 flex items-center bg-white border rounded-lg px-4 py-2 gap-2">
          <Search size={16} className="text-gray-400" />
          <input className="flex-1 outline-none text-sm" placeholder="Search by teacher, observer, or subject..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="bg-white border rounded-lg px-4 py-2 text-sm text-gray-600">
          <option>All Status</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-gray-500">
              <th className="text-left px-6 py-3">ID</th>
              <th className="text-left px-6 py-3">Teacher</th>
              <th className="text-left px-6 py-3">Observer</th>
              <th className="text-left px-6 py-3">Subject</th>
              <th className="text-left px-6 py-3">Date</th>
              <th className="text-left px-6 py-3">Score</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-600">{r.id}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{r.teacher}</td>
                <td className="px-6 py-4 text-gray-600">{r.observer}</td>
                <td className="px-6 py-4 text-gray-600">{r.subject}</td>
                <td className="px-6 py-4 text-gray-600">{r.date}</td>
                <td className={`px-6 py-4 font-bold ${scoreColor(r.score)}`}>{r.score}</td>
                <td className="px-6 py-4">
                  <span className="text-green-500 text-xs font-medium">{r.status}</span>
                </td>
                <td className="px-6 py-4">
                  <button className="bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1 rounded-lg text-xs flex items-center gap-1 hover:bg-gray-200">
                    <Eye size={12} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { value: '5', label: 'Total Reports', color: 'text-gray-800' },
          { value: '3.3', label: 'Average Score', color: 'text-blue-500' },
          { value: '5', label: 'Completed', color: 'text-green-500' },
          { value: '0', label: 'Pending', color: 'text-orange-500' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className={`text-3xl font-bold mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}

export default ObservationReports