"use client";

import { useEffect } from "react";
import { useInfiniteScrollFeed } from "@/hooks/useInfiniteScrollFeed";

type InfiniteScrollFeedProps = {
  /** When false, list is cleared (e.g. accordion collapsed). */
  active: boolean;
  /** Tighter feed for archive dossier right column */
  compact?: boolean;
  /** Notified when deduped item count changes (exhibit prompts / explanations). */
  onItemCountChange?: (count: number) => void;
};

/**
 * Infinite-scroll exhibit feed — loads simulated archive rows inside the expanded card.
 */
export function InfiniteScrollFeed({
  active,
  compact = false,
  onItemCountChange,
}: InfiniteScrollFeedProps) {
  const { items, isLoading, handleScroll } = useInfiniteScrollFeed(active);

  useEffect(() => {
    onItemCountChange?.(items.length);
  }, [items.length, onItemCountChange]);

  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-museum-muted">
        Simulated feed · scroll to load more
      </p>

      <div
        className={`space-y-2 overflow-y-auto border border-museum-border bg-museum-void/50 p-2 ${
          compact ? "max-h-28" : "max-h-56 p-3"
        }`}
        onScroll={handleScroll}
        role="feed"
        aria-busy={isLoading}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-museum-border bg-museum-panel/80 px-3 py-2"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-museum-scan">
              {item.id}
            </p>
            <p className="mt-1 font-display text-sm uppercase tracking-wide text-museum-text">
              {item.title}
            </p>
            <p className="mt-1 text-xs leading-5 text-museum-muted">{item.description}</p>
          </div>
        ))}

        {isLoading ? (
          <p className="py-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-museum-scan">
            Loading…
          </p>
        ) : null}
      </div>
    </div>
  );
}
