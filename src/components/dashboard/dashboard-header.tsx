"use client";

type DashboardHeaderProps = {
  name: string;
  streak: number;
  points: number;
};

function getInitials(name: string) {
  const trimmed = name.trim();

  if (!trimmed) {
    return "S";
  }

  const parts = trimmed.split(" ").filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 1).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function DashboardHeader({
  name,
  streak,
  points,
}: DashboardHeaderProps) {
  const initials = getInitials(name);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-amber-200 text-sm font-bold text-amber-950 shadow-sm">
            {initials}
          </div>

          <div className="min-w-0">
            <p className="truncate text-2xl font-bold text-amber-900">
              Hi, {name}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4 rounded-full bg-white/70 px-4 py-3 shadow-sm shadow-orange-100/70">
          <div className="flex items-center gap-1 text-base font-bold text-amber-900">
            <span>{streak}</span>
            <span aria-hidden="true">🔥</span>
          </div>
          <div className="flex items-center gap-1 text-base font-bold text-amber-900">
            <span>{points}</span>
            <span aria-hidden="true">⭐</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl">
        <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-zinc-800 sm:text-6xl lg:text-7xl">
          Siap belajar
          <br />
          hari ini?
        </h1>
        <p className="mt-4 text-xl font-medium text-zinc-500 sm:text-2xl">
          Ayo lanjutkan petualanganmu!
        </p>
      </div>
    </section>
  );
}
