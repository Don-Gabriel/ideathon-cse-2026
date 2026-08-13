/**
 * content/timeline.ts
 *
 * The four pipeline stages shown in the Timeline section. Each stage's
 * COMPLETE / LIVE / QUEUED state is derived from `start` and `end` at view
 * time (lib/phase.ts) — never stored, so it can never go stale.
 *
 * Drives: Timeline section, How-it-works cross-references.
 */

export interface TimelineStage {
  id: string;
  /** Two-digit step number, rendered in mono. */
  step: string;
  /** Build-pipeline tag rendered as the stage's mono eyebrow. */
  buildTag: string;
  title: string;
  /** Human-readable date range shown on the node. */
  dateLabel: string;
  /**
   * ISO strings with the +05:30 offset — keep the offset.
   * Leave both as "" for a stage whose dates are not announced yet: the
   * node then stays QUEUED instead of claiming a schedule it doesn't have.
   */
  start: string;
  end: string;
  description: string;
}

export const timelineStages: TimelineStage[] = [
  {
    id: "submit",
    step: "01",
    buildTag: "source",
    title: "Registration & idea submission",
    dateLabel: "Mon 17 Aug → Thu 3 Sep, 11:59 PM",
    start: "2026-08-17T00:00:00+05:30",
    end: "2026-09-03T23:59:59+05:30",
    description:
      "Form a team of up to five, put your idea into the template given inside the Google Form, and submit it as a PDF before the deadline. One form per team, filled by the team lead.",
  },
  {
    id: "screening",
    step: "02",
    buildTag: "compile",
    title: "Blind screening",
    dateLabel: "After 3 Sep · dates to be announced",
    start: "",
    end: "",
    description:
      "Every submission is stripped of names and departments, then scored independently by faculty evaluators. Nothing for you to do here but wait.",
  },
  {
    id: "shortlist",
    step: "03",
    buildTag: "release",
    title: "Shortlist announced",
    dateLabel: "To be announced",
    start: "",
    end: "",
    description:
      "The top 20 teams are posted in Updates on this page — that's the official record. Shortlisted teams get pitch-preparation details along with the announcement, and must confirm participation within the time specified.",
  },
  {
    id: "finale",
    step: "04",
    buildTag: "deploy",
    title: "Grand finale",
    dateLabel: "To be announced · on campus",
    start: "",
    end: "",
    description:
      "Shortlisted teams pitch live at SSS Block, Department of CSE: 10 minutes per team, maximum 10 slides. Report 30 minutes before the announced start with your college ID card. Winners are announced the same day.",
  },
];
