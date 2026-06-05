"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { siteConfig } from "@/content/site";

export function AboutHero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-32 pb-16 md:px-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="font-mono text-xs tracking-[0.4em] text-museum-scan"
        >
          PROJECT MANIFESTO
        </motion.p>
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="mt-4 font-display text-4xl font-bold uppercase tracking-wide text-museum-text md:text-5xl"
        >
          About this project
        </motion.h1>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-museum-muted"
        >
          {siteConfig.name} is a postgraduate final major project for the{" "}
          {siteConfig.program} at the {siteConfig.university} — a speculative
          digital museum that exposes hidden manipulative UX patterns across modern
          platforms, apps, and algorithmic systems through interaction.
        </motion.p>
      </motion.div>
    </section>
  );
}
