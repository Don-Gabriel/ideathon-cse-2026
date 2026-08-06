import type { MetadataRoute } from "next";
import { event } from "@/content/event";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: event.siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
