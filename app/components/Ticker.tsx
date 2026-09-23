import { getMessages } from "next-intl/server";

/* D96: every half must overflow the viewport, so the -50% loop never shows a
   gap (same fix as the testimonials slider). */
const TICKER_REPEAT = 3;

/**
 * The site's ticker band (D38/D96), extracted in D122 so the hero and the
 * closing share it VERBATIM: one component, one set of classes, one duration —
 * they cannot diverge (same reasoning used for the faceted lights).
 *
 * It is built only from tokens already published in `hero.meta` (stacks,
 * edition, community language). Because it duplicates that data, the whole
 * strip is `aria-hidden` and non-interactive: it is rhythm, never a second CTA
 * (R11) and never duplicated indexable content. The track is rendered twice and
 * shifted -50% for a seamless loop; the reduced-motion guard parks it at origin.
 *
 * D96: one half holds the tokens repeated `TICKER_REPEAT` times (≈3.9k-4.5k px),
 * always wider than the viewport, so the -50% cycle never exposes an empty gap.
 */
export default async function Ticker() {
  const messages = await getMessages();
  const tokens = Array.from(
    { length: TICKER_REPEAT },
    () => messages.hero.ticker,
  ).flat();
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-t border-white/12 py-5"
    >
      {/* Decorative (aria-hidden) and non-interactive; `hover` pauses it for
          WCAG 2.2.2 friendliness and the reduced-motion guard parks it. */}
      <div className="animate-marquee flex w-max hover:[animation-play-state:paused] [--marquee-duration:102s]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-8 pr-8">
            {tokens.map((token, index) => (
              <span
                key={`${copy}-${index}-${token}`}
                className="flex items-center gap-8"
              >
                <span className="text-label font-semibold uppercase tracking-[0.15em] text-cloud">
                  {token}
                </span>
                <span className="h-1 w-1 rounded-full bg-ember" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
