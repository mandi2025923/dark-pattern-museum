"use client";

import { useEffect, useState } from "react";

export function useNotificationBurst(total = 4, intervalMs = 900) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= total) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCount((current) => current + 1);
    }, intervalMs);

    return () => window.clearTimeout(timer);
  }, [count, intervalMs, total]);

  return {
    count,
    complete: count >= total,
    reset: () => setCount(0),
  };
}
