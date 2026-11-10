
import { useState } from 'react'
import {
  UserRound,
  Camera,
  Pencil,
  LockKeyhole,
  Eye,
  EyeOff,
  LogOut,
  Sun,
  Moon,
  Globe,
  Save,
  X,
  ShieldCheck,
} from 'lucide-react'

export default function SettingsPage() {
  const [name, setName] = useState('Admin EcoRisk')
  const [email, setEmail] = useState('admin@ecorisk.id')
  const [editing, setEditing] = useState(false)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('Indonesia')

  const [message, setMessage] = useState('')

  const handleProfileSave = () => {
    setEditing(false)
    setMessage('Perubahan profil berhasil diterapkan pada tampilan ini.')
  }

  const handlePasswordSave = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage('Semua kolom password wajib diisi.')
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage('Konfirmasi password baru tidak cocok.')
      return
    }

    setMessage('Form password sudah valid. Integrasi penyimpanan backend belum tersedia.')
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleLogout = () => {
    setMessage('Fitur logout perlu dihubungkan dengan sistem autentikasi backend.')
  }

  return (
    <div className={`settings-page ${theme === 'dark' ? 'settings-dark' : ''}`}>
      <div className="dash-page-heading">
        <div>
          <span className="dash-eyebrow">PREFERENSI WORKSPACE</span>
          <h1>Pengaturan</h1>
          <p>Kelola profil, keamanan akun, dan preferensi aplikasi EcoRisk.</p>
        </div>
      </div>

      {message && (
        <div className="settings-message">
          <ShieldCheck size={17} />
          <span>{message}</span>
          <button onClick={() => setMessage('')} aria-label="Tutup pesan">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Profil Admin */}
      <section className="settings-card">
        <div className="settings-card-heading">
          <div className="settings-heading-icon">
            <UserRound size={19} />
          </div>
          <div>
            <h2>Profil Admin</h2>
            <p>Informasi akun administrator EcoRisk.</p>
          </div>
        </div>

        <div className="settings-profile">
          <div className="settings-avatar">
            <UserRound size={34} />
            <button
              className="settings-camera"
              aria-label="Ubah foto profil"
              onClick={() => setMessage('Fitur unggah foto profil belum dihubungkan.')}
            >
              <Camera size={14} />
            </button>
          </div>

          <div className="settings-profile-info">
            <h3>{name}</h3>
            <p>{email}</p>
            <span className="settings-role">Administrator</span>
          </div>

          {!editing && (
            <button
              className="button button-light settings-edit-button"
              onClick={() => setEditing(true)}
            >
              <Pencil size={15} />
              Edit Profil
            </button>
          )}
        </div>

        {editing && (
          <div className="settings-form">
            <div className="settings-field">
              <label>Nama Admin</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama admin"
              />
            </div>

            <div className="settings-field">
              <label>Email Admin</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email admin"
              />
            </div>

            <div className="settings-form-actions">
              <button
                className="button button-light"
                onClick={() => setEditing(false)}
              >
                Batal
              </button>
              <button
                className="button button-dark"
                onClick={handleProfileSave}
              >
                <Save size={15} />
                Simpan Profil
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Keamanan Akun */}
      <section className="settings-card">
        <div className="settings-card-heading">
          <div className="settings-heading-icon">
            <LockKeyhole size={19} />
          </div>
          <div>
            <h2>Keamanan Akun</h2>
            <p>Perbarui password untuk menjaga keamanan akun.</p>
          </div>
        </div>

        <div className="settings-form settings-security-form">
          <div className="settings-field">
            <label>Password Lama</label>
            <div className="settings-password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Masukkan password lama"
              />
              <button onClick={() => setShowPassword(!showPassword)} type="button">
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <div className="settings-field">
            <label>Password Baru</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Masukkan password baru"
            />
          </div>

          <div className="settings-field">
            <label>Konfirmasi Password Baru</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi password baru"
            />
          </div>

          <div className="settings-form-actions">
            <button className="button button-dark" onClick={handlePasswordSave}>
              <Save size={15} />
              Simpan Password
            </button>
          </div>
        </div>

        <div className="settings-logout">
          <div>
            <h3>Keluar dari Akun</h3>
            <p>Akhiri sesi penggunaan akun administrator.</p>
          </div>
          <button className="button settings-logout-button" onClick={handleLogout}>
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </section>

      {/* Preferensi Aplikasi */}
      <section className="settings-card">
        <div className="settings-card-heading">
          <div className="settings-heading-icon">
            <Globe size={19} />
          </div>
          <div>
            <h2>Preferensi Aplikasi</h2>
            <p>Atur tampilan dan bahasa aplikasi sesuai kebutuhan.</p>
          </div>
        </div>

        <div className="settings-preference">
          <div className="settings-preference-info">
            <div className="settings-preference-icon">
              {theme === 'light' ? <Sun size={19} /> : <Moon size={19} />}
            </div>
            <div>
              <h3>Tema Tampilan</h3>
              <p>Pilih tampilan terang atau gelap.</p>
            </div>
          </div>

          <div className="settings-theme-options">
            <button
              className={theme === 'light' ? 'selected' : ''}
              onClick={() => setTheme('light')}
            >
              <Sun size={15} />
              Terang
            </button>
            <button
              className={theme === 'dark' ? 'selected' : ''}
              onClick={() => setTheme('dark')}
            >
              <Moon size={15} />
              Gelap
            </button>
          </div>
        </div>

        <div className="settings-preference">
          <div className="settings-preference-info">
            <div className="settings-preference-icon">
              <Globe size={19} />
            </div>
            <div>
              <h3>Bahasa Aplikasi</h3>
              <p>Pilih bahasa yang ingin digunakan.</p>
            </div>
          </div>

          <select
            className="settings-language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="Indonesia">Indonesia</option>
            <option value="English">English</option>
          </select>
        </div>
      </section>
    </div>
  )
}
