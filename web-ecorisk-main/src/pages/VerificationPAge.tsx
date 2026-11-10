
import { useMemo, useState } from 'react'
import {
  Search,
  MapPin,
  CalendarDays,
  Eye,
  ClipboardCheck,
  X,
  Image as ImageIcon,
  Save,
} from 'lucide-react'

import {
  verificationReports as initialReports,
  type VerificationReport,
  type VerificationStatus,
} from '../data/verificationReports'

export default function VerificationPage() {
  const [reports, setReports] = useState<VerificationReport[]>(initialReports)
  const [query, setQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('Semua status')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const [editStatus, setEditStatus] =
    useState<VerificationStatus>('Belum ditinjau')
  const [reviewNote, setReviewNote] = useState('')

  // Menghitung jumlah laporan berdasarkan status
  const totalBelum = reports.filter(
    (r) => r.status === 'Belum ditinjau',
  ).length

  const totalProses = reports.filter(
    (r) => r.status === 'Sedang ditinjau',
  ).length

  const totalSelesai = reports.filter(
    (r) => r.status === 'Sudah ditinjau',
  ).length

  // Pencarian dan filter laporan
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const keyword = query.toLowerCase()

      const matchesSearch =
        r.title.toLowerCase().includes(keyword) ||
        r.id.toLowerCase().includes(keyword) ||
        r.location.toLowerCase().includes(keyword)

      const matchesStatus =
        filterStatus === 'Semua status' ||
        r.status === filterStatus

      return matchesSearch && matchesStatus
    })
  }, [reports, query, filterStatus])

  // Mengambil laporan yang sedang dibuka
  const selectedReport = reports.find(
    (r) => r.id === selectedId,
  )

  // Membuka detail laporan
  const openDetail = (report: VerificationReport) => {
    setSelectedId(report.id)
    setEditStatus(report.status)
    setReviewNote(report.reviewNote)
  }

  // Menyimpan hasil verifikasi dummy
  const handleSaveVerification = () => {
    if (!selectedReport) return

    if (
      editStatus === 'Sudah ditinjau' &&
      !reviewNote.trim()
    ) {
      alert('Isi keterangan hasil tinjauan terlebih dahulu.')
      return
    }

    setReports((currentReports) =>
      currentReports.map((report) =>
        report.id === selectedReport.id
          ? {
              ...report,
              status: editStatus,
              reviewNote: reviewNote.trim(),
            }
          : report,
      ),
    )

    setSelectedId(null)
    alert('Verifikasi dummy berhasil disimpan!')
  }

  // Menentukan warna status
  const getStatusClass = (status: VerificationStatus) => {
    if (status === 'Belum ditinjau') return 'verification-pending'
    if (status === 'Sedang ditinjau') return 'verification-progress'
    return 'verification-completed'
  }

  return (
    <div className="dashboard-page verification-page">

      {/* Header halaman */}
      <div className="dash-page-heading">
        <div>
          <div className="dash-eyebrow">
            WORKSPACE / VERIFIKASI
          </div>
          <h1>Verifikasi Laporan</h1>
          <p>
            Periksa bukti laporan dan lakukan verifikasi
            terhadap laporan lingkungan yang masuk.
          </p>
        </div>
      </div>

      {/* Ringkasan status */}
      <div className="verification-summary">

        <div className="verification-summary-card">
          <span className="verification-summary-icon pending">
            <ClipboardCheck size={19} />
          </span>
          <div>
            <small>Belum ditinjau</small>
            <h2>{totalBelum}</h2>
            <p>Menunggu pemeriksaan</p>
          </div>
        </div>

        <div className="verification-summary-card">
          <span className="verification-summary-icon progress">
            <Eye size={19} />
          </span>
          <div>
            <small>Sedang ditinjau</small>
            <h2>{totalProses}</h2>
            <p>Dalam proses pemeriksaan</p>
          </div>
        </div>

        <div className="verification-summary-card">
          <span className="verification-summary-icon completed">
            <ClipboardCheck size={19} />
          </span>
          <div>
            <small>Sudah ditinjau</small>
            <h2>{totalSelesai}</h2>
            <p>Pemeriksaan selesai</p>
          </div>
        </div>

      </div>

      {/* Daftar laporan */}
      <section className="panel verification-panel">

        <div className="panel-heading">
          <div>
            <h3>Daftar laporan</h3>
            <p>
              Pilih laporan untuk melihat detail dan melakukan
              verifikasi.
            </p>
          </div>
        </div>

        {/* Pencarian dan filter */}
        <div className="verification-toolbar">

          <label className="table-search">
            <Search size={17} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul, ID, atau lokasi..."
            />
          </label>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            aria-label="Filter status laporan"
          >
            <option>Semua status</option>
            <option>Belum ditinjau</option>
            <option>Sedang ditinjau</option>
            <option>Sudah ditinjau</option>
          </select>

        </div>

        {/* Tabel laporan */}
        <div className="report-table-wrap">
          <table className="report-table verification-table">
            <thead>
              <tr>
                <th>ID / JUDUL LAPORAN</th>
                <th>KATEGORI</th>
                <th>LOKASI</th>
                <th>TANGGAL</th>
                <th>STATUS</th>
                <th>AKSI</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id}>

                  <td>
                    <div className="verification-report-title">
                      <b>{report.title}</b>
                      <small>{report.id}</small>
                    </div>
                  </td>

                  <td>{report.category}</td>

                  <td className="location-cell">
                    <MapPin size={13} />
                    {report.location}
                  </td>

                  <td>{report.date}</td>

                  <td>
                    <span
                      className={`verification-status ${getStatusClass(report.status)}`}
                    >
                      {report.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="verification-detail-button"
                      onClick={() => openDetail(report)}
                    >
                      <Eye size={15} />
                      Detail
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {filteredReports.length === 0 && (
            <div className="empty-state">
              <Search size={22} />
              <b>Tidak ada laporan ditemukan</b>
              <span>
                Coba gunakan kata kunci atau status lainnya.
              </span>
            </div>
          )}
        </div>

        <div className="verification-table-footer">
          Menampilkan {filteredReports.length} dari {reports.length} laporan dummy
        </div>

      </section>

      {/* Modal detail dan verifikasi */}
      {selectedReport && (
        <div
          className="verification-modal-overlay"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="verification-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="verification-modal-header">
              <div>
                <span className="dash-eyebrow">
                  DETAIL LAPORAN / {selectedReport.id}
                </span>
                <h2>Periksa Laporan</h2>
              </div>

              <button
                className="verification-close-button"
                onClick={() => setSelectedId(null)}
                aria-label="Tutup detail"
              >
                <X size={19} />
              </button>
            </div>

            {/* Informasi laporan */}
            <div className="verification-detail-section">
              <h3>Detail laporan</h3>

              <h4>{selectedReport.title}</h4>

              <div className="verification-detail-meta">
                <span>
                  <ClipboardCheck size={14} />
                  {selectedReport.category}
                </span>

                <span>
                  <MapPin size={14} />
                  {selectedReport.location}
                </span>

                <span>
                  <CalendarDays size={14} />
                  {selectedReport.date}
                </span>
              </div>

              <p className="verification-description">
                {selectedReport.description}
              </p>
            </div>

            {/* Bukti laporan */}
            <div className="verification-detail-section">
              <h3>Bukti laporan</h3>

              <div className="verification-photo">
                <img
                  src={selectedReport.photo}
                  alt={`Bukti ${selectedReport.title}`}
                />
              </div>

              <span className="verification-photo-caption">
                <ImageIcon size={14} />
                Foto bukti laporan dummy
              </span>
            </div>

            {/* Form verifikasi */}
            <div className="verification-detail-section">
              <h3>Verifikasi laporan</h3>

              <div className="verification-form-field">
                <label>Status laporan</label>

                <select
                  value={editStatus}
                  onChange={(e) =>
                    setEditStatus(
                      e.target.value as VerificationStatus,
                    )
                  }
                >
                  <option value="Belum ditinjau">
                    Belum ditinjau
                  </option>

                  <option value="Sedang ditinjau">
                    Sedang ditinjau
                  </option>

                  <option value="Sudah ditinjau">
                    Sudah ditinjau
                  </option>
                </select>
              </div>

              <div className="verification-form-field">
                <label>
                  Keterangan hasil tinjauan
                  {editStatus === 'Sudah ditinjau' && (
                    <span className="required-mark"> *</span>
                  )}
                </label>

                <textarea
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  placeholder="Tuliskan hasil pemeriksaan laporan untuk pelapor..."
                  rows={4}
                />

                <small>
                  Keterangan ini nantinya akan ditampilkan kepada
                  pelapor melalui aplikasi Flutter.
                </small>
              </div>
            </div>

            {/* Tombol aksi */}
            <div className="verification-modal-actions">
              <button
                className="button button-light"
                onClick={() => setSelectedId(null)}
              >
                Batal
              </button>

              <button
                className="button button-dark"
                onClick={handleSaveVerification}
              >
                <Save size={15} />
                Simpan Verifikasi
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
