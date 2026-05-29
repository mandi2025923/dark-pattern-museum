"use client";

import { motion } from "framer-motion";
import { ThreatMeter } from "@/components/ui/ThreatMeter";
import type { ArchiveGalleryRecord } from "@/data/archiveGallery";

type ArchiveRecordCardProps = {
  pattern: ArchiveGalleryRecord;
  onOpen: () => void;
};

export function ArchiveRecordCard({ pattern, onOpen }: ArchiveRecordCardProps) {
  return (
    <motion.article
      layout
      className="group relative w-full overflow-hidden border border-museum-border bg-museum-panel/50 transition-[border-color,box-shadow] duration-500 hover:border-museum-neon/55 hover:shadow-[0_0_40px_rgba(255,0,60,0.12)]"
    >
      {/* Exhibition hall top spotlight — follows hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      >
        <div className="absolute inset-x-0 top-0 h-[72%] bg-[radial-gradient(ellipse_85%_65%_at_50%_-8%,rgba(255,255,255,0.14),transparent_58%)]" />
        <div className="absolute inset-x-0 top-0 h-[55%] bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(255,0,60,0.22),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(5,5,8,0.55)_100%)]" />
      </div>

      {/* Ceiling rail + lamp accent */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(72%,280px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-museum-neon/50 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />

      <button
        type="button"
        onClick={onOpen}
        className="relative z-10 w-full px-5 py-8 text-left md:px-8 md:py-10"
        aria-haspopup="dialog"
      >
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-museum-neon/0 via-museum-neon/50 to-museum-neon/0 opacity-50 transition-opacity group-hover:opacity-100" />

        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-museum-scan">
                dossier_{String(pattern.galleryIndex).padStart(2, "0")}
              </span>
              <span className="border border-museum-neon/35 bg-museum-neon/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-museum-neon">
                {pattern.galleryLabel}
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl uppercase leading-tight tracking-wider text-museum-text transition-colors group-hover:text-museum-neon md:text-3xl">
              {pattern.titleEn}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-museum-muted">
              {pattern.description}
            </p>
          </div>
          <ThreatMeter level={pattern.threatLevel} className="shrink-0 opacity-80 group-hover:opacity-100" />
        </div>

        <p className="mt-6 border-t border-museum-border/80 pt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-museum-muted transition-colors group-hover:text-museum-neon">
          Open dossier · interactive preview
        </p>
      </button>
    </motion.article>
  );
}
