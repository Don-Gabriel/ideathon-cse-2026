/**
 * content/prizes.ts
 *
 * Prizes. Deliberately minimal: the site states that cash prizes will be
 * awarded and nothing else — no amounts, no tiers, no award categories.
 * The rule book says prizes "will be announced through the official
 * channels", so this page must not get ahead of that.
 *
 * When the committee fixes the amounts, announce them in
 * `content/updates.ts` first, then (if wanted) expand this file.
 *
 * Drives: Prizes section, the "prizes" line in the hero stat strip,
 * and the ticker.
 */

export const prizeStatement = {
  headline: "Cash prizes were awarded.",
  body: "Cash prizes went to the winning teams at the grand finale on Wednesday 16 September. The podium is in the Results section at the top of this page.",
};

/**
 * Certificates. Only the top three teams receive them — don't widen this
 * to "all finalists" or "all participants" without the committee's word.
 */
export const certificates = [
  {
    title: "Certificates for the top 3",
    detail:
      "Certificates go to the three winning places, presented at the grand finale.",
  },
];
