"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { InfiniteScrollFeed } from "@/components/archive/InfiniteScrollFeed";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { SimulationModalLayout } from "@/components/simulations/ConfirmShamingModal";

export const INFINITE_SCROLL_EXHIBIT_COPY = {
  badge: "Live feed · Always updating",
  title: "One more scroll?",
  subtitle: "The stream removes your natural stopping point. New dossiers load as you approach the bottom.",
  keepLabel: "Load more — I'm almost caught up",
  stopLabel: "Stop scrolling · I'm done for now",
  stopHoverHint: "3 new items are already queued below",
  scrollNudge: "You're 92% through today's archive",
} as const;

export const INFINITE_SCROLL_EXHIBIT_EXPLANATION = {
  sectionLabel: "Exhibit explanation · Infinite scroll",
  keepOpener:
    "You chose to keep going. Each batch rewarded momentum — the interface pretended you were nearing an end that never arrives.",
  stopOpener:
    "You tried to stop — but the feed had already trained you to treat leaving as missing out on what loads next.",
  bodyLead:
    " removes the pause between intention and consumption. Feeds preload, skeletons shimmer, and ",
  bodyFollowUpBefore: "the ",
  bodyFollowUpHighlight: "stopping point",
  bodyFollowUpAfter: " is designed to move every time you approach it.",
  museumNote:
    "Museum note: No account logged your scroll. Items were simulated locally and deduped by id.",
} as const;

type ScrollChoice = "keep" | "stop" | null;

const AUTO_PROMPT_ITEM_COUNT = 10;
const MODAL_EXIT_DURATION_S = 0.32;

type InfiniteScrollExhibitProps = {
  open?: boolean;
  layout?: SimulationModalLayout;
  onExplanation?: (node: ReactNode | null) => void;
};

export function InfiniteScrollExhibit({
  open = true,
  layout = "split",
  onExplanation,
}: InfiniteScrollExhibitProps) {
  const embedded = layout === "embedded" || layout === "split";
  const footerExplanation = layout === "split" && Boolean(onExplanation);
  const reducedMotion = useReducedMotion();
  const [choice, setChoice] = useState<ScrollChoice>(null);
  const [itemCount, setItemCount] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const resolved = choice !== null;

  useEffect(() => {
    if (!open || resolved) return;
    if (itemCount >= AUTO_PROMPT_ITEM_COUNT) {
      setShowPrompt(true);
    }
  }, [itemCount, open, resolved]);

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
        <InfiniteScrollExplanation choice={choice} embedded={embedded} footer />,
      );
      return;
    }
    onExplanation(null);
  }, [footerExplanation, onExplanation, showExplanation, choice, embedded]);

  useEffect(() => {
    if (!onExplanation || !footerExplanation) return;
    return () => onExplanation(null);
  }, [onExplanation, footerExplanation]);

  useEffect(() => {
    if (!open) {
      setChoice(null);
      setItemCount(0);
      setShowPrompt(false);
    }
  }, [open]);

  const handleChoice = (next: ScrollChoice) => {
    if (resolved) return;
    setChoice(next);
    setShowPrompt(false);
  };

  if (!open) return null;

  const { badge, title, subtitle, keepLabel, stopLabel, stopHoverHint, scrollNudge } =
    INFINITE_SCROLL_EXHIBIT_COPY;

  return (
    <div className="relative w-full min-h-0">
      <AnimatePresence mode="wait">
        {!resolved ? (
          <motion.div
            key="infinite-scroll-exhibit"
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : MODAL_EXIT_DURATION_S }}
          >
            <div className="border border-museum-border bg-museum-void/40 px-3 py-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-museum-scan">
                {badge}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-museum-muted">
                {scrollNudge}
              </p>
            </div>

            <InfiniteScrollFeed
              active
              compact
              onItemCountChange={setItemCount}
            />

            <AnimatePresence>
              {showPrompt ? (
                <motion.div
                  key="scroll-prompt"
                  className="border border-museum-neon/35 bg-museum-neon/5 p-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                >
                  <h3 className="font-display text-sm uppercase tracking-wider text-museum-text">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-5 text-museum-muted">{subtitle}</p>

                  <div className="mt-3 space-y-2">
                    <button
                      type="button"
                      onClick={() => handleChoice("keep")}
                      className="w-full border border-museum-neon/60 bg-museum-neon/10 px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.1em] text-museum-neon transition-colors hover:bg-museum-neon/20 sm:text-[10px]"
                    >
                      {keepLabel}
                    </button>
                    <StopScrollingButton
                      label={stopLabel}
                      hoverHint={stopHoverHint}
                      onStop={() => handleChoice("stop")}
                    />
                  </div>
                </motion.div>
              ) : (
                <StopScrollingButton
                  label={stopLabel}
                  hoverHint={stopHoverHint}
                  onStop={() => handleChoice("stop")}
                  className="opacity-80"
                />
              )}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!footerExplanation ? (
        <AnimatePresence>
          {showExplanation && choice ? (
            <InfiniteScrollExplanation choice={choice} embedded={embedded} />
          ) : null}
        </AnimatePresence>
      ) : null}
    </div>
  );
}

type StopScrollingButtonProps = {
  label: string;
  hoverHint: string;
  onStop: () => void;
  className?: string;
};

function StopScrollingButton({ label, hoverHint, onStop, className = "" }: StopScrollingButtonProps) {
  const [hover, setHover] = useState(false);

  return (
    <div className={`relative pb-5 ${className}`}>
      <button
        type="button"
        onClick={onStop}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className="w-full border border-museum-border bg-museum-void/60 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.06em] text-museum-muted transition-colors hover:border-museum-warning/50 hover:text-museum-warning sm:text-[10px]"
      >
        {label}
      </button>
      <AnimatePresence>
        {hover ? (
          <motion.p
            className="absolute bottom-0 left-0 right-0 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-museum-warning"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {hoverHint}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

type InfiniteScrollExplanationProps = {
  choice: NonNullable<ScrollChoice>;
  embedded: boolean;
  footer?: boolean;
};

function InfiniteScrollExplanation({
  choice,
  embedded,
  footer = false,
}: InfiniteScrollExplanationProps) {
  const {
    sectionLabel,
    keepOpener,
    stopOpener,
    bodyLead,
    bodyFollowUpBefore,
    bodyFollowUpHighlight,
    bodyFollowUpAfter,
    museumNote,
  } = INFINITE_SCROLL_EXHIBIT_EXPLANATION;

  const opener = choice === "keep" ? keepOpener : stopOpener;

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
          <strong className="text-museum-text">Infinite scroll</strong>
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
