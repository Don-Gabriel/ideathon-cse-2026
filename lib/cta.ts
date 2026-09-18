/**
 * lib/cta.ts
 *
 * One place that turns a phase's `ctaAction` into a link target.
 *
 * The hero and the nav both render the phase CTA, and they used to resolve
 * the destination separately — which is exactly how the nav ended up sending
 * "See the winners" to #updates. Both now call this, so a new action can only
 * ever be wired once.
 */

import { event, type HeroCopy } from "@/content/event";

/** Where this phase's CTA points, or null when the CTA is not a link. */
export function ctaHref(hero: HeroCopy): string | null {
  switch (hero.ctaAction) {
    case "register":
      return event.registrationUrl || "#contact";
    case "updates":
      return "#updates";
    case "results":
      return "#results";
    case "contact":
      return "#contact";
    case "none":
      return null;
  }
}
