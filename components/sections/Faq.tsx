"use client";

/**
 * FAQ accordion: real buttons, aria-expanded/aria-controls, keyboard
 * navigable, one item open at a time across all groups.
 */

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqGroups } from "@/content/faqs";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Faq() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const baseId = useId();

  return (
    <Section
      id="faq"
      eyebrow="07 · faq"
      title="Questions, answered"
      lead="If yours isn't here, call a coordinator — and if it's one others will have, it gets added here."
    >
      <div className="grid gap-10">
        {faqGroups.map((group) => (
          <Reveal key={group.id}>
            <h3 className="eyebrow mb-3 text-phosphor">{group.label}</h3>
            <div className="divide-y divide-line rounded-sm border border-line bg-panel">
              {group.items.map((item, i) => {
                const key = `${group.id}-${i}`;
                const open = openKey === key;
                const panelId = `${baseId}-${key}-panel`;
                const btnId = `${baseId}-${key}-button`;
                return (
                  <div key={key}>
                    <h4>
                      <button
                        type="button"
                        id={btnId}
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setOpenKey(open ? null : key)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[0.95rem] font-medium text-fg transition-colors hover:bg-void/40"
                      >
                        {item.q}
                        <ChevronDown
                          size={16}
                          aria-hidden="true"
                          className={`shrink-0 text-muted transition-transform ${
                            open ? "rotate-180 text-phosphor" : ""
                          }`}
                        />
                      </button>
                    </h4>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      aria-hidden={!open}
                      data-open={open}
                      className="faq-panel"
                    >
                      <div>
                        <p className="max-w-2xl px-5 pb-5 text-sm text-muted">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
