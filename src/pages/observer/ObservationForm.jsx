import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ObserverLayout from './ObserverLayout'

const domain2 = [
  { key: 'd2_1', label: '2.1 Achieving Expectations' },
  { key: 'd2_2', label: '2.2 Content Knowledge' },
  { key: 'd2_3', label: '2.3 Communication' },
  { key: 'd2_4', label: '2.4 Differentiation' },
  { key: 'd2_5', label: '2.5 Monitor and Adjust' },
]

const domain3 = [
  { key: 'd3_1', label: '3.1 Classroom Environment' },
  { key: 'd3_2', label: '3.2 Managing Student Behavior' },
  { key: 'd3_3', label: '3.3 Classroom Culture' },
]

function ratingLabel(val) {
  if (val >= 3.5) return 'Distinguished'
  if (val >= 2.5) return 'Proficient'
  if (val >= 1.5) return 'Developing'
  return 'Inadequate'
}

function ObservationForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const formData = location.state || {}

  const [scores, setScores] = useState({
    d2_1: 2.5, d2_2: 2.5, d2_3: 2.5, d2_4: 2.5, d2_5: 2.5,
    d3_1: 2.5, d3_2: 2.5, d3_3: 2.5,
  })
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('token')

      const domain2Scores = { d2_1: scores.d2_1, d2_2: scores.d2_2, d2_3: scores.d2_3, d2_4: scores.d2_4, d2_5: scores.d2_5 }
      const domain3Scores = { d3_1: scores.d3_1, d3_2: scores.d3_2, d3_3: scores.d3_3 }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/observations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          teacherName: formData.teacher || 'Unknown',
          subject: formData.subject || 'Unknown',
          classPeriod: formData.classPeriod || '',
          date: formData.date || new Date().toISOString().split('T')[0],
          time: formData.time || '',
          domain2Scores,
          domain3Scores,
          notes
        })
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.message)
        return
      }

      navigate('/observer/ai-coaching', { state: { scores, notes, ...formData, observationId: data.id } })

    } catch (err) {
      setError('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ObserverLayout title="Observation Form" subtitle="Rate each dimension" showBack backTo="/observer/start">
      <div className="max-w-2xl mx-auto space-y-6">

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-blue-900 mb-4">Domain 2 — Instruction</h3>
          {domain2.map((d) => (
            <div key={d.key} className="mb-5">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{d.label}</span>
                <span className="font-bold text-blue-900">{scores[d.key].toFixed(1)} — {ratingLabel(scores[d.key])}</span>
              </div>
              <input type="range" min="1" max="4" step="0.1"
                value={scores[d.key]}
                onChange={e => setScores({ ...scores, [d.key]: parseFloat(e.target.value) })}
                className="w-full accent-blue-900" />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1.0 Inadequate</span><span>2.0 Developing</span><span>3.0 Proficient</span><span>4.0 Distinguished</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-blue-900 mb-4">Domain 3 — Learning Environment</h3>
          {domain3.map((d) => (
            <div key={d.key} className="mb-5">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{d.label}</span>
                <span className="font-bold text-blue-900">{scores[d.key].toFixed(1)} — {ratingLabel(scores[d.key])}</span>
              </div>
              <input type="range" min="1" max="4" step="0.1"
                value={scores[d.key]}
                onChange={e => setScores({ ...scores, [d.key]: parseFloat(e.target.value) })}
                className="w-full accent-blue-900" />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1.0 Inadequate</span><span>2.0 Developing</span><span>3.0 Proficient</span><span>4.0 Distinguished</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-blue-900 mb-3">Raw Notes</h3>
          <textarea rows={5} placeholder="Write your observation notes here..."
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-[#f5f5ec] focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            value={notes} onChange={e => setNotes(e.target.value)} />
        </div>

        <button onClick={handleSubmit} disabled={loading}
          className="w-full bg-blue-900 text-white py-4 rounded-xl font-semibold hover:bg-blue-800 disabled:opacity-50 text-lg">
          {loading ? 'Saving...' : 'Submit & Get AI Coaching'}
        </button>

      </div>
    </ObserverLayout>
  )
}

export default ObservationForm