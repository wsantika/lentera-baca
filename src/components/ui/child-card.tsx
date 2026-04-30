import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ChildCardTone = "warm" | "sky" | "mint" | "pink" | "violet" | "plain";

type ChildCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  tone?: ChildCardTone;
  interactive?: boolean;
};

const toneClassName: Record<ChildCardTone, string> = {
  warm: "border-orange-100 bg-white/85 shadow-orange-100/70",
  sky: "border-sky-100 bg-sky-50/90 shadow-sky-100/70",
  mint: "border-emerald-100 bg-emerald-50/90 shadow-emerald-100/70",
  pink: "border-pink-100 bg-pink-50/90 shadow-pink-100/70",
  violet: "border-violet-100 bg-violet-50/90 shadow-violet-100/70",
  plain: "border-border bg-card shadow-orange-100/40",
};

export function ChildCard({
  children,
  className,
  tone = "warm",
  interactive = false,
  ...props
}: ChildCardProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border p-5 shadow-sm sm:p-6",
        toneClassName[tone],
        interactive &&
          "transition hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}