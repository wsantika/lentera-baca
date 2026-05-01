import type { ReactNode } from "react";

import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { SkipLink } from "@/components/layout/skip-link";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-[#f3f0ea]">
      <SkipLink />

      <div className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col overflow-x-hidden">
        <main
          id="main-content"
          className="w-full min-w-0 flex-1 overflow-x-hidden px-4 pb-32 pt-6 sm:px-8 sm:pt-10 lg:px-12 lg:pt-12"
        >
          {children}
        </main>

        <BottomNavigation />
      </div>
    </div>
  );
}
