# 🛡️ Privacy & Child Safety Audit — MVP V2

## Overview
Dokumen ini merangkum hasil peninjauan (*audit*) privasi dan keamanan data anak untuk Lentera Baca MVP V2, sesuai dengan standar keselamatan aplikasi edukasi anak.

## Audit Checklist & Verification

### 1. Perlindungan Data Anak (Row Level Security)
- [x] **Tabel `child_profiles`**: Dibatasi dengan kebijakan RLS sehingga orang tua hanya bisa membuat, membaca, memperbarui, dan menghapus data anak mereka sendiri (`parent_id = auth.uid()`).
- [x] **Tabel Progres (`letter_progress`, `reading_progress`, `point_events`)**: Dibatasi dengan kebijakan RLS berlapis yang memastikan akses hanya diperbolehkan apabila anak tersebut adalah milik orang tua yang sedang *login*.
- [x] **Status**: **AMAN (VERIFIED)**.

### 2. Eksposur Data Publik (Leaderboard & Komunitas)
- [x] Tidak ada data nama asli anak atau profil anak yang dipublikasikan secara publik.
- [x] Fitur Papan Peringkat (*Leaderboard*) di `/leaderboard` saat ini menggunakan *mock data* (data palsu/anonim) dan **tidak** mengambil data poin asli dari *database* anak lain.
- [x] Nama anak (`display_name`) hanya terlihat di Dasbor Orang Tua (`/parent`).
- [x] **Status**: **AMAN (VERIFIED)**.

### 3. Iklan, Analitik Pihak Ketiga & Tautan Eksternal
- [x] Tidak ada SDK iklan (*Ads*) yang disematkan.
- [x] Tidak ada pelacakan analitik (*analytics tracker*) invasif di antarmuka belajar anak (`/letters`, `/reading`).
- [x] Tidak ada tautan eksternal (sosial media, toko, dll) yang dapat diakses dari antarmuka belajar anak yang dapat membuat anak tersesat ke luar aplikasi.
- [x] **Status**: **AMAN (VERIFIED)**.

### 4. Kebijakan Privasi Orang Tua
- [x] Aplikasi menghormati *Data Minimization* (Hanya meminta nama panggilan dan usia opsional).
- [ ] *Action Item*: Menambahkan tautan "Kebijakan Privasi" di halaman *footer* atau dasbor orang tua saat rilis *production*.

## Kesimpulan
Lentera Baca V2 **LAYAK** dan **AMAN** secara teknis untuk dirilis kepada pengguna dari segi keamanan privasi data anak. Seluruh kebijakan RLS di tingkat PostgreSQL (Supabase) telah diimplementasikan dengan benar.
