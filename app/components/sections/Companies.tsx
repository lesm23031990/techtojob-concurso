import Section from "@/components/Section";
import { messages } from "@/content";

/**
 * "Publica como empresa" (section 4, #empresas) — audience: companies
 * (R14). The `mist` tint marks the audience switch without going dark
 * (design-system §7).
 */
export default function Companies() {
  return (
    <Section id="empresas" headingId="empresas-heading" tone="mist">
      <p className="text-label font-semibold uppercase text-slate">
        {messages.empresas.eyebrow}
      </p>
      <h2
        id="empresas-heading"
        className="mt-2 text-h2 font-bold text-balance lg:text-h2-lg"
      >
        {messages.empresas.h2}
      </h2>
      <p className="mt-6 max-w-[65ch] text-body lg:text-lead">{messages.empresas.copy}</p>
    </Section>
  );
}
