import Image from "next/image";
import { getMessages } from "next-intl/server";
import DiscordCta from "@/components/DiscordCta";
import TimelineRail from "@/components/TimelineRail";

/**
 * "Cierre" (section 10, #unete) — mirror of the hero (design-system §7):
 * dark surface, the SAME two-line editorial split (D35: muted line, then
 * white line), the same dominant green CTA. Last impression = first action
 * (R20). Gradient symbol watermark at 10%, decorative.
 *
 * It is the GOAL of the page timeline (D32): the rail closes here with the
 * larger, filled marker.
 */
export default async function Closing() {
  const messages = await getMessages();
  const { closing } = messages;
  return (
    <section
      id="unete"
      aria-labelledby="unete-heading"
      data-surface="dark"
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
      <TimelineRail tone="ink" variant="goal" />
      <div className="page-container reveal">
        <div className="flex flex-col items-center pl-7 text-center md:pl-14 lg:pl-20 xl:pl-24">
          {/* Two-line split echoing the hero (D35): `cloud` 7.77:1 over ink,
              answer in `paper`. ONE <h2>, one text node per line (R41). */}
          <h2
            id="unete-heading"
            className="max-w-4xl text-h2 font-bold text-balance lg:text-display"
          >
            <span className="block text-cloud">{closing.line1}</span>
            <span className="block">{closing.line2}</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lead text-cloud">{closing.copy}</p>
          <div className="mt-10">
            <DiscordCta size="hero" label={closing.cta} />
          </div>
        </div>
      </div>
    </section>
  );
}
