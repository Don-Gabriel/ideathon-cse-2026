import type { Metadata } from "next";
import { Chakra_Petch, Inter, JetBrains_Mono } from "next/font/google";
import { event, eventDates } from "@/content/event";
import "./globals.css";

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = `${event.name} — ${event.subtitle} | ${event.presenterShort}`;

export const metadata: Metadata = {
  metadataBase: new URL(event.siteUrl),
  title,
  description: event.description,
  keywords: [
    "GENESIS",
    "ideathon",
    "GCE Tirunelveli",
    "Government College of Engineering Tirunelveli",
    "CSE",
    "innovation",
  ],
  openGraph: {
    title,
    description: event.description,
    url: event.siteUrl,
    siteName: event.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: event.description,
  },
};

/**
 * schema.org Event structured data, derived from config.
 * The finale dates are optional here: until they are announced we emit the
 * registration window instead of inventing a start date.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${event.name} — ${event.subtitle}`,
  description: event.description,
  ...(eventDates.finaleStart
    ? { startDate: eventDates.finaleStart }
    : { startDate: eventDates.regOpen }),
  ...(eventDates.finaleEnd ? { endDate: eventDates.finaleEnd } : {}),
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  isAccessibleForFree: true,
  location: {
    "@type": "Place",
    name: event.venue.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tirunelveli",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  },
  organizer: {
    "@type": "CollegeOrUniversity",
    name: event.venue.institution,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${chakra.variable} ${jetbrains.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
