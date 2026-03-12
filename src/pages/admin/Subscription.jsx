import { Download } from 'lucide-react'
import AdminLayout from './AdminLayout'

const invoices = [
  { id: 'INV-2026-003', date: 'March 15, 2026', amount: '$2870' },
  { id: 'INV-2025-003', date: 'March 15, 2025', amount: '$2870' },
  { id: 'INV-2026-002', date: 'February 15, 2026', amount: '$2870' },
]

function ProgressBar({ value, max, color }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
      <div className={`h-2 rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }}></div>
    </div>
  )
}

function Subscription() {
  return (
    <AdminLayout title="Subscription & Billing" subtitle="Manage your plan and billing">

      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-700 mb-4">Current Usage</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Teachers', value: '48 / 100', color: 'bg-blue-500' },
            { label: 'Teachers', value: '48 / 100', color: 'bg-teal-500' },
            { label: 'Teachers', value: '48 / 100', sub: 'All time', color: 'bg-purple-500', border: 'border border-purple-300' },
            { label: 'This Month', value: '48 / 100', sub: 'Observations', color: 'bg-green-500', border: 'border border-green-300' },
          ].map((u, i) => (
            <div key={i} className={`rounded-xl p-4 ${u.border || 'bg-gray-50'}`}>
              <div className="text-sm text-gray-500 mb-1">{u.label}</div>
              <div className="text-2xl font-bold text-gray-800">{u.value}</div>
              {u.sub && <div className="text-xs text-gray-400">{u.sub}</div>}
              <ProgressBar value={48} max={100} color={u.color} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-700 mb-4">Billing History</h3>
        {invoices.map((inv, i) => (
          <div key={i} className="flex items-center justify-between py-4 border-b last:border-0 bg-gray-50 px-4 rounded-lg mb-2">
            <div>
              <div className="font-medium text-gray-800">{inv.id}</div>
              <div className="text-xs text-gray-400">{inv.date}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-800">{inv.amount}</span>
              <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-medium">Paid</span>
              <button className="text-gray-400 hover:text-gray-600">
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}

export default Subscription