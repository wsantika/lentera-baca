"use client";

import { useEffect } from "react";

import { useLearningStore, type TextSize } from "@/lib/store/learning-store";

const textSizeClasses: Record<TextSize, string> = {
  normal: "text-size-normal",
  large: "text-size-large",
  "extra-large": "text-size-extra-large",
};

export function AccessibilitySettingsEffect() {
  const { state, isHydrated } = useLearningStore();

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const root = document.documentElement;
    const textSizeClassNames = Object.values(textSizeClasses);

    root.classList.remove(...textSizeClassNames);
    root.classList.add(textSizeClasses[state.settings.textSize]);
    root.classList.toggle("high-contrast", state.settings.highContrast);

    return () => {
      root.classList.remove(...textSizeClassNames);
      root.classList.remove("high-contrast");
    };
  }, [isHydrated, state.settings.highContrast, state.settings.textSize]);

  return null;
}
