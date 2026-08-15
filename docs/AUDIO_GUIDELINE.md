# Panduan Perekaman & Aset Audio Lentera Baca

Dokumen ini adalah panduan resmi (*source of truth*) untuk proses rekaman suara (Voice Over) pada materi edukasi anak di aplikasi **Lentera Baca**. 

Tujuan dari panduan ini adalah memastikan semua aset suara yang diproduksi memiliki kualitas yang stabil, ukuran yang efisien, dan gaya bicara yang konsisten (suportif dan ramah anak).

---

## 1. Standar Teknis Rekaman

Setiap file audio yang diserahkan atau direkam harus mematuhi spesifikasi berikut:

- **Format File**: `.mp3` (Untuk memastikan kompatibilitas terbaik dengan berbagai web browser, desktop, maupun mobile).
- **Sample Rate**: `44.1 kHz` (CD Quality).
- **Channel**: `Mono` (Audio edukasi tidak membutuhkan stereo panning, file mono akan memangkas ukuran aset hingga 50%).
- **Bitrate**: `128 kbps` Constant Bitrate (CBR).
- **Loudness Normalization**: `-14 LUFS` (Standar modern agar volume antar rekaman tidak melonjak tiba-tiba atau terlalu kecil).
- **Noise Floor**: Maksimal `-60 dB` (Pastikan direkam di ruangan yang sunyi tanpa suara desis/kipas/lalu lintas).

---

## 2. Panduan Intonasi & Gaya Bicara (Voice Direction)

Aplikasi Lentera Baca ditujukan untuk balita dan anak-anak yang baru belajar membaca. Pengisi suara (VO Talent) diwajibkan:

- **Bicara Lebih Lambat dari Biasa**: Kurangi tempo bicara sekitar 15-20% dari gaya bicara normal, namun hindari nada yang terdengar seperti robot.
- **Tegas dan Jelas (Artikulasi)**: Ucapkan setiap vokal (A, I, U, E, O) dan konsonan dengan bulat.
- **Ceria & Suportif**: Gunakan *smile voice* (berbicara sambil tersenyum). Suara harus terdengar ramah, hangat, dan memberikan semangat (terutama pada file SFX/pujian).
- **Jeda Pengejaan Suku Kata**: Jika naskah meminta pengejaan, berikan jeda ±0.5 detik di antara setiap suku kata agar anak dapat mencerna potongan kata tersebut dengan baik.

---

## 3. Standar Penamaan File & Direktori (Asset Pipeline)

Seluruh file audio harus diletakkan dalam direktori `public/audio/`. Format penamaan menggunakan bahasa Inggris tanpa spasi.

### Struktur Direktori:
```text
public/audio/
├── letters/     # Aset suara huruf (contoh: A.mp3, B.mp3)
├── reading/     # Aset latihan membaca (contoh: reading-1.mp3)
└── sfx/         # Aset sound effect UI/Feedback (contoh: correct.mp3)
```

---

## 4. Naskah Rekaman Lengkap (Recording Script)

Berikut adalah daftar lengkap naskah yang harus direkam untuk MVP V2.

### A. Pengenalan Huruf (Folder: `letters/`)
**Target Gaya**: Ucapkan nama huruf, beri jeda sedikit, lalu ucapkan ejaan suku kata beserta kata utuhnya secara natural.
*Contoh rekaman:* "A... A - pe - l... Apel."

| Nama File | Naskah yang Dibaca |
|---|---|
| `A.mp3` | "A. A - pe - l. Apel." |
| `B.mp3` | "B. Be - bek. Bebek." |
| `C.mp3` | "C. Ce - ri. Ceri." |
| `D.mp3` | "D. Da - du. Dadu." |
| `E.mp3` | "E. E - lang. Elang." |
| `F.mp3` | "F. Fo - to. Foto." |
| `G.mp3` | "G. Ga - jah. Gajah." |
| `H.mp3` | "H. Hu - jan. Hujan." |
| `I.mp3` | "I. I - kan. Ikan." |
| `J.mp3` | "J. Je - ruk. Jeruk." |
| `K.mp3` | "K. Ke - lin - ci. Kelinci." |
| `L.mp3` | "L. Li - lin. Lilin." |
| `M.mp3` | "M. Mang - ga. Mangga." |
| `N.mp3` | "N. Na - nas. Nanas." |
| `O.mp3` | "O. O - bor. Obor." |
| `P.mp3` | "P. Pe - sa - wat. Pesawat." |
| `Q.mp3` | "Q. Qa - ri. Qari." |
| `R.mp3` | "R. Ro - ti. Roti." |
| `S.mp3` | "S. Sa - pi. Sapi." |
| `T.mp3` | "T. To - pi. Topi." |
| `U.mp3` | "U. U - lar. Ular." |
| `V.mp3` | "V. Vas. Vas." |
| `W.mp3` | "W. Wor - tel. Wortel." |
| `X.mp3` | "X. Xi - lo - fon. Xilofon." |
| `Y.mp3` | "Y. Yo - yo. Yoyo." |
| `Z.mp3` | "Z. Ze - bra. Zebra." |

### B. Latihan Membaca (Folder: `reading/`)
**Target Gaya**: Intonasi membaca bercerita (story-telling). Lebih hidup dari sekadar membaca datar.

| Nama File | Naskah yang Dibaca |
|---|---|
| `reading-1.mp3` | "Ini bola." |
| `reading-2.mp3` | "Itu apel." |
| `reading-3.mp3` | "Ini buku." |
| `reading-4.mp3` | "Itu ikan." |
| `reading-5.mp3` | "Ini topi." |

### C. Respons & Feedback (Folder: `sfx/`)
**Target Gaya**: Sangat ceria, menyemangati, antusias.

| Nama File | Naskah yang Dibaca |
|---|---|
| `correct.mp3` | "Hebat! Jawabanmu benar." |
| `incorrect.mp3` | "Belum tepat. Tidak apa-apa, ayo coba lagi pelan-pelan!" |
| `complete.mp3` | "Hore! Kamu sudah menyelesaikan semuanya. Hebat sekali!" |

---

## 5. Checklist Pengujian Kualitas (QA Checklist)

Sebelum file digabungkan ke repositori, tim QA Audio harus memverifikasi setiap file berdasarkan poin berikut:

- [ ] File berekstensi `.mp3` dengan konfigurasi *Mono* / `128kbps`.
- [ ] Ukuran file masuk akal (biasanya <100 KB untuk suara pendek).
- [ ] Tidak ada hembusan napas kasar (pops) / suara *mic bumping* di awal atau akhir rekaman.
- [ ] Terdapat keheningan (*silence*) minimal 0.2 detik di awal dan akhir audio untuk mencegah audio terpotong (cut-off) di beberapa browser.
- [ ] Rata-rata loudness terukur sekitar `-14 LUFS`.
- [ ] Nama file menggunakan *case-sensitive* yang persis sama dengan panduan (Contoh: `reading-1.mp3`, bukan `Reading-1.MP3`).
