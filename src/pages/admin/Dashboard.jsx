import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import AdminLayout from './AdminLayout'

const monthlyData = [
  { month: 'Sep', obs: 45 }, { month: 'Oct', obs: 55 },
  { month: 'Nov', obs: 48 }, { month: 'Dec', obs: 38 },
  { month: 'Jan', obs: 52 }, { month: 'Feb', obs: 62 },
  { month: 'Mar', obs: 22 },
]

const scoreData = [
  { month: 'Sep', score: 3.0 }, { month: 'Oct', score: 3.1 },
  { month: 'Nov', score: 3.15 }, { month: 'Dec', score: 3.2 },
  { month: 'Jan', score: 3.25 }, { month: 'Feb', score: 3.3 },
  { month: 'Mar', score: 3.35 },
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

function Dashboard() {
  return (
    <AdminLayout title="Admin Dashboard" subtitle="Overview of teacher performance and observations">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <p className="text-gray-500 mb-6">Overview of teacher performance and observations</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: '👥', label: 'Total Teachers', value: '48', sub: '+3 this month', subColor: 'text-green-500' },
          { icon: '👁️', label: 'Total Observations', value: '323', sub: 'This school year', subColor: 'text-gray-400' },
          { icon: '📊', label: 'Avg Performance', value: '3.3', sub: '+0.2 from last year', subColor: 'text-green-500' },
          { icon: '⭐', label: 'Distinguished', value: '12', sub: 'Teachers (≥3.5)', subColor: 'text-gray-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{stat.icon}</span>
              <span className="text-sm text-gray-500">{stat.label}</span>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
            <div className={`text-xs ${stat.subColor}`}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-4">Monthly Observations</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="obs" fill="#4B8BF5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-4">Average Score Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={scoreData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis domain={[0, 4]} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Teachers */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
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

      {/* Recent Observations */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
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