import type { CSSProperties } from "react";
import { getMessages } from "next-intl/server";
import { initials, timelineStep } from "@/content";
import TimelineRail from "@/components/TimelineRail";
import { IconArrowUpRight, IconLinkedin } from "@/components/icons";
import type { Testimonial } from "@/content";

/**
 * "Lo que se dice dentro" (#testimonios, timeline step 5, R17) — a FULL-BLEED
 * CSS-only slider on the `mist` surface (D90 restored the light polarity that
 * D89 had flipped to `ink`), the neutral tinted light surface shared with the
 * Torneos/Networking run.
 *
 * Unlike the other sections this one does NOT use the `Section` wrapper: the
 * marquee has to escape `page-container` and span the whole viewport. It is a
 * hand-rolled `<section>` (same pattern as Torneos) that still draws its own
 * `TimelineRail` segment, so the page-wide line stays continuous and node 5
 * keeps its brand ring and mint disc. The full-bleed track is layered ABOVE the
 * rail (`z-10`): the cards cover it and the line peeks through the gaps.
 *
 * The track is duplicated in the DOM and translated −50% for a seamless loop
 * (same pattern as the hero ticker). Each `<ul>` carries the `gap` AND a matching
 * `pr`, so the seam lands exactly (D89 math) and the compact cards read as a
 * moving strip rather than full screens. Each half repeats its set `REPEAT`
 * times so one half (12 cards ≈ 4032px) is always wider than the viewport — with
 * only 4 cards (≈1344px) any laptop wider than that showed an empty gap at the
 * end of the cycle (D90-6). Tripling the width at the original 60s would speed
 * the strip up 3×, so the cycle is 180s to keep the same ≈22px/s linear speed.
 *
 * Data honesty (brief + J2): the testimonials are SAMPLE data, and the visible
 * `sub` right above the track says so in plain words — that line is now the only
 * honesty flag, since the inline card chip was removed on purpose (D89 revised).
 * The LinkedIn slot stays visibly present but clearly NOT clickable (role=link +
 * aria-disabled + tabindex=-1 — we never fake a dead link, R43).
 *
 * Accessibility: because the marquee repeats every card `REPEAT` times per half,
 * the whole `.marquee-track` is `aria-hidden` and the testimonials are exposed
 * exactly ONCE through the `sr-only` list that sits before the band — otherwise
 * a screen reader would announce each quote six times. No focusable element
 * lives inside the track (the LinkedIn slots are tabindex=-1), so hiding it is
 * safe; the LinkedIn icons inherit that `aria-hidden` and add nothing.
 *
 * Motion: the head (h2, sub, control) enters sliding from the rail with the
 * shared `.reveal-left` (D69/D85 — this is the rail section, so it matches
 * Torneos/Audiencias), while the band wrapper keeps `.reveal` (D62/D77); the
 * marquee itself is pure CSS. NOTE: no `.reveal` goes on the cards or the `<li>`
 * — they live inside an `overflow: hidden` ancestor, which rules 4b of the
 * design-system treats as a scroll container, freezing the view() timeline; the
 * animation stays only on the band, outside that overflow. The delicate
 * `brand-soft` band (`testimonial-band`, D90) carries the strip OVER the rail
 * and runs truly edge-to-edge: the band itself has no mask, and `.marquee-fade`
 * sits on an inner wrapper around the track only (D90-7), so the green field and
 * its `border-block` reach the viewport edges while just the cards dissolve;
 * a hard-edged `.sheen-sweep` crosses each card on hover (D76).
 * A hidden checkbox + `<label>` pauses the marquee without JS (`hover`/`focus-within`
 * also pause it; `:focus-visible` outlines the control); the global
 * `prefers-reduced-motion` guard parks the track at its origin and hides the
 * control. Cards are `paper` on the `brand-soft` band with an `ink/10` hairline —
 * the old `line` token vanished against the tint (D90-7); hovering raises scale +
 * border contrast to `brand`, the original
 * light-surface language (no background swap, no glow) — no new colors
 * (R24/R25).
 *
 * The visible text lives in `messages/*.json` (R36); this file owns structure,
 * not copy.
 */
async function TestimonialCard({ item }: { item: Testimonial }) {
  const messages = await getMessages();
  return (
    <figure className="card-idle group relative flex h-full flex-col border border-ink/10 bg-paper p-5 transition-[transform,background-color,border-color,box-shadow] duration-300 ease-in-out hover:scale-[1.02] hover:border-brand">
      {/* Delicate hard-edged sheen on hover (D76), same motif as the CTA and the
          audiences cards; `.sheen-sweep` clips itself, so no `overflow` here. */}
      <span aria-hidden="true" className="sheen-sweep" />
      {/* The oversized quote is a plain print ghost. It no longer carries
          `.bento-index`: inside a track with a continuous `transform`, its
          `animation-timeline: view()` never fires reliably. */}
      <span
        aria-hidden="true"
        className="block text-h3 font-bold leading-none text-ink/15"
      >
        &ldquo;
      </span>
      <blockquote className="mt-2 text-body">
        <p>{item.quote}</p>
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-2.5 pt-4 pr-9">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-small font-bold text-ink"
        >
          {initials(item.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-small font-semibold text-ink">
            {item.name}
          </span>
          <span className="block text-small text-slate">{item.role}</span>
        </span>
      </figcaption>
      {/* future LinkedIn slot — present, disabled, announced (never focusable) */}
      <span
        role="link"
        aria-disabled="true"
        tabIndex={-1}
        title={messages.testimonials.linkedinSlotTitle}
        className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full text-slate"
      >
        <IconLinkedin className="h-3.5 w-3.5" />
        <span className="sr-only">
          {messages.testimonials.linkedinSlotTitle}.{" "}
          {messages.testimonials.linkedinSlotHint}
        </span>
      </span>
    </figure>
  );
}

export default async function Testimonials() {
  const messages = await getMessages();

  /* Every half repeats the set so it always overflows the viewport; both halves
     stay identical, so the −50% loop is seamless (D90-6). */
  const items = messages.testimonials.items;
  const REPEAT = 3;
  const repeated = Array.from({ length: REPEAT }, () => items).flat();

  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-heading"
      data-surface="light"
      data-header-tint="true"
      className="relative isolate overflow-clip bg-mist py-20 text-ink lg:py-32"
    >
      <TimelineRail tone="mist" step={timelineStep("testimonios")} />
      <span aria-hidden="true" className="section-sheen" />
      <span aria-hidden="true" className="section-idle section-idle-ember" />

      {/* Hidden checkbox as a DIRECT child of <section>: the CSS-only pause
          reaches the full-bleed track through the sibling combinators below. */}
      <input
        id="testimonios-pausa"
        type="checkbox"
        className="marquee-toggle sr-only motion-reduce:hidden"
      />

      <div className="marquee-head page-container">
        <div className="pl-7 text-drift md:pl-14 lg:pl-20 xl:pl-24">
          <h2
            id="testimonios-heading"
            className="reveal-left text-h2 font-bold text-balance lg:text-h2-lg"
          >
            {messages.testimonials.h2}
          </h2>
          <p className="reveal-left mt-3 flex max-w-[65ch] items-baseline gap-2.5 text-small text-slate">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 translate-y-[0.15em] rounded-full bg-ember"
            />
            <span>{messages.testimonials.sub}</span>
          </p>
          <div className="reveal-left mt-6 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember"
            />
            <label
              htmlFor="testimonios-pausa"
              className="marquee-control inline-flex w-fit cursor-pointer items-center gap-2 border border-line bg-paper px-3 py-1.5 text-label font-semibold uppercase tracking-label text-slate transition-colors duration-300 ease-in-out hover:border-brand hover:text-ink motion-reduce:hidden"
            >
              <span className="marquee-label-pause">
                {messages.testimonials.pause}
              </span>
              <span className="marquee-label-play">
                {messages.testimonials.play}
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Single semantic source for screen readers: the visual track below is
          decorative because it repeats every card `REPEAT` times per half. */}
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item.name}>
            <blockquote>
              <p>{item.quote}</p>
            </blockquote>
            <p>
              {item.name} — {item.role}
            </p>
          </li>
        ))}
      </ul>

      {/* R17/J6: the reserved LinkedIn slot lives only in the visual track
          (`aria-hidden`), so its announcement is repeated here for screen
          readers, using the SAME existing copy. */}
      <p className="sr-only">
        {messages.testimonials.linkedinSlotTitle}. {messages.testimonials.linkedinSlotHint}
      </p>

      {/* Full-bleed slider: spans the whole viewport and layers over the rail (D89). */}
      <div className="marquee-block reveal relative z-10 mt-8">
        <div className="testimonial-band py-6">
          <div className="marquee-fade overflow-hidden">
            <div
              aria-hidden="true"
              className="marquee-track animate-marquee flex w-max [--marquee-duration:180s] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
            >
              {(["a", "b"] as const).map((half) => (
                <ul
                  key={half}
                  className="flex shrink-0 list-none items-stretch gap-4 pr-4"
                >
                  {repeated.map((item, index) => (
                    <li
                      key={`${half}-${index}-${item.name}`}
                      className="w-[74vw] shrink-0 sm:w-[18rem] lg:w-[20rem]"
                      /* `--i` feeds the `.card-idle` breathing ring (D86); the
                         modulo keeps the stagger cycling across the repeats. */
                      style={{ "--i": index % items.length } as CSSProperties}
                    >
                      <TestimonialCard item={item} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Narrative bridge (D90): a descriptive TEXT LINK to the Discord, never a
          button (R11) — same pattern and styling as HowItWorks. */}
      <div className="marquee-foot page-container mt-8">
        <div className="pl-7 md:pl-14 lg:pl-20 xl:pl-24">
          <a
            href={messages.discord.url}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal-left inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4 hover:decoration-3 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {messages.testimonials.cta}
            <IconArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">{messages.a11y.newTabHint}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
