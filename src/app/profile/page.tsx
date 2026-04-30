import { UserRound } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";

export default function ProfilePage() {
  return (
    <PageContainer
      eyebrow="Profil"
      title="Atur pengalaman belajar"
      description="Pengaturan ukuran teks, kontras tinggi, audio otomatis, dan progress akan kita bangun di Issue #8."
    >
      <section className="rounded-[2rem] border border-orange-100 bg-white/85 p-6 shadow-sm shadow-orange-100/70">
        <div className="mb-5 flex size-16 items-center justify-center rounded-[2rem] bg-violet-100 text-violet-700">
          <UserRound className="size-8" aria-hidden="true" />
        </div>
        <p className="text-2xl font-bold text-foreground">Sobat Lentera</p>
        <p className="mt-2 text-lg text-muted-foreground">
          Placeholder halaman profil dan aksesibilitas.
        </p>
      </section>
    </PageContainer>
  );
}
