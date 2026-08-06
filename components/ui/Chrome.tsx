"use client";

/**
 * Site-wide interactive chrome, one client island:
 *  - amber scroll-progress hairline under the nav
 *  - custom terminal cursor (fine pointers only): dot + lagging ring that
 *    expands over interactive elements
 *  - bottom-right HUD (lg+): live IST clock · phase readout · back-to-top
 *  - vertical side rails filling wide-screen gutters (xl+)
 *  - matrix-rain overlay, triggered by the terminal `matrix` command or
 *    the Konami code
 * Everything transform/opacity only; all of it sits out of the way of
 * screen readers and reduced-motion users.
 */

import { useEffect, useRef, useState } from "react";
import { ChevronUp } from "lucide-react";
import { derivePhase, type PhaseId } from "@/lib/phase";

/* ————— scroll progress ————— */
function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = barRef.current;
        if (!el) return;
        const max = document.body.scrollHeight - innerHeight;
        el.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed inset-x-0 top-16 z-40 h-px origin-left bg-phosphor"
      style={{ transform: "scaleX(0)" }}
    />
  );
}

/* ————— custom cursor ————— */
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const t = setTimeout(() => setActive(true), 0);
    document.documentElement.classList.add("custom-cursor");

    let x = -100, y = -100, rx = -100, ry = -100, s = 1;
    let hot = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = e.target as Element | null;
      hot = !!el?.closest?.(
        "a, button, input, textarea, select, [role='button'], summary"
      );
    };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      s += ((hot ? 1.9 : 1) - s) * 0.2;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) scale(${s.toFixed(3)})`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  if (!active) return null;
  return (
    <div aria-hidden="true">
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[60] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-phosphor"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[60] -ml-3.5 -mt-3.5 h-7 w-7 rounded-full border border-phosphor/50 transition-[scale]"
      />
    </div>
  );
}

/* ————— HUD: clock · phase · top ————— */
const PHASE_LABEL: Record<PhaseId, string> = {
  BEFORE_OPEN: "queued",
  REG_OPEN: "reg open",
  REG_CLOSING_SOON: "closing soon",
  REG_CLOSED: "screening",
  SHORTLIST_OUT: "shortlist out",
  FINALE_DAY: "live",
  COMPLETE: "complete",
  UNKNOWN: "standby",
};

function Hud({ buildPhase }: { buildPhase: PhaseId }) {
  const [clock, setClock] = useState("--:--:--");
  const [phase, setPhase] = useState<PhaseId>(buildPhase);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour12: false,
        })
      );
      setPhase(derivePhase(now));
    };
    const t = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(t);
      clearInterval(id);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 hidden items-center overflow-hidden rounded-sm border border-line bg-panel/85 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted backdrop-blur-sm lg:flex">
      <span className="tabular px-3 py-2">{clock} ist</span>
      <span className="border-l border-line px-3 py-2 text-phosphor">
        {PHASE_LABEL[phase]}
      </span>
      <a
        href="#top"
        aria-label="Back to top"
        className="border-l border-line px-2.5 py-2 text-fg transition-colors hover:bg-phosphor hover:text-void"
      >
        <ChevronUp size={13} aria-hidden="true" />
      </a>
    </div>
  );
}

/* ————— side rails (xl+ gutters are never empty) ————— */
function SideRails() {
  const rail =
    "pointer-events-none fixed top-1/2 z-30 hidden -translate-y-1/2 font-mono text-[0.6rem] uppercase tracking-[0.35em] text-muted/40 xl:block";
  return (
    <div aria-hidden="true">
      <p className={`${rail} left-4 [writing-mode:vertical-rl] rotate-180`}>
        genesis · ideathon 1.0 · gce tirunelveli
      </p>
      <p className={`${rail} right-4 [writing-mode:vertical-rl]`}>
        dept of cse · est. 2026 · build v1.0
      </p>
    </div>
  );
}

/* ————— matrix rain easter egg ————— */
const KONAMI = [
  "arrowup", "arrowup", "arrowdown", "arrowdown",
  "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a",
];

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [on, setOn] = useState(false);

  // Triggers: terminal event + Konami code
  useEffect(() => {
    let progress = 0;
    const onEvent = () => setOn(true);
    const onKey = (e: KeyboardEvent) => {
      progress = e.key.toLowerCase() === KONAMI[progress] ? progress + 1 : 0;
      if (progress >= KONAMI.length) {
        progress = 0;
        setOn(true);
      }
    };
    window.addEventListener("genesis:matrix", onEvent);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("genesis:matrix", onEvent);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!on) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const cols = Math.floor(innerWidth / 16);
    // Seed drops across the screen so the rain is visible immediately
    const drops = Array.from(
      { length: cols },
      () => Math.random() * (innerHeight / 16) - 10
    );
    const glyphs = "アイウエオカキクケコ01<>[]{}$#*";
    let raf = 0;
    let last = 0;
    const step = (t: number) => {
      if (t - last >= 50) {
        last = t;
        ctx.fillStyle = "rgba(6,8,13,0.18)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "14px monospace";
        for (let i = 0; i < cols; i++) {
          const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
          ctx.fillStyle = Math.random() < 0.08 ? "#4DE1FF" : "#FFB020";
          ctx.fillText(ch, i * 16, drops[i] * 16);
          drops[i] = drops[i] * 16 > canvas.height ? 0 : drops[i] + 1;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const off = setTimeout(() => setOn(false), 5000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(off);
    };
  }, [on]);

  if (!on) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] opacity-90"
    />
  );
}

export function Chrome({ buildPhase }: { buildPhase: PhaseId }) {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Hud buildPhase={buildPhase} />
      <SideRails />
      <MatrixRain />
    </>
  );
}
