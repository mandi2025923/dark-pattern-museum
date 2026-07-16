"use client";

import { motion } from "framer-motion";
import { CyberButton } from "@/components/ui/CyberButton";
import { Tooltip } from "@/components/ui/Tooltip";
import { glossary } from "@/content/site";
import { routes } from "@/lib/routes";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ArchiveTransition() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-4 py-28 md:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-museum-neon/60 to-transparent" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[520px] w-[min(88vw,980px)] -translate-x-1/2 -translate-y-1/2 border border-museum-neon/15"
        animate={reduced ? {} : { opacity: [0.18, 0.4, 0.18], scale: [0.98, 1.01, 0.98] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="relative mx-auto max-w-4xl text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
      >
        <motion.p
          variants={fadeUp}
          className="font-mono text-xs uppercase tracking-[0.35em] text-museum-scan"
        >
          Exhibition threshold
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="mt-5 font-display text-3xl font-black uppercase leading-tight tracking-wider text-museum-text md:text-5xl"
        >
          The archive opens when the pattern becomes visible.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mx-auto mt-6 max-w-2xl text-base leading-8 text-museum-muted"
        >
          Four dossiers. Four simulation rooms. Confirm shaming, fake urgency,{" "}
          <Tooltip content={glossary.roachMotel}>roach motel (hard to cancel)</Tooltip>
          , forced auto-renewal. Read the case file, then walk into the room and
          feel it work.
        </motion.p>
        <motion.div variants={fadeUp} custom={3} className="mt-10">
          <CyberButton href={routes.archive}>Enter the Museum</CyberButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
