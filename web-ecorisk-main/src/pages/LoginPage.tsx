
import { useState } from 'react'
import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  Leaf,
  ShieldCheck,
  LogIn,
  ArrowLeft,
  Activity,
  MapPin,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Email dan password wajib diisi.')
      return
    }

    // Login backend akan dihubungkan pada tahap integrasi API.
    setError('Autentikasi admin belum terhubung ke backend.')
  }

  return (
    <main className="login-page">
      <div className="login-container">

        {/* Bagian kiri: Branding EcoRisk */}
        <section className="login-hero">
          <div className="login-brand">
            <div className="login-brand-icon">
              <Leaf size={36} />
            </div>
            <div>
              <h2>ecorisk</h2>
              <span>ENVIRONMENTAL WATCH</span>
            </div>
          </div>

          <div className="login-hero-content">
            <span className="login-hero-label">
              ENVIRONMENTAL INTELLIGENCE PLATFORM
            </span>

            <h1>EcoRisk Intelligence</h1>

            <h2>
              Dashboard Analisis & Pemantauan
              Lingkungan Terintegrasi
            </h2>

            <p>
              Pantau risiko lingkungan, kelola laporan,
              dan ambil keputusan berbasis data AI
              untuk masa depan yang lebih hijau.
            </p>

            <div className="login-security-card">
              <ShieldCheck size={34} />
              <div>
                <strong>Akses Khusus Administrator</strong>
                <span>Kelola sistem dengan aman dan terpercaya.</span>
              </div>
            </div>
          </div>

          <div className="login-features">
            <div>
              <Activity size={22} />
              <span>Analisis AI<br />Real-time</span>
            </div>
            <div>
              <MapPin size={22} />
              <span>Peta Risiko<br />Interaktif</span>
            </div>
            <div>
              <Leaf size={22} />
              <span>Lingkungan<br />Lebih Terjaga</span>
            </div>
          </div>
        </section>

        {/* Bagian kanan: Form Login */}
        <section className="login-form-section">
          <div className="login-form-wrapper">

            <div className="login-logo">
              <Leaf size={34} />
            </div>

            <div className="login-heading">
              <h1>Admin Login</h1>
              <p>Masuk ke dashboard administrator EcoRisk</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="login-input-group">
                <label htmlFor="email">Email Administrator</label>
                <div className="login-input-wrapper">
                  <Mail size={19} />
                  <input
                    id="email"
                    type="email"
                    placeholder="Masukkan email admin"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="login-input-group">
                <label htmlFor="password">Password</label>
                <div className="login-input-wrapper">
                  <LockKeyhole size={19} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="login-eye-button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? 'Sembunyikan password' : 'Lihat password'
                    }
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              <div className="login-options">
                <label className="login-remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Ingat saya</span>
                </label>
                <button
                  type="button"
                  className="login-forgot"
                  onClick={() =>
                    setError('Silakan hubungi pengelola sistem untuk pemulihan akun.')
                  }
                >
                  Lupa password?
                </button>
              </div>

              {error && (
                <div className="login-error" role="alert">
                  {error}
                </div>
              )}

              <button type="submit" className="login-submit-button">
                <LogIn size={19} />
                Masuk 
              </button>
            </form>

            <div className="login-back">
              <Link to="/">
                <ArrowLeft size={17} />
                Kembali ke Beranda
              </Link>
            </div>

            <div className="login-footer">
              <ShieldCheck size={15} />
              Halaman khusus administrator EcoRisk
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
