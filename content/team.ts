/**
 * content/team.ts
 *
 * Organising team. Cards render a monogram from the name when no photo is
 * given; add `photo: "/team/name.jpg"` (file in /public/team) to show a
 * photo instead.
 *
 * Student office bearers only — faculty patrons are deliberately not
 * listed. Only real, confirmed names belong here; never re-add "To be
 * announced" placeholder cards.
 *
 * Drives: Organising team section.
 */

export interface TeamMember {
  /** "To be announced" renders a neutral placeholder monogram. */
  name: string;
  role: string;
  /** Optional path under /public, e.g. "/team/coordinator-one.jpg". */
  photo?: string;
}

export interface TeamGroup {
  id: string;
  label: string;
  members: TeamMember[];
}

export const teamGroups: TeamGroup[] = [
  {
    id: "students",
    label: "Student office bearers",
    members: [
      { name: "Santhosh G", role: "President · IV year" },
      { name: "J Don Gabriel", role: "Vice President · III year" },
      { name: "Divya J", role: "Secretary · IV year" },
      { name: "Vijayalakshmii G", role: "Joint Secretary · III year" },
    ],
  },
];
