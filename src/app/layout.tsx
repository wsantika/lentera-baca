import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";

import "./globals.css";

import { cookies } from "next/headers";
import { AppShell } from "@/components/layout/app-shell";
import { AppProviders } from "@/components/providers/app-providers";
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
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#fff8ed",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const activeChildId = cookieStore.get("lentera_active_child")?.value || null;
  return (
    <html
      lang="id"
      className={cn("h-full scroll-smooth", readableFont.variable)}
    >
      <body className="min-h-dvh antialiased">
        <AppProviders activeChildId={activeChildId}>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
