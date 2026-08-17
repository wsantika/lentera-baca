export type ReadingExercise = {
  id: string;
  words: [string, string];
  imageEmoji: string;
  imageLabel: string;
  question: string;
  options: [string, string];
  answer: string;
  speechText: string;
  imagePath: string;
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
    imagePath: "/images/reading/reading-1.jpg",
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
    imagePath: "/images/reading/reading-2.jpg",
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
    imagePath: "/images/reading/reading-3.jpg",
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
    imagePath: "/images/reading/reading-4.jpg",
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
    imagePath: "/images/reading/reading-5.jpg",
  },
];
