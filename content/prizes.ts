/**
 * content/prizes.ts
 *
 * Prize tiers and certificate facts.
 * TODO: confirm prize amounts before launch — the numbers below are
 * PLACEHOLDERS supplied for layout purposes and are NOT final.
 *
 * Drives: Prizes section, and the "₹ prize pool" stat in About
 * (the pool is summed from `amount` values here — change a number and
 * the stat updates itself).
 */

export interface PrizeTier {
  id: string;
  title: string;
  /** Rupee amount, no formatting — the UI formats it. */
  amount: number;
  /** "main" tiers render as the podium; "special" as award cards. */
  kind: "main" | "special";
  /** 1 = winner (most prominent), 2, 3 for podium order. */
  rank?: number;
  detail: string;
}

export const prizeTiers: PrizeTier[] = [
  {
    id: "winner",
    title: "Winner",
    amount: 15000,
    kind: "main",
    rank: 1,
    detail: "Cash prize, trophy and merit certificates for all five members.",
  },
  {
    id: "runner-up",
    title: "Runner-up",
    amount: 10000,
    kind: "main",
    rank: 2,
    detail: "Cash prize, trophy and merit certificates for all five members.",
  },
  {
    id: "second-runner-up",
    title: "Second runner-up",
    amount: 5000,
    kind: "main",
    rank: 3,
    detail: "Cash prize, trophy and merit certificates for all five members.",
  },
  {
    id: "all-women",
    title: "Best all-women team",
    amount: 3000,
    kind: "special",
    detail: "For the highest-scoring team with five women members.",
  },
  {
    id: "most-innovative",
    title: "Most innovative idea",
    amount: 3000,
    kind: "special",
    detail: "Picked by the panel for originality, independent of final rank.",
  },
];

/** Certificate facts, shown under the prize tiers. */
export const certificates = [
  {
    title: "Merit certificates & trophies",
    detail: "For winning teams, presented at the finale.",
  },
  {
    title: "Finalist certificates",
    detail: "For every member of the top 20 teams.",
  },
  {
    title: "Participation certificates",
    detail: "For every finalist on stage day.",
  },
];

/** Total pool, derived — never hardcode this anywhere. */
export const prizePool = prizeTiers.reduce((sum, t) => sum + t.amount, 0);
