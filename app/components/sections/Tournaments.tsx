import type { CSSProperties } from "react";
import Image from "next/image";
import { getMessages } from "next-intl/server";
import { timelineStep } from "@/content";
import TimelineRail from "@/components/TimelineRail";
import DiscordCta from "@/components/DiscordCta";

/**
 * "Torneos" (#torneos, timeline step 2 since D32) — dark "game" moment
 * (design-system §7): headline in brand green on ink (6.17:1 ✅ — the ONLY
 * place green works as text) + the gradient symbol as a 10% decorative
 * watermark (R15).
 *
 * It moved from position 5 to 3 in the narrative order: right after "cómo
 * funciona" it turns the explanation into proof ("there is a tournament
 * running"). The rail keeps the page-wide line continuous on ink.
 *
 * Structure (D71/D73): four sober pillars on a 2×2 asymmetric grid (7/5 + 7/5)
 * over hairlines — square, shadow-free: the running tournament (with its CTA),
 * the prizes, the closing schedule and the hall of fame. D73 split the schedule
 * out of the active card so each pillar is its own block and no column dangles.
 *
 * Data honesty (brief + J2): the running tournament, its challenge and the
 * closing schedule are the REAL Torneo #2 facts (D72); prizes and winner stay
 * SAMPLE data, now flagged INLINE with a `sampleTag` chip on their blocks (D73)
 * so a fast reader cannot mistake them for real — instead of a single note at
 * the section's foot. The closing schedule is STATIC on purpose: no client
 * island and no date to expire (D56/D71/D72), so it never reads "00:00:00".
 *
 * Motion: `.reveal-left` per beat with `--i` — the SAME entrance as the
 * section above (#como-funciona, D69), by author request (D72): every block
 * slides in from the rail. CSS-only, no islands. The schedule times use Sora
 * `tabular-nums` (monospaced figures with the single allowed typeface —
 * R58/R59) instead of adding a mono font.
 */
export default async function Tournaments() {
  const messages = await getMessages();
  const { h2, copy, sampleTag, active, timer, prizes, hallOfFame } =
    messages.tournaments;

  return (
    <section
      id="torneos"
      aria-labelledby="torneos-heading"
      data-surface="dark"
      className="relative isolate overflow-clip bg-ink py-20 text-paper lg:py-32"
    >
      <Image
        src="/brand/logo-symbol-gradient.svg"
        alt=""
        aria-hidden="true"
        width={320}
        height={320}
        loading="lazy"
        className="pointer-events-none absolute -bottom-28 -right-20 opacity-10"
      />
      <TimelineRail tone="ink" step={timelineStep("torneos")} />
      <div className="page-container">
        <div className="pl-7 md:pl-14 lg:pl-20 xl:pl-24">
          <h2
            id="torneos-heading"
            className="reveal-left text-h2 font-bold text-brand text-balance lg:text-h2-lg"
            style={{ "--i": 0 } as CSSProperties}
          >
            {h2}
          </h2>
          <p
            className="reveal-left mt-6 max-w-[65ch] text-body text-cloud lg:text-lead"
            style={{ "--i": 1 } as CSSProperties}
          >
            {copy}
          </p>

          {/* 2×2 grid: active | prizes on row 1, schedule | hall on row 2. */}
          <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-12">
            {/* 1 · The running tournament (real data, D72) */}
            <article
              className="reveal-left border-t border-hairline-dark pt-6 lg:col-span-7"
              style={{ "--i": 2 } as CSSProperties}
            >
              <p className="text-label font-semibold uppercase text-cloud">
                {active.label}
              </p>
              <h3 className="mt-3 text-h3 font-semibold text-balance text-paper lg:text-h3-lg">
                {active.title}
              </h3>
              <p className="mt-3 max-w-prose text-body text-cloud">
                {active.challenge}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                <DiscordCta size="nav" label={active.cta} />
                <span className="text-small text-cloud">{active.status}</span>
              </div>
            </article>

            {/* 2 · The prizes (sample) */}
            <div
              className="reveal-left border-t border-hairline-dark pt-6 lg:col-span-5"
              style={{ "--i": 3 } as CSSProperties}
            >
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-label font-semibold uppercase text-cloud">
                  {prizes.label}
                </p>
                <span className="rounded-full bg-ember px-2.5 py-0.5 text-label font-semibold uppercase text-ink">
                  {sampleTag}
                </span>
              </div>
              <ul className="mt-4 divide-y divide-hairline-dark">
                {prizes.items.map((item) => (
                  <li
                    key={item.place}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="w-8 shrink-0 text-lead font-bold text-brand">
                      {item.place}
                    </span>
                    <span className="text-body text-paper">{item.reward}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3 · The closing schedule (real data, D72; STATIC, no island) */}
            <div
              className="reveal-left border-t border-hairline-dark pt-6 lg:col-span-7"
              style={{ "--i": 4 } as CSSProperties}
            >
              <p className="text-label font-semibold uppercase text-cloud">
                {timer.label}
              </p>
              <p className="mt-3 text-lead font-semibold tabular-nums text-paper">
                {timer.heading}
              </p>
              <p className="mt-2 max-w-prose text-small text-cloud">
                {timer.note}
              </p>
              <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                {timer.zones.map((zone) => (
                  <div
                    key={zone.region}
                    className="flex items-baseline justify-between gap-4 border-b border-hairline-dark pb-2"
                  >
                    <dt className="text-small text-cloud">{zone.region}</dt>
                    <dd className="text-small font-semibold tabular-nums text-paper">
                      {zone.closing}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* 4 · The hall of fame (sample social proof) */}
            <div
              className="reveal-left border-t border-hairline-dark pt-6 lg:col-span-5"
              style={{ "--i": 5 } as CSSProperties}
            >
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-label font-semibold uppercase text-cloud">
                  {hallOfFame.label}
                </p>
                <span className="rounded-full bg-ember px-2.5 py-0.5 text-label font-semibold uppercase text-ink">
                  {sampleTag}
                </span>
              </div>
              {hallOfFame.items.length > 0 ? (
                <ul className="mt-4 flex flex-col gap-4">
                  {hallOfFame.items.map((winner) => (
                    <li
                      key={winner.handle}
                      className="border-l-2 border-brand pl-3"
                    >
                      <p className="text-body font-semibold text-paper">
                        {winner.handle}
                      </p>
                      <p className="text-small text-cloud">
                        {winner.edition} · {winner.outcome}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-body text-cloud">{hallOfFame.empty}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
