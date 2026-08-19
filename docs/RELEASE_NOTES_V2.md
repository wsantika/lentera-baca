# 🌟 Lentera Baca MVP V2 - Release Notes

Selamat datang di perilisan resmi **Lentera Baca V2**! Versi ini membawa fondasi baru yang lebih tangguh, interaktif, dan berfokus pada pengalaman belajar anak usia dini dengan pengawasan penuh orang tua.

## ✨ Fitur Baru (New Features)

- **Dasbor Orang Tua (Parent Dashboard)**: Manajemen data anak, pantauan progres belajar huruf dan membaca, serta integrasi statistik poin.
- **Sistem Autentikasi**: Login aman menggunakan Supabase Auth (Google OAuth).
- **Profil Anak Multi-Akun**: Satu akun orang tua dapat menampung banyak profil anak dengan konfigurasi unik.
- **Sinkronisasi Cloud**: Progres belajar anak (huruf yang diselesaikan, skor membaca, dan poin) sekarang tersimpan dengan aman di basis data awan (*cloud database*), sehingga progres tidak hilang meski berganti perangkat.
- **Tingkat Kesulitan Kuis (Learning Levels)**: Dukungan modul membaca berdasarkan tingkat kesulitan (*easy* / *medium*).
- **Aset Visual Spesifik Lokal (Curated Visuals)**: Penggunaan ilustrasi budaya dan objek lokal (seperti Angklung, Batik, dsb) untuk mempermudah korelasi belajar anak Indonesia.
- **Suara Pendamping Asli (Curated Audio System)**: Pengucapan kata dan huruf menggunakan intonasi natural bahasa Indonesia.

## 🛠 Peningkatan & Perbaikan (Improvements & Fixes)

- **Aksesibilitas (Accessibility)**: Opsi kontras tinggi dan ukuran huruf besar yang dipertahankan melalui sistem.
- **Keamanan Privasi (Row Level Security)**: Data setiap anak dikunci super-ketat dengan RLS Supabase sehingga tidak ada data yang bisa bocor ke orang tua/pengguna lain.
- **Automated Testing & CI/CD**: Terintegrasi penuh dengan Vitest dan GitHub Actions untuk memastikan tidak ada kesalahan fatal dalam alur belajar utama anak.
- **Perbaikan Sinkronisasi Offline-to-Cloud**: Resolusi konflik penyimpanan lokal yang sekarang langsung terhubung ke *endpoint* Supabase.

## 🎯 Fokus Pengembangan Selanjutnya (V3)
- Tantangan gamifikasi dengan papan peringkat (*leaderboard*) berbasis kelompok belajar tertutup.
- Aplikasi Progressive Web App (PWA) sepenuhnya dengan mode luring (*offline*) jangka panjang.

---
*Terima kasih atas masukannya selama proses pengembangan V2! Mari cerdaskan anak bangsa bersama Lentera Baca.* 🚀
