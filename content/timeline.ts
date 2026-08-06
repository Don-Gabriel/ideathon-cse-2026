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
  /** ISO strings with the +05:30 offset — keep the offset. */
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
    dateLabel: "Tue 11 Aug → Tue 25 Aug, 11:59 PM",
    start: "2026-08-11T00:00:00+05:30",
    end: "2026-08-25T23:59:59+05:30",
    description:
      "Form a team of up to five, put your idea into the given template and submit it through the Google Form before the deadline. One submission per team.",
  },
  {
    id: "screening",
    step: "02",
    buildTag: "compile",
    title: "Blind screening",
    dateLabel: "Wed 26 Aug → Fri 28 Aug",
    start: "2026-08-26T00:00:00+05:30",
    end: "2026-08-28T23:59:59+05:30",
    description:
      "Every submission is stripped of names and departments, then scored independently by two faculty evaluators against the published rubric. Nothing for you to do here but wait.",
  },
  {
    id: "shortlist",
    step: "03",
    buildTag: "release",
    title: "Shortlist announced",
    dateLabel: "Sat 29 Aug",
    start: "2026-08-29T00:00:00+05:30",
    end: "2026-08-29T23:59:59+05:30",
    description:
      "The top 20 teams are posted in Updates on this page — that's the official record. Shortlisted teams get pitch-preparation details along with the announcement.",
  },
  {
    id: "finale",
    step: "04",
    buildTag: "deploy",
    title: "Grand finale",
    dateLabel: "Fri 4 Sep · on campus",
    start: "2026-09-04T00:00:00+05:30",
    end: "2026-09-04T23:59:59+05:30",
    description:
      "Shortlisted teams pitch live at SSS Block, Department of CSE: 8 minutes on stage, 4 minutes of Q&A from the panel. Winners are announced the same day.",
  },
];
