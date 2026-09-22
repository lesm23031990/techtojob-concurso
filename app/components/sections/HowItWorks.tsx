import Section from "@/components/Section";
import { messages } from "@/content";

/**
 * "Cómo funciona" (section 2, #como-funciona) — four numbered steps
 * (R12). Green circles are the only saturation on the light surface
 * (design-system §6.8); lg-only connectors guide the eye horizontally.
 */
export default function HowItWorks() {
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

      <ol className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {messages.howItWorks.steps.map((step, index) => (
          <li key={step.title} className="relative flex flex-col gap-4">
            {/* horizontal connector between circles, lg only (§6.8) */}
            {index < messages.howItWorks.steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute top-6 left-14 hidden h-0.5 w-[calc(100%-1rem)] bg-line lg:block"
              />
            )}
            <span
              aria-hidden="true"
              className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-h2 font-bold text-ink"
            >
              {index + 1}
            </span>
            <h3 className="text-h3 font-semibold lg:text-h3-lg">{step.title}</h3>
            <p className="max-w-prose text-body">{step.text}</p>
          </li>
        ))}
      </ol>

      <p className="mt-12 border-t border-line pt-6 text-lead font-semibold">
        {messages.howItWorks.closing}
      </p>
    </Section>
  );
}
