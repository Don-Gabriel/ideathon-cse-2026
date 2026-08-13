"use client";

/**
 * Full-viewport hero. The global particle constellation runs behind the
 * whole page (see Chrome); the hero layers a hairline grid + scanline on
 * top and carries: the live current-status board, the glitching
 * letter-interactive GENESIS wordmark, GEN-0 the robot, the phase-aware
 * CTA + countdown, and the count-up stat strip. Hydration-safe throughout.
 */

import { ArrowRight } from "lucide-react";
import { event, eventDates, heroByPhase } from "@/content/event";
import type { PhaseId } from "@/lib/phase";
import { useLivePhase } from "@/components/ui/useLivePhase";
import { Countdown } from "@/components/ui/Countdown";
import { StatusBoard } from "@/components/ui/StatusBoard";
import { GlitchTitle } from "@/components/ui/GlitchTitle";
import { Typewriter } from "@/components/ui/Typewriter";
import { CountUp } from "@/components/ui/CountUp";
import { Bot } from "@/components/ui/Bot";

export function Hero({ buildPhase }: { buildPhase: PhaseId }) {
  const { phase } = useLivePhase(buildPhase);

  const hero = heroByPhase[phase];
  const registerHref = event.registrationUrl || "#contact";
  const countdownTarget =
    hero.countdownTo === "regOpen"
      ? eventDates.regOpen
      : hero.countdownTo === "regClose"
        ? eventDates.regClose
        : null;

  const ctaHref =
    hero.ctaAction === "register"
      ? registerHref
      : hero.ctaAction === "updates"
        ? "#updates"
        : hero.ctaAction === "contact"
          ? "#contact"
          : null;

  return (
    <div
      id="top"
      className="scanline relative overflow-hidden border-b border-line"
    >
      <div className="bg-grid absolute inset-0 opacity-[0.3]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void/80"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col px-5 pb-24 pt-20 sm:px-8 md:pb-14">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1fr_minmax(0,26rem)]">
          {/* Left: identity + CTA */}
          <div className="min-w-0">
            <h1 className="font-display text-6xl font-bold leading-none tracking-tight text-fg sm:text-7xl md:text-8xl">
              <GlitchTitle text="GENESIS" />
              <span className="mt-2 block text-lg font-semibold tracking-normal text-phosphor sm:text-xl">
                {event.subtitle}
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm text-muted sm:text-base">
              {event.presenter}
            </p>

            <p className="eyebrow mt-4">
              <span className="text-phosphor">finale date to be announced</span>
              <span className="mx-2 text-line">·</span>
              sss block, dept of cse
              <span className="mx-2 text-line">·</span>
              intra-college
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <p className="eyebrow w-full text-phosphor">
                <Typewriter text={hero.status} speed={22} />
              </p>
              {hero.ctaDisabled || !ctaHref ? (
                <span className="inline-flex cursor-default items-center gap-2 rounded-sm border border-line bg-panel px-5 py-3 font-mono text-[0.8rem] font-medium uppercase tracking-[0.12em] text-muted">
                  {hero.ctaLabel}
                </span>
              ) : (
                <a
                  href={ctaHref}
                  {...(hero.ctaAction === "register" && event.registrationUrl
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`inline-flex items-center gap-2 rounded-sm px-5 py-3 font-mono text-[0.8rem] font-medium uppercase tracking-[0.12em] text-void transition-opacity hover:opacity-85 ${
                    hero.ctaDanger ? "bg-danger" : "bg-phosphor"
                  }`}
                >
                  {hero.ctaLabel}
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              )}
              <a
                href={event.assets.rulebookPdf || "#submission"}
                {...(event.assets.rulebookPdf
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-flex items-center gap-2 rounded-sm border border-line bg-void/40 px-5 py-3 font-mono text-[0.8rem] uppercase tracking-[0.12em] text-fg backdrop-blur-[2px] transition-colors hover:border-muted"
              >
                Read the rulebook
              </a>
            </div>

            <p className="mt-3 max-w-md text-sm text-muted">{hero.helper}</p>

            {countdownTarget && hero.countdownLabel && (
              <div className="mt-7">
                <Countdown
                  target={countdownTarget}
                  label={hero.countdownLabel}
                  danger={hero.ctaDanger}
                />
              </div>
            )}
          </div>

          {/* Right: the live status board + GEN-0 */}
          <div className="flex min-w-0 flex-col items-center gap-4">
            <StatusBoard phase={phase} />
            <div className="hidden lg:block">
              <Bot />
            </div>
          </div>
        </div>

        {/* Stat strip along the hero's bottom edge — numbers count up */}
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-4">
          <div className="bg-panel/80 px-4 py-3.5 text-center backdrop-blur-[2px]">
            <dd className="font-mono tabular text-xl font-medium text-phosphor">
              ≤5
            </dd>
            <dt className="eyebrow mt-1">max team size</dt>
          </div>
          <div className="bg-panel/80 px-4 py-3.5 text-center backdrop-blur-[2px]">
            <dd className="font-mono tabular text-xl font-medium text-phosphor">
              <CountUp to={20} />
            </dd>
            <dt className="eyebrow mt-1">finalist teams</dt>
          </div>
          <div className="bg-panel/80 px-4 py-3.5 text-center backdrop-blur-[2px]">
            <dd className="font-mono text-xl font-medium uppercase text-phosphor">
              Cash
            </dd>
            <dt className="eyebrow mt-1">prizes</dt>
          </div>
          <div className="bg-panel/80 px-4 py-3.5 text-center backdrop-blur-[2px]">
            <dd className="font-mono tabular text-xl font-medium text-phosphor">
              ₹0
            </dd>
            <dt className="eyebrow mt-1">entry fee</dt>
          </div>
        </dl>
      </div>
    </div>
  );
}
