import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ObserverLayout from './ObserverLayout'


const domain2 = ['Establishing a Culture for Learning', 'Managing Classroom Procedures', 'Managing Student Behavior']
const domain3 = ['Communicating with Students', 'Using Questioning and Discussion', 'Engaging Students in Learning', 'Using Assessment in Instruction']

function SliderRow({ label, value, onChange }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-lg font-bold text-blue-900">{value.toFixed(1)}</span>
      </div>
      <input type="range" min="1" max="4" step="0.1" value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full accent-blue-900 h-2 rounded-full cursor-pointer" />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>1.0</span><span>2.0</span><span>3.0</span><span>4.0</span>
      </div>
    </div>
  )
}

function ObservationForm() {
  const navigate = useNavigate()
  const [scores, setScores] = useState({})
  const [notes, setNotes] = useState('')
  const setScore = (key, val) => setScores(prev => ({ ...prev, [key]: val }))
  const getScore = (key) => scores[key] ?? 3.0

  return (
    <ObserverLayout title="Observation Form" subtitle="Sarah Thompson - Mathematics" showBack backTo="/observer/start">

      <div className="max-w-2xl mx-auto space-y-6">

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 text-lg mb-5">Domain 2: Classroom Environment</h3>
          {domain2.map(d => <SliderRow key={d} label={d} value={getScore(d)} onChange={v => setScore(d, v)} />)}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 text-lg mb-5">Domain 3: Instruction</h3>
          {domain3.map(d => <SliderRow key={d} label={d} value={getScore(d)} onChange={v => setScore(d, v)} />)}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-medium text-gray-700 mb-3">Observation Notes</h3>
          <textarea rows={5} placeholder="Enter your detailed observations here..."
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-[#f5f5ec] focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            value={notes} onChange={e => setNotes(e.target.value)} />
        </div>

        <button onClick={() => navigate('/observer/ai-coaching')}
          className="w-full bg-blue-900 text-white py-4 rounded-xl font-semibold hover:bg-blue-800 text-lg">
          Submit Observation
        </button>
      </div>

    </ObserverLayout>
  )
}

export default ObservationForm