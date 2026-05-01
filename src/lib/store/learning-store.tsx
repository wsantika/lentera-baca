"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "lentera-baca-learning-state-v1";

export type TextSize = "normal" | "large" | "extra-large";

export type LearningMode = "easy" | "medium";

export type LearningSettings = {
  textSize: TextSize;
  highContrast: boolean;
  autoAudio: boolean;
  learningMode: LearningMode;
};

export type LearningState = {
  name: string;
  points: number;
  streak: number;
  completedLetters: string[];
  completedReadingIds: string[];
  settings: LearningSettings;
  lastActiveDate: string | null;
};

type LearningStoreValue = {
  state: LearningState;
  isHydrated: boolean;
  setName: (name: string) => void;
  addPoints: (amount: number) => void;
  completeLetter: (letter: string) => void;
  completeReadingExercise: (exerciseId: string) => void;
  updateSettings: (settings: Partial<LearningSettings>) => void;
  resetProgress: () => void;
};

const defaultSettings: LearningSettings = {
  textSize: "normal",
  highContrast: false,
  autoAudio: false,
  learningMode: "easy",
};

const defaultState: LearningState = {
  name: "Sobat Lentera",
  points: 0,
  streak: 0,
  completedLetters: [],
  completedReadingIds: [],
  settings: defaultSettings,
  lastActiveDate: null,
};

const LearningStoreContext = createContext<LearningStoreValue | null>(null);

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getYesterdayKey() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().slice(0, 10);
}

function normalizeTextSize(value: unknown): TextSize {
  if (value === "large" || value === "extra-large") {
    return value;
  }

  return "normal";
}

function normalizeLearningMode(value: unknown): LearningMode {
  if (value === "medium") {
    return "medium";
  }

  return "easy";
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function normalizeState(value: unknown): LearningState {
  if (!value || typeof value !== "object") {
    return defaultState;
  }

  const record = value as Partial<LearningState>;

  return {
    name:
      typeof record.name === "string" && record.name.trim().length > 0
        ? record.name
        : defaultState.name,
    points: typeof record.points === "number" ? Math.max(0, record.points) : 0,
    streak: typeof record.streak === "number" ? Math.max(0, record.streak) : 0,
    completedLetters: normalizeStringArray(record.completedLetters),
    completedReadingIds: normalizeStringArray(record.completedReadingIds),
    settings: {
      textSize: normalizeTextSize(record.settings?.textSize),
      highContrast: Boolean(record.settings?.highContrast),
      autoAudio: Boolean(record.settings?.autoAudio),
      learningMode: normalizeLearningMode(record.settings?.learningMode),
    },
    lastActiveDate:
      typeof record.lastActiveDate === "string" ? record.lastActiveDate : null,
  };
}

function updateStreak(state: LearningState): LearningState {
  const today = getTodayKey();

  if (state.lastActiveDate === today) {
    return state;
  }

  const yesterday = getYesterdayKey();
  const nextStreak = state.lastActiveDate === yesterday ? state.streak + 1 : 1;

  return {
    ...state,
    streak: nextStreak,
    lastActiveDate: today,
  };
}

function addUniqueItem(items: string[], item: string) {
  if (items.includes(item)) {
    return items;
  }

  return [...items, item];
}

export function LearningStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LearningState>(defaultState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const timeoutId = window.setTimeout(() => {
      if (isCancelled) {
        return;
      }

      try {
        const storedValue = window.localStorage.getItem(STORAGE_KEY);

        setState(
          storedValue ? normalizeState(JSON.parse(storedValue)) : defaultState,
        );
      } catch {
        setState(defaultState);
      } finally {
        setIsHydrated(true);
      }
    }, 0);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [isHydrated, state]);

  const setName = useCallback((name: string) => {
    setState((currentState) => ({
      ...currentState,
      name: name.trim().length > 0 ? name : defaultState.name,
    }));
  }, []);

  const addPoints = useCallback((amount: number) => {
    setState((currentState) => {
      const activeState = updateStreak(currentState);

      return {
        ...activeState,
        points: activeState.points + Math.max(0, amount),
      };
    });
  }, []);

  const completeLetter = useCallback((letter: string) => {
    setState((currentState) => {
      const normalizedLetter = letter.trim().toUpperCase();

      if (!normalizedLetter) {
        return currentState;
      }

      const activeState = updateStreak(currentState);
      const alreadyCompleted =
        activeState.completedLetters.includes(normalizedLetter);

      return {
        ...activeState,
        completedLetters: addUniqueItem(
          activeState.completedLetters,
          normalizedLetter,
        ),
        points: alreadyCompleted ? activeState.points : activeState.points + 5,
      };
    });
  }, []);

  const completeReadingExercise = useCallback((exerciseId: string) => {
    setState((currentState) => {
      const normalizedExerciseId = exerciseId.trim();

      if (!normalizedExerciseId) {
        return currentState;
      }

      const activeState = updateStreak(currentState);
      const alreadyCompleted =
        activeState.completedReadingIds.includes(normalizedExerciseId);

      return {
        ...activeState,
        completedReadingIds: addUniqueItem(
          activeState.completedReadingIds,
          normalizedExerciseId,
        ),
        points: alreadyCompleted ? activeState.points : activeState.points + 10,
      };
    });
  }, []);

  const updateSettings = useCallback((settings: Partial<LearningSettings>) => {
    setState((currentState) => ({
      ...currentState,
      settings: {
        ...currentState.settings,
        ...settings,
      },
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setState((currentState) => ({
      ...defaultState,
      name: currentState.name,
      settings: currentState.settings,
    }));
  }, []);

  const value = useMemo<LearningStoreValue>(
    () => ({
      state,
      isHydrated,
      setName,
      addPoints,
      completeLetter,
      completeReadingExercise,
      updateSettings,
      resetProgress,
    }),
    [
      state,
      isHydrated,
      setName,
      addPoints,
      completeLetter,
      completeReadingExercise,
      updateSettings,
      resetProgress,
    ],
  );

  return (
    <LearningStoreContext.Provider value={value}>
      {children}
    </LearningStoreContext.Provider>
  );
}

export function useLearningStore() {
  const context = useContext(LearningStoreContext);

  if (!context) {
    throw new Error(
      "useLearningStore must be used inside LearningStoreProvider.",
    );
  }

  return context;
}
