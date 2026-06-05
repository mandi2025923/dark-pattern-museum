"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/content/site";

const themes = [
  {
    title: "Dark pattern theory",
    desc: "Patterns and strategies in interface design that deliberately mislead user decisions.",
  },
  {
    title: "Attention economy",
    desc: "How platforms convert time-on-site into a commodity that can be sold.",
  },
  {
    title: "Persuasive technology",
    desc: "How digital products systematically shape behaviour and emotion.",
  },
  {
    title: "Platform capitalism",
    desc: "How large technology platforms control the infrastructure of digital life.",
  },
];

const boundaries = [
  "Educational and critical — not malicious software",
  "No user data is collected",
  "No real tracking technologies are used",
  "Manipulative experiences exist only inside designed exhibition spaces",
];

export function AboutContent() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
      <SectionLabel
        index="02"
        title="Theoretical framework"
        subtitle="Critique through interaction design — not walls of academic text"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {themes.map((theme, i) => (
          <motion.div
            key={theme.title}
            className="cyber-border cyber-corner bg-museum-panel p-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
          >
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-museum-neon">
              {theme.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-museum-muted">
              {theme.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20">
        <SectionLabel index="03" title="Ethical boundaries" />
        <ul className="space-y-3">
          {boundaries.map((item, i) => (
            <motion.li
              key={item}
              className="flex items-start gap-4 font-mono text-sm text-museum-text/90"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
            >
              <span className="mt-1 text-museum-neon">▸</span>
              {item}
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.blockquote
        className="mt-20 border-l-2 border-museum-neon pl-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-display text-xl italic text-museum-text/90 md:text-2xl">
          &ldquo;{siteConfig.closingQuote}&rdquo;
        </p>
        <p className="mt-3 font-mono text-xs tracking-widest text-museum-muted">
          — FINAL EXIT EXPERIENCE (PLANNED)
        </p>
      </motion.blockquote>
    </section>
  );
}
