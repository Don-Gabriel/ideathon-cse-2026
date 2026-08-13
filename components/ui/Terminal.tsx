"use client";

/**
 * The hero terminal — actually usable. Boots with a short compile log
 * (skippable via Escape or click), then accepts commands: help, dates,
 * prizes, rules, venue, contact, register, whoami, ls, git,
 * bot, matrix, clear… On touch screens a row of quick-command chips
 * replaces typing. Facts are pulled from /content config, never invented.
 */

import { useEffect, useRef, useState } from "react";
import { event } from "@/content/event";

interface Line {
  text: string;
  tone?: "in" | "ok" | "err";
}

const BOOT: Line[] = [
  { text: "$ genesis --init", tone: "in" },
  { text: "> loading modules: ideas, teams[≤5], departments[*]" },
  { text: "> track: open-innovation ... ok" },
  { text: "> venue: SSS Block, Dept of CSE ... ok" },
  { text: "▸ ready — GENESIS v1.0 · type `help`", tone: "ok" },
];

const CHIPS = ["help", "dates", "prizes", "rules", "register"];

function run(cmd: string): Line[] {
  const c = cmd.trim().toLowerCase();
  if (!c) return [];
  if (c === "help")
    return [
      { text: "commands: dates · prizes · rules · venue · contact" },
      { text: "          register · whoami · ls · bot · matrix · clear" },
    ];
  if (c === "dates")
    return [
      { text: "reg opens ..... mon 17 aug 2026, 00:00" },
      { text: "reg closes .... thu 03 sep 2026, 23:59", tone: "ok" },
      { text: "shortlist ..... to be announced" },
      { text: "finale ........ to be announced" },
    ];
  if (c === "prizes")
    return [
      { text: "cash prizes for the winning teams", tone: "ok" },
      { text: "amounts announced through official channels" },
    ];
  if (c === "rules")
    return [{ text: "assert team.size <= 5;  // the only rule", tone: "ok" }];
  if (c === "venue")
    return [{ text: `${event.venue.name}, ${event.venue.institution}` }];
  if (c === "contact")
    return event.channels.map((ch) => ({
      text: `${ch.label.toLowerCase()} .... ${ch.value}`,
    }));
  if (c === "register")
    return event.registrationUrl
      ? [{ text: "opening registration form …", tone: "ok" }]
      : [
          { text: "form link publishes before 17 aug — watch Updates.", tone: "err" },
        ];
  if (c === "whoami") return [{ text: "guest@genesis — future finalist" }];
  if (c === "ls") return [{ text: "ideas/  teams/  prizes/  finale/" }];
  if (c === "bot" || c === "gen0" || c === "gen-0")
    return [{ text: "GEN-0: beep. bring a problem worth solving.", tone: "ok" }];
  if (c === "matrix") return [{ text: "wake up …", tone: "ok" }];
  if (c.startsWith("sudo"))
    return [{ text: "permission denied: creativity cannot be sudo'd", tone: "err" }];
  if (c.startsWith("git"))
    return [
      { text: "on branch idea/your-big-thing — nothing committed yet." },
      { text: "hint: deadline is 3 sep, 11:59 pm.", tone: "err" },
    ];
  if (c === "clear") return [];
  return [{ text: `command not found: ${c} — try 'help'`, tone: "err" }];
}

export function Terminal() {
  const [booted, setBooted] = useState(true); // SSR: full boot log visible
  const [bootCount, setBootCount] = useState(BOOT.length);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Boot animation (post-mount replay, reduced-motion skips)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = -1;
    const step = () => {
      i += 1;
      setBootCount(i);
      setBooted(i >= BOOT.length);
      if (i >= BOOT.length) clearInterval(id);
    };
    const t = setTimeout(step, 0);
    const id = setInterval(step, 300);
    const skip = () => {
      i = BOOT.length;
      setBootCount(i);
      setBooted(true);
      clearInterval(id);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      clearInterval(id);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Keep scrolled to the latest line
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, bootCount]);

  const exec = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    if (!c) return;
    if (c === "clear") {
      setLines([]);
      return;
    }
    setLines((prev) => [
      ...prev.slice(-40),
      { text: `$ ${c}`, tone: "in" as const },
      ...run(c),
    ]);
    if (c === "matrix") {
      window.dispatchEvent(new CustomEvent("genesis:matrix"));
    }
    if (c === "register" && event.registrationUrl) {
      window.open(event.registrationUrl, "_blank", "noopener,noreferrer");
    }
  };

  const toneCls = (l: Line) =>
    l.tone === "ok"
      ? "text-phosphor"
      : l.tone === "err"
        ? "text-danger"
        : l.tone === "in"
          ? "text-fg"
          : "text-muted";

  return (
    <div
      className="w-full max-w-xl rounded-sm border border-line bg-panel/80 backdrop-blur-[2px]"
      onClick={() => {
        if (!booted) {
          setBootCount(BOOT.length);
          setBooted(true);
        } else {
          inputRef.current?.focus();
        }
      }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-line px-3.5 py-2">
        <span className="eyebrow">gen-shell — /home/guest</span>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-phosphor/60" />
        </span>
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        className="h-48 overflow-y-auto p-3.5 font-mono text-[0.72rem] leading-6 sm:h-52"
      >
        {BOOT.slice(0, bootCount).map((l, i) => (
          <div
            key={`b-${i}`}
            className={`${toneCls(l)} ${
              i === bootCount - 1 && !booted ? "caret" : ""
            }`}
          >
            {l.text}
          </div>
        ))}
        {lines.map((l, i) => (
          <div key={`l-${i}`} className={toneCls(l)}>
            {l.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        className="flex items-center gap-2 border-t border-line px-3.5 py-2"
        onSubmit={(e) => {
          e.preventDefault();
          exec(value);
          setValue("");
        }}
      >
        <span className="font-mono text-[0.72rem] text-phosphor" aria-hidden>
          $
        </span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="GENESIS terminal — type help for commands"
          placeholder={booted ? "type a command…" : "booting…"}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          enterKeyHint="send"
          className="w-full bg-transparent font-mono text-[0.72rem] text-fg placeholder:text-muted/60 focus:outline-none"
        />
      </form>

      {/* Quick commands — the touch path */}
      <div className="flex flex-wrap gap-1.5 border-t border-line px-3.5 py-2">
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              exec(c);
            }}
            className="rounded-sm border border-line px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted transition-colors hover:border-phosphor hover:text-phosphor"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
