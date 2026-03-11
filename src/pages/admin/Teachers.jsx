import { useState } from 'react'
import AdminLayout from './AdminLayout'

const teachers = [
  { name: 'Sarah Thompson', dept: 'Mathematics', obs: 12, score: 3.4, last: 'March 5, 2026' },
  { name: 'Michael Chen', dept: 'Science', obs: 9, score: 3.1, last: 'March 4, 2026' },
  { name: 'Jennifer Martinez', dept: 'English', obs: 8, score: 3.8, last: 'March 3, 2026' },
  { name: 'Robert Davis', dept: 'History', obs: 10, score: 2.9, last: 'February 25, 2026' },
  { name: 'Emily Rodriguez', dept: 'Science', obs: 7, score: 3.6, last: 'February 20, 2026' },
  { name: 'David Wilson', dept: 'Mathematics', obs: 11, score: 3.2, last: 'February 18, 2026' },
]

function scoreColor(score) {
  if (score >= 3.5) return 'text-green-500'
  if (score >= 2.5) return 'text-blue-500'
  return 'text-orange-500'
}

function Teachers() {
  const [search, setSearch] = useState('')

  const filtered = teachers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout title="Teachers" subtitle="6 total teachers">
      <h1 className="text-3xl font-bold text-gray-800">Teachers</h1>
      <p className="text-gray-500 mb-6">6 total teachers</p>

      <div className="flex gap-3 mb-4">
        <div className="flex-1 flex items-center bg-white border rounded-lg px-4 py-2 gap-2">
          <span className="text-gray-400">🔍</span>
          <input className="flex-1 outline-none text-sm" placeholder="Search teachers..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="bg-white border rounded-lg px-4 py-2 text-sm text-gray-600">
          <option>All Department</option>
          <option>Mathematics</option>
          <option>Science</option>
          <option>English</option>
          <option>History</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-gray-500">
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Department</th>
              <th className="text-left px-6 py-3">Observations</th>
              <th className="text-left px-6 py-3">Avg Score</th>
              <th className="text-left px-6 py-3">Last Observation</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{t.name}</td>
                <td className="px-6 py-4 text-gray-600">{t.dept}</td>
                <td className="px-6 py-4 text-gray-600">{t.obs}</td>
                <td className={`px-6 py-4 font-bold ${scoreColor(t.score)}`}>{t.score}</td>
                <td className="px-6 py-4 text-gray-600">{t.last}</td>
                <td className="px-6 py-4">
                  <button className="bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1 rounded-lg text-xs hover:bg-gray-200">
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { value: '48', label: 'Total Teachers', color: 'text-gray-800' },
          { value: '3.3', label: 'Overall Avg Score', color: 'text-blue-500' },
          { value: '48', label: 'Distinguished (≥3.5)', color: 'text-green-500' },
          { value: '48', label: 'Needs Support (<2.5)', color: 'text-orange-500' },
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

export default Teachers