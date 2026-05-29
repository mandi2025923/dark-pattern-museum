import type { SimulationType } from "@/types/museum";

/** Patterns with a dedicated /rooms/[slug] page and full modal exhibit. */
export const DEDICATED_SIMULATION_ROOMS = [
  "confirmshaming",
  "fake-urgency",
] as const satisfies readonly SimulationType[];

export type DedicatedSimulationRoom = (typeof DEDICATED_SIMULATION_ROOMS)[number];

export function isDedicatedSimulationRoom(slug: string): slug is DedicatedSimulationRoom {
  return (DEDICATED_SIMULATION_ROOMS as readonly string[]).includes(slug);
}

/** Archive modal runs full interactive trap + footer explanation for these types. */
export const ARCHIVE_INTERACTIVE_SIMULATIONS = [
  "confirmshaming",
  "fake-urgency",
  "forced-continuity",
  "infinite-scroll",
] as const satisfies readonly SimulationType[];

export function isInteractiveDossierSimulation(type: SimulationType): boolean {
  return (ARCHIVE_INTERACTIVE_SIMULATIONS as readonly SimulationType[]).includes(type);
}
