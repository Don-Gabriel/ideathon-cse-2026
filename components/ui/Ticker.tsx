/**
 * Marquee ticker of event facts, terminal-style. Pure CSS animation
 * (pauses on hover, static under reduced motion). Content duplicated for
 * a seamless loop; the duplicate is aria-hidden.
 */

import { event } from "@/content/event";

const FACTS = [
  "open innovation — any domain",
  "teams of up to 5",
  "cash prizes for the winners",
  "entry fee ₹0",
  "blind evaluation",
  "top 20 pitch live",
  "finale — sss block, dept of cse",
  event.presenterShort.toLowerCase(),
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <span
      className="flex shrink-0 items-center"
      {...(hidden ? { "aria-hidden": true } : {})}
    >
      {FACTS.map((f) => (
        <span
          key={f}
          className="flex items-center whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted"
        >
          <span className="px-5">{f}</span>
          <span className="text-phosphor">{"///"}</span>
        </span>
      ))}
    </span>
  );
}

export function Ticker() {
  return (
    <div className="group overflow-hidden border-b border-line bg-panel/60 py-2.5 backdrop-blur-[2px]">
      <div className="ticker-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
