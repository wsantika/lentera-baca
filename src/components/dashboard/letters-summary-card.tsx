import Link from "next/link";
import { Play } from "lucide-react";

type LettersSummaryCardProps = {
  completedCount: number;
  totalCount: number;
  percentage: number;
  nextLetter: string;
};

export function LettersSummaryCard({
  completedCount,
  totalCount,
  percentage,
  nextLetter,
}: LettersSummaryCardProps) {
  return (
    <Link
      href="/letters"
      className="group block rounded-[2.5rem] bg-[#f7f6f4] p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-16 items-center justify-center rounded-full bg-orange-400 text-3xl font-bold text-white shadow-sm sm:size-20 sm:text-4xl">
          A
        </div>

        <div className="flex size-12 items-center justify-center rounded-full bg-white text-amber-800 shadow-sm">
          <Play className="size-5 fill-current" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-amber-900">
          Belajar Huruf
        </h2>

        <div className="mt-6 flex items-center justify-between gap-4 text-base font-semibold text-zinc-500">
          <p>
            Huruf dipelajari: {completedCount}/{totalCount}
          </p>
          <p>{percentage}%</p>
        </div>

        <div className="mt-3 h-4 overflow-hidden rounded-full bg-stone-300">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-700"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="mt-6 flex items-start gap-3">
          <span
            className="mt-2 size-2 shrink-0 rounded-full bg-green-600"
            aria-hidden="true"
          />
          <p className="text-xl font-bold text-zinc-800">
            Lanjutkan dari huruf {nextLetter}
          </p>
        </div>

        <p className="mt-6 text-lg text-zinc-400">Ketuk untuk mulai belajar</p>
      </div>
    </Link>
  );
}
