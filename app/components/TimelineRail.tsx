import type { CSSProperties } from "react";

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

/* D65: the rail was drawn with `line` (#dfe6e6) at 1px → 1.27:1 on white,
   objectively invisible; the brand progress fill is 2.04:1. The rail is the
   page's narrative signature (D32), so the base now uses `slate` (5.57:1 on
   `paper`, 5.17:1 on `mist`) and the whole rail is 2px so both the travelled
   (brand) and pending (base) segments read. On dark surfaces the base is
   `white/25` (was `white/12`) and on the brand band `ink/30` (was `ink/20`). */
const RAIL_COLOR: Record<SectionTone, string> = {
  paper: "bg-slate",
  mist: "bg-slate",
  ink: "bg-white/25",
  brand: "bg-ink/30",
  "brand-soft": "bg-slate",
};

const FILL_COLOR: Record<SectionTone, string> = {
  paper: "bg-brand",
  mist: "bg-brand",
  ink: "bg-brand",
  brand: "bg-ink",
  "brand-soft": "bg-brand",
};

/* D65/D67: section marker is a DOUBLE CIRCLE (outer ring + inner brand disc
   with a `paper`/`ink` gap) and is LARGER than the step nodes (D67): 44px
   mobile / 56px `lg`, vs 36/48 for the steps. The numeral is always `ink`
   because it sits on the brand disc (6.17:1 — R26 allows brand as a fill with
   ink text anywhere). */
const MARKER_COLOR: Record<SectionTone, string> = {
  paper: "border-brand bg-paper",
  mist: "border-brand bg-paper",
  ink: "border-brand bg-ink",
  brand: "border-ink bg-ink",
  "brand-soft": "border-brand bg-brand-soft",
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
 *
 * D105: each marker publishes its 0-based position as `--i` so the idle node
 * glow (`node-flash`) travels down the rail instead of flashing in sync.
 */
export default function TimelineRail({ tone, step }: TimelineRailProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="page-container relative h-full">
        {/* Rail segment — full section height (continuity across sections). */}
        <div className={`absolute inset-y-0 w-[3px] ${RAIL_X} ${RAIL_COLOR[tone]}`}>
          <span className={`timeline-fill block h-full w-full ${FILL_COLOR[tone]}`} />
        </div>

        <span className={`absolute -translate-x-1/2 ${MARKER_Y} ${RAIL_X}`}>
          <span
            style={{ "--i": (step ?? 1) - 1 } as CSSProperties}
            className={`timeline-marker relative grid h-11 w-11 place-items-center rounded-full border-2 text-small font-bold lg:h-14 lg:w-14 lg:border-[3px] ${MARKER_COLOR[tone]}`}
          >
            <span
              aria-hidden="true"
              className="absolute inset-[5px] rounded-full bg-brand lg:inset-[7px]"
            />
            <span className="relative z-10 text-ink">{step}</span>
          </span>
        </span>
      </div>
    </div>
  );
}
