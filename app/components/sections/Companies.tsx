import type { CSSProperties } from "react";
import Section from "@/components/Section";
import { getMessages } from "next-intl/server";

/**
 * "Publica como empresa" (section 4, #empresas) — audience: companies
 * (R14). The `mist` tint marks the audience switch without going dark
 * (design-system §7).
 */
export default async function Companies() {
  const messages = await getMessages();
  return (
    <Section id="empresas" headingId="empresas-heading" tone="mist">
      <p
        className="reveal text-label font-semibold uppercase text-slate"
        style={{ "--i": 0 } as CSSProperties}
      >
        {messages.companies.eyebrow}
      </p>
      <h2
        id="empresas-heading"
        className="reveal mt-2 text-h2 font-bold text-balance lg:text-h2-lg"
        style={{ "--i": 1 } as CSSProperties}
      >
        {messages.companies.h2}
      </h2>
      <p
        className="reveal mt-6 max-w-[65ch] text-body lg:text-lead"
        style={{ "--i": 2 } as CSSProperties}
      >
        {messages.companies.copy}
      </p>
    </Section>
  );
}
