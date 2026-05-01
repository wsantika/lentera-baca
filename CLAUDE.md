# CLAUDE.md

Project guide for AI coding agents working on **Lentera Baca**.

This file is the main reference for Claude, Cursor, Copilot, or any AI coding agent that will help develop this project. Read this file before editing code, creating files, changing dependencies, or suggesting architecture changes.

---

## 1. Project Identity

**Project name:** Lentera Baca  
**Repository:** `wsantika/lentera-baca`  
**Product type:** Inclusive educational web app  
**Primary audience:** Children aged 5-8, especially children with dyslexia  
**Secondary audience:** Parents, teachers, and caregivers

Lentera Baca helps children learn letters and read short sentences through:

- Friendly visuals
- Audio support
- Simple interactions
- Gentle feedback
- Accessible reading settings
- Calm progress tracking

This is not a static prototype. Treat this as a real production-oriented web application that will grow over time.

---

## 2. Product Vision

Build a warm, simple, accessible reading companion for young children who need a calmer and more supportive way to learn letters and short sentences.

The product should feel:

- Friendly
- Safe
- Calm
- Encouraging
- Child-first
- Dyslexia-aware
- Easy to touch and navigate
- Usable on phones, tablets, and desktop

The app must not feel like a competitive exam app. It should feel like a friendly learning buddy.

---

## 3. Core MVP Features

The MVP scope is tracked through GitHub Issues and the milestone:

```txt
MVP - Lentera Baca
```

Main features:

### 3.1 Home / Dashboard

- Greeting
- Points
- Streak
- Main feature cards
- Bottom navigation

### 3.2 Belajar Huruf

- Large uppercase letter display
- Press letter to hear sound
- Supporting visual or illustration
- Previous / next navigation
- Friendly animated feedback

### 3.3 Latihan Membaca

- Short word or sentence
- Listen button
- Simple multiple-choice question
- Friendly correct / incorrect feedback

### 3.4 Ranking / Poin

- Points from learning activities
- Soft leaderboard
- Non-aggressive motivational tone

### 3.5 Profile / Accessibility Settings

- Text size setting
- High contrast mode
- Auto audio setting
- Learning progress summary

---

## 4. Current Tech Stack

Use the existing project stack.

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- Radix UI
- Framer Motion
- Lucide React
- Web Speech API for early MVP audio
- PWA-ready responsive design

Important notes:

- This project may use a newer Next.js version.
- Do not rely only on old training knowledge.
- Before implementing Next.js-specific APIs, routing behavior, metadata, config, or server/client patterns, check the local docs when available:

```txt
node_modules/next/dist/docs/
```

---

## 5. Git Workflow

Never commit directly to `master`.

Branch model:

```txt
master = stable / production-like branch
dev    = integration branch for ongoing development
feature branches = one branch per issue or task
```

All Pull Requests must target:

```txt
dev
```

Branch naming convention:

```txt
feat/short-feature-name
fix/short-bug-name
chore/short-task-name
refactor/short-area-name
docs/short-doc-name
```

Examples:

```txt
feat/app-shell-routing
feat/child-friendly-design-system
feat/letter-learning-module
feat/reading-practice-module
chore/add-claude-project-guide
```

---

## 6. Issue Workflow

Before coding:

1. Read the relevant GitHub issue.
2. Understand the acceptance criteria.
3. Create a new branch from `dev`.
4. Implement only the scope of that issue.
5. Run checks.
6. Commit with a clear message.
7. Push branch.
8. Open a Pull Request to `dev`.

Recommended commands:

```bash
git checkout dev
git pull origin dev
git checkout -b feat/example-branch
```

After implementation:

```bash
npm run lint
npm run build
git status
git add .
git commit -m "feat: short clear message"
git push -u origin feat/example-branch
```

Create PR:

```bash
gh pr create \
  --base dev \
  --head feat/example-branch \
  --title "feat: short clear title" \
  --body "## Summary
- Describe what changed

## Test
- npm run lint
- npm run build

Refs #ISSUE_NUMBER"
```

Use `Refs #N` for PRs into `dev`. Use `Closes #N` only when the issue should close automatically from the target branch workflow.

---

## 7. Development Commands

Use npm.

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

Run the app locally at:

```txt
http://localhost:3000
```

---

## 8. Design Principles

The UI must be:

- Warm
- Clean
- Minimal
- Friendly for children
- Large enough for touch
- Low cognitive load
- Consistent across screens
- Calm and non-intimidating

Avoid:

- Dense text
- Small buttons
- Harsh red error states
- Competitive pressure
- Complex navigation
- Overloaded screens
- Dark, sharp, or corporate UI

Prefer:

- Large cards
- Rounded corners
- Soft shadows
- Gentle colors
- Short labels
- Clear icons
- Friendly microcopy
- Simple animations
- Obvious primary actions

---

## 9. Accessibility Requirements

This app is for children, including children with dyslexia. Accessibility is a core product requirement, not an enhancement.

Always consider:

- Large readable text
- Clear visual hierarchy
- Sufficient contrast
- Dyslexia-friendly font choices
- Large touch targets
- Keyboard navigation
- Focus states
- Audio support
- Reduced cognitive load
- Short sentences
- Simple words
- Avoiding all-caps paragraphs
- Avoiding unnecessary motion
- Clear correct / incorrect feedback

Recommended minimum touch target:

```txt
44px x 44px
```

Feedback tone:

- Correct: warm and celebratory
- Incorrect: gentle and encouraging
- Never shame the child
- Never use harsh language like "wrong", "failed", or "bad"

Good feedback examples:

```txt
Hebat! Kamu berhasil.
Tidak apa-apa, coba lagi pelan-pelan.
Bagus, kamu sudah berusaha.
Yuk dengarkan lagi.
```

Avoid:

```txt
Salah.
Kamu gagal.
Jawabanmu buruk.
Cepat coba lagi.
```

---

## 10. Language and Copywriting

Primary app language: **Indonesian**.

Use child-friendly Indonesian.

Rules:

- Keep text short.
- Use simple words.
- Avoid long paragraphs.
- Prefer direct instructions.
- Use warm and encouraging tone.
- Avoid technical language in user-facing UI.

Good examples:

```txt
Yuk belajar huruf.
Dengarkan dulu.
Pilih gambar yang cocok.
Coba lagi pelan-pelan.
Kamu hebat hari ini.
```

---

## 11. Routing Goals

Expected MVP routes:

```txt
/             = Home / Dashboard
/letters      = Belajar Huruf
/reading      = Latihan Membaca
/leaderboard  = Ranking / Poin
/profile      = Profile / Accessibility Settings
```

Future possible routes:

```txt
/onboarding
/parent
/teacher
/progress
/settings
/offline
```

---

## 12. Target Folder Structure

Keep the project modular.

Preferred structure:

```txt
src/
  app/
    page.tsx
    layout.tsx
    globals.css
    not-found.tsx
    letters/
      page.tsx
    reading/
      page.tsx
    leaderboard/
      page.tsx
    profile/
      page.tsx

  components/
    layout/
      app-shell.tsx
      bottom-navigation.tsx
      page-container.tsx
    dashboard/
    letters/
    reading/
    leaderboard/
    profile/
    ui/

  config/
    site.ts

  lib/
    utils.ts
    data/
    hooks/
    store/
```

Rules:

- Route files stay inside `src/app`.
- Reusable UI goes inside `src/components`.
- Feature-specific components should have their own folder.
- App constants go inside `src/config`.
- Shared utilities go inside `src/lib`.
- Do not put large feature logic directly inside page files.

---

## 13. Component Guidelines

Build components that are:

- Small
- Clearly named
- Typed with TypeScript
- Reusable when useful
- Easy to read
- Accessible by default

Use named exports for components:

```tsx
export function ExampleComponent() {
  return <div />;
}
```

Prefer clear prop types:

```tsx
type ExampleComponentProps = {
  title: string;
  description?: string;
};
```

Use the existing `cn` helper for class merging:

```tsx
import { cn } from "@/lib/utils";
```

---

## 14. Styling Guidelines

Use Tailwind CSS.

Do not create random one-off design systems. Follow the existing visual direction.

Preferred visual style:

- Soft warm background
- Rounded cards
- Child-friendly spacing
- Big buttons
- Clear icons
- Readable type scale

Use responsive mobile-first design.

Example pattern:

```tsx
className =
  "rounded-[2rem] border border-orange-100 bg-white/85 p-5 shadow-sm shadow-orange-100/70";
```

Focus states are required for clickable elements:

```tsx
className = "focus-visible:ring-4 focus-visible:ring-amber-300/60";
```

---

## 15. Client vs Server Components

Default to Server Components unless interactivity is needed.

Use `"use client"` only when the component needs:

- State
- Effects
- Browser APIs
- localStorage
- Web Speech API
- Framer Motion interaction
- `usePathname`
- Event handlers

Examples that need client components:

- Bottom navigation active route
- Letter press audio
- Reading quiz choices
- Accessibility settings
- Local progress store

---

## 16. State Management Plan

For MVP, use local-first state with `localStorage`.

Track:

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
  };
};
```

Future production backend may use:

- Supabase or custom API
- PostgreSQL
- Auth
- Parent / teacher account
- Multiple child profiles
- Progress sync across devices

Do not add backend until an issue explicitly asks for it.

---

## 17. Audio Guidelines

Early MVP can use Web Speech API.

Rules:

- Audio must be optional.
- Provide visible listen buttons.
- Respect auto audio setting.
- Do not autoplay aggressively.
- Keep text short for speech.
- Handle browsers that do not support speech synthesis.

Possible helper name:

```txt
useSpeech
```

Possible API:

```ts
speak("A");
speak("Ini bola.");
cancel();
```

---

## 18. Animation Guidelines

Use Framer Motion only when it improves usability.

Allowed:

- Button press feedback
- Card hover / tap feedback
- Gentle success animation
- Page-level subtle entrance

Avoid:

- Excessive motion
- Fast shaking
- Flashing
- Distracting loops

Respect reduced motion where practical.

---

## 19. Data Guidelines

For MVP, local data files are acceptable.

Suggested files:

```txt
src/lib/data/letters.ts
src/lib/data/reading-lessons.ts
src/lib/data/leaderboard.ts
```

Example letter item:

```ts
type LetterItem = {
  letter: string;
  word: string;
  imageLabel: string;
  emoji: string;
  audioText: string;
};
```

Example reading item:

```ts
type ReadingExercise = {
  id: string;
  sentence: string;
  audioText: string;
  question: string;
  options: string[];
  answer: string;
};
```

Keep content age-appropriate and culturally neutral.

---

## 20. PWA Goals

The app should become PWA-ready.

Eventually include:

- Web app manifest
- App icon
- Theme color
- Offline fallback page
- Basic service worker
- Responsive mobile layout

Do not add complex service worker caching until the PWA issue asks for it.

---

## 21. Testing and Quality Checks

Before every PR:

```bash
npm run lint
npm run build
```

Manual checks:

- App starts with `npm run dev`
- No runtime error in browser
- Bottom navigation works
- Mobile layout works
- Keyboard focus is visible
- Main actions are touch-friendly
- Copywriting is short and friendly

Future tests may include:

- Playwright
- React Testing Library
- Accessibility testing with axe
- Lighthouse checks

Do not introduce a test framework unless an issue asks for it.

---

## 22. Definition of Done

A task is done when:

- It matches the GitHub issue scope
- It does not break existing routes
- It passes lint
- It builds successfully
- It follows the design direction
- It is accessible enough for the MVP stage
- It has clear component organization
- It has a clear commit message
- It is submitted as a PR into `dev`

---

## 23. Current MVP Issue Plan

Follow the issue order unless the project owner says otherwise.

1. Bootstrap app shell and routing
2. Create child-friendly design system
3. Implement local learning state and progress tracking
4. Build Home Dashboard
5. Build Belajar Huruf module
6. Build Latihan Membaca module
7. Build soft leaderboard and points page
8. Build Profile and Accessibility Settings
9. Make app PWA-ready
10. Run MVP accessibility and usability QA

---

## 24. Agent Behavior Rules

When acting as a coding agent:

1. Read this file first.
2. Read the relevant GitHub issue.
3. Check existing files before creating new files.
4. Keep changes scoped to the current issue.
5. Do not refactor unrelated code.
6. Do not change package versions unless necessary.
7. Do not add heavy dependencies without asking.
8. Prefer accessible, simple, maintainable code.
9. Use Indonesian for user-facing UI text.
10. Use English for code names, variables, component names, and commit messages.
11. Always target PRs to `dev`, not `master`.
12. Never expose secrets.
13. Never add tracking or analytics without explicit approval.
14. Never make the app feel punitive to children.
15. Ask for clarification only if the task is truly ambiguous.

---

## 25. Safety and Privacy Notes

This is an educational app for children.

Do not add:

- Ads
- Dark patterns
- Public child profiles
- Public real names
- Unnecessary tracking
- Sensitive personal data fields
- Competitive ranking that can shame a child

If backend/auth is added later:

- Use child-safe privacy defaults.
- Keep parent/teacher controls separate.
- Store minimal data.
- Avoid collecting unnecessary personal information.

---

## 26. Product North Star

A child should be able to open Lentera Baca, tap one big friendly button, hear a clear sound, try a small reading activity, and feel encouraged.

If a proposed feature does not make the child feel safer, calmer, or more capable, reconsider it.
