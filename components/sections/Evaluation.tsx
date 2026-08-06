"use client";

/**
 * Evaluation + submission, merged and interactive: rubric bars grow when
 * scrolled into view, weights count up, and each criterion expands on
 * click to reveal what it actually means. The right card carries the
 * template mandate + downloads (URLs in content/event.ts assets).
 */

import { useState } from "react";
import { ChevronDown, Download, EyeOff, TriangleAlert } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { CountUp } from "@/components/ui/CountUp";
import { useInView } from "@/components/ui/useInView";
import { blindEvaluationNote, rubric } from "@/content/rubric";
import { googleSignInNote, templateMandate } from "@/content/guidelines";
import { event } from "@/content/event";

function DownloadButton({ href, label }: { href: string; label: string }) {
  if (!href) {
    return (
      <span
        aria-disabled="true"
        className="inline-flex cursor-default items-center gap-2 rounded-sm border border-line bg-panel px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted"
      >
        <Download size={14} aria-hidden="true" />
        {label} — publishes before registration opens
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-sm border border-phosphor/50 px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-phosphor transition-colors hover:bg-phosphor hover:text-void"
    >
      <Download size={14} aria-hidden="true" />
      {label}
    </a>
  );
}

export function Evaluation() {
  const maxWeight = Math.max(...rubric.map((r) => r.weight));
  const { ref, inView } = useInView<HTMLDivElement>();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Section
      id="rubric"
      eyebrow="04 · evaluation"
      title="What we're looking for"
      lead="The exact rubric your submission is scored against — tap a criterion for what it really means."
    >
      <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
        <Reveal>
          <GlowCard className="rounded-sm border border-line bg-panel p-5 sm:p-6">
            <div ref={ref} className="grid gap-3">
              {rubric.map((r) => {
                const isOpen = open === r.id;
                return (
                  <div key={r.id}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : r.id)}
                      className="group w-full text-left"
                    >
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="flex items-center gap-2 text-sm font-medium text-fg">
                          <ChevronDown
                            size={13}
                            aria-hidden="true"
                            className={`shrink-0 text-muted transition-transform group-hover:text-phosphor ${
                              isOpen ? "rotate-180 text-phosphor" : ""
                            }`}
                          />
                          {r.title}
                        </span>
                        <span className="font-mono tabular text-sm font-medium text-phosphor">
                          <CountUp to={r.weight} />
                        </span>
                      </span>
                      <span
                        className="mt-1.5 block h-1 w-full overflow-hidden rounded-full bg-line"
                        role="img"
                        aria-label={`${r.weight} of 100 points`}
                      >
                        <span
                          className="block h-full bg-phosphor transition-[width] duration-700 ease-out"
                          style={{
                            width: inView
                              ? `${(r.weight / maxWeight) * 100}%`
                              : "0%",
                          }}
                        />
                      </span>
                    </button>
                    <div className="faq-panel" data-open={isOpen}>
                      <div>
                        <p className="pb-1 pl-5 pt-2 text-xs text-muted">
                          {r.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-xs text-muted">
              <EyeOff
                size={14}
                className="shrink-0 text-phosphor"
                aria-hidden="true"
              />
              {blindEvaluationNote.body}
            </p>
          </GlowCard>
        </Reveal>

        <Reveal delay={0.08}>
          <GlowCard className="flex h-full flex-col rounded-sm border border-phosphor/30 bg-panel p-5 sm:p-6">
            <span id="guidelines" className="block scroll-mt-24" />
            <h3 className="font-display text-lg font-bold text-fg">
              {templateMandate.title}
            </h3>
            <p className="mt-2 flex-1 text-sm text-muted">
              {templateMandate.body}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <DownloadButton
                href={event.assets.pptTemplate}
                label="Template"
              />
              <DownloadButton
                href={event.assets.rulebookPdf}
                label="Rulebook"
              />
            </div>
            <p className="mt-4 flex items-start gap-2 border-t border-line pt-3 text-xs text-muted">
              <TriangleAlert
                size={14}
                className="mt-0.5 shrink-0 text-phosphor"
                aria-hidden="true"
              />
              {googleSignInNote}
            </p>
          </GlowCard>
        </Reveal>
      </div>
    </Section>
  );
}
