import Section from "@/components/Section";
import { messages } from "@/content";
import { IconArrowUpRight } from "@/components/icons";
import type { NewsItem } from "@/content";

/**
 * "Noticias" (section 8, #noticias, R18) — three sample articles. Each one
 * is an <article> with a machine-readable <time>, an ember category chip
 * (ink text on ember: 6.12:1 ✅ — the accent's only allowed text role) and
 * a descriptive link (R44). Since the news feed is a mockup and the only
 * real destination in the whole site is the Discord (R11/Q3), the links
 * honestly point there instead of faking 404s.
 */
function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-card border border-line bg-paper p-6 transition-shadow duration-150 hover:shadow-raised">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-ember px-3 py-1 text-label font-semibold uppercase text-ink">
          {item.categoria}
        </span>
        <time dateTime={item.fechaIso} className="text-small text-slate">
          {item.fecha}
        </time>
      </div>
      <h3 className="text-h3 font-bold text-balance lg:text-h3-lg">{item.titulo}</h3>
      <p className="text-body">{item.resumen}</p>
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

export default function News() {
  return (
    <Section id="noticias" headingId="noticias-heading" tone="paper">
      <h2
        id="noticias-heading"
        className="text-h2 font-bold text-balance lg:text-h2-lg"
      >
        {messages.noticias.h2}
      </h2>
      <p className="mt-3 max-w-[65ch] text-small text-slate">
        {messages.noticias.maquetaNota}
      </p>
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {messages.noticias.items.map((item) => (
          <NewsCard key={item.titulo} item={item} />
        ))}
      </div>
    </Section>
  );
}
