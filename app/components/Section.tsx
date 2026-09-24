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

/** D92 removed (D132): the header no longer draws a shade/hairline, so the
 *  per-section `data-header-tint` flag is gone too. */

interface SectionProps {
  /** Anchor target (specs/10-landing-spec.md, R45). */
  id: string;
  /** id of the section's h2 — wires aria-labelledby (R42). */
  headingId: string;
  tone: SectionTone;
  /** Extra classes for special cases (watermarks, borders). */
  className?: string;
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
 * thread (decorative, `aria-hidden`). D133: the opt-in `.text-drift` was
 * removed — a continuous transform softened the text.
 *
 * Hairline, no forced rhythm beyond `py`. */
export default function Section({
  id,
  headingId,
  tone,
  className = "",
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
      className={`motion-body relative ${TONE_CLASSES[tone]} py-20 lg:py-32 ${className}`}
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
        <div className="pl-7 md:pl-14 lg:pl-20 xl:pl-24">{children}</div>
      </div>
    </section>
  );
}
