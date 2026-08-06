"use client";

/**
 * Number that counts up when scrolled into view. Server HTML carries the
 * final value (SEO / no-JS safe); after mount, below-fold instances reset
 * to zero and ease up when seen. Reduced motion: static.
 */

import { useEffect, useRef, useState } from "react";

export function CountUp({
  to,
  format = (n) => String(n),
  duration = 900,
  className = "",
}: {
  to: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let obs: IntersectionObserver | undefined;
    const t = setTimeout(() => {
      if (el.getBoundingClientRect().top <= window.innerHeight) return;
      setVal(0);
      obs = new IntersectionObserver(
        (entries) => {
          if (!entries[0]?.isIntersecting) return;
          obs?.disconnect();
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        },
        { rootMargin: "0px 0px -30px 0px" }
      );
      obs.observe(el);
    }, 0);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      obs?.disconnect();
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {format(val)}
    </span>
  );
}
