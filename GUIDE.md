# GUIDE — TechToJob Landing project map

> Process document: how this deliverable was planned, built and audited.
> Updated: 23/09/2026.

## 1. What this is

Landing page for the **TechToJob Tournament #2** (prize: a job offer). The code, the
commit history and this documentation are part of the jury's evaluation: we prioritized
"what scores well with a technical jury" over "what is fastest to do".

- Stack required by the rules: Next.js (App Router) + TypeScript + Tailwind — frontend + SEO only.
- Site language: Spanish. Identifiers, commits and technical docs: English/Spanish according to
  the rules' "code in English" rule.

## 2. Phases and status

| Phase | What | Status |
|---|---|---|
| 1. Specification | Contest rules → `specs/` (checklist of 61 rules, landing spec, content, requirements, rubric) | ✅ 22/09 |
| 2. Design system | Tailwind tokens, palette, typography, use of the official logo → `docs/design-system.md` | ✅ 22/09 |
| 3. Build | Scaffold + 9 sections (Audiencias unifies Talento+Empresas, D75) + content-as-data layer + metadata/OG/JSON-LD/sitemap/robots | ✅ 22/09 · reviewed 23/09 |
| 4. Audit | rules-auditor (61 rules, verbatim citation) + R35/R56 fixes + Lighthouse + QA screenshots | ✅ 22/09 (evidence in `docs/qa/`) |
| 4b. Hardening + RE-audit | Re-audit the 61 rules + Lighthouse + Playwright/axe over the final state | 🔄 **23/09:** read-only audit run (`rules-auditor` + `seo-perf` + `qa-access`) and critical fixes applied (D125/D126); Lighthouse/screenshots on the deploy still pending |
| 5. Delivery | Public repo + deploy + message to the ENTREGAS channel with AI disclosure and screenshots | ⏳ **blocking:** set the real URL in `content.ts` (`site.url` currently points to a third-party domain) → screenshots + Lighthouse + ENTREGAS message |

### 2.0 Where we resume (close of the 23/09 session)

- **23/09 (D125/D126) · strict audit applied.** `rules-auditor`, `seo-perf` and `qa-access`
  ran in **read-only** mode over the frozen state. **Blocking finding:** `content.ts:316`
  (`site.url`) points to `a third-party placeholder domain`, which **today serves the site of ANOTHER participant**
  (and `techtojob-landing.vercel.app` also belongs to someone else); **there is no deploy of this repo**, so
  canonical/OG/sitemap/JSON-LD point outside. **It is not deliverable until the real URL is set.**
  Applied: `loading="lazy"` outside the hero (R56), `animation-delay: 0s` in the reduced-motion guard,
  i18n provider trimmed to `newsletter`, `HeaderSurface` with `IntersectionObserver`, `Countdown` with
  offscreen/hidden-tab pause, 7 `will-change` removed, localized `og:image:alt`, JSON-LD
  `@graph` Organization+WebSite + PNG logo, `x-default`, sitemap ES-only with fixed `lastmod`, security
  headers, testimonials without Lorem ipsum, H1 with the positioning phrase (R38), nav/footer
  "Empresas" → `#empresas`, `IconArrowRight` removed. `/en` stays `noindex` (D126). `tsc`+ESLint+`next build` in green.

> **DESIGN CLOSED (D88/D98/D100–D107, 23/09): Hero → Newsletter.** The sections **Hero, Cómo
> funciona, Torneos, Audiencias, Networking, Testimonios (D89/D90), Noticias (D98) and Newsletter
> (D100–D107)** are frozen: **they are not touched again without a new decision.**
> The **Cierre (`#unete`) went through several rounds on 23/09** —wireframe globe and net (D108–D120),
> reticle + constellation, **all discarded**— until the final version **D121/D122** (100vh + "the
> door" + hero lights + brand sign-off + shared ticker), which Lorena **approved** ("design
> fully approved, I love everything"). After that, the
> **deliverable (Phase 5)** and, once Lorena says *"let's review"*, the audit gate (D56).

- **Hero, header and footer: approved by Lorena.** There is a **local return point `hero-v1`**
  (D60) on commit `b18c3e1`; the hero is not touched again without a new decision.
- **"Cómo funciona": DESIGN CLOSED (23/09, D66–D69) and REOPENED that same day with D70** (Lorena asked
  "what is it missing to win?"): text at 8 cols to close the title↔text gap and the result as a
  hierarchy anchor. The node→title connector that was tried was **rejected and removed**. **It is not
  touched again without a new decision** (points 5, `lg` rhythm, and 6, signature, remain for the review gate).
- **Torneos: REDESIGNED (23/09, D71), with real data (D72), polished (D73), rebalanced (D74) and
  final `mist` surface (D87). DESIGN CLOSED (D88).** It stops being `h2 + paragraph` and becomes **4 pillars**:
  real tournament (`Torneo #2 — la landing de TechToJob` + Discord CTA) in 7 cols with **prize and hall of
  fame stacked** in 5 (chip `Ejemplo`), and **real full-width close** with a time-zone table (static,
  Sora `tabular-nums`). Entries with `.reveal-left` (the same as `#como-funciona`). No new islands.
- **Audiencias (Talento + Empresas): CLOSED (23/09, D75–D79), approved by Lorena.** The two
  stacked sections merge into ONE split over `mist` (two `paper` cells with badge `1`/`2`,
  icon in a tile, scannable lists), SEO H2, intro without echo and honest microcopy ("Se hace dentro del
  Discord."). The CTAs anchor to `#unete`; nav and footer point to `#talento`. The jury pass (D79)
  aligned the Empresas CTA label ("Publicar vacante"), gave the icons presence and cleaned up dead
  code (`--i`).**It is not touched again without a new decision.**
- **Torneos: live countdown added (D80)** in the gap of the tournament card (between the challenge and the
  CTA): `Countdown`, the site's 2nd client island, with the state "Entregas cerradas." on expiry.
  **Pending from the review gate:** responsive screenshots and contrast (J3/J6).
- **Networking: asymmetric redesign (D81)** — the monolithic paragraph becomes title + `lg:sticky` intro
  on the left and three blocks on the right (channels by area as pills, replies in minutes
  with a `brand` activity dot, and the hidden market as anchor). **The `paper` tone is kept** by
  Lorena's decision; hovers only by opacity. Content in `messages.networking` (R36).
  **Pending from the review gate:** responsive screenshots 360/768/1024/1440 and contrast (J3/J6).
- **Networking: real content + ember + isotipo (D82/D83)** — the 4 invented pills become the
  **8 real Discord areas** (`#Development`, `#Data & AI`…), with a note on channel/role access;
  `ember` dot on each eyebrow, official isotipo under the title and `.reveal-enter` entry in the
  sticky column. **D85:** the right column enters with `.reveal-left`.
- **Global motion + chromatic rhythm + idle life (D84/D85/D86/D87)** — text drift with the scroll
  (`.text-drift`, 7 sections), ambient thread per section (`.section-idle`), **Torneos `mist`** and
  **Audiencias `ink`** (CTA with `surface`), **Testimonios `mist`** (the same light blue as Torneos:
  `mist` `#f4f7f7`, NOT `brand-soft`, which stays reserved and unused — D87) and idle glows of lines and
  borders (`.line-idle`/`.card-idle`) with **`ember`** accent in Torneos (glints + dots + pulse on
  "Torneo en curso"). Details in `design-system.md` §3/§3.1/§7/§9 and `DECISIONS.md` D82–D87.
- **Testimonios: marquee + band + watermarks + nav (D89/D90, 23/09)** — the section leaves the bento
  7/5/5/7 and becomes a **pure-CSS full-bleed horizontal slider** over `mist`, inside a **`brand-soft`
  band** (hairlines, shadow and relief; the edge fade applies only to the cards).
  Duplicated track `−50%` with `REPEAT=3` (no gaps on any viewport), pause on `hover`/`focus`
  + CSS-only control, `paper` cards (`ink/10` border), `.reveal`/`.reveal-left`, two `ember` dots
  and a closing link to Discord (text, R11). The **watermarks** of Hero, Audiencias (new) and
  Cierre go from `logo-symbol-gradient` to `logo-symbol-light` at **6%**. `#newsletter` joins the
  **desktop nav** (`xl` tier). Details in `DECISIONS.md` D89/D90 and `design-system.md`
  §6.4/§7/§9. `tsc` + ESLint + `next build` in green.
- **Newsletter redesigned end to end (D100–D107, 23/09) — section CLOSED, only your
  visual sign-off pending.** At Lorena's request the solid `brand` strip is removed: the section becomes
  **`ink`** and the whole block lives in **ONE Bento panel** `coal` + hairline (D100), with the 7/5 grid and
  vertical hairline (D101). The form is remade as a **"console" column**: label overline,
  full-width input (`border-white/40` = 3.37:1, WCAG 1.4.11) and **full-width square
  button** (D101 — the `rounded-lg` of D100 was reverted on seeing it on screen). The message stops being
  a paragraph and becomes a **scannable structure** with the same words as the approved copy: lead +
  `<ul>` of 3 items + a "no filler and no spam" seal (D107). Motion: **panel entry**
  (`.panel-in`), **idle glint of the filled CTAs** (`.cta-glint`) and **halo of the rail nodes**
  (`.node-flash`, with each family's own accent and phase staggered by `--i`) (D103/D105); the
  **entry/exit slows down** (entry 22%→38%) and then **the exit is shortened** (plateau 84%→92%)
  (D102/D106); and **ornament is pruned** from the panel (`.card-idle` and the top border glint removed,
  D104). Also, "Cómo funciona" and "Torneos" lower their type scale with `.section-tight` (D102).
  Zero new copy, zero new islands, zero colors outside the palette. `tsc` + ESLint + `next build`
  in green.
- **CIERRE (`#unete`): "100vh + the door + hero lights + brand sign-off + ticker" (D121/D122,
  23/09) — ✅ APPROVED by Lorena ("design fully approved, I love everything").** After several
  discarded exploratory rounds (wireframe globe and net, D108–D120; then reticle +
  constellation), the final state is: a **single-screen** section (`min-h-svh`, centered content) with
  **the hero's faceted lights** reused as-is, the **"the door"** gesture (two `ink` leaves
  with a `brand` edge that open with the scroll, short range and `pointer-events-none`), the **brand
  sign-off** (large official isotipo inside a ring of light that spins and breathes) and, as the last row,
  the **shared `Ticker`** (the same component that closes the hero, `hidden sm:block`) so the
  page opens and closes with the same band. Centered text with its bidirectional reveal intact. Zero
  new colors, zero `filter: blur`, zero client islands. **Registered refactor:** the ticker was
  extracted to `components/Ticker.tsx` touching the hero (frozen in D88) without changing a pixel (D122).
  `tsc` + ESLint + `next build` in green. **Last tweak (D123):** the left fade of the
  Testimonios slider now starts at the **timeline**, not at the page edge.
  **Pending from the "let's review" gate:** screenshots 360/768/1024/1440 and confirming that the Cierre does not
  exceed one screen.
- **NEXT SESSION (handoff, D124): HARDENING + TRACEABILITY + AUDIT.** The design is **approved**,
  so we return to the full gate and prepare the deliverable. Suggested order:
  0. **⏰ Watch the Tournament #2 closing date** (real data, D72): deadline **Thursday 24 · 00:00
     Mexico → 08:00 Spain**. Today is Wednesday 23, so **the deliverable comes first**: if time
     is tight, deliver with what is already green and close the audit afterwards.
  1. **Freeze commit** of the approved state (current working tree: Hero/Closing/Ticker/
     Testimonials/TimelineRail, `globals.css`, docs and specs) so the verdict points to a SHA.
  2. **PART 0 · Traceability with the RULES and the BRIEF** (Lorena's express request): re-read
     `material-concurso/bases-concurso.txt` and `material-concurso/brief.md` (local material, outside
     git) and check, **requirement by requirement**, that (a) **all** the rules of the rules are
     captured in `specs/00-rules-checklist.md` (R01–R61) and that their **verbatim quotes are faithful**,
     (b) no **requirement of the brief** is left uncovered in `specs/10`/`specs/20`, (c) what is delivered
     meets the **delivery format** of the rules (what is sent, where and with what AI disclosure,
     R07), and (d) **there are no invented requirements** (nothing in `specs/` without a source in the rules or the brief).
     Expected output: a **rules/brief → spec → implementation → evidence** matrix with the gaps
     marked. Any gap is presented to Lorena with options (rule D124) **before** touching anything.
  3. **Re-audit of the 61 rules** (rules-auditor, verbatim citation) over the frozen state — the
     `docs/qa/` evidence is from 22/09 and does not cover the later redesign.
  4. **Lighthouse + screenshots 360/768/1024/1440 + contrast** (qa-access/seo-perf) and CWV
     measurement (LCP/CLS/INP).
  5. **Functional test plan** (anchors, CTAs, form, marquee, keyboard, reduced-motion).
  6. **Close declared pending items**: R22 ("at risk": narrative reorder + README disclosure),
     EN translation (D57), hand-written `Messages` type, inert `--i`.
  7. **Phase 5**: public repo → Vercel deploy with the real URL in `content.ts` → Lighthouse/screenshots
     on the deploy → message to the ENTREGAS channel with the AI disclosure (R07).
  **Rule for changes (D124):** any finding is presented to Lorena **with design-equivalent
  options** and is only executed with her OK. Code starting point:
  `Closing.tsx` + `Ticker.tsx` + `globals.css` (D121–D123 blocks) and `docs/DECISIONS.md` D121–D124.
- **Current freeze:** **Hero → Networking closed** (D88); not touched without a new decision. Recorded
  exception: **Audiencias** received the watermark in D90 at express request (decoration only).
  **Noticias** (D98) and **Newsletter** (D100–D107) are also closed. The **Cierre (D121/D122/D123)**
  is **closed and approved by Lorena**. From the next session the **review mode (D124)** applies:
  6 agents and full gate, with the rule that every design change is consulted and offered with
  equivalent options.
- **Then, Phase 5 (deliverable):** public repo on GitHub → Vercel deploy with the real URL in `content.ts`
  (`site.url`) → Lighthouse/screenshots → message to the ENTREGAS channel with the AI disclosure (R07).
- **Declared pending item:** the **EN translation** (D57) — the handoff is ready in
  `specs/12-i18n.md` and `/en` today serves the ES catalog as a declared placeholder (which is why
  `messages/en.json` keeps the text in Spanish, including the new `items`/`seal`).
- **Declared technical debt (for the "let's review" gate):** (1) the `Messages` type is a
  **hand-written interface in `content.ts`**, not derived from `es.json`: every catalog change
  requires extending it (happened in D107); (2) the `style={{ "--i": n }}` left on `.reveal` elements
  are inert (the range went back to full `cover` in D77): they only serve `.bento-lit`/`.step-node-fill`.
  *(Debt (3) —`stroke-dashoffset` in the Cierre arcs— was **closed by removing that layer in
  D121**: today the motion catalog has no paint properties.)*
- **Commits (23/09, newsletter session):** `7f8d2a6` (`feat(newsletter): bento panel, console form
  and scannable message`) and `4325e02` (`design(motion): slower reveals, shorter exit, cta glint and
  rail node flash`), plus the documentation commit that closes this record
  (`docs: record D100-D107 and sync design system, specs and guide`). Working tree **clean**;
  **no push** (`master` is ahead of `origin/master`; the remote was not touched).
  Tag `hero-v1` on `b18c3e1`.

### 2.1 Current working mode (D124, 23/09) — REVIEW MODE

**Active rule:** with the design **approved by Lorena**, we return to the **full gate**. **D124
supersedes D56** (the "fast mode" of 3 agents remains as history).

- **Active:** the 6 roles — orchestrator, `design-ux`, `nextjs-builder`, `rules-auditor`, `qa-access`
  and `seo-perf` — plus Lighthouse, Playwright/axe and QA screenshots.
- **Applicable gate (AGENTS.md, "Minimum required quality"):** Lighthouse ≥95 in Performance, SEO and
  Accessibility (mobile and desktop); WCAG 2.1 AA; responsive at 360/768/1024/1440; CWV
  (LCP < 2.5s, CLS < 0.1, low INP); `tsc` without errors and clean ESLint.
- **Owner's rule for changes:** any finding that requires touching the design is presented
  **with design-equivalent options** and **only executed with her OK** (D124).
- **Session goal:** (a) freeze/commit the approved state; (b) re-audit the **61 rules**
  with verbatim citation (the `docs/qa/` evidence is from 22/09 and does **not** cover the later redesign:
  Hero V7, Newsletter D100-D107, Cierre D108-D123); (c) Lighthouse + screenshots 360/768/1024/1440 +
  contrast; (d) functional test plan; (e) close declared pending items (**R22 at risk**,
  EN translation of D57, `Messages` type debt).

> Historical note: the following block describes the fast mode D56 that was in force until today.
> **Rule that was active until Lorena said "let's review":** we worked with **3 agents** and
> **zero audits** in all tasks and phases, including Phase 5.

- **Active (no longer):** orchestrator (specs, decisions, coordination), `design-ux` (visual criteria and
  copy) and `nextjs-builder` (the only hand that writes in `app/`).
- **Dormant until review mode (now awake):** `rules-auditor`, `qa-access`, `seo-perf`,
  Lighthouse, Playwright/axe, INP measurement and QA screenshots. The agents are not deleted: they remain
  defined in `.opencode/agent/` with their prompt and model intact.
- **Allowed:** `tsc --noEmit`, ESLint and `next build` (seconds; they prevent committing broken code).
- **Reason stated by Lorena:** the audit cycles took longer than the change itself.
- **Supersedes D28 and D39** (which paused QA only while the design was not frozen); the
  "QA paused (D39)" closings of the previous iterations remain as history.
- **Assumed consequence:** Phase 5 closes without Lighthouse/Playwright measurement; on activating
  review mode those checks run in a single pass over the frozen state.

> **Pending (22/09):** the landing is reordered and reads as a **vertical timeline** (D32).
> The hero went through two more iterations the same day: **D34 "Cosmos en tinta"** (wall of floating
> decorative tiles + nav pill + symbol above the H1) and **D35 "Recruit en tinta"** (H1 split
> into two editorial lines, glows at 50%, tiles at 60%, anchor-pills + stack wall, mirrored
> close). The graph field is always active again (the `SHOW_GRAPH` flag was removed).
> Everything is implemented and compiling (`tsc` + ESLint + `next build` in green), but **QA paused
> by Lorena's decision (D28)**: no Playwright/Lighthouse/`rules-auditor` until her
> explicit authorization → the canvas INP, the glow contrasts and the
> re-audit of R22 (reorder) and R11 (anchor-pills vs "a single button") remain unmeasured. The
> orchestrator implemented it due to `opencode-go` credit exhaustion (D29). The reorder disclosure for
> the README (R10) is drafted in D32 and goes up in Phase 5.
>
> **Pending (22/09, D38 "Bento Signature"):** at Lorena's request, the body sections
> stop being uniform (`h2 + paragraph`) and gain rhythm with the 2026 trend language:
> **ticker** marquee under the hero + **asymmetric bento** in "Cómo funciona" (7+5+5+12),
> Testimonios (7/5/5/7) and Noticias (featured + 2), all pure CSS (zero client islands),
> Sora-only, fixed palette and `prefers-reduced-motion`. Talento / Empresas / Networking stay
> editorial (they have no items: converting them would force inventing copy). Implemented and
> compiling (`tsc` + ESLint + `next build` in green) by the orchestrator (exception D29).
> **QA paused (D28):** no Playwright/Lighthouse/`rules-auditor` until your OK → the ticker
> INP, the bento contrasts and the re-audit of R11 (ticker non-button)
> and R26 (green as text) remain unmeasured.
>
> **Done (22/09 night, D40 "Plano Cinético"):** hero redesign request (mesh with blurred
> stains + floating tournament images). **It was not implemented literally** because it clashes with
> D37.1 (forbidden "blobs/aurora gradients" and "floating particles"), with R24/R25 (violet/
> cyan/`#0B0F19`/`#F9FAFB` outside the fixed palette) and with J2 (there are no real tournament photos).
> It was reinterpreted with vocabulary allowed by D37.1: scroll-driven hairline reticle field,
> `brand` light beam with hard edges, bracket-style marginalia, H1 reveal by word
> (transform-only) and a continuous kinetic underline under the accent phrase. Spec in `specs/10`
> (§Hero V6). Implemented by `nextjs-builder` in `Hero.tsx` + `globals.css`; **`tsc --noEmit`,
> ESLint and `next build` in green (22/09 close)**. Design mode (D39): no `rules-auditor`/
> `qa-access`/`seo-perf` until freeze; the H1 motion and the beam contrast are measured in the
> Phase 5 gate.
>
> **Done (22/09 night, D41 — V7 iteration):** the **overline is removed** (it stacked in 5 lines
> at `lg`), the **faceted glass combo #2** is added (`conic-gradient` with hard edge in
> `brand`/`ember` + slow rotation, zero blur) and **#4 a net that draws itself** (`HeroNetwork.tsx`, SVG
> server with `stroke-dashoffset`), and the hero **height is rebalanced** (`content-center`, reduced top
> padding, H1 at the front of the row with the marginalia). Spec in `specs/10` (§Hero V7);
> `tsc` + ESLint + `next build` in green. QA still paused (D39).
>
> **Done (22/09 night, D42/D43):** (D42) the hero support stops splitting (`lg:col-span-5`) and
> **all pill buttons become `rounded-none`** (DiscordCta, full header, newsletter,
> skip-link; the `animate-breathe` ring is removed). (D43) the **header widens**
> (`page-container-wide`, 80rem), the **hero net is removed** and in its place goes the **official
> watermark** `logo-symbol-gradient.svg` at 10% (like Torneos/Cierre), and the **CTA gains impact**
> (`brand` fill that sweeps to `line`; specular sweep + micro-elevation on the filled ones, without
> halo or blur). `tsc` + ESLint + `next build` in green. QA still paused (D39).
>
> **Done (22/09 night, D44/D45):** (D44) the **hero background grid gains continuous drift**
> of one cell in 28s, in a separate layer from the scroll pan (seamless loop, `transform` only).
> (D45) the **desktop nav box is removed** (leaving a row of links without a frame) and the
> **hero watermark goes up to 520×520**. `tsc` + ESLint + `next build` in green. QA still
> paused (D39).
>
> **Done (22/09 night, D46):** **a single Discord button style across the whole platform** —
> square `brand` fill, `ink` text, specular sweep + micro-elevation, arrow; only the size changes
> (`nav`/`hero`/`block`). The `line` variant is **removed** from the hero (it becomes `size="hero"`)
> and the `hero` button goes up to `min-h-14 px-8` for more presence. `tsc` + ESLint + `next build` in
> green. QA still paused (D39).
>
> **Done (22/09 night, D47/D47b/D48/D49):** (D47) **adaptive header** with the `HeaderSurface` island
> (the site's 2nd client island): the bar adopts the polarity of the section behind it
> (`ink`↔`paper` crossfade), the logo switches to `logo-horizontal.svg` on light and the CTA receives
> an `ink` border on light; the newsletter's `brand` strip is treated as dark. (D47b) the
> **button no longer "peeks out"** beyond the header: solid bar at 100% + dissolve strip below.
> (D48) **H1**: the **real spaces** between words are fixed (a11y/SEO bug), `lg:col-span-8`
> and line 2 shortened to *"Aquí te conocen antes de la vacante."*. (D49) **header aligned to the 72rem
> axis**, **scrollspy** (`aria-current`) and pure-CSS **progress hairline**. `tsc` + ESLint +
> `next build` in green. QA still paused (D39).
>
> **Done (22/09 night, D50):** vertical rebalance of the hero — the header's 80px crop is offset
> (`-mt-20`) by fixing `pt − pb = 80px` to center the block in the visible area, and the internal
> rhythm is unified (`support → quick-nav` at `mt-10` on mobile). `tsc` + ESLint + `next build` in
> green. QA still paused (D39).
>
> **Done (22/09 night, D51 — variant A):** the hero quick-nav becomes an **exit row** at the foot
> (main block `H1→CTA` centered in `flex-1`, nav separated with its hairline, between this one and the
> ticker's). 4rem grid and ticker intact. **Checkpoint `b796176`** created before
> experimenting → the approved design is recovered with `git revert`. `tsc` + ESLint + `next build` in
> green. QA still paused (D39).
>
> **Done (22/09 night, D52):** at Lorena's request, the **quick-nav is removed** from the hero (she didn't
> like the exit row) and the hero **closes with the ticker band**; no dead text
> (`quickNavLabel` removed). `tsc` + ESLint + `next build` in green. QA still paused (D39).

> **Done (23/09, D54/D55/D57):** (D54) **ES/EN i18n** with next-intl: `/` serves ES and `/en` serves
> EN (`as-needed`, no automatic detection), cross hreflang in metadata and sitemap, OG per
> locale, language selector as a **real link** in header and mobile panel; texts only in
> `messages/{es,en}.json` with parity enforced by types. The **real EN translation remains
> postponed (D57)** with a handoff documented in `specs/12-i18n.md`. (D55) the header logo becomes a
> **symmetric composite tile+wordmark** in both polarities, with the derivative
> `brand/wordmark-ink.svg` (same official outlines, charcoal fill) so the light state
> weighs the same as the dark one. `tsc` + ESLint + `next build` in green.

> **Done (23/09, adjustments requested by Lorena):** (D56) the cycle settles at **3 agents without
> audits** until she says "let's review". (D57) the **EN translation is postponed** with
> a handoff ready for the official team. (D58) the **footer logo** becomes the header composite in dark
> polarity (with `loading="lazy"` and decorative). (D59) the **rail and node of the Cierre are removed**,
> which is now centered, and with that the `goal` variant of `TimelineRail` is removed.
> Also, the mobile menu CTA uses the short label ("Entrar al Discord"), and the spelling
> mistake in the copy is fixed ("acuérdate"). All with `tsc` + ESLint + `next build` in green.

> **Done (23/09, D61 — "bento vivo"):** at Lorena's request, the three D38 bentos ("Cómo funciona",
> Testimonios and Noticias) gain **staggered entry** (fade-in + slide-up) and **sequential border
> illumination** (`line → brand`, hard edge without blur) on entering the viewport, and a **hover**
> of `scale-[1.02]` + contrast with `duration-300 ease-in-out`. **Option B** was chosen (no physical
> line: the D32 page rail already tracks the journey) and Framer Motion was discarded by D17/D95
> (zero UI libraries, zero client islands): everything is native CSS `animation-timeline: view()`.
> No `cursor-pointer` (the cells are not links). `tsc --noEmit` + ESLint + `next build` in green.

> **Done (23/09, D62 — "entry per element"):** at Lorena's request, the reveal stops being **per
> block** (whole section) and becomes **per element**: in the 9 body sections the "beats"
> (h2, intro, cards, CTA) appear one by one when scrolling with a fade-in + a **12px**
> offset and staggering via `--i`. Native CSS `animation-timeline: view()` (zero JS), reusing
> the `step-in` keyframe from D61; `reveal-in` removed. Hero excluded (its H1 does not fade: it is the LCP)
> and footer excluded. `tsc --noEmit` + ESLint + `next build` in green.

> **Fix (23/09, D63 — "the animations were not visible"):** Lorena reported not seeing the section
> entries. Diagnosis with a real browser (Playwright): the animations were mounted but
> (1) the `entry` range was measured over the **element height** → an h2 completed it in ~11px of
> scroll (imperceptible), and (2) `overflow-hidden` in **Torneos and Cierre** created a scroll container
> that **froze** the `view()` timeline → those sections never animated. Fix: range to the `cover` phase
> (relative to the viewport, `cover 0% → calc(20% + --i*4%)` ≈ 162–280px) and `overflow-hidden` →
> `overflow-clip`. Re-measured: the 9 sections animate and the Cierre CTA reaches opacity 1.
> `tsc --noEmit` + ESLint + `next build` in green.

> **Tweak (23/09, D64 — "sharper"):** Lorena asks for more forceful entries. Travel of
> **40px** (`translateY(2.5rem)`, formerly 12px), shorter range (`cover 12% + --i*4%`, formerly 20-28%)
> and easing `cubic-bezier(0.2, 0.9, 0.2, 1)` (formerly `linear`). Measured: the fade lasts **56–96px** of
> scroll (formerly 162–264px) with **40px** of real displacement. Only `transform`/`opacity` (CLS 0)
> and still covered by `prefers-reduced-motion`. `tsc --noEmit` + ESLint + `next build` in green.

> **Fix (23/09, D65 — visible rail):** Lorena: *"the vertical timeline is not visible"*. Measured: the
> fill DID animate (401→1358px with the scroll); the problem was contrast/thickness (base `line` 1px =
> 1.27:1; `brand` fill 1px = 2.04:1). **Global** fix in `TimelineRail`: `slate` base to **2px**
> (**5.57:1** over `paper`), `white/25` over `ink` and `ink/30` on the green strip. Verified in
> a browser (`rgb(95,106,109)`, 2px) + screenshot. Reversible with two tokens. `next build` in green.

> **Done (23/09, D66/D67/D68 — redesign of `#como-funciona`):** approved by Lorena the redesign by
> `design-ux`: the D38 bento is removed **only in this section** and becomes a **vertical stepper** that
> reuses the page rail as a track (`1.1`–`1.4` step nodes, with a **result line** per
> step and a text link to Discord; the bento stays in Testimonios/Noticias). (D66) The H2 and the
> titles use **word-by-word reveal** (the hero's `word-rise` adapted to scroll with
> `overflow-clip`, not `overflow-hidden`). (D67) rail to **3px** and section nodes (the `1,2,3…`) to
> **double circle** and **44/56px**, above the step nodes (36/48px, `ember`). (D68) the
> section entry is inverted to **from above** (`step-in-down` + `word-drop`) because the
> slide-up went in the same direction as the scroll and was not perceived. Measured at `lg`: rail 3px, section
> node 56px, step node 48px; the paragraph drops from `−40 → 0`. Note: the `prefers-reduced-motion`
> guard still turns everything off (Lorena has it active on her system → that is why she doesn't see them; it is not a bug).
> `tsc` + ESLint + `next build` in green.
>
> **Tweak (23/09, D69):** Lorena was not satisfied with the drop (D68) and chose **Option A**:
> the entire entry of `#como-funciona` becomes a **slide from the rail** (left → right,
> `translateX −40 → 0`, `.reveal-left`), as if each step came out of the timeline. The word-by-word
> reveal of the section is removed (the hero keeps its own) along with `.reveal-down`/
> `.word-drop-view`/`.word-rise-view`. Verified: no horizontal overflow.

> **Done (23/09, D70 — reopening of `#como-funciona`):** at Lorena's request ("what is it missing to be
> the undisputed winner?") and with the orchestrator's diagnosis as jury, 2 tweaks are applied:
> text to `lg:col-span-8` + `lg:gap-x-12` (closes the title↔text gap and the empty lane) and the
> description drops to `slate` while the **result** rises to `text-lead` + a `border-l-[3px] brand`
> bar (the promise leads). **Rejected the same day:** the hairline connector node→title (`step-link`/`link-lit`);
> Lorena asked to remove it ("I really don't like the line between the steppers and the title") and it was removed.
> Zero islands, zero new copy. `tsc` + ESLint + `next build` in green. Points 5–6 (`lg` rhythm and signature)
> deferred to the "let's review" gate.

> **Done (23/09, D71 — redesign of `#torneos`):** at Lorena's request, the section goes from `h2 + paragraph`
> to **4 pillars in a hairline grid over `ink`**: (1) tournament in progress (label + `h3` + challenge + CTA
> `DiscordCta size="nav"` + status), (2) **static time** Days/Hours/Minutes with `—` placeholders and
> Sora `tabular-nums` (no client island or date → never expires, D56), (3) **the prize** (`1º`/`2º` with
> `brand` numerals) and (4) **hall of fame** (example + honest empty state). All labeled with
> `mockNote` (declared mockup) so as not to invent figures, deadlines or winners (brief/J2); no third-party
> brands. Zero new islands; `tsc` + ESLint + `next build` in green. **Pending Lorena's visual
> sign-off.**

> **Done (23/09, D72 — real Tournament #2 data in `#torneos`):** Lorena provided the real closing/delivery
> announcement and chose option A. The **tournament in progress is the real one** (`Torneo #2 — la landing de
> TechToJob`) and the **time** block leaves behind the placeholders to show the **real close + time-zone
> table** (Mexico Thu 24 · 00:00 → Spain · 08:00), in **static** (today is the close: a live counter
> would be expired for the jury). Prizes and winner remain as a **declared mockup** (`mockNote`
> trimmed). Also, the entry of `#torneos` becomes **`.reveal-left`**, the same animation as
> `#como-funciona` (Lorena's request). `tsc` + ESLint + `next build` in green.

> **Done (23/09, D73 — polish of `#torneos` after jury criticism):** A + B + D are applied.
> (A) the footer `mockNote` is replaced by an **`Ejemplo` chip** (`ember`/`ink`) next to the label of
> "El botín" and "Salón de la fama", so that a quick reader does not take them as real (J2). (B) the grid
> becomes **2×2 (7/5 + 7/5)**: the close stops being inside the active card and has its own block;
> the stacked column that left a gap at the foot disappears. (D) the social proof stays honest with the chip
> and the empty state ready. **Deferred to the gate:** C (edition numeral `02`) and E (border hover).
> `tsc` + ESLint + `next build` in green.

> **Done (23/09, D74 — fix of the visible defects of `#torneos`):** on top of the screenshot, we fix
> (1) the **time-zone table** that split the time into two lines (`whitespace-nowrap` on the time,
> `min-w-0` on the region and grid `sm:2 / lg:3`), (2) the **imbalance**: row 1 becomes
> **active (7) + [prize and hall stacked] (5)** with `lg:justify-between`, and the **close goes full
> width** (`lg:col-span-12`) as a band, and (3) the **orphan headline** with `text-balance`.
> C, E and F remain deferred to the gate. `tsc` + ESLint + `next build` in green.

## 3. Sources of truth (hierarchy)

1. Official contest rules and brief (input material, not versioned for privacy).
2. `specs/` — rewritten and verifiable requirements, each with a citation of the rule (R01–R61).
3. `AGENTS.md` — process rules and quality gates.

Information gaps were recorded as questions in `docs/DECISIONS.md` (D1–D60);
nothing built was assumed without a source.

## 4. Method: spec-driven + multi-agent

No line of code was written without a prior spec, and no section was considered finished
without passing the rules auditor. The work was carried out by 6 roles (defined in
`.opencode/agent/`): orchestrator/spec, UX design, builder (the only one with permissions in `app/`),
SEO/performance, accessibility QA and relentless auditor of the rules. AI use is
disclosed in the README, as the rules require.

> Since **23/09 (D56)** the cycle was simplified to **3 roles** (orchestrator, `design-ux`,
> `nextjs-builder`) and without audits, to prioritize progress; see §2.1. When Lorena says
> "let's review", the 6 roles and the full quality gate are reactivated.

## 5. Where each piece of evidence is

| Claim | Proof |
|---|---|
| "It meets the 61 rules" | `docs/qa/2026-09-22-rules-audit-1.md` (rule → status → evidence → action) |
| "Quality measured, not promised" | `docs/qa/2026-09-23/` — PageSpeed capture (`lighthouse-mobile-pagespeed.png`), responsive 360/768/1024/1440 and design-detail screenshots; consolidated in `docs/qa/2026-09-23-review-audit.md` |
| "That measurement is honest" | `docs/qa/2026-09-23-review-audit.md` §*Measurement caveat* — the local Lighthouse CLI artifacts are excluded from the repo (D145) |
| "Why X was decided" | `docs/DECISIONS.md` (dated decision log, D1–D145) |
| "The design system is real" | `docs/design-system.md` + tokens in `app/app/globals.css` |
| "The texts live apart from the code" | `app/messages/es.json` (single source of visible copy) |
