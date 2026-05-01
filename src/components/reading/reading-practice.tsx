"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { FeedbackMessage } from "@/components/ui/feedback-message";
import { readingExercises } from "@/lib/data/reading-exercises";
import { useSpeech } from "@/lib/hooks/use-speech";
import { useLearningStore } from "@/lib/store/learning-store";
import { ReadingFooterActions } from "./reading-footer-actions";
import { ReadingProgressHeader } from "./reading-progress-header";
import { ReadingQuestionCard } from "./reading-question-card";
import { ReadingStageCard } from "./reading-stage-card";

type FeedbackState = "idle" | "correct" | "incorrect";

function getWrappedIndex(index: number, total: number) {
  if (index < 0) {
    return total - 1;
  }

  if (index >= total) {
    return 0;
  }

  return index;
}

function getLevel(completedCount: number) {
  return Math.min(5, Math.floor(completedCount / 2) + 1);
}

export function ReadingPractice() {
  const { state, isHydrated, completeReadingExercise } = useLearningStore();
  const { speak, isSpeaking } = useSpeech();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>("idle");

  const firstIncompleteIndex = useMemo(() => {
    if (!isHydrated) {
      return 0;
    }

    const incompleteIndex = readingExercises.findIndex(
      (item) => !state.completedReadingIds.includes(item.id),
    );

    return incompleteIndex >= 0 ? incompleteIndex : 0;
  }, [isHydrated, state.completedReadingIds]);

  const currentIndex = selectedIndex ?? firstIncompleteIndex;
  const currentExercise = readingExercises[currentIndex];
  const completedCount = state.completedReadingIds.length;
  const level = getLevel(completedCount);

  const handleListen = useCallback(() => {
    speak(currentExercise.speechText, {
      lang: "id-ID",
      rate: 0.8,
      pitch: 1,
    });
  }, [currentExercise.speechText, speak]);

  const handleSelectOption = useCallback(
    (option: string) => {
      setSelectedOption(option);

      if (option === currentExercise.answer) {
        setFeedback("correct");
        completeReadingExercise(currentExercise.id);
      } else {
        setFeedback("incorrect");
      }
    },
    [completeReadingExercise, currentExercise.answer, currentExercise.id],
  );

  const handleRetry = useCallback(() => {
    setSelectedOption(null);
    setFeedback("idle");
    handleListen();
  }, [handleListen]);

  const handleContinue = useCallback(() => {
    const nextIndex = getWrappedIndex(
      currentIndex + 1,
      readingExercises.length,
    );

    setSelectedIndex(nextIndex);
    setSelectedOption(null);
    setFeedback("idle");
  }, [currentIndex]);

  useEffect(() => {
    if (!isHydrated || !state.settings.autoAudio) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      handleListen();
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [currentExercise.id, handleListen, isHydrated, state.settings.autoAudio]);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 xl:max-w-6xl">
      <ReadingProgressHeader
        completedCount={completedCount}
        totalCount={readingExercises.length}
        level={level}
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
        <ReadingStageCard
          words={currentExercise.words}
          imageEmoji={currentExercise.imageEmoji}
          imageLabel={currentExercise.imageLabel}
          onListen={handleListen}
          isSpeaking={isSpeaking}
        />

        <div className="space-y-5">
          <ReadingQuestionCard
            question={currentExercise.question}
            answer={currentExercise.answer}
            options={currentExercise.options}
            selectedOption={selectedOption}
            feedback={feedback}
            onSelect={handleSelectOption}
          />

          {feedback === "correct" ? (
            <FeedbackMessage
              variant="success"
              title="Hebat!"
              description="Jawabanmu benar. Yuk lanjut ke soal berikutnya."
            />
          ) : null}

          {feedback === "incorrect" ? (
            <FeedbackMessage
              variant="gentle"
              title="Belum tepat"
              description="Tidak apa-apa. Dengarkan lagi lalu coba pelan-pelan."
            />
          ) : null}
        </div>
      </div>

      <ReadingFooterActions
        canContinue={feedback === "correct"}
        onRetry={handleRetry}
        onContinue={handleContinue}
      />
    </div>
  );
}
