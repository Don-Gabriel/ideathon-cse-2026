"use client";

/**
 * Scroll-triggered reveal: 14px translate + fade, once only.
 *
 * Progressive-enhancement design: the server HTML (and therefore no-JS,
 * slow-JS and reduced-motion visitors) is fully visible. Only after mount,
 * elements still below the fold are hidden and revealed as they scroll
 * into view. Nothing is ever invisible while JavaScript loads.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let obs: IntersectionObserver | undefined;
    const t = setTimeout(() => {
      // Above (or in) the viewport already — leave it visible, no animation.
      if (el.getBoundingClientRect().top <= window.innerHeight * 0.92) return;
      setHidden(true);
      obs = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setHidden(false);
            obs?.disconnect();
          }
        },
        { rootMargin: "0px 0px -60px 0px" }
      );
      obs.observe(el);
    }, 0);

    return () => {
      clearTimeout(t);
      obs?.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(14px)" : "none",
        transition: `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
