import type { CSSProperties } from "react";
import Section from "@/components/Section";
import { getMessages } from "next-intl/server";
import { IconArrowUpRight } from "@/components/icons";

/**
 * "Cómo funciona" (timeline step 1, #como-funciona) — the detailed journey
 * (R12): four numbered milestones.
 *
 * Layout (D66, supersedes the D38 bento for THIS section only): a vertical
 * stepper that REUSES the page-wide rail as its track — no second line is
 * drawn. Each `<li>` carries a step node (`1.1`…`1.4`) positioned over the rail
 * by cancelling the `Section` indent (`-left-7 md:-left-14 lg:-left-20
 * xl:-left-24`), so the rail reads `1 → 1.1 1.2 1.3 1.4 → 2`. The section node
 * (circle `1`) is kept: that is the convention of every section.
 *
 * Every step states WHAT YOU GET (the `result` line, `brand` left bar) and the
 * journey closes with a descriptive text link to the Discord — a LINK, never a
 * button (R11). One column on purpose: a journey reads top-to-bottom, which an
 * asymmetric grid was fighting (the old bento left ~350px of dead space).
 *
 * Layout (D70, reopens D66–D69): the copy column runs to grid column 12 (no
 * empty lane between title and text) and the RESULT becomes the visual anchor
 * (`lead` + 3px `brand` bar) while the description drops to `slate`, so the
 * promise outranks the explanation. The node→step connector proposed in D70
 * was REJECTED by Lorena and removed on 23/09: the rail is not linked to the
 * headings by a hairline.
 *
 * Motion (D69, supersedes D62→D68 for this section): every text block enters
 * with `.reveal-left` — it slides in FROM THE RAIL (left → right), so each step
 * looks like it comes off the timeline. The node's inner fill lights up with
 * `.step-node-fill` and the page rail keeps its `brand` progress fill. All
 * native scroll-driven CSS, `--i` passed inline from this Server Component — no
 * client island, no library. Without `animation-timeline` or with
 * `prefers-reduced-motion` everything shows at its final state.
 *
 * Semantics: a real `<ol>` keeps the sequence, so the nodes/numeral are
 * decorative (`aria-hidden`); the visible label of each step is its `<h3>`
 * (R32/R41/R42).
 */
export default async function HowItWorks() {
  const messages = await getMessages();
  const { h2, intro, steps, closing, cta } = messages.howItWorks;

  return (
    <Section
      id="como-funciona"
      headingId="como-funciona-heading"
      tone="paper"
      className="section-tight"
    >
      <h2
        id="como-funciona-heading"
        className="reveal-left text-h2 font-bold text-balance lg:text-h2-lg"
      >
        {h2}
      </h2>
      <p
        className="reveal-left mt-4 max-w-prose text-lead text-slate"
      >
        {intro}
      </p>

      <ol className="relative mt-12 flex flex-col lg:mt-16">
        {steps.map((step, index) => (
          <li
            key={step.title}
            /* `--i` is inherited by the node fill and by the .reveal-left inside. */
            style={{ "--i": index } as CSSProperties}
            className={`relative border-t border-line py-8 first:border-t-0 lg:py-10${index > 0 ? " line-idle line-idle-sm" : ""}`}
          >
            {/* Step node on the page rail (decorative: order lives in the <ol>).
                Round, double-circle (outer ring + inner disc with a paper gap)
                and bigger than the section marker so the steps read first. The
                `ember` accent is the one "loud" colour the fixed palette allows
                (R25); ink numeral on ember = 6.12:1 (R26-safe). */}
            <span
              aria-hidden="true"
              className="step-node absolute top-6 -left-7 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full border-2 border-ember bg-paper md:-left-14 lg:top-8 lg:-left-20 lg:h-12 lg:w-12 lg:border-[3px] xl:-left-24"
            >
              <span className="step-node-fill absolute inset-[3px] rounded-full bg-ember lg:inset-[6px]" />
              <span className="relative z-10 text-[0.65rem] leading-none font-bold text-ink lg:text-small">
                {`1.${index + 1}`}
              </span>
            </span>

            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
              <h3 className="reveal-left text-h3 font-semibold text-balance lg:col-span-4 lg:text-h3-lg">
                {step.title}
              </h3>
              {/* D70: the copy runs to column 12 (no empty lane, no dead space)
                  and the RESULT is the visual anchor — description drops to
                  `slate`, the promise takes `lead` + a 3px `brand` bar. */}
              <div className="reveal-left mt-3 lg:col-span-8 lg:mt-0">
                <p className="max-w-prose text-body text-slate">{step.text}</p>
                <p className="mt-4 max-w-prose border-l-[3px] border-brand pl-3 text-lead font-semibold text-ink">
                  {step.result}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p
        className="reveal-left line-idle line-idle-sm relative mt-12 border-t border-line pt-6 text-lead font-semibold"
      >
        {closing}
      </p>
      <a
        href={messages.discord.url}
        target="_blank"
        rel="noopener noreferrer"
        className="reveal-left mt-4 inline-flex min-h-11 items-center gap-1.5 text-small font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4 hover:decoration-3 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink sm:text-body"
      >
        {cta}
        <IconArrowUpRight className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">{messages.a11y.newTabHint}</span>
      </a>
    </Section>
  );
}
