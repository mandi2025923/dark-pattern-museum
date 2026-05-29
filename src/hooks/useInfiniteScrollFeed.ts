"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type UIEvent,
} from "react";
import { getArchiveFeedPatterns } from "@/data/archiveGallery";

export type InfiniteFeedItem = {
  id: string;
  title: string;
  description: string;
};

const BATCH_SIZE = 4;
const SCROLL_DEBOUNCE_MS = 180;

let batchCounter = 0;

function createBatch(): InfiniteFeedItem[] {
  const batchIndex = batchCounter++;
  const pool = getArchiveFeedPatterns();
  return pool.slice(0, BATCH_SIZE).map((pattern, index) => ({
    id: `feed-${batchIndex}-${pattern.id}-${index}`,
    title: pattern.title,
    description: pattern.description,
  }));
}

function dedupeById(
  existing: InfiniteFeedItem[],
  incoming: InfiniteFeedItem[],
  seenIds: Set<string>,
): InfiniteFeedItem[] {
  const next = [...existing];
  for (const item of incoming) {
    if (seenIds.has(item.id)) continue;
    seenIds.add(item.id);
    next.push(item);
  }
  return next;
}

/**
 * Simulated infinite feed for the Infinite Scroll exhibit.
 * Dedupes by id, debounces scroll, locks while loading, clears on unmount.
 */
export function useInfiniteScrollFeed(enabled: boolean) {
  const [items, setItems] = useState<InfiniteFeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadingLockRef = useRef(false);
  const seenIdsRef = useRef(new Set<string>());
  const debounceTimerRef = useRef<number | null>(null);

  const loadMore = useCallback(() => {
    if (!enabled || loadingLockRef.current) return;

    loadingLockRef.current = true;
    setIsLoading(true);

    const batch = createBatch();
    setItems((prev) => dedupeById(prev, batch, seenIdsRef.current));

    loadingLockRef.current = false;
    setIsLoading(false);
  }, [enabled]);

  const reset = useCallback(() => {
    if (debounceTimerRef.current !== null) {
      window.clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    loadingLockRef.current = false;
    seenIdsRef.current.clear();
    setItems([]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!enabled) {
      reset();
      return;
    }

    loadMore();

    return () => {
      reset();
    };
  }, [enabled, loadMore, reset]);

  const handleScroll = useCallback(
    (event: UIEvent<HTMLElement>) => {
      if (!enabled || loadingLockRef.current) return;

      const target = event.currentTarget;
      const distanceFromBottom =
        target.scrollHeight - target.scrollTop - target.clientHeight;

      if (distanceFromBottom > 120) return;

      if (debounceTimerRef.current !== null) {
        window.clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = window.setTimeout(() => {
        debounceTimerRef.current = null;
        loadMore();
      }, SCROLL_DEBOUNCE_MS);
    },
    [enabled, loadMore],
  );

  return { items, isLoading, handleScroll, loadMore, reset };
}
