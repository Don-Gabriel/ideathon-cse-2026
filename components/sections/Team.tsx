/**
 * Organising team: faculty patrons first, then student core team.
 * Monogram initials fallback when no photo is set; "To be announced"
 * renders a neutral placeholder mark.
 */

import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { teamGroups, type TeamMember } from "@/content/team";

function monogram(name: string): string {
  if (name === "To be announced") return "···";
  return name
    .split(/\s+/)
    .filter((w) => !/^(dr|prof|mr|ms|mrs)\.?$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function MemberCard({ member }: { member: TeamMember }) {
  const tba = member.name === "To be announced";
  return (
    <div className="scan-card flex items-center gap-4 rounded-sm border border-line bg-panel p-4">
      {member.photo ? (
        <Image
          src={member.photo}
          alt=""
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-sm object-cover"
        />
      ) : (
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border font-mono text-sm ${
            tba
              ? "border-line text-muted"
              : "border-phosphor/40 text-phosphor"
          }`}
          aria-hidden="true"
        >
          {monogram(member.name)}
        </span>
      )}
      <div>
        <p
          className={`font-display font-semibold ${
            tba ? "text-muted" : "text-fg"
          }`}
        >
          {member.name}
        </p>
        <p className="eyebrow mt-0.5">{member.role}</p>
      </div>
    </div>
  );
}

export function Team() {
  return (
    <Section
      id="team"
      eyebrow="09 · team"
      title="Organising team"
    >
      <div className="grid gap-10">
        {teamGroups.map((group) => (
          <Reveal key={group.id}>
            <h3 className="eyebrow mb-4 text-phosphor">{group.label}</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.members.map((m, i) => (
                <MemberCard key={`${m.role}-${i}`} member={m} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
