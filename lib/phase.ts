/**
 * lib/phase.ts
 *
 * The date-aware phase engine — the site's core reliability feature.
 * Pure functions of (now, dates): no stored state, nothing to go stale.
 *
 * `derivePhase` powers the hero (headline / CTA / helper swap) and
 * `deriveStageStatus` powers the pipeline timeline nodes.
 */

import { eventDates, type EventDates } from "@/content/event";

export type PhaseId =
  | "BEFORE_OPEN"
  | "REG_OPEN"
  | "REG_CLOSING_SOON"
  | "REG_CLOSED"
  | "SHORTLIST_OUT"
  | "FINALE_DAY"
  | "COMPLETE"
  | "UNKNOWN";

export type StageStatus = "COMPLETE" | "LIVE" | "QUEUED";

/** Final-window threshold: 48 hours before registration closes. */
const CLOSING_SOON_MS = 48 * 60 * 60 * 1000;

/**
 * Parse an ISO date string; returns null (never an Invalid Date) on bad
 * input so callers can degrade gracefully.
 */
export function parseDate(iso: string | undefined | null): Date | null {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Derive the single event phase for a given moment.
 *
 * The registration window is the only part that must be configured: without
 * a valid regOpen/regClose the engine returns "UNKNOWN" and the UI stops
 * making time-based claims instead of making wrong ones.
 *
 * The later dates (shortlist, finale) are allowed to be unannounced — an
 * empty or malformed value simply means the site never advances past the
 * preceding phase, which is exactly the truth: it is not announced yet.
 */
export function derivePhase(now: Date, dates: EventDates = eventDates): PhaseId {
  const regOpen = parseDate(dates.regOpen);
  const regClose = parseDate(dates.regClose);
  const shortlist = parseDate(dates.shortlistAnnounce);
  const finaleStart = parseDate(dates.finaleStart);
  const finaleEnd = parseDate(dates.finaleEnd);

  if (!regOpen || !regClose) return "UNKNOWN";

  const t = now.getTime();
  if (t < regOpen.getTime()) return "BEFORE_OPEN";
  if (t <= regClose.getTime()) {
    return regClose.getTime() - t <= CLOSING_SOON_MS
      ? "REG_CLOSING_SOON"
      : "REG_OPEN";
  }
  if (!shortlist || t < shortlist.getTime()) return "REG_CLOSED";
  if (!finaleStart || t < finaleStart.getTime()) return "SHORTLIST_OUT";
  if (!finaleEnd || t <= finaleEnd.getTime()) return "FINALE_DAY";
  return "COMPLETE";
}

/**
 * Derive a timeline stage's node state from its own window.
 * Malformed dates degrade to QUEUED (dim, no live claims).
 */
export function deriveStageStatus(
  now: Date,
  start: string,
  end: string
): StageStatus {
  const s = parseDate(start);
  const e = parseDate(end);
  if (!s || !e) return "QUEUED";
  const t = now.getTime();
  if (t > e.getTime()) return "COMPLETE";
  if (t >= s.getTime()) return "LIVE";
  return "QUEUED";
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** Time remaining until `target`, clamped at zero. Null if target invalid. */
export function countdownTo(
  now: Date,
  target: string | undefined
): CountdownParts | null {
  const t = parseDate(target);
  if (!t) return null;
  const ms = Math.max(0, t.getTime() - now.getTime());
  const seconds = Math.floor(ms / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}
