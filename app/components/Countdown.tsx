"use client";

import { useEffect, useState } from "react";

interface CountdownLabels {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  closed: string;
}

interface CountdownProps {
  /** Absolute deadline as an ISO string WITH offset (e.g. `…-06:00`), so the
   *  countdown is the same instant for every visitor regardless of their zone. */
  targetIso: string;
  labels: CountdownLabels;
  /** Section surface (D85): on `light` the brand-as-text is swapped for `ink`
   *  and `cloud` for `slate` (R26 forbids green text on light surfaces). */
  surface?: "ink" | "light";
}

interface Remaining {
  closed: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** Whole-unit breakdown of `target - now`, clamped at zero. */
function remainingUntil(target: number, now: number): Remaining {
  const diff = Math.max(0, target - now);
  const totalSeconds = Math.floor(diff / 1000);
  return {
    closed: diff <= 0,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

const pad2 = (value: number) => String(value).padStart(2, "0");

/**
 * Live countdown to the delivery deadline of Torneo #2 (D80, requested by
 * Lorena — supersedes the "static schedule" of D72).
 *
 * Why it is a client component: the remaining time depends on the visitor's
 * clock, so it cannot be prerendered. This is the site's SECOND (and last)
 * client island; the first is `NewsletterForm`.
 *
 * Hydration-safe: the first render (server AND client) shows placeholder dashes;
 * the real value appears in `useEffect` after mount, so there is no mismatch and
 * no layout shift (every digit column has a fixed 2ch min-width).
 *
 * Expiry: once the deadline passes it shows an honest "closed" line instead of
 * `00:00:00` — the exact scenario D72 wanted to avoid. With JS disabled the
 * countdown stays as dashes, but the static deadline heading and the timezone
 * table below still state the closing time (progressive enhancement).
 *
 * A11y: the ticking digits are `aria-hidden` (a clock that updates every second
 * would spam a screen reader); the deadline is already real text in the heading.
 */
export default function Countdown({
  targetIso,
  labels,
  surface = "ink",
}: CountdownProps) {
  const target = new Date(targetIso).getTime();
  const [time, setTime] = useState<Remaining | null>(null);
  const onLight = surface === "light";
  const digitTone = onLight ? "text-ink" : "text-brand";
  const labelTone = onLight ? "text-slate" : "text-cloud";

  useEffect(() => {
    const tick = () => setTime(remainingUntil(target, Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (time?.closed) {
    return (
      <p className={`mt-6 text-lead font-semibold ${digitTone}`}>
        {labels.closed}
      </p>
    );
  }

  const units = [
    { label: labels.days, value: time?.days, pad: false },
    { label: labels.hours, value: time?.hours, pad: true },
    { label: labels.minutes, value: time?.minutes, pad: true },
    { label: labels.seconds, value: time?.seconds, pad: true },
  ];

  return (
    <div
      aria-hidden="true"
      className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4"
    >
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col">
          <span
            className={`min-w-[2ch] text-h3 font-bold tabular-nums leading-none ${digitTone} lg:text-h2`}
          >
            {unit.value === undefined
              ? "--"
              : unit.pad
                ? pad2(unit.value)
                : unit.value}
          </span>
          <span
            className={`mt-2 text-label font-semibold uppercase ${labelTone}`}
          >
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
