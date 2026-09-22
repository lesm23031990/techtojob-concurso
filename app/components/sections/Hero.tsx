import Image from "next/image";
import { messages } from "@/content";
import DiscordCta from "@/components/DiscordCta";

/**
 * Hero (section 1, anchor #inicio) — dark `ink` surface, the single green
 * CTA as the dominant element (R11). The H1 is real text, never an image
 * (R39/R40), and appears without animation to protect LCP/CLS (§9). The
 * symbol watermark is decorative at 8% opacity (design-system §2f).
 */
export default function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-ink text-paper"
    >
      <Image
        src="/brand/logo-symbol-light.svg"
        alt=""
        aria-hidden="true"
        width={288}
        height={288}
        /* above the fold → never lazy (R56); eager without priority preload
           because it is decorative and must not compete with the H1 (LCP) */
        loading="eager"
        className="pointer-events-none absolute -top-24 right-[-4rem] opacity-[0.08] lg:-right-16 lg:-top-16 lg:h-[32rem] lg:w-[32rem]"
      />
      <div className="page-container hero-fill flex flex-col items-center justify-center py-20 text-center lg:py-32">
        <h1
          id="hero-heading"
          className="max-w-3xl text-display font-bold text-balance lg:text-display-lg"
        >
          {messages.hero.h1}
        </h1>
        <p className="mt-6 max-w-2xl text-lead text-cloud lg:text-lead-lg">
          {messages.hero.sub}
        </p>
        <div className="mt-10">
          <DiscordCta size="hero" label={messages.hero.cta} />
        </div>
        <p className="mt-6 text-small text-cloud">{messages.hero.support}</p>
      </div>
    </section>
  );
}
