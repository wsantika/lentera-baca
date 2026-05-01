"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { LetterActions } from "@/components/letters/letter-actions";
import { LetterBottomBar } from "@/components/letters/letter-bottom-bar";
import { LetterProgressHeader } from "@/components/letters/letter-progress-header";
import { LetterStage } from "@/components/letters/letter-stage";
import { LetterWordCard } from "@/components/letters/letter-word-card";
import { letters } from "@/lib/data/letters";
import { useSpeech } from "@/lib/hooks/use-speech";
import { useLearningStore } from "@/lib/store/learning-store";

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
  const { state, isHydrated, completeLetter } = useLearningStore();
  const { isSpeaking, speak } = useSpeech();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const firstIncompleteIndex = useMemo(() => {
    if (!isHydrated) {
      return 0;
    }

    const incompleteIndex = letters.findIndex(
      (item) => !state.completedLetters.includes(item.letter),
    );

    return incompleteIndex >= 0 ? incompleteIndex : 0;
  }, [isHydrated, state.completedLetters]);

  const currentIndex = selectedIndex ?? firstIncompleteIndex;
  const currentLetter = letters[currentIndex];

  const previousIndex = getWrappedIndex(currentIndex - 1, letters.length);
  const nextIndex = getWrappedIndex(currentIndex + 1, letters.length);

  const previousLetter = letters[previousIndex];
  const nextLetter = letters[nextIndex];

  const completedCount = state.completedLetters.length;

  const previousLabel = `${previousLetter.letter} - ${previousLetter.word.toUpperCase()}`;
  const nextLabel = `${nextLetter.letter} - ${nextLetter.word.toUpperCase()}`;

  const handleSpeak = useCallback(() => {
    setSelectedIndex(currentIndex);
    completeLetter(currentLetter.letter);
    speak(currentLetter.speechText);
  }, [
    completeLetter,
    currentIndex,
    currentLetter.letter,
    currentLetter.speechText,
    speak,
  ]);

  const handlePrevious = useCallback(() => {
    setSelectedIndex(getWrappedIndex(currentIndex - 1, letters.length));
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    setSelectedIndex(getWrappedIndex(currentIndex + 1, letters.length));
  }, [currentIndex]);

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
      <LetterProgressHeader
        completedCount={completedCount}
        totalCount={letters.length}
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
