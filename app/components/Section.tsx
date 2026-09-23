import type { ReactNode } from "react";
import TimelineRail from "@/components/TimelineRail";
import { timelineStep } from "@/content";

export type SectionTone = "paper" | "mist" | "ink" | "brand";

/** Background/text pair per tone — every combination is AA-verified in
 *  docs/design-system.md §3.1 (never brand-green text on paper, never
 *  white text on brand green). */
const TONE_CLASSES: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  ink: "bg-ink text-paper",
  brand: "bg-brand text-ink",
};

interface SectionProps {
  /** Anchor target (specs/10-landing-spec.md, R45). */
  id: string;
  /** id of the section's h2 — wires aria-labelledby (R42). */
  headingId: string;
  tone: SectionTone;
  /** Extra classes for special cases (watermarks, borders). */
  className?: string;
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
 */
export default function Section({
  id,
  headingId,
  tone,
  className = "",
  children,
}: SectionProps) {
  const step = timelineStep(id);
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative ${TONE_CLASSES[tone]} py-20 lg:py-32 ${className}`}
    >
      <TimelineRail tone={tone} step={step} />
      <div className="page-container reveal">
        <div className="pl-7 md:pl-14 lg:pl-20 xl:pl-24">{children}</div>
      </div>
    </section>
  );
}
