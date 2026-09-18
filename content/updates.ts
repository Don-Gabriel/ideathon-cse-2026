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
    date: "2026-09-16",
    title: "GENESIS Ideathon 1.0 results · Team ThinkX take first prize",
    body: "The grand finale was held at the Placement Hall on Wednesday 16 September. First prize goes to Team ThinkX, second prize to ResQSquad, and third place is shared between Ray Breakers and Nexora. Congratulations to all four teams, and thank you to every team that entered the first edition of GENESIS. The full podium is in the Results section at the top of this page.",
    tag: "RESULT",
  },
  {
    date: "2026-09-14",
    title: "Finale venue confirmed · Placement Hall, Wednesday 16 September",
    body: "The grand finale will be held at the Placement Hall, Government College of Engineering, Tirunelveli, on Wednesday 16 September. Selected teams should report 30 minutes before the announced start with a college ID card for every member. The reporting time and the running order are shared in the official WhatsApp group.",
    tag: "RESULT",
  },
  {
    date: "2026-09-11",
    title: "Round 1 results are out · grand finale on Wednesday 16 September",
    body: "The Round 1 results have been announced. Every selected team has been informed by mail to the team leader — please check your inbox and spam folder. That mail carries the link to the official WhatsApp group, where all further details about the final round are shared. The grand finale is on Wednesday 16 September; the venue is announced in the group and here. Thank you to every team that entered.",
    tag: "RESULT",
  },
  {
    date: "2026-09-08",
    title: "Registration extended to Wednesday 9 September, 12:00 PM · finale on Wednesday 16 September",
    body: "The registration deadline has been extended to Wednesday 9 September, 12:00 PM (noon) IST — this is the final extension. The final offline round (grand finale) will be held on Wednesday 16 September; the venue will be announced here. Shortlisted teams will be notified through this page.",
    tag: "DEADLINE",
  },
  {
    date: "2026-08-13",
    title: "Rule book published · registration opens Monday 17 August",
    body: "The official rule book is now linked on this page. Registration opens Monday 17 August and closes Monday 7 September, 11:59 PM. Cash prizes will be awarded to the winning teams. The shortlist and grand finale dates will be announced here once fixed.",
    tag: "RULEBOOK",
  },
  {
    date: "2026-08-06",
    title: "GENESIS Ideathon 1.0 is live",
    body: "Everything you need — rules, eligibility, submission format — is on this page. Registration details and the rule book follow shortly.",
  },
];
