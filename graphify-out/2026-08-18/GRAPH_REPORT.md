# Graph Report - lentera-baca  (2026-08-18)

## Corpus Check
- 97 files · ~144,462 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 620 nodes · 780 edges · 47 communities (36 shown, 11 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `09b3c69f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cn
- compilerOptions
- dependencies
- devDependencies
- reading-practice.tsx
- components.json
- Ringkasan Perubahan
- leaderboard-page-content.tsx
- app/layout.tsx
- home-dashboard.tsx
- AI Agent Guidelines (Do's & Don'ts)
- learning-store.tsx
- CLAUDE.md
- offline/page.tsx
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- sw.js
- createClient
- MVP Accessibility & Usability QA
- Lentera Baca
- 📊 Database Schema — Lentera Baca V2
- 8. Folder Structure
- database.types.ts
- 5. Main Features
- 11. Accessibility Principles
- 18. Quality Assurance
- 10. State Management
- 13. Installation & Environment Setup
- 14. Running the Project
- 20. Future Roadmap
- 7. System Architecture
- 12. PWA Support
- 3. Target Users
- AGENTS.md
- rules/graphify.md
- workflows/graphify.md
- src/middleware.ts
- login/layout.tsx
- signup/layout.tsx
- Audio Assets — Lentera Baca
- use-speech.ts
- Audit Checklist & Verification

## God Nodes (most connected - your core abstractions)
1. `cn()` - 31 edges
2. `Lentera Baca` - 28 edges
3. `createClient()` - 22 edges
4. `useLearningStore()` - 17 edges
5. `MVP Accessibility & Usability QA` - 17 edges
6. `compilerOptions` - 16 edges
7. `8. Folder Structure` - 13 edges
8. `ReadingPractice()` - 7 edges
9. `include` - 7 edges
10. `5. Main Features` - 7 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  src/app/layout.tsx → src/lib/utils.ts
- `LearningStatePreview()` --calls--> `useLearningStore()`  [EXTRACTED]
  src/components/dashboard/learning-state-preview.tsx → src/lib/store/learning-store.tsx
- `GET()` --calls--> `createClient()`  [EXTRACTED]
  src/app/auth/callback/route.ts → src/lib/supabase/server.ts
- `ParentDashboardPage()` --calls--> `createClient()`  [EXTRACTED]
  src/app/parent/page.tsx → src/lib/supabase/server.ts
- `ProgressDashboardPage()` --calls--> `createClient()`  [EXTRACTED]
  src/app/parent/progress/[id]/page.tsx → src/lib/supabase/server.ts

## Import Cycles
- None detected.

## Communities (47 total, 11 thin omitted)

### Community 0 - "cn"
Cohesion: 0.05
Nodes (40): LearningStatePreview(), textSizeLabels, textSizeOrder, PageContainer(), PageContainerProps, clampPercentage(), getInitials(), ModeButton() (+32 more)

### Community 1 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 2 - "dependencies"
Cohesion: 0.07
Nodes (27): class-variance-authority, clsx, framer-motion, lucide-react, next, dependencies, class-variance-authority, clsx (+19 more)

### Community 3 - "devDependencies"
Cohesion: 0.08
Nodes (25): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+17 more)

### Community 4 - "reading-practice.tsx"
Cohesion: 0.06
Nodes (31): LetterActions(), LetterActionsProps, LetterBottomBar(), LetterBottomBarProps, getWrappedIndex(), LetterLesson(), LetterProgressHeader(), LetterProgressHeaderProps (+23 more)

### Community 5 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 6 - "Ringkasan Perubahan"
Cohesion: 0.18
Nodes (10): 1. Server Actions Sinkronisasi (`src/lib/supabase/sync.ts`) — **FILE BARU**, 2. Client Hook Sinkronisasi (`src/lib/hooks/use-sync-progress.ts`) — **FILE BARU**, 3. Sync Effect Component (`src/components/providers/sync-progress-effect.tsx`) — **FILE BARU**, 4. Update Learning Store (`src/lib/store/learning-store.tsx`), 5. Update App Providers (`src/components/providers/app-providers.tsx`), 6. GitHub Actions CI (`/.github/workflows/ci.yml`) — **FILE BARU**, Arsitektur Aliran Data Sync, Review Implementasi Sync Learning Progress ke Database (Issue #27) (+2 more)

### Community 7 - "leaderboard-page-content.tsx"
Cohesion: 0.13
Nodes (9): getAvatarClassName(), getCurrentUserRankList(), getInitial(), LeaderboardPageContent(), PodiumAvatar(), RankedPerson, RankingRow(), leaderboardPeople (+1 more)

### Community 8 - "app/layout.tsx"
Cohesion: 0.15
Nodes (12): metadata, readableFont, RootLayout(), viewport, AppShell(), AppShellProps, BottomNavigation(), hiddenRoutes (+4 more)

### Community 9 - "home-dashboard.tsx"
Cohesion: 0.15
Nodes (13): DashboardHeader(), DashboardHeaderProps, getInitials(), DashboardTipCard(), ALPHABET, clampPercentage(), getNextLetter(), getReadingLevel() (+5 more)

### Community 10 - "AI Agent Guidelines (Do's & Don'ts)"
Cohesion: 0.04
Nodes (40): 1. Aturan Pencegahan Halusinasi (Anti-Hallucination), 2. Prinsip Produk & Edukasi Anak (Product Principles), 3. Prosedur Penanganan Error (Error Handling), 4. Do's & Don'ts Ringkasan, 5. Checklist Sebelum Menyelesaikan Tugas, AI Agent Guidelines (Do's & Don'ts), ✅ Do's, ❌ Don'ts (+32 more)

### Community 11 - "learning-store.tsx"
Cohesion: 0.12
Nodes (24): AccessibilitySettingsEffect(), textSizeClasses, AppProviders(), ServiceWorkerRegister(), SyncProgressEffect(), SyncStatus, useSyncProgress(), addUniqueItem() (+16 more)

### Community 12 - "CLAUDE.md"
Cohesion: 0.06
Nodes (31): 10. Language and Copywriting, 11. Routing Goals, 12. Target Folder Structure, 13. Component Guidelines, 14. Styling Guidelines, 15. Client vs Server Components, 16. State Management Plan, 17. Audio Guidelines (+23 more)

### Community 21 - "createClient"
Cohesion: 0.08
Nodes (28): GET(), POST(), GET(), metadata, metadata, ParentDashboardPage(), metadata, ProgressDashboardPage() (+20 more)

### Community 23 - "MVP Accessibility & Usability QA"
Cohesion: 0.08
Nodes (23): Audio Checklist, Belajar Huruf, Browser / DevTools Checklist, Device Sizes, Dyslexia-Friendly Reading Checklist, Final Result, Goal, Home (+15 more)

### Community 24 - "Lentera Baca"
Cohesion: 0.11
Nodes (17): 15. Available Scripts, 16. Development Workflow, 17. Git Branching Strategy, 19. Known Limitations, 1. Project Overview, 21. Project Status, 22. Author, 2. Project Goals (+9 more)

### Community 25 - "📊 Database Schema — Lentera Baca V2"
Cohesion: 0.15
Nodes (12): 1. `profiles`, 2. `child_profiles`, 3. `letter_progress`, 4. `reading_progress`, 5. `point_events`, 📊 Database Schema — Lentera Baca V2, Entity Relationship Diagram, Indeks (+4 more)

### Community 26 - "8. Folder Structure"
Cohesion: 0.15
Nodes (13): 8.10 `src/lib/data`, 8.11 `src/lib/store`, 8.12 `src/lib/hooks`, 8.1 `src/app`, 8.2 `src/components`, 8.3 `src/components/layout`, 8.4 `src/components/dashboard`, 8.5 `src/components/letters` (+5 more)

### Community 27 - "database.types.ts"
Cohesion: 0.18
Nodes (10): CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums, Json, Tables (+2 more)

### Community 28 - "5. Main Features"
Cohesion: 0.29
Nodes (7): 5.1 Home Dashboard, 5.2 Belajar Huruf, 5.3 Latihan Membaca, 5.4 Poin dan Ranking, 5.5 Profile dan Accessibility Settings, 5.6 Offline Page, 5. Main Features

### Community 29 - "11. Accessibility Principles"
Cohesion: 0.40
Nodes (5): 11.1 Visual Accessibility, 11.2 Dyslexia-Friendly Design, 11.3 Keyboard Accessibility, 11.4 Touch Accessibility, 11. Accessibility Principles

### Community 30 - "18. Quality Assurance"
Cohesion: 0.40
Nodes (5): 18.1 Automated Check, 18.2 Manual QA Checklist, 18.3 Required Screen Sizes, 18.4 Required Routes, 18. Quality Assurance

### Community 31 - "10. State Management"
Cohesion: 0.50
Nodes (4): 10.1 Stored Data, 10.2 Persistence Behavior, 10.3 Reset Behavior, 10. State Management

### Community 32 - "13. Installation & Environment Setup"
Cohesion: 0.50
Nodes (4): 13.1 Prerequisites, 13.2 Clone Repository, 13.3 Environment Variables Setup, 13. Installation & Environment Setup

### Community 33 - "14. Running the Project"
Cohesion: 0.50
Nodes (4): 14.1 Running via Docker (Recommended), 14.2 Running Locally (Node.js), 14.3 Production Build & Preview, 14. Running the Project

### Community 34 - "20. Future Roadmap"
Cohesion: 0.50
Nodes (4): 20.1 Post-MVP Production, 20.2 Suggested Database Tables, 20.3 Suggested Future Features, 20. Future Roadmap

### Community 35 - "7. System Architecture"
Cohesion: 0.50
Nodes (4): 7.1 Frontend Layer, 7.2 State Layer, 7.3 Future Backend Architecture, 7. System Architecture

### Community 36 - "12. PWA Support"
Cohesion: 0.67
Nodes (3): 12.1 PWA Files, 12.2 Service Worker Behavior, 12. PWA Support

### Community 37 - "3. Target Users"
Cohesion: 0.67
Nodes (3): 3.1 Primary Users, 3.2 Secondary Users, 3. Target Users

### Community 41 - "src/middleware.ts"
Cohesion: 0.47
Nodes (4): IMPORTANT: Do NOT add any logic between createServerClient and, updateSession(), config, middleware()

### Community 44 - "Audio Assets — Lentera Baca"
Cohesion: 0.25
Nodes (7): Audio Assets — Lentera Baca, Fallback, Panduan Konten, Panduan Rekaman Audio, Penamaan File, Spesifikasi Teknis, Struktur Folder

### Community 46 - "Audit Checklist & Verification"
Cohesion: 0.22
Nodes (8): 1. Perlindungan Data Anak (Row Level Security), 2. Eksposur Data Publik (Leaderboard & Komunitas), 3. Iklan, Analitik Pihak Ketiga & Tautan Eksternal, 4. Kebijakan Privasi Orang Tua, Audit Checklist & Verification, Kesimpulan, Overview, 🛡️ Privacy & Child Safety Audit — MVP V2

## Knowledge Gaps
- **316 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+311 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useLearningStore()` connect `learning-store.tsx` to `cn`, `home-dashboard.tsx`, `reading-practice.tsx`, `leaderboard-page-content.tsx`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `app/layout.tsx`, `leaderboard-page-content.tsx`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `Lentera Baca` connect `Lentera Baca` to `13. Installation & Environment Setup`, `14. Running the Project`, `20. Future Roadmap`, `7. System Architecture`, `12. PWA Support`, `3. Target Users`, `8. Folder Structure`, `5. Main Features`, `11. Accessibility Principles`, `18. Quality Assurance`, `10. State Management`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _316 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.05129561078794289 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._