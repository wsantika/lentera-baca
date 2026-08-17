"use client";

import { useCallback, useEffect, useRef } from "react";
import type { LearningState, LearningSettings } from "@/lib/store/learning-store";

type SyncStatus = "idle" | "syncing" | "synced" | "error";

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

  useEffect(() => {
    activeChildIdRef.current = activeChildId;
    hasSyncedRef.current = false;
  }, [activeChildId]);

  useEffect(() => {
    if (!activeChildId || !isHydrated || hasSyncedRef.current) return;

    let cancelled = false;

    async function doInitialSync() {
      syncStatusRef.current = "syncing";

      try {
        const response = await fetch(`/api/sync?childId=${activeChildId}`);
        if (!response.ok) throw new Error("Failed to fetch progress");
        const { data: dbProgress } = await response.json();

        if (cancelled || !dbProgress) {
          syncStatusRef.current = "idle";
          return;
        }

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

        const localOnlyLetters = localState.completedLetters.filter(
          (l) => !dbProgress.completedLetters.includes(l)
        );
        const localOnlyReadings = localState.completedReadingIds.filter(
          (r) => !dbProgress.completedReadingIds.includes(r)
        );

        if (localOnlyLetters.length > 0 || localOnlyReadings.length > 0) {
          await fetch("/api/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "bulkSync",
              payload: {
                childId: activeChildId,
                data: {
                  completedLetters: localOnlyLetters,
                  completedReadingIds: localOnlyReadings,
                  points: 0,
                  settings: localState.settings as unknown as Record<string, unknown>,
                },
              },
            }),
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

  const syncLetter = useCallback(
    async (letter: string) => {
      const childId = activeChildIdRef.current;
      if (!childId) return;

      try {
        await fetch("/api/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "syncLetter",
            payload: { childId, letter },
          }),
        });
      } catch {
        // Silently fail
      }
    },
    []
  );

  const syncReading = useCallback(
    async (exerciseId: string) => {
      const childId = activeChildIdRef.current;
      if (!childId) return;

      try {
        await fetch("/api/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "syncReading",
            payload: { childId, exerciseId },
          }),
        });
      } catch {
        // Silently fail
      }
    },
    []
  );

  const syncStreak = useCallback(
    async (streakCount: number) => {
      const childId = activeChildIdRef.current;
      if (!childId) return;

      try {
        await fetch("/api/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "syncStreak",
            payload: { childId, streakCount },
          }),
        });
      } catch {
        // Silently fail
      }
    },
    []
  );

  const syncSettings = useCallback(
    async (settings: Partial<LearningSettings>) => {
      const childId = activeChildIdRef.current;
      if (!childId) return;

      try {
        await fetch("/api/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "syncSettings",
            payload: { childId, settings },
          }),
        });
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

