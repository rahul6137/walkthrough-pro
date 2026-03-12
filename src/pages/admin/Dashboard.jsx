import { Users, Eye, TrendingUp, Star } from 'lucide-react'
import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory'
import AdminLayout from './AdminLayout'

const monthlyData = [
  { x: 'Sep', y: 45 }, { x: 'Oct', y: 55 },
  { x: 'Nov', y: 48 }, { x: 'Dec', y: 38 },
  { x: 'Jan', y: 52 }, { x: 'Feb', y: 62 },
  { x: 'Mar', y: 22 },
]

const scoreData = [
  { x: 'Sep', y: 3.0 }, { x: 'Oct', y: 3.1 },
  { x: 'Nov', y: 3.15 }, { x: 'Dec', y: 3.2 },
  { x: 'Jan', y: 3.25 }, { x: 'Feb', y: 3.3 },
  { x: 'Mar', y: 3.35 },
]

const topTeachers = [
  { rank: 1, name: 'Jennifer Martinez', obs: 8, score: 3.8 },
  { rank: 2, name: 'Emily Rodriguez', obs: 7, score: 3.6 },
  { rank: 3, name: 'Sarah Thompson', obs: 12, score: 3.4 },
  { rank: 4, name: 'Michael Chen', obs: 9, score: 3.3 },
]

const recentObs = [
  { name: 'Sarah Thompson', subject: 'Mathematics', observer: 'Dr. Johnson', date: 'March 5, 2026', score: 3.4 },
  { name: 'Michael Chen', subject: 'Science', observer: 'Dr. Johnson', date: 'March 4, 2026', score: 3.1 },
  { name: 'Jennifer Martinez', subject: 'English', observer: 'Ms. Williams', date: 'March 3, 2026', score: 3.6 },
]

const stats = [
  { icon: Users, label: 'Total Teachers', value: '48', sub: '+3 this month', subColor: 'text-green-500' },
  { icon: Eye, label: 'Total Observations', value: '323', sub: 'This school year', subColor: 'text-gray-400' },
  { icon: TrendingUp, label: 'Avg Performance', value: '3.3', sub: '+0.2 from last year', subColor: 'text-green-500' },
  { icon: Star, label: 'Distinguished', value: '12', sub: 'Teachers (≥3.5)', subColor: 'text-gray-400' },
]

function Dashboard() {
  return (
    <AdminLayout title="Admin Dashboard" subtitle="Overview of teacher performance and observations">

      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={18} className="text-blue-900" strokeWidth={1.5} />
                <span className="text-sm text-gray-500">{stat.label}</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className={`text-xs ${stat.subColor}`}>{stat.sub}</div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-2">Monthly Observations</h3>
          <VictoryChart theme={VictoryTheme.clean} height={220} padding={{ top: 10, bottom: 40, left: 40, right: 20 }}>
            <VictoryAxis style={{ tickLabels: { fontSize: 10 } }} />
            <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 10 } }} />
            <VictoryBar data={monthlyData} style={{ data: { fill: '#4B8BF5' } }} labelComponent={<VictoryTooltip />} />
          </VictoryChart>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-2">Average Score Trend</h3>
          <VictoryChart theme={VictoryTheme.clean} height={220} padding={{ top: 10, bottom: 40, left: 40, right: 20 }}>
            <VictoryAxis style={{ tickLabels: { fontSize: 10 } }} />
            <VictoryAxis dependentAxis domain={[0, 4]} style={{ tickLabels: { fontSize: 10 } }} />
            <VictoryLine data={scoreData} style={{ data: { stroke: '#10b981', strokeWidth: 2 } }} />
          </VictoryChart>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="font-semibold text-gray-700 mb-4">Top Performing Teachers</h3>
        {topTeachers.map((t) => (
          <div key={t.rank} className="flex items-center justify-between py-3 border-b last:border-0">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {t.rank}
              </div>
              <div>
                <div className="font-medium text-gray-800">{t.name}</div>
                <div className="text-xs text-gray-400">{t.obs} observations</div>
              </div>
            </div>
            <div className="text-green-500 font-bold text-lg">{t.score}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-4">Recent Observations</h3>
        {recentObs.map((o, i) => (
          <div key={i} className="flex items-center justify-between py-3 border rounded-lg px-4 mb-2">
            <div>
              <div className="font-medium text-gray-800">{o.name}</div>
              <div className="text-xs text-gray-400">{o.subject} • {o.observer}</div>
              <div className="text-xs text-gray-400">{o.date}</div>
            </div>
            <div className="text-blue-600 font-bold text-lg">{o.score}</div>
          </div>
        ))}
      </div>

    </AdminLayout>
  )
}

export default Dashboard