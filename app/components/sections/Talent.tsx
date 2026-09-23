import type { CSSProperties } from "react";
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
      <p
        className="reveal text-label font-semibold uppercase text-slate"
        style={{ "--i": 0 } as CSSProperties}
      >
        {messages.talent.eyebrow}
      </p>
      <h2
        id="talento-heading"
        className="reveal mt-2 text-h2 font-bold text-balance lg:text-h2-lg"
        style={{ "--i": 1 } as CSSProperties}
      >
        {messages.talent.h2}
      </h2>
      <p
        className="reveal mt-6 max-w-[65ch] text-body lg:text-lead"
        style={{ "--i": 2 } as CSSProperties}
      >
        {messages.talent.copy}
      </p>
    </Section>
  );
}
