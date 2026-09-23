import { getMessages } from "next-intl/server";
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
  // ButtonPrimary — design-system §6.1 (D42/D46): one single CTA look across
  // the whole site — sharp square, brand fill, ink text (6.77:1).
  nav: "min-h-11 px-4 py-2 text-body font-bold xl:px-5",
  hero: "min-h-14 px-8 py-4 text-lead font-bold",
  block: "min-h-14 px-8 py-4 text-lead font-bold w-full justify-center",
};

/**
 * The ONE conversion action of the landing (contest rule R11): joining the
 * Discord. Every instance points to the same URL with descriptive text (R44)
 * and an sr-only "opens in a new tab" hint (text from es.json, R36).
 *
 * ONE single CTA style across the whole site (D46): sharp square
 * (`rounded-none`), `brand` fill with `ink` text (6.77:1) and a specular sweep
 * plus a micro-lift on hover (`-translate-y-0.5`) while the arrow glides toward
 * the top-right corner. Only the size differs per context. No halo, no ring for
 * decoration and no `line` variant anymore (D37/D42/D46).
 *
 * Focus ring: the CTA lives on dark surfaces in `nav` (header veil) and `hero`
 * (hero/closing), so the ring is `brand` there; in the mobile menu (`block`,
 * over `bg-paper`) `brand` would not reach 3:1 (R26), so it uses `ink`.
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
}: DiscordCtaProps) {
  const messages = await getMessages();
  const focusRing =
    size === "block" ? "focus-visible:outline-ink" : "focus-visible:outline-brand";
  return (
    <span className={`group/cta relative inline-flex shrink-0 rounded-none ${className}`}>
      <a
        href={messages.discord.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-none bg-brand font-bold text-ink whitespace-nowrap ring-1 ring-ink/10 transition-[background-color,transform] duration-200 hover:bg-brand-deep hover:-translate-y-0.5 motion-reduce:transform-none focus-visible:outline-3 focus-visible:outline-offset-3 ${focusRing} ${SIZE_CLASSES[size]}`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/30 transition-transform duration-500 ease-out group-hover/cta:translate-x-[400%] motion-reduce:hidden"
        />
        {label ?? messages.discord.cta}
        <IconArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5 motion-reduce:transform-none" />
        <span className="sr-only">{messages.a11y.newTabHint}</span>
      </a>
    </span>
  );
}
