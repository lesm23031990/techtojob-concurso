"use client";

// The only client component on the page: the mockup newsletter needs local
// state to show accessible submit feedback (R19/Q8). There is NO endpoint —
// the submission target is decided after the tournament (decision D15), so
// we preventDefault and confirm honestly. Progressive HTML5 validation
// (type=email + required) covers client checks in <50 lines, no library.
//
// D101: the form is a "console field" in the panel's right column — overline
// label, full-width field, full-width square button, an animated hairline and
// the trust seal. Same CTA language as the site (D46) minus the arrow, so the
// Discord CTA stays the unique primary action (R11).

import { useState } from "react";
import type { FormEvent } from "react";
import { useMessages } from "next-intl";

export default function NewsletterForm() {
  const messages = useMessages();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label
        htmlFor="newsletter-email"
        className="reveal text-label font-semibold uppercase text-cloud"
      >
        {messages.newsletter.label}
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder={messages.newsletter.placeholder}
        aria-describedby="newsletter-note"
        className="reveal mt-3 min-h-12 w-full rounded-input border border-white/50 bg-ink px-4 text-paper transition-colors duration-200 placeholder:text-cloud/70 focus:border-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand"
      />
      <button
        type="submit"
        className="reveal group relative isolate mt-3 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-none bg-brand px-6 py-3 text-body font-bold whitespace-nowrap text-ink ring-1 ring-ink/10 transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-glow-cta focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand motion-reduce:transform-none"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -translate-x-full -skew-x-12 bg-white/30 transition-transform duration-500 ease-out group-hover:translate-x-[400%] motion-reduce:hidden"
        />
        {messages.newsletter.button}
      </button>
      <div aria-hidden="true" className="reveal line-idle mt-6 h-px w-full bg-white/10" />
      <p
        id="newsletter-note"
        className="reveal mt-3 flex items-start gap-2.5 text-small text-cloud/80"
      >
        <span
          aria-hidden="true"
          className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
        />
        <span>{messages.newsletter.note}</span>
      </p>
      {/* status region: announced politely to screen readers on submit */}
      <p
        id="newsletter-status"
        role="status"
        aria-live="polite"
        className="reveal mt-2 text-small text-brand"
      >
        {submitted ? messages.newsletter.success : ""}
      </p>
    </form>
  );
}
