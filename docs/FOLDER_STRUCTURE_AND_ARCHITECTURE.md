# Folder Structure & Architecture

Aplikasi Lentera Baca dibangun menggunakan kerangka kerja **Next.js (App Router)**. Dokumentasi ini memberikan panduan tentang penempatan file, pembagian komponen, manajemen status (*state*), dan aset.

## 1. Struktur Folder Next.js App Router

Keseluruhan source code aplikasi berada dalam folder `src/`. Berikut adalah arsitektur direktori utama:

```
src/
├── app/                  # (App Router) Definisi halaman (page.tsx), layout (layout.tsx), routing
├── components/           # Kumpulan komponen React
│   ├── layout/           # Komponen struktur halaman (Header, Sidebar, Footer, Navigation)
│   ├── ui/               # Komponen UI atomik/dasar (Button, Input, Card, Modal) - sering dari UI library
│   └── [feature]/        # Komponen spesifik untuk fitur tertentu (misal: /reading, /quiz, /auth)
├── lib/                  # Fungsi utilitas murni, formatters, helpers
├── config/               # Konstanta konfigurasi, setup aplikasi, environment validasi
├── hooks/                # Custom React Hooks
├── services/             # Integrasi API luar (Supabase fetchers, REST API)
└── store/ atau context/  # Manajemen state global (Zustand, Redux, atau React Context)
```

## 2. Batas Server vs Client Component

Dalam arsitektur App Router Next.js, komponen secara *default* adalah **Server Components**. Pahami batasannya agar aplikasi tetap berkinerja tinggi.

**Kapan Wajib Menggunakan `"use client"`?**
- Jika komponen membutuhkan interaksi pengguna atau *Event Listeners* (`onClick`, `onChange`, `onSubmit`).
- Jika komponen membutuhkan *React Hooks* untuk manajemen *state* dan siklus hidup (Lifecycle) (`useState`, `useEffect`, `useReducer`).
- Jika komponen menggunakan API browser (`window`, `document`, `localStorage`).
- *Best Practice*: Tempatkan `"use client"` sejauh mungkin pada level bawah (daun/leaf) di pohon komponen. Jangan membungkus seluruh halaman (`page.tsx`) dengan `"use client"` kecuali benar-benar perlu, untuk mempertahankan SEO dan performa load awal.

## 3. Arsitektur State & Offline-First

Lentera Baca direncanakan agar tahan terhadap koneksi lambat atau *offline*.

- **Transisi State**:
  1. **Phase 1 (Lokal)**: Menggunakan `localStorage` (atau IndexedDB/Zustand persist) untuk menyimpan profil anak dan progres belajar. Hal ini memastikan aplikasi tetap responsif dan bisa digunakan tanpa internet.
  2. **Phase 2 (Cloud Sync)**: Menghubungkan *state* lokal ke **Supabase Sync**. Ketika internet tersedia, aplikasi akan melakukan *background sync* data lokal ke *cloud* (Supabase).
- **Prinsip**: UI harus selalu bereaksi terhadap *state* lokal terlebih dahulu (optimistic UI updates). Jangan blokir pengalaman belajar anak sambil menunggu respons *database cloud*.

## 4. Aset Pipeline (Media & Visual)

Aset statis diletakkan pada folder `public/`. Karena target audiens adalah anak-anak, aset audio dan visual memiliki peran krusial.

- **Audio (`/public/audio/`)**:
  - Berisi file suara instruksi, efek suara (SFX) positif (*cheers*, bel), dan pengucapan fonetik.
  - Sebaiknya dioptimasi dengan format kompresi modern yang didukung luas (contoh: `.mp3` atau `.ogg`).
- **Ilustrasi Visual (`/public/images/` atau `/public/icons/`)**:
  - Gunakan format **`.svg`** untuk ikon dan ilustrasi vektor agar tajam pada semua ukuran layar dan hemat ruang.
  - Untuk gambar raster yang kompleks, wajib dikonversi dan disimpan sebagai **`.webp`** (lebih ringan dari JPEG/PNG konvensional) untuk optimasi kecepatan *loading*.
