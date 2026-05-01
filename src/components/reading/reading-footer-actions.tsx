"use client";

import { ArrowRight, RotateCcw } from "lucide-react";

type ReadingFooterActionsProps = {
  canContinue: boolean;
  onRetry: () => void;
  onContinue: () => void;
};

export function ReadingFooterActions({
  canContinue,
  onRetry,
  onContinue,
}: ReadingFooterActionsProps) {
  return (
    <section className="rounded-[2.25rem] border border-[#e7dbcc] bg-[#f5efe7] p-4 shadow-sm">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="flex min-h-[88px] flex-col items-center justify-center rounded-[1.75rem] text-zinc-500 transition hover:bg-[#ece5dc] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
        >
          <RotateCcw className="size-6" aria-hidden="true" />
          <span className="mt-2 text-xl font-medium">Ulangi</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          disabled={!canContinue}
          className="flex min-h-[88px] flex-col items-center justify-center rounded-full bg-gradient-to-r from-amber-700 to-orange-400 px-5 text-white shadow-sm transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowRight className="size-6" aria-hidden="true" />
          <span className="mt-2 text-xl font-bold">Lanjut</span>
        </button>
      </div>
    </section>
  );
}
