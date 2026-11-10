import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Activity,
  Bell,
  ChevronDown,
  ClipboardList,
  LayoutDashboard,
  Leaf,
  MapPinned,
  Menu,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = (
    <>
      <div className="side-section-label">WORKSPACE</div>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => `side-link ${isActive ? "active" : ""}`}
        onClick={() => setMobileOpen(false)}
      >
        <LayoutDashboard size={18} /> Dashboard
      </NavLink>
      <NavLink
        to="/reports"
        className={({ isActive }) => `side-link ${isActive ? "active" : ""}`}
        onClick={() => setMobileOpen(false)}
      >
        <ClipboardList size={18} /> Laporan Lingkungan{" "}
        <span className="side-count">12</span>
      </NavLink>
      <NavLink
        to="/risk-map"
        className={({ isActive }) => `side-link ${isActive ? "active" : ""}`}
        onClick={() => setMobileOpen(false)}
      >
        <MapPinned size={18} /> Peta Risiko
      </NavLink>
      <NavLink
        to="/verification"
        className={({ isActive }) => `side-link ${isActive ? "active" : ""}`}
        onClick={() => setMobileOpen(false)}
      >
        <ShieldCheck size={18} /> Verifikasi <span className="side-dot" />
      </NavLink>
      <NavLink
        to="/analysis"
        className={({ isActive }) => `side-link ${isActive ? "active" : ""}`}
        onClick={() => setMobileOpen(false)}
      >
        <Activity size={18} /> Analisis AI
      </NavLink>
      <div className="side-section-label side-bottom-label">PREFERENSI</div>
      <NavLink
        to="/settings"
        className={({ isActive }) => `side-link ${isActive ? "active" : ""}`}
        onClick={() => setMobileOpen(false)}
      >
        <SlidersHorizontal size={18} /> Pengaturan
      </NavLink>
    </>
  );
  return (
    <div className="dashboard-shell">
      {mobileOpen && (
        <button
          className="mobile-scrim"
          aria-label="Tutup menu"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <a className="brand sidebar-brand" href="/">
          <span className="brand-mark">
            <Leaf size={21} />
          </span>
          <span>
            eco<span className="brand-bold">risk</span>
            <small>ENVIRONMENTAL WATCH</small>
          </span>
          <button
            className="icon-button sidebar-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Tutup menu"
          >
            <X size={18} />
          </button>
        </a>
        <div className="workspace-pill">
          <span className="workspace-avatar">ER</span>
          <span>
            <b>EcoRisk Workspace</b>
            <small>Environmental team</small>
          </span>
          <ChevronDown size={15} />
        </div>
        <nav className="side-nav">{nav}</nav>
        <div className="sidebar-help">
          <span className="help-icon">
            <Leaf size={18} />
          </span>
          <b>Jaga bumi bersama.</b>
          <p>Setiap laporan adalah langkah kecil menuju perubahan.</p>
          <a href="/">
            Lihat website publik <span>↗</span>
          </a>
        </div>
        <div className="sidebar-user">
          <div className="user-avatar">AF</div>
          <span>
            <b>Admin EcoRisk</b>
            <small>Administrator</small>
          </span>
          <ChevronDown size={16} />
        </div>
      </aside>
      <div className="dashboard-main">
        <header className="dash-topbar">
          <button
            className="icon-button mobile-menu"
            onClick={() => setMobileOpen(true)}
            aria-label="Buka menu"
          >
            <Menu size={20} />
          </button>
          <div className="breadcrumbs">
            Workspace <span>/</span> <b>Dashboard</b>
          </div>
          <div className="topbar-actions">
            <button className="search-trigger">
              <Search size={16} />
              <span>Cari laporan...</span>
              <kbd>⌘ K</kbd>
            </button>
            <button
              className="icon-button notification-button"
              aria-label="Notifikasi"
            >
              <Bell size={19} />
              <i />
            </button>
            <div className="topbar-divider" />
            <div className="mini-profile">AF</div>
          </div>
        </header>
        <main className="dash-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
