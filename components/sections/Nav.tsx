"use client";

/**
 * Fixed top navigation + the mobile sticky bottom register CTA.
 * Desktop: mark left, section links centre, amber Register right.
 * Mobile: hamburger -> full-screen overlay; persistent bottom CTA bar.
 * Active section highlights on scroll via IntersectionObserver.
 */

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { event, heroByPhase, navLinks } from "@/content/event";
import type { PhaseId } from "@/lib/phase";
import { useLivePhase } from "@/components/ui/useLivePhase";

export function Nav({ buildPhase }: { buildPhase: PhaseId }) {
  const { phase } = useLivePhase(buildPhase);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const hero = heroByPhase[phase];
  const registerHref = event.registrationUrl || "#contact";
  const registerLive = !hero.ctaDisabled && hero.ctaAction === "register";

  // Scroll spy
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Overlay: lock scroll, close on Escape, move focus in
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-void/85 backdrop-blur-sm">
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
        >
          <a
            href="#top"
            className="flex items-baseline gap-2 font-display text-lg font-bold tracking-tight text-fg"
          >
            GENESIS
            <span className="eyebrow text-phosphor">1.0</span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`font-mono text-[0.78rem] uppercase tracking-[0.15em] transition-colors hover:text-fg ${
                    active === l.href.slice(1) ? "text-phosphor" : "text-muted"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={registerHref}
              {...(event.registrationUrl
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="hidden rounded-sm bg-phosphor px-4 py-2 font-mono text-[0.78rem] font-medium uppercase tracking-[0.12em] text-void transition-opacity hover:opacity-85 md:block"
            >
              Register
            </a>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="text-fg md:hidden"
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-void md:hidden">
          <div className="flex h-16 items-center justify-between border-b border-line px-5">
            <span className="font-display text-lg font-bold text-fg">
              GENESIS
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="text-fg"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <ul className="flex flex-1 flex-col justify-center gap-2 px-8">
            {navLinks.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-3 font-display text-2xl font-semibold text-fg"
                >
                  <span className="eyebrow text-phosphor">
                    0{i + 1}
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-8 pb-24">
            <a
              href={registerHref}
              {...(event.registrationUrl
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              onClick={() => setOpen(false)}
              className="block rounded-sm bg-phosphor px-5 py-3.5 text-center font-mono text-sm font-medium uppercase tracking-[0.12em] text-void"
            >
              Register your team
            </a>
          </div>
        </div>
      )}

      {/* Persistent mobile bottom CTA — never more than one thumb-reach away */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-void/92 px-4 py-3 backdrop-blur-sm md:hidden">
        {registerLive ? (
          <a
            href={registerHref}
            {...(event.registrationUrl
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={`block rounded-sm px-5 py-3 text-center font-mono text-sm font-medium uppercase tracking-[0.12em] text-void ${
              hero.ctaDanger ? "bg-danger" : "bg-phosphor"
            }`}
          >
            {hero.ctaLabel}
          </a>
        ) : (
          <a
            href={hero.ctaAction === "none" ? "#timeline" : "#updates"}
            className="block rounded-sm border border-line bg-panel px-5 py-3 text-center font-mono text-sm font-medium uppercase tracking-[0.12em] text-muted"
          >
            {hero.ctaLabel}
          </a>
        )}
      </div>
    </>
  );
}
