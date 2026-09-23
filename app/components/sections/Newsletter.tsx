import type { CSSProperties } from "react";
import Section from "@/components/Section";
import NewsletterForm from "@/components/NewsletterForm";
import { getMessages } from "next-intl/server";

/**
 * "Newsletter" (section 9, #newsletter) — the single solid green band of
 * the page, pre-footer by design so it never competes with the Discord CTA
 * (R19/D44). Every piece of text on `brand` is `ink` (6.77:1 ✅, §3.1 #3).
 */
export default async function Newsletter() {
  const messages = await getMessages();
  return (
    <Section id="newsletter" headingId="newsletter-heading" tone="brand">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2
            id="newsletter-heading"
            className="reveal text-h2 font-bold text-balance lg:text-h2-lg"
            style={{ "--i": 0 } as CSSProperties}
          >
            {messages.newsletter.h2}
          </h2>
          <p
            className="reveal mt-6 max-w-[65ch] text-body"
            style={{ "--i": 1 } as CSSProperties}
          >
            {messages.newsletter.copy}
          </p>
        </div>
        <div className="reveal" style={{ "--i": 2 } as CSSProperties}>
          <NewsletterForm />
        </div>
      </div>
    </Section>
  );
}
