"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/animations/variants";

export function ExhibitsHero() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-32 pb-12 md:px-8">
      <div className="absolute right-4 top-28 hidden font-mono text-[10px] text-museum-muted/40 md:block">
        <pre aria-hidden>{`ARCHIVE
├─ 09 SECTORS
├─ 00 ACTIVE
└─ STATUS: LOCKED`}</pre>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="font-mono text-xs tracking-[0.4em] text-museum-neon animate-pulse-neon"
        >
          DARK PATTERN ARCHIVE
        </motion.p>
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="mt-4 font-display text-4xl font-bold uppercase tracking-wide text-museum-text text-glow-neon md:text-5xl"
        >
          Dark pattern exhibit hall
        </motion.h1>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-6 max-w-2xl leading-relaxed text-museum-muted"
        >
          Each exhibit is a controlled UX simulation. Enter the corresponding room
          to feel how platforms convert your attention, emotion, and decisions
          into extractable resources.
        </motion.p>
      </motion.div>
    </section>
  );
}
