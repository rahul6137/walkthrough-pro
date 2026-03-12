import { useState, useEffect } from 'react'
import { Search, Filter, ChevronRight } from 'lucide-react'
import ObserverLayout from './ObserverLayout'

function barColor(score) {
  if (score >= 3.5) return 'bg-blue-900'
  if (score >= 3.0) return 'bg-blue-700'
  return 'bg-yellow-500'
}

function scoreColor(score) {
  return score >= 3.0 ? 'text-blue-900' : 'text-yellow-600'
}

function ObservationHistory() {
  const [observations, setObservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [subject, setSubject] = useState('All Subject')

  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${import.meta.env.VITE_API_URL}/observations`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        setObservations(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchObservations()
  }, [])

  const filtered = observations.filter(o =>
    o.teacher_name?.toLowerCase().includes(search.toLowerCase()) &&
    (subject === 'All Subject' || o.subject === subject)
  )

  const avg = observations.length > 0
    ? (observations.reduce((s, o) => s + parseFloat(o.avg_score || 0), 0) / observations.length).toFixed(1)
    : '0.0'

  const subjects = [...new Set(observations.map(o => o.subject).filter(Boolean))]

  return (
    <ObserverLayout title="Observation History" subtitle={`${observations.length} total observations`}>

      <div className="max-w-2xl mx-auto space-y-3">

        <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-2 border border-gray-100 shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input className="flex-1 outline-none text-sm text-gray-700"
            placeholder="Search by teacher name..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-2 border border-gray-100 shadow-sm">
          <Filter size={16} className="text-gray-400" />
          <select className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
            value={subject} onChange={e => setSubject(e.target.value)}>
            <option>All Subject</option>
            {subjects.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-400">
            No observations yet. Start your first observation!
          </div>
        ) : (
          filtered.map((o, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-semibold text-blue-900">{o.teacher_name}</div>
                  <div className="text-sm text-gray-500">{o.subject}</div>
                  <div className="text-xs text-gray-400">
                    {o.obs_date ? new Date(o.obs_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-2xl font-bold ${scoreColor(o.avg_score)}`}>
                    {parseFloat(o.avg_score).toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-400 mt-2">/ 4.0</span>
                  <ChevronRight size={16} className="text-gray-400 mt-1" />
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className={`h-2 rounded-full ${barColor(o.avg_score)}`}
                  style={{ width: `${(parseFloat(o.avg_score) / 4) * 100}%` }}></div>
              </div>
            </div>
          ))
        )}

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Summary Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Average Score</div>
              <div className="text-3xl font-bold text-blue-900">{avg}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Observations</div>
              <div className="text-3xl font-bold text-blue-900">{observations.length}</div>
            </div>
          </div>
        </div>

      </div>
    </ObserverLayout>
  )
}

export default ObservationHistory