"use client";

/**
 * The GENESIS wordmark, letter by letter: decodes from glyphs on load,
 * individual letters lift and re-scramble under the cursor, and every few
 * seconds a random letter flickers cyan. Screen readers get the plain
 * word; reduced motion renders it static.
 */

import { useEffect, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

export function GlitchTitle({ text }: { text: string }) {
  const letters = text.split("");
  const [display, setDisplay] = useState(letters);
  const [flicker, setFlicker] = useState(-1);
  const [hovered, setHovered] = useState(-1);

  // Decode on mount
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      let done = true;
      setDisplay(
        letters.map((ch, i) => {
          if (frame > i * 3 + 5) return ch;
          done = false;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
      );
      if (done) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  // Ambient flicker: one random letter blinks cyan now and then
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let off: ReturnType<typeof setTimeout> | undefined;
    const id = setInterval(() => {
      setFlicker(Math.floor(Math.random() * letters.length));
      off = setTimeout(() => setFlicker(-1), 140);
    }, 3600);
    return () => {
      clearInterval(id);
      if (off) clearTimeout(off);
    };
  }, [letters.length]);

  return (
    <span>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex">
        {letters.map((ch, i) => (
          <span
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(-1)}
            className={`inline-block transition-transform duration-200 ${
              flicker === i ? "text-signal" : ""
            } ${hovered === i ? "-translate-y-1.5 text-phosphor" : ""}`}
          >
            {hovered === i
              ? GLYPHS[(i * 7 + display[i].charCodeAt(0)) % GLYPHS.length]
              : display[i]}
          </span>
        ))}
      </span>
    </span>
  );
}
