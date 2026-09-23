import { defineRouting } from "next-intl/routing";

/**
 * Locale routing (spec 12-i18n, I1): Spanish is the default and lives at `/`
 * (no prefix); English lives at `/en`. `as-needed` keeps the ES canonical
 * exactly as before i18n, so no existing URL changes.
 *
 * `localeDetection: false` is required by I1: with the default detection, a
 * browser sending `Accept-Language: en` gets `/` redirected to `/en`, so the
 * URL would not deterministically serve Spanish (and automated SEO checks run
 * with an English locale). Routing here is explicit: `/` is ES, `/en` is EN,
 * and the selector is the only way to switch.
 */
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  localeDetection: false,
});
