# AI Agent Guidelines (Do's & Don'ts)

Dokumen ini berisi panduan dan aturan ketat bagi AI Coding Assistant (seperti Antigravity, Claude, Cursor, Copilot) yang berkontribusi dalam pengembangan aplikasi **Lentera Baca**. 

Tujuan dari panduan ini adalah untuk mencegah *context loss*, halusinasi, dan memastikan kualitas serta konsistensi produk, khususnya karena ini adalah aplikasi edukasi anak.

## 1. Aturan Pencegahan Halusinasi (Anti-Hallucination)
- **Wajib Verifikasi Dokumentasi Lokal**: Sebelum menggunakan fitur atau API dari framework, **selalu periksa** `node_modules/next/dist/docs/` (jika tersedia) dan kode asli di dalam repositori. Jangan bergantung sepenuhnya pada data pelatihan eksternal, karena Next.js dan ekosistem terkait sering mengalami *breaking changes*.
- **Dilarang Menebak (No Guessing)**: Jangan menebak nama variabel, path direktori, nama komponen, atau rute API. Gunakan *search tools* (seperti `grep_search`) untuk memastikan eksistensi dan lokasi pasti sebelum menggunakannya.
- **Baca Konteks Secara Menyeluruh**: Jika diminta untuk memodifikasi sebuah file, baca dan pahami keseluruhan file atau *dependencies* utamanya sebelum melakukan *replace/edit*.

## 2. Prinsip Produk & Edukasi Anak (Product Principles)
Lentera Baca adalah aplikasi edukasi membaca untuk anak-anak, dengan perhatian khusus pada mereka yang rentan disleksia.
- **Ramah Anak & Disleksia**: Gunakan *font* yang disarankan (misalnya OpenDyslexic atau Comic Sans jika diinstruksikan), kontras warna yang nyaman (tidak terlalu menyilaukan), dan elemen UI yang cukup besar untuk disentuh.
- **Nada Suportif (Supportive Tone)**: Aplikasi tidak boleh memiliki pesan atau nada *shaming* (menyalahkan) seperti "Kamu gagal", "Salah!", atau icon silang merah besar yang mengintimidasi. Gunakan pesan seperti "Yuk, coba lagi!", "Hampir benar!", dan berikan *reward* visual/audio.
- **Aturan Bahasa**: 
  - **User Interface (UI) & Teks Aplikasi**: Wajib menggunakan **Bahasa Indonesia** yang baik, benar, dan mudah dipahami oleh anak.
  - **Kode, Variabel, Komentar Kode, & Pesan Commit**: Wajib menggunakan **Bahasa Inggris** (standar industri perangkat lunak).

## 3. Prosedur Penanganan Error (Error Handling)
- **Dilarang Menutup Error (No Swallowing Errors)**: Dilarang keras menggunakan blok `try/catch` kosong (`catch (e) {}`). Semua error harus dicatat (minimal via `console.error`) dan diproses dengan tepat (misal, menampilkan notifikasi *fallback* ke UI).
- **Hindari Dummy Data Berlebih**: Jangan men-silence error API dengan me-return *dummy data* permanen ke UI kecuali sedang dalam *mocking phase* yang disepakati secara eksplisit.
- **Graceful Degradation**: Tangani *offline mode* dan kegagalan jaringan secara elegan (merujuk ke offline-first strategy).

## 4. Do's & Don'ts Ringkasan
### ✅ Do's
- Buat komponen sekecil dan se- *reusable* mungkin.
- Selalu pertimbangkan performa aplikasi dan optimisasi gambar/aset.
- Bertanya untuk klarifikasi jika *user prompt* ambigu.
- Ikuti standar *Conventional Commits*.

### ❌ Don'ts
- Men-generate kode dalam blok yang sangat panjang tanpa penjelasan.
- Menghapus komentar yang sudah ada kecuali memang sudah kadaluarsa.
- Menulis *hardcode secret keys* di dalam source code.
- Mengubah konfigurasi utama (`next.config.js`, `tailwind.config.ts`, dll.) tanpa izin eksplisit pengguna.

## 5. Checklist Sebelum Menyelesaikan Tugas
Sebelum menyatakan sebuah tugas selesai, AI Agent wajib mengeksekusi (atau merekomendasikan pengguna mengeksekusi) dua perintah berikut untuk memvalidasi integritas kode:
1. `npm run lint` - Pastikan tidak ada peringatan atau error *linter*.
2. `npm run build` - Pastikan proyek dapat di-*build* untuk proses *production* tanpa error tipe atau kompilasi.
