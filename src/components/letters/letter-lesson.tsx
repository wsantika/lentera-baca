"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { LetterActions } from "@/components/letters/letter-actions";
import { LetterBottomBar } from "@/components/letters/letter-bottom-bar";
import { LetterProgressHeader } from "@/components/letters/letter-progress-header";
import { LetterStage } from "@/components/letters/letter-stage";
import { LetterWordCard } from "@/components/letters/letter-word-card";
import { learningModules } from "@/lib/data/learning-modules";
import { useAudioPlayer } from "@/lib/hooks/use-audio-player";
import { useLearningStore } from "@/lib/store/learning-store";
import { getLetterAudioPath } from "@/config/audio";

function getWrappedIndex(index: number, total: number) {
  if (index < 0) {
    return total - 1;
  }

  if (index >= total) {
    return 0;
  }

  return index;
}

export function LetterLesson() {
  const { state, isHydrated, completeModule } = useLearningStore();
  const { isSpeaking, speak } = useAudioPlayer();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(1);

  const filteredModules = useMemo(
    () => learningModules.filter((m) => m.level === selectedLevel),
    [selectedLevel]
  );

  const firstIncompleteIndex = useMemo(() => {
    if (!isHydrated) {
      return 0;
    }

    const incompleteIndex = filteredModules.findIndex(
      (item) => !state.completedLetters.includes(item.id),
    );

    return incompleteIndex >= 0 ? incompleteIndex : 0;
  }, [isHydrated, state.completedLetters, filteredModules]);

  const currentIndex = selectedIndex ?? firstIncompleteIndex;
  const currentLetter = filteredModules[currentIndex];

  const previousIndex = getWrappedIndex(currentIndex - 1, filteredModules.length);
  const nextIndex = getWrappedIndex(currentIndex + 1, filteredModules.length);

  const previousLetter = filteredModules[previousIndex];
  const nextLetter = filteredModules[nextIndex];

  const completedCount = filteredModules.filter(m => state.completedLetters.includes(m.id)).length;

  const previousLabel = `${previousLetter.letter} - ${previousLetter.word.toUpperCase()}`;
  const nextLabel = `${nextLetter.letter} - ${nextLetter.word.toUpperCase()}`;

  const handleSpeak = useCallback(() => {
    setSelectedIndex(currentIndex);
    
    // Level 1 = 5, Level 2 = 10, Level 3 = 15 points
    const earnedPoints = currentLetter.level * 5;
    completeModule(currentLetter.id, earnedPoints);
    
    speak(
      getLetterAudioPath(currentLetter.letter), // Still using .letter for audio path fallback? We might need to generate audio for syllables/words later!
      currentLetter.speechText
    );
  }, [
    completeModule,
    currentIndex,
    currentLetter.id,
    currentLetter.level,
    currentLetter.letter,
    currentLetter.speechText,
    speak,
  ]);

  const handlePrevious = useCallback(() => {
    setSelectedIndex(getWrappedIndex(currentIndex - 1, filteredModules.length));
  }, [currentIndex, filteredModules.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex(getWrappedIndex(currentIndex + 1, filteredModules.length));
  }, [currentIndex, filteredModules.length]);

  useEffect(() => {
    if (!isHydrated || !state.settings.autoAudio) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      handleSpeak();
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [currentIndex, handleSpeak, isHydrated, state.settings.autoAudio]);

  const helperText = useMemo(() => {
    if (!isHydrated) {
      return "Memuat progress belajar...";
    }

    return "Ketuk huruf atau tombol audio untuk mendengarkan.";
  }, [isHydrated]);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 xl:max-w-6xl">
      <div className="flex w-full overflow-x-auto gap-2 p-2 rounded-2xl bg-white shadow-sm border border-stone-100">
        {[1, 2, 3].map((lvl) => (
          <button
            key={lvl}
            onClick={() => {
              setSelectedLevel(lvl as 1 | 2 | 3);
              setSelectedIndex(0);
            }}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition whitespace-nowrap ${
              selectedLevel === lvl
                ? "bg-amber-500 text-white shadow-sm"
                : "bg-stone-50 text-stone-500 hover:bg-stone-100"
            }`}
          >
            Level {lvl}: {lvl === 1 ? "Huruf" : lvl === 2 ? "Suku Kata" : "Kata"}
          </button>
        ))}
      </div>

      <LetterProgressHeader
        completedCount={completedCount}
        totalCount={filteredModules.length}
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
        <div className="space-y-6">
          <LetterStage
            letter={currentLetter.letter}
            syllables={currentLetter.syllables}
            onSpeak={handleSpeak}
          />

          <p className="text-center text-lg font-medium text-zinc-500 xl:text-left">
            {helperText}
          </p>
        </div>

        <div className="space-y-6">
          <LetterWordCard
            emoji={currentLetter.emoji}
            word={currentLetter.word}
          />

          <LetterActions
            previousLabel={previousLabel}
            nextLabel={nextLabel}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSpeak={handleSpeak}
            isSpeaking={isSpeaking}
          />
        </div>
      </div>

      <LetterBottomBar onPrevious={handlePrevious} onNext={handleNext} />
    </div>
  );
}
