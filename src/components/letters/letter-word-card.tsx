import { Illustration } from "@/components/ui/illustration";

type LetterWordCardProps = {
  emoji: string;
  word: string;
  imagePath: string;
};

export function LetterWordCard({ emoji, word, imagePath }: LetterWordCardProps) {
  return (
    <section className="rounded-[2.5rem] bg-[#f1eee8] p-6 shadow-sm">
      <div className="mx-auto flex aspect-square max-w-[260px] items-center justify-center bg-white shadow-md sm:max-w-[300px]">
        <Illustration
          src={imagePath}
          alt={word}
          fallbackEmoji={emoji}
          className="w-full h-full rounded-none"
        />
      </div>

      <p className="mt-6 text-center text-5xl font-extrabold tracking-[0.12em] text-zinc-600 sm:text-6xl">
        {word.toUpperCase()}
      </p>
    </section>
  );
}
