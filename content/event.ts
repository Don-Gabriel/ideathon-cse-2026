/**
 * content/event.ts
 *
 * SOURCE OF TRUTH for the whole site. Every date, name, URL and contact
 * shown anywhere comes from this file. Change a value here, redeploy, done —
 * no component ever needs editing.
 *
 * Drives: hero, nav, countdowns, the phase engine (lib/phase.ts), the
 * contact section, footer, and SEO metadata.
 */

import type { PhaseId } from "@/lib/phase";

export interface EventDates {
  /** ISO strings with the +05:30 (IST) offset written in — keep the offset. */
  regOpen: string;
  regClose: string;
  shortlistAnnounce: string;
  finaleStart: string;
  finaleEnd: string;
}

export type ChannelType = "phone" | "whatsapp" | "email" | "instagram";

export interface ContactChannel {
  type: ChannelType;
  /** Person or channel name shown on the card. */
  label: string;
  /** The visible value — a phone number, handle or address. */
  value: string;
  /** What tapping the card does: tel:, https://wa.me/, mailto:, https://instagram.com/… */
  href: string;
  /** Optional availability line, e.g. "9 AM – 9 PM, Mon–Sat". */
  hours?: string;
}

export interface HeroCopy {
  /** Mono status line rendered above the CTA, uppercase. */
  status: string;
  ctaLabel: string;
  /** Where the primary CTA points. "register" uses registrationUrl. */
  ctaAction: "register" | "updates" | "contact" | "none";
  /** Disabled CTAs render as static chips, not buttons. */
  ctaDisabled: boolean;
  /** Uses the danger accent (final-48-hours urgency). */
  ctaDanger?: boolean;
  helper: string;
  /** Which date the hero countdown targets, if any. */
  countdownTo?: "regOpen" | "regClose";
  countdownLabel?: string;
}

export const eventDates: EventDates = {
  regOpen: "2026-08-11T00:00:00+05:30",
  regClose: "2026-08-25T23:59:59+05:30",
  shortlistAnnounce: "2026-08-29T00:00:00+05:30",
  finaleStart: "2026-09-04T00:00:00+05:30",
  finaleEnd: "2026-09-04T23:59:59+05:30",
};

export const event = {
  name: "GENESIS",
  subtitle: "Ideathon 1.0",
  presenter:
    "Department of Computer Science & Engineering, Government College of Engineering, Tirunelveli",
  presenterShort: "GCE Tirunelveli",
  tagline: "One idea. Up to five people. Any department.",
  description:
    "GENESIS is a first-edition intra-college ideathon by the Department of CSE, GCE Tirunelveli. Teams of up to five submit one idea; the top 20 pitch on campus on 4 September 2026.",

  // TODO: replace with the real Google Form URL before launch.
  registrationUrl: "",

  // Default Vercel URL for the ideathon-cse-2026 project.
  // TODO: confirm after the first deploy (or replace with a custom domain).
  siteUrl: "https://ideathon-cse-2026.vercel.app",

  venue: {
    name: "SSS Block, Department of Computer Science & Engineering",
    institution: "Government College of Engineering, Tirunelveli",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Government+College+of+Engineering+Tirunelveli",
    mapEmbed:
      "https://maps.google.com/maps?q=Government%20College%20of%20Engineering%20Tirunelveli&output=embed",
  },

  assets: {
    // TODO: add the rulebook PDF URL when it is published. Empty string
    // renders the download button in a "not yet published" state.
    rulebookPdf: "",
    // TODO: add the 6-slide PPT template URL when it is published.
    pptTemplate: "",
    rulebookVersion: "v1.0",
    // TODO: bump whenever the rulebook changes.
    rulebookUpdated: "2026-08-06",
  },

  /**
   * Contact & Q&A desk. Render order = array order.
   * Supported types: phone | whatsapp | email | instagram.
   * Add a channel here and it appears on the site — nothing else to touch.
   */
  channels: [
    // TODO: replace with real coordinator names and numbers.
    {
      type: "phone",
      label: "Coordinator One",
      value: "+91 XXXXX XXXXX",
      href: "tel:+91XXXXXXXXXX",
      hours: "9 AM – 9 PM",
    },
    {
      type: "phone",
      label: "Coordinator Two",
      value: "+91 XXXXX XXXXX",
      href: "tel:+91XXXXXXXXXX",
      hours: "9 AM – 9 PM",
    },
  ] satisfies ContactChannel[],

  supportPromise: {
    headline: "Every query answered within 12 hours. Guaranteed within 24.",
    detail:
      "Call or message either coordinator. Questions asked between 9 AM and 9 PM usually get an answer the same evening; anything later is first thing next morning. Answers that matter to everyone get posted in Updates too.",
  },

  /**
   * Footer social links. Empty = the row simply doesn't render.
   * TODO: add the department / event Instagram when it exists, e.g.
   * { type: "instagram", label: "Instagram", value: "@genesis.gcetly", href: "https://instagram.com/…" }
   */
  socialLinks: [] as ContactChannel[],
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Stages", href: "#how-it-works" },
  { label: "Timeline", href: "#timeline" },
  { label: "Prizes", href: "#prizes" },
  { label: "FAQ", href: "#faq" },
];

/**
 * Phase-aware hero copy. The phase engine (lib/phase.ts) picks one of these
 * based on today's date. Edit copy freely; keep every key present.
 */
export const heroByPhase: Record<PhaseId, HeroCopy> = {
  BEFORE_OPEN: {
    status: "status: registration queued",
    ctaLabel: "Registration opens Tue 11 Aug",
    ctaAction: "none",
    ctaDisabled: true,
    helper: "Get your team ready. The form goes live at midnight.",
    countdownTo: "regOpen",
    countdownLabel: "Registration opens in",
  },
  REG_OPEN: {
    status: "status: registration open",
    ctaLabel: "Register your team",
    ctaAction: "register",
    ctaDisabled: false,
    helper: "Closes Tuesday 25 August, 11:59 PM IST.",
    countdownTo: "regClose",
    countdownLabel: "Registration closes in",
  },
  REG_CLOSING_SOON: {
    status: "status: closing soon",
    ctaLabel: "Register — closing soon",
    ctaAction: "register",
    ctaDisabled: false,
    ctaDanger: true,
    helper: "Final window. The form closes Tuesday 25 August, 11:59 PM IST.",
    countdownTo: "regClose",
    countdownLabel: "Registration closes in",
  },
  REG_CLOSED: {
    status: "status: screening in progress",
    ctaLabel: "Registration closed",
    ctaAction: "none",
    ctaDisabled: true,
    helper:
      "Submissions are with the evaluators. Shortlist announced Saturday 29 August.",
  },
  SHORTLIST_OUT: {
    status: "status: shortlist published",
    ctaLabel: "View shortlisted teams",
    ctaAction: "updates",
    ctaDisabled: false,
    helper: "The top 20 teams are through to the finale on Friday 4 September.",
  },
  FINALE_DAY: {
    status: "status: live today",
    ctaLabel: "Live today",
    ctaAction: "contact",
    ctaDisabled: false,
    helper:
      "Grand finale at SSS Block, Department of CSE. Reporting details are in Updates.",
  },
  COMPLETE: {
    status: "status: complete",
    ctaLabel: "Thank you",
    ctaAction: "updates",
    ctaDisabled: false,
    helper: "GENESIS 1.0 is a wrap. Results and photos are in Updates.",
  },
  UNKNOWN: {
    // Fallback if a date in config is missing or malformed — the site keeps
    // working, it just stops making time-based claims.
    status: "status: see updates",
    ctaLabel: "Register your team",
    ctaAction: "register",
    ctaDisabled: false,
    helper: "Dates are being finalised — check Updates for the schedule.",
  },
};
