"use client";

import type { ReactNode } from "react";

import { AccessibilitySettingsEffect } from "@/components/providers/accessibility-settings-effect";
import { ServiceWorkerRegister } from "@/components/providers/service-worker-register";
import { SyncProgressEffect } from "@/components/providers/sync-progress-effect";
import { LearningStoreProvider } from "@/lib/store/learning-store";

export function AppProviders({ 
  children,
  activeChildId,
}: { 
  children: ReactNode;
  activeChildId?: string | null;
}) {
  return (
    <LearningStoreProvider activeChildId={activeChildId}>
      <AccessibilitySettingsEffect />
      <ServiceWorkerRegister />
      <SyncProgressEffect />
      {children}
    </LearningStoreProvider>
  );
}

