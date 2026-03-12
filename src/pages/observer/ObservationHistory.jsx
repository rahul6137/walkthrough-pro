import { useState } from 'react'
import { Search, Filter, ChevronRight } from 'lucide-react'
import ObserverLayout from './ObserverLayout'

const observations = [
  { name: 'Sarah Thompson', subject: 'Mathematics', observer: 'Dr. Johnson', date: 'March 5, 2026', score: 3.4 },
  { name: 'Michael Chen', subject: 'Science', observer: 'Dr. Johnson', date: 'March 4, 2026', score: 3.1 },
  { name: 'Jennifer Martinez', subject: 'English', observer: 'Ms. Williams', date: 'March 3, 2026', score: 3.6 },
  { name: 'Sarah Thompson', subject: 'Mathematics', observer: 'Ms. Williams', date: 'February 28, 2026', score: 3.2 },
  { name: 'Robert Davis', subject: 'History', observer: 'Dr. Johnson', date: 'February 25, 2026', score: 2.9 },
  { name: 'Emily Rodriguez', subject: 'Science', observer: 'Ms. Williams', date: 'February 20, 2026', score: 3.5 },
]

function barColor(score) {
  if (score >= 3.5) return 'bg-blue-900'
  if (score >= 3.0) return 'bg-blue-700'
  return 'bg-yellow-500'
}

function scoreColor(score) {
  return score >= 3.0 ? 'text-blue-900' : 'text-yellow-600'
}

function ObservationHistory() {
  const [search, setSearch] = useState('')
  const [subject, setSubject] = useState('All Subject')

  const filtered = observations.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase()) &&
    (subject === 'All Subject' || o.subject === subject)
  )

  const avg = (observations.reduce((s, o) => s + o.score, 0) / observations.length).toFixed(1)

  return (
    <ObserverLayout title="Observation History" subtitle={`${observations.length} total observations`}>

      <div className="max-w-2xl mx-auto space-y-3">

        <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-2 border border-gray-100 shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input className="flex-1 outline-none text-sm text-gray-700"
            placeholder="Search by teacher or observer..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-2 border border-gray-100 shadow-sm">
          <Filter size={16} className="text-gray-400" />
          <select className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
            value={subject} onChange={e => setSubject(e.target.value)}>
            <option>All Subject</option>
            <option>Mathematics</option>
            <option>Science</option>
            <option>English</option>
            <option>History</option>
          </select>
        </div>

        {filtered.map((o, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-semibold text-blue-900">{o.name}</div>
                <div className="text-sm text-gray-500">{o.subject} • {o.observer}</div>
                <div className="text-xs text-gray-400">{o.date}</div>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-2xl font-bold ${scoreColor(o.score)}`}>{o.score}</span>
                <span className="text-xs text-gray-400 mt-2">/ 4.0</span>
                <ChevronRight size={16} className="text-gray-400 mt-1" />
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className={`h-2 rounded-full ${barColor(o.score)}`}
                style={{ width: `${(o.score / 4) * 100}%` }}></div>
            </div>
          </div>
        ))}

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