import Link from "next/link";
import { messages, navItems } from "@/content";
import DiscordCta from "@/components/DiscordCta";

/** Quick-nav links below the support line: real anchor links to the sections
 *  they name (R43/R45), styled as plain uppercase text — never pills or
 *  buttons — so the Discord CTA stays the only button on the first screen
 *  (R11). Labels reuse the existing nav strings (R36). */
const QUICK_LINK_HREFS = ["#como-funciona", "#torneos", "#talento", "#empresas"];
const quickLinks = navItems.filter((item) => QUICK_LINK_HREFS.includes(item.href));

/**
 * Hero (section 1, anchor #inicio) — "Editorial Void" composition (V5):
 * a flat `ink` canvas (no gradients, no glow, no tiles, no graph — pure
 * server component, zero client islands) laid out as a 12-column asymmetric
 * editorial grid on lg: an overline folio and a real-data meta column share
 * the top row, the two-line H1 is the gravity center, then sub, the ONE
 * Discord button (R11), a support line and a plain-text quick-nav. On mobile
 * every block flows in DOM order, always left-aligned.
 *
 * Conversion contract (R11): the Discord button is the ONLY button in the
 * hero. The quick-nav links are real anchors to sections (R43) using the
 * existing descriptive nav labels (R44) — navigation, never a second CTA.
 *
 * Motion contract:
 * - Entrance cascade: overline → H1 → sub → CTA → support → meta → nav.
 * - The H1 animates TRANSFORM ONLY, never opacity, so the LCP element is
 *   painted at full opacity on the first frame (fast LCP, zero CLS).
 * - The global `prefers-reduced-motion` guard collapses every entrance to
 *   its final state (R34).
 * - The H1 is real text, never an image (R39/R40).
 */
export default function Hero() {
  const { hero } = messages;
  // es.json guarantees `highlight` occurs exactly once in `line2`. Defensive
  // fallback: if the copy ever changes, line2 renders whole without the
  // brand accent instead of splitting wrong.
  const highlightIndex = hero.line2.lastIndexOf(hero.highlight);
  const hasHighlight = highlightIndex >= 0;
  const l2Before = hasHighlight ? hero.line2.slice(0, highlightIndex) : hero.line2;
  const l2After = hasHighlight ? hero.line2.slice(highlightIndex + hero.highlight.length) : "";
  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      /* -mt-20 pulls the hero up UNDER the 5rem sticky header so its flat ink
         surface sits behind the header's gradient: the `header-veil` fade
         resolves into ink and the bar dissolves into the hero with no seam. */
      className="relative isolate -mt-20 bg-ink text-paper"
    >
      <div className="page-container relative flex min-h-svh flex-col justify-start pt-40 pb-24 lg:grid lg:grid-cols-12 lg:pt-48 lg:pb-32">
        {/* Overline folio: top-left of the grid on lg, first block on mobile. */}
        <p className="animate-rise-in text-label font-semibold uppercase tracking-[0.15em] text-cloud [animation-delay:40ms] lg:col-start-2 lg:row-start-1">
          {hero.overline}
        </p>

        {/* transform-only entrance: no opacity change → LCP painted on frame 1.
            Two-line editorial split: line1 in `cloud` (7.77:1), line2 in
            `paper` with the highlight phrase in `brand` (6.17:1). ONE <h1> (R40). */}
        <h1
          id="hero-heading"
          className="animate-lift-in mt-6 text-display font-bold tracking-tight text-balance [animation-delay:100ms] lg:col-start-2 lg:col-span-7 lg:mt-0 lg:text-display-lg"
        >
          <span className="block text-cloud">{hero.line1}</span>
          <span className="block">
            {l2Before}
            {hasHighlight ? <span className="text-brand">{hero.highlight}</span> : null}
            {l2After}
          </span>
        </h1>

        <p className="animate-rise-in mt-8 max-w-[46ch] text-lead text-cloud [animation-delay:220ms] lg:col-start-2 lg:col-span-5 lg:mt-10 lg:text-lead-lg">
          {hero.sub}
        </p>

        <div className="animate-rise-in mt-10 [animation-delay:340ms] lg:col-start-2 lg:mt-12">
          <DiscordCta size="line" label={hero.cta} />
        </div>

        <p className="animate-rise-in mt-6 text-small text-cloud [animation-delay:460ms] lg:col-start-2">
          {hero.support}
        </p>

        {/* Meta column: 100% real data (no invented figures). Marginalia at
            the top-right on lg; flows after the support line on mobile. */}
        <aside className="animate-rise-in mt-16 [animation-delay:580ms] lg:col-start-10 lg:col-span-3 lg:row-start-1 lg:mt-0 lg:self-start">
          <dl className="space-y-6">
            {hero.meta.map((item) => (
              <div key={item.label}>
                <dt className="text-label font-semibold uppercase tracking-[0.15em] text-cloud">
                  {item.label}
                </dt>
                <dd className="mt-1 text-small text-paper">{item.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        {/* Quick-nav: plain uppercase text links, ≥44px targets (J6), `cloud`
            on ink 7.77:1, hover `brand` 6.17:1. The ONE conversion action
            stays the button above (R11). */}
        <nav
          aria-label={messages.a11y.quickNavLabel}
          className="animate-rise-in mt-16 [animation-delay:700ms] lg:col-start-2 lg:col-span-7 lg:mt-12"
        >
          <ul className="flex flex-wrap items-center gap-x-6">
            {quickLinks.map((item, index) => (
              <li key={item.href} className="flex items-center gap-x-6">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-cloud/40">
                    ·
                  </span>
                ) : null}
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-label font-semibold uppercase tracking-[0.15em] whitespace-nowrap text-cloud underline-offset-4 transition-colors duration-150 hover:text-brand hover:underline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Ticker (D38): full-bleed hairline marquee built only from tokens
          already published in `hero.meta` (stacks, edition, community
          language). It duplicates that data, so the whole strip is
          `aria-hidden` and non-interactive: it is rhythm, never a second CTA
          (R11) and never duplicated indexable content. The track is rendered
          twice and shifted -50% for a seamless loop; the reduced-motion guard
          parks it at origin. */}
      <div aria-hidden="true" className="overflow-hidden border-t border-white/12 py-5">
        <div className="animate-marquee flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-8 pr-8">
              {hero.ticker.map((token) => (
                <span key={token} className="flex items-center gap-8">
                  <span className="text-label font-semibold uppercase tracking-[0.15em] text-cloud">
                    {token}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-brand" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
