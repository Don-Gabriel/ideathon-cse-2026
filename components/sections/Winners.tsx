/**
 * Results: the podium, as a descending stack rather than a row — champion
 * full width and loudest, then second, then the shared third place side by
 * side. Card weight (size, colour, border) carries the ranking, so the order
 * is readable without relying on the numbers alone.
 *
 * The rank numeral sits behind each card as a large watermark, and the
 * champion's name decodes in with the same scramble used on the wordmark.
 *
 * Everything comes from content/winners.ts. An empty podium renders nothing
 * at all, so the section can never show an empty trophy case.
 */

import { Trophy, Medal, Award } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { Scramble } from "@/components/ui/Scramble";
import { winners, resultsStatement, type Winner } from "@/content/winners";

/** Per-rank presentation. Rank 1 is the only one that gets the amber ring. */
const RANK_STYLE = {
  1: {
    Icon: Trophy,
    label: "champion",
    pad: "px-6 py-9 sm:px-10 sm:py-14",
    name: "text-4xl sm:text-6xl",
    nameColor: "text-phosphor",
    watermark: "text-[7rem] sm:text-[11rem] text-phosphor/[0.07]",
    iconColor: "text-phosphor",
  },
  2: {
    Icon: Medal,
    label: "runner-up",
    pad: "px-6 py-7 sm:px-10 sm:py-10",
    name: "text-3xl sm:text-4xl",
    nameColor: "text-fg",
    watermark: "text-[5.5rem] sm:text-[8rem] text-phosphor/[0.06]",
    iconColor: "text-fg",
  },
  3: {
    Icon: Award,
    label: "third place",
    pad: "px-6 py-6 sm:px-8 sm:py-8",
    name: "text-2xl sm:text-3xl",
    nameColor: "text-fg",
    // Smaller and fainter: these cards are narrow, so a big numeral would
    // sit under the label text instead of beside it.
    watermark: "text-[3.5rem] sm:text-[5rem] text-phosphor/[0.05]",
    iconColor: "text-muted",
  },
} as const;

function WinnerCard({ winner }: { winner: Winner }) {
  const s = RANK_STYLE[winner.rank];
  const { Icon } = s;
  const rankLabel = String(winner.rank).padStart(2, "0");

  return (
    <div
      className={`scan-card relative h-full overflow-hidden rounded-sm bg-panel ${s.pad}`}
    >
      {/* Oversized rank numeral, bled off the top-right corner */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-4 right-1 select-none font-mono font-bold leading-none ${s.watermark}`}
      >
        {rankLabel}
      </span>

      {/* One string, not several flex children — otherwise a wrapping label
          strands the "shared" marker out on the right edge. */}
      <p className="eyebrow relative flex items-center gap-2">
        <Icon size={14} className={`${s.iconColor} shrink-0`} aria-hidden="true" />
        <span>
          rank {rankLabel} · {winner.shared ? "shared" : s.label}
        </span>
      </p>

      <h3
        className={`relative mt-3 font-display font-bold leading-none tracking-tight ${s.name} ${s.nameColor}`}
      >
        {winner.rank === 1 ? <Scramble text={winner.team} /> : winner.team}
      </h3>

      <p className="relative mt-2 font-mono text-[0.78rem] uppercase tracking-[0.12em] text-muted">
        {winner.prize}
      </p>
    </div>
  );
}

export function Winners() {
  if (winners.length === 0) return null;

  const first = winners.filter((w) => w.rank === 1);
  const second = winners.filter((w) => w.rank === 2);
  const third = winners.filter((w) => w.rank === 3);

  return (
    <Section
      id="results"
      eyebrow="01 · results"
      title="The winners"
      lead={resultsStatement.lead}
    >
      {/* Champion — amber ring, the one card that glows */}
      {first.map((w, i) => (
        <Reveal key={w.team} delay={i * 0.05}>
          <div className="shimmer-ring relative overflow-hidden rounded-sm border border-phosphor/40">
            <GlowCard className="relative z-10 m-px rounded-sm bg-panel">
              <WinnerCard winner={w} />
            </GlowCard>
          </div>
        </Reveal>
      ))}

      {second.length > 0 && (
        <Reveal className="mt-4" delay={0.05}>
          <div className="overflow-hidden rounded-sm border border-line">
            <WinnerCard winner={second[0]} />
          </div>
        </Reveal>
      )}

      {third.length > 0 && (
        <Reveal className="mt-4" delay={0.1}>
          <div
            className={`grid gap-px overflow-hidden rounded-sm border border-line bg-line ${
              third.length > 1 ? "sm:grid-cols-2" : ""
            }`}
          >
            {third.map((w) => (
              <WinnerCard key={w.team} winner={w} />
            ))}
          </div>
        </Reveal>
      )}

      <Reveal className="mt-4">
        <p className="font-mono text-[0.72rem] leading-relaxed tracking-[0.06em] text-muted">
          <span className="text-phosphor">$</span> {resultsStatement.footnote}
        </p>
      </Reveal>
    </Section>
  );
}
