"use client";

import { ArrowLeft, ArrowRight, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

type LetterActionsProps = {
  previousLabel: string;
  nextLabel: string;
  onPrevious: () => void;
  onNext: () => void;
  onSpeak: () => void;
  isSpeaking: boolean;
};

export function LetterActions({
  previousLabel,
  nextLabel,
  onPrevious,
  onNext,
  onSpeak,
  isSpeaking,
}: LetterActionsProps) {
  return (
    <section className="flex flex-col items-center gap-6">
      <motion.button
        type="button"
        onClick={onSpeak}
        whileTap={{ scale: 0.96 }}
        animate={isSpeaking ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={
          isSpeaking
            ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.2 }
        }
        className="flex size-24 items-center justify-center rounded-full bg-gradient-to-b from-amber-700 to-orange-500 text-white shadow-[0_12px_28px_rgba(180,97,16,0.25)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
        aria-label="Dengarkan huruf"
      >
        <Volume2 className="size-9" aria-hidden="true" />
      </motion.button>

      <div className="grid w-full gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={onPrevious}
          className="flex min-h-[104px] flex-col items-center justify-center rounded-[2rem] bg-[#e7e2db] px-4 py-4 text-center shadow-sm transition hover:bg-[#dfd8cf] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
        >
          <ArrowLeft className="size-7 text-amber-800" aria-hidden="true" />
          <span className="mt-2 text-lg font-extrabold tracking-[0.08em] text-amber-800">
            {previousLabel}
          </span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="flex min-h-[104px] flex-col items-center justify-center rounded-[2rem] bg-orange-400 px-4 py-4 text-center text-white shadow-sm transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
        >
          <ArrowRight className="size-7" aria-hidden="true" />
          <span className="mt-2 text-lg font-extrabold tracking-[0.08em]">
            {nextLabel}
          </span>
        </button>
      </div>
    </section>
  );
}
