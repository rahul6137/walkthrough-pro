function App() {
  return (
    <div className="font-sans">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          <span className="font-bold text-blue-900 text-xl">WalkthroughPro</span>
        </div>
        <div className="flex gap-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">How it works</a>
          <a href="#" className="hover:text-blue-600">Login</a>
        </div>
        <div className="flex gap-3">
          <button className="text-gray-600 text-xl">👤</button>
          <button className="text-red-500 text-xl">🚪</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-teal-800 text-white text-center py-20 px-6">
        <h1 className="text-4xl font-bold mb-4">
          Coaching-ready walkthroughs,<br />without the rewrite.
        </h1>
        <p className="text-lg text-teal-200 mb-8 max-w-xl mx-auto">
          WalkthroughPro turns raw classroom notes into clear T-TESS-aligned feedback:
          glows, grows, action steps, and a growth timeline — in seconds.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-100">
            Download app
          </button>
          <button className="border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-teal-700">
            View Pricing
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Everything Administrators Need for Effective Walkthroughs
        </h2>
        <p className="text-gray-500 mb-10">
          Streamline observations with AI-powered T-TESS aligned feedback
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { icon: "👁️", title: "Raw Notes to T-TESS Feedback", desc: "Instantly convert your observation notes into structured, rubric-aligned feedback" },
            { icon: "🎯", title: "AI-Guided Ratings", desc: "Get recommended ratings for each dimension backed by evidence from your notes" },
            { icon: "📈", title: "Evidence-Based Feedback", desc: "AI converts raw walkthrough notes into structured 5–7 sentence evidence statements" },
            { icon: "👥", title: "Campus-Wide Analytics", desc: "Monitor instructional trends across all teachers or focus on individual growth" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm text-left">
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-blue-50 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">How It Works</h2>
        <p className="text-gray-500 mb-10">Four simple steps to better teaching outcomes</p>
        <div className="max-w-2xl mx-auto text-left space-y-6">
          {[
            { num: 1, title: "Observer Conducts Walkthrough", desc: "Use WalkthroughPro on any device to record classroom observations and capture real-time instructional notes." },
            { num: 2, title: "AI Analyzes Performance", desc: "Our AI reviews the observation data and identifies instructional patterns and key areas for growth." },
            { num: 3, title: "AI Generates T-TESS Aligned Coaching", desc: "Observation notes are instantly converted into structured feedback aligned to the T-TESS rubric." },
            { num: 4, title: "Monitor Instructional Trends Across Your Campus", desc: "View walkthrough data in one dashboard. Analyze trends for all teachers or focus on individual teacher growth." },
          ].map((step) => (
            <div key={step.num} className="flex gap-4 items-start">
              <div className="bg-teal-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                {step.num}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Coaching Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              AI-Powered Coaching That Actually Helps
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Our advanced AI analyzes observation data across Domain 2 and Domain 3
              to provide personalized, actionable coaching feedback.
            </p>
            {["Personalized strengths and growth areas", "Specific, actionable improvement strategies", "Domain-specific performance insights", "Progress tracking over time"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                <span className="text-green-500">✅</span> {item}
              </div>
            ))}
          </div>
          <div className="border rounded-xl p-8 bg-gray-50">
            <div className="text-center text-3xl mb-2">🧠</div>
            <h3 className="text-center font-bold text-gray-800 mb-4">T-TESS Feedback Example</h3>
            <p className="font-semibold text-sm text-gray-700">Dimension: Classroom Environment</p>
            <p className="text-xs text-gray-500 mb-2">AI Recommended Rating: 3 (Proficient)</p>
            <p className="font-semibold text-sm text-gray-700 mb-1">Evidence:</p>
            <p className="text-xs text-gray-500 italic">
              "The teacher established clear behavioral expectations at the start of class and redirected
              off-task behavior promptly. Students transitioned smoothly between activities..."
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span>🚀</span>
              <span className="font-bold text-blue-400">WalkthroughPro</span>
            </div>
            <p className="text-gray-400 text-xs">Enterprise-grade education technology platform for classroom observations and AI-driven coaching.</p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "AI Coaching"] },
            { title: "Company", links: ["About", "Blog", "Careers"] },
            { title: "Support", links: ["Help Center", "Contact", "Privacy"] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-semibold mb-3">{col.title}</h4>
              {col.links.map((link, j) => (
                <p key={j} className="text-gray-400 text-sm mb-1 hover:text-white cursor-pointer">{link}</p>
              ))}
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm mt-8">© 2026 WalkthroughPro 2.0. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default App
