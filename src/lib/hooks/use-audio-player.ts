"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SpeakOptions = {
  lang?: string;
  rate?: number;
  pitch?: number;
};

/**
 * Custom audio player hook that prioritizes curated static audio files
 * and falls back to Web Speech API when the file is not available.
 *
 * Usage:
 *   const { speak, isSpeaking, cancel } = useAudioPlayer();
 *   speak("/audio/letters/a.mp3", "A. Apel.");
 *
 * - If the .mp3 file exists and loads successfully → plays the file.
 * - If the file fails to load (404, network error) → falls back to speechSynthesis.
 * - If speechSynthesis is also unavailable → silently fails.
 */
export function useAudioPlayer() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortRef = useRef(false);

  const isSpeechSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  /** Cancel any active playback (audio element or speech synthesis) */
  const cancel = useCallback(() => {
    abortRef.current = true;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    if (isSpeechSupported) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
  }, [isSpeechSupported]);

  /** Fallback: use Web Speech API */
  const speakWithSpeechAPI = useCallback(
    (text: string, options?: SpeakOptions) => {
      if (!isSpeechSupported || !text.trim()) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options?.lang ?? "id-ID";
      utterance.rate = options?.rate ?? 0.85;
      utterance.pitch = options?.pitch ?? 1;

      utterance.onstart = () => {
        if (!abortRef.current) setIsSpeaking(true);
      };
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [isSpeechSupported]
  );

  /**
   * Play audio: try static file first, fallback to Speech API.
   *
   * @param audioPath - Path to static audio file (e.g. "/audio/letters/a.mp3")
   * @param fallbackText - Text to speak via Speech API if audio file is unavailable
   * @param options - Optional speech synthesis options for the fallback
   */
  const speak = useCallback(
    (audioPath: string, fallbackText: string, options?: SpeakOptions) => {
      // Cancel any active playback first
      cancel();
      abortRef.current = false;

      // Try playing the static audio file
      const audio = new Audio(audioPath);
      audioRef.current = audio;

      audio.oncanplaythrough = () => {
        if (abortRef.current) return;
        setIsSpeaking(true);
        audio.play().catch(() => {
          // Autoplay blocked or other error — fallback
          setIsSpeaking(false);
          speakWithSpeechAPI(fallbackText, options);
        });
      };

      audio.onended = () => {
        setIsSpeaking(false);
        audioRef.current = null;
      };

      audio.onerror = () => {
        // File not found (404) or load error — fallback to Speech API
        audioRef.current = null;
        if (!abortRef.current) {
          speakWithSpeechAPI(fallbackText, options);
        }
      };

      // Start loading
      audio.load();
    },
    [cancel, speakWithSpeechAPI]
  );

  /**
   * Play audio using only Speech API (legacy compatibility).
   * Useful for components that don't have a static audio file yet.
   */
  const speakText = useCallback(
    (text: string, options?: SpeakOptions) => {
      cancel();
      abortRef.current = false;
      speakWithSpeechAPI(text, options);
    },
    [cancel, speakWithSpeechAPI]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    /** True while audio is actively playing (either file or speech) */
    isSpeaking,
    /** Play static audio file with Speech API fallback */
    speak,
    /** Play using Speech API only (legacy) */
    speakText,
    /** Cancel any active playback */
    cancel,
  };
}
