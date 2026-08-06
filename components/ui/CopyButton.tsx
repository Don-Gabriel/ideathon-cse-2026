"use client";

/** Small copy-to-clipboard button with a "copied" confirmation state. */

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : label}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard unavailable — nothing to do */
        }
      }}
      className={`absolute right-3 top-3 z-10 rounded-sm border p-1.5 transition-colors ${
        copied
          ? "border-phosphor/60 text-phosphor"
          : "border-line text-muted hover:border-phosphor/60 hover:text-phosphor"
      }`}
    >
      {copied ? (
        <Check size={13} aria-hidden="true" />
      ) : (
        <Copy size={13} aria-hidden="true" />
      )}
    </button>
  );
}
