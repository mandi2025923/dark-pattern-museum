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
          WHY THIS EXISTS
        </motion.p>
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="mt-4 max-w-3xl font-display text-3xl font-bold uppercase leading-tight tracking-wide text-museum-text md:text-4xl"
        >
          Every interface you use is designed to steer you. This museum exists to make that steering visible.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-6 max-w-2xl text-base leading-relaxed text-museum-muted"
        >
          {siteConfig.name} is a postgraduate final major project for the{" "}
          {siteConfig.program} at the {siteConfig.university}. It does not
          solve dark patterns. It restages them so you can see how they work — and
          ask why they are everywhere.
        </motion.p>
      </motion.div>
    </section>
  );
}
