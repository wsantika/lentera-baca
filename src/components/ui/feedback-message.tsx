import { CheckCircle2, Heart, Info, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type FeedbackVariant = "success" | "gentle" | "info" | "celebrate";

type FeedbackMessageProps = {
  title: string;
  description?: string;
  variant?: FeedbackVariant;
  className?: string;
};

const variantStyles = {
  success: {
    wrapper: "border-emerald-200 bg-emerald-50 text-emerald-950",
    icon: "bg-emerald-100 text-emerald-700",
    Icon: CheckCircle2,
  },
  gentle: {
    wrapper: "border-pink-200 bg-pink-50 text-pink-950",
    icon: "bg-pink-100 text-pink-700",
    Icon: Heart,
  },
  info: {
    wrapper: "border-sky-200 bg-sky-50 text-sky-950",
    icon: "bg-sky-100 text-sky-700",
    Icon: Info,
  },
  celebrate: {
    wrapper: "border-amber-200 bg-amber-50 text-amber-950",
    icon: "bg-amber-100 text-amber-700",
    Icon: Sparkles,
  },
} satisfies Record<
  FeedbackVariant,
  {
    wrapper: string;
    icon: string;
    Icon: typeof CheckCircle2;
  }
>;

export function FeedbackMessage({
  title,
  description,
  variant = "info",
  className,
}: FeedbackMessageProps) {
  const style = variantStyles[variant];
  const Icon = style.Icon;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-start gap-4 rounded-[2rem] border p-4",
        style.wrapper,
        className,
      )}
    >
      <div
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-2xl",
          style.icon,
        )}
        aria-hidden="true"
      >
        <Icon className="size-6" />
      </div>

      <div>
        <p className="text-lg font-bold">{title}</p>
        {description ? (
          <p className="mt-1 leading-7 opacity-85">{description}</p>
        ) : null}
      </div>
    </div>
  );
}