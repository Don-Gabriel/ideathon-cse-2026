/**
 * content/team.ts
 *
 * Organising team — faculty patrons first, then the student core team.
 * Cards render a monogram from the name when no photo is given; add
 * `photo: "/team/name.jpg"` (file in /public/team) to show a photo instead.
 *
 * TODO: replace every "To be announced" with the real name before launch.
 * The UI is final — filling names is a one-line edit per person.
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
    id: "faculty",
    label: "Faculty patrons",
    members: [
      // TODO: add real names.
      { name: "To be announced", role: "Head of Department, CSE" },
      { name: "To be announced", role: "Faculty coordinator" },
      { name: "To be announced", role: "Faculty coordinator" },
    ],
  },
  {
    id: "students",
    label: "Student core team",
    members: [
      // TODO: add real names.
      { name: "To be announced", role: "Overall coordinator" },
      { name: "To be announced", role: "Overall coordinator" },
      { name: "To be announced", role: "Registrations & Q&A desk" },
      { name: "To be announced", role: "Evaluation desk" },
      { name: "To be announced", role: "Event-day operations" },
      { name: "To be announced", role: "Design & outreach" },
    ],
  },
];
