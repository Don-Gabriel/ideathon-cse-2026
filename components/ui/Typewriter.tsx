"use client";

/**
 * Typewriter reveal: text types out character by character with a block
 * caret when it scrolls into view, once. Server HTML carries the full text
 * (SEO / no-JS safe); screen readers always get the complete string via
 * aria-label. Reduced motion renders instantly.
 */

import { useEffect, useRef, useState } from "react";

export function Typewriter({
  text,
  speed = 28,
  className = "",
}: {
  text: string;
  /** ms per character */
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // -1 = idle (full text shown); >= 0 = typing progress
  const [count, setCount] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let interval: ReturnType<typeof setInterval> | undefined;
    let obs: IntersectionObserver | undefined;
    const t = setTimeout(() => {
      // Already on screen (above the fold) — type immediately feels noisy;
      // only animate elements the visitor scrolls to.
      const start = () => {
        setCount(0);
        let i = 0;
        interval = setInterval(() => {
          i += 1;
          setCount(i);
          if (i >= text.length && interval) clearInterval(interval);
        }, speed);
      };
      if (el.getBoundingClientRect().top <= window.innerHeight) return;
      setCount(0);
      obs = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            start();
            obs?.disconnect();
          }
        },
        { rootMargin: "0px 0px -40px 0px" }
      );
      obs.observe(el);
    }, 0);

    return () => {
      clearTimeout(t);
      if (interval) clearInterval(interval);
      obs?.disconnect();
    };
  }, [text, speed]);

  const typing = count >= 0 && count < text.length;
  const shown = count === -1 ? text : text.slice(0, count);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {shown}
        {typing && <span className="text-phosphor">▌</span>}
      </span>
    </span>
  );
}
