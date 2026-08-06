/**
 * Contact & Q&A desk: the published support promise, then channel cards
 * rendered from config — add a channel in content/event.ts and it appears
 * here, nothing else to touch. Supports phone / whatsapp / email / instagram.
 */

import { AtSign, Mail, MessageCircle, Phone } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { CopyButton } from "@/components/ui/CopyButton";
import { event, type ChannelType } from "@/content/event";

const CHANNEL_ICON: Record<ChannelType, typeof Phone> = {
  phone: Phone,
  whatsapp: MessageCircle,
  email: Mail,
  instagram: AtSign,
};

const CHANNEL_HINT: Record<ChannelType, string> = {
  phone: "call",
  whatsapp: "whatsapp",
  email: "email",
  instagram: "instagram",
};

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="08 · support"
      title="Q&A desk"
    >
      <Reveal>
        <p className="max-w-2xl font-display text-2xl font-semibold leading-snug text-fg sm:text-3xl">
          {event.supportPromise.headline}
        </p>
        <p className="mt-4 max-w-2xl text-sm text-muted">
          {event.supportPromise.detail}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {event.channels.map((ch, i) => {
          const Icon = CHANNEL_ICON[ch.type];
          const external = ch.href.startsWith("http");
          return (
            <Reveal key={`${ch.type}-${ch.label}`} delay={i * 0.06}>
              <GlowCard className="relative h-full rounded-sm">
                <CopyButton
                  value={ch.value}
                  label={`Copy ${ch.label}'s ${ch.type}`}
                />
                <a
                href={ch.href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex h-full items-start gap-4 rounded-sm border border-line bg-panel p-6 transition-colors hover:border-phosphor/50"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-line text-phosphor"
                  aria-hidden="true"
                >
                  <Icon size={18} />
                </span>
                <span>
                  <span className="eyebrow block">
                    {CHANNEL_HINT[ch.type]}
                  </span>
                  <span className="mt-1 block font-display font-semibold text-fg">
                    {ch.label}
                  </span>
                  <span className="mt-1 block font-mono text-sm text-muted group-hover:text-fg">
                    {ch.value}
                  </span>
                  {ch.hours && (
                    <span className="eyebrow mt-2 block">{ch.hours}</span>
                  )}
                </span>
              </a>
              </GlowCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
