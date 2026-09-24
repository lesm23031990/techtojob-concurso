# TechToJob Concurso — Landing Page

## Project context

A contest whose prize is a **job offer**. The deliverable is a landing page.
The code, the repo and the commit history ARE part of the jury's evaluation.

**Golden rule:** every technical or design decision is made by asking
"what scores well with a technical jury?" — not "what is fastest to do".

## Mandatory stack (defined by the contest rules)

- Next.js (App Router) + strict TypeScript
- Tailwind CSS
- Local deploy in Phase 3 (the delivery target is confirmed in `specs/`)

## Sources of truth (hierarchy)

1. `material-concurso/bases/` — official contest rules (NEVER contradict them)
2. `specs/` — derived and approved specifications
3. `AGENTS.md` — this file (process rules)

If two sources conflict: **the rules win**, and the conflict is recorded in `docs/DECISIONES.md`.

## Non-negotiable rules

### Scope
- This contest is **frontend + SEO only**. There is NO backend of our own in this project:
  no APIs, no databases, no Node servers. Everything dynamic is client-side
  or Next.js static generation (SSG/ISR).
- Do not invent requirements: if a rule is not in `material-concurso/`, it does NOT exist.
  When in doubt, ask Lorena, don't assume.

### Public repo (the jury will read it)
- `material-concurso/` is in `.gitignore` — it NEVER enters the repo (Discord screenshots
  with usernames and third-party messages). Only rewritten requirements go out to `specs/`,
  with no personal data or third-party graphic material.
- Small, frequent commits, conventional message (`feat:`, `fix:`, `design:`, `seo:`, `docs:`...).
  Forbidden: "initial commit" with 80 files, force-push, empty messages.
- Never secrets, tokens or personal emails in code, commits or history.
- No LICENSE file until ownership of the code is confirmed in the rules.

### Minimum required quality (gate for every deliverable)
> This gate is **NOT run by default**. It is only activated when Lorena says "let's review"
> (see *Fast mode* below). It is the bar the deliverable must reach at that moment, not a
> task for every change.

- Lighthouse ≥ 95 in Performance, SEO and Accessibility (mobile and desktop)
- WCAG 2.1 AA accessibility: HTML semantics, ARIA roles where appropriate, contrast,
  keyboard navigation, real `alt` text, correct heading hierarchy
- Verified mobile-first responsive design (360px, 768px, 1024px, 1440px)
- TypeScript without `any`, no `tsc --noEmit` errors, clean ESLint
- Server Components by default; `"use client"` only where justified
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, low INP; fonts with `next/font`;
  images with `next/image`
- Complete Metadata API + Open Graph + JSON-LD + `sitemap.ts` + `robots.ts`

### Process (SDD: spec-driven development)
- No code without a spec written in `specs/`. Phase order:
  1. Ingest the Discord material → `specs/`
  2. Design system → `docs/design-system.md` + Tailwind tokens
  3. Next.js scaffold in `app/`
  4. Implementation by sections (in review mode: `rules-auditor` + `qa-access`)
  5. SEO polish + QA evidence in `docs/qa/` + final README (review mode only)

### Working roles
- The agents and their permissions are defined in `opencode.json` + `.opencode/agent/`.
- `rules-auditor` and `qa-access` do NOT edit code: they only audit and report to `docs/qa/`.
- `nextjs-builder` is the only one that writes in `app/`. Recorded exception: D29
  (`opencode-go` credits exhausted), where the orchestrator implemented directly.
- Audit reports quote verbatim the contest rule that motivates each finding.
- **Working mode (historical):** during the design iteration we worked in **fast mode**
  (D56) —3 roles: orchestrator, `design-ux` and `nextjs-builder`— to avoid slowing progress.
  **When review was reactivated (D124)** the full pass of `rules-auditor`,
  `seo-perf` and `qa-access` ran over the final state; findings and fixes in
  `docs/qa/2026-09-23-auditoria-revision.md` and `docs/DECISIONES.md` (D125–D139). The deliverable
  closes with the **"Minimum required quality"** gate verified.
- `rules-auditor` and `qa-access` **do not edit code**: they audit and report to `docs/qa/`.
  `nextjs-builder` is the hand that writes in `app/`.

### Agent models (dual architecture)
- **Primary: `opencode-go`**, with each agent's fine-tuned model (kimi-k3 for the builder,
  glm-5.3 for design, qwen3.8-flash for spec/QA/audit/SEO).
- **Fallback: `deepseek/deepseek-flash`**, only while `opencode-go` credits are
  exhausted. It is a fallback of **availability**, not quality: agents keep their prompt,
  permissions and temperature.
- Switch: `node scripts/set-agent-models.mjs opencode-go|deepseek|status [--dry-run]`.
- opencode **does not hot-reload the config**: after changing mode you must restart opencode.
- The evidence in `docs/qa/` must state which model it was generated with.

## Repository structure

```
techtojob-concurso/
├── AGENTS.md                 ← general rules (this file)
├── GUIA.md                   ← living map: status, phases, Discord checklist
├── opencode.json             ← agents + MCPs
├── .opencode/
│   ├── agent/                ← prompts for the 6 agents
│   └── skills/               ← project skills
├── material-concurso/        ← 🚫 OUT OF GIT: Lorena deposits the Discord here
│   ├── bases/                ←   rules, requirements, dates (txt/pdf/screenshots)
│   ├── criterios/            ←   evaluation weighting
│   ├── marca/                ←   logos, palettes, typography
│   └── capturas/             ←   screenshots of channel posts
├── specs/                    ← PHASE 2: verifiable specifications
├── docs/                     ← decisions, design system, QA evidence
│   └── qa/
└── app/                      ← PHASE 3-4: Next.js project (create-next-app)
```

## Current status

**PHASES 1–5 completed (23/09/2026):** specs with 61 traced rules, design system with tokens
(`docs/design-system.md`), full landing page in `app/` (Next.js App Router + strict TS + Tailwind,
11 sections + technical SEO) and **published deliverable**: public repo
(`github.com/lesm23031990/techtojob-concurso`) + deploy at
**https://techtojob-concurso.vercel.app**.

**Final verification (on the deploy):** `tsc --noEmit`, ESLint and `next build` in green; Lighthouse
**mobile** with **SEO 100 · Accessibility 100 · Best Practices 100**. Screenshot evidence
(360/768/1024/1440) and reports in `docs/qa/2026-09-23/`.

**Working mode:** "fast mode" (D56) served to iterate the design with 3 roles; when
review was reactivated (D124), `rules-auditor`, `seo-perf` and `qa-access` ran over the final state, with
findings and fixes in `docs/qa/2026-09-23-auditoria-revision.md` and `docs/DECISIONES.md` (D125–D139).
