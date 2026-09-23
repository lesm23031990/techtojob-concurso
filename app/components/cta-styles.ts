/**
 * Shared CTA styling (single source of truth for the button look).
 *
 * Used by `DiscordCta` (a real link to the Discord — the ONE conversion action,
 * R11/D46) and by `AudienceCta` (an inert `<button>` with no destination, D76).
 * Keeping the classes here means both stay visually identical and cannot drift,
 * while the semantics differ honestly: link vs. button.
 */
export type CtaSize = "nav" | "hero" | "block";
export type CtaVariant = "solid" | "outline";

export const CTA_SIZE_CLASSES: Record<CtaSize, string> = {
  // ButtonPrimary — design-system §6.1 (D42/D46): one single CTA look across
  // the whole site — sharp square, brand fill, ink text (6.77:1).
  nav: "min-h-11 px-4 py-2 text-body font-bold xl:px-5",
  hero: "min-h-14 px-8 py-4 text-lead font-bold",
  block: "min-h-14 px-8 py-4 text-lead font-bold w-full justify-center",
};

/* Solid = the single CTA look (D46): brand fill + ink text (6.77:1).
   Outline = hairline secondary (design-system §6.2). On the light surface it
   changes BOTH the border (to `brand`) and the fill (to `mist`) on hover, so the
   green is never the ONLY state cue — brand edges stay at 2.04:1 on paper, below
   the 3:1 a boundary alone would need (R26). */
export const CTA_VARIANT_CLASSES: Record<CtaVariant, string> = {
  solid: "bg-brand text-ink ring-1 ring-ink/10 hover:bg-brand-deep hover:shadow-glow-cta",
  outline:
    "border-2 border-ink/60 bg-transparent text-ink hover:border-brand hover:bg-mist hover:shadow-glow-cta",
};

/** Classes shared by the anchor and the inert button. */
export const CTA_BASE =
  "relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-none font-bold whitespace-nowrap transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 motion-reduce:transform-none focus-visible:outline-3 focus-visible:outline-offset-3";

/** Focus ring per surface: `brand` on dark, `ink` on light (R26). */
export function ctaFocusRing(onLight: boolean): string {
  return onLight ? "focus-visible:outline-ink" : "focus-visible:outline-brand";
}
