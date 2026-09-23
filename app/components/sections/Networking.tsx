import type { CSSProperties } from "react";
import Section from "@/components/Section";
import { getMessages } from "next-intl/server";

/**
 * "Networking" (section 6, #networking) — return to calm reading on light
 * (design-system §7, R16).
 */
export default async function Networking() {
  const messages = await getMessages();
  return (
    <Section id="networking" headingId="networking-heading" tone="paper">
      <h2
        id="networking-heading"
        className="reveal text-h2 font-bold text-balance lg:text-h2-lg"
        style={{ "--i": 0 } as CSSProperties}
      >
        {messages.networking.h2}
      </h2>
      <p
        className="reveal mt-6 max-w-[65ch] text-body lg:text-lead"
        style={{ "--i": 1 } as CSSProperties}
      >
        {messages.networking.copy}
      </p>
    </Section>
  );
}
