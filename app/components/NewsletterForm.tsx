"use client";

// The only client component on the page: the mockup newsletter needs local
// state to show accessible submit feedback (R19/Q8). There is NO endpoint —
// the submission target is decided after the tournament (decision D15), so
// we preventDefault and confirm honestly. Progressive HTML5 validation
// (type=email + required) covers client checks in <50 lines, no library.

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <label
            htmlFor="newsletter-email"
            className="text-small font-semibold text-ink"
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
            aria-describedby="newsletter-status"
            className="min-h-12 rounded-input border-2 border-ink/30 bg-paper px-4 text-ink placeholder:text-slate focus-visible:border-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink/40"
          />
        </div>
        <button
          type="submit"
          className="min-h-12 shrink-0 cursor-pointer rounded-none bg-ink px-6 py-3 text-body font-bold text-paper transition-colors duration-150 hover:bg-coal focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-ink"
        >
          {messages.newsletter.button}
        </button>
      </div>
      {/* status region: announced politely to screen readers on submit */}
      <p id="newsletter-status" role="status" aria-live="polite" className="min-h-6 text-small text-ink">
        {submitted ? messages.newsletter.success : ""}
      </p>
      <p className="text-small text-ink">{messages.newsletter.note}</p>
    </form>
  );
}
