"use client";

import {
  BookOpenText,
  RotateCcw,
  Settings2,
  Sparkles,
  Star,
  Type,
} from "lucide-react";

import { ChildButton } from "@/components/ui/child-button";
import { ChildCard } from "@/components/ui/child-card";
import { FeedbackMessage } from "@/components/ui/feedback-message";
import { ProgressPill } from "@/components/ui/progress-pill";
import { useLearningStore, type TextSize } from "@/lib/store/learning-store";

const textSizeLabels: Record<TextSize, string> = {
  normal: "Normal",
  large: "Besar",
  "extra-large": "Sangat besar",
};

const textSizeOrder: TextSize[] = ["normal", "large", "extra-large"];

export function LearningStatePreview() {
  const {
    state,
    isHydrated,
    addPoints,
    completeLetter,
    completeReadingExercise,
    updateSettings,
    resetProgress,
  } = useLearningStore();

  function handleCycleTextSize() {
    const currentIndex = textSizeOrder.indexOf(state.settings.textSize);
    const nextTextSize =
      textSizeOrder[(currentIndex + 1) % textSizeOrder.length];

    updateSettings({
      textSize: nextTextSize,
    });
  }

  return (
    <ChildCard tone="sky">
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-700">
            Local State
          </p>
          <h2 className="mt-2 text-2xl font-bold">
            Progress tersimpan di perangkat
          </h2>
          <p className="mt-2 leading-7 text-muted-foreground">
            Kartu ini untuk menguji points, streak, progress huruf, latihan, dan
            pengaturan aksesibilitas.
          </p>
        </div>

        {!isHydrated ? (
          <FeedbackMessage
            variant="info"
            title="Memuat progress"
            description="Sebentar ya, progress sedang disiapkan."
          />
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <ProgressPill
                icon={<Star className="size-5" />}
                label="Poin"
                value={`${state.points} bintang`}
              />
              <ProgressPill
                icon={<Sparkles className="size-5" />}
                label="Streak"
                value={`${state.streak} hari`}
              />
              <ProgressPill
                icon={<Type className="size-5" />}
                label="Huruf selesai"
                value={`${state.completedLetters.length} huruf`}
              />
              <ProgressPill
                icon={<BookOpenText className="size-5" />}
                label="Latihan selesai"
                value={`${state.completedReadingIds.length} latihan`}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <ChildButton onClick={() => addPoints(5)}>
                Tambah 5 poin
              </ChildButton>

              <ChildButton
                variant="secondary"
                onClick={() => completeLetter("A")}
              >
                Tandai huruf A
              </ChildButton>

              <ChildButton
                variant="secondary"
                onClick={() => completeReadingExercise("demo-reading-1")}
              >
                Tandai latihan
              </ChildButton>

              <ChildButton variant="gentle" onClick={resetProgress}>
                <RotateCcw className="size-5" aria-hidden="true" />
                Reset progress
              </ChildButton>
            </div>

            <div className="rounded-[2rem] border border-sky-100 bg-white/80 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Settings2 className="size-5 text-sky-700" aria-hidden="true" />
                <h3 className="font-bold">Tes settings</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                <ChildButton variant="soft" onClick={handleCycleTextSize}>
                  Teks: {textSizeLabels[state.settings.textSize]}
                </ChildButton>

                <ChildButton
                  variant={state.settings.highContrast ? "success" : "soft"}
                  onClick={() =>
                    updateSettings({
                      highContrast: !state.settings.highContrast,
                    })
                  }
                >
                  Kontras: {state.settings.highContrast ? "Aktif" : "Mati"}
                </ChildButton>

                <ChildButton
                  variant={state.settings.autoAudio ? "success" : "soft"}
                  onClick={() =>
                    updateSettings({
                      autoAudio: !state.settings.autoAudio,
                    })
                  }
                >
                  Audio otomatis: {state.settings.autoAudio ? "Aktif" : "Mati"}
                </ChildButton>
              </div>
            </div>

            <FeedbackMessage
              variant="success"
              title="Coba refresh halaman"
              description="Poin, progress, dan settings harus tetap tersimpan."
            />
          </>
        )}
      </div>
    </ChildCard>
  );
}
