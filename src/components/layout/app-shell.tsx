import type { ReactNode } from "react";
import { BookOpenText } from "lucide-react";

import { siteConfig } from "@/config/site";
import { BottomNavigation } from "@/components/layout/bottom-navigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-[radial-gradient(circle_at_top_left,#fff7d6_0,#fff8ed_36%,#fef7ff_100%)]">
      <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col">
        <header className="sticky top-0 z-30 border-b border-orange-100/80 bg-background/85 px-4 py-3 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <div
              className="flex size-11 items-center justify-center rounded-2xl bg-amber-200 text-amber-950 shadow-sm"
              aria-hidden="true"
            >
              <BookOpenText className="size-6" />
            </div>

            <div className="min-w-0">
              <p className="text-lg font-bold tracking-tight text-foreground">
                {siteConfig.name}
              </p>
              <p className="truncate text-sm text-muted-foreground">
                Belajar membaca dengan nyaman
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 pb-28 pt-5 sm:px-6 sm:pb-32">
          {children}
        </main>

        <BottomNavigation />
      </div>
    </div>
  );
}
