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
    <header className="flex items-center justify-between gap-2">
      <Link
        href="/"
        aria-label="Kembali ke beranda"
        className="flex size-10 shrink-0 items-center justify-center rounded-full text-amber-800 transition hover:bg-orange-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70 sm:size-11"
      >
        <ArrowLeft className="size-5 sm:size-6" aria-hidden="true" />
      </Link>

      <h1 className="min-w-0 truncate text-center text-lg font-extrabold tracking-tight text-amber-900 sm:text-xl md:text-2xl lg:text-3xl">
        Profil Saya
      </h1>

      <button
        type="button"
        aria-label="Pengaturan"
        className="flex size-10 shrink-0 items-center justify-center rounded-full text-amber-800 transition hover:bg-orange-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70 sm:size-11"
      >
        <Settings className="size-5 sm:size-6" aria-hidden="true" />
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
    <section className="flex flex-col items-center overflow-hidden text-center">
      <div className="relative">
        <div className="flex size-20 items-center justify-center rounded-full border-4 border-orange-400 bg-orange-200 text-3xl font-extrabold text-amber-950 shadow-sm sm:size-24 sm:text-4xl md:size-28 md:border-[5px] md:text-5xl lg:size-32 lg:border-[6px]">
          {getInitials(name)}
        </div>

        <div className="absolute -bottom-2 left-1/2 inline-flex min-h-6 -translate-x-1/2 items-center whitespace-nowrap rounded-full bg-green-700 px-3 text-[11px] font-extrabold text-white shadow-sm sm:min-h-7 sm:px-4 sm:text-xs md:min-h-8 md:px-5 md:text-sm">
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
        className="mt-5 w-full rounded-xl border-2 border-transparent bg-transparent px-2 py-1 text-center text-xl font-extrabold text-amber-900 outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-amber-300/50 sm:mt-6 sm:px-3 sm:py-1.5 sm:text-2xl md:mt-7 md:text-3xl lg:text-4xl"
        placeholder="Sobat Lentera"
      />

      <p className="mt-1 w-full truncate text-sm font-bold text-zinc-500 sm:text-base md:text-lg">
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
        "overflow-hidden rounded-2xl bg-[#f1eee8] p-4 shadow-sm sm:rounded-[2rem] sm:p-5 md:rounded-[2.5rem] md:p-6 lg:p-7",
        className,
      )}
    >
      <div className="mb-4 flex items-center gap-2 sm:mb-5 sm:gap-3 md:mb-6">
        <div className="shrink-0 text-amber-800">
          <span className="[&>svg]:size-5 sm:[&>svg]:size-6 md:[&>svg]:size-7 lg:[&>svg]:size-8">
            {icon}
          </span>
        </div>
        <h2 className="min-w-0 text-lg font-extrabold leading-tight text-amber-900 sm:text-xl md:text-2xl lg:text-3xl">
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
      <div className="mb-2 flex items-center justify-between gap-2 sm:mb-3">
        <p className="min-w-0 truncate text-sm font-extrabold text-zinc-700 sm:text-base md:text-lg">
          {label}
        </p>
        <p className="shrink-0 text-sm font-extrabold text-amber-800 sm:text-base md:text-lg">
          {value}
        </p>
      </div>

      <div
        className="h-3.5 overflow-hidden rounded-full bg-stone-300 sm:h-4 md:h-5"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safePercentage}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
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
      icon={<BookOpen aria-hidden="true" />}
      title="Progres Belajar"
    >
      <div className="space-y-4 sm:space-y-5 md:space-y-6">
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
        "flex min-h-10 flex-1 items-center justify-center rounded-full px-3 text-sm font-extrabold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70 sm:min-h-12 sm:px-4 sm:text-base md:min-h-14 md:text-lg",
        active
          ? "bg-orange-400 text-white shadow-[0_8px_16px_rgba(249,115,22,0.2)]"
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
      className="flex min-h-12 w-full items-center justify-between gap-2 rounded-full bg-white px-3 text-left shadow-sm transition hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70 sm:min-h-14 sm:gap-3 sm:px-4 md:min-h-16 md:px-5"
    >
      <span className="min-w-0 text-sm font-extrabold leading-tight text-zinc-700 sm:text-base md:text-lg">
        {label}
      </span>

      <span
        className={cn(
          "flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition sm:h-8 sm:w-14 sm:p-1 md:h-9 md:w-16",
          enabled ? "bg-amber-700" : "bg-stone-300",
        )}
      >
        <span
          className={cn(
            "size-6 rounded-full bg-white shadow-sm transition sm:size-6 md:size-7",
            enabled
              ? "translate-x-[18px] sm:translate-x-5 md:translate-x-[26px]"
              : "translate-x-0",
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
      icon={<SlidersHorizontal aria-hidden="true" />}
      title="Pengaturan Tampilan"
    >
      <div className="space-y-3 sm:space-y-4">
        <div>
          <p className="mb-2 text-sm font-extrabold text-zinc-700 sm:mb-3 sm:text-base md:text-lg">
            Ukuran Teks
          </p>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
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
          label="Mode Kontras Tinggi"
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
    <div className="flex min-h-12 items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-sm sm:min-h-16 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3 md:min-h-20 md:gap-4 md:rounded-[1.75rem] md:px-5 md:py-4">
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full sm:size-10 md:size-12",
          active ? "bg-amber-700 text-white" : "bg-stone-200 text-zinc-400",
        )}
      >
        {active ? (
          <Check className="size-4 sm:size-5 md:size-7" aria-hidden="true" />
        ) : null}
      </div>

      <p className="min-w-0 text-sm font-extrabold leading-relaxed text-zinc-700 sm:text-base md:text-lg">
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
        "flex min-h-9 flex-1 items-center justify-center rounded-full border-2 px-3 text-sm font-extrabold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70 sm:min-h-10 sm:px-4 sm:text-base md:min-h-12 md:text-lg",
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
      icon={<Heart aria-hidden="true" />}
      title="Preferensi Belajar"
    >
      <div className="space-y-3 sm:space-y-4">
        <PreferenceCheck
          label="Aktifkan suara saat belajar"
          active={autoAudio}
        />

        <div className="rounded-xl bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4 md:rounded-[1.75rem] md:p-5">
          <p className="mb-2 text-sm font-extrabold text-zinc-700 sm:mb-3 sm:text-base md:text-lg">
            Mode latihan
          </p>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
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
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-xl bg-white px-2 py-3 text-center shadow-sm sm:rounded-2xl sm:px-3 sm:py-4 md:rounded-[1.75rem] md:px-4 md:py-5 lg:rounded-[2rem] lg:px-5 lg:py-6">
      <div className="mb-2 text-amber-700 sm:mb-3">{icon}</div>
      <p className="w-full text-xs font-extrabold leading-snug text-zinc-600 sm:text-sm md:text-base">
        {label}
      </p>
    </div>
  );
}

function AchievementSection() {
  return (
    <ProfileSection
      icon={<Medal aria-hidden="true" />}
      title="Pencapaian"
    >
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        <AchievementTile
          icon={
            <Star
              className="size-6 fill-current sm:size-8 md:size-10"
              aria-hidden="true"
            />
          }
          label="Selesaikan 5 latihan"
        />
        <AchievementTile
          icon={
            <CalendarDays
              className="size-6 sm:size-8 md:size-10"
              aria-hidden="true"
            />
          }
          label="Belajar 3 hari"
        />
        <AchievementTile
          icon={
            <Trophy
              className="size-6 sm:size-8 md:size-10"
              aria-hidden="true"
            />
          }
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
      className="flex min-h-10 w-full items-center justify-between gap-2 rounded-full bg-white px-3 text-left text-sm font-extrabold text-zinc-700 shadow-sm transition hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70 sm:min-h-12 sm:px-4 sm:text-base md:min-h-14 md:px-5 md:text-lg lg:min-h-16 lg:px-6"
    >
      <span className="min-w-0 truncate">{label}</span>
      <ChevronRight
        className="size-4 shrink-0 text-amber-800 sm:size-5"
        aria-hidden="true"
      />
    </button>
  );
}

function HelpSection() {
  return (
    <ProfileSection
      icon={<CircleHelp aria-hidden="true" />}
      title="Bantuan"
    >
      <div className="space-y-2 sm:space-y-3">
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
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 overflow-hidden sm:max-w-lg sm:gap-5 md:max-w-xl md:gap-6 xl:max-w-6xl xl:gap-7">
      <ProfileTopBar />

      <div className="grid gap-4 sm:gap-5 md:gap-6 xl:grid-cols-[0.9fr_1.1fr] xl:items-start xl:gap-7">
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
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

        <div className="space-y-4 sm:space-y-5 md:space-y-6">
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
