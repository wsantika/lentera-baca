"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { BookOpen, CheckCircle } from "lucide-react";

import { loginWithGoogle, signupWithEmail } from "@/lib/supabase/actions";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function SignupForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");

  // Show success message after signup
  if (message === "check_email") {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-[#f3f0ea] px-4 py-8">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-stone-800">
            Cek Email Kamu! 📧
          </h1>
          <p className="mt-3 text-sm text-stone-500">
            Kami telah mengirimkan tautan konfirmasi ke email kamu. Silakan buka
            email dan klik tautan tersebut untuk mengaktifkan akun.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-amber-600 hover:to-orange-600 hover:shadow-md active:scale-[0.98]"
          >
            Kembali ke halaman masuk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#f3f0ea] px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-stone-800">Buat Akun Baru</h1>
          <p className="mt-2 text-sm text-stone-500">
            Daftar sebagai orang tua atau pendamping untuk mulai mengelola
            profil anak
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            {error === "signup_failed"
              ? "Gagal mendaftar. Email mungkin sudah terdaftar."
              : "Terjadi kesalahan. Silakan coba lagi."}
          </div>
        )}

        {/* Auth Card */}
        <div className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-sm">
          {/* Google Login Button */}
          <form action={loginWithGoogle}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 shadow-sm transition-all hover:bg-stone-50 hover:shadow-md active:scale-[0.98]"
            >
              <GoogleIcon />
              Daftar dengan Google
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-stone-200" />
            <span className="text-xs text-stone-400">atau</span>
            <div className="h-px flex-1 bg-stone-200" />
          </div>

          {/* Email/Password Form */}
          <form action={signupWithEmail} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="mb-1.5 block text-sm font-medium text-stone-700"
              >
                Nama Lengkap
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="Nama lengkap Anda"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-800 outline-none transition-colors placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-stone-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="nama@email.com"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-800 outline-none transition-colors placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-stone-700"
              >
                Kata Sandi
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="Minimal 6 karakter"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-800 outline-none transition-colors placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-amber-600 hover:to-orange-600 hover:shadow-md active:scale-[0.98]"
            >
              Daftar
            </button>
          </form>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-stone-500">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-medium text-amber-600 underline-offset-4 hover:text-amber-700 hover:underline"
          >
            Masuk di sini
          </Link>
        </p>

        {/* Back to App */}
        <p className="mt-3 text-center text-sm text-stone-400">
          <Link
            href="/"
            className="underline-offset-4 hover:text-stone-600 hover:underline"
          >
            ← Kembali ke beranda
          </Link>
        </p>
      </div>
    </div>
  );
}

export function SignupPageContent() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
