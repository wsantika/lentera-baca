"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  fetchChildProgress,
  syncLetterComplete,
  syncReadingComplete,
  syncStreakBonus,
  syncAccessibilitySettings,
  bulkSyncProgress,
} from "@/lib/supabase/sync";
import type { LearningState, LearningSettings } from "@/lib/store/learning-store";

type SyncStatus = "idle" | "syncing" | "synced" | "error";

/**
 * Hook that handles bidirectional sync between localStorage and Supabase.
 * 
 * - On mount (when activeChildId exists): fetches DB state and merges with local.
 * - Exposes sync functions that can be called after local state mutations.
 * - Gracefully degrades: if no activeChildId or offline, sync is a no-op.
 */
export function useSyncProgress(
  activeChildId: string | null | undefined,
  localState: LearningState,
  isHydrated: boolean,
  onMergeFromDB: (dbState: {
    completedLetters: string[];
    completedReadingIds: string[];
    points: number;
    name: string;
  }) => void
) {
  const syncStatusRef = useRef<SyncStatus>("idle");
  const hasSyncedRef = useRef(false);
  const activeChildIdRef = useRef(activeChildId);

  // Track activeChildId changes
  useEffect(() => {
    activeChildIdRef.current = activeChildId;
    hasSyncedRef.current = false;
  }, [activeChildId]);

  // Initial sync: fetch from DB and merge with local state
  useEffect(() => {
    if (!activeChildId || !isHydrated || hasSyncedRef.current) return;

    let cancelled = false;

    async function doInitialSync() {
      syncStatusRef.current = "syncing";

      try {
        const dbProgress = await fetchChildProgress(activeChildId!);

        if (cancelled || !dbProgress) {
          syncStatusRef.current = "idle";
          return;
        }

        // Merge strategy: union of local + DB (DB wins for points if higher)
        const mergedLetters = Array.from(
          new Set([
            ...localState.completedLetters,
            ...dbProgress.completedLetters,
          ])
        );

        const mergedReadings = Array.from(
          new Set([
            ...localState.completedReadingIds,
            ...dbProgress.completedReadingIds,
          ])
        );

        const mergedPoints = Math.max(localState.points, dbProgress.points);

        onMergeFromDB({
          completedLetters: mergedLetters,
          completedReadingIds: mergedReadings,
          points: mergedPoints,
          name: dbProgress.name || localState.name,
        });

        // If local has data that DB doesn't, push it up
        const localOnlyLetters = localState.completedLetters.filter(
          (l) => !dbProgress.completedLetters.includes(l)
        );
        const localOnlyReadings = localState.completedReadingIds.filter(
          (r) => !dbProgress.completedReadingIds.includes(r)
        );

        if (localOnlyLetters.length > 0 || localOnlyReadings.length > 0) {
          await bulkSyncProgress(activeChildId!, {
            completedLetters: localOnlyLetters,
            completedReadingIds: localOnlyReadings,
            points: 0, // Don't double-count points
            settings: localState.settings as unknown as Record<string, unknown>,
          });
        }

        syncStatusRef.current = "synced";
        hasSyncedRef.current = true;
      } catch {
        syncStatusRef.current = "error";
      }
    }

    doInitialSync();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChildId, isHydrated]);

  // Sync individual letter completion
  const syncLetter = useCallback(
    async (letter: string) => {
      const childId = activeChildIdRef.current;
      if (!childId) return;

      try {
        await syncLetterComplete(childId, letter);
      } catch {
        // Silently fail — localStorage is the fallback
      }
    },
    []
  );

  // Sync individual reading exercise completion
  const syncReading = useCallback(
    async (exerciseId: string) => {
      const childId = activeChildIdRef.current;
      if (!childId) return;

      try {
        await syncReadingComplete(childId, exerciseId);
      } catch {
        // Silently fail — localStorage is the fallback
      }
    },
    []
  );

  // Sync streak bonus
  const syncStreak = useCallback(
    async (streakCount: number) => {
      const childId = activeChildIdRef.current;
      if (!childId) return;

      try {
        await syncStreakBonus(childId, streakCount);
      } catch {
        // Silently fail
      }
    },
    []
  );

  // Sync settings update
  const syncSettings = useCallback(
    async (settings: Partial<LearningSettings>) => {
      const childId = activeChildIdRef.current;
      if (!childId) return;

      try {
        await syncAccessibilitySettings(
          childId,
          settings as Record<string, unknown>
        );
      } catch {
        // Silently fail
      }
    },
    []
  );

  return {
    syncLetter,
    syncReading,
    syncStreak,
    syncSettings,
  };
}
