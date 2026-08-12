/**
 * Audio asset mapping configuration.
 * Maps content IDs to their audio file paths under /public/audio/.
 *
 * When a curated audio file exists at the mapped path, the audio player
 * will use it. Otherwise, it falls back to Web Speech API (id-ID).
 *
 * Audio files should be in .mp3 format for maximum browser compatibility.
 */

/** Base path for all audio assets (relative to /public/) */
export const AUDIO_BASE_PATH = "/audio";

/**
 * Get the expected audio file path for a letter.
 * Convention: /audio/letters/{lowercase_letter}.mp3
 */
export function getLetterAudioPath(letter: string): string {
  return `${AUDIO_BASE_PATH}/letters/${letter.toLowerCase()}.mp3`;
}

/**
 * Get the expected audio file path for a reading exercise.
 * Convention: /audio/reading/{exercise_id}.mp3
 */
export function getReadingAudioPath(exerciseId: string): string {
  return `${AUDIO_BASE_PATH}/reading/${exerciseId}.mp3`;
}

/**
 * Available avatar emoji options for audio feedback sounds.
 * Convention: /audio/sfx/{sound_name}.mp3
 */
export function getSfxPath(soundName: string): string {
  return `${AUDIO_BASE_PATH}/sfx/${soundName}.mp3`;
}

/** Well-known SFX names */
export const SFX = {
  CORRECT: "correct",
  INCORRECT: "incorrect",
  COMPLETE: "complete",
  CLICK: "click",
} as const;
