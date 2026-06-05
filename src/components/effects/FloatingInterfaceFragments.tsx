"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const fragments = [
  {
    label: "ONLY 02 LEFT",
    className: "left-[6%] top-[22%] hidden w-36 md:block",
    delay: 0,
  },
  {
    label: "ALLOW ALL",
    className: "right-[8%] top-[18%] w-32",
    delay: 0.3,
  },
  {
    label: "99+",
    className: "left-[14%] bottom-[24%] w-20",
    delay: 0.6,
  },
  {
    label: "CONTINUE",
    className: "right-[12%] bottom-[20%] hidden w-40 sm:block",
    delay: 0.9,
  },
  {
    label: "RECOMMENDED",
    className: "left-1/2 top-[13%] hidden w-44 -translate-x-1/2 lg:block",
    delay: 1.2,
  },
];

export function FloatingInterfaceFragments() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {fragments.map((fragment) => (
        <motion.div
          key={fragment.label}
          className={`absolute border border-museum-border/80 bg-museum-panel/45 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-museum-muted shadow-[0_0_28px_rgba(0,0,0,0.35)] backdrop-blur-sm ${fragment.className}`}
          initial={{ opacity: 0, y: 18 }}
          animate={
            reduced
              ? { opacity: 0.45, y: 0 }
              : {
                  opacity: [0.18, 0.55, 0.28],
                  y: [0, -12, 0],
                  x: [0, 4, -2, 0],
                }
          }
          transition={{
            delay: fragment.delay,
            duration: 5.5,
            repeat: reduced ? 0 : Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 bg-museum-neon" />
          {fragment.label}
        </motion.div>
      ))}
    </div>
  );
}
