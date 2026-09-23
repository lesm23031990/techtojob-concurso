import Image from "next/image";
import Section from "@/components/Section";
import { getMessages } from "next-intl/server";

/**
 * "Networking" (section 6, #networking, timeline step 4) — asymmetric
 * composition on `paper` (design-system §7, D81).
 *
 * Title + intro live in a `lg:sticky` left column; the three concepts sit on the
 * right, split by 1px hairlines — channels by area (pills that emulate Discord
 * channels), fast answers (with a decorative activity dot) and the hidden market
 * (a hierarchy anchor).
 *
 * Accent (D82): the `ember` orange enters as the 1.5px dot before every eyebrow
 * and as the activity dot — the same decorative-eyebrow pattern Audiences uses.
 * Fixed palette (R24/R25): on `paper` neither `brand` nor `ember` is ever text
 * (R26); they only appear as decorative fills. Hovers resolve through opacity
 * alone and never fake a click (no `cursor-pointer`).
 *
 * Motion (D82/D85): the sticky column carries `.reveal-enter` — an
 * ENTRANCE-ONLY reveal (no exit) so a pinned box can never fade mid-read; the
 * three right-hand blocks use `.reveal-left` (they slide out of the rail and
 * say goodbye upward, D85). The small isotipo below the title is the
 * official brand mark (design-system §0/§2): decorative, `aria-hidden`, fixed
 * `width`/`height` so it adds no layout shift (R55/R56).
 */
export default async function Networking() {
  const messages = await getMessages();
  const { h2, intro, channels, speed, market } = messages.networking;

  return (
    <Section id="networking" headingId="networking-heading" tone="paper">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
        {/* Left column: entrance-only reveal (sticky-safe, D82). */}
        <div className="reveal-enter lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
          <h2
            id="networking-heading"
            className="text-h2 font-bold text-balance lg:text-h2-lg"
          >
            {h2}
          </h2>
          {/* Official isotipo: reads as "connection between people" (design-system
              §0), the only compliant "image" this landing allows (§10). */}
          <Image
            src="/brand/logo-symbol.svg"
            alt=""
            aria-hidden="true"
            width={48}
            height={48}
            loading="lazy"
            className="mt-6 h-12 w-12"
          />
          <p className="mt-6 max-w-prose text-lead text-slate">{intro}</p>
        </div>

        {/* Right column: the three concepts, split by 1px hairlines. They use
            `.reveal-left` (D85) so each block slides out of the rail. */}
        <div className="mt-10 lg:col-span-7 lg:mt-0 text-drift">
          <article className="reveal-left border-t border-line py-8 first:border-t-0 first:pt-0 lg:py-10">
            <h3 className="flex items-center gap-2 text-label font-semibold uppercase text-slate">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-ember"
              />
              {channels.label}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {channels.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line px-3 py-1.5 text-small text-ink opacity-70 transition-opacity duration-300 hover:opacity-100"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-small text-slate">{channels.note}</p>
          </article>

          <article className="reveal-left line-idle relative border-t border-line py-8 lg:py-10">
            <h3 className="flex items-center gap-2 text-label font-semibold uppercase text-slate">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-ember"
              />
              {speed.label}
            </h3>
            <p className="mt-4 flex items-center gap-3 text-h3 font-semibold text-ink lg:text-h3-lg">
              <span aria-hidden="true" className="relative flex h-3 w-3 shrink-0">
                <span className="animate-activity absolute inline-flex h-full w-full rounded-full bg-ember" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-ember" />
              </span>
              {speed.note}
            </p>
          </article>

          <article className="reveal-left line-idle relative border-t border-line py-8 lg:py-10">
            <h3 className="flex items-center gap-2 text-label font-semibold uppercase text-slate">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-ember"
              />
              {market.label}
            </h3>
            <p className="mt-4 max-w-prose text-body text-slate">{market.note}</p>
            <p className="mt-4 max-w-prose border-l-[3px] border-brand pl-3 text-lead font-semibold text-ink">
              {market.text}
            </p>
          </article>
        </div>
      </div>
    </Section>
  );
}
