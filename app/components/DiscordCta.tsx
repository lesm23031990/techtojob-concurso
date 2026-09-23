import { getMessages } from "next-intl/server";
import { IconArrowUpRight } from "@/components/icons";
import {
  CTA_BASE,
  CTA_SIZE_CLASSES,
  CTA_VARIANT_CLASSES,
  ctaFocusRing,
  type CtaSize,
  type CtaVariant,
} from "@/components/cta-styles";

interface DiscordCtaProps {
  size: CtaSize;
  /** Override the default full label (hero/closing use it, nav is compact). */
  label?: string;
  /** Layout classes for the wrapper (e.g. `w-full` in the mobile menu). */
  className?: string;
  /** `solid` is THE site CTA (D46). `outline` is the hairline secondary. */
  variant?: CtaVariant;
}

/**
 * The ONE conversion action of the landing (contest rule R11): joining the
 * Discord. Every instance points to the same URL with descriptive text (R44)
 * and an sr-only "opens in a new tab" hint (text from es.json, R36).
 *
 * `solid` is THE site CTA style (D46): sharp square (`rounded-none`), `brand`
 * fill with `ink` text (6.77:1), a specular sweep plus a micro-lift on hover
 * (`-translate-y-0.5`) while the arrow glides toward the top-right corner. Only
 * the size differs per context (D37/D42/D46). On hover it also catches a soft
 * brand glow (D76).
 *
 * `outline` is the hairline secondary (design-system §6.2): transparent body,
 * `ink` border/text, and on hover the border turns `brand` AND the fill `mist` —
 * two cues, so the green is never the only state indicator on paper (R26). It
 * carries no specular sweep.
 *
 * Styling lives in `cta-styles.ts` so the inert `AudienceCta` button stays
 * identical (D76).
 *
 * The global `prefers-reduced-motion` guard and the `motion-reduce:` variants
 * keep all of it still (transitions collapse, transforms pinned, the sweep span
 * is hidden outright).
 *
 * The label NEVER wraps to a second line: `whitespace-nowrap` on the anchor
 * plus `shrink-0` on the wrapper keep the button on one line at any viewport
 * width (the header nav trims its own links instead — see SiteHeader).
 */
export default async function DiscordCta({
  size,
  label,
  className = "",
  variant = "solid",
}: DiscordCtaProps) {
  const messages = await getMessages();
  const isSolid = variant === "solid";
  const focusRing = ctaFocusRing(!(isSolid && size !== "block"));
  return (
    <span className={`group/cta relative inline-flex shrink-0 rounded-none ${className}`}>
      <a
        href={messages.discord.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${CTA_BASE} ${focusRing} ${CTA_SIZE_CLASSES[size]} ${CTA_VARIANT_CLASSES[variant]}`}
      >
        {isSolid && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -translate-x-full -skew-x-12 bg-white/30 transition-transform duration-500 ease-out group-hover/cta:translate-x-[400%] motion-reduce:hidden"
          />
        )}
        {label ?? messages.discord.cta}
        <IconArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5 motion-reduce:transform-none" />
        <span className="sr-only">{messages.a11y.newTabHint}</span>
      </a>
    </span>
  );
}
