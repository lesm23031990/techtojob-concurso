import Section from "@/components/Section";
import { getMessages } from "next-intl/server";

/**
 * "Cómo funciona" (timeline step 1, #como-funciona) — the detailed journey
 * (R12): four numbered milestones.
 *
 * Layout (D38, "Bento Signature"): the D32 sub-timeline is retired and the
 * steps become an asymmetric bento — 7 (tall, row-span 2) + 5 + 5 + 12 from
 * `lg`, a 2-column pair on `md`, one stacked column on mobile. The `<ol>`
 * keeps the real sequence, so the oversized index numeral is decorative
 * (`aria-hidden`); it is a print-like ghost (`text-ink/15`) because R26 bans
 * the brand green as text on `paper`, with the green kept as a decorative
 * 2px rule (brand as fill is allowed anywhere). Cells are hairline, square
 * and shadow-free (editorial continuity with the D36 hero CTA).
 */
export default async function HowItWorks() {
  const messages = await getMessages();
  const { steps } = messages.howItWorks;

  /* Explicit per-index spans (steps are a fixed four in specs/11). The last
     cell always closes the grid full-width. */
  const cellSpans = [
    "md:col-span-2 lg:col-span-7 lg:row-span-2",
    "lg:col-span-5",
    "lg:col-span-5",
    "md:col-span-2 lg:col-span-12",
  ];

  return (
    <Section id="como-funciona" headingId="como-funciona-heading" tone="paper">
      <h2
        id="como-funciona-heading"
        className="text-h2 font-bold text-balance lg:text-h2-lg"
      >
        {messages.howItWorks.h2}
      </h2>
      <p className="mt-4 max-w-prose text-lead text-slate">
        {messages.howItWorks.intro}
      </p>

      <ol className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-5 lg:auto-rows-fr lg:grid-cols-12">
        {steps.map((step, index) => (
          <li key={step.title} className={`reveal ${cellSpans[index] ?? ""}`}>
            <div className="flex h-full flex-col border border-line bg-paper p-6 transition-colors duration-200 hover:border-ink/30 lg:p-8">
              <span
                aria-hidden="true"
                className="bento-index block text-h2 font-bold leading-none text-ink/15 lg:text-display"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="mt-5 block h-0.5 w-8 bg-brand" />
              <h3 className="mt-5 text-h3 font-semibold lg:text-h3-lg">{step.title}</h3>
              <p className="mt-2 max-w-prose text-body">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-12 border-t border-line pt-6 text-lead font-semibold">
        {messages.howItWorks.closing}
      </p>
    </Section>
  );
}
