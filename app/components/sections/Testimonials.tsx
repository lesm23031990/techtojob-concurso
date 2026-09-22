import Section from "@/components/Section";
import { initials, messages } from "@/content";
import { IconLinkedin } from "@/components/icons";
import type { Testimonial } from "@/content";

/**
 * "Lo que se dice dentro" (section 7, #testimonios, R17) — 4 sample cards
 * on `mist`. Each card reserves the real-data slots the brief demands:
 * circular avatar (honest initials placeholder, no broken image) and a
 * LinkedIn link placeholder that is visibly present but clearly NOT
 * clickable (role=link + aria-disabled + tabindex=-1 — we never fake a
 * dead link, R43). The "sample" disclaimer stays visible below the h2.
 */
function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="relative flex h-full flex-col rounded-card bg-paper p-6 shadow-card">
      <span
        aria-hidden="true"
        className="font-bold text-brand text-h2 leading-none"
      >
        &ldquo;
      </span>
      <blockquote className="mt-2 text-body">
        <p>{item.frase}</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 pr-12">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-body font-bold text-ink"
        >
          {initials(item.nombre)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-body font-semibold text-ink">
            {item.nombre}
          </span>
          <span className="block text-small text-slate">{item.rol}</span>
        </span>
      </figcaption>
      {/* future LinkedIn slot — present, disabled, announced (never focusable) */}
      <span
        role="link"
        aria-disabled="true"
        tabIndex={-1}
        title={messages.testimonios.linkedinSlotTitle}
        className="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full text-slate"
      >
        <IconLinkedin className="h-5 w-5" />
        <span className="sr-only">
          {messages.testimonios.linkedinSlotTitle}.{" "}
          {messages.testimonios.linkedinSlotHint}
        </span>
      </span>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <Section id="testimonios" headingId="testimonios-heading" tone="mist">
      <h2
        id="testimonios-heading"
        className="text-h2 font-bold text-balance lg:text-h2-lg"
      >
        {messages.testimonios.h2}
      </h2>
      <p className="mt-3 max-w-[65ch] text-small text-slate">
        {messages.testimonios.sub}
      </p>
      <ul className="mt-10 grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {messages.testimonios.items.map((item) => (
          <li key={item.nombre} className="reveal">
            <TestimonialCard item={item} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
