import { useState } from 'react'
import { ChevronRight, ChevronDown, Download, Share2 } from 'lucide-react'
import ObserverLayout from './ObserverLayout'

const dimensions = [
  { id: '2.1', title: 'Achieving Expectations', rating: 'Proficient', color: 'text-blue-600 bg-blue-50' },
  { id: '2.2', title: 'Content Knowledge and Expertise', rating: 'Proficient', color: 'text-blue-600 bg-blue-50' },
  { id: '2.3', title: 'Communication', rating: 'Proficient', color: 'text-blue-600 bg-blue-50' },
  { id: '2.4', title: 'Differentiation', rating: 'Developing', color: 'text-yellow-600 bg-yellow-50' },
  { id: '2.5', title: 'Monitor and Adjust', rating: 'Proficient', color: 'text-blue-600 bg-blue-50' },
  { id: '3.1', title: 'Classroom Environment, Routines, and Procedures', rating: 'Proficient', color: 'text-blue-600 bg-blue-50' },
  { id: '3.2', title: 'Managing Student Behavior', rating: 'Proficient', color: 'text-blue-600 bg-blue-50' },
  { id: '3.3', title: 'Classroom Culture', rating: 'Proficient', color: 'text-blue-600 bg-blue-50' },
]

function AICoachingOutput() {
  const [activeTab, setActiveTab] = useState('ai')
  const [expanded, setExpanded] = useState(null)

  return (
    <ObserverLayout title="AI Coaching Output (Full)" subtitle="Sarah Thompson - Social Studies" showBack backTo="/observer/form">

      <div className="max-w-2xl mx-auto space-y-4">

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex justify-between text-sm text-gray-600">
          <div className="space-y-1"><div>Saved as:</div><div>Date:</div></div>
          <div className="text-right space-y-1">
            <div className="font-medium">Grade 6 — Social Studies</div>
            <div className="font-medium">March 10, 2026</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="font-medium text-gray-800 mb-3">Domains (select all that apply)</div>
          {['Domain 2 - Instruction', 'Domain 3 - Learning Environment'].map(d => (
            <div key={d} className="flex items-center gap-2 text-sm text-gray-700 mb-2">
              <div className="w-4 h-4 rounded border-2 border-blue-900 bg-blue-900 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-sm"></div>
              </div>
              {d}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="font-medium text-gray-800 mb-3">Raw Notes</div>
          <div className="bg-[#f5f5ec] rounded-lg p-4 text-sm text-gray-700 font-mono leading-relaxed">
            CO: I will analyze the economic, political, and cultural challenges Western Europe faced...<br />
            LO: I will use vocabulary terms to identify the major challenges...<br /><br />
            Teacher started off by introducing the content and language objectives to the class...
          </div>
        </div>

        <div className="flex rounded-xl overflow-hidden border border-gray-200">
          <button onClick={() => setActiveTab('ai')}
            className={`flex-1 py-3 text-sm font-semibold ${activeTab === 'ai' ? 'bg-blue-900 text-white' : 'bg-white text-gray-600'}`}>
            AI Coaching Assist (Full)
          </button>
          <button onClick={() => setActiveTab('conf')}
            className={`flex-1 py-3 text-sm font-semibold ${activeTab === 'conf' ? 'bg-blue-900 text-white' : 'bg-white text-gray-600'}`}>
            Conference Mode Summary
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg">AI Coaching Output (Full)</h3>
          </div>
          {dimensions.map((d) => (
            <div key={d.id} className="border-b border-gray-50 last:border-0">
              <button onClick={() => setExpanded(expanded === d.id ? null : d.id)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                <div className="text-left">
                  <div className="font-semibold text-gray-800">{d.id} {d.title}</div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block ${d.color}`}>
                    Rating: {d.rating}
                  </span>
                </div>
                {expanded === d.id
                  ? <ChevronDown size={18} className="text-gray-400" />
                  : <ChevronRight size={18} className="text-gray-400" />}
              </button>
              {expanded === d.id && (
                <div className="px-6 pb-4 text-sm text-gray-600 bg-gray-50">
                  AI-generated feedback for {d.title} will appear here based on observation notes.
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3 pb-4">
          <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
            <Download size={16} /> Download PDF
          </button>
          <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
            <Share2 size={16} /> Share
          </button>
        </div>
      </div>

    </ObserverLayout>
  )
}

export default AICoachingOutput