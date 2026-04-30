"use client";

import type { ReactNode } from "react";

import { AccessibilitySettingsEffect } from "@/components/providers/accessibility-settings-effect";
import { LearningStoreProvider } from "@/lib/store/learning-store";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LearningStoreProvider>
      <AccessibilitySettingsEffect />
      {children}
    </LearningStoreProvider>
  );
}
