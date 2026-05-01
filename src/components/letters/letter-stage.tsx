"use client";

import { Volume2 } from "lucide-react";
import { motion } from "framer-motion";

type LetterStageProps = {
  letter: string;
  syllables: string;
  onSpeak: () => void;
};

export function LetterStage({ letter, syllables, onSpeak }: LetterStageProps) {
  return (
    <motion.button
      type="button"
      onClick={onSpeak}
      whileTap={{ scale: 0.985 }}
      className="block w-full rounded-[2.75rem] bg-[#f3e6d8] p-3 text-left shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
    >
      <div className="rounded-[2.5rem] bg-[#fbfaf8] px-4 py-8 sm:px-6 sm:py-10">
        <motion.div
          key={letter}
          initial={{ opacity: 0, scale: 0.92, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-center text-[7rem] font-extrabold leading-none tracking-tight text-amber-800 sm:text-[8.5rem] lg:text-[9rem]"
        >
          {letter}
        </motion.div>

        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-[#ece6df] px-5 py-3 text-2xl font-bold text-zinc-800 shadow-sm">
            <Volume2 className="size-5 text-amber-700" aria-hidden="true" />
            <span>{syllables}</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
