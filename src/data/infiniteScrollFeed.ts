import { getDarkPattern } from "@/data/darkPatterns";
import type { InfiniteFeedItem } from "@/hooks/useInfiniteScrollFeed";

const FRAGMENT_TITLES = [
  "Recommended fragment",
  "Because you paused here",
  "Trending in the feed",
  "Similar dossier signal",
] as const;

/** Simulated infinite-scroll rows — not gallery dossiers (avoids duplicate 01–04 on /archive). */
export function createInfiniteScrollFeedBatch(batchIndex: number): InfiniteFeedItem[] {
  const pattern = getDarkPattern("infinite-scroll");
  if (!pattern) return [];

  return FRAGMENT_TITLES.map((title, index) => ({
    id: `feed-${batchIndex}-infinite-scroll-${index}`,
    title,
    description: pattern.description,
  }));
}
