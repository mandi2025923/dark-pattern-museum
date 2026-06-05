"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { siteConfig } from "@/content/site";

export function WarningBanner() {
  return (
    <section className="relative overflow-hidden border-y border-museum-neon/25 bg-museum-neon/[0.035]">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_18px,rgba(255,0,60,0.04)_18px,rgba(255,0,60,0.04)_19px)]" />
      <motion.div
        className="relative mx-auto grid max-w-7xl gap-5 px-4 py-8 md:grid-cols-[220px_1fr] md:items-center md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <div className="flex shrink-0 items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center border border-museum-warning bg-museum-warning/10 font-mono text-museum-warning text-sm">
            !
          </span>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-museum-warning">
              Safety notice
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-museum-muted">
              simulated pressure only
            </p>
          </div>
        </div>
        <p className="font-mono text-sm leading-7 text-museum-text/90 md:text-base">
          {siteConfig.warning}
        </p>
      </motion.div>
    </section>
  );
}
