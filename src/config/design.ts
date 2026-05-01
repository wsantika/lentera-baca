export const designConfig = {
  appName: "Lentera Baca",
  radius: {
    card: "rounded-[2rem]",
    button: "rounded-3xl",
    panel: "rounded-[2.5rem]",
  },
  touchTarget: {
    minimum: "min-h-12",
    comfortable: "min-h-14",
    child: "min-h-16",
  },
  focusRing:
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  childText: "leading-relaxed tracking-[0.01em]",
} as const;

export const feedbackCopy = {
  success: {
    title: "Hebat!",
    description: "Kamu berhasil. Lanjut pelan-pelan, ya.",
  },
  gentle: {
    title: "Tidak apa-apa",
    description: "Yuk coba lagi dengan tenang.",
  },
  info: {
    title: "Dengarkan dulu",
    description: "Tekan tombol suara, lalu ikuti perlahan.",
  },
} as const;