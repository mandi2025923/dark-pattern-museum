import type { SimulationType } from "@/types/museum";

export type MuseumState = {
  hasEnteredMuseum: boolean;
  currentRoom: SimulationType | null;
  visitedPatterns: SimulationType[];
  attentionScore: number;
  notificationCount: number;
};

export const initialMuseumState: MuseumState = {
  hasEnteredMuseum: false,
  currentRoom: null,
  visitedPatterns: [],
  attentionScore: 0,
  notificationCount: 0,
};

export function addVisitedPattern(
  state: MuseumState,
  pattern: SimulationType,
): MuseumState {
  if (state.visitedPatterns.includes(pattern)) {
    return state;
  }

  return {
    ...state,
    visitedPatterns: [...state.visitedPatterns, pattern],
  };
}
