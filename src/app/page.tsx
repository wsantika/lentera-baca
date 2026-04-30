import Link from "next/link";
import { BookOpenText, Trophy, Type, UserRound } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { ChildButton } from "@/components/ui/child-button";
import { ChildCard } from "@/components/ui/child-card";
import { FeedbackMessage } from "@/components/ui/feedback-message";
import { ProgressPill } from "@/components/ui/progress-pill";

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
      <section className="grid gap-4 sm:grid-cols-2" aria-label="Menu utama">
        {featureCards.map((feature) => {
          const Icon = feature.icon;

          return (
            <Link
              key={feature.href}
              href={feature.href}
              className="group rounded-[2rem] border border-orange-100 bg-white/85 p-5 shadow-sm shadow-orange-100/70 transition hover:-translate-y-0.5 hover:bg-amber-50 focus-visible:ring-4 focus-visible:ring-amber-300/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div className="mb-5 flex size-14 items-center justify-center rounded-3xl bg-amber-200 text-amber-950 transition group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
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

      <ChildCard tone="mint">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
              Design System
            </p>
            <h2 className="mt-2 text-2xl font-bold">Komponen ramah anak</h2>
            <p className="mt-2 leading-7 text-muted-foreground">
              Tombol besar, kartu lembut, dan feedback yang tidak membuat anak
              takut.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <ProgressPill label="Poin" value="0 bintang" />
            <ProgressPill label="Streak" value="Mulai hari ini" />
          </div>

          <FeedbackMessage
            variant="celebrate"
            title="Kamu hebat!"
            description="Belajar sedikit demi sedikit itu bagus."
          />

          <div className="flex flex-wrap gap-3">
            <ChildButton>Dengarkan</ChildButton>
            <ChildButton variant="secondary">Coba lagi</ChildButton>
          </div>
        </div>
      </ChildCard>
    </PageContainer>
  );
}
