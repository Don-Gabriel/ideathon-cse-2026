/**
 * The single page. Statically generated: `buildNow` is the build moment,
 * used as the initial (hydration-safe) input to every date-aware component;
 * each of them re-derives from the visitor's clock after mount.
 */

import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { Chrome } from "@/components/ui/Chrome";
import { ParticleField } from "@/components/ui/ParticleField";
import { Ticker } from "@/components/ui/Ticker";
import { About } from "@/components/sections/About";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Timeline } from "@/components/sections/Timeline";
import { Evaluation } from "@/components/sections/Evaluation";
import { Prizes } from "@/components/sections/Prizes";
import { Updates } from "@/components/sections/Updates";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Team } from "@/components/sections/Team";
import { Footer } from "@/components/sections/Footer";
import { derivePhase } from "@/lib/phase";
import { updates } from "@/content/updates";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export default function Home() {
  const buildNow = new Date();
  const buildPhase = derivePhase(buildNow);

  const latest = updates[0];
  const latestDate = latest ? new Date(`${latest.date}T00:00:00+05:30`) : null;
  const freshAtBuild =
    !!latestDate &&
    !Number.isNaN(latestDate.getTime()) &&
    Math.abs(buildNow.getTime() - latestDate.getTime()) <= SEVEN_DAYS_MS;

  return (
    <>
      {/* Global constellation behind every section — the page is never empty */}
      <ParticleField
        className="fixed inset-0 -z-10 h-full w-full"
        density={22000}
        startDelay={3500}
        maxNodes={70}
      />
      <Chrome buildPhase={buildPhase} />
      <Nav buildPhase={buildPhase} />
      <main>
        <Hero buildPhase={buildPhase} />
        <Ticker />
        <AnnouncementBar freshAtBuild={freshAtBuild} />
        <About />
        <HowItWorks />
        <Timeline buildNowIso={buildNow.toISOString()} />
        <Evaluation />
        <Prizes />
        <Updates />
        <Faq />
        <Contact />
        <Team />
      </main>
      <Footer />
    </>
  );
}
