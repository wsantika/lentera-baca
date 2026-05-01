import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";

type LetterProgressHeaderProps = {
  completedCount: number;
  totalCount: number;
};

export function LetterProgressHeader({
  completedCount,
  totalCount,
}: LetterProgressHeaderProps) {
  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <Link
            href="/"
            className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full text-amber-800 transition hover:bg-orange-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
            aria-label="Kembali ke beranda"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </Link>

          <div className="min-w-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-amber-900">
              Learning Letters
            </h1>
            <p className="mt-1 text-lg font-semibold text-zinc-500">
              {completedCount}/{totalCount} huruf dipelajari
            </p>
          </div>
        </div>

        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-900 shadow-sm sm:size-14">
          <Star className="size-5 fill-current sm:size-6" aria-hidden="true" />
        </div>
      </div>

      <div className="h-4 overflow-hidden rounded-full bg-stone-300">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </section>
  );
}
