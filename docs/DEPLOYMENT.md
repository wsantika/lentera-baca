# 🚀 Panduan Deployment Lentera Baca

Dokumen ini berisi panduan untuk melakukan *deployment* aplikasi Lentera Baca ke Vercel dan mengatur *environment* Supabase untuk ranah *Production*.

## 1. Arsitektur Deployment (GitFlow)

Proyek ini menggunakan dua *branch* utama untuk siklus *deployment*:
- **`dev` (Staging / Preview)**: Setiap perubahan fitur atau *bugfix* harus di-merger ke *branch* ini melalui *Pull Request* (PR). Vercel akan secara otomatis membuat URL *Preview* untuk setiap PR ke `dev`.
- **`master` (Production)**: Perubahan di `dev` yang sudah diuji secara menyeluruh akan di-merger ke `master`. Vercel akan otomatis me-deploy branch `master` ke domain utama (Production).

## 2. Setup Database (Supabase Cloud)

Sebelum melakukan *deployment* aplikasi, siapkan proyek Supabase Cloud:
1. Buat *Project* baru di [Supabase Dashboard](https://supabase.com/dashboard).
2. Jalankan migrasi *database* untuk membuat semua tabel, RLS, dan fungsi yang diperlukan:
   - Hubungkan *Supabase CLI* dengan proyek cloud: `npx supabase link --project-ref [ID_PROJECT_ANDA]`
   - Terapkan migrasi ke *production*: `npx supabase db push`
3. Konfigurasi autentikasi:
   - Aktifkan provider **Google OAuth** di Supabase `Authentication > Providers`.
   - Tambahkan *Client ID* dan *Client Secret* dari Google Cloud Console.
   - Tambahkan *Redirect URL* produksi (contoh: `https://lenterabaca.com/auth/callback`) ke daftar *URL Configuration* di Supabase.

## 3. Setup Vercel (Next.js App)

1. Masuk ke [Vercel Dashboard](https://vercel.com/dashboard) dan klik **Add New Project**.
2. *Import* repository GitHub `wsantika/lentera-baca`.
3. Biarkan **Framework Preset** tetap pada **Next.js**.
4. Buka bagian **Environment Variables** dan tambahkan *keys* berikut (ambil dari dashboard Supabase Cloud Anda di bagian *Project Settings > API*):
   - `NEXT_PUBLIC_SUPABASE_URL`: (Kunci Publik URL Supabase Cloud)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Kunci Publik ANON API Key Supabase)
5. Klik **Deploy**.

## 4. Konfigurasi Branch Produksi di Vercel

Secara default, Vercel mungkin akan mengatur *Production Branch* berdasarkan *default branch* di GitHub. Pastikan Vercel merujuk ke branch yang benar:
1. Pergi ke Vercel Dashboard proyek Lentera Baca Anda.
2. Buka tab **Settings** > **Git**.
3. Pastikan **Production Branch** diatur ke `master`.

## 5. Verifikasi Deployment

Setelah Vercel menyelesaikan *build* awal, pastikan beberapa hal berikut berfungsi di URL Production:
- [ ] Registrasi & Login (Google OAuth) dapat digunakan.
- [ ] Pengguna (Orang Tua) dapat menambahkan profil anak.
- [ ] Halaman dasbor progres orang tua merender data anak.
- [ ] Komponen suara huruf/membaca dapat diputar (uji coba fitur statis).
- [ ] Halaman Papan Peringkat statis (*Mock Data*) merender dengan normal.

## Selesai! 🎉
Aplikasi sekarang ter-deploy sepenuhnya. Setiap *Push* ke branch `master` akan otomatis diperbarui di situs pengguna secara *zero-downtime*.
