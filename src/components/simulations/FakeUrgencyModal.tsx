"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ---------------------------------------------------------------------------
// COPY — edit labels here without touching layout or animation logic
// ---------------------------------------------------------------------------

export const FAKE_URGENCY_COPY = {
  badge: "Flash sale · Ending soon",
  title: "Your reserved price expires in",
  subtitle:
    "14 people are viewing this offer right now. Only 2 units remain at this rate.",
  stockLabel: "Stock pressure",
  viewersLabel: "14 viewing now",
  rushLabel: "Claim offer before timer ends",
  waitLabel: "I'll wait and pay full price later",
  waitHoverHint: "This rate may disappear if you leave the page",
  timerResetHint: "Offer extended — hurry!",
} as const;

export const FAKE_URGENCY_EXPLANATION = {
  sectionLabel: "Exhibit explanation · Fake urgency",
  rushOpener:
    "You rushed to claim the offer. The countdown pushed you to decide before you could evaluate the deal.",
  waitOpener:
    "You resisted the timer — but the interface still framed patience as financial loss.",
  bodyLead:
    " uses artificial scarcity — countdowns, low-stock warnings, and “only today” language — to compress your decision window.",
  bodyFollowUpBefore:
    "The timer is often ",
  bodyFollowUpHighlight: "theatrical",
  bodyFollowUpAfter:
    ": it resets, was never real, or applies pressure without changing the underlying price.",
  museumNote:
    "Museum note: No purchase was made. No inventory changed. The countdown was a local simulation only.",
} as const;

// ---------------------------------------------------------------------------
// Types & timing
// ---------------------------------------------------------------------------

type UrgencyChoice = "rush" | "wait" | null;

const COUNTDOWN_START_SECONDS = 47;
const TICK_MS = 1000;
const WAIT_ENABLE_DELAY_MS = 900;
const MODAL_EXIT_DURATION_S = 0.38;

export type SimulationModalLayout = "overlay" | "embedded" | "split";

type FakeUrgencyModalProps = {
  open?: boolean;
  minHeightClass?: string;
  layout?: SimulationModalLayout;
  onExplanation?: (node: ReactNode | null) => void;
};

function formatCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/**
 * Fake urgency exhibit: theatrical countdown + scarcity modal.
 * Educational only — no transaction, no real inventory.
 */
export function FakeUrgencyModal({
  open = true,
  minHeightClass = "min-h-[360px]",
  layout = "overlay",
  onExplanation,
}: FakeUrgencyModalProps) {
  const splitCompact = layout === "split";
  const embedded = layout === "embedded" || splitCompact;
  const footerExplanation = layout === "split" && Boolean(onExplanation);
  const reducedMotion = useReducedMotion();
  const [choice, setChoice] = useState<UrgencyChoice>(null);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_START_SECONDS);
  const [waitReady, setWaitReady] = useState(false);
  const [waitHover, setWaitHover] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timerPulse, setTimerPulse] = useState(false);

  const resolved = choice !== null;

  useEffect(() => {
    if (!open || resolved) return;
    const timer = window.setTimeout(() => setWaitReady(true), WAIT_ENABLE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [open, resolved]);

  useEffect(() => {
    if (!open || resolved) return;

    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setTimerPulse(true);
          window.setTimeout(() => setTimerPulse(false), 400);
          return COUNTDOWN_START_SECONDS;
        }
        return prev - 1;
      });
    }, TICK_MS);

    return () => window.clearInterval(interval);
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
        <FakeUrgencyExplanation choice={choice} embedded={embedded} footer />,
      );
      return;
    }
    onExplanation(null);
  }, [footerExplanation, onExplanation, showExplanation, choice, embedded]);

  useEffect(() => {
    if (!onExplanation || !footerExplanation) return;
    return () => onExplanation(null);
  }, [onExplanation, footerExplanation]);

  const handleChoice = (next: UrgencyChoice) => {
    if (resolved) return;
    setChoice(next);
  };

  if (!open) return null;

  const viewportClass = embedded ? "relative w-full min-h-0" : `relative w-full ${minHeightClass}`;

  return (
    <div className={viewportClass}>
      <AnimatePresence mode="wait">
        {!resolved ? (
          <motion.div
            key="fake-urgency-modal"
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
            <ModalLayer
              embedded={embedded}
              splitCompact={splitCompact}
              reducedMotion={reducedMotion}
              secondsLeft={secondsLeft}
              timerPulse={timerPulse}
              waitReady={waitReady}
              waitHover={waitHover}
              onWaitHover={setWaitHover}
              onRush={() => handleChoice("rush")}
              onWait={() => handleChoice("wait")}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!footerExplanation ? (
        <AnimatePresence>
          {showExplanation && choice ? (
            <FakeUrgencyExplanation key="explanation" choice={choice} embedded={embedded} />
          ) : null}
        </AnimatePresence>
      ) : null}
    </div>
  );
}

type ModalLayerProps = {
  embedded: boolean;
  splitCompact: boolean;
  reducedMotion: boolean;
  secondsLeft: number;
  timerPulse: boolean;
  waitReady: boolean;
  waitHover: boolean;
  onWaitHover: (hover: boolean) => void;
  onRush: () => void;
  onWait: () => void;
};

function ModalLayer({
  embedded,
  splitCompact,
  reducedMotion,
  secondsLeft,
  timerPulse,
  waitReady,
  waitHover,
  onWaitHover,
  onRush,
  onWait,
}: ModalLayerProps) {
  const {
    badge,
    title,
    subtitle,
    stockLabel,
    viewersLabel,
    rushLabel,
    waitLabel,
    waitHoverHint,
    timerResetHint,
  } = FAKE_URGENCY_COPY;

  const isLowTime = secondsLeft <= 15;

  const headerPad = splitCompact ? "px-3 py-2" : "px-4 py-3 sm:px-5";
  const bodyClass = splitCompact
    ? "space-y-2 p-2"
    : embedded
      ? "space-y-3 p-3"
      : "space-y-5 p-4 sm:p-5";
  const titleClass = splitCompact
    ? "font-display text-sm uppercase leading-tight tracking-wider text-museum-text"
    : "font-display text-lg uppercase leading-tight tracking-wider text-museum-text sm:text-xl";
  const subtitleClass = splitCompact
    ? "mt-1 text-xs leading-5 text-museum-muted"
    : "mt-2 text-sm leading-6 text-museum-muted";
  const timerPad = splitCompact ? "border p-2 text-center" : "border p-4 text-center";
  const timerTextClass = splitCompact
    ? "font-display text-2xl tabular-nums tracking-wider text-museum-neon"
    : "font-display text-4xl tabular-nums tracking-wider text-museum-neon sm:text-5xl";
  const rushBtnClass = splitCompact
    ? "w-full border border-museum-neon/70 bg-museum-neon/15 px-2 py-2.5 font-mono text-[8px] uppercase leading-snug tracking-[0.08em] text-museum-neon transition-colors hover:bg-museum-neon/25 hover:shadow-neon-sm"
    : "w-full border border-museum-neon/70 bg-museum-neon/15 px-4 py-4 font-mono text-[10px] uppercase leading-snug tracking-[0.1em] text-museum-neon transition-colors hover:bg-museum-neon/25 hover:shadow-neon-sm sm:text-[11px]";
  const waitWrapClass = splitCompact ? "relative pb-4" : "relative pb-6";
  const waitBtnClass = splitCompact
    ? "w-full border border-museum-border bg-museum-void/60 px-2 py-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.05em] text-museum-muted transition-colors enabled:hover:border-museum-warning/50 enabled:hover:text-museum-warning disabled:cursor-not-allowed disabled:opacity-40"
    : "w-full border border-museum-border bg-museum-void/60 px-3 py-2.5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.06em] text-museum-muted transition-colors enabled:hover:border-museum-warning/50 enabled:hover:text-museum-warning disabled:cursor-not-allowed disabled:opacity-40 sm:text-[10px]";

  return (
    <>
      {!embedded ? (
        <div className="absolute inset-0 bg-museum-void/92 backdrop-blur-sm" aria-hidden />
      ) : null}

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="fake-urgency-title"
        aria-describedby="fake-urgency-desc"
        className={`relative z-0 w-full border border-museum-warning/45 bg-museum-panel shadow-neon ${
          embedded ? "max-w-none" : "z-10 max-w-md"
        }`}
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`border-b border-museum-warning/35 bg-museum-warning/10 ${headerPad}`}>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-museum-warning">
            {badge}
          </p>
        </div>

        <div className={bodyClass}>
          <div>
            <h3 id="fake-urgency-title" className={titleClass}>
              {title}
            </h3>
            <p id="fake-urgency-desc" className={subtitleClass}>
              {subtitle}
            </p>
          </div>

          <motion.div
            className={`${timerPad} ${
              isLowTime
                ? "border-museum-neon/70 bg-museum-neon/15"
                : "border-museum-warning/50 bg-museum-warning/10"
            }`}
            animate={
              reducedMotion || !isLowTime
                ? timerPulse
                  ? { scale: [1, 1.04, 1] }
                  : undefined
                : {
                    opacity: [1, 0.7, 1],
                    scale: [1, 1.02, 1],
                  }
            }
            transition={{
              duration: timerPulse ? 0.4 : 0.85,
              repeat: timerPulse ? 0 : Infinity,
            }}
          >
            <p className={timerTextClass}>{formatCountdown(secondsLeft)}</p>
            {timerPulse ? (
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-museum-warning">
                {timerResetHint}
              </p>
            ) : null}
          </motion.div>

          <div className={`grid grid-cols-2 gap-2 font-mono uppercase tracking-[0.14em] ${splitCompact ? "text-[8px]" : "text-[9px] sm:text-[10px]"}`}>
            <div className="border border-museum-border bg-museum-void/60 px-2 py-2 text-center text-museum-muted">
              <span className="block text-museum-warning">{stockLabel}</span>
              <span className="mt-1 block text-museum-neon">2 left</span>
            </div>
            <div className="border border-museum-border bg-museum-void/60 px-2 py-2 text-center text-museum-muted">
              <span className="block text-museum-scan">{viewersLabel}</span>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={onRush}
            className={rushBtnClass}
            animate={
              reducedMotion
                ? undefined
                : {
                    boxShadow: [
                      "0 0 0 rgba(255,0,60,0)",
                      "0 0 22px rgba(255,0,60,0.4)",
                      "0 0 0 rgba(255,0,60,0)",
                    ],
                  }
            }
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            {rushLabel}
          </motion.button>

          <div className={waitWrapClass}>
            <motion.button
              type="button"
              disabled={!waitReady}
              onClick={onWait}
              onMouseEnter={() => onWaitHover(true)}
              onMouseLeave={() => onWaitHover(false)}
              onFocus={() => onWaitHover(true)}
              onBlur={() => onWaitHover(false)}
              className={waitBtnClass}
            >
              {waitLabel}
            </motion.button>

            <AnimatePresence>
              {waitHover && waitReady ? (
                <motion.p
                  className="absolute bottom-0 left-0 right-0 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-museum-warning"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {waitHoverHint}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
}

type FakeUrgencyExplanationProps = {
  choice: NonNullable<UrgencyChoice>;
  embedded: boolean;
  footer?: boolean;
};

function FakeUrgencyExplanation({
  choice,
  embedded,
  footer = false,
}: FakeUrgencyExplanationProps) {
  const {
    sectionLabel,
    rushOpener,
    waitOpener,
    bodyLead,
    bodyFollowUpBefore,
    bodyFollowUpHighlight,
    bodyFollowUpAfter,
    museumNote,
  } = FAKE_URGENCY_EXPLANATION;

  const opener = choice === "rush" ? rushOpener : waitOpener;

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
          <strong className="text-museum-text">Fake urgency</strong>
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
