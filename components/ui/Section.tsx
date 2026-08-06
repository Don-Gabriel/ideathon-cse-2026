/**
 * Shared section shell: mono eyebrow, typewriter display heading, optional
 * lead paragraph, tight vertical rhythm. Keeps every section's header
 * identical in structure so the page reads as one system.
 */

import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Typewriter } from "@/components/ui/Typewriter";

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = "",
}: {
  id: string;
  /** Mono eyebrow, e.g. "02 · eligibility". */
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 px-5 sm:px-8 ${className}`}>
      <div className="mx-auto max-w-5xl py-10 sm:py-14">
        <Reveal>
          <p className="eyebrow">
            <span className="text-phosphor">$</span> {eyebrow}
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
            <Typewriter text={title} />
          </h2>
          {lead && <p className="mt-3 max-w-2xl text-sm text-muted">{lead}</p>}
        </Reveal>
        <div className="mt-7">{children}</div>
      </div>
    </section>
  );
}
