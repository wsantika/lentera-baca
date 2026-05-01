import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type ReadingQuestionCardProps = {
  question: string;
  answer: string;
  options: [string, string];
  selectedOption: string | null;
  feedback: "idle" | "correct" | "incorrect";
  onSelect: (option: string) => void;
};

export function ReadingQuestionCard({
  question,
  answer,
  options,
  selectedOption,
  feedback,
  onSelect,
}: ReadingQuestionCardProps) {
  return (
    <section className="space-y-5">
      <h2 className="text-center text-[2rem] font-extrabold leading-tight tracking-tight text-zinc-800 sm:text-[2.35rem] lg:text-left">
        Mana kata <span className="text-amber-800">&quot;{answer}&quot;</span>?
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === answer;
          const showCorrectStyle = feedback === "correct" && isCorrect;
          const showIncorrectStyle =
            feedback === "incorrect" && isSelected && !isCorrect;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={cn(
                "relative flex min-h-[108px] items-center justify-center rounded-[2rem] border-2 px-6 text-center text-[2rem] font-extrabold lowercase shadow-sm transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70",
                "motion-reduce:transition-none",
                showCorrectStyle
                  ? "border-green-700 bg-[#dfe6d8] text-green-800"
                  : showIncorrectStyle
                    ? "border-amber-400 bg-amber-50 text-amber-800"
                    : "border-transparent bg-white text-zinc-500 hover:border-stone-300",
              )}
              aria-pressed={isSelected}
              aria-label={`${question} ${option}`}
            >
              {showCorrectStyle ? (
                <span className="absolute -right-2 -top-2 flex size-10 items-center justify-center rounded-full bg-green-700 text-white shadow-sm">
                  <Check className="size-5" aria-hidden="true" />
                </span>
              ) : null}

              <span>{option}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
