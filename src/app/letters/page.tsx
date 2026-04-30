import { Type } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";

export default function LettersPage() {
  return (
    <PageContainer
      eyebrow="Belajar Huruf"
      title="Kenali huruf satu per satu"
      description="Modul huruf interaktif dengan suara dan gambar akan kita bangun di Issue #5."
    >
      <section className="rounded-[2rem] border border-orange-100 bg-white/85 p-6 text-center shadow-sm shadow-orange-100/70">
        <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-[2rem] bg-amber-200 text-amber-950">
          <Type className="size-10" aria-hidden="true" />
        </div>
        <p className="text-7xl font-bold tracking-tight text-foreground">Aa</p>
        <p className="mt-4 text-lg text-muted-foreground">
          Placeholder halaman belajar huruf.
        </p>
      </section>
    </PageContainer>
  );
}