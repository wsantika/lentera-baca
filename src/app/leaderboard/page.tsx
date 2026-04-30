import { Trophy } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";

export default function LeaderboardPage() {
  return (
    <PageContainer
      eyebrow="Poin Ceria"
      title="Progress yang menyenangkan"
      description="Halaman poin dan leaderboard lembut akan kita bangun di Issue #7."
    >
      <section className="rounded-[2rem] border border-orange-100 bg-white/85 p-6 shadow-sm shadow-orange-100/70">
        <div className="mb-5 flex size-16 items-center justify-center rounded-[2rem] bg-yellow-100 text-yellow-700">
          <Trophy className="size-8" aria-hidden="true" />
        </div>
        <p className="text-5xl font-bold text-foreground">0</p>
        <p className="mt-2 text-lg text-muted-foreground">
          Poin belajar akan tampil di sini.
        </p>
      </section>
    </PageContainer>
  );
}
