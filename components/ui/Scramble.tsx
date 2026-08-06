"use client";

/**
 * Text scramble ("decode") effect: characters cycle through terminal glyphs
 * and lock in left to right. Runs once on mount and again on hover.
 * Server HTML carries the final text; reduced motion never scrambles.
 */

import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

export function Scramble({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = useCallback(() => {
    if (timer.current) return; // already playing
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    timer.current = setInterval(() => {
      frame += 1;
      let out = "";
      let done = true;
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " " || frame > i * 2 + 4) {
          out += text[i];
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          done = false;
        }
      }
      setDisplay(out);
      if (done && timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    }, 40);
  }, [text]);

  useEffect(() => {
    const t = setTimeout(play, 60);
    return () => {
      clearTimeout(t);
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [play]);

  return (
    <span className={className} onMouseEnter={play}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
