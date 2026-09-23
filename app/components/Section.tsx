import type { ReactNode } from "react";
import TimelineRail from "@/components/TimelineRail";
import { timelineStep } from "@/content";

export type SectionTone = "paper" | "mist" | "ink" | "brand" | "brand-soft";

/** Background/text pair per tone — every combination is AA-verified in
 *  docs/design-system.md §3.1 (never brand-green text on paper, never
 *  white text on brand green). */
const TONE_CLASSES: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  ink: "bg-ink text-paper",
  brand: "bg-brand text-ink",
  "brand-soft": "bg-brand-soft text-ink",
};

/** Dark/light polarity per tone for the adaptive header (D47). `brand` is
 *  treated as dark so the header keeps the brand CTA readable (R26). */
const TONE_SURFACE: Record<SectionTone, "dark" | "light"> = {
  paper: "light",
  mist: "light",
  ink: "dark",
  brand: "dark",
  "brand-soft": "light",
};

/** D92: the BLUE tints (`mist`, `brand-soft`) keep the light header but switch
 *  off its bottom shadow and `paper` dissolve band — both read as a grey/white
 *  smudge over a blue field. `paper` and the dark tones keep the usual
 *  treatment. Published to <html> as `data-header-tint` by HeaderSurface. */
const TONE_TINT: Record<SectionTone, boolean> = {
  paper: false,
  mist: true,
  ink: false,
  brand: false,
  "brand-soft": true,
};

interface SectionProps {
  /** Anchor target (specs/10-landing-spec.md, R45). */
  id: string;
  /** id of the section's h2 — wires aria-labelledby (R42). */
  headingId: string;
  tone: SectionTone;
  /** Extra classes for special cases (watermarks, borders). */
  className?: string;
  /** Opt-in: subtle scroll-linked text drift (design-system §9 #17). Off for
   *  sections whose content wrapper holds a `position: sticky` column or a
   *  form — a `transform` ancestor breaks `sticky` and moves controls. */
  textDrift?: boolean;
  /** Accent of the ambient top hairline thread (D98). Defaults to the tone
   *  logic below: `brand` everywhere and the `ink` thread on the `brand` band.
   *  `"ember"` opts a section into the warm accent (Noticias) without a second
   *  decoration span. */
  idleAccent?: "brand" | "ember" | "ink";
  /** Optional positional decoration (e.g. a watermark) rendered as a DIRECT
   *  child of `<section>`, outside `page-container` and the `text-drift`
   *  wrapper: a `transform` ancestor would break the decoration's
   *  `position: absolute`. To sit BEHIND the in-flow content give it `-z-10`
   *  and add `isolate` via `className` so the negative z-index stays inside
   *  the section instead of escaping to the page root. */
  decoration?: ReactNode;
  children: ReactNode;
}

/**
 * Semantic section wrapper: <section id aria-labelledby> + vertical rhythm
 * (5rem mobile / 8rem desktop, design-system §5) + page container + its
 * segment of the page-wide vertical timeline (D32).
 *
 * The rail is a sibling of the content, not a wrapper: the content is indented
 * enough to clear it (R38-safe at 360px) while the rail keeps spanning the
 * section's full height so the line stays continuous from top to bottom.
 * The step numeral comes from `timelineOrder` (content.ts) — the single source
 * of truth for the narrative order, so reordering the page is one list edit.
 *
 * Ambient layer (D84): every `Section` renders the `.section-idle` hairline
 * thread (decorative, `aria-hidden`); `.text-drift` on the content wrapper is
 * opt-in via `textDrift` and must never wrap a `position: sticky` column.
 *
 * Tint (D92): `data-header-tint="true"` on the blue tones (`mist`,
 * `brand-soft`) tells the header to drop its bottom shadow and dissolve band;
 * the header link/CTA colours are unaffected.
 */
export default function Section({
  id,
  headingId,
  tone,
  className = "",
  textDrift = false,
  idleAccent,
  decoration,
  children,
}: SectionProps) {
  const step = timelineStep(id);
  const idleAccentClass =
    idleAccent === "ember"
      ? "section-idle-ember"
      : idleAccent === "ink" || (idleAccent === undefined && tone === "brand")
        ? "section-idle-ink"
        : "";
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      data-surface={TONE_SURFACE[tone]}
      data-header-tint={TONE_TINT[tone] ? "true" : undefined}
      className={`relative ${TONE_CLASSES[tone]} py-20 lg:py-32 ${className}`}
    >
      <span
        aria-hidden="true"
        className={`section-sheen ${tone === "brand" ? "section-sheen-ink" : ""}`}
      />
      <span
        aria-hidden="true"
        className={`section-idle ${idleAccentClass}`}
      />
      {decoration}
      <TimelineRail tone={tone} step={step} />
      <div className="page-container">
        <div
          className={`pl-7 md:pl-14 lg:pl-20 xl:pl-24 ${textDrift ? "text-drift" : ""}`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
