/**
 * Footer: embedded venue map, address + directions link, department credit,
 * social links (rendered only if configured), rulebook version + updated
 * date, copyright.
 */

import { MapPin } from "lucide-react";
import { event } from "@/content/event";
import { formatDate } from "@/lib/format";

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel pb-24 md:pb-0">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-sm border border-line">
            <iframe
              src={event.venue.mapEmbed}
              title={`Map — ${event.venue.institution}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-56 w-full grayscale-100 contrast-90 opacity-80"
            />
          </div>
          <p className="mt-4 flex items-start gap-2 text-sm text-muted">
            <MapPin
              size={15}
              className="mt-1 shrink-0 text-phosphor"
              aria-hidden="true"
            />
            <span>
              {event.venue.name},<br />
              {event.venue.institution}
            </span>
          </p>
          <a
            href={event.venue.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow mt-2 inline-block text-phosphor underline decoration-phosphor/40 underline-offset-4 hover:decoration-phosphor"
          >
            Get directions
          </a>
        </div>

        <div className="flex flex-col justify-between gap-8">
          <div>
            <p className="font-display text-xl font-bold text-fg">
              GENESIS{" "}
              <span className="eyebrow align-middle text-phosphor">1.0</span>
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              {event.presenter}.
            </p>
            {event.socialLinks.length > 0 && (
              <ul className="mt-4 flex gap-4">
                {event.socialLinks.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="eyebrow text-muted hover:text-phosphor"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid gap-1.5">
            <p className="eyebrow">
              rulebook {event.assets.rulebookVersion} · updated{" "}
              {formatDate(event.assets.rulebookUpdated)}
            </p>
            <p className="eyebrow">
              © 2026 dept of cse, {event.presenterShort.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
