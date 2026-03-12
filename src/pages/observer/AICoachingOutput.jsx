import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronDown, Download, Share2, Loader, Check } from 'lucide-react'
import ObserverLayout from './ObserverLayout'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

function ratingColor(rating) {
  if (!rating) return 'text-gray-600 bg-gray-50'
  const r = rating.toLowerCase()
  if (r.includes('distinguished')) return 'text-purple-600 bg-purple-50'
  if (r.includes('accomplished')) return 'text-blue-600 bg-blue-50'
  if (r.includes('proficient')) return 'text-green-600 bg-green-50'
  if (r.includes('developing')) return 'text-yellow-600 bg-yellow-50'
  return 'text-red-600 bg-red-50'
}

function AICoachingOutput() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state || {}

  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState(null)
  const [activeTab, setActiveTab] = useState('ai')
  const [copied, setCopied] = useState(false)
  const [shareLoading, setShareLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${import.meta.env.VITE_API_URL}/ai/analyze`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            scores: state.scores,
            notes: state.notes,
            teacherName: state.teacher || 'Unknown',
            subject: state.subject || 'Unknown'
          })
        })

        const data = await res.json()
        if (!res.ok) {
          setError(data.message)
          return
        }
        setAnalysis(data)
      } catch (err) {
        setError('Failed to generate analysis. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    if (state.scores) {
      fetchAnalysis()
    } else {
      setError('No observation data found.')
      setLoading(false)
    }
  }, [])

  const handleDownload = async () => {
    setDownloading(true)
    console.log('Download started - jsPDF method')
    try {
      setExpanded('all')
      await new Promise(r => setTimeout(r, 800))

      const element = document.getElementById('ai-output-content')

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#f4f7f8'
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pageWidth
      const imgHeight = (canvas.height * pageWidth) / canvas.width

      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft > 0) {
        position -= pageHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`observation-${state.teacher || 'report'}.pdf`)
      setExpanded(null)

    } catch (err) {
      console.error(err)
      alert('Download failed: ' + err.message)
    } finally {
      setDownloading(false)
    }
  }

  const handleShare = async () => {
    if (!state.observationId) {
      alert('Observation ID not found!')
      return
    }
    setShareLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${import.meta.env.VITE_API_URL}/observations/${state.observationId}/share`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      const shareUrl = `${window.location.origin}/shared/${data.token}`
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      alert('Failed to generate share link')
    } finally {
      setShareLoading(false)
    }
  }

  if (loading) {
    return (
      <ObserverLayout title="AI Coaching Output" subtitle="Analyzing observation...">
        <div className="flex flex-col items-center justify-center py-20">
          <Loader size={48} className="text-blue-900 animate-spin mb-4" />
          <p className="text-gray-600 text-lg font-medium">Generating AI Analysis...</p>
          <p className="text-gray-400 text-sm mt-2">Based on T-TESS rubric — this may take a few seconds</p>
        </div>
      </ObserverLayout>
    )
  }

  if (error) {
    return (
      <ObserverLayout title="AI Coaching Output" subtitle="Error">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl">
            {error}
          </div>
          <button onClick={() => navigate('/observer/form')}
            className="mt-4 bg-blue-900 text-white px-6 py-3 rounded-xl hover:bg-blue-800">
            Go Back
          </button>
        </div>
      </ObserverLayout>
    )
  }

  return (
    <ObserverLayout title="AI Coaching Output" subtitle={`${state.teacher || 'Teacher'} — ${state.subject || 'Subject'}`} showBack backTo="/observer">

      <div id="ai-output-content" className="max-w-2xl mx-auto space-y-4">

        {/* Overall Summary */}
        <div className="bg-blue-900 rounded-2xl p-6 text-white">
          <h3 className="font-bold text-lg mb-2">Overall Summary</h3>
          <p className="text-blue-100 text-sm leading-relaxed">{analysis?.overallSummary}</p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200">
          <button onClick={() => setActiveTab('ai')}
            className={`flex-1 py-3 text-sm font-semibold ${activeTab === 'ai' ? 'bg-blue-900 text-white' : 'bg-white text-gray-600'}`}>
            AI Coaching (Full)
          </button>
          <button onClick={() => setActiveTab('conf')}
            className={`flex-1 py-3 text-sm font-semibold ${activeTab === 'conf' ? 'bg-blue-900 text-white' : 'bg-white text-gray-600'}`}>
            Conference Mode
          </button>
        </div>

        {activeTab === 'ai' && (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-800">Dimension Analysis</h3>
              </div>
              {analysis?.dimensions?.map((d) => (
                <div key={d.id} className="border-b border-gray-50 last:border-0">
                  <button onClick={() => setExpanded(expanded === d.id ? null : d.id)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">{d.id} — {d.title}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${ratingColor(d.rating)}`}>
                          {d.rating}
                        </span>
                        <span className="text-xs text-gray-400">Score: {d.score}</span>
                      </div>
                    </div>
                    {expanded === d.id || expanded === 'all'
                      ? <ChevronDown size={18} className="text-gray-400" />
                      : <ChevronRight size={18} className="text-gray-400" />}
                  </button>
                  {(expanded === d.id || expanded === 'all') && (
                    <div className="px-6 pb-5 bg-gray-50 space-y-3">
                      <div>
                        <div className="text-xs font-bold text-green-600 uppercase mb-1">Strengths</div>
                        <p className="text-sm text-gray-700">{d.strengths}</p>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-yellow-600 uppercase mb-1">Areas for Improvement</div>
                        <p className="text-sm text-gray-700">{d.improvements}</p>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-blue-600 uppercase mb-1">Next Steps</div>
                        <p className="text-sm text-gray-700">{d.nextSteps}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-3">Top Strengths</h3>
              {analysis?.topStrengths?.map((s, i) => (
                <div key={i} className="flex items-start gap-3 mb-2">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-sm text-gray-700">{s}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-3">Priority Goals</h3>
              {analysis?.priorityGoals?.map((g, i) => (
                <div key={i} className="flex items-start gap-3 mb-2">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-sm text-gray-700">{g}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'conf' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">Conference Questions</h3>
            <p className="text-sm text-gray-500 mb-4">Use these questions during your post-observation conference:</p>
            {analysis?.conferenceQuestions?.map((q, i) => (
              <div key={i} className="flex items-start gap-3 mb-4 p-4 bg-blue-50 rounded-xl">
                <div className="w-6 h-6 bg-blue-900 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-blue-900">{q}</p>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pb-6">
          <button onClick={handleDownload} disabled={downloading}
            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2 disabled:opacity-50">
            {downloading
              ? <><Loader size={16} className="animate-spin" /> Generating...</>
              : <><Download size={16} /> Download PDF</>}
          </button>
          <button onClick={handleShare} disabled={shareLoading}
            className={`flex-1 border py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 ${
              copied
                ? 'border-green-300 text-green-600 bg-green-50'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
            {copied
              ? <><Check size={16} /> Copied!</>
              : shareLoading
              ? 'Generating...'
              : <><Share2 size={16} /> Share</>}
          </button>
        </div>

      </div>
    </ObserverLayout>
  )
}

export default AICoachingOutput