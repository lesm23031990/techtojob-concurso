import type { CSSProperties } from "react";
import Section from "@/components/Section";
import NewsletterForm from "@/components/NewsletterForm";
import { getMessages } from "next-intl/server";

/**
 * "Newsletter" (step 7, #newsletter) — D100/D101.
 *
 * The former solid `brand` band is gone: the section is `ink` and everything
 * lives inside ONE Bento panel (`coal` + 1px `hairline-dark`), the same cell
 * language as Audiences (D85). The panel follows the landing's editorial
 * grid: 7 columns of text / 5 of form, separated by a vertical hairline at
 * `lg`. A single animated hairline (`.line-idle`, D86) runs through the foot
 * of the form; the panel betters its own entry (`.panel-in`) plus the border
 * lighting (`.bento-lit-ink`), and the breathing ring / top-edge glint were
 * removed as duplicate ornament (D104). Beats enter AND leave with
 * `.reveal-left` (from the timeline rail) staggered by `--i`, and the form
 * rises with `.reveal`. Palette untouched: `brand` stays as button fill, rail
 * fill, node and focus ring; no new colors, no new copy (R24/R25, R26, R36).
 */
export default async function Newsletter() {
  const messages = await getMessages();
  return (
    <Section id="newsletter" headingId="newsletter-heading" tone="ink">
      <div className="panel-in bento-lit-ink relative grid grid-cols-1 gap-10 border border-hairline-dark bg-coal p-6 lg:grid-cols-12 lg:gap-0 lg:p-10">
        <div className="text-drift lg:col-span-7 lg:pr-12">
          <p
            className="reveal-left flex items-center gap-2.5 text-label font-semibold uppercase text-brand"
            style={{ "--i": 0 } as CSSProperties}
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
            />
            {messages.nav.links.newsletter}
          </p>
          <h2
            id="newsletter-heading"
            className="reveal-left mt-4 text-h2 font-bold text-balance lg:text-h2-lg"
            style={{ "--i": 1 } as CSSProperties}
          >
            {messages.newsletter.h2}
          </h2>
          <p
            className="reveal-left mt-6 max-w-[65ch] text-body text-cloud"
            style={{ "--i": 2 } as CSSProperties}
          >
            {messages.newsletter.copy}
          </p>

          {/* D107: lo que llega, escaneable (mismas palabras del copy aprobado). */}
          <ul className="mt-6 flex flex-col">
            {messages.newsletter.items.map((item) => (
              <li
                key={item}
                className="reveal-left flex items-baseline gap-3 border-t border-hairline-dark py-3 text-body text-paper"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 translate-y-[0.35em] rounded-full bg-brand"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* D107: el sello ("sin relleno y sin spam") cierra como ancla de la promesa (patrón D70). */}
          <p className="reveal-left mt-6 max-w-[65ch] border-l-[3px] border-brand pl-3 text-lead font-semibold text-paper">
            {messages.newsletter.seal}
          </p>
        </div>

        <div className="lg:col-span-5 lg:border-l lg:border-hairline-dark lg:pl-12">
          <NewsletterForm />
        </div>
      </div>
    </Section>
  );
}
