import { messages } from "@/content";
import { IconArrowUpRight } from "@/components/icons";

type DiscordCtaSize = "nav" | "hero" | "block";

interface DiscordCtaProps {
  size: DiscordCtaSize;
  /** Override the default full label (hero/closing use it, nav is compact). */
  label?: string;
  /** Layout classes for the wrapper (e.g. `w-full` in the mobile menu). */
  className?: string;
}

const SIZE_CLASSES: Record<DiscordCtaSize, string> = {
  // ButtonPrimary — design-system §6.1: brand fill, ink text 6.77:1, pill,
  // min 44px (nav) / 48px (hero). Focus ring: ink on light surfaces, brand
  // on dark surfaces (both ≥3:1).
  nav: "min-h-11 px-4 py-2 text-body font-bold xl:px-5",
  hero: "min-h-12 px-7 py-3 text-lead font-bold",
  block: "min-h-12 px-7 py-3 text-lead font-bold w-full justify-center",
};

/**
 * The ONE conversion action of the landing (contest rule R11): joining the
 * Discord. Every instance points to the same URL with descriptive text (R44)
 * and an sr-only "opens in a new tab" hint (text from es.json, R36).
 *
 * Every Discord CTA carries the SAME motion signature, wherever it appears
 * (nav, hero, mobile menu, closing):
 * - a breathing brand halo painted by a sibling `span` (box-shadow only, so
 *   the button itself never animates at rest and CLS stays 0);
 * - on hover, a 2% scale + soft brand glow on the wrapper, and the arrow
 *   gliding toward the top-right corner.
 * The global `prefers-reduced-motion` guard and the `motion-reduce:` variants
 * keep all of it still (transitions collapse, scale pinned to 1).
 *
 * The label NEVER wraps to a second line: `whitespace-nowrap` on the anchor
 * plus `shrink-0` on the wrapper keep the pill on one line at any viewport
 * width (the header nav trims its own links instead — see SiteHeader).
 */
export default function DiscordCta({ size, label, className = "" }: DiscordCtaProps) {
  const darkContext = size === "hero" || size === "block";
  return (
    <span
      className={`group/cta relative inline-flex shrink-0 rounded-full transition-[transform,box-shadow] duration-300 hover:scale-[1.02] hover:shadow-[0_8px_40px_-8px_rgb(132_192_191/0.55)] motion-reduce:scale-100 ${className}`}
    >
      <span
        aria-hidden="true"
        className="animate-breathe pointer-events-none absolute inset-0 rounded-full"
      />
      <a
        href={messages.discord.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-brand text-ink whitespace-nowrap transition-colors duration-150 hover:bg-brand-deep focus-visible:outline-3 focus-visible:outline-offset-3 ${
          darkContext ? "focus-visible:outline-brand" : "focus-visible:outline-ink"
        } ${SIZE_CLASSES[size]}`}
      >
        {label ?? messages.discord.cta}
        <IconArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5 motion-reduce:transform-none" />
        <span className="sr-only">{messages.a11y.newTabHint}</span>
      </a>
    </span>
  );
}
