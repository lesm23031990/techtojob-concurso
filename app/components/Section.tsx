import type { ReactNode } from "react";

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
 * (5rem mobile / 8rem desktop, design-system §5) + page container.
 */
export default function Section({
  id,
  headingId,
  tone,
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`${TONE_CLASSES[tone]} py-20 lg:py-32 ${className}`}
    >
      <div className="page-container reveal">{children}</div>
    </section>
  );
}
