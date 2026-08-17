# Audio Assets — Lentera Baca

Folder ini menyimpan aset audio terkurasi untuk aplikasi Lentera Baca.

## Struktur Folder

```
public/audio/
├── letters/          # Pengucapan fonetik huruf A-Z
│   ├── a.mp3         # "A. Apel."
│   ├── b.mp3         # "B. Bola."
│   └── ...           # dst. sampai z.mp3
├── reading/          # Audio untuk latihan membaca
│   ├── read-01.mp3   # Sesuai ID exercise di reading-exercises.ts
│   └── ...
├── sfx/              # Sound effects
│   ├── correct.mp3   # Feedback jawaban benar
│   ├── incorrect.mp3 # Feedback jawaban salah
│   └── complete.mp3  # Feedback penyelesaian level
└── README.md         # File ini
```

## Panduan Rekaman Audio

### Spesifikasi Teknis
- **Format**: `.mp3` (kompatibilitas browser maksimal)
- **Bitrate**: 128kbps (kualitas cukup untuk suara manusia)
- **Sample rate**: 44.1kHz
- **Channel**: Mono (hemat ukuran file)

### Panduan Konten
- Gunakan suara **dewasa perempuan** yang hangat dan jelas.
- Pengucapan menggunakan **fonetik Bahasa Indonesia** standar.
- Tempo bicara **pelan dan jelas** (cocok untuk anak 5-8 tahun).
- Jeda singkat (~0.3 detik) di antara pengucapan huruf dan kata contoh.

### Penamaan File
- **Huruf**: `{huruf_kecil}.mp3` → `a.mp3`, `b.mp3`, ..., `z.mp3`
- **Reading**: `{exercise_id}.mp3` → sesuai ID di `src/lib/data/reading-exercises.ts`
- **SFX**: `{nama_efek}.mp3` → `correct.mp3`, `incorrect.mp3`, `complete.mp3`

## Fallback
Jika file audio belum tersedia, aplikasi akan otomatis menggunakan
Web Speech API (`speechSynthesis`) dengan bahasa `id-ID` sebagai fallback.
