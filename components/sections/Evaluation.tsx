"use client";

/**
 * How to submit. No scoring rubric is published (see content/guidelines.ts):
 * the left card lists, qualitatively, what the panel looks for — each item
 * expands on click — and closes with the blind-evaluation note. The right
 * card carries the template mandate + downloads (URLs in content/event.ts).
 */

import { useState } from "react";
import { ChevronDown, Download, EyeOff, TriangleAlert } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import {
  blindEvaluationNote,
  googleSignInNote,
  templateMandate,
  whatCounts,
} from "@/content/guidelines";
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
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Section
      id="submission"
      eyebrow="04 · submission"
      title="How to submit"
      lead="What the panel is looking for, and the one format it accepts."
    >
      <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
        <Reveal>
          <GlowCard className="flex h-full flex-col rounded-sm border border-line bg-panel p-5 sm:p-6">
            <h3 className="font-display text-lg font-bold text-fg">
              What counts
            </h3>
            <div className="mt-4 grid flex-1 gap-px overflow-hidden rounded-sm border border-line bg-line">
              {whatCounts.map((c) => {
                const isOpen = open === c.id;
                return (
                  <div key={c.id} className="bg-panel">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : c.id)}
                      className="group flex w-full items-center gap-2 px-4 py-3 text-left"
                    >
                      <ChevronDown
                        size={13}
                        aria-hidden="true"
                        className={`shrink-0 text-muted transition-transform group-hover:text-phosphor ${
                          isOpen ? "rotate-180 text-phosphor" : ""
                        }`}
                      />
                      <span className="text-sm font-medium text-fg">
                        {c.title}
                      </span>
                    </button>
                    <div className="faq-panel" data-open={isOpen}>
                      <div>
                        <p className="px-4 pb-3 pl-9 text-xs text-muted">
                          {c.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 flex items-start gap-2 border-t border-line pt-4 text-xs text-muted">
              <EyeOff
                size={14}
                className="mt-0.5 shrink-0 text-phosphor"
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
