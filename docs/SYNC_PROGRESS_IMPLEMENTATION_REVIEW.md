# Review Implementasi Sync Learning Progress ke Database (Issue #27)

Dokumen ini merangkum pekerjaan pada branch `feat/sync-learning-progress` untuk fitur "Sync local learning progress to database". Silakan periksa sebelum commit.

---

## Ringkasan Perubahan

### 1. Server Actions Sinkronisasi (`src/lib/supabase/sync.ts`) — **FILE BARU**
Berisi semua operasi database untuk sinkronisasi progress:

| Fungsi | Tabel Target | Keterangan |
|--------|-------------|------------|
| `fetchChildProgress` | `letter_progress`, `reading_progress`, `point_events`, `child_profiles` | Mengambil semua data progress anak dari DB untuk di-merge ke lokal |
| `syncLetterComplete` | `letter_progress` + `point_events` | Upsert huruf yang dikuasai + log 5 poin |
| `syncReadingComplete` | `reading_progress` + `point_events` | Upsert latihan membaca + log 10 poin |
| `syncStreakBonus` | `point_events` | Log bonus poin streak (5/10/15 berdasarkan hari) |
| `syncAccessibilitySettings` | `child_profiles` | Update kolom `accessibility_settings` (JSONB) |
| `bulkSyncProgress` | `letter_progress`, `reading_progress`, `child_profiles` | Migrasi massal data lokal → DB saat pertama kali terhubung |

Semua fungsi menggunakan **upsert** dengan `onConflict` untuk mencegah duplikasi data (memanfaatkan unique constraint `child_id + letter` / `child_id + exercise_id`).

### 2. Client Hook Sinkronisasi (`src/lib/hooks/use-sync-progress.ts`) — **FILE BARU**
Hook React yang menangani logika sinkronisasi bidirectional:

- **Initial Sync (saat mount)**: Jika `activeChildId` ada, fetch data dari DB → merge dengan data lokal menggunakan strategi **union** (gabungan huruf/reading dari lokal + DB, ambil poin tertinggi).
- **Local → DB Push**: Jika ada data lokal yang belum ada di DB, otomatis di-push via `bulkSyncProgress`.
- **Per-action Sync**: Expose fungsi `syncLetter`, `syncReading`, `syncStreak`, `syncSettings` yang dipanggil setiap kali ada mutasi state.
- **Offline Graceful**: Semua sync function gagal secara *silent* (tidak crash) — localStorage tetap jadi fallback utama.

### 3. Sync Effect Component (`src/components/providers/sync-progress-effect.tsx`) — **FILE BARU**
Komponen tak terlihat (invisible) yang:
- Mendeteksi **delta** (perubahan) antara state sebelumnya dan state terkini.
- Otomatis memanggil `syncLetter()` untuk setiap huruf baru yang selesai.
- Otomatis memanggil `syncReading()` untuk setiap latihan baru yang selesai.
- Otomatis memanggil `syncSettings()` jika pengaturan aksesibilitas berubah.

### 4. Update Learning Store (`src/lib/store/learning-store.tsx`)
Penambahan pada store yang sudah ada:
- **`mergeFromDB`**: Fungsi baru untuk menggabungkan data dari database ke state React.
- **`activeChildId`**: Diekspos melalui context agar komponen lain bisa tahu apakah anak aktif sudah terpilih.

### 5. Update App Providers (`src/components/providers/app-providers.tsx`)
- Menambahkan `<SyncProgressEffect />` di dalam `LearningStoreProvider` agar sync berjalan otomatis di seluruh aplikasi.

### 6. GitHub Actions CI (`/.github/workflows/ci.yml`) — **FILE BARU**
- Workflow otomatis lint & build pada setiap push/PR ke `main` atau `dev`.

---

## Arsitektur Aliran Data Sync

```
┌─────────────┐     mount      ┌──────────────────┐     fetch      ┌──────────────┐
│ localStorage │ ◄──────────── │ useSyncProgress   │ ──────────── ► │   Supabase   │
│  (per child) │               │  (initial merge)  │                │   Database   │
└──────┬───────┘               └──────────────────┘                └──────┬───────┘
       │                                                                  │
       │  state change          ┌──────────────────┐     upsert          │
       └──────────────────── ► │ SyncProgressEffect │ ──────────────── ► │
                                │  (delta detection) │                    │
                                └──────────────────┘                     │
```

**Merge Strategy**: Union (lokal ∪ DB) — tidak ada data yang hilang. Poin mengambil nilai tertinggi.

---

## Status Verifikasi (QA)
- ✅ **Lint**: 0 errors, 4 warnings (pre-existing dari file lain)
- ✅ **Build**: Sukses (`npm run build` — 14 routes compiled)
- ✅ **Graphify**: Knowledge graph updated

---

Silakan review dan test. Jika sudah oke, kabari untuk commit & PR.
