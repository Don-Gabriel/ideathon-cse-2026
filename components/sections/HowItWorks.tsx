/**
 * How it works: every pipeline stage as a card, in order.
 * Content is drawn from content/timeline.ts — show all of them, so the step
 * numbers here always match the Timeline section with no gaps.
 */

import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { Tilt } from "@/components/ui/Tilt";
import { timelineStages } from "@/content/timeline";

export function HowItWorks() {
  const stages = timelineStages;

  return (
    <Section
      id="how-it-works"
      eyebrow="02 · pipeline"
      title="How it works"
      lead="Four stages. You act in the first and the last; the two in between happen to your submission."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.08} className="relative">
            <Tilt className="h-full">
            <GlowCard className="flex h-full flex-col rounded-sm border border-line bg-panel p-5">
              <p className="eyebrow">
                <span className="text-phosphor">{s.step}</span> · {s.buildTag}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold text-fg">
                {s.title}
              </h3>
              <p className="eyebrow mt-1">{s.dateLabel}</p>
              <p className="mt-3 flex-1 text-sm text-muted">{s.description}</p>
            </GlowCard>
            </Tilt>
            {/* Connectors only in the single-row layout, where they line up. */}
            {i < stages.length - 1 && (
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="absolute -right-[19px] top-1/2 z-10 hidden -translate-y-1/2 text-phosphor lg:block"
              />
            )}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
