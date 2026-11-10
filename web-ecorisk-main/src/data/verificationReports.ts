
export type VerificationStatus =
  | 'Belum ditinjau'
  | 'Sedang ditinjau'
  | 'Sudah ditinjau'

export type VerificationReport = {
  id: string
  title: string
  category: string
  location: string
  date: string
  description: string
  photo: string
  status: VerificationStatus
  reviewNote: string
}

export const verificationReports: VerificationReport[] = [
  {
    id: 'ER-0261',
    title: 'Tumpukan sampah di saluran irigasi',
    category: 'Sampah & limbah',
    location: 'Kec. Adiwerna, Kab. Tegal',
    date: '27 Okt 2026, 09.42',
    description: 'Ditemukan tumpukan sampah yang menghambat aliran air pada saluran irigasi.',
    photo: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800',
    status: 'Belum ditinjau',
    reviewNote: '',
  },
  {
    id: 'ER-0262',
    title: 'Indikasi longsoran tanah di lereng',
    category: 'Kerusakan tanah',
    location: 'Kec. Bojong, Kab. Tegal',
    date: '27 Okt 2026, 10.15',
    description: 'Terlihat pergerakan tanah dan retakan pada area lereng setelah hujan.',
    photo: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800',
    status: 'Sedang ditinjau',
    reviewNote: '',
  },
  {
    id: 'ER-0263',
    title: 'Perubahan warna aliran sungai',
    category: 'Pencemaran air',
    location: 'Kec. Bumijawa, Kab. Tegal',
    date: '26 Okt 2026, 14.20',
    description: 'Air sungai terlihat keruh dan berubah warna berdasarkan dokumentasi pelapor.',
    photo: 'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?w=800',
    status: 'Sudah ditinjau',
    reviewNote: 'Pemeriksaan awal telah dilakukan. Kondisi lokasi perlu dipantau lebih lanjut.',
  },
  {
    id: 'ER-0264',
    title: 'Dugaan pembukaan lahan',
    category: 'Perubahan lahan',
    location: 'Desa Guci, Kab. Tegal',
    date: '25 Okt 2026, 08.30',
    description: 'Terlihat area lahan terbuka di sekitar kawasan perbukitan.',
    photo: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800',
    status: 'Belum ditinjau',
    reviewNote: '',
  },
]
