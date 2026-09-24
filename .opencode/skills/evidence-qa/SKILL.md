---
name: evidence-qa
description: Generates and organizes quality evidence for the contest deliverable (Lighthouse/axe/Playwright reports in docs/qa and the repo README). Use when closing each phase, section or release.
---

# QA evidence for the deliverable

The jury does not see our work sessions: it sees the repo. The evidence in `docs/qa/`
and the README IS the quality report. If it is not documented, it does not exist.

## Folder convention
```
docs/qa/YYYY-MM-DD/
├── REPORTE.md              # see structure below
├── lighthouse-<view>.json  # or summary md if too heavy
├── 360.png / 768.png / 1024.png / 1440.png
├── axe.md
└── AUDITORIA-REGLAS.md     # rules-auditor output
```

## Minimum REPORTE.md
- Commit audited (`git rev-parse --short HEAD`) and build command.
- Lighthouse table: category | mobile | desktop (target ≥95 AGENTS.md).
- axe table: rule | impact | state.
- Console errors: none = state it explicitly.
- Captures attached with relative path (they render on GitHub).
- Verdict: PASS / FAIL + prioritized findings.

## Repo README.md (jury-facing, polished in PHASE 5)
Target structure: contest context → stack → captures (the table
"how it looks" with the images from docs/qa) → highlighted technical decisions
(why SSG, why content-as-data) → SEO implemented (metadata,
JSON-LD, sitemap: what a tech jury would want to read) → a11y and perf with
numbers → how to run locally (npm i && npm run dev) → folder structure.
The README is a sales page for the work itself: the same copy rigor
as the landing page.

## Rules
- Never replace old reports: only add a folder with the new date
  (the improvement history is ALSO evidence).
- Numbers without a date/commit do not count as proof.
- Before declaring any phase complete: verify that the evidence
  for that phase exists and is linked from REPORTE.md.
