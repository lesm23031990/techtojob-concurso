import type { SectionTone } from "@/components/Section";

interface TimelineRailProps {
  tone: SectionTone;
  /**
   * Decorative numeral inside the marker (order lives in content.ts).
   * Required: every rail still drawn belongs to a numbered step. Callers pass
   * `timelineStep(id)`, which may be undefined for ids outside `timelineOrder`
   * — that simply renders an empty marker, same as before.
   */
  step: number | undefined;
}

/** Horizontal coordinates mirror `page-container` metrics (gutter 20/32/40px)
 *  so the rail lands on the same axis in every section. */
const RAIL_X = "left-5 md:left-8 lg:left-10";
const MARKER_Y = "top-20 lg:top-32";

const RAIL_COLOR: Record<SectionTone, string> = {
  paper: "bg-line",
  mist: "bg-line",
  ink: "bg-white/12",
  brand: "bg-ink/20",
};

const FILL_COLOR: Record<SectionTone, string> = {
  paper: "bg-brand",
  mist: "bg-brand",
  ink: "bg-brand",
  brand: "bg-ink",
};

const MARKER_COLOR: Record<SectionTone, string> = {
  paper: "border-brand bg-paper text-ink",
  mist: "border-brand bg-paper text-ink",
  ink: "border-brand/60 bg-ink text-brand",
  brand: "border-ink bg-ink text-brand",
};

/**
 * One segment of the page-wide vertical timeline (D32).
 *
 * The rail is drawn per section and spans the section's FULL height
 * (`inset-y-0`), so contiguous sections stack into a single continuous line
 * with no inter-section maths. Everything here is decorative: `aria-hidden`
 * plus `pointer-events-none`, so it never interferes with reading or clicking
 * (R34) and the section heading remains the only real label — the numeral is a
 * bare figure, not duplicated text.
 *
 * The fill grows with the scroll and the marker lights up when its section
 * enters the viewport (`.timeline-fill` / `.timeline-marker` in globals.css,
 * native scroll-driven CSS). Without `animation-timeline` support the line is
 * simply fully drawn and the markers are active — never invisible.
 */
export default function TimelineRail({ tone, step }: TimelineRailProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="page-container relative h-full">
        {/* Rail segment — full section height (continuity across sections). */}
        <div className={`absolute inset-y-0 w-px ${RAIL_X} ${RAIL_COLOR[tone]}`}>
          <span className={`timeline-fill block h-full w-full ${FILL_COLOR[tone]}`} />
        </div>

        <span className={`absolute -translate-x-1/2 ${MARKER_Y} ${RAIL_X}`}>
          <span
            className={`timeline-marker grid h-7 w-7 place-items-center rounded-full border-2 text-label font-bold ${MARKER_COLOR[tone]}`}
          >
            {step}
          </span>
        </span>
      </div>
    </div>
  );
}
