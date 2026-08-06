/**
 * Updates: the official record. Reverse-chronological feed straight from
 * content/updates.ts — array order is display order (newest first).
 */

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { updates } from "@/content/updates";
import { formatDate } from "@/lib/format";

export function Updates() {
  return (
    <Section
      id="updates"
      eyebrow="06 · updates"
      title="Official announcements"
      lead="Everything that matters gets posted here, whatever else it's announced on. If it isn't here, it isn't official."
    >
      <ol className="grid gap-3">
        {updates.map((u, i) => (
          <li key={`${u.date}-${u.title}`}>
            <Reveal
              delay={i * 0.04}
              className="rounded-sm border border-line bg-panel p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <time className="eyebrow text-phosphor" dateTime={u.date}>
                  {formatDate(u.date)}
                </time>
                {u.tag && (
                  <span className="rounded-sm border border-line px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-signal">
                    {u.tag}
                  </span>
                )}
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold text-fg">
                {u.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-muted">{u.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
