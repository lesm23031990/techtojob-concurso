import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import { messagesByLocale, organizationJsonLd, site } from "@/content";
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

// Title/description are the exact strings from specs/11-contenido.md per locale
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
  // The image metadata route lives in this [locale] segment, so its real URL is
  // prefixed: /es/opengraph-image and /en/opengraph-image.
  const ogImage = resolved === "es" ? "/es/opengraph-image" : "/en/opengraph-image";

  return {
    metadataBase: new URL(site.url),
    title: {
      default: meta.title,
      template: "%s | TechToJob",
    },
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        es: "/",
        en: "/en",
      },
    },
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
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
    robots: {
      index: true,
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

  // JSON-LD Organization (R52): name, logo, URL and social profiles.
  const jsonLd = organizationJsonLd(site.url, messages);

  return (
    <html lang={locale} className={`${sora.variable} h-full antialiased`}>
      <NextIntlClientProvider locale={locale} messages={messages}>
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
