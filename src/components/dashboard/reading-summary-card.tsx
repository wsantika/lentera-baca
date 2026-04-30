import Link from "next/link";
import { ArrowRight, BookMarked } from "lucide-react";

type ReadingSummaryCardProps = {
  completedCount: number;
  totalCount: number;
  percentage: number;
  level: number;
};

export function ReadingSummaryCard({
  completedCount,
  totalCount,
  percentage,
  level,
}: ReadingSummaryCardProps) {
  return (
    <Link
      href="/reading"
      className="group block rounded-[2.5rem] bg-[#f1eee8] p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/70 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-16 items-center justify-center rounded-full bg-lime-400 text-emerald-950 shadow-sm sm:size-20">
          <BookMarked className="size-8" aria-hidden="true" />
        </div>

        <div className="flex size-12 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm">
          <ArrowRight className="size-5" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="max-w-[12rem] text-3xl font-extrabold leading-tight tracking-tight text-emerald-950">
            Latihan
            <br />
            Membaca
          </h2>

          <span className="inline-flex items-center rounded-full bg-green-800 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white">
            Level {level}
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 text-base font-semibold text-green-700">
          <p>{completedCount} soal selesai</p>
          <p>{percentage}%</p>
        </div>

        <div className="mt-3 h-4 overflow-hidden rounded-full bg-stone-300">
          <div
            className="h-full rounded-full bg-gradient-to-r from-green-700 to-lime-400"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="mt-6 text-lg text-zinc-400">Ketuk untuk latihan</p>
      </div>
    </Link>
  );
}
