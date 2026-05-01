"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardTipCard } from "@/components/dashboard/dashboard-tip-card";
import { LettersSummaryCard } from "@/components/dashboard/letters-summary-card";
import { ReadingSummaryCard } from "@/components/dashboard/reading-summary-card";
import { useLearningStore } from "@/lib/store/learning-store";

const TOTAL_LETTERS = 26;
const TOTAL_READING_EXERCISES = 10;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function clampPercentage(value: number) {
  return Math.max(0, Math.min(100, value));
}

function getNextLetter(completedLetters: string[]) {
  const completedSet = new Set(
    completedLetters.map((item) => item.toUpperCase()),
  );
  return ALPHABET.find((letter) => !completedSet.has(letter)) ?? "A";
}

function getReadingLevel(completedCount: number) {
  return Math.min(5, Math.floor(completedCount / 2) + 1);
}

export function HomeDashboard() {
  const { state, isHydrated } = useLearningStore();

  const userName = state.name?.trim() || "Anna";
  const lettersCompleted = state.completedLetters.length;
  const readingCompleted = state.completedReadingIds.length;

  const lettersPercentage = clampPercentage(
    Math.round((lettersCompleted / TOTAL_LETTERS) * 100),
  );

  const readingPercentage = clampPercentage(
    Math.round((readingCompleted / TOTAL_READING_EXERCISES) * 100),
  );

  const nextLetter = getNextLetter(state.completedLetters);
  const readingLevel = getReadingLevel(readingCompleted);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <DashboardHeader
        name={isHydrated ? userName : "Anna"}
        streak={isHydrated ? state.streak : 7}
        points={isHydrated ? state.points : 120}
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <LettersSummaryCard
          completedCount={isHydrated ? lettersCompleted : 1}
          totalCount={TOTAL_LETTERS}
          percentage={isHydrated ? lettersPercentage : 5}
          nextLetter={isHydrated ? nextLetter : "A"}
        />

        <ReadingSummaryCard
          completedCount={isHydrated ? readingCompleted : 5}
          totalCount={TOTAL_READING_EXERCISES}
          percentage={isHydrated ? readingPercentage : 50}
          level={isHydrated ? readingLevel : 3}
        />

        <div className="lg:col-span-2">
          <DashboardTipCard />
        </div>
      </section>
    </div>
  );
}
