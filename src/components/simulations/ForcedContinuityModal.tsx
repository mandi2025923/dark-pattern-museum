"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { SimulationModalLayout } from "@/components/simulations/ConfirmShamingModal";

export const FORCED_CONTINUITY_COPY = {
  badge: "Free trial · $0 due today",
  title: "Start your 7-day premium trial",
  subtitle:
    "Unlock the full archive experience. We will remind you before billing begins* — *reminder buried in settings.",
  startLabel: "Start free trial — pay nothing today",
  declineLabel: "No thanks, I'll stay on the basic plan",
  declineHoverHint: "Most users miss the auto-renew step",
  declineLoadingHint: "Checking eligibility…",
  finePrint: "By starting, you agree to auto-renew at $14.99/mo after day 7 unless cancelled.",
} as const;

export const FORCED_CONTINUITY_EXPLANATION = {
  sectionLabel: "Exhibit explanation · Forced continuity",
  startOpener:
    "You accepted the trial. The interface made “free” loud and renewal quiet — consent was split across timing, not a single clear moment.",
  declineOpener:
    "You declined — but the flow still trained you to hunt for the honest “no” while the trial stayed visually dominant.",
  bodyLead:
    " turns forgetting into revenue: trials auto-convert, renewal dates sit below the fold, and cancellation is harder than signup.",
  bodyFollowUpBefore:
    "The design assumes you will ",
    bodyFollowUpHighlight: "forget",
  bodyFollowUpAfter:
    " — not that you will calmly opt out on day six.",
  museumNote:
    "Museum note: No card was charged. No account was created. The renewal date was simulated text only.",
} as const;

type ContinuityChoice = "start" | "decline" | null;

const DECLINE_ENABLE_DELAY_MS = 1000;
const MODAL_EXIT_DURATION_S = 0.38;

type ForcedContinuityModalProps = {
  open?: boolean;
  minHeightClass?: string;
  layout?: SimulationModalLayout;
  onExplanation?: (node: ReactNode | null) => void;
};

export function ForcedContinuityModal({
  open = true,
  minHeightClass = "min-h-[360px]",
  layout = "overlay",
  onExplanation,
}: ForcedContinuityModalProps) {
  const embedded = layout === "embedded" || layout === "split";
  const footerExplanation = layout === "split" && Boolean(onExplanation);
  const reducedMotion = useReducedMotion();
  const [choice, setChoice] = useState<ContinuityChoice>(null);
  const [declineReady, setDeclineReady] = useState(false);
  const [declineHover, setDeclineHover] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const resolved = choice !== null;

  useEffect(() => {
    if (!open || resolved) return;
    const timer = window.setTimeout(() => setDeclineReady(true), DECLINE_ENABLE_DELAY_MS);
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
      onExplanation(
        <ForcedContinuityExplanation choice={choice} embedded={embedded} footer />,
      );
      return;
    }
    onExplanation(null);
  }, [footerExplanation, onExplanation, showExplanation, choice, embedded]);

  useEffect(() => {
    if (!onExplanation || !footerExplanation) return;
    return () => onExplanation(null);
  }, [onExplanation, footerExplanation]);

  const handleChoice = (next: ContinuityChoice) => {
    if (resolved) return;
    setChoice(next);
  };

  if (!open) return null;

  const viewportClass = embedded ? "relative w-full min-h-0" : `relative w-full ${minHeightClass}`;

  const {
    badge,
    title,
    subtitle,
    startLabel,
    declineLabel,
    declineHoverHint,
    declineLoadingHint,
    finePrint,
  } = FORCED_CONTINUITY_COPY;

  return (
    <div className={viewportClass}>
      <AnimatePresence mode="wait">
        {!resolved ? (
          <motion.div
            key="forced-continuity-modal"
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
              aria-labelledby="forced-continuity-title"
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
                    id="forced-continuity-title"
                    className="font-display text-lg uppercase leading-tight tracking-wider text-museum-text sm:text-xl"
                  >
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-museum-muted">{subtitle}</p>
                </div>

                <motion.button
                  type="button"
                  onClick={() => handleChoice("start")}
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
                  {startLabel}
                </motion.button>

                <p className="text-center font-mono text-[8px] uppercase leading-relaxed tracking-[0.08em] text-museum-muted/90">
                  {finePrint}
                </p>

                <div className="relative pb-6">
                  <motion.button
                    type="button"
                    disabled={!declineReady}
                    onClick={() => handleChoice("decline")}
                    onMouseEnter={() => setDeclineHover(true)}
                    onMouseLeave={() => setDeclineHover(false)}
                    onFocus={() => setDeclineHover(true)}
                    onBlur={() => setDeclineHover(false)}
                    className="w-full border border-museum-border bg-museum-void/60 px-3 py-2.5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.06em] text-museum-muted transition-colors enabled:hover:border-museum-warning/50 enabled:hover:text-museum-warning disabled:cursor-not-allowed disabled:opacity-40 sm:text-[10px]"
                  >
                    {declineLabel}
                  </motion.button>

                  <AnimatePresence>
                    {declineHover && declineReady ? (
                      <motion.p
                        className="absolute bottom-0 left-0 right-0 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-museum-warning"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        {declineHoverHint}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>

                {!declineReady ? (
                  <p className="text-center font-mono text-[9px] uppercase tracking-[0.2em] text-museum-scan/80">
                    {declineLoadingHint}
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
            <ForcedContinuityExplanation key="explanation" choice={choice} embedded={embedded} />
          ) : null}
        </AnimatePresence>
      ) : null}
    </div>
  );
}

type ForcedContinuityExplanationProps = {
  choice: NonNullable<ContinuityChoice>;
  embedded: boolean;
  footer?: boolean;
};

function ForcedContinuityExplanation({
  choice,
  embedded,
  footer = false,
}: ForcedContinuityExplanationProps) {
  const {
    sectionLabel,
    startOpener,
    declineOpener,
    bodyLead,
    bodyFollowUpBefore,
    bodyFollowUpHighlight,
    bodyFollowUpAfter,
    museumNote,
  } = FORCED_CONTINUITY_EXPLANATION;

  const opener = choice === "start" ? startOpener : declineOpener;

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
          <strong className="text-museum-text">Forced continuity</strong>
          {bodyLead}
        </p>
        <p>
          {bodyFollowUpBefore}
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
