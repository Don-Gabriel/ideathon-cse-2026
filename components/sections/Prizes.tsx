/**
 * Prizes: one statement — cash prizes will be awarded — plus the
 * certificate facts. No amounts are shown anywhere; see content/prizes.ts.
 */

import { Trophy } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { certificates, prizeStatement } from "@/content/prizes";

export function Prizes() {
  return (
    <Section id="prizes" eyebrow="05 · prizes" title="What's at stake">
      <Reveal>
        <div className="shimmer-ring relative overflow-hidden rounded-sm border border-phosphor/40">
          <GlowCard className="relative z-10 m-px flex flex-col gap-4 rounded-sm bg-panel p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-8">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-phosphor/40 text-phosphor"
              aria-hidden="true"
            >
              <Trophy size={20} />
            </span>
            <div>
              <p className="eyebrow">grand finale</p>
              <h3 className="mt-2 font-display text-3xl font-bold leading-tight text-phosphor sm:text-4xl">
                {prizeStatement.headline}
              </h3>
              <p className="mt-3 max-w-xl text-sm text-muted">
                {prizeStatement.body}
              </p>
            </div>
          </GlowCard>
        </div>
      </Reveal>

      <Reveal className="mt-4">
        {/* One certificate line today; the 3-up grid returns if more are added. */}
        <div
          className={`grid gap-px overflow-hidden rounded-sm border border-line bg-line ${
            certificates.length > 1 ? "sm:grid-cols-3" : ""
          }`}
        >
          {certificates.map((c) => (
            <div key={c.title} className="scan-card bg-panel px-5 py-4">
              <h3 className="font-mono text-[0.78rem] uppercase tracking-[0.12em] text-fg">
                {c.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted">{c.detail}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
