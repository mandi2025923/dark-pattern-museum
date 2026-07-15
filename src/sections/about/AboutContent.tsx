"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/content/site";

const themes = [
  {
    title: "Dark pattern theory",
    desc: "Interfaces that trick users into doing things they didn't mean to do. From Brignull's original 2010 taxonomy to Gray et al.'s 2024 CHI ontology of 64 types — a decade and a half of naming what platforms would rather keep invisible.",
    ref: { label: "Gray et al. (2024) — CHI ontology", href: "https://doi.org/10.1145/3613904.3642436" },
  },
  {
    title: "Attention economy",
    desc: "Your attention is the product. Platforms optimise for time-on-site because more scrolling means more ads served. Every notification, auto-play, and infinite feed is infrastructure for extracting attention at scale.",
    ref: { label: "Tim Wu — The Attention Merchants (2017)", href: "https://www.penguinrandomhouse.com/books/319930/the-attention-merchants-by-tim-wu/" },
  },
  {
    title: "Persuasive technology",
    desc: "Computers don't just respond to behaviour — they shape it. Fogg's (2003) framework showed how digital products systematically guide what users do, feel, and decide. The same tools that help you build habits can also exploit them.",
    ref: { label: "Fogg (2003) — Persuasive Technology", href: "https://dl.acm.org/doi/10.5555/807008" },
  },
  {
    title: "Platform capitalism",
    desc: "A few companies own the infrastructure where digital life happens. They set the rules, control the data, and design the interfaces. When the platform itself is the product, user autonomy is a cost to be managed.",
    ref: { label: "Srnicek (2017) — Platform Capitalism", href: "https://www.wiley.com/en-us/Platform+Capitalism-p-9781509504872" },
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
            <a
              href={theme.ref.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.12em] text-museum-scan/80 transition-colors hover:text-museum-neon"
            >
              → {theme.ref.label}
            </a>
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

      <div className="mt-20">
        <SectionLabel
          index="04"
          title="Further reading"
          subtitle="Key regulatory and research resources on dark patterns"
        />
        <ul className="space-y-4">
          {[
            {
              label: "FTC — Bringing Dark Patterns to Light (2022)",
              href: "https://www.ftc.gov/reports/bringing-dark-patterns-light",
              desc: "The US Federal Trade Commission's landmark report on dark patterns in digital commerce, outlining enforcement priorities under Section 5 of the FTC Act.",
            },
            {
              label: "FTC Act Section 5 — Unfair or Deceptive Acts or Practices",
              href: "https://www.ftc.gov/legal-library/browse/statutes/federal-trade-commission-act",
              desc: "The primary US legal instrument used to regulate deceptive interface design, including dark patterns that cause consumer harm.",
            },
            {
              label: "EU Digital Services Act — Article 25",
              href: "https://eur-lex.europa.eu/eli/reg/2022/2065/oj",
              desc: "Prohibits online platform interfaces that deceive or manipulate users, including designs that impair informed decision-making.",
            },
            {
              label: "EU General Data Protection Regulation (GDPR)",
              href: "https://gdpr.eu/",
              desc: "EU regulation governing data protection and privacy, directly relevant to dark patterns in cookie consent and data-sharing interfaces.",
            },
            {
              label: "Gray et al. (2024) — An Ontology of Dark Patterns (CHI 2024)",
              href: "https://doi.org/10.1145/3613904.3642436",
              desc: "The foundational academic taxonomy unifying 64 dark pattern types across prior classification systems.",
            },
            {
              label: "Brignull — Deceptive Design (Dark Patterns)",
              href: "https://www.deceptive.design/",
              desc: "Harry Brignull's original taxonomy of deceptive design patterns, continuously updated with real-world examples since 2010.",
            },
          ].map((link, i) => (
            <motion.li
              key={link.href}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-museum-border bg-museum-panel/40 p-4 transition-colors hover:border-museum-neon/60"
              >
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-museum-neon">
                  {link.label}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-museum-muted">
                  {link.desc}
                </span>
              </a>
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
