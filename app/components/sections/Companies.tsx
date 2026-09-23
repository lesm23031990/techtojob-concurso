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
      <p className="text-label font-semibold uppercase text-slate">
        {messages.companies.eyebrow}
      </p>
      <h2
        id="empresas-heading"
        className="mt-2 text-h2 font-bold text-balance lg:text-h2-lg"
      >
        {messages.companies.h2}
      </h2>
      <p className="mt-6 max-w-[65ch] text-body lg:text-lead">{messages.companies.copy}</p>
    </Section>
  );
}
