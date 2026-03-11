import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/admin/Dashboard'
import Teachers from './pages/admin/Teachers'
import ObservationReports from './pages/admin/ObservationReports'
import DomainAnalytics from './pages/admin/DomainAnalytics'
import Subscription from './pages/admin/Subscription'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/teachers" element={<Teachers />} />
        <Route path="/admin/reports" element={<ObservationReports />} />
        <Route path="/admin/analytics" element={<DomainAnalytics />} />
        <Route path="/admin/subscription" element={<Subscription />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
