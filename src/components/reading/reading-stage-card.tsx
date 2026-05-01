"use client";

import { Volume2 } from "lucide-react";
import { motion } from "framer-motion";

type ReadingStageCardProps = {
  words: [string, string];
  imageEmoji: string;
  imageLabel: string;
  onListen: () => void;
  isSpeaking: boolean;
};

export function ReadingStageCard({
  words,
  imageEmoji,
  imageLabel,
  onListen,
  isSpeaking,
}: ReadingStageCardProps) {
  return (
    <section className="rounded-[2.75rem] bg-[#f1eee8] p-4 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {words.map((word) => (
          <div
            key={word}
            className="flex min-h-[92px] items-center justify-center rounded-[2rem] bg-white px-6 text-center text-4xl font-extrabold tracking-wide text-amber-800 shadow-sm sm:min-h-[110px] sm:text-5xl"
          >
            {word}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="flex aspect-square w-full max-w-[240px] items-center justify-center rounded-[2rem] bg-[#ece8e1] p-4 sm:max-w-[280px]">
          <div className="flex h-full w-full items-center justify-center rounded-[1.5rem] bg-white shadow-sm">
            <motion.span
              key={imageEmoji}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="text-[7rem] leading-none sm:text-[8rem]"
              role="img"
              aria-label={imageLabel}
            >
              {imageEmoji}
            </motion.span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <motion.button
          type="button"
          onClick={onListen}
          whileTap={{ scale: 0.97 }}
          animate={isSpeaking ? { scale: [1, 1.04, 1] } : { scale: 1 }}
          transition={
            isSpeaking
              ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.2 }
          }
          className="inline-flex min-h-[60px] items-center justify-center gap-3 rounded-full bg-amber-700 px-8 py-4 text-2xl font-bold text-white shadow-[0_12px_28px_rgba(180,97,16,0.22)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
        >
          <Volume2 className="size-6" aria-hidden="true" />
          <span>Dengarkan</span>
        </motion.button>
      </div>
    </section>
  );
}
