import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[60dvh] max-w-xl flex-col items-center justify-center text-center">
      <p className="text-7xl font-bold" aria-hidden="true">
        🌙
      </p>
      <h1 className="mt-6 text-3xl font-bold">Halaman belum ditemukan</h1>
      <p className="mt-3 text-lg leading-7 text-muted-foreground">
        Tidak apa-apa. Yuk kembali ke beranda dan lanjut belajar pelan-pelan.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-3xl bg-amber-200 px-6 py-4 text-base font-bold text-amber-950 shadow-sm transition hover:bg-amber-300 focus-visible:ring-4 focus-visible:ring-amber-300/60"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
