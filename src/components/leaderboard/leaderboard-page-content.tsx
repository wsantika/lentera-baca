"use client";

import Link from "next/link";
import { ArrowLeft, Bell, Rocket, Star, Trophy } from "lucide-react";

import {
  leaderboardPeople,
  type LeaderboardPerson,
} from "@/lib/data/leaderboard";
import { useLearningStore } from "@/lib/store/learning-store";
import { cn } from "@/lib/utils";

type RankedPerson = LeaderboardPerson & {
  rank: number;
  isCurrentUser?: boolean;
};

function getInitial(name: string) {
  return name.trim().slice(0, 1).toUpperCase() || "S";
}

function getAvatarClassName(rank: number, isCurrentUser?: boolean) {
  if (isCurrentUser) {
    return "bg-orange-200 text-orange-950";
  }

  if (rank === 1) {
    return "bg-orange-100 text-orange-900";
  }

  if (rank === 2) {
    return "bg-sky-100 text-sky-900";
  }

  if (rank === 3) {
    return "bg-lime-100 text-lime-900";
  }

  return "bg-zinc-900 text-white";
}

function getCurrentUserRankList(ranking: RankedPerson[]) {
  const lowerRanking = ranking.slice(3);
  const visibleItems = lowerRanking.slice(0, 4);
  const currentUser = ranking.find((item) => item.isCurrentUser);

  if (!currentUser) {
    return visibleItems;
  }

  const alreadyVisible = visibleItems.some(
    (item) => item.id === currentUser.id,
  );

  if (alreadyVisible || currentUser.rank <= 3) {
    return visibleItems;
  }

  return [...visibleItems.slice(0, 3), currentUser];
}

function PointsHeader() {
  return (
    <header className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <Link
          href="/"
          aria-label="Kembali ke beranda"
          className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f1eee8] text-amber-800 transition hover:bg-orange-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
        >
          <ArrowLeft className="size-6" aria-hidden="true" />
        </Link>

        <div>
          <h1 className="text-3xl font-extrabold leading-none tracking-tight text-amber-900 sm:text-4xl">
            Poinmu
          </h1>
          <p className="mt-2 max-w-xs text-base font-semibold leading-snug text-zinc-500 sm:text-lg">
            Terus belajar untuk mendapatkan poin!
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label="Notifikasi"
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-amber-800 transition hover:bg-orange-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
      >
        <Bell className="size-5" aria-hidden="true" />
      </button>
    </header>
  );
}

function PointsRing({ points }: { points: number }) {
  const maxVisualPoints = 200;
  const actualProgress = Math.min(
    100,
    Math.round((points / maxVisualPoints) * 100),
  );
  const visualProgress = points > 0 ? Math.max(8, actualProgress) : 0;

  return (
    <section className="relative flex justify-center py-8 sm:py-10">
      <div
        role="progressbar"
        aria-label="Total poin"
        aria-valuemin={0}
        aria-valuemax={maxVisualPoints}
        aria-valuenow={Math.min(points, maxVisualPoints)}
        className="relative flex size-64 items-center justify-center rounded-full shadow-sm sm:size-72"
        style={{
          background: `conic-gradient(#ff8726 ${visualProgress}%, #e7e0d6 ${visualProgress}% 100%)`,
        }}
      >
        <div className="flex size-[13.5rem] flex-col items-center justify-center rounded-full border border-stone-200 bg-white shadow-inner sm:size-60">
          <p className="text-6xl font-extrabold leading-none text-amber-800 sm:text-7xl">
            {points}
          </p>
          <p className="mt-3 text-2xl font-extrabold uppercase tracking-[0.35em] text-zinc-500">
            Poin
          </p>
        </div>
      </div>

      <Star
        className="absolute right-4 top-14 size-8 fill-[#c08b5b] text-[#c08b5b] sm:right-20"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-10 right-14 text-3xl text-[#c9ad82] sm:right-28"
        aria-hidden="true"
      >
        ✨
      </span>
    </section>
  );
}

function RankingTitle() {
  return (
    <div className="flex items-center gap-3">
      <Trophy className="size-7 text-amber-800" aria-hidden="true" />
      <h2 className="text-3xl font-extrabold text-amber-900">Peringkat</h2>
    </div>
  );
}

function PodiumAvatar({
  item,
  size = "default",
}: {
  item: RankedPerson;
  size?: "default" | "large";
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border-4 border-white font-extrabold shadow-sm",
        getAvatarClassName(item.rank, item.isCurrentUser),
        size === "large" ? "size-16 text-2xl" : "size-12 text-lg",
      )}
    >
      {getInitial(item.name)}
    </div>
  );
}

function TopThreePodium({ ranking }: { ranking: RankedPerson[] }) {
  const first = ranking[0];
  const second = ranking[1];
  const third = ranking[2];

  if (!first || !second || !third) {
    return null;
  }

  return (
    <section className="grid grid-cols-3 items-end gap-3">
      <PodiumSideCard item={second} />
      <PodiumWinnerCard item={first} />
      <PodiumSideCard item={third} />
    </section>
  );
}

function PodiumWinnerCard({ item }: { item: RankedPerson }) {
  return (
    <div className="relative flex min-h-[230px] flex-col items-center justify-end rounded-full bg-gradient-to-b from-orange-400 to-amber-700 px-4 pb-6 text-center text-white shadow-[0_18px_35px_rgba(180,97,16,0.25)]">
      <div className="absolute right-3 top-5 flex size-9 items-center justify-center rounded-full bg-orange-200 text-orange-600">
        <Star className="size-5 fill-current" aria-hidden="true" />
      </div>

      <PodiumAvatar item={item} size="large" />

      <div className="mt-4">
        <p className="text-2xl font-extrabold">{item.name}</p>
        <p className="mt-1 text-lg font-bold text-orange-100">
          {item.points} Poin
        </p>
      </div>

      <div className="absolute left-1/2 top-[96px] flex size-9 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-yellow-400 text-sm font-extrabold text-amber-900">
        {item.rank}
      </div>
    </div>
  );
}

function PodiumSideCard({ item }: { item: RankedPerson }) {
  return (
    <div className="relative flex min-h-[170px] flex-col items-center justify-end rounded-full bg-[#f1eee8] px-3 pb-6 text-center shadow-sm">
      <PodiumAvatar item={item} />

      <div className="absolute left-1/2 top-[72px] flex size-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-stone-200 text-sm font-extrabold text-zinc-600">
        {item.rank}
      </div>

      <div className="mt-4">
        <p className="text-lg font-extrabold text-zinc-800">{item.name}</p>
        <p className="mt-1 text-sm font-extrabold text-amber-900">
          {item.points} Poin
        </p>
      </div>
    </div>
  );
}

function RankingList({ items }: { items: RankedPerson[] }) {
  return (
    <section className="space-y-4">
      {items.map((item) => (
        <RankingRow key={`${item.id}-${item.rank}`} item={item} />
      ))}
    </section>
  );
}

function RankingRow({ item }: { item: RankedPerson }) {
  return (
    <div
      className={cn(
        "relative flex min-h-[84px] items-center gap-4 rounded-full p-4 shadow-sm",
        item.isCurrentUser
          ? "border-2 border-orange-200 bg-orange-50"
          : "bg-white",
      )}
    >
      {item.isCurrentUser ? (
        <span
          className="absolute left-0 top-1/2 h-10 w-1.5 -translate-y-1/2 rounded-full bg-orange-400"
          aria-hidden="true"
        />
      ) : null}

      <div className="w-8 shrink-0 text-center text-xl font-extrabold text-zinc-500">
        {item.rank}
      </div>

      <div
        className={cn(
          "relative flex size-12 shrink-0 items-center justify-center rounded-full text-lg font-extrabold",
          getAvatarClassName(item.rank, item.isCurrentUser),
        )}
      >
        {getInitial(item.name)}

        {item.isCurrentUser ? (
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-green-700 px-2 py-0.5 text-[0.6rem] font-extrabold text-white">
            KAMU
          </span>
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xl font-extrabold text-zinc-800">
          {item.name}
        </p>
        {item.isCurrentUser ? (
          <p className="mt-1 truncate text-sm font-semibold text-zinc-500">
            Lagi semangat!
          </p>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-1 text-xl font-extrabold text-amber-800">
        <span>{item.points}</span>
        <Star className="size-5 fill-current" aria-hidden="true" />
      </div>
    </div>
  );
}

function RankingBoostCard() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-[#e4ddd2] p-6 shadow-sm sm:p-8">
      <div className="relative z-10 max-w-[14rem]">
        <h2 className="text-2xl font-extrabold leading-tight text-amber-900">
          Mau naik
          <br />
          peringkat?
        </h2>

        <p className="mt-4 text-lg font-medium leading-relaxed text-zinc-600">
          Selesaikan tantangan harian untuk mendapatkan 2x poin lebih banyak
          hari ini!
        </p>

        <Link
          href="/letters"
          className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-amber-700 px-7 text-lg font-extrabold text-white shadow-sm transition hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
        >
          Mulai Belajar
        </Link>
      </div>

      <div
        className="absolute -bottom-12 -right-10 size-40 rounded-full bg-orange-100"
        aria-hidden="true"
      />
      <Rocket
        className="absolute bottom-20 right-10 size-20 rotate-[-20deg] fill-orange-400 text-orange-400 sm:size-24"
        aria-hidden="true"
      />
    </section>
  );
}

export function LeaderboardPageContent() {
  const { state, isHydrated } = useLearningStore();

  const currentUser: LeaderboardPerson & { isCurrentUser: boolean } = {
    id: "current-user",
    name: isHydrated ? state.name : "Anna",
    points: isHydrated ? state.points : 120,
    note: "Lagi semangat!",
    isCurrentUser: true,
  };

  const ranking: RankedPerson[] = [...leaderboardPeople, currentUser]
    .sort((a, b) => b.points - a.points)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

  const points = currentUser.points;
  const listItems = getCurrentUserRankList(ranking);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-8 xl:max-w-6xl">
      <PointsHeader />

      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
        <div className="space-y-8">
          <PointsRing points={points} />

          <div className="hidden xl:block">
            <RankingBoostCard />
          </div>
        </div>

        <div className="space-y-7">
          <RankingTitle />
          <TopThreePodium ranking={ranking} />
          <RankingList items={listItems} />

          <div className="xl:hidden">
            <RankingBoostCard />
          </div>
        </div>
      </div>
    </div>
  );
}
