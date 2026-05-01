export type ReadingExercise = {
  id: string;
  words: [string, string];
  imageEmoji: string;
  imageLabel: string;
  question: string;
  options: [string, string];
  answer: string;
  speechText: string;
};

export const readingExercises: ReadingExercise[] = [
  {
    id: "reading-1",
    words: ["Ini", "bola"],
    imageEmoji: "⚽",
    imageLabel: "Bola",
    question: 'Mana kata "bola"?',
    options: ["bola", "ini"],
    answer: "bola",
    speechText: "Ini bola.",
  },
  {
    id: "reading-2",
    words: ["Itu", "apel"],
    imageEmoji: "🍎",
    imageLabel: "Apel",
    question: 'Mana kata "apel"?',
    options: ["apel", "itu"],
    answer: "apel",
    speechText: "Itu apel.",
  },
  {
    id: "reading-3",
    words: ["Ini", "buku"],
    imageEmoji: "📘",
    imageLabel: "Buku",
    question: 'Mana kata "buku"?',
    options: ["ini", "buku"],
    answer: "buku",
    speechText: "Ini buku.",
  },
  {
    id: "reading-4",
    words: ["Itu", "ikan"],
    imageEmoji: "🐟",
    imageLabel: "Ikan",
    question: 'Mana kata "ikan"?',
    options: ["ikan", "itu"],
    answer: "ikan",
    speechText: "Itu ikan.",
  },
  {
    id: "reading-5",
    words: ["Ini", "topi"],
    imageEmoji: "🎩",
    imageLabel: "Topi",
    question: 'Mana kata "topi"?',
    options: ["ini", "topi"],
    answer: "topi",
    speechText: "Ini topi.",
  },
];
