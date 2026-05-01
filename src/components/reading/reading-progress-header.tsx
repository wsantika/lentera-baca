import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type ReadingProgressHeaderProps = {
  completedCount: number;
  totalCount: number;
  level: number;
};

export function ReadingProgressHeader({
  completedCount,
  totalCount,
  level,
}: ReadingProgressHeaderProps) {
  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Link
            href="/"
            className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full text-amber-800 transition hover:bg-orange-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
            aria-label="Kembali ke beranda"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </Link>

          <div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-amber-900 sm:text-4xl">
              Latihan
              <br />
              Membaca
            </h1>
          </div>
        </div>

        <div className="inline-flex min-h-[48px] items-center rounded-full bg-[#e7e2db] px-5 text-xl font-bold text-amber-800 shadow-sm">
          Level {level}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between gap-3 text-lg font-semibold">
          <p className="text-zinc-500">Progres Belajar</p>
          <p className="text-amber-900">
            {completedCount}/{totalCount} soal
          </p>
        </div>

        <div
          className="h-4 overflow-hidden rounded-full bg-stone-300"
          role="progressbar"
          aria-label="Progres latihan membaca"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-700 to-orange-400"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </section>
  );
}
