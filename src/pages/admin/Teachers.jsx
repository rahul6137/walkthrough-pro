import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import AdminLayout from './AdminLayout'

function scoreColor(score) {
  if (score >= 3.5) return 'text-green-500'
  if (score >= 2.5) return 'text-blue-500'
  return 'text-orange-500'
}

function Teachers() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/users`)
      .then(r => r.json())
      .then(data => { setTeachers(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = teachers.filter(t =>
    `${t.first_name} ${t.last_name}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout title="Observers" subtitle={`${teachers.length} total observers`}>

      <div className="flex gap-3 mb-4">
        <div className="flex-1 flex items-center bg-white border rounded-lg px-4 py-2 gap-2">
          <Search size={16} className="text-gray-400" />
          <input className="flex-1 outline-none text-sm" placeholder="Search observers..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-gray-500">
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Email</th>
              <th className="text-left px-6 py-3">Observations</th>
              <th className="text-left px-6 py-3">Avg Score</th>
              <th className="text-left px-6 py-3">Last Observation</th>
              <th className="text-left px-6 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-400">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-400">No users yet</td></tr>
            ) : (
              filtered.map((t, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{t.first_name} {t.last_name}</td>
                  <td className="px-6 py-4 text-gray-600">{t.email}</td>
                  <td className="px-6 py-4 text-gray-600">{t.obs_count || 0}</td>
                  <td className={`px-6 py-4 font-bold ${scoreColor(t.avg_score)}`}>
                    {t.avg_score ? parseFloat(t.avg_score).toFixed(1) : '-'}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {t.last_obs ? new Date(t.last_obs).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${t.role === 'admin' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                      {t.role}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { value: teachers.length, label: 'Total Users', color: 'text-gray-800' },
          { value: teachers.filter(t => t.obs_count > 0).length, label: 'Active Observers', color: 'text-blue-500' },
          { value: teachers.filter(t => parseFloat(t.avg_score) >= 3.5).length, label: 'Distinguished', color: 'text-green-500' },
          { value: teachers.filter(t => t.role === 'admin').length, label: 'Admins', color: 'text-orange-500' },
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