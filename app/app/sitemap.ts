import type { MetadataRoute } from "next";
import { site } from "@/content";

/**
 * Sitemap for the single-page SSG site. Only the root URL: anchors
 * (#talento, #empresas…) are fragments of the same page, not indexable
 * URLs (R49/R50 — canonical is "/").
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
