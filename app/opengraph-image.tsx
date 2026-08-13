/**
 * The 1200×630 OG image — what appears when the link is shared in a group
 * chat. Generated at build time with next/og; tries to load Chakra Petch
 * from Google Fonts and falls back to the default face if the fetch fails
 * (e.g. building offline).
 */

import { ImageResponse } from "next/og";
import { event } from "@/content/event";

export const alt = `${event.name} — ${event.subtitle}, ${event.presenterShort}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadChakra(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@700",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OgImage() {
  const chakra = await loadChakra();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#06080D",
          backgroundImage:
            "linear-gradient(#1C2430 1px, transparent 1px), linear-gradient(90deg, #1C2430 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          padding: "64px 72px",
          fontFamily: chakra ? "Chakra" : "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#7D8794",
            fontSize: 24,
            letterSpacing: "0.15em",
          }}
        >
          <span>$ GENESIS --INIT</span>
          <span
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <span
              style={{ width: 12, height: 12, background: "#4DE1FF" }}
            />
            <span>INTRA-COLLEGE</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 176,
              fontWeight: 700,
              color: "#E6EDF3",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            GENESIS
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 44,
              fontWeight: 700,
              color: "#FFB020",
            }}
          >
            Ideathon 1.0
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#7D8794",
            fontSize: 26,
          }}
        >
          <span>Dept of CSE · Government College of Engineering, Tirunelveli</span>
          <span style={{ color: "#FFB020" }}>REG 17 AUG – 3 SEP 2026</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: chakra
        ? [{ name: "Chakra", data: chakra, weight: 700 as const }]
        : undefined,
    }
  );
}
