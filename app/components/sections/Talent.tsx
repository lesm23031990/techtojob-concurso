import Section from "@/components/Section";
import { getMessages } from "next-intl/server";

/**
 * "Ofrécete como talento" (section 3, #talento) — audience: developers
 * (R13). Shares the light rhythm with the previous section; separated with
 * an eyebrow label + top border (design-system §7). Reading measure 65ch.
 */
export default async function Talent() {
  const messages = await getMessages();
  return (
    <Section
      id="talento"
      headingId="talento-heading"
      tone="paper"
      className="border-t border-line"
    >
      <p className="text-label font-semibold uppercase text-slate">
        {messages.talent.eyebrow}
      </p>
      <h2
        id="talento-heading"
        className="mt-2 text-h2 font-bold text-balance lg:text-h2-lg"
      >
        {messages.talent.h2}
      </h2>
      <p className="mt-6 max-w-[65ch] text-body lg:text-lead">{messages.talent.copy}</p>
    </Section>
  );
}
