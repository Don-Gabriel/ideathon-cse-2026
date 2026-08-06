import type { MetadataRoute } from "next";
import { event } from "@/content/event";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${event.siteUrl}/sitemap.xml`,
  };
}
