
import { Navigate, Route, Routes } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ReportsPage from './pages/ReportsPage'
import RiskMapPage from './pages/RiskMapPage'
import SettingsPage from './pages/SettingsPage'

import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'
import VerificationPage from './pages/VerificationPAge'

export default function App() {
  return (
    <Routes>
      {/* Halaman publik */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/download" element={<LandingPage downloadMode />} />
        <Route path="/verify" element={<VerificationPage />} />
      </Route>

      {/* Halaman login admin */}
      <Route path="/login" element={<LoginPage />} />

      {/* Halaman dashboard admin */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/risk-map" element={<RiskMapPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Halaman tidak ditemukan */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
