# EcoRisk Web

Frontend awal EcoRisk: landing page publik dan kerangka dashboard admin, dibuat dengan React, Vite, TypeScript, Tailwind CSS v4, React Router, dan Lucide React.

## Halaman saat ini

- `/` — landing page publik EcoRisk
- `/download` — halaman/anchor informasi unduhan (tautan unduhan belum aktif karena aplikasi belum dirilis)
- `/dashboard` — ringkasan dashboard admin dengan data mock
- `/reports` — daftar laporan, pencarian, dan filter status

## Menjalankan proyek

Pastikan Node.js versi LTS dan npm sudah terpasang, lalu jalankan dari folder proyek:

```bash
npm install
npm run dev
```

Vite akan menampilkan alamat lokal di terminal (biasanya `http://localhost:5173`).

Untuk memeriksa build produksi:

```bash
npm run build
npm run preview
```

## Konfigurasi API nanti

Salin `.env.example` menjadi `.env.local`, lalu sesuaikan URL API ketika backend NestJS sudah disepakati. Saat ini halaman dashboard memakai data mock; belum ada autentikasi, API backend, database, atau layanan AI yang terhubung.

## Catatan

- Statistik dan laporan pada dashboard adalah data contoh untuk prototipe, bukan data lingkungan nyata.
- Hasil analisis AI harus diperlakukan sebagai indikasi awal, bukan keputusan hukum.
- Gambar hero menggunakan URL Unsplash dan font menggunakan Google Fonts, sehingga membutuhkan koneksi internet untuk memuat aset tersebut.
