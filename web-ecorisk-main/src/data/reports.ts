export type ReportStatus = 'Perlu ditinjau' | 'Dalam verifikasi' | 'Terverifikasi' | 'Selesai'
export type EnvironmentalReport = { id: string; title: string; location: string; category: string; date: string; status: ReportStatus; risk: 'Tinggi' | 'Sedang' | 'Rendah'; initials: string; color: string }
export const reports: EnvironmentalReport[] = [
  { id:'ER-0261', title:'Dugaan pembukaan lahan di area perbukitan', location:'Desa Guci, Kab. Tegal', category:'Perubahan lahan', date:'27 Okt 2026, 09.42', status:'Perlu ditinjau', risk:'Tinggi', initials:'GL', color:'mint' },
  { id:'ER-0260', title:'Aliran sungai berubah warna setelah hujan', location:'Kec. Bumijawa, Kab. Tegal', category:'Pencemaran air', date:'27 Okt 2026, 08.16', status:'Dalam verifikasi', risk:'Tinggi', initials:'SA', color:'blue' },
  { id:'ER-0259', title:'Aktivitas alat berat dekat kawasan hutan', location:'Lebaksiu, Kab. Tegal', category:'Dugaan pertambangan', date:'26 Okt 2026, 16.50', status:'Dalam verifikasi', risk:'Sedang', initials:'RH', color:'sand' },
  { id:'ER-0258', title:'Tumpukan sampah di saluran irigasi', location:'Kec. Adiwerna, Kab. Tegal', category:'Sampah & limbah', date:'26 Okt 2026, 14.22', status:'Terverifikasi', risk:'Sedang', initials:'DP', color:'pink' },
  { id:'ER-0257', title:'Indikasi longsoran tanah di lereng', location:'Kec. Bojong, Kab. Tegal', category:'Kerusakan tanah', date:'25 Okt 2026, 11.05', status:'Selesai', risk:'Rendah', initials:'MK', color:'purple' },
]
