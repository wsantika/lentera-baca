import type { ReactNode } from "react";

import { BottomNavigation } from "@/components/layout/bottom-navigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-[#f3f0ea]">
      <div className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col">
        <main className="flex-1 px-5 pb-32 pt-8 sm:px-8 sm:pt-10 lg:px-12 lg:pt-12">
          {children}
        </main>

        <BottomNavigation />
      </div>
    </div>
  );
}
