import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageContainerProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function PageContainer({
  eyebrow,
  title,
  description,
  children,
  className,
}: PageContainerProps) {
  return (
    <div
      className={cn("mx-auto flex w-full max-w-4xl flex-col gap-6", className)}
    >
      <section className="rounded-[2rem] border border-orange-100 bg-white/80 p-5 shadow-sm shadow-orange-100/70 sm:p-6">
        {eyebrow ? (
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>

        {description ? (
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {description}
          </p>
        ) : null}
      </section>

      {children}
    </div>
  );
}