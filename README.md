# Lentera Baca

**Lentera Baca** adalah aplikasi web edukasi inklusif untuk membantu anak usia 5-8 tahun, khususnya anak dengan disleksia, belajar mengenal huruf dan membaca kalimat pendek melalui visual, audio, interaksi sederhana, dan feedback yang ramah.

Project ini dikembangkan sebagai web app nyata, bukan prototype statis. Fokus utamanya adalah aksesibilitas, pengalaman belajar yang menyenangkan, tampilan ramah anak, dan fondasi teknis yang siap dikembangkan ke tahap production.

---

## Abstract

Lentera Baca is an inclusive educational web application designed to support early literacy learning for children aged 5-8, especially children with dyslexia. The application provides letter learning, short reading exercises, audio assistance, points, progress tracking, and accessibility settings. The MVP uses a local-first approach with browser storage and is prepared for future backend integration, authentication, child profiles, and parent or teacher dashboards.

---

## Keywords

Inclusive Education, Dyslexia-Friendly UI, Early Literacy, Web Application, Accessibility, PWA, Next.js, TypeScript, Local-First Learning State.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Goals](#2-project-goals)
3. [Target Users](#3-target-users)
4. [MVP Scope](#4-mvp-scope)
5. [Main Features](#5-main-features)
6. [Technology Stack](#6-technology-stack)
7. [System Architecture](#7-system-architecture)
8. [Folder Structure](#8-folder-structure)
9. [Application Routes](#9-application-routes)
10. [State Management](#10-state-management)
11. [Accessibility Principles](#11-accessibility-principles)
12. [PWA Support](#12-pwa-support)
13. [Installation](#13-installation)
14. [Running the Project](#14-running-the-project)
15. [Available Scripts](#15-available-scripts)
16. [Development Workflow](#16-development-workflow)
17. [Git Branching Strategy](#17-git-branching-strategy)
18. [Quality Assurance](#18-quality-assurance)
19. [Known Limitations](#19-known-limitations)
20. [Future Roadmap](#20-future-roadmap)
21. [Project Status](#21-project-status)
22. [Author](#22-author)

---

## 1. Project Overview

Lentera Baca adalah aplikasi belajar membaca berbasis web yang dirancang dengan pendekatan child-friendly dan accessibility-first.

Aplikasi ini membantu anak:

- mengenal huruf besar;
- mendengarkan bunyi huruf atau kata;
- membaca kata dan kalimat pendek;
- memilih jawaban sederhana;
- mendapatkan feedback positif;
- melihat progress belajar;
- mengatur tampilan sesuai kebutuhan belajar.

Aplikasi ini dibuat agar anak dapat belajar secara tenang, tidak tertekan, dan merasa didukung.

---

## 2. Project Goals

Tujuan utama project ini adalah membangun aplikasi edukasi yang:

1. Ramah untuk anak usia 5-8 tahun.
2. Mendukung anak dengan kesulitan membaca atau disleksia.
3. Menggunakan teks pendek dan visual yang jelas.
4. Menyediakan audio untuk membantu proses belajar.
5. Memiliki tombol besar dan mudah disentuh.
6. Memberikan feedback yang lembut dan tidak menghukum.
7. Responsif di mobile, tablet, dan desktop.
8. Siap dikembangkan menjadi aplikasi production dengan backend di tahap berikutnya.

---

## 3. Target Users

### 3.1 Primary Users

Anak usia 5-8 tahun, terutama:

- anak yang baru belajar membaca;
- anak yang membutuhkan visual besar;
- anak yang membutuhkan audio bantuan;
- anak dengan disleksia atau kesulitan membaca.

### 3.2 Secondary Users

- Orang tua.
- Guru.
- Pendamping belajar.
- Terapis atau fasilitator literasi anak.

---

## 4. MVP Scope

MVP Lentera Baca mencakup fitur utama berikut:

1. Home Dashboard.
2. Belajar Huruf.
3. Latihan Membaca.
4. Poin dan Ranking.
5. Profile dan Accessibility Settings.
6. Local progress persistence.
7. PWA-ready foundation.
8. Accessibility and usability QA checklist.

MVP belum mencakup backend, login, database, multi-user sync, atau dashboard guru/orang tua.

---

## 5. Main Features

### 5.1 Home Dashboard

Dashboard menampilkan:

- sapaan user;
- jumlah poin;
- streak belajar;
- card menuju fitur utama;
- progress ringkas;
- tips belajar harian;
- bottom navigation.

### 5.2 Belajar Huruf

Modul belajar huruf menyediakan:

- huruf besar A-Z;
- contoh kata;
- visual pendukung;
- audio via Web Speech API;
- tombol previous dan next;
- progress huruf;
- poin saat huruf baru dipelajari.

### 5.3 Latihan Membaca

Modul latihan membaca menyediakan:

- kata atau kalimat pendek;
- visual objek;
- tombol dengarkan;
- pilihan jawaban sederhana;
- feedback benar atau belum tepat;
- progress latihan;
- poin saat latihan selesai.

### 5.4 Poin dan Ranking

Halaman poin menyediakan:

- total poin user;
- ring progress poin;
- podium ranking;
- daftar ranking lembut;
- penanda user sebagai `KAMU`;
- copywriting yang tidak terlalu kompetitif.

### 5.5 Profile dan Accessibility Settings

Halaman profile menyediakan:

- nama panggilan user;
- total poin;
- progress belajar;
- ukuran teks;
- mode kontras tinggi;
- audio otomatis;
- preferensi mode latihan;
- pencapaian;
- bantuan.

### 5.6 Offline Page

Aplikasi menyediakan halaman offline sederhana untuk mendukung pengalaman PWA dasar.

---

## 6. Technology Stack

Project ini menggunakan stack berikut:

| Layer             | Technology                        |
| ----------------- | --------------------------------- |
| Framework         | Next.js App Router                |
| Language          | TypeScript                        |
| UI                | React                             |
| Styling           | Tailwind CSS                      |
| Component Pattern | shadcn/ui style components        |
| Primitive UI      | Radix UI                          |
| Animation         | Framer Motion                     |
| Icons             | Lucide React                      |
| Audio             | Web Speech API                    |
| State Persistence | localStorage                      |
| PWA               | Web App Manifest + Service Worker |
| Package Manager   | npm                               |

---

## 7. System Architecture

MVP menggunakan pendekatan local-first.

```txt
User Interface
   |
   v
Feature Components
   |
   v
Learning Store Provider
   |
   v
Browser localStorage
```

### 7.1 Frontend Layer

Frontend bertanggung jawab untuk:

- rendering halaman;
- interaksi anak;
- navigasi;
- visual feedback;
- audio playback;
- accessibility settings.

### 7.2 State Layer

State aplikasi disimpan menggunakan React Context dan localStorage.

State yang disimpan:

```ts
type LearningState = {
  name: string;
  points: number;
  streak: number;
  completedLetters: string[];
  completedReadingIds: string[];
  settings: {
    textSize: "normal" | "large" | "extra-large";
    highContrast: boolean;
    autoAudio: boolean;
    learningMode: "easy" | "medium";
  };
  lastActiveDate: string | null;
};
```

### 7.3 Future Backend Architecture

Pada tahap post-MVP, arsitektur dapat dikembangkan menjadi:

```txt
Next.js App
   |
   v
Authentication
   |
   v
API / Server Actions
   |
   v
PostgreSQL / Supabase
   |
   v
Child Profiles, Progress, Attempts, Points
```

---

## 8. Folder Structure

Struktur folder utama:

```txt
lentera-baca/
  public/
    icon.svg
    sw.js

  docs/
    mvp-accessibility-qa.md

  src/
    app/
      layout.tsx
      page.tsx
      globals.css
      manifest.ts
      not-found.tsx

      letters/
        page.tsx

      reading/
        page.tsx

      leaderboard/
        page.tsx

      profile/
        page.tsx

      offline/
        page.tsx

    components/
      dashboard/
      layout/
      leaderboard/
      letters/
      profile/
      providers/
      reading/
      ui/

    config/
      site.ts
      design.ts

    lib/
      data/
      hooks/
      store/
      utils.ts
```

### 8.1 `src/app`

Berisi route utama aplikasi menggunakan Next.js App Router.

### 8.2 `src/components`

Berisi komponen UI dan feature components.

### 8.3 `src/components/layout`

Berisi layout global seperti:

- app shell;
- bottom navigation;
- skip link;
- page container.

### 8.4 `src/components/dashboard`

Berisi komponen halaman home dashboard.

### 8.5 `src/components/letters`

Berisi komponen modul belajar huruf.

### 8.6 `src/components/reading`

Berisi komponen modul latihan membaca.

### 8.7 `src/components/leaderboard`

Berisi komponen halaman poin dan ranking.

### 8.8 `src/components/profile`

Berisi komponen profile dan accessibility settings.

### 8.9 `src/components/providers`

Berisi provider global seperti:

- learning store provider;
- accessibility settings effect;
- service worker register.

### 8.10 `src/lib/data`

Berisi data lokal untuk MVP seperti:

- data huruf;
- data latihan membaca;
- data leaderboard dummy.

### 8.11 `src/lib/store`

Berisi local learning state.

### 8.12 `src/lib/hooks`

Berisi custom hooks seperti speech synthesis.

---

## 9. Application Routes

| Route          | Description                        |
| -------------- | ---------------------------------- |
| `/`            | Home Dashboard                     |
| `/letters`     | Belajar Huruf                      |
| `/reading`     | Latihan Membaca                    |
| `/leaderboard` | Poin dan Ranking                   |
| `/profile`     | Profile dan Accessibility Settings |
| `/offline`     | Offline fallback page              |

---

## 10. State Management

MVP menggunakan React Context untuk global state dan localStorage untuk persistence.

### 10.1 Stored Data

Data yang disimpan:

- nama user;
- poin;
- streak;
- huruf yang sudah selesai;
- latihan membaca yang sudah selesai;
- ukuran teks;
- mode kontras tinggi;
- audio otomatis;
- mode latihan;
- tanggal aktivitas terakhir.

### 10.2 Persistence Behavior

Data tersimpan secara lokal di browser. Setelah refresh, progress dan settings tetap tersedia.

### 10.3 Reset Behavior

Reset progress menghapus:

- poin;
- streak;
- completed letters;
- completed reading exercises.

Reset progress tidak menghapus:

- nama user;
- accessibility settings.

---

## 11. Accessibility Principles

Lentera Baca menggunakan prinsip accessibility-first.

### 11.1 Visual Accessibility

Aplikasi memperhatikan:

- teks besar;
- warna lembut;
- kontras yang cukup;
- tombol besar;
- layout tidak padat;
- focus ring yang jelas;
- mode kontras tinggi.

### 11.2 Dyslexia-Friendly Design

Aplikasi menghindari:

- teks panjang;
- instruksi rumit;
- paragraf padat;
- feedback negatif;
- kompetisi berlebihan.

Aplikasi memprioritaskan:

- instruksi pendek;
- huruf besar;
- spacing lega;
- audio bantuan;
- feedback positif;
- visual pendukung.

### 11.3 Keyboard Accessibility

Aplikasi menyediakan:

- skip link;
- focus state;
- navigasi keyboard;
- tombol dan link yang dapat difokuskan.

### 11.4 Touch Accessibility

Tombol dan card dibuat besar agar mudah disentuh oleh anak.

---

## 12. PWA Support

Lentera Baca sudah memiliki fondasi PWA:

- Web App Manifest;
- app icon;
- theme color;
- offline page;
- service worker dasar;
- cache app shell dasar;
- service worker registration di production mode.

### 12.1 PWA Files

```txt
src/app/manifest.ts
src/app/offline/page.tsx
public/icon.svg
public/sw.js
src/components/providers/service-worker-register.tsx
```

### 12.2 Service Worker Behavior

Service worker melakukan caching dasar untuk halaman utama:

- `/`;
- `/letters`;
- `/reading`;
- `/leaderboard`;
- `/profile`;
- `/offline`;
- `/icon.svg`.

Service worker hanya diregister pada production mode agar development tidak terganggu oleh cache lama.

---

## 13. Installation

### 13.1 Prerequisites

Pastikan sudah menginstall:

- Node.js;
- npm;
- Git.

Cek versi:

```bash
node -v
npm -v
git --version
```

### 13.2 Clone Repository

```bash
git clone https://github.com/wsantika/lentera-baca.git
cd lentera-baca
```

### 13.3 Install Dependencies

```bash
npm install
```

---

## 14. Running the Project

### 14.1 Development Mode

```bash
npm run dev
```

Buka aplikasi di browser:

```txt
http://localhost:3000
```

### 14.2 Production Build

```bash
npm run build
```

### 14.3 Production Preview

```bash
npm run start
```

---

## 15. Available Scripts

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Menjalankan development server |
| `npm run build` | Membuat production build       |
| `npm run start` | Menjalankan production server  |
| `npm run lint`  | Menjalankan ESLint             |

---

## 16. Development Workflow

Workflow pengembangan dilakukan berdasarkan issue.

Langkah umum:

1. Ambil issue dari GitHub.
2. Buat branch baru dari `dev`.
3. Implementasikan fitur sesuai scope issue.
4. Jalankan lint dan build.
5. Commit perubahan.
6. Push branch.
7. Buat Pull Request ke `dev`.
8. Merge setelah aman.
9. Close issue terkait.

Contoh:

```bash
git checkout dev
git pull origin dev
git checkout -b feat/example-feature
```

Setelah selesai:

```bash
npm run lint
npm run build

git status
git add .
git commit -m "feat: example feature"
git push -u origin feat/example-feature
```

Buat Pull Request:

```bash
gh pr create \
  --base dev \
  --head feat/example-feature \
  --title "feat: example feature" \
  --body "## Summary
- Add example feature

## Test
- npm run lint
- npm run build

Refs #ISSUE_NUMBER"
```

---

## 17. Git Branching Strategy

Branch utama:

```txt
master = stable / production-like branch
dev    = integration branch
```

Branch fitur:

```txt
feat/feature-name
fix/bug-name
chore/task-name
docs/documentation-name
```

Contoh branch:

```txt
feat/home-dashboard
feat/letter-learning-module
feat/reading-practice-module
feat/profile-accessibility-settings
feat/pwa-ready
chore/mvp-accessibility-qa
```

Semua Pull Request fitur harus masuk ke:

```txt
dev
```

Release dilakukan dari:

```txt
dev -> master
```

---

## 18. Quality Assurance

QA dilakukan dengan dua jenis test:

1. Automated test.
2. Manual accessibility and usability QA.

### 18.1 Automated Check

```bash
npm run lint
npm run build
```

### 18.2 Manual QA Checklist

Dokumen QA tersedia di:

```txt
docs/mvp-accessibility-qa.md
```

Manual QA mencakup:

- mobile responsiveness;
- keyboard navigation;
- focus ring;
- touch target;
- contrast;
- dyslexia-friendly text;
- audio behavior;
- PWA behavior;
- localStorage persistence.

### 18.3 Required Screen Sizes

Test manual dilakukan pada:

```txt
320 x 614
375 x 667
390 x 844
768 x 1024
1440 x 900
```

### 18.4 Required Routes

Route yang harus dicek:

```txt
/
 /letters
 /reading
 /leaderboard
 /profile
 /offline
```

---

## 19. Known Limitations

MVP saat ini masih memiliki beberapa batasan:

1. Belum menggunakan backend.
2. Belum ada authentication.
3. Belum ada multi-profile anak.
4. Progress hanya tersimpan di localStorage.
5. Data huruf dan latihan masih statis.
6. Visual objek masih menggunakan emoji atau asset sederhana.
7. Audio masih menggunakan Web Speech API.
8. Leaderboard masih dummy dan bersifat hiburan.
9. Belum ada dashboard orang tua atau guru.
10. Belum ada automated UI test.

---

## 20. Future Roadmap

### 20.1 Post-MVP Production

Rencana pengembangan setelah MVP:

1. Setup Supabase.
2. Desain database schema.
3. Authentication.
4. Child profile model.
5. Sync progress ke database.
6. Parent dashboard.
7. Teacher dashboard.
8. Replace dummy leaderboard.
9. Replace emoji dengan asset visual curated.
10. Tambahkan audio manusia yang dikurasi.
11. Tambahkan automated test.
12. Deploy production.

### 20.2 Suggested Database Tables

Rencana awal tabel database:

```txt
users
child_profiles
letter_progress
reading_attempts
point_events
accessibility_settings
```

### 20.3 Suggested Future Features

Fitur lanjutan:

- onboarding anak;
- multi child profile;
- dashboard parent;
- dashboard teacher;
- lesson level system;
- phonics module;
- syllable learning;
- achievement system;
- content management;
- analytics privacy-safe;
- export progress report.

---

## 21. Project Status

Current status:

```txt
MVP completed on dev branch
```

MVP includes:

- app shell and routing;
- child-friendly design system;
- local learning state;
- home dashboard;
- letter learning module;
- reading practice module;
- points leaderboard;
- profile accessibility settings;
- PWA-ready foundation;
- accessibility QA checklist.

Next release step:

```txt
dev -> master
tag v0.1.0
deploy to Vercel
```

---

## 22. Author

Project owner:

```txt
Santika
```

Repository:

```txt
https://github.com/wsantika/lentera-baca
```

---

## IEEE-Style Documentation Note

This README uses an IEEE-inspired documentation structure with abstract, keywords, numbered sections, system architecture, implementation details, testing procedure, limitations, and future work. The format is adapted for GitHub README usage while keeping technical documentation complete and easy to maintain.

---

## License

License has not been defined yet.

Recommended for future:

```txt
wsantika.
```
