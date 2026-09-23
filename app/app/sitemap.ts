import type { MetadataRoute } from "next";
import { site } from "@/content";

/**
 * Sitemap for the bilingual single-page SSG site (i18n I4). Both locales are
 * listed with cross-referenced `alternates.languages` (hreflang); anchors
 * (#talento, #empresas…) are fragments of the same page, not indexable URLs
 * (R49/R50). ES keeps the unprefixed root canonical (`localePrefix:
 * "as-needed"`).
 */
/** Fixed content date (not `new Date()`): a `lastmod` that is always "now" is
 *  ignored by Google, so the true build/review date is published instead. */
const LAST_MODIFIED = new Date("2026-09-23");

/** Only ES is listed while `/en` is still a placeholder catalog (it is also
 *  `noindex` in the layout): advertising a mismatched hreflang would count
 *  against the ES page. Flip this back once the EN copy is translated. */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { es: `${site.url}/`, "x-default": `${site.url}/` };

  return [
    {
      url: `${site.url}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages },
    },
  ];
}
