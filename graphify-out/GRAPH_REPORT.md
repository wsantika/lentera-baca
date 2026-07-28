# Graph Report - .  (2026-07-28)

## Corpus Check
- Corpus is ~18,078 words - fits in a single context window. You may not need a graph.

## Summary
- 310 nodes · 417 edges · 23 communities (18 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Profile Page & Layout Container
- TypeScript Configuration & Type Declarations
- Third-party UI & Animation Dependencies
- ESLint & Project Dependencies
- Belajar Huruf (Letter Learning) Module
- Component & Path Aliases Configuration
- Latihan Membaca (Reading Practice) Module
- Ranking & Leaderboard Module
- Root App Layout & Viewport Configuration
- Home Dashboard & Header Components
- Accessibility Settings & Learning State Preview
- Global Learning State & Local Persistence Store
- Child-Friendly UI Button Components
- PWA Offline Fallback Page
- ESLint Configuration Setup
- Next.js Standalone Configuration
- PostCSS & Styling Pipeline
- PWA Service Worker & App Shell Cache

## God Nodes (most connected - your core abstractions)
1. `cn()` - 29 edges
2. `compilerOptions` - 16 edges
3. `useLearningStore()` - 15 edges
4. `include` - 7 edges
5. `tailwind` - 6 edges
6. `aliases` - 6 edges
7. `HomeDashboard()` - 6 edges
8. `ReadingPractice()` - 6 edges
9. `scripts` - 5 edges
10. `LetterLesson()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  src/app/layout.tsx → src/lib/utils.ts
- `HomeDashboard()` --calls--> `useLearningStore()`  [EXTRACTED]
  src/components/dashboard/home-dashboard.tsx → src/lib/store/learning-store.tsx
- `LearningStatePreview()` --calls--> `useLearningStore()`  [EXTRACTED]
  src/components/dashboard/learning-state-preview.tsx → src/lib/store/learning-store.tsx
- `BottomNavigation()` --calls--> `cn()`  [EXTRACTED]
  src/components/layout/bottom-navigation.tsx → src/lib/utils.ts
- `PageContainer()` --calls--> `cn()`  [EXTRACTED]
  src/components/layout/page-container.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (23 total, 5 thin omitted)

### Community 0 - "Profile Page & Layout Container"
Cohesion: 0.08
Nodes (21): PageContainer(), PageContainerProps, clampPercentage(), getInitials(), ModeButton(), PreferenceCheck(), ProfileHero(), ProfilePageContent() (+13 more)

### Community 1 - "TypeScript Configuration & Type Declarations"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 2 - "Third-party UI & Animation Dependencies"
Cohesion: 0.07
Nodes (27): class-variance-authority, clsx, framer-motion, lucide-react, next, dependencies, class-variance-authority, clsx (+19 more)

### Community 3 - "ESLint & Project Dependencies"
Cohesion: 0.08
Nodes (25): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+17 more)

### Community 4 - "Belajar Huruf (Letter Learning) Module"
Cohesion: 0.12
Nodes (14): LetterActions(), LetterActionsProps, LetterBottomBar(), LetterBottomBarProps, getWrappedIndex(), LetterLesson(), LetterProgressHeader(), LetterProgressHeaderProps (+6 more)

### Community 5 - "Component & Path Aliases Configuration"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 6 - "Latihan Membaca (Reading Practice) Module"
Cohesion: 0.13
Nodes (14): ReadingFooterActions(), ReadingFooterActionsProps, FeedbackState, getLevel(), getWrappedIndex(), ReadingPractice(), ReadingProgressHeader(), ReadingProgressHeaderProps (+6 more)

### Community 7 - "Ranking & Leaderboard Module"
Cohesion: 0.13
Nodes (9): getAvatarClassName(), getCurrentUserRankList(), getInitial(), LeaderboardPageContent(), PodiumAvatar(), RankedPerson, RankingRow(), leaderboardPeople (+1 more)

### Community 8 - "Root App Layout & Viewport Configuration"
Cohesion: 0.13
Nodes (13): metadata, readableFont, RootLayout(), viewport, AppShell(), AppShellProps, BottomNavigation(), NavigationItem (+5 more)

### Community 9 - "Home Dashboard & Header Components"
Cohesion: 0.15
Nodes (13): DashboardHeader(), DashboardHeaderProps, getInitials(), DashboardTipCard(), ALPHABET, clampPercentage(), getNextLetter(), getReadingLevel() (+5 more)

### Community 10 - "Accessibility Settings & Learning State Preview"
Cohesion: 0.15
Nodes (13): LearningStatePreview(), textSizeLabels, textSizeOrder, AccessibilitySettingsEffect(), textSizeClasses, ChildCard(), ChildCardProps, ChildCardTone (+5 more)

### Community 11 - "Global Learning State & Local Persistence Store"
Cohesion: 0.19
Nodes (15): addUniqueItem(), defaultSettings, defaultState, getTodayKey(), getYesterdayKey(), LearningSettings, LearningState, LearningStoreContext (+7 more)

### Community 12 - "Child-Friendly UI Button Components"
Cohesion: 0.22
Nodes (8): ChildButton(), ChildButtonProps, ChildButtonSize, ChildButtonVariant, sizeClassName, variantClassName, designConfig, feedbackCopy

## Knowledge Gaps
- **121 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+116 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useLearningStore()` connect `Accessibility Settings & Learning State Preview` to `Profile Page & Layout Container`, `Belajar Huruf (Letter Learning) Module`, `Latihan Membaca (Reading Practice) Module`, `Ranking & Leaderboard Module`, `Home Dashboard & Header Components`, `Global Learning State & Local Persistence Store`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Why does `cn()` connect `Profile Page & Layout Container` to `Root App Layout & Viewport Configuration`, `Accessibility Settings & Learning State Preview`, `Child-Friendly UI Button Components`, `Ranking & Leaderboard Module`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Third-party UI & Animation Dependencies` to `ESLint & Project Dependencies`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _121 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Profile Page & Layout Container` be split into smaller, more focused modules?**
  _Cohesion score 0.08258258258258258 - nodes in this community are weakly interconnected._
- **Should `TypeScript Configuration & Type Declarations` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `Third-party UI & Animation Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._