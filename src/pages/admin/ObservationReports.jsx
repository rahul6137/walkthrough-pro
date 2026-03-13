import { useState, useEffect } from 'react'
import { Search, Eye } from 'lucide-react'
import AdminLayout from './AdminLayout'

function scoreColor(score) {
  if (score >= 3.5) return 'text-green-500'
  if (score >= 2.5) return 'text-blue-500'
  return 'text-orange-500'
}

function ObservationReports() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/observations`)
      .then(r => r.json())
      .then(data => { setReports(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = reports.filter(r =>
    r.teacher_name?.toLowerCase().includes(search.toLowerCase()) ||
    r.subject?.toLowerCase().includes(search.toLowerCase()) ||
    r.first_name?.toLowerCase().includes(search.toLowerCase())
  )

  const avgScore = reports.length > 0
    ? (reports.reduce((a, b) => a + parseFloat(b.avg_score || 0), 0) / reports.length).toFixed(1)
    : '0.0'

  return (
    <AdminLayout title="Observation Reports" subtitle={`${reports.length} total observations`}>

      <div className="flex gap-3 mb-4">
        <div className="flex-1 flex items-center bg-white border rounded-lg px-4 py-2 gap-2">
          <Search size={16} className="text-gray-400" />
          <input className="flex-1 outline-none text-sm" placeholder="Search by teacher, observer, or subject..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
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
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-400">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-400">No observations yet</td></tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-600">{r.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{r.teacher_name}</td>
                  <td className="px-6 py-4 text-gray-600">{r.first_name} {r.last_name}</td>
                  <td className="px-6 py-4 text-gray-600">{r.subject}</td>
                  <td className="px-6 py-4 text-gray-600">{r.obs_date ? new Date(r.obs_date).toLocaleDateString() : '-'}</td>
                  <td className={`px-6 py-4 font-bold ${scoreColor(r.avg_score)}`}>{parseFloat(r.avg_score || 0).toFixed(1)}</td>
                  <td className="px-6 py-4">
                    <button className="bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1 rounded-lg text-xs flex items-center gap-1 hover:bg-gray-200">
                      <Eye size={12} /> View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { value: reports.length, label: 'Total Reports', color: 'text-gray-800' },
          { value: avgScore, label: 'Average Score', color: 'text-blue-500' },
          { value: reports.filter(r => parseFloat(r.avg_score) >= 3.5).length, label: 'Distinguished', color: 'text-green-500' },
          { value: reports.filter(r => parseFloat(r.avg_score) < 2.5).length, label: 'Needs Support', color: 'text-orange-500' },
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