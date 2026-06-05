"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AtmosphericField() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,0,60,0.16),transparent_32%),linear-gradient(120deg,rgba(0,240,255,0.08),transparent_34%,rgba(255,176,32,0.05)_62%,transparent_76%)]" />
      <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-museum-neon/40 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-[58vh] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-museum-scan/20 to-transparent" />
      <motion.div
        className="absolute inset-x-[-10%] top-[28%] h-40 skew-y-[-8deg] border-y border-museum-neon/10 bg-museum-neon/[0.025]"
        animate={reduced ? {} : { x: ["-4%", "4%", "-4%"], opacity: [0.2, 0.36, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-1/2 h-44 w-[76vw] -translate-x-1/2 border border-museum-border/70 bg-museum-void/20"
        animate={reduced ? {} : { scaleX: [0.96, 1, 0.96], opacity: [0.22, 0.4, 0.22] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
