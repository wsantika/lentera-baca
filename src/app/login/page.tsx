import type { Metadata } from "next";

import { LoginPageContent } from "@/components/auth/login-page-content";

export const metadata: Metadata = {
  title: "Masuk — Orang Tua / Pendamping",
  description:
    "Masuk ke akun Lentera Baca untuk mengelola profil anak dan memantau progres belajar.",
};

export default function LoginPage() {
  return <LoginPageContent />;
}
