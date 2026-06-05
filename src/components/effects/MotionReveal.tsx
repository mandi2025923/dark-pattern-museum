"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/animations/variants";
import { viewportOnce } from "@/animations/motion-config";

type MotionRevealProps = {
  children: ReactNode;
  delayIndex?: number;
};

export function MotionReveal({ children, delayIndex = 0 }: MotionRevealProps) {
  return (
    <motion.div
      custom={delayIndex}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}
