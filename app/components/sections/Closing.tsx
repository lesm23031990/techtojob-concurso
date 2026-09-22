import Image from "next/image";
import { messages } from "@/content";
import DiscordCta from "@/components/DiscordCta";

/**
 * "Cierre" (section 10, #unete) — mirror of the hero (design-system §7):
 * dark surface, big headline, the same dominant green CTA. Last impression
 * = first action (R20). Gradient symbol watermark at 10%, decorative.
 */
export default function Closing() {
  return (
    <section
      id="unete"
      aria-labelledby="unete-heading"
      className="relative isolate overflow-hidden bg-ink py-20 text-paper lg:py-32"
    >
      <Image
        src="/brand/logo-symbol-gradient.svg"
        alt=""
        aria-hidden="true"
        width={320}
        height={320}
        loading="lazy"
        className="pointer-events-none absolute -top-24 -left-20 opacity-10"
      />
      <div className="page-container reveal flex flex-col items-center text-center">
        <h2
          id="unete-heading"
          className="max-w-3xl text-h2 font-bold text-balance lg:text-h2-lg"
        >
          {messages.cierre.h2}
        </h2>
        <p className="mt-6 max-w-2xl text-lead text-cloud">{messages.cierre.copy}</p>
        <div className="mt-10">
          <DiscordCta size="hero" label={messages.cierre.cta} />
        </div>
      </div>
    </section>
  );
}
