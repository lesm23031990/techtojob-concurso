import { messages } from "@/content";
import { IconArrowUpRight } from "@/components/icons";

type DiscordCtaSize = "nav" | "hero" | "block";

interface DiscordCtaProps {
  size: DiscordCtaSize;
  /** Override the default full label (hero/closing use it, nav is compact). */
  label?: string;
  className?: string;
}

const SIZE_CLASSES: Record<DiscordCtaSize, string> = {
  // ButtonPrimary — design-system §6.1: brand fill, ink text 6.77:1, pill,
  // min 44px (nav) / 48px (hero). Focus ring: ink on light surfaces, brand
  // on dark surfaces (both ≥3:1). No shadow: the color already dominates.
  nav: "min-h-11 px-5 py-2 text-body font-bold",
  hero: "min-h-12 px-7 py-3 text-lead font-bold",
  block: "min-h-12 px-7 py-3 text-lead font-bold w-full justify-center sm:w-auto",
};

/**
 * The ONE conversion action of the landing (contest rule R11): joining the
 * Discord. Every instance points to the same URL with descriptive text
 * (R44) and an sr-only "opens in a new tab" hint (text from es.json, R36).
 */
export default function DiscordCta({ size, label, className = "" }: DiscordCtaProps) {
  const darkContext = size === "hero" || size === "block";
  return (
    <a
      href={messages.discord.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-brand text-ink transition-colors duration-150 hover:bg-brand-deep focus-visible:outline-3 focus-visible:outline-offset-3 ${
        darkContext ? "focus-visible:outline-brand" : "focus-visible:outline-ink"
      } ${SIZE_CLASSES[size]} ${className}`}
    >
      {label ?? messages.discord.cta}
      <IconArrowUpRight className="h-5 w-5 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transform-none" />
      <span className="sr-only">{messages.a11y.newTabHint}</span>
    </a>
  );
}
