"use client";

/**
 * GEN-0 — the site's robot mascot. Pure SVG + CSS, no assets.
 * Its pupils track the cursor, it blinks on a lazy interval, idles on a
 * slow float, and clicking it cycles through terminal one-liners in a
 * speech bubble. Keyboard accessible (it's a real button). Reduced motion:
 * no float, no blink, centred eyes — still clickable.
 */

import { useEffect, useRef, useState } from "react";

const QUIPS = [
  "beep. ideas compile faster than code.",
  "scanning for teams[≤5]…",
  "any department. even mine.",
  "the rule book is one page. read it.",
  "entry fee: ₹0. verified.",
  "bring a problem worth solving.",
];

export function Bot({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [quip, setQuip] = useState(0);
  const [bubble, setBubble] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height * 0.38;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const d = Math.hypot(dx, dy) || 1;
        const m = Math.min(d, 90) / 90; // full deflection within 90px…∞
        setPupil({ x: (dx / d) * 2.6 * m, y: (dy / d) * 2.2 * m });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let blinkTimer: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      blinkTimer = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        scheduleBlink();
      }, 3200 + Math.random() * 3800);
    };
    scheduleBlink();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(blinkTimer);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const speak = () => {
    setQuip((q) => (bubble ? (q + 1) % QUIPS.length : q));
    setBubble(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setBubble(false), 4000);
  };

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <div
        role="status"
        aria-live="polite"
        className={`absolute -top-14 left-1/2 w-56 -translate-x-1/2 rounded-sm border border-line bg-panel px-3 py-2 text-center font-mono text-[0.68rem] leading-snug text-fg transition-opacity duration-200 ${
          bubble ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {bubble ? QUIPS[quip] : ""}
        <span
          className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-line bg-panel"
          aria-hidden="true"
        />
      </div>

      <button
        type="button"
        aria-label="GEN-0, the GENESIS bot — press for a transmission"
        onClick={speak}
        className="bot-float block cursor-pointer"
      >
        <svg
          width="132"
          height="150"
          viewBox="0 0 120 136"
          fill="none"
          aria-hidden="true"
        >
          {/* antenna */}
          <line x1="60" y1="10" x2="60" y2="24" stroke="#1C2430" strokeWidth="2" />
          <circle className="bot-led" cx="60" cy="8" r="4" fill="#FFB020" />
          {/* head */}
          <rect x="20" y="24" width="80" height="60" rx="10" fill="#0D1119" stroke="#1C2430" />
          {/* visor */}
          <rect x="30" y="36" width="60" height="28" rx="6" fill="#06080D" stroke="#1C2430" />
          {/* eyes */}
          <g>
            <circle cx="48" cy="50" r="7" fill="#0D1119" stroke="#1C2430" />
            <circle cx="72" cy="50" r="7" fill="#0D1119" stroke="#1C2430" />
            <circle
              cx={48 + pupil.x}
              cy={50 + pupil.y}
              r="3"
              fill="#FFB020"
              style={{ transform: blink ? "scaleY(0.08)" : undefined, transformOrigin: "48px 50px" }}
            />
            <circle
              cx={72 + pupil.x}
              cy={50 + pupil.y}
              r="3"
              fill="#FFB020"
              style={{ transform: blink ? "scaleY(0.08)" : undefined, transformOrigin: "72px 50px" }}
            />
          </g>
          {/* speaker dots */}
          {[44, 52, 60, 68, 76].map((x) => (
            <circle key={x} cx={x} cy="74" r="1.6" fill="#7D8794" />
          ))}
          {/* neck + torso */}
          <rect x="52" y="84" width="16" height="6" fill="#1C2430" />
          <rect x="34" y="90" width="52" height="30" rx="8" fill="#0D1119" stroke="#1C2430" />
          <rect x="55" y="98" width="10" height="10" rx="2" fill="none" stroke="#FFB020" />
          <circle className="bot-led" cx="42" cy="112" r="2" fill="#4DE1FF" />
          {/* shoulders */}
          <rect x="24" y="94" width="8" height="18" rx="4" fill="#0D1119" stroke="#1C2430" />
          <rect x="88" y="94" width="8" height="18" rx="4" fill="#0D1119" stroke="#1C2430" />
        </svg>
      </button>
    </div>
  );
}
