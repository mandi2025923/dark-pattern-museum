"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CyberButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "ghost" | "danger";
  className?: string;
};

const variantStyles = {
  primary:
    "bg-museum-neon/10 text-museum-neon border-museum-neon/60 hover:bg-museum-neon/20 hover:shadow-neon-sm",
  ghost:
    "bg-transparent text-museum-text border-museum-border hover:border-museum-neon/40 hover:text-museum-neon",
  danger:
    "bg-museum-warning/10 text-museum-warning border-museum-warning/50 hover:bg-museum-warning/20",
};

export function CyberButton({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
}: CyberButtonProps) {
  const baseClass = `inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] border transition-all duration-300 clip-cyber cyber-corner ${variantStyles[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={baseClass}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} className={baseClass} {...motionProps}>
      {children}
    </motion.button>
  );
}
