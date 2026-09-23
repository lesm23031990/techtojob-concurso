import { IconArrowDown } from "@/components/icons";
import {
  CTA_BASE,
  CTA_SIZE_CLASSES,
  ctaVariantClasses,
  ctaFocusRing,
  type CtaSurface,
  type CtaVariant,
} from "@/components/cta-styles";

interface AudienceCtaProps {
  label: string;
  variant: CtaVariant;
  /** Surface the CTA sits on; picks the matching ring and outline colours. */
  surface?: CtaSurface;
  /** Layout classes for the wrapper (e.g. `w-full sm:w-auto`). */
  className?: string;
}

/**
 * CTA for the two Audiences cells (D76).
 *
 * The actions ("crear perfil", "buscar talento") happen INSIDE the Discord and
 * there is no backend (AGENTS.md scope). Instead of a dead button or an external
 * jump, it closes the funnel HONESTLY: it is an in-page anchor to `#unete`, the
 * closing block with the real Discord CTA. So the section is no longer a dead
 * end and it never fakes a destination (R43) or sends anyone off-page.
 *
 * A down arrow (`IconArrowDown`) signals "goes to a section below", never the
 * external-link arrow of the Discord CTA. Visual style is shared via
 * `cta-styles.ts` with `DiscordCta`, so the two cannot drift.
 */
export default function AudienceCta({
  label,
  variant,
  surface = "light",
  className = "",
}: AudienceCtaProps) {
  const isSolid = variant === "solid";
  return (
    <span className={`group/cta relative inline-flex shrink-0 rounded-none ${className}`}>
      <a
        href="#unete"
        className={`${CTA_BASE} ${ctaFocusRing(surface === "light")} ${CTA_SIZE_CLASSES.hero} ${ctaVariantClasses(variant, surface)}`}
      >
        {isSolid && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -translate-x-full -skew-x-12 bg-white/30 transition-transform duration-500 ease-out group-hover/cta:translate-x-[400%] motion-reduce:hidden"
          />
        )}
        {label}
        <IconArrowDown className="h-5 w-5 transition-transform duration-300 group-hover/cta:translate-y-0.5 motion-reduce:transform-none" />
      </a>
    </span>
  );
}
