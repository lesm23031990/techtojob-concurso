import Section from "@/components/Section";
import { initials, messages } from "@/content";
import { IconLinkedin } from "@/components/icons";
import type { Testimonial } from "@/content";

/**
 * "Lo que se dice dentro" (section 7, #testimonios, R17) — 4 sample cells on
 * `mist`. Each cell reserves the real-data slots the brief demands: circular
 * avatar (honest initials placeholder, no broken image) and a LinkedIn link
 * placeholder that is visibly present but clearly NOT clickable (role=link +
 * aria-disabled + tabindex=-1 — we never fake a dead link, R43). The "sample"
 * disclaimer stays visible below the h2.
 *
 * Layout (D38, "Bento Signature"): the uniform 4-card row becomes an
 * asymmetric 7/5/5/7 bento from `lg` (2×2 on `sm`, stacked on mobile). Cells
 * are hairline, square and shadow-free; the oversized quote mark is a print
 * ghost (`text-ink/15`) instead of brand text — R26 forbids the green as text
 * on `paper`, so the only green left here is the avatar fill (brand as
 * background with `ink` text: 6.77:1).
 */
function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="relative flex h-full flex-col border border-line bg-paper p-6 lg:p-8">
      <span
        aria-hidden="true"
        className="bento-index block text-display font-bold leading-none text-ink/15"
      >
        &ldquo;
      </span>
      <blockquote className="mt-4 text-body lg:text-lead">
        <p>{item.quote}</p>
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-8 pr-12">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-body font-bold text-ink"
        >
          {initials(item.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-body font-semibold text-ink">
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
        className="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full text-slate"
      >
        <IconLinkedin className="h-5 w-5" />
        <span className="sr-only">
          {messages.testimonials.linkedinSlotTitle}.{" "}
          {messages.testimonials.linkedinSlotHint}
        </span>
      </span>
    </figure>
  );
}

/* Asymmetric bento rhythm: 7+5 then 5+7 (fixed four items, specs/11). */
const CELL_SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export default function Testimonials() {
  return (
    <Section id="testimonios" headingId="testimonios-heading" tone="mist">
      <h2
        id="testimonios-heading"
        className="text-h2 font-bold text-balance lg:text-h2-lg"
      >
        {messages.testimonials.h2}
      </h2>
      <p className="mt-3 max-w-[65ch] text-small text-slate">
        {messages.testimonials.sub}
      </p>
      <ul className="mt-10 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12">
        {messages.testimonials.items.map((item, index) => (
          <li key={item.name} className={`reveal ${CELL_SPANS[index] ?? ""}`}>
            <TestimonialCard item={item} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
