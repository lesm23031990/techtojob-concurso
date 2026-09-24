---
name: nextjs-landing-patterns
description: Implementation patterns for the contest's Next.js + TS + Tailwind landing page (App Router, metadata, content-as-data, sections). Use when designing or writing any component or file under app/.
---

# TechToJob landing patterns

Frontend-ONLY project: SSG by default, zero APIs of our own. Next.js App Router +
TypeScript strict + Tailwind v4 (`@theme` tokens).

## Reference structure
```
app/
├── app/(landing)/page.tsx      # single page if the rules do not ask for more
├── app/content/
│   ├── site.ts                 # name, description, url, og — a single source of truth
│   └── sections/*.ts           # typed content for each section
├── app/components/
│   ├── sections/               # Hero, Programa, ComoParticipar, FAQ, CTA, Footer...
│   └── ui/                     # Button, Badge, Card... (design system primitives)
├── app/layout.tsx              # global metadata + fonts + skip-link
├── app/sitemap.ts
├── app/robots.ts
└── app/opengraph-image.tsx     # or static in public/ if the rules simplify it
```

## Pattern rules
1. **Content-as-data**: no jury-visible text hardcoded in JSX.
   Each section reads from `app/content/sections/`. The typing (interfaces or zod if
   approved) makes missing content a build error.
2. **Pure server components**: serializable props; minimal interactivity
   (mobile menus, FAQ accordions native with <details> before useState).
3. **Centralized metadata**: a route layout defines the title template
   (`%s | TechToJob`) and description from site.ts.
4. **Tokens, not literals**: colors/spacing/fonts from the design system
   (`bg-brand`, `text-ink-900`...). The only raw values allowed: standard
   Tailwind layout utilities.
5. **Sections = components + spec**: each file in sections/ starts (only if
   the why is not obvious) with a reference to the checklist rule that justifies it.
6. **Images**: next/image with fixed dimensions or aspect-ratio container (CLS=0).
7. **FAQ**: use styled <details>/<summary> — free a11y and less JS. If the
   rules require content SEO, the FAQPage JSON-LD is only valid if the content
   is actually visible.
8. **The jury footer**: credit/branding that the rules require goes in content/site.ts
   and is audited literally against the checklist.

## Project-specific anti-patterns
- useState for something CSS or <details> solves.
- animation libraries if CSS keyframes + IntersectionObserver suffice.
- "use client" in the root layout (kills SSG for the tree).
- OG tags outside the Metadata API (duplication that diverges).
