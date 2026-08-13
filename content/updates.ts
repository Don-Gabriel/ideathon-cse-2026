/**
 * content/updates.ts
 *
 * The official announcements feed. Newest entry FIRST — the array order is
 * the display order, and the newest entry also powers the announcement bar
 * under the hero (only if it is less than 7 days old).
 *
 * To post an update during the event: add an object to the TOP of the
 * array, commit, redeploy. That's the whole workflow.
 *
 * Drives: Updates section, announcement bar.
 */

export type UpdateTag = "RULEBOOK" | "DEADLINE" | "RESULT";

export interface UpdateEntry {
  /** ISO date, e.g. "2026-08-14". Used for display and the 7-day bar rule. */
  date: string;
  title: string;
  body: string;
  tag?: UpdateTag;
}

export const updates: UpdateEntry[] = [
  {
    date: "2026-08-13",
    title: "Rule book published · registration opens Monday 17 August",
    body: "The official rule book is now linked on this page. Registration opens Monday 17 August and closes Thursday 3 September, 11:59 PM. Cash prizes will be awarded to the winning teams. The shortlist and grand finale dates will be announced here once fixed.",
    tag: "RULEBOOK",
  },
  {
    date: "2026-08-06",
    title: "GENESIS Ideathon 1.0 is live",
    body: "Everything you need — rules, eligibility, submission format — is on this page. Registration details and the rule book follow shortly.",
  },
];
