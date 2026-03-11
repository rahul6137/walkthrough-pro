import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Pricing() {
  return (
    <div className="min-h-screen bg-[#dde8ed]">
      <Navbar />

      <div className="py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">Pricing</h1>
        <p className="text-gray-600 mb-10">Choose the plan that's right for your school.</p>

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-8 text-left">
          <h2 className="text-xl font-bold text-blue-900 text-center mb-2">Professional</h2>
          <div className="text-center mb-2">
            <span className="text-4xl font-bold text-blue-900">$9.99</span>
            <span className="text-gray-500 text-sm">/ person / month</span>
          </div>
          <p className="text-center text-green-600 text-xs mb-4">5-day free trial • No credit card required</p>

          <p className="font-semibold text-gray-700 mb-3">Included:</p>
          {[
            "Unlimited classroom observations",
            "AI analysis of all 8 T-TESS dimensions (2.1-2.5, 3.1-3.3)",
            "5-7 sentences of evidence per dimension",
            "1 Glow + 1 Grow for each dimension",
            "Actionable next steps & look-fors",
            "Growth timeline tracking",
            "Campus-wide analytics dashboard",
            "Mobile app access",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-700 mb-2">
              <span className="text-green-500">✓</span> {item}
            </div>
          ))}

          <button className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold mt-4 hover:bg-blue-800">
            Start Your Free Trial
          </button>
          <p className="text-center text-gray-400 text-sm my-2">Or</p>
          <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50">
            Subscribe Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 px-10 mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span>🚀</span>
              <span className="font-bold text-blue-300">Walkthrough<span className="text-white">Pro</span></span>
            </div>
            <p className="text-blue-200 text-xs">Enterprise-grade education technology platform for classroom observations and AI-driven coaching.</p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "AI Coaching"] },
            { title: "Company", links: ["About", "Blog", "Careers"] },
            { title: "Support", links: ["Help Center", "Contact", "Privacy"] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-semibold mb-3">{col.title}</h4>
              {col.links.map((link, j) => (
                <p key={j} className="text-blue-200 text-sm mb-1 hover:text-white cursor-pointer">{link}</p>
              ))}
            </div>
          ))}
        </div>
        <p className="text-center text-blue-300 text-sm mt-8">© 2026 WalkthroughPro 2.0. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Pricing