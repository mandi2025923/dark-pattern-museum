"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ---------------------------------------------------------------------------
// COPY — edit labels here without touching layout or animation logic
// ---------------------------------------------------------------------------

/** Pressure copy shown while the modal is open (confrontational / polarised framing). */
export const CONFIRM_SHAMING_COPY = {
  badge: "Limited offer · Act now",
  title: "Unlock Your Peak Productivity",
  subtitle:
    "Join 12,847 professionals who upgraded their focus this week. Cancel anytime* — *terms buried on page 47.",
  /** Compliant subscribe — visually dominant CTA */
  acceptLabel: "Yes, I Want To Become More Productive",
  /** Refuse subscribe — confirmshaming decline copy */
  declineLabel: "No, I Prefer Wasting My Life",
  /** Shown on hover/focus of decline button for extra pressure */
  declineHoverHint: "Are you sure you want to stay unproductive?",
  /** Shown while decline button is briefly disabled (intentional friction) */
  declineLoadingHint: "Processing your choice…",
} as const;

/** Critical explanation shown after either button is pressed. */
export const CONFIRM_SHAMING_EXPLANATION = {
  sectionLabel: "Exhibit explanation · Confirmshaming",
  acceptOpener:
    "You chose the flattering option. The interface rewarded you for saying yes to a story about who you want to be.",
  declineOpener:
    "You chose the insulting option. Even refusal was scripted to make you feel small.",
  bodyLead:
    " rewrites the “No” button so declining feels like admitting failure — not making a neutral choice. The yes label promises identity (“productive”); the no label attacks character (“wasting my life”).",
  bodyFollowUpBefore:
    "Real products use this on newsletters, free trials, and cookie banners. The goal is not clarity — it is ",
  bodyFollowUpHighlight: "emotional pressure",
  bodyFollowUpAfter: " before you can think.",
  museumNote:
    "Museum note: No subscription was created. No data was stored. Both buttons were part of the same manipulative script.",
} as const;

// ---------------------------------------------------------------------------
// Types & timing — tweak delays without hunting through JSX
// ---------------------------------------------------------------------------

/** Tracks which trap the visitor walked into (for tailored explanation opener). */
type ShamingChoice = "accept" | "decline" | null;

/** Milliseconds before the decline button becomes clickable (educational friction). */
const DECLINE_ENABLE_DELAY_MS = 1200;

/** Modal exit animation duration — explanation waits for this to finish. */
const MODAL_EXIT_DURATION_S = 0.38;

type ConfirmShamingModalProps = {
  /** When false, nothing renders (parent can control visibility). */
  open?: boolean;
};

/**
 * Confirmshaming exhibit: fake subscription popup with polarised accept/decline copy.
 * Educational only — no subscription, no data collection.
 */
export function ConfirmShamingModal({ open = true }: ConfirmShamingModalProps) {
  const reducedMotion = useReducedMotion();
  const [choice, setChoice] = useState<ShamingChoice>(null);
  const [declineReady, setDeclineReady] = useState(false);
  const [declineHover, setDeclineHover] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const resolved = choice !== null;

  // Brief delay before decline is clickable — mimics platforms that hide the real “No”.
  useEffect(() => {
    if (!open || resolved) return;
    const timer = window.setTimeout(() => setDeclineReady(true), DECLINE_ENABLE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [open, resolved]);

  // Reveal explanation after modal exit animation completes.
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

  const handleChoice = (next: ShamingChoice) => {
    if (resolved) return;
    setChoice(next);
  };

  if (!open) return null;

  return (
    <div className="relative w-full min-h-[360px]">
      {/* motion.div must be the direct child of AnimatePresence for exit to run */}
      <AnimatePresence mode="wait">
        {!resolved ? (
          <motion.div
            key="confirm-shaming-modal"
            className="absolute inset-0 z-10 flex items-center justify-center p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.98,
              filter: reducedMotion ? undefined : "blur(4px)",
              transition: { duration: reducedMotion ? 0 : MODAL_EXIT_DURATION_S, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <ModalLayer
              reducedMotion={reducedMotion}
              declineReady={declineReady}
              declineHover={declineHover}
              onDeclineHover={setDeclineHover}
              onAccept={() => handleChoice("accept")}
              onDecline={() => handleChoice("decline")}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Explanation sits below the modal area — appears after exit */}
      <AnimatePresence>
        {showExplanation && choice ? (
          <ConfirmShamingExplanation key="explanation" choice={choice} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Modal layer — backdrop + dialog + CTAs
// ---------------------------------------------------------------------------

type ModalLayerProps = {
  reducedMotion: boolean;
  declineReady: boolean;
  declineHover: boolean;
  onDeclineHover: (hover: boolean) => void;
  onAccept: () => void;
  onDecline: () => void;
};

function ModalLayer({
  reducedMotion,
  declineReady,
  declineHover,
  onDeclineHover,
  onAccept,
  onDecline,
}: ModalLayerProps) {
  const { badge, title, subtitle, acceptLabel, declineLabel, declineHoverHint, declineLoadingHint } =
    CONFIRM_SHAMING_COPY;

  return (
    <>
      {/* Backdrop — dims content behind the trap */}
      <div className="absolute inset-0 bg-museum-void/92 backdrop-blur-sm" aria-hidden />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-shaming-title"
        aria-describedby="confirm-shaming-desc"
        className="relative z-10 w-full max-w-md border border-museum-neon/45 bg-museum-panel shadow-neon"
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header strip — urgency badge */}
        <div className="border-b border-museum-neon/30 bg-museum-neon/10 px-4 py-3 sm:px-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-museum-neon">
            {badge}
          </p>
        </div>

        <div className="space-y-5 p-4 sm:p-5">
          <div>
            <h3
              id="confirm-shaming-title"
              className="font-display text-lg uppercase leading-tight tracking-wider text-museum-text sm:text-xl"
            >
              {title}
            </h3>
            <p
              id="confirm-shaming-desc"
              className="mt-2 text-sm leading-6 text-museum-muted"
            >
              {subtitle}
            </p>
          </div>

          {/* Compliant subscribe — large, neon, pulsing glow */}
          <motion.button
            type="button"
            onClick={onAccept}
            className="w-full border border-museum-neon/70 bg-museum-neon/15 px-4 py-4 font-mono text-[10px] uppercase leading-snug tracking-[0.1em] text-museum-neon transition-colors hover:bg-museum-neon/25 hover:shadow-neon-sm sm:text-[11px] sm:tracking-[0.12em]"
            animate={
              reducedMotion
                ? undefined
                : {
                    boxShadow: [
                      "0 0 0 rgba(255,0,60,0)",
                      "0 0 24px rgba(255,0,60,0.35)",
                      "0 0 0 rgba(255,0,60,0)",
                    ],
                  }
            }
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            {acceptLabel}
          </motion.button>

          {/* Refuse subscribe — smaller, muted, shame copy */}
          <div className="relative pb-6">
            <motion.button
              type="button"
              disabled={!declineReady}
              onClick={onDecline}
              onMouseEnter={() => onDeclineHover(true)}
              onMouseLeave={() => onDeclineHover(false)}
              onFocus={() => onDeclineHover(true)}
              onBlur={() => onDeclineHover(false)}
              className="w-full border border-museum-border bg-museum-void/60 px-3 py-2.5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.06em] text-museum-muted transition-colors enabled:hover:border-museum-warning/50 enabled:hover:text-museum-warning disabled:cursor-not-allowed disabled:opacity-40 sm:text-[10px] sm:tracking-[0.08em]"
              whileHover={
                declineReady && !reducedMotion ? { x: [0, -1, 1, 0] } : undefined
              }
              transition={{ duration: 0.35 }}
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
    </>
  );
}

// ---------------------------------------------------------------------------
// Explanation block — critical commentary after the trap closes
// ---------------------------------------------------------------------------

type ConfirmShamingExplanationProps = {
  choice: NonNullable<ShamingChoice>;
};

function ConfirmShamingExplanation({ choice }: ConfirmShamingExplanationProps) {
  const {
    sectionLabel,
    acceptOpener,
    declineOpener,
    bodyLead,
    bodyFollowUpBefore,
    bodyFollowUpHighlight,
    bodyFollowUpAfter,
    museumNote,
  } = CONFIRM_SHAMING_EXPLANATION;

  const opener = choice === "accept" ? acceptOpener : declineOpener;

  return (
    <motion.section
      className="mt-4 space-y-4 border border-museum-scan/35 bg-museum-void/80 p-4 sm:p-5"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 12 }}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-museum-scan">
        {sectionLabel}
      </p>

      <p className="text-sm leading-7 text-museum-text/90">{opener}</p>

      <div className="space-y-3 text-sm leading-7 text-museum-muted">
        <p>
          <strong className="text-museum-text">Confirmshaming</strong>
          {bodyLead}
        </p>
        <p>
          {bodyFollowUpBefore}
          <span className="text-museum-neon">{bodyFollowUpHighlight}</span>
          {bodyFollowUpAfter}
        </p>
      </div>

      <p className="border-l-2 border-museum-neon/50 pl-4 text-sm leading-7 text-museum-text/80">
        {museumNote}
      </p>
    </motion.section>
  );
}
