import Link from "next/link";
import { BookOpenText, Home, WifiOff } from "lucide-react";

export const metadata = {
  title: "Offline | Lentera Baca",
  description: "Halaman offline Lentera Baca.",
};

export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-[70dvh] w-full max-w-xl flex-col items-center justify-center text-center">
      <div className="flex size-24 items-center justify-center rounded-[2rem] bg-orange-100 text-amber-800 shadow-sm">
        <WifiOff className="size-12" aria-hidden="true" />
      </div>

      <h1 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight text-amber-900">
        Kamu sedang offline
      </h1>

      <p className="mt-4 max-w-md text-lg font-semibold leading-relaxed text-zinc-500">
        Tidak apa-apa. Beberapa halaman yang sudah pernah dibuka masih bisa
        digunakan. Coba sambungkan internet lagi, ya.
      </p>

      <div className="mt-8 flex w-full max-w-sm flex-col gap-3 min-[380px]:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full bg-orange-400 px-6 text-base font-extrabold text-white shadow-sm transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
        >
          <Home className="size-5" aria-hidden="true" />
          Beranda
        </Link>

        <Link
          href="/letters"
          className="inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full bg-white px-6 text-base font-extrabold text-amber-900 shadow-sm transition hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70"
        >
          <BookOpenText className="size-5" aria-hidden="true" />
          Belajar
        </Link>
      </div>
    </main>
  );
}
