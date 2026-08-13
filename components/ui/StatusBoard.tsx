"use client";

/**
 * The hero status board — one line, large: what the event is doing right now.
 *
 * Deliberately shows the current phase and nothing else. The full schedule
 * lives in the Timeline section; this is the at-a-glance answer.
 *
 * The headline is derived from the live phase (lib/phase.ts) with dates read
 * from content/event.ts, so it rolls over to the next phase on its own — no
 * edit, no redeploy — and can never contradict the rest of the page. A date
 * that isn't announced yet is simply not claimed.
 *
 * Hydration-safe: `phase` starts as the build-time value from the server and
 * re-derives from the visitor's clock after mount (see useLivePhase).
 */

import { eventDates } from "@/content/event";
import type { PhaseId } from "@/lib/phase";
import { formatDate } from "@/lib/format";

/** "2026-08-17T00:00:00+05:30" -> "17 Aug". Empty/malformed -> null. */
function shortDate(iso: string | undefined): string | null {
  if (!iso) return null;
  const full = formatDate(iso);
  const m = /^(\d+ \w+)/.exec(full);
  return m ? m[1] : null;
}

function headline(phase: PhaseId): { label: string; text: string; danger?: boolean } {
  const opens = shortDate(eventDates.regOpen);
  const closes = shortDate(eventDates.regClose);

  switch (phase) {
    case "BEFORE_OPEN":
      return {
        label: "up next",
        text: opens ? `Registration opens ${opens}` : "Registration opens soon",
      };
    case "REG_OPEN":
      return {
        label: "happening now",
        text: closes ? `Registration open till ${closes}` : "Registration open",
      };
    case "REG_CLOSING_SOON":
      return {
        label: "happening now",
        text: closes ? `Final 48 hours — closes ${closes}` : "Final 48 hours",
        danger: true,
      };
    case "REG_CLOSED":
      return { label: "happening now", text: "Screening in progress" };
    case "SHORTLIST_OUT":
      return { label: "happening now", text: "Shortlist published" };
    case "FINALE_DAY":
      return { label: "happening now", text: "Grand finale — live today" };
    case "COMPLETE":
      return { label: "status", text: "GENESIS 1.0 complete" };
    default:
      return { label: "status", text: "Schedule being finalised" };
  }
}

export function StatusBoard({ phase }: { phase: PhaseId }) {
  const { label, text, danger } = headline(phase);
  const accent = danger ? "text-danger" : "text-phosphor";

  return (
    <div
      className="w-full max-w-xl rounded-sm border border-line bg-panel/80 px-6 py-8 backdrop-blur-[2px] sm:px-8 sm:py-10"
      role="status"
      aria-live="polite"
      aria-label="Current event status"
    >
      <p className="eyebrow flex items-center gap-2">
        <span
          className={`pulse-live inline-block h-1.5 w-1.5 rounded-full ${
            danger ? "bg-danger" : "bg-phosphor"
          }`}
          aria-hidden="true"
        />
        {label}
      </p>
      <p
        className={`mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl ${accent}`}
      >
        {text}
      </p>
    </div>
  );
}
