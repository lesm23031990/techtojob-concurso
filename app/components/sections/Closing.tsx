import Image from "next/image";
import { getMessages } from "next-intl/server";
import DiscordCta from "@/components/DiscordCta";
import Ticker from "@/components/Ticker";

/**
 * "Cierre" (section 10, #unete) — mirror of the hero (design-system §7):
 * dark surface, the SAME two-line editorial split (D35: muted line, then
 * white line), the same dominant green CTA. Last impression = first action
 * (R20). Light-symbol watermark at 6% (D43/D90: the gradient symbol's dark
 * end vanished on `ink`), decorative.
 *
 * It is the narrative GOAL of the page, but it no longer draws the timeline
 * rail (author's request, D59). Without a rail the content sits centered.
 *
 * D121/D122: the explorations that lived here (globe + network, then grid +
 * constellation) were removed at Lorena's request. The section now:
 *  1. is ONE SCREEN tall (`min-h-svh`, content centered) — the hero's pattern;
 *  2. reuses the HERO'S TURNING FACETED LIGHTS verbatim (`.hero-facet*`) as its
 *     background;
 *  3. opens with "la puerta": two `ink` leaves that part with the scroll and let
 *     the light out towards the CTA (the approved copy already says "La puerta
 *     es el Discord");
 *  4. closes with the official symbol inside a rotating ring of light;
 *  5. ends with the SHARED `Ticker` (D122) — the same band that closes the hero,
 *     so the page opens and closes with it.
 * Centered H2 + copy + CTA keep their bidirectional `.reveal` (D62/D63/D77).
 * `overflow-clip` (never `hidden`, D63) keeps the scroll-driven reveals alive.
 */
export default async function Closing() {
  const messages = await getMessages();
  const { closing } = messages;
  return (
    <section
      id="unete"
      aria-labelledby="unete-heading"
      data-surface="dark"
      className="relative isolate flex min-h-svh flex-col overflow-clip bg-ink text-paper"
    >
      {/* D121: the hero's turning lights, reused verbatim (same three classes,
          same 64s/88s rotation), spanning the WHOLE section as its background.
          Decorative: `aria-hidden` + `pointer-events-none` and `-z-10` inside
          the section's `isolate`, so copy and CTA stay on top without changes
          (R34/R42). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-clip"
      >
        <div className="hero-facet-mask absolute -inset-[15%]">
          <div className="hero-facet absolute inset-0" />
          <div className="hero-facet-alt absolute inset-0" />
        </div>
      </div>
      <Image
        src="/brand/logo-symbol-light.svg"
        alt=""
        aria-hidden="true"
        width={320}
        height={320}
        loading="lazy"
        className="pointer-events-none absolute -top-24 -left-20 opacity-[0.06]"
      />
      <span aria-hidden="true" className="section-sheen" />

      {/* Content area: `flex-1` + centered, exactly like the hero, so the ticker
          below can sit on the section's last row. `py-20 lg:py-24` instead of
          the page-wide `lg:py-32` keeps the whole section inside one screen now
          that it carries the ticker band (Lorena: "ocupe 100vh"). */}
      <div className="flex flex-1 flex-col justify-center py-20 lg:py-24">
        <div className="page-container">
          <div className="flex flex-col items-center text-center">
            {/* Two-line split echoing the hero (D35): `cloud` 7.77:1 over ink,
                answer in `paper`. ONE <h2>, one text node per line (R41). */}
            <h2
              id="unete-heading"
              className="reveal max-w-4xl text-h2 font-bold text-balance lg:text-display"
            >
              <span className="block text-cloud">{closing.line1}</span>
              <span className="block">{closing.line2}</span>
            </h2>
            <p className="reveal mt-6 max-w-2xl text-lead text-cloud">
              {closing.copy}
            </p>
            <div className="reveal mt-10">
              <DiscordCta size="hero" label={closing.cta} />
            </div>
          </div>
        </div>

        {/* D121: the brand seal in its first —approved— version: the OFFICIAL
            SYMBOL alone, large, inside the circular ring of faceted light that
            turns (same `facet-turn` as the hero) plus a breathing border. The
            symbol is never rotated or distorted (R27/R39): what turns is the
            light. Enters/exits with the scroll like the rest of the beats.
            Decorative: `aria-hidden` + `pointer-events-none` (R34/R42). */}
        <div
          aria-hidden="true"
          className="reveal pointer-events-none mt-8 flex h-[150px] w-full items-center justify-center sm:h-[170px] lg:h-[200px]"
        >
          <span className="closing-seal h-36 w-36 lg:h-44 lg:w-44">
            <span className="closing-seal-ring" />
            <Image
              src="/brand/logo-symbol-light.svg"
              alt=""
              width={96}
              height={96}
              loading="lazy"
              className="relative h-14 w-14 lg:h-16 lg:w-16"
            />
          </span>
        </div>
      </div>

      {/* D122: the closing band is the SHARED `Ticker` — the same one that closes
          the hero, so the page opens and closes with the same strip (the
          "espejo del hero" made literal). Hidden below `sm` so the 100vh budget
          still holds on phones. */}
      <div className="hidden sm:block">
        <Ticker />
      </div>

      {/* D121: "la puerta" — the section's own gesture. The approved copy of this
          very section already says *"La puerta es el Discord"*, so it is made
          literal: two `ink` leaves with a `brand` edge cover the section and
          OPEN with the scroll (`view()`, `translate` only), letting the faceted
          light out towards the CTA. Default state = open: without
          `animation-timeline` or with `prefers-reduced-motion` there is no door,
          just the content. `pointer-events-none` so focus and clicks always
          pass through. */}
      <span aria-hidden="true" className="closing-door closing-door-left" />
      <span aria-hidden="true" className="closing-door closing-door-right" />
    </section>
  );
}
