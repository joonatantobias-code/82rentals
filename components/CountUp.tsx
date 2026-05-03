"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to `to` once the element scrolls into view. Supports decimal
 * targets (e.g. 4.9 with `decimals={1}`) and an optional suffix (★, %, +).
 */
export default function CountUp({
  to,
  decimals = 0,
  suffix = "",
  duration = 1.6,
  className = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const formatted = value.toFixed(decimals).replace(".", ",");

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}
