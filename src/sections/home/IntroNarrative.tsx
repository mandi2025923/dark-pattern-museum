"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { SectionLabel } from "@/components/ui/SectionLabel";

const narrativeBlocks = [
  {
    label: "Shame & urgency",
    text: "Some interfaces rewrite the decline button into an insult and the clock into a weapon. Confirm shaming and fake urgency pressure consent through guilt and manufactured panic — not through clear choice.",
  },
  {
    label: "Roach Motel & renewal",
    text: "Sign-up is a single click. Cancellation is a phone call, a chat queue, a retention agent who won't take no for an answer. Forced auto-renewal counts on you forgetting — and the interface helps you forget.",
  },
  {
    label: "Reflection",
    text: "You just scrolled past four mechanisms that are probably running on a tab you have open right now. The difference is: here, you can stop. Look again. Ask what the interface wanted you to do — and whether you wanted to do it.",
  },
];

export function IntroNarrative() {
  return (
    <section className="relative overflow-hidden border-y border-museum-border bg-museum-surface/40 px-4 py-24 md:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,0,60,0.045),transparent)]" />
      <motion.div
        className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={fadeUp}>
          <SectionLabel
            index="00"
            title="The interface is not neutral"
            subtitle="Four exhibits: confirm shaming, fake urgency, roach motel (hard to cancel), and forced auto-renewal."
          />
        </motion.div>

        <div className="grid gap-4">
          {narrativeBlocks.map((block, index) => (
            <motion.article
              key={block.label}
              variants={fadeUp}
              custom={index}
              className="border border-museum-border bg-museum-panel/55 p-5 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between gap-4 border-b border-museum-border pb-3">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-museum-neon">
                  {block.label}
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-museum-muted">
                  signal_{String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-4 text-base leading-8 text-museum-text/80">
                {block.text}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
