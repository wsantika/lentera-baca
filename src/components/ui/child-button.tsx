import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { designConfig } from "@/config/design";

type ChildButtonVariant =
  | "primary"
  | "secondary"
  | "soft"
  | "success"
  | "gentle";
type ChildButtonSize = "default" | "large" | "icon";

type ChildButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ChildButtonVariant;
  size?: ChildButtonSize;
};

const variantClassName: Record<ChildButtonVariant, string> = {
  primary:
    "bg-amber-300 text-amber-950 shadow-sm shadow-amber-100 hover:bg-amber-400",
  secondary:
    "bg-white text-foreground border border-orange-100 shadow-sm shadow-orange-100/70 hover:bg-amber-50",
  soft: "bg-orange-100 text-orange-950 border border-orange-200 hover:bg-orange-200",
  success:
    "bg-emerald-100 text-emerald-950 border border-emerald-200 hover:bg-emerald-200",
  gentle: "bg-pink-100 text-pink-950 border border-pink-200 hover:bg-pink-200",
};

const sizeClassName: Record<ChildButtonSize, string> = {
  default: "min-h-14 px-5 py-3 text-base",
  large: "min-h-16 px-6 py-4 text-lg",
  icon: "size-14 p-0",
};

export function ChildButton({
  children,
  className,
  variant = "primary",
  size = "default",
  type = "button",
  ...props
}: ChildButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-3xl font-bold transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        "motion-reduce:transition-none motion-reduce:active:scale-100",
        designConfig.focusRing,
        variantClassName[variant],
        sizeClassName[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}