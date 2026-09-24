import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import { messagesByLocale, organizationJsonLd, site, websiteJsonLd, type Locale } from "@/content";
import { routing } from "@/i18n/routing";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// Sora — fixed by contest rules (R28/R58), exactly three weights (R59:
// "una fuente y tres pesos. No ocho variantes"). Subset latin only; no
// italic exists in the content. Mapped to font-sans via --font-sora.
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-sora",
});

/** Only the two declared locales exist (i18n I2): Next prerenders `/es` and
 *  `/en`, and the `as-needed` middleware serves the default locale at `/`
 *  (I1) — anything else 404s from the layout guard below. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Title/description are the exact strings from specs/11-content.md per locale
// (ES title 56 chars, description 155 chars — R47/R48). metadataBase is the
// Vercel deploy placeholder (Q4): it makes every OG/canonical URL absolute.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolved = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const { meta } = messagesByLocale[resolved];
  const canonical = resolved === "es" ? "/" : "/en";
  // The image metadata route lives in this [locale] segment and, because it
  // exports `generateImageMetadata`, it is served at `…/opengraph-image/og`
  // (id "og") — the bare `/opengraph-image` path would 404.
  const ogImage =
    resolved === "es" ? "/es/opengraph-image/og" : "/en/opengraph-image/og";

  return {
    metadataBase: new URL(site.url),
    title: {
      default: meta.title,
      template: "%s | TechToJob",
    },
    description: meta.description,
    alternates:
      resolved === "es"
        ? { canonical: "/", languages: { es: "/", "x-default": "/" } }
        : { canonical: "/en" },
    openGraph: {
      type: "website",
      locale: resolved === "es" ? "es_ES" : "en_US",
      url: canonical,
      siteName: site.name,
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: meta.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@techtojob",
      creator: "@techtojob",
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
    // EN keeps this catalog as an i18n-ready MIRROR of ES (no translation yet):
    // reachable, but noindex until the copy is really translated, so a
    // mismatched hreflang never counts against the ES page (D126).
    robots: {
      index: resolved === "es",
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2f3436",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Opts the [locale] segment into static rendering (i18n I2).
  setRequestLocale(locale);
  const messages = messagesByLocale[locale];

  // JSON-LD @graph (R52): Organization + WebSite so search engines resolve the
  // brand entity and its site as one graph.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(site.url, messages),
      websiteJsonLd(site.url, locale as Locale),
    ],
  };

  return (
    <html lang={locale} className={`${sora.variable} h-full`}>
      <NextIntlClientProvider locale={locale} messages={{ newsletter: messages.newsletter }}>
        <body className="flex min-h-full flex-col">
          {/* Skip link: first tabbable element, revealed on focus only —
              visible text, not hidden keywords (does not violate R60) */}
          <a
            href="#contenido"
            className="sr-only rounded-none bg-brand px-5 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]"
          >
            {messages.a11y.skipLink}
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
