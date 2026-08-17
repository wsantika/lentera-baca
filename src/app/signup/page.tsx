import type { Metadata } from "next";

import { SignupPageContent } from "@/components/auth/signup-page-content";

export const metadata: Metadata = {
  title: "Daftar — Orang Tua / Pendamping",
  description:
    "Buat akun Lentera Baca untuk mulai mengelola profil anak dan memantau progres belajar.",
};

export default function SignupPage() {
  return <SignupPageContent />;
}
