import { Link } from 'react-router-dom'
import { Eye, Users, TrendingUp, ChevronRight, Plus } from 'lucide-react'
import ObserverLayout from './ObserverLayout'

const recentObs = [
  { name: 'Sarah Thompson', subject: 'Mathematics', date: 'March 5, 2026', score: 3.4 },
  { name: 'Michael Chen', subject: 'Science', date: 'March 4, 2026', score: 3.1 },
  { name: 'Jennifer Martinez', subject: 'English', date: 'March 3, 2026', score: 3.6 },
]

function ObserverDashboard() {
  return (
    <ObserverLayout title="Dashboard" subtitle="Welcome back, Dr. Johnson">
        <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: Eye, value: '24', label: 'This Month' },
          { icon: Users, value: '18', label: 'Teachers' },
          { icon: TrendingUp, value: '3.3', label: 'Avg Score' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="flex justify-center mb-3">
                <Icon size={28} className="text-blue-900" strokeWidth={1.5} />
              </div>
              <div className="text-4xl font-bold text-blue-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          )
        })}
      </div>

      <Link to="/observer/start">
        <div className="w-full bg-blue-900 text-white text-center py-4 rounded-xl text-lg font-semibold mb-6 hover:bg-blue-800 cursor-pointer flex items-center justify-center gap-2">
          <Plus size={20} /> Start New Observation
        </div>
      </Link>

      

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Recent Observations</h3>
          <Link to="/observer/history" className="text-blue-600 text-sm hover:underline flex items-center gap-1">
            View All <ChevronRight size={14} />
          </Link>
        </div>
        {recentObs.map((o, i) => (
          <Link to="/observer/history" key={i}
            className="flex items-center justify-between px-6 py-4 border-b border-gray-50 hover:bg-gray-50 last:border-0">
            <div>
              <div className="font-medium text-blue-900">{o.name}</div>
              <div className="text-sm text-gray-500">{o.subject} • {o.date}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-blue-900">{o.score}</span>
              <span className="text-xs text-gray-400">/ 4.0</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </Link>
        ))}
      </div>

    </ObserverLayout>
  )
}

export default ObserverDashboard