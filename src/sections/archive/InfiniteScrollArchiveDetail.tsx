"use client";

import { InfiniteScrollExhibit } from "@/components/simulations/InfiniteScrollExhibit";
import { CyberButton } from "@/components/ui/CyberButton";
import type { DarkPattern } from "@/types/museum";
import { routes } from "@/lib/routes";

type InfiniteScrollArchiveDetailProps = {
  pattern: DarkPattern;
};

/** Infinite-scroll dossier detail — feed + trap live here only (not on /archive index). */
export function InfiniteScrollArchiveDetail({ pattern }: InfiniteScrollArchiveDetailProps) {
  return (
    <section className="relative mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-museum-neon">
        Exhibit Record
      </p>
      <h1 className="mt-4 font-display text-3xl uppercase tracking-wider text-museum-text md:text-4xl">
        {pattern.titleEn}
      </h1>
      <p className="mt-4 text-sm leading-7 text-museum-muted">{pattern.description}</p>
      <p className="mt-3 text-sm leading-7 text-museum-muted">{pattern.criticalTheme}</p>

      <div className="mt-10 border border-museum-border bg-museum-panel/50 p-4">
        <InfiniteScrollExhibit layout="embedded" />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <CyberButton href={routes.archive} variant="ghost">
          Back to gallery
        </CyberButton>
      </div>
    </section>
  );
}
