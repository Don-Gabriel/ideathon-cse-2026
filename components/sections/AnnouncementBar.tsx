"use client";

/**
 * Announcement bar under the hero: newest entry from content/updates.ts,
 * shown only while it is less than 7 days old. Dismissible per session.
 * Server HTML renders it (based on build-time age passed from the page);
 * after mount the client re-checks age and the session dismissal.
 */

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { updates } from "@/content/updates";
import { formatDate } from "@/lib/format";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function isFresh(dateIso: string, now: Date): boolean {
  const d = new Date(`${dateIso}T00:00:00+05:30`);
  if (Number.isNaN(d.getTime())) return false;
  const age = now.getTime() - d.getTime();
  return age >= -SEVEN_DAYS_MS && age <= SEVEN_DAYS_MS;
}

export function AnnouncementBar({ freshAtBuild }: { freshAtBuild: boolean }) {
  const latest = updates[0];
  const [visible, setVisible] = useState(freshAtBuild);

  const storageKey = latest ? `genesis-bar-${latest.date}-${latest.title}` : "";

  useEffect(() => {
    if (!latest) return;
    const id = setTimeout(() => {
      let dismissed = false;
      try {
        dismissed = sessionStorage.getItem(storageKey) === "1";
      } catch {
        /* storage unavailable — treat as not dismissed */
      }
      setVisible(isFresh(latest.date, new Date()) && !dismissed);
    }, 0);
    return () => clearTimeout(id);
  }, [latest, storageKey]);

  if (!latest || !visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      /* private mode — dismiss lasts until reload, fine */
    }
  };

  return (
    <div className="border-b border-line bg-panel">
      <div className="mx-auto flex max-w-5xl items-start gap-4 border-l-2 border-phosphor px-5 py-3.5 sm:items-center sm:px-8">
        <p className="flex-1 text-sm text-fg">
          <span className="eyebrow mr-3 text-phosphor">
            {formatDate(latest.date)}
          </span>
          <span className="font-medium">{latest.title}</span>
          <a href="#updates" className="ml-2 text-muted underline decoration-line underline-offset-4 hover:text-fg">
            Read more
          </a>
        </p>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={dismiss}
          className="mt-0.5 shrink-0 text-muted transition-colors hover:text-fg"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
