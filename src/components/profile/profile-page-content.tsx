"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Heart,
  Medal,
  Settings,
  SlidersHorizontal,
  Star,
  Trophy,
  UserRound,
} from "lucide-react";

import {
  useLearningStore,
  type LearningMode,
  type TextSize,
} from "@/lib/store/learning-store";
import { cn } from "@/lib/utils";

function getInitials(name: string) {
  const parts = name.trim().split(" ").filter(Boolean);

  if (parts.length === 0) {
    return "S";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 1).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function clampPercentage(value: number) {
  return Math.max(0, Math.min(100, value));
}

function ProfileTopBar() {
  return (
    <header className="flex items-center justify-between gap-4">
      <Link
        href="/"
        aria-label="Kembali ke beranda"
        className="flex size-11 items-center justify-center rounded-full text-amber-800 transition hover:bg-orange-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
      >
        <ArrowLeft className="size-6" aria-hidden="true" />
      </Link>

      <h1 className="text-center text-3xl font-extrabold tracking-tight text-amber-900 sm:text-4xl">
        Profil Saya
      </h1>

      <button
        type="button"
        aria-label="Pengaturan"
        className="flex size-11 items-center justify-center rounded-full text-amber-800 transition hover:bg-orange-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
      >
        <Settings className="size-6" aria-hidden="true" />
      </button>
    </header>
  );
}

function ProfileHero({
  name,
  points,
  onNameChange,
}: {
  name: string;
  points: number;
  onNameChange: (name: string) => void;
}) {
  return (
    <section className="flex flex-col items-center text-center">
      <div className="relative">
        <div className="flex size-32 items-center justify-center rounded-full border-[6px] border-orange-400 bg-orange-200 text-5xl font-extrabold text-amber-950 shadow-sm sm:size-36">
          {getInitials(name)}
        </div>

        <div className="absolute -bottom-3 left-1/2 inline-flex min-h-8 -translate-x-1/2 items-center rounded-full bg-green-700 px-5 text-base font-extrabold text-white shadow-sm">
          {points} poin
        </div>
      </div>

      <label className="sr-only" htmlFor="profile-name">
        Nama panggilan
      </label>
      <input
        id="profile-name"
        value={name}
        onChange={(event) => onNameChange(event.target.value)}
        maxLength={24}
        className="mt-8 w-full max-w-xs rounded-2xl border-2 border-transparent bg-transparent px-4 py-2 text-center text-4xl font-extrabold text-amber-900 outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-amber-300/50"
        placeholder="Sobat Lentera"
      />

      <p className="mt-1 text-xl font-bold text-zinc-500">
        Terus semangat belajar!
      </p>
    </section>
  );
}

function ProfileSection({
  icon,
  title,
  children,
  className,
}: {
  icon: ReactNode;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-[2.75rem] bg-[#f1eee8] p-6 shadow-sm sm:p-7",
        className,
      )}
    >
      <div className="mb-7 flex items-center gap-3">
        <div className="text-amber-800">{icon}</div>
        <h2 className="text-3xl font-extrabold leading-tight text-amber-900">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}

function ProgressBar({
  label,
  value,
  percentage,
  tone = "orange",
}: {
  label: string;
  value: string;
  percentage: number;
  tone?: "orange" | "green";
}) {
  const safePercentage = clampPercentage(percentage);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-xl font-extrabold text-zinc-700">{label}</p>
        <p className="text-xl font-extrabold text-amber-800">{value}</p>
      </div>

      <div
        className="h-5 overflow-hidden rounded-full bg-stone-300"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safePercentage}
      >
        <div
          className={cn(
            "h-full rounded-full",
            tone === "green"
              ? "bg-gradient-to-r from-green-700 to-lime-300"
              : "bg-gradient-to-r from-amber-700 to-orange-400",
          )}
          style={{ width: `${safePercentage}%` }}
        />
      </div>
    </div>
  );
}

function LearningProgressSection({
  completedLetters,
  completedReading,
}: {
  completedLetters: number;
  completedReading: number;
}) {
  return (
    <ProfileSection
      icon={<BookOpen className="size-8" aria-hidden="true" />}
      title="Progres Belajar"
    >
      <div className="space-y-7">
        <ProgressBar
          label="Huruf dipelajari"
          value={`${completedLetters}/26`}
          percentage={(completedLetters / 26) * 100}
        />

        <ProgressBar
          label="Latihan selesai"
          value={`${completedReading} soal`}
          percentage={(completedReading / 5) * 100}
          tone="green"
        />
      </div>
    </ProfileSection>
  );
}

function TextSizeButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex min-h-16 flex-1 items-center justify-center rounded-full px-5 text-lg font-extrabold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70",
        active
          ? "bg-orange-400 text-white shadow-[0_10px_20px_rgba(249,115,22,0.22)]"
          : "bg-white text-zinc-600 hover:bg-orange-50",
      )}
    >
      {label}
    </button>
  );
}

function TogglePill({
  label,
  enabled,
  onToggle,
}: {
  label: ReactNode;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      className="flex min-h-16 w-full items-center justify-between gap-4 rounded-full bg-white px-5 text-left shadow-sm transition hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
    >
      <span className="text-xl font-extrabold leading-tight text-zinc-700">
        {label}
      </span>

      <span
        className={cn(
          "flex h-10 w-16 shrink-0 items-center rounded-full p-1 transition",
          enabled ? "bg-amber-700" : "bg-stone-300",
        )}
      >
        <span
          className={cn(
            "size-8 rounded-full bg-white shadow-sm transition",
            enabled ? "translate-x-6" : "translate-x-0",
          )}
        />
      </span>
    </button>
  );
}

function DisplaySettingsSection({
  textSize,
  highContrast,
  autoAudio,
  onTextSizeChange,
  onToggleHighContrast,
  onToggleAutoAudio,
}: {
  textSize: TextSize;
  highContrast: boolean;
  autoAudio: boolean;
  onTextSizeChange: (value: TextSize) => void;
  onToggleHighContrast: () => void;
  onToggleAutoAudio: () => void;
}) {
  return (
    <ProfileSection
      icon={<SlidersHorizontal className="size-8" aria-hidden="true" />}
      title={
        <>
          Pengaturan
          <br />
          Tampilan
        </>
      }
    >
      <div className="space-y-5">
        <div>
          <p className="mb-4 text-xl font-extrabold text-zinc-700">
            Ukuran Teks
          </p>

          <div className="grid grid-cols-2 gap-4">
            <TextSizeButton
              label="Normal"
              active={textSize === "normal"}
              onClick={() => onTextSizeChange("normal")}
            />
            <TextSizeButton
              label="Besar"
              active={textSize === "large" || textSize === "extra-large"}
              onClick={() => onTextSizeChange("large")}
            />
          </div>
        </div>

        <TogglePill
          label={
            <>
              Mode Kontras
              <br />
              Tinggi
            </>
          }
          enabled={highContrast}
          onToggle={onToggleHighContrast}
        />

        <TogglePill
          label="Audio Otomatis"
          enabled={autoAudio}
          onToggle={onToggleAutoAudio}
        />
      </div>
    </ProfileSection>
  );
}

function PreferenceCheck({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) {
  return (
    <div className="flex min-h-20 items-center gap-4 rounded-[1.75rem] bg-white px-5 py-4 shadow-sm">
      <div
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-full",
          active ? "bg-amber-700 text-white" : "bg-stone-200 text-zinc-400",
        )}
      >
        {active ? <Check className="size-7" aria-hidden="true" /> : null}
      </div>

      <p className="text-xl font-extrabold leading-relaxed text-zinc-700">
        {label}
      </p>
    </div>
  );
}

function ModeButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex min-h-12 flex-1 items-center justify-center rounded-full border-2 px-5 text-lg font-extrabold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70",
        active
          ? "border-orange-400 bg-white text-zinc-700"
          : "border-transparent bg-stone-300 text-zinc-500",
      )}
    >
      {label}
    </button>
  );
}

function LearningPreferenceSection({
  autoAudio,
  learningMode,
  onModeChange,
}: {
  autoAudio: boolean;
  learningMode: LearningMode;
  onModeChange: (mode: LearningMode) => void;
}) {
  return (
    <ProfileSection
      icon={<Heart className="size-8" aria-hidden="true" />}
      title="Preferensi Belajar"
    >
      <div className="space-y-4">
        <PreferenceCheck
          label="Aktifkan suara saat belajar"
          active={autoAudio}
        />

        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
          <p className="mb-4 text-xl font-extrabold text-zinc-700">
            Mode latihan
          </p>

          <div className="grid grid-cols-2 gap-3">
            <ModeButton
              label="Mudah"
              active={learningMode === "easy"}
              onClick={() => onModeChange("easy")}
            />
            <ModeButton
              label="Sedang"
              active={learningMode === "medium"}
              onClick={() => onModeChange("medium")}
            />
          </div>
        </div>
      </div>
    </ProfileSection>
  );
}

function AchievementTile({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex min-h-[132px] min-w-[172px] flex-col items-center justify-center rounded-[2rem] bg-white px-5 py-6 text-center shadow-sm">
      <div className="mb-4 text-amber-700">{icon}</div>
      <p className="text-base font-extrabold leading-snug text-zinc-600">
        {label}
      </p>
    </div>
  );
}

function AchievementSection() {
  return (
    <ProfileSection
      icon={<Medal className="size-8" aria-hidden="true" />}
      title="Pencapaian"
    >
      <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-2">
        <AchievementTile
          icon={<Star className="size-10 fill-current" aria-hidden="true" />}
          label="Selesaikan 5 latihan"
        />
        <AchievementTile
          icon={<CalendarDays className="size-10" aria-hidden="true" />}
          label="Belajar 3 hari"
        />
        <AchievementTile
          icon={<Trophy className="size-10" aria-hidden="true" />}
          label="Berani mencoba"
        />
      </div>
    </ProfileSection>
  );
}

function HelpRow({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex min-h-16 w-full items-center justify-between rounded-full bg-white px-6 text-left text-xl font-extrabold text-zinc-700 shadow-sm transition hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
    >
      <span>{label}</span>
      <ChevronRight className="size-5 text-amber-800" aria-hidden="true" />
    </button>
  );
}

function HelpSection() {
  return (
    <ProfileSection
      icon={<CircleHelp className="size-8" aria-hidden="true" />}
      title="Bantuan"
    >
      <div className="space-y-4">
        <HelpRow label="Cara menggunakan aplikasi" />
        <HelpRow label="Tentang aplikasi" />
      </div>
    </ProfileSection>
  );
}

export function ProfilePageContent() {
  const { state, isHydrated, setName, updateSettings } = useLearningStore();

  const name = isHydrated ? state.name : "Anna";
  const points = isHydrated ? state.points : 120;
  const completedLetters = isHydrated ? state.completedLetters.length : 1;
  const completedReading = isHydrated ? state.completedReadingIds.length : 5;
  const settings = state.settings;

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-7 xl:max-w-6xl">
      <ProfileTopBar />

      <div className="grid gap-7 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
        <div className="space-y-7">
          <ProfileHero name={name} points={points} onNameChange={setName} />

          <LearningProgressSection
            completedLetters={completedLetters}
            completedReading={completedReading}
          />

          <DisplaySettingsSection
            textSize={settings.textSize}
            highContrast={settings.highContrast}
            autoAudio={settings.autoAudio}
            onTextSizeChange={(textSize) => updateSettings({ textSize })}
            onToggleHighContrast={() =>
              updateSettings({ highContrast: !settings.highContrast })
            }
            onToggleAutoAudio={() =>
              updateSettings({ autoAudio: !settings.autoAudio })
            }
          />
        </div>

        <div className="space-y-7">
          <LearningPreferenceSection
            autoAudio={settings.autoAudio}
            learningMode={settings.learningMode}
            onModeChange={(learningMode) => updateSettings({ learningMode })}
          />

          <AchievementSection />
          <HelpSection />
        </div>
      </div>
    </div>
  );
}
