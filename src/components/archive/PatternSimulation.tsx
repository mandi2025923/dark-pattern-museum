"use client";

import { motion } from "framer-motion";
import { ConfirmShamingModal } from "@/components/simulations/ConfirmShamingModal";
import type { SimulationType } from "@/types/museum";

type PatternSimulationProps = {
  type: SimulationType;
};

export function PatternSimulation({ type }: PatternSimulationProps) {
  if (type === "infinite-scroll") {
    return <InfiniteScrollPreview />;
  }

  if (type === "confirmshaming") {
    return <ConfirmshamingPreview />;
  }

  if (type === "fake-urgency") {
    return <FakeUrgencyPreview />;
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

/** Full confirmshaming trap — interactive modal + post-choice explanation. */
function ConfirmshamingPreview() {
  return <ConfirmShamingModal />;
}

function FakeUrgencyPreview() {
  return (
    <div className="grid gap-3">
      <motion.div
        className="border border-museum-neon/50 bg-museum-neon/10 p-4 text-center font-display text-3xl text-museum-neon"
        animate={{ opacity: [1, 0.55, 1], scale: [1, 0.98, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        00:47
      </motion.div>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-museum-warning">
        3 visitors are looking now
      </div>
    </div>
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
