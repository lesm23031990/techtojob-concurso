import Image from "next/image";
import { messages, timelineStep } from "@/content";
import TimelineRail from "@/components/TimelineRail";

/**
 * "Torneos" (#torneos, timeline step 2 since D32) — dark "game" moment
 * (design-system §7): headline in brand green on ink (6.17:1 ✅ — the ONLY
 * place green works as text) + the gradient symbol as a 10% decorative
 * watermark (R15).
 *
 * It moved from position 5 to 3 in the narrative order: right after "cómo
 * funciona" it turns the explanation into proof ("there is a tournament
 * running"). The rail keeps the page-wide line continuous on ink.
 */
export default function Tournaments() {
  return (
    <section
      id="torneos"
      aria-labelledby="torneos-heading"
      className="relative isolate overflow-hidden bg-ink py-20 text-paper lg:py-32"
    >
      <Image
        src="/brand/logo-symbol-gradient.svg"
        alt=""
        aria-hidden="true"
        width={320}
        height={320}
        loading="lazy"
        className="pointer-events-none absolute -bottom-28 -right-20 opacity-10"
      />
      <TimelineRail tone="ink" step={timelineStep("torneos")} />
      <div className="page-container reveal">
        <div className="pl-7 md:pl-14 lg:pl-20 xl:pl-24">
          <h2
            id="torneos-heading"
            className="text-h2 font-bold text-brand text-balance lg:text-h2-lg"
          >
            {messages.tournaments.h2}
          </h2>
          <p className="mt-6 max-w-[65ch] text-body text-cloud lg:text-lead">
            {messages.tournaments.copy}
          </p>
        </div>
      </div>
    </section>
  );
}
