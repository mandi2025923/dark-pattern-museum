"use client";

import { useMemo, useState } from "react";
import {
  addVisitedPattern,
  initialMuseumState,
  type MuseumState,
} from "@/store/museum-store";
import type { SimulationType } from "@/types/museum";

export function useAttentionState() {
  const [state, setState] = useState<MuseumState>(initialMuseumState);

  return useMemo(
    () => ({
      state,
      enterMuseum: () =>
        setState((current) => ({ ...current, hasEnteredMuseum: true })),
      visitPattern: (pattern: SimulationType) =>
        setState((current) => addVisitedPattern(current, pattern)),
      increaseAttentionScore: (amount: number) =>
        setState((current) => ({
          ...current,
          attentionScore: Math.min(current.attentionScore + amount, 100),
        })),
      registerNotification: () =>
        setState((current) => ({
          ...current,
          notificationCount: current.notificationCount + 1,
        })),
    }),
    [state],
  );
}
