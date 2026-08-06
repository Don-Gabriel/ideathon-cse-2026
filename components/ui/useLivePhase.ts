"use client";

/**
 * Live phase hook. Initial value is the phase computed at build time (passed
 * down from the server) so hydration matches the static HTML exactly; after
 * mount it re-derives from the visitor's clock and keeps itself current.
 */

import { useEffect, useState } from "react";
import { derivePhase, type PhaseId } from "@/lib/phase";

export function useLivePhase(buildPhase: PhaseId): {
  phase: PhaseId;
  mounted: boolean;
} {
  const [state, setState] = useState({ phase: buildPhase, mounted: false });

  useEffect(() => {
    const tick = () =>
      setState({ phase: derivePhase(new Date()), mounted: true });
    const t = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(t);
      clearInterval(id);
    };
  }, []);

  return state;
}
