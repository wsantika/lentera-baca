import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar — Orang Tua",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth pages render WITHOUT the AppShell (no bottom navigation)
  return <>{children}</>;
}
