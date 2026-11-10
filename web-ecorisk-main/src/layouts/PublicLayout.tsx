
import { Outlet, Link } from 'react-router-dom'
import { Leaf, LogIn } from 'lucide-react'

export default function PublicLayout() {
  return (
    <div className="public-shell">
      <header className="public-nav wrap">
        <a className="brand" href="/" aria-label="EcoRisk beranda">
          <span className="brand-mark">
            <Leaf size={21} />
          </span>
          <span>
            eco<span className="brand-bold">risk</span>
            <small>ENVIRONMENTAL WATCH</small>
          </span>
        </a>

        <nav className="public-links">
          <a href="#tentang">Tentang</a>
          <a href="#cara-kerja">Cara Kerja</a>
          <a href="#fitur">Fitur</a>
        </nav>

        <div className="public-nav-actions">
          <Link to="/login" className="nav-login">
            <LogIn size={16} />
            Login
          </Link>

          <a className="button button-dark nav-cta" href="/download">
            Unduh Aplikasi <span>↗</span>
          </a>
        </div>
      </header>

      <Outlet />

      <footer className="public-footer wrap">
        <a className="brand" href="/">
          <span className="brand-mark">
            <Leaf size={19} />
          </span>
          <span>
            eco<span className="brand-bold">risk</span>
            <small>ENVIRONMENTAL WATCH</small>
          </span>
        </a>
        <span>Menjaga lingkungan dimulai dari kepedulian.</span>
        <span>© 2026 EcoRisk</span>
      </footer>
    </div>
  )
}
