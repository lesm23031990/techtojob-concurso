# TechToJob — Landing page (Tournament #2 entry)

Single-page landing for the TechToJob community, built with the stack required
by the contest rules: **Next.js (App Router) + strict TypeScript + Tailwind
v4**. Static generation only — no APIs, no database, no backend of any kind.

## What is where

| Path | Purpose |
| --- | --- |
| `messages/es.json` | **All visible Spanish text** (contest rule: texts centralized, i18n-ready). Components contain zero user-facing strings. |
| `content.ts` | Typed mirror of `es.json` (compile-time error if a key is missing) + nav/JSON-LD helpers. |
| `app/layout.tsx` | `lang="es"`, Metadata API (title template, OG, Twitter card), Sora via `next/font`, skip link, JSON-LD `Organization`. |
| `app/page.tsx` | Composes the 10 sections in spec order inside `<main>`. |
| `components/sections/` | One component per landing section (Hero → Closing). |
| `components/` | `SiteHeader`, `SiteFooter`, `Section` (semantic wrapper), `DiscordCta`, `NewsletterForm` (the **only** client component), `icons`. |
| `app/icon.svg` | Favicon (brand symbol, ASCII-safe name). |
| `app/opengraph-image.tsx` | 1200×630 OG card generated at build time with `ImageResponse`. |
| `app/sitemap.ts` / `app/robots.ts` | SEO endpoints, root URL only (single page). |
| `public/brand/` | Official TechToJob SVG assets renamed per the design system (§2.1). |
| `fonts/` | Sora static TTFs (latin subset) used only by the OG image renderer. |

## Design system

Tokens (colors, type scale, radius, shadows) live in `app/globals.css` under
`@theme` and mirror `docs/design-system.md` — which itself encodes the fixed
brand palette (`#2f3436` / `#84c0bf` / `#ffffff`) and the WCAG-verified
color-pair table. Green is never used as text on white.

## Asset & code sources (disclosure)

- **Logos**: official TechToJob brand kit provided in the contest channel
  (`material-concurso/marca/TechToJob/`), renamed to ASCII-safe filenames.
- **Typography**: Sora from Google Fonts via `next/font/google` (3 weights).
- **Icons**: hand-written inline SVGs whose geometry follows the
  [Lucide](https://lucide.dev) icon set (ISC license). No icon library is
  installed; the four glyphs used are in `components/icons.tsx`.
- **Copy**: original writing following the official brief (no template text).
- **AI assistance** was used during development, as permitted by the bases
  when declared at submission.

## Scripts

```bash
npm run dev    # local dev server
npm run build  # production static build
npm run lint   # ESLint
npx tsc --noEmit
```
