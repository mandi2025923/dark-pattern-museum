"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { darkPatternCategories } from "@/data/darkPatterns";
import { archiveRoute, routes } from "@/lib/routes";

const previewItems = darkPatternCategories.slice(0, 4);

export function PreviewSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 md:px-8">
      <div className="absolute left-4 top-16 hidden h-[calc(100%-8rem)] w-px bg-gradient-to-b from-transparent via-museum-neon/30 to-transparent md:block" />
      <SectionLabel
        index="01"
        title="Archive signals"
        subtitle="Confirm shaming, fake urgency, motel hidden consumption, and forced auto-renewal — the museum’s four core dossiers."
      />

      <motion.div
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {previewItems.map((item, i) => (
          <motion.article
            key={item.id}
            variants={fadeUp}
            custom={i}
            className="group relative min-h-64 overflow-hidden border border-museum-border bg-museum-panel/70 p-5 transition-colors hover:border-museum-neon/50"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-museum-scan/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-museum-scan">
              {item.titleEn}
            </p>
            <h3 className="mt-4 font-display text-xl uppercase leading-tight tracking-wider text-museum-text">
              {item.title}
            </h3>
            <p className="mt-4 text-sm leading-6 text-museum-muted">
              {item.description}
            </p>
            <p className="mt-5 border-t border-museum-border pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-museum-neon/85">
              Threat level {item.threatLevel}/5
            </p>
            <Link
              href={archiveRoute(item.slug)}
              className="absolute inset-0"
              aria-label={`Open archive record for ${item.titleEn}`}
            />
          </motion.article>
        ))}
      </motion.div>

      <div className="mt-10 text-center">
        <Link
          href={routes.archive}
          className="font-mono text-xs uppercase tracking-[0.3em] text-museum-neon transition-all hover:text-glow-neon"
        >
          Open full archive →
        </Link>
      </div>
    </section>
  );
}
