"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ConfirmShamingModal } from "@/components/simulations/ConfirmShamingModal";
import { CONFIRM_SHAMING_COPY } from "@/components/simulations/ConfirmShamingModal";
import { FakeUrgencyModal } from "@/components/simulations/FakeUrgencyModal";
import { FAKE_URGENCY_COPY } from "@/components/simulations/FakeUrgencyModal";
import { ForcedContinuityModal } from "@/components/simulations/ForcedContinuityModal";
import { MotelExhibit, MOTEL_EXHIBIT_COPY } from "@/components/simulations/MotelExhibit";
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
  if (type === "motel-dark-pattern") {
    return variant === "interactive" ? (
      <MotelInteractivePreview layout={layout} onExplanation={onExplanation} />
    ) : (
      <MotelStaticPreview />
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

function MotelInteractivePreview({
  layout,
  onExplanation,
}: {
  layout: SimulationModalLayout;
  onExplanation?: (node: ReactNode | null) => void;
}) {
  return (
    <MotelExhibit
      layout={layout}
      minHeightClass={layout === "embedded" || layout === "split" ? "min-h-0" : undefined}
      onExplanation={onExplanation}
    />
  );
}

function MotelStaticPreview() {
  const { enterLabel, exitLabel } = MOTEL_EXHIBIT_COPY;

  return (
    <div className="pointer-events-none space-y-3" aria-hidden>
      <div className="border border-museum-neon/40 bg-museum-neon/10 p-3 text-center font-mono text-[9px] uppercase leading-snug tracking-[0.1em] text-museum-neon sm:text-[10px]">
        {enterLabel}
      </div>
      <div className="border border-museum-border bg-museum-void/70 p-3 text-center font-mono text-[9px] uppercase leading-snug tracking-[0.06em] text-museum-muted sm:text-[10px]">
        {exitLabel}
      </div>
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
