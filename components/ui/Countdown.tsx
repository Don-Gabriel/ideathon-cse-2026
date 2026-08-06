"use client";

/**
 * Split-flap countdown — each unit is a mechanical flip card. On change,
 * the top half folds down showing the old value while the new value
 * unfolds from the seam, exactly like a departure board.
 *
 * Hydration-safe: server (and first client render) shows fixed-width "--"
 * placeholders; real digits appear after mount and tick every second.
 * Reduced motion: values swap with no flap animation.
 * Renders nothing if the target date is missing or malformed.
 */

import { useEffect, useState } from "react";
import { countdownTo } from "@/lib/phase";
import { pad2 } from "@/lib/format";

function FlipUnit({
  v,
  size,
  accent,
}: {
  v: string;
  size: "lg" | "sm";
  accent: string;
}) {
  // "Adjust state when props change" pattern — remembers the outgoing value
  // without effects or refs, so the flap can show old-over-new.
  const [pair, setPair] = useState({ curr: v, prev: v });
  if (pair.curr !== v) {
    setPair({ curr: v, prev: pair.curr });
  }
  const from = pair.curr !== v ? pair.curr : pair.prev;
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const changed = !reduce && from !== v;

  const box =
    size === "lg"
      ? "h-12 w-14 text-3xl sm:h-14 sm:w-[4.4rem] sm:text-4xl"
      : "h-8 w-9 text-base";

  const txt = `fc-txt font-mono tabular font-medium ${accent}`;

  return (
    <span className={`flip-card ${box}`}>
      {/* static top: the incoming value, revealed as the flap falls */}
      <span className="fc-half fc-top">
        <span className={txt}>{v}</span>
      </span>
      {/* static bottom: the outgoing value, covered by the unfolding flap */}
      <span className="fc-half fc-bottom">
        <span className={txt}>{changed ? from : v}</span>
      </span>
      {changed && (
        <>
          <span key={`fold-${v}`} className="fc-half fc-top fc-fold">
            <span className={txt}>{from}</span>
          </span>
          <span key={`unfold-${v}`} className="fc-half fc-bottom fc-unfold">
            <span className={txt}>{v}</span>
          </span>
        </>
      )}
      <span className="fc-seam" />
    </span>
  );
}

const UNITS = [
  ["days", "days"],
  ["hours", "hrs"],
  ["minutes", "min"],
  ["seconds", "sec"],
] as const;

export function Countdown({
  target,
  label,
  danger = false,
  size = "lg",
}: {
  /** ISO date string the countdown runs to. */
  target: string;
  /** What this countdown is counting to — always shown. */
  label: string;
  danger?: boolean;
  size?: "lg" | "sm";
}) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const parts = now ? countdownTo(now, target) : null;

  // Malformed target after mount → render nothing rather than a frozen "--".
  if (now && !parts) return null;

  const accent = danger ? "text-danger" : "text-phosphor";
  const sep =
    size === "lg"
      ? "text-2xl sm:text-3xl"
      : "text-sm";

  return (
    <div role="timer" aria-label={label}>
      <p className="eyebrow mb-2.5">{label}</p>
      <div className="flex items-center" aria-hidden="true">
        {UNITS.map(([key, unit], i) => (
          <div key={unit} className="flex items-center">
            {i > 0 && (
              <span
                className={`font-mono ${sep} px-1.5 text-line select-none sm:px-2.5`}
              >
                :
              </span>
            )}
            <div className="flex flex-col items-center gap-1.5">
              <FlipUnit
                v={parts ? pad2(parts[key]) : "--"}
                size={size}
                accent={accent}
              />
              <span className="eyebrow">{unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
