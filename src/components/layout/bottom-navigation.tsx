"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, UserRound, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type NavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const navigationItems: NavigationItem[] = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/leaderboard",
    label: "Ranking",
    icon: Trophy,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: UserRound,
  },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]"
    >
      <div className="mx-auto max-w-md rounded-[2rem] border border-orange-100 bg-white/95 p-3 shadow-[0_12px_40px_rgba(209,118,17,0.12)] backdrop-blur-md">
        <ul className="grid grid-cols-3 gap-2">
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
                    "flex min-h-[72px] flex-col items-center justify-center gap-1 rounded-full px-3 py-2 text-center text-sm font-semibold transition",
                    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70",
                    isActive
                      ? "bg-orange-400 text-white shadow-sm"
                      : "text-zinc-500 hover:bg-orange-50 hover:text-zinc-800",
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
