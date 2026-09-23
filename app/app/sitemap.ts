import type { MetadataRoute } from "next";
import { site } from "@/content";

/**
 * Sitemap for the bilingual single-page SSG site (i18n I4). Both locales are
 * listed with cross-referenced `alternates.languages` (hreflang); anchors
 * (#talento, #empresas…) are fragments of the same page, not indexable URLs
 * (R49/R50). ES keeps the unprefixed root canonical (`localePrefix:
 * "as-needed"`).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { es: `${site.url}/`, en: `${site.url}/en` };

  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${site.url}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages },
    },
  ];
}
