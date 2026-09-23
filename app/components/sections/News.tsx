import type { CSSProperties } from "react";
import Image from "next/image";
import Section from "@/components/Section";
import { getMessages } from "next-intl/server";
import { IconArrowUpRight } from "@/components/icons";
import type { NewsItem } from "@/content";

/**
 * "Noticias" (section 8, #noticias, R18) — three sample articles. Each one
 * is an <article> with a machine-readable <time>, an ember category chip
 * (ink text on ember: 6.12:1 ✅ — the accent's only allowed text role) and
 * a descriptive link (R44). Since the news feed is a mockup and the only
 * real destination in the whole site is the Discord (R11/Q3), the links
 * honestly point there instead of faking 404s.
 *
 * Layout (D38, "Bento Signature"): one featured tall cell (7 cols, row-span
 * 2) plus two half-height cells (5 cols each) from `lg`; on `sm` the
 * featured cell spans the full width above the two others. Hairline, square,
 * shadow-free cells; the editorial marker here is the date/chip row, so no
 * oversized index numeral is added (it would fight the chip and duplicar la
 * fecha).
 *
 * Motion (D98): the section now speaks the SAME language as the sections
 * above — the h2, the note and every cell wrapper enter from the rail with
 * `.reveal-left` (symmetric in/out) while the card keeps `.bento-lit`
 * (border lighting, staggered by `--i`) and `.card-idle` (breathing ring).
 * On top of that, a hard-edged brand sheen crosses each card on hover plus a
 * soft brand glow (`--shadow-glow`). CSS-only, no islands.
 *
 * Ember (R25/D98): the accent is used only as decoration — a dot before the
 * mock note, a pulsing dot on the featured plate (the "live" cue from
 * Torneos), the `ember` section idle thread and a `line-idle-ember` divider
 * above the grid. Never as text on paper (R26).
 *
 * Image (R57/R55/R56): the featured cell carries a decorative editorial
 * plate with the OFFICIAL brand symbol (`logo-symbol-gradient.svg`) over a
 * faint blueprint grid. It is purely decorative (`aria-hidden`, `alt=""`) so
 * it claims nothing about a mocked story; `loading="lazy"` (below the fold)
 * and explicit `width`/`height` keep R55/R56 honest.
 */
async function NewsCard({ item, featured = false }: { item: NewsItem; featured?: boolean }) {
  const messages = await getMessages();
  return (
    <article
      className={`bento-lit card-idle group relative flex h-full flex-col gap-3 border border-line bg-paper transition-[transform,background-color,border-color,box-shadow] duration-300 ease-in-out hover:scale-[1.02] hover:border-brand hover:bg-mist hover:shadow-glow ${
        featured ? "p-6 lg:p-10" : "p-6"
      }`}
    >
      <span aria-hidden="true" className="sheen-sweep" />

      {/* Featured editorial plate: official gradient symbol over a faint plane.
          Decorative, so no alt text and no click target (R34/R39). */}
      {featured ? (
        <div
          aria-hidden="true"
          className="news-field relative -mx-6 -mt-6 grid h-40 place-items-center overflow-hidden border-b border-line bg-mist sm:h-48 lg:-mx-10 lg:-mt-10 lg:h-60"
        >
          {/* "Live" cue, same pulse pattern as the running tournament (D86). */}
          <span className="absolute top-4 left-4 flex h-1.5 w-1.5">
            <span className="animate-activity absolute inline-flex h-full w-full rounded-full bg-ember" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
          </span>
          <Image
            src="/brand/logo-symbol-gradient.svg"
            alt=""
            width={96}
            height={96}
            loading="lazy"
            className="h-20 w-20 transition-transform duration-500 ease-in-out group-hover:scale-105 motion-reduce:transform-none lg:h-24 lg:w-24"
          />
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-ember px-3 py-1 text-label font-semibold uppercase text-ink">
          {item.category}
        </span>
        <time dateTime={item.dateIso} className="text-small text-slate">
          {item.date}
        </time>
      </div>
      <h3 className="text-h3 font-bold text-balance lg:text-h3-lg">{item.title}</h3>
      <p className="text-body">{item.summary}</p>
      <a
        href={messages.discord.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link mt-auto inline-flex min-h-11 items-center gap-1.5 self-start rounded-full text-small font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4 hover:decoration-3 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink sm:text-body"
      >
        {item.cta}
        <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover/link:translate-x-0.5 motion-reduce:transform-none" />
        <span className="sr-only">{messages.a11y.newTabHint}</span>
      </a>
    </article>
  );
}

/* Featured first story + two stacked (three items, specs/11). At `lg` it is
   a 12-col bento: 7 (row-span 2) + 5 + 5. */
const CELL_SPANS = [
  "sm:col-span-2 lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
];

export default async function News() {
  const messages = await getMessages();
  return (
    <Section
      id="noticias"
      headingId="noticias-heading"
      tone="paper"
      textDrift
      idleAccent="ember"
    >
      <h2
        id="noticias-heading"
        className="reveal-left text-h2 font-bold text-balance lg:text-h2-lg"
      >
        {messages.news.h2}
      </h2>
      <p className="reveal-left mt-3 flex max-w-[65ch] items-baseline gap-2.5 text-small text-slate">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 translate-y-[0.15em] rounded-full bg-ember"
        />
        <span>{messages.news.mockNote}</span>
      </p>
      {/* Animated ember divider above the bento (D86 pattern, D98). */}
      <div
        aria-hidden="true"
        className="line-idle line-idle-ember reveal-left mt-8 h-px bg-line"
      />
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:auto-rows-fr lg:grid-cols-12">
        {messages.news.items.map((item, index) => (
          <div
            key={item.title}
            className={`reveal-left ${CELL_SPANS[index] ?? ""}`}
            style={{ "--i": index } as CSSProperties}
          >
            <NewsCard item={item} featured={index === 0} />
          </div>
        ))}
      </div>
    </Section>
  );
}
