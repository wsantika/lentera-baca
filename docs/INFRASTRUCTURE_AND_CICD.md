# Infrastructure & CI/CD

Dokumen ini merangkum arsitektur infrastruktur, manajemen *environment*, dan proses otomatisasi (*CI/CD*) untuk proyek **Lentera Baca**.

## 1. Local Dev Infrastructure via Docker

Untuk memastikan lingkungan pengembangan yang konsisten, proyek ini mendukung kontainerisasi menggunakan **Docker**.

- **`Dockerfile`**: Mendefinisikan spesifikasi *image* untuk aplikasi Next.js. Berisi instruksi instalasi dependensi, optimasi untuk *production build*, dan cara menjalankan server web.
- **`docker-compose.yml`**: Orkestrasi lokal. Biasanya mengonfigurasi aplikasi Next.js berjalan berdampingan dengan layanan (*services*) pendukung lainnya jika ada (misal: database lokal sementara, Redis, atau instance Supabase lokal).

**Cara menjalankan dengan Docker (Lokal):**
```bash
docker-compose up -d --build
```

## 2. Arsitektur Supabase

Lentera Baca memanfaatkan Supabase untuk Backend-as-a-Service (Autentikasi, Database, Storage).

- **Supabase Lokal vs Cloud**: 
  - Untuk pengembangan lokal (opsional namun disarankan), pengembang dapat menggunakan Supabase CLI (`npx supabase start`) untuk memutar instance Supabase secara lokal (via Docker).
  - Untuk lingkungan *staging* dan *production*, aplikasi akan terhubung ke Supabase Cloud.
- **Row Level Security (RLS) Policies**: Semua tabel wajib mengaktifkan RLS. Data anak (skor, progres) hanya boleh dibaca dan ditulis oleh *User ID* (*Auth/Session*) yang bersangkutan. 
- **Manajemen Skema**: Skema database dan fungsi (Stored Procedures) harus didefinisikan menggunakan *Supabase Migrations*. Dilarang memanipulasi struktur tabel *production* secara manual via UI tanpa file migrasi.

## 3. Manajemen Environment

Kita mengikuti prinsip 12-Factor App dalam menangani konfigurasi environment.

- **`.env.example`**: Menyimpan **templat** struktur variabel *environment*. Semua key yang dibutuhkan aplikasi harus terdaftar di sini tanpa value/secret yang sesungguhnya. **File ini di-commit ke Git.**
- **`.env.local`**: File konfigurasi environment untuk lokal yang berisi rahasia (*secrets*) atau koneksi ke Supabase (URL, Anon Key). **File ini WAJIB masuk dalam `.gitignore`.**
- **Variabel Produksi**: Diatur melalui *Dashboard Host* (misalnya Vercel Environment Variables atau GitHub Secrets).
- **Aturan Pencegahan Kebocoran**: Jangan pernah menaruh nilai kredensial langsung ke `.env.example` atau men-commit `.env`, `.env.local`, `.env.development`, dll.

## 4. Pipeline CI/CD

Sistem *Continuous Integration* & *Continuous Deployment* dijalankan (secara konsep) menggunakan **GitHub Actions** dan/atau **Vercel**.

**Workflow Utama:**
1. **Pull Request Validation (on PR to `dev` or `master`)**
   - **Lint & Type Check**: Otomatis menjalankan `npm run lint` dan *Typescript Compiler check* (`tsc --noEmit`).
   - **Automated Tests**: Menjalankan *unit/integration test* (misal: Jest / Vitest / Playwright).
   - *Pipeline* harus berstatus hijau (*Passed*) sebelum PR dapat di-*merge*.

2. **Preview Deployments (Vercel)**
   - Saat PR dibuka, Vercel secara otomatis membangun aplikasi dan memberikan URL *Preview* khusus untuk PR tersebut.
   - Digunakan oleh QA atau PM untuk menguji fitur sebelum digabung.

3. **Master Release (Production)**
   - Saat perubahan di-*merge* ke `master`, sistem (seperti Vercel) secara otomatis akan men-deploy *build* terbaru ke domain produksi.
