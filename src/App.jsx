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
import ObserverDashboard from './pages/observer/ObserverDashboard'
import StartObservation from './pages/observer/StartObservation'
import ObservationForm from './pages/observer/ObservationForm'
import AICoachingOutput from './pages/observer/AICoachingOutput'
import ObservationHistory from './pages/observer/ObservationHistory'
import Profile from './pages/observer/Profile'
import EditProfile from './pages/observer/EditProfile'
import ObserverSettings from './pages/observer/Settings'

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
        <Route path="/observer" element={<ObserverDashboard />} />
<Route path="/observer/start" element={<StartObservation />} />
<Route path="/observer/form" element={<ObservationForm />} />
<Route path="/observer/ai-coaching" element={<AICoachingOutput />} />
<Route path="/observer/history" element={<ObservationHistory />} />
<Route path="/observer/profile" element={<Profile />} />
<Route path="/observer/edit-profile" element={<EditProfile />} />
<Route path="/observer/settings" element={<ObserverSettings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
