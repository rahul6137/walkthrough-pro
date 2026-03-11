import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend } from 'recharts'
import AdminLayout from './AdminLayout'

const radarData = [
  { subject: 'Respect', A: 3.2 },
  { subject: 'Culture', A: 3.4 },
  { subject: 'Procedures', A: 3.6 },
  { subject: 'Behavior', A: 3.3 },
  { subject: 'Communication', A: 3.1 },
  { subject: 'Questioning', A: 2.9 },
]

const domainData = [
  { month: 'Sep', d2: 3.2, d3: 3.0 }, { month: 'Oct', d2: 3.4, d3: 3.1 },
  { month: 'Nov', d2: 3.5, d3: 3.2 }, { month: 'Dec', d2: 3.4, d3: 3.1 },
  { month: 'Jan', d2: 3.7, d3: 3.4 }, { month: 'Feb', d2: 3.5, d3: 3.3 },
  { month: 'Mar', d2: 3.8, d3: 3.5 },
]

function DomainAnalytics() {
  return (
    <AdminLayout title="Domain Analytics" subtitle="5 observations this month">
      <h1 className="text-3xl font-bold text-gray-800">Domain Analytics</h1>
      <p className="text-gray-500 mb-6">5 observations this month</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { title: 'Classroom Environment', score: '3.5', color: 'text-blue-600', highest: 'Classroom Procedures (3.6)', lowest: 'Student Behavior (3.3)' },
          { title: 'Instruction', score: '3.5', color: 'text-green-500', highest: 'Communication (3.4)', lowest: 'Questioning (2.9)' },
        ].map((d, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-1">{d.title}</h3>
            <div className={`text-4xl font-bold ${d.color} mb-1`}>{d.score}</div>
            <div className="text-sm text-gray-500 mb-3">Average Score</div>
            <div className="flex justify-between text-sm text-gray-600 border-t pt-3">
              <span>Highest:</span><span>{d.highest}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Lowest:</span><span>{d.lowest}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-700 mb-4">Classroom Environment</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <Radar dataKey="A" stroke="#4B8BF5" fill="#4B8BF5" fillOpacity={0.5} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-700 mb-4">Domain Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={domainData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis domain={[0, 4]} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="d2" name="Domain 2" fill="#4B8BF5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="d3" name="Domain 3" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AdminLayout>
  )
}

export default DomainAnalytics