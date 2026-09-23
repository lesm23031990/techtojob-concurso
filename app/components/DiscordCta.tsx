import { messages } from "@/content";
import { IconArrowUpRight } from "@/components/icons";

type DiscordCtaSize = "nav" | "hero" | "block" | "line";

interface DiscordCtaProps {
  size: DiscordCtaSize;
  /** Override the default full label (hero/closing use it, nav is compact). */
  label?: string;
  /** Layout classes for the wrapper (e.g. `w-full` in the mobile menu). */
  className?: string;
}

const SIZE_CLASSES: Record<Exclude<DiscordCtaSize, "line">, string> = {
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
 * Two visual variants:
 * - `nav` / `hero` / `block`: the brand pill (ButtonPrimary, §6.1). It carries
 *   the shared motion signature — a breathing brand halo painted by a sibling
 *   `span` (box-shadow only, so the button itself never animates at rest and
 *   CLS stays 0) and, on hover, a 2% scale + soft brand glow on the wrapper
 *   while the arrow glides toward the top-right corner.
 * - `line`: the editorial outline button of the V5 hero — sharp rectangle,
 *   transparent fill, hairline border that warms to brand on hover, a brand
 *   underline that draws itself left-to-right, and the arrow sliding right.
 *   No halo, no scale: the wrapper is a plain `group/cta` span so the arrow
 *   hover still works.
 * The global `prefers-reduced-motion` guard and the `motion-reduce:` variants
 * keep all of it still (transitions collapse, scale pinned to 1).
 *
 * The label NEVER wraps to a second line: `whitespace-nowrap` on the anchor
 * plus `shrink-0` on the wrapper keep the button on one line at any viewport
 * width (the header nav trims its own links instead — see SiteHeader).
 */
export default function DiscordCta({ size, label, className = "" }: DiscordCtaProps) {
  if (size === "line") {
    return (
      <span className={`group/cta relative inline-flex shrink-0 ${className}`}>
        <a
          href={messages.discord.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex min-h-11 items-center gap-3 rounded-none border border-white/15 bg-transparent px-1 py-3 text-body font-semibold whitespace-nowrap text-paper transition-colors hover:border-brand/60 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand after:absolute after:inset-x-1 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-200 hover:after:scale-x-100 motion-reduce:after:transition-none"
        >
          {label ?? messages.discord.cta}
          <IconArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover/cta:translate-x-1.5 motion-reduce:transform-none" />
          <span className="sr-only">{messages.a11y.newTabHint}</span>
        </a>
      </span>
    );
  }

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
