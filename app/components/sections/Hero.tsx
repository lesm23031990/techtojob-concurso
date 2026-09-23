import Image from "next/image";
import { Fragment } from "react";
import { getMessages } from "next-intl/server";
import DiscordCta from "@/components/DiscordCta";

interface HeroWord {
  text: string;
  accent: boolean;
}

/** Splits a line into words, keeping `accentPhrase` as a single token so its
 *  brand highlight and underline stay continuous across the reveal. */
function splitWords(text: string, accentPhrase?: string): HeroWord[] {
  const toWord = (t: string): HeroWord => ({ text: t, accent: false });
  if (accentPhrase) {
    const at = text.indexOf(accentPhrase);
    if (at >= 0) {
      const before = text.slice(0, at).trim();
      const after = text.slice(at + accentPhrase.length).trim();
      return [
        ...before.split(/\s+/).filter(Boolean).map(toWord),
        { text: accentPhrase, accent: true },
        ...after.split(/\s+/).filter(Boolean).map(toWord),
      ];
    }
  }
  return text.split(/\s+/).filter(Boolean).map(toWord);
}

function HeroWord({ word, order }: { word: HeroWord; order: number }) {
  return (
    <span className="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em] align-bottom">
      <span
        className={`word-rise relative inline-block ${word.accent ? "text-brand" : ""}`}
        style={{ animationDelay: `${120 + order * 45}ms` }}
      >
        {word.text}
        {word.accent ? (
          <span
            aria-hidden="true"
            className="hero-highlight-line absolute inset-x-0 -bottom-[0.08em] h-px origin-left bg-brand/60"
          />
        ) : null}
      </span>
    </span>
  );
}

/**
 * Hero (section 1, anchor #inicio) — "Plano Cinético" composition (V7/D41):
 * a flat `ink` canvas whose only decoration is the vocabulary D37.1 authorizes
 * — hairline reticle plane, hard-edged light beam, faceted conic light planes
 * (#2), a 6% light-symbol watermark (D43/D90, same shared treatment as
 * Closing/Audiences) and bracket marginalia (D) — laid out as a 12-column
 * asymmetric editorial grid on lg: the two-line H1 and a real-data meta column
 * share the first row, then sub, the ONE Discord button (R11) and a support
 * line.
 *
 * Layout (D52): the section is a viewport-height flex column whose main block
 * (`flex-1`) is centered vertically (`justify-center` / `lg:content-center`),
 * so it matches the page weight with no empty top row; the hero then closes
 * with the ticker band as its last child. The section links live in the
 * header, so the hero carries no quick-nav. On mobile every block flows in
 * DOM order, always left-aligned. Pure server component, zero client islands.
 *
 * Structure contract: the word-revealed two-line headline is ONE `<h1>` (R40)
 * and the Discord button is the ONLY button in the hero (R11).
 *
 * Motion contract:
 * - Entrance cascade: H1 → sub → CTA → support → meta.
 * - The H1 reveals word by word via masked `word-rise`, TRANSFORM ONLY, never
 *   opacity, so the LCP element is painted at full opacity on the first frame
 *   (fast LCP, zero CLS). It does not reuse `animate-lift-in` (no duplicated
 *   transform).
 * - The reticle plane pans one cell with page scroll and the highlight
 *   underline draws itself with `animation-timeline: view()`; both default to
 *   their final state when scroll-driven animations are unsupported.
 * - The global `prefers-reduced-motion` guard collapses every entrance and
 *   loop to its final state (R34).
 * - The H1 is real text, never an image (R39/R40).
 */
export default async function Hero() {
  const messages = await getMessages();
  const { hero } = messages;
  const line1Words = splitWords(hero.line1);
  const line2Words = splitWords(hero.line2, hero.highlight);
  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      data-surface="dark"
      /* -mt-20 pulls the hero up UNDER the 5rem sticky header so its flat ink
         surface sits behind the header's dark veil: the gradient resolves into
         ink and the bar dissolves into the hero with no seam (D47). */
      className="relative isolate -mt-20 flex min-h-svh flex-col bg-ink text-paper"
    >
      {/* Decorative plane (D40/V7): reticle field + hard-edged light beam,
          faceted conic light planes (#2) and the 6% light-symbol watermark
          (D43/D90). aria-hidden + pointer-events-none; sits behind content
          (-z-10). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-field absolute inset-x-0 -inset-y-16">
          <div className="hero-field-drift absolute -inset-16" />
        </div>
        <div className="hero-beam absolute -top-1/4 -left-24 h-[150%] w-px bg-gradient-to-b from-transparent via-brand/25 to-transparent" />
        <div
          className="hero-beam absolute -top-1/4 -left-16 h-[150%] w-24 bg-gradient-to-b from-transparent via-brand/[0.06] to-transparent"
          style={{ animationDelay: "-9s" }}
        />

        {/* Faceted light planes (#2, D41): hard-edged conic wedges, no blur. */}
        <div className="hero-facet-mask absolute -inset-[15%]">
          <div className="hero-facet absolute inset-0" />
          <div className="hero-facet-alt absolute inset-0" />
        </div>

        {/* Shared 6% light-symbol watermark (D43/D90), same treatment as
            Closing/Audiences. D90: the gradient symbol's dark end disappeared
            on `ink`, so the light symbol (solid brand green, the header's dark
            polarity) is used at 6% — identity without competing with the
            single CTA (R11). */}
        <Image
          src="/brand/logo-symbol-light.svg"
          alt=""
          aria-hidden="true"
          width={520}
          height={520}
          loading="lazy"
          className="pointer-events-none absolute -bottom-28 -right-20 opacity-[0.06]"
        />
      </div>

      <div className="page-container hero-soft relative flex flex-1 flex-col justify-center pt-36 pb-16 lg:grid lg:grid-cols-12 lg:content-center lg:pt-40 lg:pb-20">
        {/* Word-by-word masked reveal (D40): transform-only, no opacity change
            → LCP painted on frame 1. Two-line editorial split: line1 in `cloud`
            (7.77:1), line2 in `paper` with the highlight phrase in `brand`
            (6.17:1). ONE h1 element with the full copy (R40). First block of
            the grid on lg, so it shares row 1 with the meta column. */}
        <h1
          id="hero-heading"
          className="mt-0 text-display font-bold tracking-tight text-balance lg:col-start-2 lg:col-span-8 lg:mt-0 lg:text-display-lg"
        >
          <span className="block text-cloud">
            {line1Words.map((word, index) => (
              <Fragment key={`${word.text}-${index}`}>
                <HeroWord word={word} order={index} />
                {" "}
              </Fragment>
            ))}
          </span>
          <span className="block">
            {line2Words.map((word, index) => (
              <Fragment key={`${word.text}-${index}`}>
                <HeroWord word={word} order={line1Words.length + index} />
                {" "}
              </Fragment>
            ))}
          </span>
        </h1>

        <p className="animate-rise-in mt-8 max-w-[46ch] text-lead text-cloud [animation-delay:220ms] lg:col-start-2 lg:col-span-5 lg:mt-10 lg:text-lead-lg">
          {hero.sub}
        </p>

        <div className="animate-rise-in mt-10 [animation-delay:340ms] lg:col-start-2 lg:col-span-5 lg:mt-12">
          <DiscordCta size="hero" label={hero.cta} />
        </div>

        <p className="animate-rise-in mt-6 text-small text-cloud [animation-delay:460ms] lg:col-start-2 lg:col-span-5">
          {hero.support}
        </p>

        {/* Meta column: 100% real data (no invented figures). Marginalia at
            the top-right on lg; flows after the support line on mobile. The
            left rail + node per datum is the "bracket" echo of a tournament
            bracket (D40) — decorativo. */}
        <aside className="animate-rise-in mt-16 [animation-delay:580ms] lg:col-start-10 lg:col-span-3 lg:row-start-1 lg:mt-0 lg:self-start">
          <dl className="space-y-6 border-l border-white/12 pl-6">
            {hero.meta.map((item) => (
              <div key={item.label} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-2 -left-6 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ember"
                />
                <dt className="text-label font-semibold uppercase tracking-[0.15em] text-cloud">
                  {item.label}
                </dt>
                <dd className="mt-1 text-small text-paper">{item.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
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
                  <span className="h-1 w-1 rounded-full bg-ember" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
