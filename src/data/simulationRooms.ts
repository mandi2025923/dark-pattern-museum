import { ARCHIVE_GALLERY_SLUGS } from "@/data/archiveGallery";
import type { SimulationRoom } from "@/types/museum";
import type { SimulationType } from "@/types/museum";

/** Simulation rooms aligned with the four archive gallery dossiers only. */
export const simulationRooms: SimulationRoom[] = [
  {
    slug: "confirmshaming",
    title: "Shame Gate",
    summary:
      "A fake productivity subscription trap. The interface frames consent as virtue and refusal as failure.",
    patternSlug: "confirmshaming",
    safetyNote:
      "No subscription is created. No data is stored. Both buttons only advance the educational explanation.",
  },
  {
    slug: "fake-urgency",
    title: "Pressure Timer",
    summary:
      "A theatrical countdown and low-stock warning. The interface compresses your decision window before you can evaluate the offer.",
    patternSlug: "fake-urgency",
    safetyNote:
      "The timer resets locally. No purchase is made and no real inventory changes.",
  },
  {
    slug: "motel-dark-pattern",
    title: "Exit Maze",
    summary:
      "Sign-up is instant. Cancellation sends you through chat queues, surveys, and retention agents. Welcome to the roach motel.",
    patternSlug: "motel-dark-pattern",
    safetyNote: "No membership was created. The cancellation queue is simulated UI — you were never trapped.",
  },
  {
    slug: "forced-continuity",
    title: "Silent Renewal",
    summary:
      "A free trial that celebrates signup in neon while burying auto-renewal in fine print.",
    patternSlug: "forced-continuity",
    safetyNote: "No card was charged. No account was created. Renewal text was simulated only.",
  },
];

const gallerySlugSet = new Set<string>(ARCHIVE_GALLERY_SLUGS);

export function isGallerySimulationSlug(slug: string): slug is (typeof ARCHIVE_GALLERY_SLUGS)[number] {
  return gallerySlugSet.has(slug);
}

/** Rooms listed on `/rooms` — same order as archive gallery (01–04). */
export function getGallerySimulationRooms(): SimulationRoom[] {
  return ARCHIVE_GALLERY_SLUGS.map((slug) => {
    const room = simulationRooms.find((entry) => entry.slug === slug);
    if (!room) {
      throw new Error(`Gallery simulation room missing: ${slug}`);
    }
    return room;
  });
}

export function getSimulationRoom(slug: string) {
  if (!isGallerySimulationSlug(slug)) {
    return undefined;
  }
  return simulationRooms.find((room) => room.slug === slug);
}

export function getSimulationRoomByPattern(patternSlug: SimulationType) {
  return getGallerySimulationRooms().find((room) => room.patternSlug === patternSlug);
}
