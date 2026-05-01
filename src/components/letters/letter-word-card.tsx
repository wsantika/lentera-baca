type LetterWordCardProps = {
  emoji: string;
  word: string;
};

export function LetterWordCard({ emoji, word }: LetterWordCardProps) {
  return (
    <section className="rounded-[2.5rem] bg-[#f1eee8] p-6 shadow-sm">
      <div className="mx-auto flex aspect-square max-w-[260px] items-center justify-center bg-white shadow-md sm:max-w-[300px]">
        <span className="text-[7rem] leading-none sm:text-[8rem]">{emoji}</span>
      </div>

      <p className="mt-6 text-center text-5xl font-extrabold tracking-[0.12em] text-zinc-600 sm:text-6xl">
        {word.toUpperCase()}
      </p>
    </section>
  );
}
