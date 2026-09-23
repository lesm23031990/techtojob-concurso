import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { messages, organizationJsonLd, site } from "@/content";
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

// Title/description are the exact strings from specs/11-contenido.md
// (title 56 chars, description 155 chars — R47/R48). metadataBase is the
// Vercel deploy placeholder (Q4): it makes every OG/canonical URL absolute.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: messages.meta.title,
    template: "%s | TechToJob",
  },
  description: messages.meta.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: site.name,
    title: messages.meta.title,
    description: messages.meta.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: messages.meta.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: messages.meta.title,
    description: messages.meta.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2f3436",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // JSON-LD Organization (R52): name, logo, URL and social profiles.
  const jsonLd = organizationJsonLd(site.url);

  return (
    <html lang="es" className={`${sora.variable} h-full antialiased`}>
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
    </html>
  );
}
