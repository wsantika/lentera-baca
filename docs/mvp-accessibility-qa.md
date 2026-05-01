# MVP Accessibility & Usability QA

Project: Lentera Baca  
Milestone: MVP  
Issue: #10

## Goal

Memastikan MVP Lentera Baca nyaman, mudah digunakan, dan aksesibel untuk anak usia 5-8 tahun, termasuk anak dengan disleksia.

---

## Routes Tested

- `/`
- `/letters`
- `/reading`
- `/leaderboard`
- `/profile`
- `/offline`

---

## Device Sizes

Test manual dilakukan pada ukuran:

- Mobile S: 320 x 614
- Mobile M: 375 x 667
- Mobile L: 390 x 844
- Tablet: 768 x 1024
- Desktop: 1440 x 900

---

## Keyboard Navigation Checklist

- [ ] User bisa menekan `Tab` dari awal halaman.
- [ ] Skip link muncul saat fokus.
- [ ] Skip link membawa user ke konten utama.
- [ ] Semua tombol bisa difokuskan.
- [ ] Semua link bisa difokuskan.
- [ ] Focus ring terlihat jelas.
- [ ] Urutan fokus terasa logis.
- [ ] Tidak ada keyboard trap.
- [ ] Tombol bottom navigation bisa dipakai dengan keyboard.

Notes:

```txt
Isi catatan hasil test di sini.
```

---

## Touch Target Checklist

- [ ] Tombol utama minimal terasa nyaman disentuh.
- [ ] Bottom navigation tidak terlalu kecil.
- [ ] Tombol audio mudah disentuh.
- [ ] Tombol next/previous mudah disentuh.
- [ ] Pilihan jawaban pada latihan membaca mudah disentuh.
- [ ] Toggle settings mudah disentuh.

Notes:

```txt
Isi catatan hasil test di sini.
```

---

## Visual & Contrast Checklist

- [ ] Teks utama mudah dibaca.
- [ ] Warna teks tidak terlalu pucat.
- [ ] Tombol aktif terlihat jelas.
- [ ] Progress bar terlihat jelas.
- [ ] Mode kontras tinggi bisa diaktifkan.
- [ ] Mode kontras tinggi tetap readable.
- [ ] Tidak ada teks yang tertutup elemen lain.
- [ ] Tidak ada horizontal scroll di mobile.

Notes:

```txt
Isi catatan hasil test di sini.
```

---

## Dyslexia-Friendly Reading Checklist

- [ ] Teks tidak terlalu padat.
- [ ] Kalimat pendek.
- [ ] Instruksi sederhana.
- [ ] Huruf besar mudah dikenali.
- [ ] Spacing cukup lega.
- [ ] Tidak ada paragraf panjang untuk anak.
- [ ] Feedback salah tidak menyalahkan anak.
- [ ] Feedback benar terasa hangat.

Notes:

```txt
Isi catatan hasil test di sini.
```

---

## Motion Checklist

- [ ] Animasi tidak berlebihan.
- [ ] Tidak ada flashing.
- [ ] Tidak ada animasi cepat yang mengganggu.
- [ ] Reduced motion sudah ditangani di CSS.
- [ ] Interaksi tap tetap terasa ringan.

Notes:

```txt
Isi catatan hasil test di sini.
```

---

## Audio Checklist

- [ ] Tombol dengarkan tersedia.
- [ ] Audio tidak wajib.
- [ ] Audio otomatis bisa dimatikan.
- [ ] Aplikasi tetap bisa digunakan kalau speech synthesis tidak tersedia.
- [ ] Teks yang dibacakan pendek dan jelas.

Notes:

```txt
Isi catatan hasil test di sini.
```

---

## Page-Specific QA

### Home

- [ ] Sapaan terlihat jelas.
- [ ] Poin dan streak terlihat jelas.
- [ ] Card utama mudah dipilih.
- [ ] Layout mobile rapi.
- [ ] Layout desktop tidak terlalu kosong.

### Belajar Huruf

- [ ] Huruf besar terlihat jelas.
- [ ] Tombol audio jelas.
- [ ] Next/previous jalan.
- [ ] Progress bertambah.
- [ ] Poin bertambah untuk huruf baru.

### Latihan Membaca

- [ ] Kata mudah dibaca.
- [ ] Tombol dengarkan jelas.
- [ ] Pilihan jawaban mudah disentuh.
- [ ] Feedback benar ramah.
- [ ] Feedback salah tidak membuat anak takut.
- [ ] Lanjut hanya aktif setelah jawaban benar.

### Poin / Ranking

- [ ] User terlihat sebagai `KAMU`.
- [ ] Copywriting tidak terlalu kompetitif.
- [ ] Poin terbaca jelas.
- [ ] Podium tidak overflow di Mobile S.
- [ ] Ranking row tidak overflow di Mobile S.

### Profile

- [ ] Nama bisa diedit.
- [ ] Ukuran teks bisa diubah.
- [ ] Kontras tinggi bisa toggle.
- [ ] Audio otomatis bisa toggle.
- [ ] Mode latihan bisa dipilih.
- [ ] Settings tersimpan setelah refresh.
- [ ] Tidak ada horizontal overflow di Mobile S.

### Offline

- [ ] Halaman offline bisa dibuka.
- [ ] Copywriting ramah.
- [ ] Tombol kembali ke beranda tersedia.
- [ ] Tombol belajar tersedia.

---

## PWA QA

- [ ] `manifest.ts` menghasilkan manifest valid.
- [ ] Icon aplikasi muncul.
- [ ] Theme color sesuai brand.
- [ ] Service worker registered di production mode.
- [ ] `/offline` bisa dibuka.
- [ ] App tidak rusak ketika service worker gagal register.
- [ ] App shell dasar bisa dimuat dari cache setelah pernah dibuka.

Notes:

```txt
Isi catatan hasil test di sini.
```

---

## Local Storage QA

- [ ] Nama user tersimpan setelah refresh.
- [ ] Poin tersimpan setelah refresh.
- [ ] Streak tersimpan setelah refresh.
- [ ] Huruf yang selesai tersimpan setelah refresh.
- [ ] Latihan membaca yang selesai tersimpan setelah refresh.
- [ ] Text size setting tersimpan setelah refresh.
- [ ] High contrast setting tersimpan setelah refresh.
- [ ] Auto audio setting tersimpan setelah refresh.
- [ ] Learning mode tersimpan setelah refresh.
- [ ] Reset progress tidak menghapus nama dan settings.

Notes:

```txt
Isi catatan hasil test di sini.
```

---

## Manual Test Commands

Run automated checks:

```bash
npm run lint
npm run build
```

Run local development:

```bash
npm run dev
```

Run production preview:

```bash
npm run build
npm run start
```

---

## Browser / DevTools Checklist

Use browser DevTools responsive mode and test:

- [ ] 320 x 614
- [ ] 375 x 667
- [ ] 390 x 844
- [ ] 768 x 1024
- [ ] 1440 x 900

Use keyboard:

- [ ] `Tab`
- [ ] `Shift + Tab`
- [ ] `Enter`
- [ ] `Space`

Use Network / Application tab:

- [ ] Offline mode
- [ ] Service Worker
- [ ] Manifest
- [ ] Local Storage

---

## Final Result

Status:

```txt
PASS / NEEDS FIX
```

Summary:

```txt
Isi ringkasan hasil QA di sini.
```

Known Issues:

```txt
Isi known issue jika ada.
```

Follow-up Issues:

```txt
Isi ide issue lanjutan jika ada.
```

---

## QA Sign-off

Tester:

```txt
Nama tester
```

Date:

```txt
YYYY-MM-DD
```

Result:

```txt
PASS / NEEDS FIX
```
