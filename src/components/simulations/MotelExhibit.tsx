"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { SimulationModalLayout } from "@/components/simulations/ConfirmShamingModal";

export const MOTEL_EXHIBIT_COPY = {
  badge: "Premium vault · Instant access",
  title: "Enter the members-only archive",
  subtitle:
    "One tap to unlock every dossier. Cancellation is always available* — *link relocated after six screens.",
  enterLabel: "Enter now — membership active in 1 click",
  exitLabel: "Cancel membership",
  exitHoverHint: "Estimated wait: 4–7 screens · hold music included",
  exitLoadingHint: "Loading cancellation portal…",
  frictionSteps: ["Verify identity", "Survey (required)", "Chat with retention", "Call during business hours"],
} as const;

export const MOTEL_EXHIBIT_EXPLANATION = {
  sectionLabel: "Exhibit explanation · Motel dark pattern",
  enterOpener:
    "You entered immediately. The interface treated signup like a door that only opens inward — no friction on the way in.",
  exitOpener:
    "You tried to leave. The same product suddenly required proof, patience, and persistence just to find the exit.",
  bodyLead:
    " (the “roach motel”) makes entry effortless and exit exhausting. Subscribe flows stay above the fold; cancellation hides behind menus, chat bots, and ",
  bodyFollowUpHighlight: "deliberate friction",
  bodyFollowUpAfter:
    " so resignation feels easier than escape.",
  museumNote:
    "Museum note: No membership was created. No call was placed. The retention queue was simulated UI only.",
} as const;

type MotelChoice = "enter" | "exit" | null;

const EXIT_ENABLE_DELAY_MS = 1100;
const MODAL_EXIT_DURATION_S = 0.38;

type MotelExhibitProps = {
  open?: boolean;
  minHeightClass?: string;
  layout?: SimulationModalLayout;
  onExplanation?: (node: ReactNode | null) => void;
};

export function MotelExhibit({
  open = true,
  minHeightClass = "min-h-[360px]",
  layout = "overlay",
  onExplanation,
}: MotelExhibitProps) {
  const embedded = layout === "embedded" || layout === "split";
  const footerExplanation = layout === "split" && Boolean(onExplanation);
  const reducedMotion = useReducedMotion();
  const [choice, setChoice] = useState<MotelChoice>(null);
  const [exitReady, setExitReady] = useState(false);
  const [exitHover, setExitHover] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const resolved = choice !== null;

  useEffect(() => {
    if (!open || resolved) return;
    const timer = window.setTimeout(() => setExitReady(true), EXIT_ENABLE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [open, resolved]);

  useEffect(() => {
    if (!resolved) {
      setShowExplanation(false);
      return;
    }
    const timer = window.setTimeout(
      () => setShowExplanation(true),
      reducedMotion ? 0 : MODAL_EXIT_DURATION_S * 1000,
    );
    return () => window.clearTimeout(timer);
  }, [resolved, reducedMotion]);

  useEffect(() => {
    if (!footerExplanation || !onExplanation) return;
    if (showExplanation && choice) {
      onExplanation(<MotelExplanation choice={choice} embedded={embedded} footer />);
      return;
    }
    onExplanation(null);
  }, [footerExplanation, onExplanation, showExplanation, choice, embedded]);

  useEffect(() => {
    if (!onExplanation || !footerExplanation) return;
    return () => onExplanation(null);
  }, [onExplanation, footerExplanation]);

  const handleChoice = (next: MotelChoice) => {
    if (resolved) return;
    setChoice(next);
  };

  if (!open) return null;

  const viewportClass = embedded ? "relative w-full min-h-0" : `relative w-full ${minHeightClass}`;

  const {
    badge,
    title,
    subtitle,
    enterLabel,
    exitLabel,
    exitHoverHint,
    exitLoadingHint,
    frictionSteps,
  } = MOTEL_EXHIBIT_COPY;

  return (
    <div className={viewportClass}>
      <AnimatePresence mode="wait">
        {!resolved ? (
          <motion.div
            key="motel-exhibit"
            className={
              embedded
                ? "relative z-0 w-full"
                : "absolute inset-0 z-10 flex items-center justify-center p-3 sm:p-4"
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: embedded ? 1 : 0.98,
              filter: embedded || reducedMotion ? undefined : "blur(4px)",
              transition: {
                duration: reducedMotion ? 0 : MODAL_EXIT_DURATION_S,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            {!embedded ? (
              <div className="absolute inset-0 bg-museum-void/92 backdrop-blur-sm" aria-hidden />
            ) : null}

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="motel-exhibit-title"
              className={`relative z-0 w-full border border-museum-scan/40 bg-museum-panel shadow-neon ${
                embedded ? "max-w-none" : "z-10 max-w-md"
              }`}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="border-b border-museum-scan/30 bg-museum-scan/5 px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-museum-scan">
                  {badge}
                </p>
              </div>

              <div className={`${embedded ? "space-y-3 p-3" : "space-y-5 p-4 sm:p-5"}`}>
                <div>
                  <h3
                    id="motel-exhibit-title"
                    className="font-display text-lg uppercase leading-tight tracking-wider text-museum-text sm:text-xl"
                  >
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-museum-muted">{subtitle}</p>
                </div>

                <motion.button
                  type="button"
                  onClick={() => handleChoice("enter")}
                  className="w-full border border-museum-neon/70 bg-museum-neon/15 px-4 py-4 font-mono text-[10px] uppercase leading-snug tracking-[0.1em] text-museum-neon transition-colors hover:bg-museum-neon/25 hover:shadow-neon-sm sm:text-[11px]"
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          boxShadow: [
                            "0 0 0 rgba(255,0,60,0)",
                            "0 0 22px rgba(255,0,60,0.35)",
                            "0 0 0 rgba(255,0,60,0)",
                          ],
                        }
                  }
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  {enterLabel}
                </motion.button>

                <div className="space-y-1.5 border border-museum-border/80 bg-museum-void/50 p-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-museum-muted">
                    If you try to cancel
                  </p>
                  {frictionSteps.map((step, index) => (
                    <motion.div
                      key={step}
                      className="border border-museum-border px-2 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-museum-muted/90"
                      animate={
                        reducedMotion
                          ? undefined
                          : { opacity: [0.35, 0.85, 0.35], x: [0, index % 2 ? 2 : -2, 0] }
                      }
                      transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.15 }}
                    >
                      {index + 1}. {step}
                    </motion.div>
                  ))}
                </div>

                <div className="relative pb-6">
                  <motion.button
                    type="button"
                    disabled={!exitReady}
                    onClick={() => handleChoice("exit")}
                    onMouseEnter={() => setExitHover(true)}
                    onMouseLeave={() => setExitHover(false)}
                    onFocus={() => setExitHover(true)}
                    onBlur={() => setExitHover(false)}
                    className="w-full border border-museum-border bg-museum-void/60 px-3 py-2.5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.06em] text-museum-muted transition-colors enabled:hover:border-museum-warning/50 enabled:hover:text-museum-warning disabled:cursor-not-allowed disabled:opacity-40 sm:text-[10px]"
                  >
                    {exitLabel}
                  </motion.button>

                  <AnimatePresence>
                    {exitHover && exitReady ? (
                      <motion.p
                        className="absolute bottom-0 left-0 right-0 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-museum-warning"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        {exitHoverHint}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>

                {!exitReady ? (
                  <p className="text-center font-mono text-[9px] uppercase tracking-[0.2em] text-museum-scan/80">
                    {exitLoadingHint}
                  </p>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!footerExplanation ? (
        <AnimatePresence>
          {showExplanation && choice ? (
            <MotelExplanation key="explanation" choice={choice} embedded={embedded} />
          ) : null}
        </AnimatePresence>
      ) : null}
    </div>
  );
}

type MotelExplanationProps = {
  choice: NonNullable<MotelChoice>;
  embedded: boolean;
  footer?: boolean;
};

function MotelExplanation({ choice, embedded, footer = false }: MotelExplanationProps) {
  const {
    sectionLabel,
    enterOpener,
    exitOpener,
    bodyLead,
    bodyFollowUpHighlight,
    bodyFollowUpAfter,
    museumNote,
  } = MOTEL_EXHIBIT_EXPLANATION;

  const opener = choice === "enter" ? enterOpener : exitOpener;

  const sectionClass = footer
    ? "space-y-3 px-4 py-4 md:px-6 md:py-5"
    : embedded
      ? "mt-2 space-y-2 border border-museum-scan/35 bg-museum-void/80 p-3"
      : "mt-4 space-y-4 border border-museum-scan/35 bg-museum-void/80 p-4 sm:p-5";

  return (
    <motion.section
      className={sectionClass}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 12 }}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-museum-scan">
        {sectionLabel}
      </p>

      <p
        className={
          footer || embedded
            ? "text-xs leading-5 text-museum-text/90 md:text-sm md:leading-6"
            : "text-sm leading-7 text-museum-text/90"
        }
      >
        {opener}
      </p>

      <div
        className={
          footer || embedded
            ? "grid gap-2 text-xs leading-5 text-museum-muted md:grid-cols-2 md:gap-4 md:text-sm md:leading-6"
            : "space-y-3 text-sm leading-7 text-museum-muted"
        }
      >
        <p>
          <strong className="text-museum-text">The motel dark pattern</strong>
          {bodyLead}
          <span className="text-museum-neon">{bodyFollowUpHighlight}</span>
          {bodyFollowUpAfter}
        </p>
      </div>

      <p
        className={
          footer
            ? "border-t border-museum-border/80 pt-3 text-xs leading-5 text-museum-text/80 md:col-span-2 md:text-sm md:leading-6"
            : embedded
              ? "border-l-2 border-museum-neon/50 pl-3 text-xs leading-5 text-museum-text/80"
              : "border-l-2 border-museum-neon/50 pl-4 text-sm leading-7 text-museum-text/80"
        }
      >
        {museumNote}
      </p>
    </motion.section>
  );
}
