import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";

import "./globals.css";

import { AppShell } from "@/components/layout/app-shell";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const readableFont = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-readable",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "Santika" }],
  creator: "Santika",
  metadataBase: new URL("https://github.com/wsantika/lentera-baca"),
};

export const viewport: Viewport = {
  themeColor: "#fff8ed",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={cn("h-full scroll-smooth", readableFont.variable)}
    >
      <body className="min-h-dvh antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}