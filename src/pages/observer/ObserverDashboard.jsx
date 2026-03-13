import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Users, TrendingUp, ChevronRight, Plus } from 'lucide-react'
import ObserverLayout from './ObserverLayout'

function ObserverDashboard() {
  const [stats, setStats] = useState({ total: 0, avgScore: '0.0', teachers: 0, recent: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${import.meta.env.VITE_API_URL}/observations/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        setStats({
          total: data.total || 0,
          avgScore: data.avgScore || '0.0',
          teachers: data.teachers || 0,
          recent: data.recent || []
        })
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <ObserverLayout title="Dashboard" subtitle={`Welcome back, ${user.firstName || 'Observer'}`}>

      <Link to="/observer/start">
        <div className="w-full bg-blue-900 text-white text-center py-4 rounded-xl text-lg font-semibold mb-6 hover:bg-blue-800 cursor-pointer flex items-center justify-center gap-2">
          <Plus size={20} /> Start New Observation
        </div>
      </Link>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: Eye, value: loading ? '...' : stats.total, label: 'This Month' },
          { icon: Users, value: loading ? '...' : stats.teachers, label: 'Teachers' },
          { icon: TrendingUp, value: loading ? '...' : stats.avgScore, label: 'Avg Score' },
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

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Recent Observations</h3>
          <Link to="/observer/history" className="text-blue-600 text-sm hover:underline flex items-center gap-1">
            View All <ChevronRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="px-6 py-8 text-center text-gray-400">Loading...</div>
        ) : stats.recent.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-400">
            No observations yet. Start your first observation!
          </div>
        ) : (
          stats.recent.map((o, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4 border-b border-gray-50 last:border-0">
              <div>
                <div className="font-medium text-blue-900">{o.teacher_name}</div>
                <div className="text-sm text-gray-500">{o.subject} • {new Date(o.obs_date).toLocaleDateString()}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-blue-900">{o.avg_score}</span>
                <span className="text-xs text-gray-400">/ 4.0</span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          ))
        )}
      </div>

    </ObserverLayout>
  )
}

export default ObserverDashboard