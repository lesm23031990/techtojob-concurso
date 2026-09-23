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
 * Structure (D71): four sober pillars on a hairline, square, shadow-free
 * grid — the running tournament (with its CTA), a STATIC time slot, the
 * prizes list and the hall of fame. Asymmetric on purpose: the active card
 * takes 7 columns and the two right blocks stack in the remaining 5.
 *
 * Data honesty (brief + J2): the contest's bases forbid invented figures,
 * deadlines and hiring promises, so every value here is SAMPLE data and the
 * section says so out loud (`mockNote`, same pattern as Testimonios/Noticias).
 * The time block ships placeholders on purpose: no date and no client island
 * (D56/D71), so it can never read "00:00:00" after a deadline.
 *
 * Motion: `.reveal` per beat with `--i` (D62/D64); CSS-only, no islands.
 * The countdown digits use Sora `tabular-nums` (monospaced figures with the
 * single allowed typeface — R58/R59) instead of adding a mono font.
 */
export default async function Tournaments() {
  const messages = await getMessages();
  const { h2, copy, mockNote, active, timer, prizes, hallOfFame } =
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
            className="reveal text-h2 font-bold text-brand text-balance lg:text-h2-lg"
            style={{ "--i": 0 } as CSSProperties}
          >
            {h2}
          </h2>
          <p
            className="reveal mt-6 max-w-[65ch] text-body text-cloud lg:text-lead"
            style={{ "--i": 1 } as CSSProperties}
          >
            {copy}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-x-12">
            {/* 1 · The running tournament */}
            <article
              className="reveal border-t border-hairline-dark pt-6 lg:col-span-7"
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

              {/* 2 · The time — STATIC by design (D71): no date, no island. */}
              <div className="mt-8 border-t border-hairline-dark pt-6">
                <p className="text-label font-semibold uppercase text-cloud">
                  {timer.label}
                </p>
                <ul className="mt-3 flex gap-8">
                  {timer.units.map((unit) => (
                    <li key={unit.name}>
                      <span className="block text-h2 font-bold tabular-nums text-paper">
                        {unit.value}
                      </span>
                      <span className="mt-1 block text-label uppercase text-cloud">
                        {unit.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <div className="flex flex-col gap-10 lg:col-span-5">
              {/* 3 · The prizes */}
              <div
                className="reveal border-t border-hairline-dark pt-6"
                style={{ "--i": 3 } as CSSProperties}
              >
                <p className="text-label font-semibold uppercase text-cloud">
                  {prizes.label}
                </p>
                <ul className="mt-4 divide-y divide-hairline-dark border-t border-hairline-dark">
                  {prizes.items.map((item) => (
                    <li
                      key={item.place}
                      className="flex items-baseline gap-4 py-4"
                    >
                      <span className="w-8 shrink-0 text-lead font-bold text-brand">
                        {item.place}
                      </span>
                      <span className="text-body text-paper">
                        {item.reward}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4 · The hall of fame (social proof) */}
              <div
                className="reveal border-t border-hairline-dark pt-6"
                style={{ "--i": 4 } as CSSProperties}
              >
                <p className="text-label font-semibold uppercase text-cloud">
                  {hallOfFame.label}
                </p>
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
                  <p className="mt-4 text-body text-cloud">
                    {hallOfFame.empty}
                  </p>
                )}
              </div>
            </div>
          </div>

          <p
            className="reveal mt-12 border-t border-hairline-dark pt-6 text-small text-cloud"
            style={{ "--i": 5 } as CSSProperties}
          >
            {mockNote}
          </p>
        </div>
      </div>
    </section>
  );
}
