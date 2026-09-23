import type { CSSProperties } from "react";
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
 * Motion (D61): same staggered fade-in + border lighting as the other D38
 * bentos (`.bento-reveal` / `.bento-lit`, native scroll-driven CSS, `--i`
 * inline). The inner link keeps its own hover/focus; the card hover is honest
 * feedback (scale-102 + contrast), never a click illusion.
 */
async function NewsCard({ item, featured = false }: { item: NewsItem; featured?: boolean }) {
  const messages = await getMessages();
  return (
    <article
      className={`bento-lit flex h-full flex-col gap-3 border border-line bg-paper transition-[transform,background-color,border-color,box-shadow] duration-300 ease-in-out hover:scale-[1.02] hover:border-brand hover:bg-mist ${
        featured ? "p-6 lg:p-10" : "p-6"
      }`}
    >
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
        className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start rounded-full font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4 hover:decoration-3 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        {item.cta}
        <IconArrowUpRight className="h-4 w-4" />
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
    <Section id="noticias" headingId="noticias-heading" tone="paper">
      <h2
        id="noticias-heading"
        className="reveal text-h2 font-bold text-balance lg:text-h2-lg"
        style={{ "--i": 0 } as CSSProperties}
      >
        {messages.news.h2}
      </h2>
      <p
        className="reveal mt-3 max-w-[65ch] text-small text-slate"
        style={{ "--i": 1 } as CSSProperties}
      >
        {messages.news.mockNote}
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:auto-rows-fr lg:grid-cols-12">
        {messages.news.items.map((item, index) => (
          <div
            key={item.title}
            className={`bento-reveal ${CELL_SPANS[index] ?? ""}`}
            style={{ "--i": index } as CSSProperties}
          >
            <NewsCard item={item} featured={index === 0} />
          </div>
        ))}
      </div>
    </Section>
  );
}
