# Lentera Baca - Dokumentasi Teknis

Selamat datang di direktori `docs/` dari proyek **Lentera Baca**. 

Direktori ini berfungsi sebagai sumber kebenaran tunggal (*Single Source of Truth*) untuk semua aturan pengembangan, arsitektur infrastruktur, dan panduan bagi tim manusia maupun AI Agent yang bekerja dalam proyek ini. 

Pastikan Anda telah membaca dan memahami dokumen-dokumen di bawah ini sebelum mulai berkontribusi.

## 📑 Daftar Isi

### 1. [AI Agent Guidelines (Do's & Don'ts)](./AI_AGENT_GUIDELINES.md)
Dokumen **Wajib Baca** untuk setiap agen AI (Antigravity, Claude, Cursor, dll.) maupun *prompt engineer*. Berisi aturan ketat pencegahan halusinasi, batasan apa yang boleh dan tidak boleh dilakukan, cara menangani error, serta prinsip produk ramah anak.

### 2. [GitFlow & Conventions](./GITFLOW_AND_CONVENTIONS.md)
Panduan alur kerja (*workflow*) kolaboratif menggunakan Git. Menjelaskan struktur *branch* (`master`, `dev`, dsb.), standar *Conventional Commits*, dan prosedur pembuatan *Pull Request*.

### 3. [Infrastructure & CI/CD](./INFRASTRUCTURE_AND_CICD.md)
Merangkum infrastruktur lokal menggunakan Docker, integrasi arsitektur Supabase (termasuk RLS dan Migrations), pengelolaan variabel *environment*, dan *pipeline continuous integration & deployment* (CI/CD).

### 4. [Folder Structure & Architecture](./FOLDER_STRUCTURE_AND_ARCHITECTURE.md)
Menjelaskan arsitektur direktori kode dalam framework Next.js (App Router). Panduan ini mencakup aturan kapan menggunakan komponen Server vs Klien, arsitektur *offline-first* (sinkronisasi lokal ke Supabase), dan standarisasi manajemen aset visual/audio.

---
> **Catatan**: Jika Anda mengupdate atau menambahkan infrastruktur atau standar koding baru, harap perbarui dokumen yang relevan di folder ini.
