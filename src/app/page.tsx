import Link from "next/link";
import { BookOpenText, Sparkles, Trophy, Type, UserRound } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";

const featureCards = [
  {
    title: "Belajar Huruf",
    description: "Kenali huruf besar dengan visual dan suara.",
    href: "/letters",
    icon: Type,
  },
  {
    title: "Latihan Membaca",
    description: "Dengarkan dan baca kalimat pendek.",
    href: "/reading",
    icon: BookOpenText,
  },
  {
    title: "Poin Ceria",
    description: "Lihat progres belajar dengan suasana lembut.",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "Profil",
    description: "Atur tampilan, audio, dan progress belajar.",
    href: "/profile",
    icon: UserRound,
  },
];

export default function HomePage() {
  return (
    <PageContainer
      eyebrow="Dashboard"
      title="Halo, Sobat Lentera!"
      description="Pilih aktivitas belajar yang paling nyaman untukmu hari ini."
    >
      <section className="grid gap-4 sm:grid-cols-2">
        {featureCards.map((feature) => {
          const Icon = feature.icon;

          return (
            <Link
              key={feature.href}
              href={feature.href}
              className="group rounded-[2rem] border border-orange-100 bg-white/85 p-5 shadow-sm shadow-orange-100/70 transition hover:-translate-y-0.5 hover:bg-amber-50 focus-visible:ring-4 focus-visible:ring-amber-300/60"
            >
              <div className="mb-5 flex size-14 items-center justify-center rounded-3xl bg-amber-200 text-amber-950 transition group-hover:scale-105">
                <Icon className="size-7" aria-hidden="true" />
              </div>

              <h2 className="text-xl font-bold text-foreground">
                {feature.title}
              </h2>
              <p className="mt-2 text-base leading-7 text-muted-foreground">
                {feature.description}
              </p>
            </Link>
          );
        })}
      </section>
    </PageContainer>
  );
}
