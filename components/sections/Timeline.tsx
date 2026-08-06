"use client";

/**
 * THE SIGNATURE ELEMENT — the date-aware pipeline.
 * Each stage derives COMPLETE / LIVE / QUEUED from today's date at view
 * time; the LIVE node dominates visually and carries a countdown to its
 * own end. Zero manual updates, nothing can go stale.
 * Hydration-safe: initial statuses come from the build-time date (server
 * prop); the client re-derives after mount.
 */

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { timelineStages } from "@/content/timeline";
import { deriveStageStatus, type StageStatus } from "@/lib/phase";
import { Countdown } from "@/components/ui/Countdown";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";

function statuses(now: Date): StageStatus[] {
  return timelineStages.map((s) => deriveStageStatus(now, s.start, s.end));
}

export function Timeline({ buildNowIso }: { buildNowIso: string }) {
  const [stageStatus, setStageStatus] = useState<StageStatus[]>(() =>
    statuses(new Date(buildNowIso))
  );

  useEffect(() => {
    const tick = () => setStageStatus(statuses(new Date()));
    const t = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(t);
      clearInterval(id);
    };
  }, []);

  return (
    <Section
      id="timeline"
      eyebrow="03 · timeline"
      title="Where the event stands"
      lead="This pipeline reads today's date. Whatever it shows is current — no announcement needed, nothing to double-check."
    >
      <ol className="relative">
        {timelineStages.map((stage, i) => {
          const status = stageStatus[i] ?? "QUEUED";
          const isLive = status === "LIVE";
          const isDone = status === "COMPLETE";
          const isLast = i === timelineStages.length - 1;

          return (
            <li key={stage.id} className="relative flex gap-5 sm:gap-8">
              {/* Rail + node */}
              <div className="flex w-8 flex-col items-center sm:w-10">
                <div
                  className={`z-10 flex shrink-0 items-center justify-center rounded-full border-2 ${
                    isLive
                      ? "pulse-live h-8 w-8 border-phosphor bg-phosphor sm:h-10 sm:w-10"
                      : isDone
                        ? "h-6 w-6 border-line bg-panel sm:h-7 sm:w-7"
                        : "h-6 w-6 border-line bg-void sm:h-7 sm:w-7"
                  }`}
                  aria-hidden="true"
                >
                  {isDone && <Check size={13} className="text-muted" />}
                  {isLive && (
                    <span className="h-2.5 w-2.5 rounded-full bg-void" />
                  )}
                </div>
                {!isLast && (
                  <div
                    className={`w-px flex-1 ${
                      isDone ? "bg-phosphor/40" : "bg-line"
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Content */}
              <Reveal className={`flex-1 ${isLast ? "" : "pb-6"}`}>
                <GlowCard
                  className={`rounded-sm border p-4 sm:p-5 ${
                    isLive
                      ? "border-phosphor/50 bg-panel"
                      : isDone
                        ? "border-line bg-transparent opacity-60"
                        : "border-line bg-transparent opacity-80"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="eyebrow">
                      <span className={isLive ? "text-phosphor" : ""}>
                        {stage.step}
                      </span>{" "}
                      · {stage.buildTag}
                    </p>
                    <p
                      className={`eyebrow ${
                        isLive
                          ? "text-phosphor"
                          : isDone
                            ? "text-muted"
                            : ""
                      }`}
                    >
                      {isLive && (
                        <span
                          className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-signal align-middle"
                          aria-hidden="true"
                        />
                      )}
                      {status === "COMPLETE"
                        ? "complete"
                        : status === "LIVE"
                          ? "live now"
                          : "queued"}
                    </p>
                  </div>
                  <h3
                    className={`mt-1.5 font-display text-lg font-semibold sm:text-xl ${
                      isLive ? "text-fg" : isDone ? "text-muted" : "text-fg"
                    }`}
                  >
                    {stage.title}
                  </h3>
                  <p className="eyebrow mt-1.5">{stage.dateLabel}</p>
                  <p className="mt-3 max-w-2xl text-sm text-muted">
                    {stage.description}
                  </p>
                  {isLive && (
                    <div className="mt-5 border-t border-line pt-5">
                      <Countdown
                        target={stage.end}
                        label="this stage ends in"
                        size="sm"
                      />
                    </div>
                  )}
                </GlowCard>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
