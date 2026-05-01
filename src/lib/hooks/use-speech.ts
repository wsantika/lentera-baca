"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type SpeakOptions = {
  lang?: string;
  rate?: number;
  pitch?: number;
};

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const isSupported = useMemo(() => {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }, []);

  const cancel = useCallback(() => {
    if (!isSupported) {
      return;
    }

    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  const speak = useCallback(
    (text: string, options?: SpeakOptions) => {
      if (!isSupported || !text.trim()) {
        return false;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options?.lang ?? "id-ID";
      utterance.rate = options?.rate ?? 0.85;
      utterance.pitch = options?.pitch ?? 1;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
      return true;
    },
    [isSupported],
  );

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isSupported,
    isSpeaking,
    speak,
    cancel,
  };
}
