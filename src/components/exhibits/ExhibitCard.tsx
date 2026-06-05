"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { scaleIn } from "@/animations/variants";
import type { DarkPatternCategory } from "@/data/darkPatterns";
import { ThreatMeter } from "@/components/ui/ThreatMeter";
import { archiveRoute } from "@/lib/routes";

type ExhibitCardProps = {
  exhibit: DarkPatternCategory;
  index: number;
};

export function ExhibitCard({ exhibit, index }: ExhibitCardProps) {
  return (
    <motion.article
      variants={scaleIn}
      className="group relative cyber-border cyber-corner bg-museum-panel p-5 transition-colors duration-300 hover:border-museum-neon/40"
    >
      <Link href={archiveRoute(exhibit.slug)} className="block">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[10px] text-museum-scan tracking-widest">
            EXHIBIT_{String(index + 1).padStart(2, "0")}
          </span>
          <ThreatMeter level={exhibit.threatLevel} />
        </div>

        <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-wide text-museum-text group-hover:text-glow-neon transition-all">
          {exhibit.title}
        </h3>
        <p className="font-mono text-[10px] uppercase tracking-wider text-museum-muted mt-1">
          {exhibit.titleEn}
        </p>

        <p className="mt-3 text-sm text-museum-muted leading-relaxed">
          {exhibit.description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-museum-border pt-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-museum-neon">
            View archive →
          </span>
          <span className="h-2 w-2 rounded-full bg-museum-neon/30 group-hover:bg-museum-neon animate-pulse-neon" />
        </div>
      </Link>
    </motion.article>
  );
}
