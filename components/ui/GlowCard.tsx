"use client";

/**
 * Card with a cursor-tracking amber glow. Pointer position is written to
 * CSS variables; the gradient itself lives in globals.css (.glow-card).
 * Zero re-renders on move — style is set directly on the element.
 */

import { useRef, type ReactNode } from "react";

export function GlowCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={`glow-card ${className}`}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}
