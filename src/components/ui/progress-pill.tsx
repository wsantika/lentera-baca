import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ProgressPillProps = {
  icon?: ReactNode;
  label: string;
  value: string | number;
  className?: string;
};

export function ProgressPill({
  icon,
  label,
  value,
  className,
}: ProgressPillProps) {
  return (
    <div
      className={cn(
        "flex min-h-16 items-center gap-3 rounded-3xl border border-orange-100 bg-white/85 px-4 py-3 shadow-sm shadow-orange-100/70",
        className,
      )}
    >
      {icon ? (
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-800"
          aria-hidden="true"
        >
          {icon}
        </div>
      ) : null}

      <div className="min-w-0">
        <p className="text-sm font-bold text-muted-foreground">{label}</p>
        <p className="truncate text-xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}
