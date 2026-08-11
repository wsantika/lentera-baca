"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Fetch all progress data for a child from the database.
 * Returns aggregated state that can be merged with localStorage.
 */
export async function fetchChildProgress(childId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Fetch letter progress
  const { data: letters } = await supabase
    .from("letter_progress")
    .select("letter, completed")
    .eq("child_id", childId)
    .eq("completed", true);

  // Fetch reading progress
  const { data: readings } = await supabase
    .from("reading_progress")
    .select("exercise_id, completed")
    .eq("child_id", childId)
    .eq("completed", true);

  // Fetch total points
  const { data: pointsData } = await supabase
    .from("point_events")
    .select("points")
    .eq("child_id", childId);

  const totalPoints = pointsData?.reduce((sum, row) => sum + row.points, 0) ?? 0;

  // Fetch accessibility settings from child profile
  const { data: childProfile } = await supabase
    .from("child_profiles")
    .select("accessibility_settings, display_name")
    .eq("id", childId)
    .single();

  return {
    completedLetters: letters?.map((l) => l.letter) ?? [],
    completedReadingIds: readings?.map((r) => r.exercise_id) ?? [],
    points: totalPoints,
    name: childProfile?.display_name ?? "Sobat Lentera",
    settings: childProfile?.accessibility_settings ?? null,
  };
}

/**
 * Sync a completed letter to the database.
 * Uses upsert to avoid duplicates (unique constraint on child_id + letter).
 */
export async function syncLetterComplete(childId: string, letter: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false };

  const now = new Date().toISOString();

  // Upsert letter progress
  const { error: letterError } = await supabase
    .from("letter_progress")
    .upsert(
      {
        child_id: childId,
        letter: letter.toUpperCase(),
        completed: true,
        completed_at: now,
      },
      { onConflict: "child_id,letter" }
    );

  if (letterError) {
    console.error("syncLetterComplete error:", letterError);
    return { success: false };
  }

  // Log point event
  await supabase.from("point_events").insert({
    child_id: childId,
    event_type: "letter_complete",
    points: 5,
    description: `Menyelesaikan huruf ${letter.toUpperCase()}`,
  });

  return { success: true };
}

/**
 * Sync a completed reading exercise to the database.
 * Uses upsert to avoid duplicates (unique constraint on child_id + exercise_id).
 */
export async function syncReadingComplete(
  childId: string,
  exerciseId: string,
  score: number = 100,
  level: string = "easy"
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false };

  const now = new Date().toISOString();

  // Upsert reading progress
  const { error: readingError } = await supabase
    .from("reading_progress")
    .upsert(
      {
        child_id: childId,
        exercise_id: exerciseId,
        level,
        score,
        completed: true,
        completed_at: now,
      },
      { onConflict: "child_id,exercise_id" }
    );

  if (readingError) {
    console.error("syncReadingComplete error:", readingError);
    return { success: false };
  }

  // Log point event
  await supabase.from("point_events").insert({
    child_id: childId,
    event_type: "reading_complete",
    points: 10,
    description: `Menyelesaikan latihan membaca: ${exerciseId}`,
  });

  return { success: true };
}

/**
 * Sync a streak bonus to the database.
 */
export async function syncStreakBonus(childId: string, streakCount: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false };

  const bonusPoints = streakCount >= 7 ? 15 : streakCount >= 3 ? 10 : 5;

  await supabase.from("point_events").insert({
    child_id: childId,
    event_type: "streak_bonus",
    points: bonusPoints,
    description: `Streak ${streakCount} hari berturut-turut!`,
  });

  return { success: true };
}

/**
 * Sync accessibility settings to the child_profiles table.
 */
export async function syncAccessibilitySettings(
  childId: string,
  settings: Record<string, unknown>
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false };

  const { error } = await supabase
    .from("child_profiles")
    .update({ accessibility_settings: settings })
    .eq("id", childId)
    .eq("parent_id", user.id);

  if (error) {
    console.error("syncAccessibilitySettings error:", error);
    return { success: false };
  }

  return { success: true };
}

/**
 * Bulk sync: migrate all local progress data to the database.
 * Used when a child profile is first connected or when doing a full sync.
 */
export async function bulkSyncProgress(
  childId: string,
  localState: {
    completedLetters: string[];
    completedReadingIds: string[];
    points: number;
    settings: Record<string, unknown>;
  }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false };

  const now = new Date().toISOString();

  // Bulk upsert letters
  if (localState.completedLetters.length > 0) {
    const letterRows = localState.completedLetters.map((letter) => ({
      child_id: childId,
      letter: letter.toUpperCase(),
      completed: true,
      completed_at: now,
    }));

    await supabase
      .from("letter_progress")
      .upsert(letterRows, { onConflict: "child_id,letter" });
  }

  // Bulk upsert reading exercises
  if (localState.completedReadingIds.length > 0) {
    const readingRows = localState.completedReadingIds.map((exerciseId) => ({
      child_id: childId,
      exercise_id: exerciseId,
      level: "easy",
      score: 100,
      completed: true,
      completed_at: now,
    }));

    await supabase
      .from("reading_progress")
      .upsert(readingRows, { onConflict: "child_id,exercise_id" });
  }

  // Sync settings
  if (localState.settings) {
    await supabase
      .from("child_profiles")
      .update({ accessibility_settings: localState.settings })
      .eq("id", childId)
      .eq("parent_id", user.id);
  }

  return { success: true };
}
