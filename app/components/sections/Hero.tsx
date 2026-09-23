import Image from "next/image";
import Link from "next/link";
import { messages, navItems } from "@/content";
import DiscordCta from "@/components/DiscordCta";
import HeroGraph from "@/components/HeroGraph";
import HeroTiles from "@/components/HeroTiles";

/** Quick-nav pills under the CTA (D35, echo of the reference's chip row):
 *  real anchor links to the sections they name (R43/R45), styled as outline
 *  links — never filled buttons — so the Discord CTA stays the only button
 *  on the first screen (R11). Labels reuse the existing nav strings (R36). */
const QUICK_LINK_HREFS = ["#como-funciona", "#torneos", "#talento", "#empresas"];
const quickLinks = navItems.filter((item) => QUICK_LINK_HREFS.includes(item.href));

/**
 * Hero (section 1, anchor #inicio) — dark `ink` surface, "Recruit en tinta"
 * composition (D35): the headline split into two editorial lines (muted
 * question → white answer with the closing word in brand), the ONE Discord
 * button (R11), a row of quick-nav anchor pills and a quiet stack wall below.
 * The glow is halved and the floating wall (D34) dimmed to 60%: a flat dark
 * stage where typography carries the first screen. No photographs anywhere:
 * every visual is palette fill + official symbol + real text (R53–R57).
 *
 * Conversion contract (R11): the Discord button is the ONLY button in the
 * hero. The quick-nav pills are real anchor links to sections (R43) using the
 * existing descriptive nav labels (R44) — navigation, never a second CTA.
 *
 * Ambient depth, back to front: brand glow layers → HeroTiles wall (z-0) →
 * mouse-reactive graph field (HeroGraph, the only client island) → copy (z-10).
 *
 * Motion contract:
 * - Entrance cascade: header → symbol → H1 → sub → CTA → support → pills → wall.
 * - The H1 animates TRANSFORM ONLY, never opacity, so the LCP element is
 *   painted at full opacity on the first frame (fast LCP, zero CLS).
 * - Tiles drift slowly (transform only, ≥14s loops); the global
 *   `prefers-reduced-motion` guard collapses every entrance and freezes the
 *   wall; HeroGraph paints a single static frame.
 * - The H1 is real text, never an image (R39/R40).
 *
 * The page timeline (D32) starts at step 1 ("Cómo funciona"): the hero is the
 * door of the story and carries no rail.
 */
export default function Hero() {
  const { hero } = messages;
  // es.json guarantees `highlight` is the closing word of `line2` (exactly
  // one occurrence). Defensive fallback: if the copy ever changes, line2
  // renders whole without the brand accent instead of splitting wrong.
  const highlightIndex = hero.line2.lastIndexOf(hero.highlight);
  const hasHighlight = highlightIndex >= 0;
  const l2Before = hasHighlight ? hero.line2.slice(0, highlightIndex) : hero.line2;
  const l2After = hasHighlight ? hero.line2.slice(highlightIndex + hero.highlight.length) : "";
  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      /* -mt-20 pulls the hero up UNDER the 5rem sticky header so its dark
         surface sits behind the header's gradient: the `header-veil` fade
         resolves into ink instead of the white body, and the bar dissolves
         into the hero with no seam. pt-20 on the content box then centres the
         block on the centre line of the visible area, not of the raw section. */
      className="relative isolate -mt-20 overflow-hidden bg-hero-live text-paper"
    >
      {/* Glow (D33): light that comes IN from the edges — a rim glow plus two
          corner lights bleeding inward and a wash under the header. All layers
          are decorative (aria-hidden, pointer-events-none) and absolutely
          positioned → CLS 0; the H1 keeps ≥8:1 and the sub ≥4.5:1 over the
          glowing area. Painted BEFORE the tiles and the canvas. */}
      <div
        aria-hidden="true"
        className="glow-brand-edge pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="glow-brand-top pointer-events-none absolute inset-x-0 top-0 h-32"
      />
      <div
        aria-hidden="true"
        className="glow-brand-strong animate-glow-pulse pointer-events-none absolute -top-40 -left-40 h-[44rem] w-[44rem] rounded-full"
      />
      <div
        aria-hidden="true"
        className="glow-brand-soft animate-drift-slow pointer-events-none absolute -right-40 -bottom-52 h-[44rem] w-[44rem] rounded-full [animation-delay:-9s]"
      />

      {/* The floating wall (D34): tilted tiles in the margins, behind the
          copy layer and the graph. Fully decorative (see HeroTiles). */}
      <HeroTiles />

      {/* Must stay a DIRECT child of <section>: HeroGraph listens for the
          pointer on its parent, and the canvas itself is pointer-events-none
          so the CTA and links above it remain fully clickable. */}
      <HeroGraph />

      {/* pt-20 offsets the header (it floats above the hero) so the whole
          block — symbol, H1, sub, CTA, support, pills and stack wall — is centred
          as ONE piece on the centre line of the visible area. */}
      <div className="page-container relative z-10 flex min-h-svh flex-col items-center justify-center pt-20 pb-0 text-center">
        {/* Official symbol as the small centred mark above the headline — the
            hero echo of the reference's wordmark. Decorative: the accessible
            name of the brand lives in the header logo, not here (R39). */}
        <Image
          src="/brand/logo-symbol-light.svg"
          alt=""
          aria-hidden="true"
          width={40}
          height={40}
          loading="eager"
          className="animate-rise-in mb-8 h-10 w-10 [animation-delay:40ms]"
        />
        {/* transform-only entrance: no opacity change → LCP painted on frame 1.
            D35 two-line editorial split (the reference's signature): the
            question sits in `cloud` (7.77:1), the answer in `paper` with the
            closing word in `brand` (6.17:1). ONE <h1>, one text node per
            line (R40). */}
        <h1
          id="hero-heading"
          className="animate-lift-in max-w-5xl text-display font-bold text-balance [animation-delay:100ms] lg:text-display-lg"
        >
          <span className="block text-cloud">{hero.line1}</span>
          <span className="block">
            {l2Before}
            {hasHighlight ? <span className="text-brand">{hero.highlight}</span> : null}
            {l2After}
          </span>
        </h1>
        <p className="animate-rise-in mt-8 max-w-2xl text-lead text-cloud [animation-delay:220ms] lg:text-lead-lg">
          {hero.sub}
        </p>
        <div className="animate-rise-in mt-12 [animation-delay:340ms]">
          <DiscordCta size="hero" label={hero.cta} />
        </div>
        <p className="animate-rise-in mt-6 text-small text-cloud [animation-delay:460ms]">
          {hero.support}
        </p>
        {/* Quick-nav pills (D35): anchor links, outline-styled, ≥44px targets
            (J6). They navigate to sections; the ONE conversion action stays
            the button above (R11). `cloud` on ink 7.77:1, hover `brand` 6.17:1. */}
        <nav
          aria-label={messages.a11y.quickNavLabel}
          className="animate-rise-in mt-12 flex flex-wrap items-center justify-center gap-2 [animation-delay:580ms]"
        >
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-full border border-white/10 px-4 text-small font-semibold text-cloud whitespace-nowrap transition-colors duration-150 hover:border-brand/40 hover:text-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Stack wall (D35): the honest echo of a "trusted by" logo row —
            technologies the community actually builds with, as quiet text.
            No invented companies, no invented member counts. */}
        <p className="animate-rise-in mt-14 max-w-3xl text-small tracking-wide text-cloud [animation-delay:700ms]">
          {hero.stackWall}
        </p>
      </div>
    </section>
  );
}
