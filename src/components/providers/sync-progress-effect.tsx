"use client";

import { useEffect, useRef } from "react";
import { useLearningStore } from "@/lib/store/learning-store";
import { useSyncProgress } from "@/lib/hooks/use-sync-progress";

/**
 * Invisible component that orchestrates sync between localStorage and Supabase.
 * Must be rendered inside LearningStoreProvider.
 *
 * - On mount: triggers initial DB fetch & merge via useSyncProgress.
 * - On state changes: detects new completed letters/readings and syncs them.
 */
export function SyncProgressEffect() {
  const {
    state,
    isHydrated,
    activeChildId,
    mergeFromDB,
  } = useLearningStore();

  const { syncLetter, syncReading, syncSettings } = useSyncProgress(
    activeChildId,
    state,
    isHydrated,
    mergeFromDB
  );

  // Track previous state to detect deltas
  const prevStateRef = useRef(state);

  useEffect(() => {
    if (!activeChildId || !isHydrated) return;

    const prev = prevStateRef.current;
    prevStateRef.current = state;

    // Detect newly completed letters
    const newLetters = state.completedLetters.filter(
      (l) => !prev.completedLetters.includes(l)
    );
    for (const letter of newLetters) {
      syncLetter(letter);
    }

    // Detect newly completed reading exercises
    const newReadings = state.completedReadingIds.filter(
      (r) => !prev.completedReadingIds.includes(r)
    );
    for (const readingId of newReadings) {
      syncReading(readingId);
    }

    // Detect settings changes
    if (JSON.stringify(state.settings) !== JSON.stringify(prev.settings)) {
      syncSettings(state.settings);
    }
  }, [state, activeChildId, isHydrated, syncLetter, syncReading, syncSettings]);

  // We don't render anything — this is a side-effect-only component.
  return null;
}
