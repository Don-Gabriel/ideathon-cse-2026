"use client";

/**
 * Interactive particle network — 2D canvas, no WebGL. Amber nodes drift and
 * link when close; the cursor repels nearby nodes and draws its own links,
 * so the field reacts to the visitor. A few rare cyan nodes keep the
 * signal-colour discipline.
 *
 * Performance: node count scales with area (capped), devicePixelRatio
 * capped at 2, the loop pauses when the canvas is off-screen or the tab is
 * hidden, and prefers-reduced-motion renders a single static frame.
 */

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  cyan: boolean;
}

const LINK_DIST = 110;
const MOUSE_DIST = 150;

export function ParticleField({
  className = "",
  /** px² of area per node — smaller = denser. */
  density = 16000,
  /** ms after mount before the simulation starts (static frame until then). */
  startDelay = 3000,
  maxNodes = 80,
}: {
  className?: string;
  density?: number;
  startDelay?: number;
  maxNodes?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // 1.5 is indistinguishable for 1px lines and keeps fill cost down
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(maxNodes, Math.floor((w * h) / density));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
        cyan: Math.random() < 0.07,
      }));
    };

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (animate) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;

          const dxm = n.x - mouse.x;
          const dym = n.y - mouse.y;
          const dm = Math.hypot(dxm, dym);
          if (dm < MOUSE_DIST && dm > 0.01) {
            const f = ((MOUSE_DIST - dm) / MOUSE_DIST) * 0.6;
            n.x += (dxm / dm) * f;
            n.y += (dym / dm) * f;
          }
        }
      }

      // node-to-node links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.14;
            ctx.strokeStyle = `rgba(255,176,32,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // cursor links — the interactive part
      if (animate && mouse.x > -999) {
        for (const n of nodes) {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (d < MOUSE_DIST) {
            const alpha = (1 - d / MOUSE_DIST) * 0.35;
            ctx.strokeStyle = `rgba(255,176,32,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = n.cyan
          ? "rgba(77,225,255,0.8)"
          : "rgba(255,176,32,0.55)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // ~30fps is plenty for slow drift and halves the main-thread cost
    let last = 0;
    const loop = (t: number) => {
      if (visible && !document.hidden && t - last >= 32) {
        last = t;
        draw(true);
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    let startTimer: ReturnType<typeof setTimeout> | undefined;
    if (reduce) {
      draw(false); // one static frame, no loop, no mouse
    } else {
      draw(false); // static first frame immediately…
      // …then start animating only after load has settled, so the
      // simulation never competes with hydration on slow devices.
      startTimer = setTimeout(() => {
        raf = requestAnimationFrame(loop);
      }, startDelay);
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => {
      resize();
      if (reduce) draw(false);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
    });
    io.observe(canvas);

    window.addEventListener("resize", onResize);
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }

    return () => {
      if (startTimer) clearTimeout(startTimer);
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [density, startDelay, maxNodes]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
