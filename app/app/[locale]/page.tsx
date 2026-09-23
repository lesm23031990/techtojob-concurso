import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Audiences from "@/components/sections/Audiences";
import Tournaments from "@/components/sections/Tournaments";
import Networking from "@/components/sections/Networking";
import Testimonials from "@/components/sections/Testimonials";
import News from "@/components/sections/News";
import Newsletter from "@/components/sections/Newsletter";
import Closing from "@/components/sections/Closing";

/** Same two locales as the layout: `/es` and `/en` are prerendered and the
 *  middleware serves `/es` at `/` (as-needed, i18n I1/I2). */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Single landing page, read as one vertical timeline (D32): the hero is the
 * door and the closing section is the goal, with the body ordered so the story
 * narrates itself — how it works → proof (a live tournament) → the two
 * audiences (one split section) → community → validation → news → stay close →
 * join.
 *
 * R22: "El orden es orientativo menos el hero y el footer", so only the hero
 * (first) and the footer (in the layout) are fixed. The reorder is declared in
 * the README (R10). Section bodies keep their own design; what changed is the
 * order and the shared timeline rail.
 */
export default async function Home({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <main id="contenido" aria-label={messages.a11y.mainLabel}>
      <Hero />
      <HowItWorks />
      <Tournaments />
      <Audiences />
      <Networking />
      <Testimonials />
      <News />
      <Newsletter />
      <Closing />
    </main>
  );
}
