import { BookOpenText } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";

export default function ReadingPage() {
  return (
    <PageContainer
      eyebrow="Latihan Membaca"
      title="Baca kalimat pendek"
      description="Latihan mendengar, membaca, dan memilih jawaban akan kita bangun di Issue #6."
    >
      <section className="rounded-[2rem] border border-orange-100 bg-white/85 p-6 shadow-sm shadow-orange-100/70">
        <div className="mb-5 flex size-16 items-center justify-center rounded-[2rem] bg-sky-100 text-sky-700">
          <BookOpenText className="size-8" aria-hidden="true" />
        </div>
        <p className="text-2xl font-bold leading-relaxed text-foreground">
          Ibu membaca buku.
        </p>
        <p className="mt-4 text-lg text-muted-foreground">
          Placeholder halaman latihan membaca.
        </p>
      </section>
    </PageContainer>
  );
}
