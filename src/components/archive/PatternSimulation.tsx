"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ConfirmShamingModal } from "@/components/simulations/ConfirmShamingModal";
import { CONFIRM_SHAMING_COPY } from "@/components/simulations/ConfirmShamingModal";
import { FakeUrgencyModal } from "@/components/simulations/FakeUrgencyModal";
import { FAKE_URGENCY_COPY } from "@/components/simulations/FakeUrgencyModal";
import { ForcedContinuityModal } from "@/components/simulations/ForcedContinuityModal";
import { InfiniteScrollExhibit } from "@/components/simulations/InfiniteScrollExhibit";
import type { SimulationModalLayout } from "@/components/simulations/ConfirmShamingModal";
import type { SimulationType } from "@/types/museum";

type PatternSimulationProps = {
  type: SimulationType;
  /**
   * preview — static miniature (archive cards)
   * interactive — full trap UI (expanded dossier for dedicated exhibits)
   */
  variant?: "preview" | "interactive";
  /** embedded | split = inline in archive modal; split sends explanation to footer */
  layout?: SimulationModalLayout;
  /** Receives critical explanation for split archive modal bottom bar */
  onExplanation?: (node: ReactNode | null) => void;
};

export function PatternSimulation({
  type,
  variant = "preview",
  layout = "overlay",
  onExplanation,
}: PatternSimulationProps) {
  if (type === "infinite-scroll") {
    return variant === "interactive" ? (
      <InfiniteScrollInteractivePreview layout={layout} onExplanation={onExplanation} />
    ) : (
      <InfiniteScrollPreview />
    );
  }

  if (type === "forced-continuity") {
    return variant === "interactive" ? (
      <ForcedContinuityInteractivePreview layout={layout} onExplanation={onExplanation} />
    ) : (
      <FrictionFlowPreview />
    );
  }

  if (type === "confirmshaming") {
    return variant === "interactive" ? (
      <ConfirmshamingInteractivePreview layout={layout} onExplanation={onExplanation} />
    ) : (
      <ConfirmshamingStaticPreview />
    );
  }

  if (type === "fake-urgency") {
    return variant === "interactive" ? (
      <FakeUrgencyInteractivePreview layout={layout} onExplanation={onExplanation} />
    ) : (
      <FakeUrgencyStaticPreview />
    );
  }

  if (type === "notification-addiction") {
    return <NotificationPreview />;
  }

  if (type === "privacy-zuckering") {
    return <PrivacyPreview />;
  }

  if (type === "algorithmic-manipulation") {
    return <AlgorithmPreview />;
  }

  if (type === "information-bombardment") {
    return <InformationOverloadPreview />;
  }

  return <FrictionFlowPreview />;
}

function ForcedContinuityInteractivePreview({
  layout,
  onExplanation,
}: {
  layout: SimulationModalLayout;
  onExplanation?: (node: ReactNode | null) => void;
}) {
  return (
    <ForcedContinuityModal
      layout={layout}
      minHeightClass={layout === "embedded" || layout === "split" ? "min-h-0" : undefined}
      onExplanation={onExplanation}
    />
  );
}

function InfiniteScrollInteractivePreview({
  layout,
  onExplanation,
}: {
  layout: SimulationModalLayout;
  onExplanation?: (node: ReactNode | null) => void;
}) {
  return (
    <InfiniteScrollExhibit layout={layout} onExplanation={onExplanation} />
  );
}

function InfiniteScrollPreview() {
  return (
    <div className="space-y-2">
      {[0, 1, 2, 3].map((item) => (
        <motion.div
          key={item}
          className="h-7 border border-museum-border bg-museum-void/60"
          animate={{ x: [0, item % 2 ? 6 : -4, 0], opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: item * 0.18 }}
        />
      ))}
      <motion.div
        className="mx-auto h-1 w-16 bg-museum-neon/70"
        animate={{ scaleX: [0.2, 1, 0.2] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      />
    </div>
  );
}

/** Archive card — non-interactive visual only; navigation opens the simulation room. */
function ConfirmshamingStaticPreview() {
  const { acceptLabel, declineLabel } = CONFIRM_SHAMING_COPY;

  return (
    <div className="pointer-events-none space-y-3" aria-hidden>
      <div className="border border-museum-neon/40 bg-museum-neon/10 p-3 text-center font-mono text-[9px] uppercase leading-snug tracking-[0.1em] text-museum-neon sm:text-[10px]">
        {acceptLabel}
      </div>
      <div className="border border-museum-border bg-museum-void/70 p-3 text-center font-mono text-[9px] uppercase leading-snug tracking-[0.06em] text-museum-muted sm:text-[10px]">
        {declineLabel}
      </div>
    </div>
  );
}

function ConfirmshamingInteractivePreview({
  layout,
  onExplanation,
}: {
  layout: SimulationModalLayout;
  onExplanation?: (node: ReactNode | null) => void;
}) {
  return (
    <ConfirmShamingModal
      layout={layout}
      minHeightClass={layout === "embedded" || layout === "split" ? "min-h-0" : undefined}
      onExplanation={onExplanation}
    />
  );
}

/** Archive card — static countdown preview; room link handles navigation. */
function FakeUrgencyStaticPreview() {
  const { viewersLabel } = FAKE_URGENCY_COPY;

  return (
    <div className="pointer-events-none grid gap-3" aria-hidden>
      <div className="border border-museum-neon/50 bg-museum-neon/10 p-4 text-center font-display text-3xl text-museum-neon">
        00:47
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-museum-warning">
        {viewersLabel}
      </div>
    </div>
  );
}

function FakeUrgencyInteractivePreview({
  layout,
  onExplanation,
}: {
  layout: SimulationModalLayout;
  onExplanation?: (node: ReactNode | null) => void;
}) {
  return (
    <FakeUrgencyModal
      layout={layout}
      minHeightClass={layout === "embedded" || layout === "split" ? "min-h-0" : undefined}
      onExplanation={onExplanation}
    />
  );
}

function NotificationPreview() {
  return (
    <div className="relative h-32 overflow-hidden">
      {[0, 1, 2].map((item) => (
        <motion.div
          key={item}
          className="absolute right-0 w-[84%] border border-museum-neon/35 bg-museum-panel p-2 font-mono text-[10px] uppercase tracking-[0.16em] text-museum-text"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: [80, 0, 0, 80], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: item * 0.65 }}
          style={{ top: item * 34 }}
        >
          <span className="mr-2 text-museum-neon">●</span> New signal detected
        </motion.div>
      ))}
    </div>
  );
}

function PrivacyPreview() {
  return (
    <div className="space-y-3">
      {["Personalization", "Partner access", "Location memory"].map((label, index) => (
        <div key={label} className="flex items-center justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-museum-muted">
            {label}
          </span>
          <motion.span
            className="h-4 w-8 border border-museum-neon/40 bg-museum-neon/20"
            animate={{ x: [0, index === 1 ? -4 : 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
          />
        </div>
      ))}
    </div>
  );
}

function AlgorithmPreview() {
  return (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: 15 }).map((_, index) => (
        <motion.span
          key={index}
          className="aspect-square border border-museum-border bg-museum-void"
          animate={{
            backgroundColor:
              index % 3 === 0
                ? ["rgba(255,0,60,0.08)", "rgba(255,0,60,0.45)", "rgba(255,0,60,0.08)"]
                : ["rgba(0,240,255,0.04)", "rgba(0,240,255,0.18)", "rgba(0,240,255,0.04)"],
          }}
          transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.06 }}
        />
      ))}
    </div>
  );
}

function InformationOverloadPreview() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 18 }).map((_, index) => (
        <motion.div
          key={index}
          className="h-5 border border-museum-border bg-museum-panel"
          animate={{ opacity: [0.2, 0.95, 0.2] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.05 }}
        />
      ))}
    </div>
  );
}

function FrictionFlowPreview() {
  return (
    <div className="space-y-2">
      {["Start", "Wait", "Confirm", "Call support"].map((label, index) => (
        <motion.div
          key={label}
          className="border border-museum-border bg-museum-void/60 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-museum-muted"
          animate={{ x: [0, index * 3, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.12 }}
        >
          {label}
        </motion.div>
      ))}
    </div>
  );
}
