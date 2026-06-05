"use client";

import { motion } from "framer-motion";
import { AtmosphericField } from "@/components/effects/AtmosphericField";
import { FloatingInterfaceFragments } from "@/components/effects/FloatingInterfaceFragments";
import { CyberButton } from "@/components/ui/CyberButton";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { siteConfig } from "@/content/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { routes } from "@/lib/routes";

const titleLines = ["Dark Pattern", "Museum"];

export function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[calc(100vh-4rem)] overflow-hidden px-4 md:px-8">
      <AtmosphericField />
      <FloatingInterfaceFragments />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 py-20 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-3 border border-museum-border bg-museum-panel/55 px-4 py-2 backdrop-blur-sm"
          >
            <span className="h-2 w-2 bg-museum-neon shadow-neon-sm" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-museum-scan">
              Speculative digital exhibition
            </span>
          </motion.div>

          <div className="mt-8 overflow-hidden">
            {titleLines.map((line, lineIndex) => (
              <motion.h1
                key={line}
                variants={fadeUp}
                custom={lineIndex + 1}
                className="font-display text-[clamp(3.2rem,11vw,9.5rem)] font-black uppercase leading-[0.86] tracking-normal text-museum-text"
              >
                <motion.span
                  className="inline-block text-glow-neon"
                  animate={
                    reduced
                      ? {}
                      : {
                          textShadow: [
                            "0 0 18px rgba(255,0,60,0.28)",
                            "0 0 36px rgba(255,0,60,0.62)",
                            "0 0 18px rgba(255,0,60,0.28)",
                          ],
                        }
                  }
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {line}
                </motion.span>
              </motion.h1>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            custom={3}
            className="mt-8 max-w-2xl text-lg leading-8 text-museum-text/80 md:text-xl"
          >
            A critical media artwork staging four dossiers — confirm shaming,
            fake urgency, motel-style hidden consumption, and forced auto-renewal
            — so coercion can be seen before it is accepted.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <CyberButton href={routes.archive}>Enter the Museum</CyberButton>
            <CyberButton href={routes.about} variant="ghost">
              Read the ethics note
            </CyberButton>
          </motion.div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden border border-museum-border bg-museum-panel/55 p-5 backdrop-blur-md lg:block"
        >
          <div className="flex items-center justify-between border-b border-museum-border pb-4">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-museum-neon">
              Visitor status
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-museum-muted">
              observed locally
            </span>
          </div>
          <div className="grid gap-3 py-5">
            {[
              ["Confirm shaming", "dossier_01"],
              ["Fake urgency", "dossier_02"],
              ["Motel exit trap", "dossier_03"],
              ["Forced renewal", "dossier_04"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between border border-museum-border/70 bg-museum-void/50 px-3 py-3 font-mono text-xs"
              >
                <span className="uppercase tracking-[0.18em] text-museum-muted">
                  {label}
                </span>
                <span className="uppercase tracking-[0.18em] text-museum-scan">
                  {value}
                </span>
              </div>
            ))}
          </div>
          <p className="border-t border-museum-border pt-4 font-mono text-xs leading-6 text-museum-muted">
            {siteConfig.warning}
          </p>
        </motion.aside>
      </div>

      <motion.div
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
        animate={reduced ? {} : { y: [0, 9, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-museum-muted">
          Scroll to enter the exhibit
        </span>
      </motion.div>
    </section>
  );
}
