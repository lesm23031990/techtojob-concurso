import type { CSSProperties } from "react";
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
 * Layout: `mist` surface (keeps the light rhythm — design-system §7 bans two
 * dark sections in a row) with two `paper` hairline cells. A single rail node
 * (step 3); the section keeps `id="talento"` and the companies cell keeps
 * `id="empresas"` so the nav and footer anchors still resolve (R45) with zero
 * changes to `navItemsFor`.
 *
 * Motion (D75/D76): the cells use the SAME bento language as Testimonios/Noticias
 * (D61) — `.bento-reveal` on the wrapper plus `.bento-lit` on the card, with the
 * `--i` stagger. On top of that, a hard-edged brand sheen crosses each card and
 * a soft brand glow appears on hover (`.sheen-sweep`, `--shadow-glow`). All
 * CSS-only, no islands; the global reduced-motion guard stills everything.
 *
 * CTAs: the actions ("crear perfil", "buscar talento") happen inside the Discord
 * and there is no backend, so these two are INERT `<button>`s that navigate
 * nowhere (D76, author's request): no dead link, no 404. The developer CTA keeps
 * the `solid` look (D46); the company CTA is the `outline` hairline variant so
 * the two do not read as twin primaries.
 */
export default async function Audiences() {
  const messages = await getMessages();
  const { h2, intro } = messages.audiences;

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
    <Section id="talento" headingId="audiences-heading" tone="mist">
      <h2
        id="audiences-heading"
        className="reveal-left text-h2 font-bold text-balance lg:text-h2-lg"
        style={{ "--i": 0 } as CSSProperties}
      >
        {h2}
      </h2>
      <p
        className="reveal-left mt-3 max-w-[65ch] text-body text-slate lg:text-lead"
        style={{ "--i": 1 } as CSSProperties}
      >
        {intro}
      </p>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-10">
        {audiences.map((audience, index) => (
          <div
            key={audience.headingId}
            className="reveal-left"
            style={{ "--i": index + 2 } as CSSProperties}
          >
            <article
              id={audience.id}
              aria-labelledby={audience.headingId}
              className="bento-lit group relative flex h-full flex-col border border-line bg-paper p-6 pt-12 transition-[transform,border-color,box-shadow] duration-300 ease-in-out hover:scale-[1.02] hover:border-brand hover:shadow-glow lg:p-8 lg:pt-14"
            >
              <span aria-hidden="true" className="sheen-sweep" />
              {/* Numbered badge echoing the rail node (D67); its mist ring cuts
                  the card's top border. Decorative: the order is visual only. */}
              <span
                aria-hidden="true"
                className={`absolute -top-5 left-6 grid h-10 w-10 place-items-center rounded-full border-[3px] border-mist text-body font-bold text-ink lg:left-8 ${
                  audience.badgeTone === "ember" ? "bg-ember" : "bg-brand"
                }`}
              >
                {audience.badge}
              </span>

              <div className="relative flex items-start justify-between gap-6">
                <div>
                  <p className="flex items-center gap-2 text-label font-semibold uppercase text-slate">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-ember"
                    />
                    {audience.eyebrow}
                  </p>
                  <h3
                    id={audience.headingId}
                    className="mt-2 text-h3 font-bold text-balance text-ink lg:text-h3-lg"
                  >
                    {audience.title}
                  </h3>
                </div>
                <audience.Icon className="h-9 w-9 shrink-0 text-brand transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none" />
              </div>

              <p className="relative mt-4 max-w-[65ch] text-body text-slate">
                {audience.copy}
              </p>

              {/* Scannable 3-item list (D76): derived from the approved copy,
                  it speeds up reading and balances the two cells' height. */}
              <ul className="relative mt-5 flex flex-wrap gap-2">
                {audience.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-full border border-line px-3 py-1 text-small text-slate"
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

              <div className="relative border-t border-line pt-6">
                <AudienceCta
                  variant={audience.variant}
                  label={audience.cta}
                  className="w-full sm:w-auto"
                />
              </div>
            </article>
          </div>
        ))}
      </div>
    </Section>
  );
}
