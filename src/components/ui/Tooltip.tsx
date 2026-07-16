"use client";

import { useState, useRef, type ReactNode } from "react";

type TooltipProps = {
  children: ReactNode;
  content: string;
};

export function Tooltip({ children, content }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
  };

  const hide = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 150);
  };

  return (
    <span
      className="relative inline cursor-help border-b border-dashed border-museum-neon/50 hover:border-museum-neon"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-normal rounded border border-museum-neon/40 bg-museum-void/95 px-3 py-2 font-mono text-[10px] leading-5 text-museum-text/90 shadow-neon-sm backdrop-blur-sm"
          style={{ maxWidth: "280px", width: "max-content" }}
        >
          {content}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-museum-neon/40" />
        </span>
      )}
    </span>
  );
}
