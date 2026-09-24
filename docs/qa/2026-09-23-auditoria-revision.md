# Review audit — 23/09/2026

> **Mode:** review (D124). Agents: `rules-auditor` + `seo-perf` + `qa-access`, in **read-only**
> on the frozen state. Model: `deepseek/deepseek-flash` (fallback, `opencode-go` credits
> exhausted). This document is the consolidated summary; the fixes applied are in D125/D126 of
> `docs/DECISIONES.md`.

## Verdict

High-level code, **incomplete delivery package**. Blocker: **there is no deploy of this repo and
`site.url` points to a third-party domain**.

| Category | Status | Evidence |
|---|---|---|
| `tsc --noEmit` / ESLint / `next build` | ✅ green | build of 23/09 |
| SEO (code) | ✅ after fixes | metadata/OG/JSON-LD/sitemap reviewed |
| Accessibility (code) | ✅ 100 in the last measurement (22/09) | `docs/qa/2026-09-22/` |
| Performance | ❌ **Perf 76** (< 90 base / < 95 gate) in the only measurement (localhost, 22/09, pre-redesign) | `docs/qa/2026-09-22/lighthouse/mobile-01.report.json` |
| Deliverables R02/R03/R04 | ❌ pending | no real URL, no screenshots, no Lighthouse on deploy |

## Critical findings and their status

| # | Finding | Criterion | Status |
|---|---|---|---|
| 1 | `content.ts:316` `site.url` = `un dominio placeholder ajeno` ("a third-party placeholder domain") serves the website of ANOTHER participant (verified); `techtojob-landing.vercel.app` also belongs to someone else | R02/R49/R50/R51/R52 | ✅ **CLOSED** — real deploy at `https://techtojob-concurso.vercel.app` and `site.url` fixed (D129); canonical/hreflang/OG/sitemap/JSON-LD verified |
| 2 | No desktop/mobile screenshots | R03/J3 | **OPEN** |
| 3 | Mobile Lighthouse = Perf 76, measured on localhost and pre-redesign | R61/J6 | **OPEN** — re-measure on the deploy |
| 4 | `loading="lazy"` on the hero image | R56 | ✅ fixed (`Hero.tsx`) |
| 5 | Zero measurement of the current state | R61 | **OPEN** |

## Fixes applied in this pass (D125/D126)

- **Perf:** i18n provider with only `newsletter`; `HeaderSurface` → `IntersectionObserver`;
  `Countdown` pauses offscreen/hidden tab; 7 `will-change` removed.
- **A11y:** `animation-delay: 0s` in the reduced-motion guard; newsletter input border at 3:1 (1.4.11);
  `newsletter-status` removed from `aria-describedby`; `Ticker` pauses on hover.
- **SEO:** localized OG `alt` (`generateImageMetadata`) and `twitter:image` to `…/og`; Twitter
  `site`/`creator`; JSON-LD `@graph` Organization+WebSite with `@id` and **PNG** logo (Google ignores SVG);
  `x-default`; sitemap only ES with fixed `lastmod`; security headers.
- **Content/J2:** testimonials without Lorem ipsum; H1 line 1 with the positioning phrase (R38);
  honest News CTAs with their destination (Discord).
- **UX/R45:** nav and footer «Empresas» → `#empresas`.
- **J4:** `IconArrowRight` removed.

## Pending declared acceptance (do not block but cost points)

- `will-change` removed: may require re-measuring compositing of `.hero-facet`/door if INP
  worsens (not expected).
- `.line-idle` animates `background-position` (1px repaint per element): left as is due to
  negligible cost versus the risk of visual regression; candidate to optimize if Perf does not rise.
- Ticker: pauses on `hover` + reduced-motion guard; being decorative (`aria-hidden`) it has no
  visible control (2.2.2 covered by hover + reduced-motion).
- Pre-existing technical debt: `Messages` type written by hand; inert `--i`; `hallOfFame.empty`
  unreachable with the current catalog.

## Process note

The current Lighthouse/Playwright evidence is from **22/09** and does **not** cover the
subsequent redesign (Hero V7, Newsletter D100–D107, Closing D121–D123). It must be re-measured **on the deploy**
before closing Phase 5.

## Close 23/09 (evening)

- **R02 closed:** deploy at `https://techtojob-concurso.vercel.app`; `site.url` fixed (D129).
  The **SEO 92** measured by Lorena in DevTools is attributed to the canonical/hreflang pointing to the
  third-party domain; with the fix it should return to 100 (re-measured with Lighthouse CLI).
- **Responsive (D130/D131):** smaller steppers and links on mobile; hero at 100vh from `md`.
- **Pending measurement:** Lighthouse **mobile + desktop** on the deploy and responsive screenshots
  (next step of Phase 5).
