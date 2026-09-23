import { getMessages } from "next-intl/server";
import { timelineStep } from "@/content";
import TimelineRail from "@/components/TimelineRail";
import DiscordCta from "@/components/DiscordCta";
import Countdown from "@/components/Countdown";

/**
 * "Torneos" (#torneos, timeline step 2 since D32) — the "game" moment on the
 * LIGHT `mist` surface: the neutral tinted light surface that breaks the run
 * of clear sections without going dark. Headline in `ink` (11.71:1 ✅ on
 * `mist` — on a light surface green may never be text, R26) and NO watermark
 * (§2f: light sections carry none).
 *
 * It moved from position 5 to 3 in the narrative order: right after "cómo
 * funciona" it turns the explanation into proof ("there is a tournament
 * running"). The rail keeps the page-wide line continuous on `mist`.
 *
 * Structure (D71→D74): the running tournament (with its CTA) takes 7 columns;
 * the prizes and the hall of fame stack in the remaining 5 so the short blocks
 * fill the active card's height; and the closing schedule runs as a FULL-WIDTH
 * band below. D74 replaced the flat 2×2, which left the right column empty
 * (a short prize list next to a tall schedule) and broke the timezone grid.
 *
 * Data honesty (brief + J2): the running tournament, its challenge and the
 * closing schedule are the REAL Torneo #2 facts (D72); prizes and winner stay
 * SAMPLE data, flagged INLINE with a `sampleTag` chip on their blocks (D73).
 * The closing schedule is STATIC on purpose: no client island and no date to
 * expire (D56/D71/D72), so it never reads "00:00:00".
 *
 * Motion: `.reveal-left` per beat with `--i` — the SAME entrance as the
 * section above (#como-funciona, D69/D72). CSS-only, no islands. The schedule
 * times use Sora `tabular-nums` (monospaced figures with the single allowed
 * typeface — R58/R59) instead of adding a mono font.
 */
export default async function Tournaments() {
  const messages = await getMessages();
  const { h2, copy, sampleTag, active, timer, prizes, hallOfFame } =
    messages.tournaments;

  return (
    <section
      id="torneos"
      aria-labelledby="torneos-heading"
      data-surface="light"
      data-header-tint="true"
      className="relative isolate overflow-clip bg-mist py-20 text-ink lg:py-32"
    >
      <TimelineRail tone="mist" step={timelineStep("torneos")} />
      <span aria-hidden="true" className="section-sheen" />
      <span aria-hidden="true" className="section-idle section-idle-ember" />
      <div className="page-container">
        <div className="pl-7 md:pl-14 lg:pl-20 xl:pl-24 text-drift">
          <h2
            id="torneos-heading"
            className="reveal-left text-h2 font-bold text-ink text-balance lg:text-h2-lg"
          >
            {h2}
          </h2>
          <p
            className="reveal-left mt-6 max-w-[65ch] text-body text-slate lg:text-lead"
          >
            {copy}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-x-12">
            {/* 1 · The running tournament (real data, D72) */}
            <article
              className="reveal-left line-idle line-idle-ember relative border-t border-ink/15 pt-6 lg:col-span-7"
            >
              <p className="flex items-center gap-2 text-label font-semibold uppercase text-slate">
                <span aria-hidden="true" className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-activity absolute inline-flex h-full w-full rounded-full bg-ember" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
                </span>
                {active.label}
              </p>
              <h3 className="mt-3 text-h3 font-semibold text-balance text-ink lg:text-h3-lg">
                {active.title}
              </h3>
              <p className="mt-3 max-w-prose text-body text-slate">
                {active.challenge}
              </p>
              {/* Live remaining time (D80, the site's 2nd client island): it
                  fills the gap between the challenge and the CTA. It shows an
                  honest "closed" line after the deadline instead of 00:00:00;
                  with JS off it stays as dashes and the heading + the timezone
                  table of the closing band below still state the closing time. */}
              <Countdown
                targetIso={timer.closesAtIso}
                labels={timer.countdown}
                surface="light"
              />
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                <DiscordCta size="nav" label={active.cta} surface="light" />
                <span className="text-small text-slate">{active.status}</span>
              </div>
            </article>

            {/* 2 & 4 · Prizes over hall of fame, stacked in the 5-col column
                (D74): the two short blocks fill the active card's height. */}
            <div className="flex flex-col gap-10 lg:col-span-5 lg:justify-between">
              <div
                className="reveal-left line-idle line-idle-ember relative border-t border-ink/15 pt-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <p className="flex items-center gap-2 text-label font-semibold uppercase text-slate">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember" />
                    {prizes.label}
                  </p>
                  <span className="rounded-full bg-ember px-2.5 py-0.5 text-label font-semibold uppercase text-ink">
                    {sampleTag}
                  </span>
                </div>
                <ul className="mt-4 divide-y divide-ink/15">
                  {prizes.items.map((item) => (
                    <li
                      key={item.place}
                      className="flex items-baseline gap-4 py-4"
                    >
                      <span className="w-8 shrink-0 text-lead font-bold text-ink">
                        {item.place}
                      </span>
                      <span className="text-body text-ink">
                        {item.reward}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="reveal-left line-idle line-idle-ember relative border-t border-ink/15 pt-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <p className="flex items-center gap-2 text-label font-semibold uppercase text-slate">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember" />
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
                        <p className="text-body font-semibold text-ink">
                          {winner.handle}
                        </p>
                        <p className="text-small text-slate">
                          {winner.edition} · {winner.outcome}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-body text-slate">
                    {hallOfFame.empty}
                  </p>
                )}
              </div>
            </div>

            {/* 3 · The closing schedule (real data, D72) as a full-width band
                (D74): the timezone grid gets room and the time never wraps. */}
            <div
              className="reveal-left line-idle line-idle-ember relative border-t border-ink/15 pt-6 lg:col-span-12"
            >
              <p className="flex items-center gap-2 text-label font-semibold uppercase text-slate">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember" />
                {timer.label}
              </p>
              <p className="mt-3 text-balance text-lead font-semibold tabular-nums text-ink">
                {timer.heading}
              </p>
              <p className="mt-2 max-w-prose text-small text-slate">
                {timer.note}
              </p>
              <dl className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                {timer.zones.map((zone) => (
                  <div
                    key={zone.region}
                    className="flex items-baseline justify-between gap-4 border-b border-ink/15 pb-3"
                  >
                    <dt className="min-w-0 text-small text-slate">
                      {zone.region}
                    </dt>
                    <dd className="whitespace-nowrap text-small font-semibold tabular-nums text-ink">
                      {zone.closing}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
