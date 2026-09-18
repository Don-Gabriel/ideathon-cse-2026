/**
 * content/winners.ts
 *
 * The GENESIS Ideathon 1.0 podium — the final result of the event.
 *
 * Add a team here and it appears on the site; empty the array and the whole
 * Results section disappears rather than showing an empty podium. Ranks may
 * repeat: a shared place is expressed by giving two entries the same `rank`
 * and setting `shared` on both.
 *
 * Drives: the Results section, the hero CTA and status board in the COMPLETE
 * phase, and the champions line in the ticker.
 */

export interface Winner {
  /** 1, 2 or 3. Repeat a value for a shared place. */
  rank: 1 | 2 | 3;
  /** Team name exactly as it should be printed. */
  team: string;
  /** Prize label shown under the team name. */
  prize: string;
  /** True when this rank is held by more than one team. */
  shared?: boolean;
}

/** Podium order = array order. Keep it ranked, best first. */
export const winners: Winner[] = [
  { rank: 1, team: "Team ThinkX", prize: "First prize" },
  { rank: 2, team: "ResQSquad", prize: "Second prize" },
  { rank: 3, team: "Ray Breakers", prize: "Third prize", shared: true },
  { rank: 3, team: "Nexora", prize: "Third prize", shared: true },
];

/** The single champion, or null if the podium is empty. Used by the hero. */
export const champion: string | null =
  winners.find((w) => w.rank === 1)?.team ?? null;

export const resultsStatement = {
  lead: "The grand finale was held on Wednesday 16 September at the Placement Hall. These are the teams that finished on the podium.",
  footnote:
    "Third place is shared between two teams. Cash prizes were awarded at the finale, and certificates go to the winning teams.",
};
