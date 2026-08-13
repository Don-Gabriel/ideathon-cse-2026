/**
 * About + eligibility, merged and compact: one short paragraph on what
 * GENESIS is, then the single rule rendered as a code constraint.
 */

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { theRule } from "@/content/rules";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="01 · about"
      title="A competition of ideas, not prototypes"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Reveal>
          <p className="text-sm leading-7 text-muted sm:text-base">
            GENESIS is the first edition of an ideathon by the Department of
            Computer Science &amp; Engineering at GCE Tirunelveli — open to
            every department of the college. You bring a problem worth
            solving and a clear idea for solving it; nothing needs to be
            built. Submit your case on the given template, a blind faculty
            panel screens every entry, and the strongest twenty teams defend
            theirs on stage at the grand finale.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <GlowCard className="h-full rounded-sm border border-phosphor/30 bg-panel p-6">
            <span id="eligibility" className="block scroll-mt-24" />
            <h3 className="font-display text-xl font-bold text-fg">
              {theRule.title}
            </h3>
            <p className="mt-3 rounded-sm border border-line bg-void px-4 py-3 font-mono text-sm">
              <span className="text-phosphor">{theRule.code}</span>{" "}
              <span className="text-muted">{theRule.comment}</span>
            </p>
            <p className="mt-3 text-sm text-muted">{theRule.body}</p>
          </GlowCard>
        </Reveal>
      </div>
    </Section>
  );
}
