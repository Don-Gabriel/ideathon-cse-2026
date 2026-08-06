/**
 * lib/format.ts
 * Deterministic formatting helpers — no Intl/timezone lookups, so server
 * and client always render identical strings (hydration-safe by design).
 */

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "2026-08-06" (or full ISO) -> "6 Aug 2026". Falls back to the raw string. */
export function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  const [, y, mo, d] = m;
  const month = MONTHS[Number(mo) - 1];
  if (!month) return iso;
  return `${Number(d)} ${month} ${y}`;
}

/** 36000 -> "₹36,000" (Indian digit grouping, done by hand). */
export function formatINR(amount: number): string {
  const s = String(Math.trunc(Math.abs(amount)));
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const grouped = rest
    ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3
    : last3;
  return `${amount < 0 ? "-" : ""}₹${grouped}`;
}

/** Two-digit pad for countdown cells. */
export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}
