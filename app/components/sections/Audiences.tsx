import type { CSSProperties } from "react";
import Image from "next/image";
import Section from "@/components/Section";
import AudienceCta from "@/components/AudienceCta";
import { IconCode, IconBuilding } from "@/components/icons";
import { getMessages } from "next-intl/server";

/**
 * "Audiencias" (#talento, timeline step 3) — the two independent paths of the
 * community (R13 talent / R14 companies) merged into ONE split section (D75).
 *
 * Why: read as two stacked sections, the visitor assumed the flow was linear
 * ("first offer yourself as talent, then publish as a company"). Side by side,
 * separated by a thin hairline, they read as two parallel doors chosen by
 * profile — which is what they are.
 *
 * Layout: `ink` surface since D85 (the dark counterpoint that separates the
 * clear runs; §7) with two raised `coal` hairline cells (§3.1 #14). A single
 * rail node (step 3); the section keeps `id="talento"` and the companies cell
 * keeps `id="empresas"` as an optional deep-link. Nav and footer both point at
 * `#talento` (D76) because it is ONE section, not two destinations.
 *
 * Decoration (D90): the same 6% light-symbol watermark as the hero and the
 * closing, rendered through `Section`'s `decoration` slot as a direct child of
 * `<section>` (outside `page-container`) so its `position: absolute` is
 * measured against the section, not an ancestor. `isolate` (negative z-index
 * stays local) plus `overflow-clip` (bleed doesn't cause horizontal scroll)
 * keep the cells and copy painted above it.
 *
 * Motion (D61/D77): the cells use the bento language — `.reveal-left` on the
 * wrapper (symmetric in/out) plus `.bento-lit-ink` on the card (border
 * lighting from `white/12` to `brand`, staggered by the inherited `--i`). On
 * top of that, a hard-edged brand sheen crosses each card and a soft brand glow
 * appears on hover (`.sheen-sweep`, `--shadow-glow`). CSS-only, no islands; the
 * reduced-motion guard stills it.
 *
 * CTAs (D76): the actions ("crear perfil", "publicar vacante") happen inside the
 * Discord and there is no backend, so each CTA is an in-page anchor to `#unete`
 * (the real Discord CTA) — it does not leave the page and never fakes a dead
 * destination (R43). A `ctaNote` under them states where the action happens. The
 * developer CTA keeps the `solid` look (D46); the company CTA is the `outline`
 * variant in its dark polarity (D85, §6.2) so the two do not read as twin
 * primaries.
 */
export default async function Audiences() {
  const messages = await getMessages();
  const { h2, intro, ctaNote } = messages.audiences;

  const audiences = [
    {
      id: undefined,
      headingId: "talento-heading",
      eyebrow: messages.talent.eyebrow,
      title: messages.talent.h2,
      copy: messages.talent.copy,
      highlights: messages.talent.highlights,
      cta: messages.talent.cta,
      variant: "solid" as const,
      badge: "1",
      badgeTone: "brand" as const,
      Icon: IconCode,
    },
    {
      id: "empresas",
      headingId: "empresas-heading",
      eyebrow: messages.companies.eyebrow,
      title: messages.companies.h2,
      copy: messages.companies.copy,
      highlights: messages.companies.highlights,
      cta: messages.companies.cta,
      variant: "outline" as const,
      badge: "2",
      badgeTone: "ember" as const,
      Icon: IconBuilding,
    },
  ];

  return (
    <Section
      id="talento"
      headingId="audiences-heading"
      tone="ink"
      textDrift
      className="isolate overflow-clip"
      /* Light-symbol watermark at 6% (D90): on `ink` the gradient symbol's
         dark end vanished; the light symbol matches the header's dark
         polarity. `-z-10` + `isolate` keep it behind the cells without
         escaping the section; `overflow-clip` contains the bleed. */
      decoration={
        <Image
          src="/brand/logo-symbol-light.svg"
          alt=""
          aria-hidden="true"
          width={520}
          height={520}
          loading="lazy"
          className="pointer-events-none absolute -right-16 -bottom-24 -z-10 opacity-[0.06]"
        />
      }
    >
      <h2
        id="audiences-heading"
        className="reveal-left text-h2 font-bold text-balance lg:text-h2-lg"
      >
        {h2}
      </h2>
      <p className="reveal-left mt-3 max-w-[65ch] text-body text-cloud lg:text-lead">
        {intro}
      </p>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-10">
        {audiences.map((audience, index) => (
          <div
            key={audience.headingId}
            /* `--i` feeds the `.bento-lit-ink` border lighting of the card. */
            className="reveal-left"
            style={{ "--i": index } as CSSProperties}
          >
            <article
              id={audience.id}
              aria-labelledby={audience.headingId}
              className="bento-lit-ink card-idle group relative flex h-full flex-col border border-hairline-dark bg-coal p-6 pt-12 transition-[transform,border-color,box-shadow] duration-300 ease-in-out hover:scale-[1.02] hover:border-brand hover:shadow-glow lg:p-8 lg:pt-14"
            >
              <span aria-hidden="true" className="sheen-sweep" />
              {/* Numbered badge echoing the rail node (D67); its ink ring cuts
                  the card's top border. Decorative: the order is visual only. */}
              <span
                aria-hidden="true"
                className={`absolute -top-5 left-6 grid h-10 w-10 place-items-center rounded-full border-[3px] border-ink text-body font-bold text-ink lg:left-8 ${
                  audience.badgeTone === "ember" ? "bg-ember" : "bg-brand"
                }`}
              >
                {audience.badge}
              </span>

              <div className="relative flex items-start justify-between gap-6">
                <div>
                  <p className="flex items-center gap-2 text-label font-semibold uppercase text-cloud">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-ember"
                    />
                    {audience.eyebrow}
                  </p>
                  <h3
                    id={audience.headingId}
                    className="mt-2 text-h3 font-bold text-balance text-paper lg:text-h3-lg"
                  >
                    {audience.title}
                  </h3>
                </div>
                {/* Framed tile gives the icon real visual weight (D79/D85): on
                    `coal` the brand glyph needs the raised frame to read. */}
                <span className="grid h-12 w-12 shrink-0 place-items-center border border-hairline-dark bg-white/5 text-brand">
                  <audience.Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none" />
                </span>
              </div>

              <p className="relative mt-4 max-w-[65ch] text-body text-cloud">
                {audience.copy}
              </p>

              {/* Scannable 3-item list (D76): derived from the approved copy,
                  it speeds up reading and balances the two cells' height. */}
              <ul className="relative mt-5 flex flex-wrap gap-2">
                {audience.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-full border border-hairline-dark px-3 py-1 text-small text-cloud"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>

              {/* Flex spacer: guarantees a minimum gap before the divider even
                  when the cell is full (with `mt-auto` alone it collapsed to 0
                  in the developer cell, D76). It absorbs the leftover height so
                  both CTAs stay bottom-aligned. */}
              <div aria-hidden="true" className="mt-6 flex-1" />

              <div className="line-idle relative border-t border-hairline-dark pt-6">
                <AudienceCta
                  variant={audience.variant}
                  surface="ink"
                  label={audience.cta}
                  className="w-full sm:w-auto"
                />
                {/* Honest context: the button does not promise an action it
                    cannot perform; it says where it happens (D79). */}
                <p className="mt-3 text-small text-cloud">{ctaNote}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </Section>
  );
}
