import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryGroup, VictoryLegend } from 'victory'
import AdminLayout from './AdminLayout'

const radarData = [
  { x: 'Respect', y: 3.2 },
  { x: 'Culture', y: 3.4 },
  { x: 'Procedures', y: 3.6 },
  { x: 'Behavior', y: 3.3 },
  { x: 'Communication', y: 3.1 },
  { x: 'Questioning', y: 2.9 },
]

const domain2Data = [
  { x: 'Sep', y: 3.2 }, { x: 'Oct', y: 3.4 },
  { x: 'Nov', y: 3.5 }, { x: 'Dec', y: 3.4 },
  { x: 'Jan', y: 3.7 }, { x: 'Feb', y: 3.5 },
  { x: 'Mar', y: 3.8 },
]

const domain3Data = [
  { x: 'Sep', y: 3.0 }, { x: 'Oct', y: 3.1 },
  { x: 'Nov', y: 3.2 }, { x: 'Dec', y: 3.1 },
  { x: 'Jan', y: 3.4 }, { x: 'Feb', y: 3.3 },
  { x: 'Mar', y: 3.5 },
]

function DomainAnalytics() {
  return (
    <AdminLayout title="Domain Analytics" subtitle="5 observations this month">

      {/* Domain Score Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { title: 'Classroom Environment', score: '3.5', color: 'text-blue-600', highest: 'Classroom Procedures (3.6)', lowest: 'Student Behavior (3.3)' },
          { title: 'Instruction', score: '3.2', color: 'text-green-500', highest: 'Communication (3.4)', lowest: 'Questioning (2.9)' },
        ].map((d, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
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

      {/* Classroom Environment Bar Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">Classroom Environment — Dimension Breakdown</h3>
        <VictoryChart
          theme={VictoryTheme.clean}
          height={250}
          padding={{ top: 10, bottom: 50, left: 50, right: 20 }}
          domainPadding={{ x: 30 }}
        >
          <VictoryAxis style={{ tickLabels: { fontSize: 9, angle: -20 } }} />
          <VictoryAxis dependentAxis domain={[0, 4]} style={{ tickLabels: { fontSize: 10 } }} />
          <VictoryBar
            data={radarData}
            style={{ data: { fill: '#4B8BF5' } }}
            cornerRadius={{ top: 4 }}
          />
        </VictoryChart>
      </div>

      {/* Domain Comparison Line Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-2">Domain Comparison Over Time</h3>
        <VictoryChart
          theme={VictoryTheme.clean}
          height={250}
          padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
        >
          <VictoryLegend
            x={60} y={0}
            orientation="horizontal"
            data={[
              { name: 'Domain 2', symbol: { fill: '#4B8BF5' } },
              { name: 'Domain 3', symbol: { fill: '#22c55e' } },
            ]}
            style={{ labels: { fontSize: 10 } }}
          />
          <VictoryAxis style={{ tickLabels: { fontSize: 10 } }} />
          <VictoryAxis dependentAxis domain={[0, 4]} style={{ tickLabels: { fontSize: 10 } }} />
          <VictoryGroup>
            <VictoryLine
              data={domain2Data}
              style={{ data: { stroke: '#4B8BF5', strokeWidth: 2 } }}
            />
            <VictoryLine
              data={domain3Data}
              style={{ data: { stroke: '#22c55e', strokeWidth: 2 } }}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>

    </AdminLayout>
  )
}

export default DomainAnalytics
