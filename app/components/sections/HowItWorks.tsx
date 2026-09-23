import Section from "@/components/Section";
import { messages } from "@/content";

/**
 * "Cómo funciona" (timeline step 1, #como-funciona) — the detailed journey
 * (R12): four numbered milestones that hang off the page timeline.
 *
 * Layout: below `xl` the steps stack with their brand milestone circles and a
 * short connector between them (no second long spine, so it never competes
 * with the page rail); from `xl` the journey "opens up" into an alternating
 * timeline around a centred spine, then the page rail takes over again.
 * Step numbers are decorative (the <ol> already carries the sequence).
 */
export default function HowItWorks() {
  const { steps } = messages.howItWorks;
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

      <div className="relative mt-12">
        {/* Centred spine for the alternating layout (xl only). */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-1/2 hidden w-px bg-line xl:block"
        />
        <ol className="relative flex flex-col gap-10 xl:gap-16">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative flex gap-5 xl:grid xl:grid-cols-2 xl:items-start xl:gap-16"
            >
              {/* Connector between milestones (below xl). */}
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-14 left-6 h-[calc(100%+.5rem)] w-px bg-line xl:hidden"
                />
              )}
              <span
                aria-hidden="true"
                className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand text-h2 font-bold text-ink xl:absolute xl:top-0 xl:left-1/2 xl:-translate-x-1/2"
              >
                {/* Inner span: the entrance animation scales here, so it never
                    fights the `-translate-x-1/2` that centres the circle. */}
                <span className="timeline-marker grid h-full w-full place-items-center">
                  {index + 1}
                </span>
              </span>
              <div
                className={
                  index % 2 === 0
                    ? "xl:col-start-1 xl:pr-20 xl:text-right"
                    : "xl:col-start-2 xl:pl-20"
                }
              >
                <h3 className="text-h3 font-semibold lg:text-h3-lg">{step.title}</h3>
                <p className="mt-2 max-w-prose text-body">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-12 border-t border-line pt-6 text-lead font-semibold">
        {messages.howItWorks.closing}
      </p>
    </Section>
  );
}
