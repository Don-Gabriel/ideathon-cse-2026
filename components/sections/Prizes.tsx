"use client";

/**
 * Prizes: podium with count-up amounts and tilt; the winner card wears a
 * rotating amber shimmer ring. Amounts come from content/prizes.ts
 * (placeholders — see the TODO there).
 */

import { Award, Trophy } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { Tilt } from "@/components/ui/Tilt";
import { CountUp } from "@/components/ui/CountUp";
import { certificates, prizeTiers } from "@/content/prizes";
import { formatINR } from "@/lib/format";

export function Prizes() {
  const podium = prizeTiers
    .filter((t) => t.kind === "main")
    .sort((a, b) => (a.rank ?? 9) - (b.rank ?? 9));
  const specials = prizeTiers.filter((t) => t.kind === "special");

  return (
    <Section id="prizes" eyebrow="05 · prizes" title="What's at stake">
      <div className="grid gap-4 md:grid-cols-3">
        {podium.map((t, i) => {
          const isWinner = t.rank === 1;
          const card = (
            <GlowCard
              className={`relative z-10 flex h-full flex-col rounded-sm bg-panel p-6 ${
                isWinner ? "m-px" : "border border-line"
              }`}
            >
              <p className="eyebrow flex items-center gap-2">
                {isWinner && (
                  <Trophy
                    size={14}
                    className="text-phosphor"
                    aria-hidden="true"
                  />
                )}
                {t.title}
              </p>
              <p
                className={`mt-4 font-mono tabular font-medium ${
                  isWinner
                    ? "text-4xl text-phosphor sm:text-5xl"
                    : "text-3xl text-fg"
                }`}
              >
                <CountUp to={t.amount} format={formatINR} duration={1100} />
              </p>
              <p className="mt-3 flex-1 text-sm text-muted">{t.detail}</p>
            </GlowCard>
          );
          return (
            <Reveal key={t.id} delay={i * 0.07}>
              <Tilt className="h-full">
                {isWinner ? (
                  <div className="shimmer-ring relative h-full overflow-hidden rounded-sm border border-phosphor/40 md:-mt-3">
                    {card}
                  </div>
                ) : (
                  card
                )}
              </Tilt>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {specials.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.06}>
            <Tilt className="h-full">
              <GlowCard className="flex h-full gap-4 rounded-sm border border-line bg-panel p-6">
                <Award
                  size={18}
                  className="mt-1 shrink-0 text-phosphor"
                  aria-hidden="true"
                />
                <div>
                  <p className="eyebrow">{t.title}</p>
                  <p className="mt-2 font-mono tabular text-2xl font-medium text-fg">
                    <CountUp to={t.amount} format={formatINR} />
                  </p>
                  <p className="mt-2 text-sm text-muted">{t.detail}</p>
                </div>
              </GlowCard>
            </Tilt>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6">
        <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
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
