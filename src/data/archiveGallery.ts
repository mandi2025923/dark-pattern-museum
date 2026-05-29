import { getDarkPattern } from "@/data/darkPatterns";
import type { DarkPattern } from "@/types/museum";
import type { SimulationType } from "@/types/museum";

/** Fixed vertical gallery on `/archive` — four dossiers, short English gallery tags. */
export const ARCHIVE_GALLERY_SLUGS = [
  "confirmshaming",
  "fake-urgency",
  "infinite-scroll",
  "forced-continuity",
] as const satisfies readonly SimulationType[];

export type ArchiveGallerySlug = (typeof ARCHIVE_GALLERY_SLUGS)[number];

const galleryLabels: Record<ArchiveGallerySlug, string> = {
  confirmshaming: "Confirm Shaming",
  "fake-urgency": "Fake Urgency",
  "infinite-scroll": "Infinite Scroll",
  "forced-continuity": "Forced Continuity",
};

export type ArchiveGalleryRecord = DarkPattern & {
  galleryLabel: string;
  galleryIndex: number;
};

export function getArchiveGalleryRecords(): ArchiveGalleryRecord[] {
  return ARCHIVE_GALLERY_SLUGS.map((slug, index) => {
    const pattern = getDarkPattern(slug);
    if (!pattern) {
      throw new Error(`Archive gallery missing pattern: ${slug}`);
    }
    return {
      ...pattern,
      galleryLabel: galleryLabels[slug],
      galleryIndex: index + 1,
    };
  });
}
