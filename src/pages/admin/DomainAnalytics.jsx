import { useState, useEffect } from 'react'
import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryGroup, VictoryLegend } from 'victory'
import AdminLayout from './AdminLayout'

function DomainAnalytics() {
  const [observations, setObservations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/observations`)
      .then(r => r.json())
      .then(data => { setObservations(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const avg = (key) => {
    const vals = observations.map(o => {
      try { return parseFloat(JSON.parse(o.domain2_scores || '{}')[key] || JSON.parse(o.domain3_scores || '{}')[key] || 0) }
      catch { return 0 }
    }).filter(v => v > 0)
    return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : 0
  }

  const d2Keys = ['d2_1', 'd2_2', 'd2_3', 'd2_4', 'd2_5']
  const d3Keys = ['d3_1', 'd3_2', 'd3_3']
  const d2Labels = ['2.1 Expectations', '2.2 Content', '2.3 Communication', '2.4 Differentiation', '2.5 Monitor']
  const d3Labels = ['3.1 Environment', '3.2 Behavior', '3.3 Culture']

  const domain2BarData = d2Keys.map((k, i) => ({ x: d2Labels[i], y: parseFloat(avg(k)) }))
  const domain3BarData = d3Keys.map((k, i) => ({ x: d3Labels[i], y: parseFloat(avg(k)) }))

  const domain2Avg = domain2BarData.length ? (domain2BarData.reduce((a, b) => a + b.y, 0) / domain2BarData.length).toFixed(1) : '0.0'
  const domain3Avg = domain3BarData.length ? (domain3BarData.reduce((a, b) => a + b.y, 0) / domain3BarData.length).toFixed(1) : '0.0'

  return (
    <AdminLayout title="Domain Analytics" subtitle={`${observations.length} observations total`}>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { title: 'Domain 2 — Instruction', score: domain2Avg, color: 'text-green-500' },
          { title: 'Domain 3 — Environment', score: domain3Avg, color: 'text-blue-600' },
        ].map((d, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-1">{d.title}</h3>
            <div className={`text-4xl font-bold ${d.color} mb-1`}>{d.score}</div>
            <div className="text-sm text-gray-500">Average Score</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center text-gray-400">Loading...</div>
      ) : observations.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center text-gray-400">No observations yet</div>
      ) : (
        <>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Domain 2 — Instruction Breakdown</h3>
            <VictoryChart theme={VictoryTheme.clean} height={250}
              padding={{ top: 10, bottom: 80, left: 50, right: 20 }} domainPadding={{ x: 30 }}>
              <VictoryAxis style={{ tickLabels: { fontSize: 8, angle: -20 } }} />
              <VictoryAxis dependentAxis domain={[0, 4]} style={{ tickLabels: { fontSize: 10 } }} />
              <VictoryBar data={domain2BarData} style={{ data: { fill: '#22c55e' } }} cornerRadius={{ top: 4 }} />
            </VictoryChart>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-700 mb-2">Domain 3 — Environment Breakdown</h3>
            <VictoryChart theme={VictoryTheme.clean} height={250}
              padding={{ top: 10, bottom: 80, left: 50, right: 20 }} domainPadding={{ x: 30 }}>
              <VictoryAxis style={{ tickLabels: { fontSize: 8, angle: -20 } }} />
              <VictoryAxis dependentAxis domain={[0, 4]} style={{ tickLabels: { fontSize: 10 } }} />
              <VictoryBar data={domain3BarData} style={{ data: { fill: '#4B8BF5' } }} cornerRadius={{ top: 4 }} />
            </VictoryChart>
          </div>
        </>
      )}
    </AdminLayout>
  )
}

export default DomainAnalytics