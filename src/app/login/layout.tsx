import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk — Orang Tua",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth pages render WITHOUT the AppShell (no bottom navigation)
  return <>{children}</>;
}
