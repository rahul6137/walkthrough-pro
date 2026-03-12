import { useState, useEffect } from 'react'
import { Users, Eye, TrendingUp, Star } from 'lucide-react'
import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory'
import AdminLayout from './AdminLayout'

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0, totalObs: 0, avgScore: '0.0', distinguished: 0,
    recentObs: [], topTeachers: [], monthlyData: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/stats`)
      .then(r => r.json())
      .then(data => { setStats(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const statCards = [
    { icon: Users, label: 'Total Observers', value: loading ? '...' : stats.totalUsers },
    { icon: Eye, label: 'Total Observations', value: loading ? '...' : stats.totalObs },
    { icon: TrendingUp, label: 'Avg Performance', value: loading ? '...' : stats.avgScore },
    { icon: Star, label: 'Distinguished', value: loading ? '...' : stats.distinguished },
  ]

  const chartData = stats.monthlyData.map(m => ({ x: m.month?.slice(0, 3), y: m.count }))

  return (
    <AdminLayout title="Admin Dashboard" subtitle="Overview of teacher performance and observations">

      <div className="grid grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={18} className="text-blue-900" strokeWidth={1.5} />
                <span className="text-sm text-gray-500">{stat.label}</span>
              </div>
              <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-2">Monthly Observations</h3>
          {chartData.length === 0 ? (
            <div className="h-40 flex items-center justify-center text-gray-400 text-sm">No data yet</div>
          ) : (
            <VictoryChart theme={VictoryTheme.clean} height={220} padding={{ top: 10, bottom: 40, left: 40, right: 20 }}>
              <VictoryAxis style={{ tickLabels: { fontSize: 10 } }} />
              <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 10 } }} />
              <VictoryBar data={chartData} style={{ data: { fill: '#1e3a8a' } }} />
            </VictoryChart>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-4">Top Performing Teachers</h3>
          {stats.topTeachers.length === 0 ? (
            <div className="h-40 flex items-center justify-center text-gray-400 text-sm">No data yet</div>
          ) : (
            stats.topTeachers.map((t, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{t.teacher_name}</div>
                    <div className="text-xs text-gray-400">{t.obs_count} observations</div>
                  </div>
                </div>
                <div className="text-green-500 font-bold">{parseFloat(t.avg_score).toFixed(1)}</div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-4">Recent Observations</h3>
        {stats.recentObs.length === 0 ? (
          <div className="py-8 text-center text-gray-400">No observations yet</div>
        ) : (
          stats.recentObs.map((o, i) => (
            <div key={i} className="flex items-center justify-between py-3 border rounded-lg px-4 mb-2">
              <div>
                <div className="font-medium text-gray-800">{o.teacher_name}</div>
                <div className="text-xs text-gray-400">{o.subject} • {o.first_name} {o.last_name}</div>
                <div className="text-xs text-gray-400">{new Date(o.obs_date).toLocaleDateString()}</div>
              </div>
              <div className="text-blue-600 font-bold text-lg">{o.avg_score}</div>
            </div>
          ))
        )}
      </div>

    </AdminLayout>
  )
}

export default Dashboard