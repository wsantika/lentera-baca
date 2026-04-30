"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenText,
  Home,
  Trophy,
  Type,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type NavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const navigationItems: NavigationItem[] = [
  {
    href: "/",
    label: "Beranda",
    icon: Home,
  },
  {
    href: "/letters",
    label: "Huruf",
    icon: Type,
  },
  {
    href: "/reading",
    label: "Baca",
    icon: BookOpenText,
  },
  {
    href: "/leaderboard",
    label: "Poin",
    icon: Trophy,
  },
  {
    href: "/profile",
    label: "Profil",
    icon: UserRound,
  },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-orange-100/80 bg-background/90 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-2 backdrop-blur-md"
    >
      <div className="mx-auto max-w-5xl">
        <ul className="grid grid-cols-5 gap-1 rounded-[2rem] border border-orange-100 bg-white/90 p-2 shadow-lg shadow-orange-100/70">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex min-h-16 flex-col items-center justify-center gap-1 rounded-3xl px-2 py-2 text-center text-xs font-bold transition",
                    "focus-visible:ring-4 focus-visible:ring-amber-300/60",
                    isActive
                      ? "bg-amber-200 text-amber-950 shadow-sm"
                      : "text-muted-foreground hover:bg-amber-50 hover:text-foreground",
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
