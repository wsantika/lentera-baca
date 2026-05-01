"use client";

import { ArrowLeft, ArrowRight, Grid2x2 } from "lucide-react";

type LetterBottomBarProps = {
  onPrevious: () => void;
  onNext: () => void;
};

export function LetterBottomBar({ onPrevious, onNext }: LetterBottomBarProps) {
  return (
    <section className="rounded-[2.25rem] border border-[#e7dbcc] bg-[#f5efe7] p-4 shadow-sm">
      <div className="grid grid-cols-3 items-center gap-3">
        <button
          type="button"
          onClick={onPrevious}
          className="flex min-h-[76px] flex-col items-center justify-center rounded-[1.5rem] text-amber-800 transition hover:bg-orange-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
          <span className="mt-1 text-lg font-semibold">Previous</span>
        </button>

        <button
          type="button"
          className="flex min-h-[76px] flex-col items-center justify-center rounded-full bg-orange-400 px-4 text-white shadow-sm"
          aria-pressed="true"
        >
          <Grid2x2 className="size-5" aria-hidden="true" />
          <span className="mt-1 text-lg font-bold">Alphabet</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="flex min-h-[76px] flex-col items-center justify-center rounded-[1.5rem] text-amber-800 transition hover:bg-orange-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
        >
          <ArrowRight className="size-5" aria-hidden="true" />
          <span className="mt-1 text-lg font-semibold">Next</span>
        </button>
      </div>
    </section>
  );
}
