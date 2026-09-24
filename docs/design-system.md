# Design System — TechToJob · Torneo #2 Landing

> Author: `design-ux` · 22/09/2026 · Executor: `nextjs-builder` (this doc does NOT contain component code, only tokens and decisions).
> Sources: `specs/00-rules-checklist.md` (R24–R28, R34–R36, R59), `specs/10-landing-spec.md`, `specs/11-content.md`, `material-concurso/bases/brief.md`, logos inspected in `material-concurso/marca/TechToJob/`.
> Naming rule (R35): EVERY token, variable, class and comment in English. The visible Spanish content lives in `messages/es.json` (R36) — this doc references sections, never strings.

---

## 0. Brand reading (what we saw in the logos)

Real visual inspection of the 12 PNGs + measurements:

| Family | What it is | Ratio | Chromatic variants (verified) |
|---|---|---|---|
| `v1` | Icon + **horizontal** wordmark on one line | 4619×684 ≈ **6.75:1** (very wide) | Positive = charcoal `#2f3436` · Black = pure black · Negative = **solid green `#84c0bf`** (for dark background) · Gradient = charcoal→green diagonal |
| `v2` | Icon on the left + **stacked** "Tech / to / Job" wordmark in 3 lines | 2558×1418 ≈ **1.8:1** (almost square) | same 4 variants |
| `Símbolo` | **icon only** (node/network of 4 rounded arms with a central connection gap — reads as "connection between people", consistent with the community positioning) | 1151×1151 = 1:1 | same 4 variants |

Findings that condition the decisions:

1. **"Negative" is NOT white**: it is the green `#84c0bf` version. On a dark `#2f3436` background the green gives **6.17:1** → it is the correct variant for dark sections. There is no white version of the logo: if one were ever needed on pure black, a CSS `brightness-0 invert` filter is used (not expected on this landing).
2. **v1 is too wide for mobile**: at 32px tall it measures ~216px wide. At 360px that leaves ~100px for the rest of the nav → on mobile the `Símbolo` is used (see table §2).
3. **v2 is the natural lockup for almost-square formats** (OG 1200×630, hero with vertical space).
4. **Filename problem**: `Símbolo*` carries an accent (`í` → `%C3%AD` in URLs, friction with git/scripts/deploy tools) and **`SVG/SímboloBlack .svg` has a space before the extension**. Also "Positivo/Negativo/Black/Degradado" are in Spanish and describe the background, not the use → hard to read in English code (R35).

### 2.1 Recommended ASCII rename (builder when copying to `app/public/`)

| Source (`material-concurso/marca/TechToJob/SVG/`) | Destination `app/public/brand/` |
|---|---|
| `v1Positivo.svg` | `logo-horizontal.svg` |
| `v1Negativo.svg` | `logo-horizontal-light.svg` |
| `v1Black.svg` | `logo-horizontal-black.svg` |
| `v1Degradado.svg` | `logo-horizontal-gradient.svg` |
| `v2Positivo.svg` | `logo-stacked.svg` |
| `v2Negativo.svg` | `logo-stacked-light.svg` |
| `v2Black.svg` | `logo-stacked-black.svg` |
| `v2Degradado.svg` | `logo-stacked-gradient.svg` |
| `SímboloPositivo.svg` | `logo-symbol.svg` |
| `SímboloNegativo.svg` | `logo-symbol-light.svg` |
| `SímboloBlack .svg` ⚠️ (space) | `logo-symbol-black.svg` |
| `SímboloDegradado.svg` | `logo-symbol-gradient.svg` |

Rule: `-light` = for dark background (the green variant). SVG always at runtime; PNG/PDF only as dead files in the contest repo, they do NOT enter `app/`.

### 2.2 Header composite — exact measurements and classes (light-state review, D47)

The header is the only place where the logo is NOT a single asset: it is a composite of two pieces
(tile + wordmark) so that both polarities have the same visual weight. The measurements are
identical in `dark` and `light`; only the icon's `src` and the color tokens change:

| Piece | Common classes | Surface `ink` (dark) | Surface `paper` (light) |
|---|---|---|---|
| Container | `flex items-center gap-2.5` | — | — |
| Tile | `grid h-10 w-10 shrink-0 place-items-center rounded-none` | `border border-brand/40 bg-white/5` | `border border-brand bg-ink/5` |
| Icon (`priority`, `alt=""`) | `h-6 w-6` (24px) | `brand/logo-symbol-light.svg` (green `#84c0bf`) | `brand/logo-symbol.svg` (charcoal `#303436`) |
| Wordmark (`priority`, `alt=""`) | `h-5 w-auto sm:h-6`, `width=178 height=24` | `brand/wordmark-duo.svg` (`paper` + `brand`) | `brand/wordmark-ink-duo.svg` (ink `#303436` + `brand`, with a thin ink outline on the green letters — D97) |

Measured ratios (WCAG 2.1): charcoal icon on `paper` **12.58:1** ✅ · charcoal wordmark on
`paper` **12.58:1** ✅ · solid `brand` border on `paper` **2.04:1** (decorative: the tile conveys no
information; the accessible name is the link's `aria-label`). The dark tile's border
(`brand/40` on `ink`) measures **2.23:1**; that is why in light mode the border goes **without alpha** — the
same `brand/40` diluted on white would fall to 1.31:1 and the frame would disappear. It is the only
asymmetric adjustment, and it is for perceived parity, not caprice.

`wordmark-ink.svg` is a **documented derivative** (same criterion as `wordmark-duo.svg`, D31):
identical outlines and `viewBox` (`176 26 934 126`), the `fill`s set to charcoal `#303436`. No official
file is altered. It is noted in the README (§Sources and credits, R9).

---

## 2. Logo usage table by location

| # | Location | Exact file (destination) | Background | Justification |
|---|---|---|---|---|
| a | **Navbar** | **Adaptive (D47), symmetric composite**: `data-header-surface="dark"` → icon `brand/logo-symbol-light.svg` (green SímboloNegativo) in tile `h-10 w-10 rounded-none border-brand/40 bg-white/5` + `brand/wordmark-duo.svg` ("Tech" `paper`, "ToJob" `brand`). `data-header-surface="light"` → **the SAME composition in light polarity** (D47 review requested by Lorena): official icon `brand/logo-symbol.svg` (charcoal Positive) in tile `h-10 w-10 rounded-none border-brand bg-ink/5` + `brand/wordmark-ink.svg` (charcoal monochrome derivative). Exact measurements and ratios in §2.2 | `ink`/`paper` depending on the section | Each surface uses the correct OFFICIAL variant: Positive on light, Negative on dark (the mark is not recolored, it is chosen). `wordmark-duo.svg` **does not work on light**: its "Tech" half is `#ffffff` → **1.00:1** on `paper` (invisible), it is not a simple logo exception; and the green "ToJob" would give 2.04:1, forbidden by R26 (§3.1 #10). On light, the green stays **only on the tile border** (decorative detail, allowed by R26). Both polarities share tile `h-10 w-10`, wordmark `h-5 sm:h-6` and `gap-2.5` → identical weight (228px at `sm`). Accessible name via the link's `aria-label`; images `alt=""` |
| b | **Hero** | `brand/logo-symbol-light.svg` (green symbol) as a decorative watermark at 6% (D90, same as Audiences and Closing) + dominant CTA. **The lockup is NOT repeated**: the wordmark already lives in the nav and the H1 is real text (R39, R40) | dark `ink` | Duplicating the logo in the hero would compete with the single CTA (R11). The corner watermark gives identity without stealing hierarchy |
| c | **Footer** | **The same header composite in its dark polarity (D58)**: official icon `brand/logo-symbol-light.svg` (green Negative) in tile `h-10 w-10 rounded-none border-brand/40 bg-white/5` + `brand/wordmark-duo.svg` ("Tech" `paper`, "ToJob" `brand`), `gap-2.5`, wordmark `h-5 sm:h-6` | dark `ink` | Green on charcoal = 6.17:1 ✅. It previously used `logo-horizontal-light.svg` (32px) and read as a different brand from the nav one; the composite matches weight and brand reading with the header (author's request, D58). Decorative: wrapper `aria-hidden="true"`, images `alt=""` and `loading="lazy"` (R56, below the fold — **not** `priority` like the header). `logo-horizontal-light.svg` stays in the official kit, now unused on the web |
| d | **Favicon** | `brand/logo-symbol.svg` → `icon.svg` (Next `app/icon.svg`); PNG fallback: `logo-symbol.svg` exported to 180×180 on white background for `apple-touch-icon.png` and to 512×512 with `brand` background and charcoal symbol for `icon-512.png` (maskable) | — | The square symbol is the only variant legible at 16–32px. Charcoal on the browser's white ✅; never Gradient in the favicon (the dark bands disappear at thumbnail size) |
| e | **Open Graph 1200×630** | New static composition `app/opengraph-image.png` (builder exports it, <200 KB): `ink` background; `brand/logo-stacked-light.svg` (v2Negative) on the left occupying ~45% of the height; on the right the hero H1 in white Sora 700 + a support line; `logo-symbol-gradient.svg` semi-transparent as texture in the bottom-right corner | dark `ink` | v2 (1.8:1) is the only lockup that fills the OG format well without looking tiny; green on charcoal readable at Facebook/X thumbnail; verify on opengraph.xyz (R51) |
| f | **Watermark / background** | `brand/logo-symbol-light.svg` (solid green) at **6% opacity** in Hero, Audiences and Closing (D90; it was previously the `logo-symbol-gradient` at 10%), `aria-hidden`, `pointer-events-none`, `loading="lazy"`, decorative. **Tournaments and Testimonials do NOT carry it** (light surfaces, D87) | dark `ink` | Reinforces identity without text in an image (R39) or LCP cost (decorative, not `priority`). On `ink` the charcoal→green gradient left half the mark invisible; the green symbol at 6% reads subtly (D90). On light sections there is NO watermark (it competes with the text) |

---

## 3. Color tokens (Tailwind v4 `@theme`)

Mandatory base palette (R24) + intermediate grays and ONE accent (R25). Names in English (R35).

```css
@theme {
  /* ── Base (fixed by contest rules R24) ── */
  --color-ink:    #2f3436;  /* carbon — dark surfaces, primary text on light */
  --color-brand:  #84c0bf;  /* teal green — buttons, dark-section accents    */
  --color-paper:  #ffffff;  /* light surfaces                                 */

  /* ── Brand state shade (same hue, hover only — not a new color) ── */
  --color-brand-deep: #6faeae; /* hover/active fill of brand buttons          */

  /* ── Brand light tint (RESERVED, unused — D87) ──
     D85 introduced it as Torneos' surface, but D87 retired it: Torneos and
     Testimonios both use `mist` (the light blue Lorena approved). Kept defined
     (a brand tint, not a new hue — R24/R25) in case it is revisited; no
     section references it today. */
  --color-brand-soft: #dcefee; /* reserved brand tint (unused, D87)           */

  /* ── Intermediate grays (allowed by R25) ── */
  --color-mist:   #f4f7f7;  /* tinted light section background                */
  --color-line:   #dfe6e6;  /* borders/dividers on light surfaces             */
  --color-slate:  #5f6a6d;  /* secondary text on light surfaces               */
  --color-cloud:  #c3cdcd;  /* secondary text on dark surfaces                */
  --color-coal:   #3a4144;  /* raised card surface on ink background          */
  --color-hairline-dark: rgba(255,255,255,0.12); /* dividers on ink           */

  /* ── Single accent (allowed by R25, support only) ── */
  --color-ember:  #f4a261;  /* warm amber: decorative fills, chips, highlights */
}
```

**Role of the `ember` accent (own criterion + R25):** it warms the design and gives a third reading plane (news categories, data underlines, the avatar's visual "gap"). **Never as a text color on `paper`** (ratio 2.06:1 ❌) nor as the sole state indicator. Its two allowed uses: (1) chip/small-label background with `ink` text on top (6.12:1 ✅), (2) non-informative decorative detail (category dot, icon stroke next to ink text). **D78:** it also appears as a decorative dot in the marginalia and the hero ticker (on `ink`), as a dot before the Audiences eyebrows and as the background of the Companies `2` badge (`ink`: 6.12:1).

**`brand-soft` tint (D85 → RETIRED in D87):** it was added as the "light blue" surface of Tournaments,
but Lorena confirmed that the correct blue is **`mist` (#f4f7f7)**, the one Testimonials had. Since
**D87** neither Tournaments nor Testimonials use it (both on `mist`, §7). The token remains **reserved** (same
hue as `brand` lightened; R24/R25) with no section referencing it.

### 3.1 Text/background combination table (calculated ratios, WCAG 2.1)

| # | Foreground | Background | Ratio | AA normal (≥4.5) | AA large/UI (≥3.0) | Usage verdict |
|---|---|---|---|---|---|---|
| 1 | `ink` | `paper` | **12.62** | ✅ | ✅ | Standard reading text on light sections |
| 2 | `ink` | `mist` | **11.71** | ✅ | ✅ | Text on tinted sections |
| 3 | `ink` | `brand` | **6.17** | ✅ | ✅ | **Text on green buttons** (and on the `brand` strip while it existed; since D100 the green is no longer a section surface). D85 recalculation: it used to say 6.77 — it is the same pair as row 9, which already marked 6.17 |
| 4 | `ink` | `ember` | **6.12** | ✅ | ✅ | Text on category chips |
| 5 | `slate` | `paper` | **5.57** | ✅ | ✅ | Secondary text, roles, dates |
| 6 | `slate` | `mist` | **5.17** | ✅ | ✅ | Secondary on tinted sections |
| 7 | `paper` | `ink` | **12.62** | ✅ | ✅ | Text on dark sections |
| 8 | `cloud` | `ink` | **7.77** | ✅ | ✅ | Secondary on dark (do not use pure white in paragraphs: it glares) |
| 9 | `brand` | `ink` | **6.17** | ✅ | ✅ | **ONLY destination of green as text**: links/emphasis on dark sections. Also UI components ≥3:1 ✅ |
| 10 | `brand` | `paper` | **2.04** | ❌ | ❌ | **FORBIDDEN**: green as text or as the only color of an interactive control on a light background, at ANY size (fails even large 3:1). Literal quote from the rules (R26): "el verde sobre blanco no llega al mínimo para texto pequeño. Úsalo en fondos, botones y detalles, no en párrafos" |
| 11 | `paper` | `brand` | **2.04** | ❌ | ❌ | **FORBIDDEN**: white text on a green button/strip. Text on green is ALWAYS `ink` |
| 12 | `ember` | `paper` | **2.06** | ❌ | ❌ | Accent never as text; only background or ornament (§3) |
| 13 | `ink` | `brand-deep` | **5.01** | ✅ | ✅ | Hover of primary buttons (D85 recalculation; previously 5.06) |
| 14 | `paper` | `coal` | **10.40** | ✅ | ✅ | Raised cards on dark sections (D85 recalculation; previously 10.9). `cloud` on `coal`: **6.40**; `brand` on `coal`: **5.09** |
| 15 | `ink` | `brand-soft` | **10.58** | ✅ | ✅ | Reading text in **Tournaments** (replaces `paper`/`cloud` from the dark scheme) |
| 16 | `slate` | `brand-soft` | **4.68** | ✅ | ✅ | Secondary in **Tournaments**. Just passes 4.5: for long paragraphs prefer `ink` |
| 17 | `brand` | `brand-soft` | **1.72** | ❌ | ❌ | **FORBIDDEN**: green as text on its own light tint (R26). The Tournaments h2 goes in `ink` |
| 18 | `brand-deep` | `brand-soft` | **2.11** | ❌ | ❌ | Not even the shade works as text on the tint |
| 19 | `ember` | `brand-soft` | **1.73** | ❌ | ❌ | The accent still cannot be text (§3); in Tournaments only as a chip **background** with `ink` (6.12) |
| 20 | `line` | `brand-soft` | **1.06** | — | — | `line` disappears on `brand-soft`: **do NOT use it as a divider**. Base rail `slate` on `brand-soft` = 4.68 ✅ |
| 21 | `cloud` | `coal` | **6.40** | ✅ | ✅ | Secondary and newsletter copy on the card (D100) |
| 22 | `cloud/80` | `coal` | **4.73** | ✅ | ✅ | Trust note under the input (D100) |
| 23 | `cloud/70` | `ink` | **4.64** | ✅ | ✅ | Newsletter input placeholder (D100) |
| 24 | `white/40` (**border**) | `ink` | **3.37** | — | ✅ | Form control boundary (newsletter input, D100): meets WCAG **1.4.11** (≥3:1). The same border at `white/25` would fall to 2.19:1 ❌ |

> **D87:** rows 15–20 document ratios of the **`brand-soft` token, currently UNUSED** (Tournaments and
> Testimonials run on `mist`, rows 2 and 6). They are kept as reference in case the tint is revisited.

> **Recalculation note (D85):** ratios recomputed with the WCAG 2.1 formula (sRGB). Rows 3, 13 and 14
> are corrected, which were slightly high. Code comments that still cite
> `6.77`/`5.06` must be aligned to `6.17`/`5.01` in the next `nextjs-builder` pass.

### 3.2 Explicit verdict of green (summary for rules-auditor)

`#84c0bf` enters the page in only three ways, all AA:
1. **As a background** (primary button with `ink` text 6.77:1; numbered step circles; newsletter button since D100).
2. **As text/emphasis ONLY on `ink`** (6.17:1 — links, large numbers, active underlines in dark sections).
3. **As a decorative detail** on any background (strokes, watermark, avatar border), where it does not convey information by itself.
On `paper`: green is never text, never the sole state of a control (focus ring on light is `ink`, on dark is `brand`).

---

## 4. Typography — Sora (fixed, R28/R58/R59)

`next/font/google` → `Sora({ subsets: ['latin'], weight: ['400','600','700'], display: 'swap' })`. **One family, three weights, not one more** (R59). Variable `--font-sora` → `font-sans` classes (map Sora as the default sans).

| Weight | Role (English in code) |
|---|---|
| **400** | `body` — paragraphs, testimonial quotes, step texts |
| **600** | `ui` — nav, buttons, labels, testimonial roles, news metadata, h3 |
| **700** | `display` — h1, h2, large step numbers, card headlines |

### Mobile-first scale (mobile by default → `md:`/`lg:` desktop)

| Token | Mobile (≥360) | Desktop (≥1024) | Line-height | Tracking | Usage |
|---|---|---|---|---|---|
| `display` (h1, unique on the page, R40) | 3rem / 48px | 4.5rem / 72px | 1.05 (mobile) · 1.0 (desktop) | −0.04em | Hero. `text-balance` |
| `h2` | 1.75rem / 28px | 2.5rem / 40px | 1.15 | −0.015em | Section title. `text-balance` |
| `h3` | 1.25rem / 20px | 1.5rem / 24px | 1.3 | −0.01em | Cards, steps, news |
| `lead` | 1.125rem / 18px | 1.25rem / 20px | 1.55 | 0 | Hero sub, intros |
| `body` | 1rem / 16px | 1rem / 16px | 1.65 | 0 | Paragraphs; max measure 65ch |
| `small` | 0.875rem / 14px | 0.875rem / 14px | 1.5 | 0 | Notes, footer, roles |
| `label` (overline) | 0.75rem / 12px | 0.75rem / 12px | 1.4 | +0.08em, `uppercase`, weight 600 | News categories, section eyebrows |

Performance note: 3 weights = 3 woff2 files per subset via `next/font` (latin); no `italic` (the content does not use it) → do not request it.

Scale note: the `display` row was rescaled on 22/09 for the hero redesign (premium minimalism, D27 in `docs/DECISIONS.md`): the H1 becomes the visual center of gravity of the first screen.

Global scale note (D99): the root becomes `font-size: 94%`, so **the entire** scale above shrinks ~6% uniformly (Tailwind v4 is `rem`). It is the chosen way to bring the design closer to the "90% zoom" that Lorena preferred, without dropping `body` below 15px or the overlines below ~11px. Effect on tokens: `display` desktop ≈67.7px, `h2` ≈37.6px, `body` ≈15px, `small` ≈13.2px, `label` ≈11.3px; the 44px targets end up at ≈41px (above the AA minimum of 24px). Sora and its 3 weights are untouched (R24/R28/R58/R59).

---

## 5. Spacing, layout, radius and shadows

### Grid and container
- **Maximum container:** `72rem` (1152px), centered (`mx-auto`).
- **Gutters:** mobile `1.25rem` (20px) · `md:` `2rem` · `lg:` `2.5rem`. At 360px the content never touches the edge.
- **Verification breakpoints (J3):** 360 / 768 / 1024 / 1440 — Tailwind defaults (`sm 640, md 768, lg 1024, xl 1280`).
- **Grids per section (sync D38 "Bento Signature" + D66):** "how it works" → **single-column vertical stepper** (D66; the bento was retired only here) · testimonials → **full-bleed horizontal marquee** on a `brand-soft` band with fixed-width cards, no bento (D89/D90) · news `7 (row-span 2) + 5 + 5` from `lg` (featured full width on `sm`) · footer `1 → sm:2 → lg:4` blocks. The "how it works" sub-timeline (D32) is retired: its rail is reused as the stepper track.
- **Timeline rail (D32 · D65 · D67):** axis at the left edge of the `page-container` (same gutter metrics), **3px** (`w-[3px]`) and `slate` base (**5.57:1** on `paper`; the original 1px `line` #dfe6e6 gave 1.27:1 and was invisible), `inset-y-0` per section so the line is continuous. On `ink` the base is `white/25` and on the `brand` strip, `ink/30`; the progress fill remains `brand`. On `brand-soft` (Tournaments, D85) the base is also `slate` (**4.68:1**) and the node gap uses `bg-brand-soft` to blend with the surface. The **section node** is a **double circle** with a `brand` disc of **44px mobile / 56px `lg`** (larger than the stepper's `1.x` step nodes, 36/48px, D67). The content is indented to let it pass: `pl-7 md:pl-14 lg:pl-20 xl:pl-24` (at 360px ~288px remain usable). Rail and nodes are decorative (`aria-hidden`). **Exception (D59):** the Closing **no longer** draws a rail — the author's request was to remove the line and node from that section, so the rail runs from "How it works" to "Newsletter" and the Closing block is centered, without indentation. **D100:** the `brand` variant (rail `ink/30`, fill/node `ink`, created only for the green strip) is **unused**: Newsletter moves to `ink` and uses the standard dark variant (`white/25` + `brand`).

### Vertical scale (rhythm between sections)
```css
@theme {
  --spacing-section-y: 5rem;    /* section py on mobile */
}
```
Desktop (`lg:`): `8rem`. Sticky nav of `5rem` (80px, `header-veil`). Hero: `min-height: 100svh` with **the whole block centered as a single piece** (H1 + sub + CTA + support, centered `flex` + `pt-20` that compensates the header and `pb-0` so the center is that of the visible area). We tried pinning only the H1 to the center line with a `1fr/auto/1fr` grid: **it was reverted the same day** because the block reads as a unit and it looked off (D33). No fixed `100vh`: `svh` avoids the mobile URL bar jump → CLS. The hero rises with `-mt-20` to sit **behind** the header (seamless transition).

### Radius
| Element | Token | Value |
|---|---|---|
| Buttons (primary and secondary) | `rounded-none` | Straight corners — square editorial language (D36/D42). The pill was discarded: there are no pill buttons left (only the avatar, the rail node and the ticker dots are round). **D100 proposed `rounded-lg` for the newsletter button and D101 reverted it** upon seeing it on screen: it was the only rounded piece on the site. Today **all** buttons are square |
| Cards (testimonial, news) | `--radius-card` | 1rem (16px) |
| Inputs | `--radius-input` | 0.625rem (10px) |
| Chips / badges | `rounded-full` | pill |
| Bento cells (D38) | `rounded-none` | Straight corners + 1px hairline border, no shadow — editorial continuity with the `rounded-none` CTA (D36/D46). In testimonials, news and the audiences section (two `coal` cells on `ink` since D85); in "how it works" the bento was retired (D66) |

### Shadows (subtle — R34 "must not get in the way")
```css
@theme {
  --shadow-card: 0 1px 2px rgb(47 52 54 / 0.05), 0 8px 24px -12px rgb(47 52 54 / 0.12);
  --shadow-raised: 0 2px 4px rgb(47 52 54 / 0.06), 0 16px 32px -12px rgb(47 52 54 / 0.18);
}
```
- `card` by default on cards over `paper`/`mist`; `raised` ONLY on hover of a card with a link.
- **On `ink` surfaces: zero shadows** (invisible); separate with surface `--color-coal` + `hairline-dark` border.
- **CTA (D42/D43/D46):** a single style across the site — filled square `brand`, `ink` text, hard-edge specular sweep (`-skew-x-12 bg-white/30`) + micro-elevation `-translate-y-0.5` on hover. No projected shadow; since **D76** the hover adds a **subtle glow** of `brand` color (`--shadow-glow-cta`, a low-alpha colored shadow, **without `blur`**) — reverts D43's "never glow".
- The primary button does NOT carry a shadow (the color already dominates the hierarchy).

---

## 6. Base components (patterns, no code)

### 6.1 `ButtonPrimary` — CTA "Join the TechToJob Discord" (hero, closing, nav)
- `brand` background · `ink` 700 text · rectangular (`rounded-none`, D42) · `min-height: 48px` (hero) / `44px` (nav) · padding `0.75rem 1.75rem`.
- **Hover/focus:** `brand-deep` background (`ink` text still AA: 5.06:1) + hard-edge specular sweep (`-skew-x-12 bg-white/25`, 500ms) and micro-elevation `-translate-y-0.5` (D43). No layout size change; the glow (D76) does not reflow.
- **A single CTA style (D46):** hero, header, mobile menu and closing share exactly the same classes except size (`nav`/`hero`/`block`). The old `line` variant (hairline rectangle) was retired. The hero keeps ONE single button (R11). Focus ring: `brand` on dark surfaces, `ink` in the mobile panel (`paper`), per R26.
- **Focus-visible:** `outline: 3px solid` ring — `ink` with `outline-offset: 3px` on light surfaces; `brand` on dark surfaces (6.17 ≥3:1 ✅). Never `outline-none`.
- **On ink background (hero/closing):** it is the most eye-catching element on screen: text size `lead`, Lucide `ArrowUpRight` icon 20px, `target="_blank" rel="noopener noreferrer"` + sr-only hint "opens in a new tab" (text in `messages/es.json`, R36).
- Verified contrast: 6.77:1 ✅ AA normal and AAA large.

### 6.2 `ButtonSecondary` — `AudienceCta` outline (D76/D85)
- **Only use today:** "Find real talent" CTA of the Companies block in "Audiences" (D75/D76). Since **D85** that section is **`ink`**, so the outline is defined in its **dark polarity**.
- Surface `ink`: 2px border **`paper/60`** (**5.66:1** ≥3:1, WCAG 1.4.11), `paper` 600 text, **rectangular** (`rounded-none`, D42), `min-height` of 56px (same height as the filled `hero` CTA). Hover: border `brand` **and** background `white/5` at the same time — two cues, so the green is never the ONLY state indicator (R26). No specular sweep. **Focus ring `brand`** (6.17:1 on `ink`).
- The light polarity (border `ink/60`, `ink` text, hover border `brand` + `mist` background, focus ring `ink`) remains in the catalog for future uses on `paper`/`mist`, but **is not instantiated today**. The class is switched by the `surface` prop of `AudienceCta`/`DiscordCta` (`light` | `ink`).
- **Honest destination:** it is an **in-page anchor to `#unete`** (the real CTA block to Discord), not an external link or a dead button (R43). The arrow points down, never the "opens outside" one.
- The filled `brand` CTA remains the only conversion style on the site (D46); the outline does not compete as primary.
- **In the hero there is no second button** (R11: a single button). This variant (hairline/pill) had previously been retired in D46; it is reintroduced, no longer as a pill, only for the companies block.

### 6.3 `TextLink`
- On light: `ink` 600 + `underline decoration-brand decoration-2 underline-offset-4` (the green here is underline ornament, the legible text is `ink` → complies with R26). Hover: `decoration-thickness 3px`.
- On dark: `brand` text + 2px underline.
- Always descriptive text, never "click here" (R44).

### 6.4 `TestimonialCard` (×4, section 7 — marquee D89/D90)
- `paper` background on the **`brand-soft` band** · straight corners · `ink/10` hairline border · `p-5` padding.
  Fixed width (`18rem` at `sm`, `20rem` at `lg`) because each card is an item of the marquee track.
- Top row → **ghost quote mark** `text-ink/15` (no longer `.bento-index`: inside a track with a
  continuous `transform`, its `animation-timeline: view()` does not fire).
- Footer → **36px circular avatar** (`brand` with `ink` 700 initials — an honest gap for the mock's
  photo, ready to be replaced with `next/image`) + name (`ink` 600, `small`) and role (`slate`, `small`).
- **Future LinkedIn slot (R17):** `Linkedin` icon in the bottom-right corner with `aria-disabled`,
  `tabindex="-1"` and tooltip/sr-only "profile coming soon" — the slot exists and is visible, but does not fake a dead
  link (R43).
- Hover: `scale-[1.02]` + `border-brand` + `.sheen-sweep` sweep; `.card-idle` breathes the border.
- Mock note: the section's `sub` states they are sample testimonials; the repeated track is
  `aria-hidden` and the content is served only once in an `sr-only` list.

### 6.5 `NewsletterForm` — Bento panel on `ink` (D100/D101/D104)
- **Surface (D100):** the section is **`ink`** and the whole block (eyebrow + h2 + copy + form)
  lives in **ONE panel** `bg-coal` + 1px `border-hairline-dark`, straight corners, no shadow,
  `p-6 lg:p-10`, with `.panel-in` (panel entry, D103) + `.bento-lit-ink` (border that lights up
  on entry). **D104:** `.card-idle` and the `line-idle` of the panel's top border were removed —
  they repeated the information of the section thread and of the border lighting itself.
- **Grid (D101):** `lg:grid-cols-12` — text in `lg:col-span-7` and form in `lg:col-span-5`,
  separated by a vertical hairline (`lg:border-l border-hairline-dark lg:pl-12`); on mobile it stacks.
- **Eyebrow (D101):** overline `text-label uppercase text-brand` with a `brand` dot, reusing the
  already existing `nav.links.newsletter` label — zero new copy (R36).
- **Copy on `coal`:** h2 in `paper` (12.62 ✅), paragraph in `cloud` (6.40 ✅) and note in `cloud/80`
  (4.73 ✅) — §3.1 rows 21–22.
- **Label:** overline visible above the field (`text-label uppercase text-cloud`) — never only a
  placeholder (J6 "form labels").
- **Input:** **`ink`** background (sunken inside the `coal` panel), **1px `white/40`** border
  (**3.37:1**, WCAG 1.4.11 — the `white/25` of the dividers is not enough for a control),
  `radius-input` (10px), `min-h-12`, **full width**, `paper` text (12.62 ✅), `cloud/70` placeholder
  (4.64 ✅). **Focus:** `focus:border-brand` (6.17 ✅) with a 200ms color transition +
  `outline 3px brand` with offset for keyboard. (The `focus:border-cyan-500` of the brief was discarded:
  cyan violates R24/R25.)
- `type="email" required` (HTML5 validation, Q8) + `aria-describedby="newsletter-note
  newsletter-status"`; the state lives in a `<p role="status" aria-live="polite">` **without reserved
  height** (the message appears after a user action → outside CLS). Messages in
  `messages/es.json`.
- **Button (D101):** filled `brand`, `ink` text (6.17 ✅, R26), `font-bold`, **`rounded-none`**
  (the `rounded-lg` of D100 was retired: it was the only rounded piece on the site), `min-h-12` and **full
  width under the field** (so the input stops being squeezed). Lively hover: `bg-brand-deep`
  (5.01 ✅) + `-translate-y-0.5` + `shadow-glow-cta` + specular sweep; focus `outline-3 brand`.
  **No** arrow and **no** idle glint (`cta-glint` is only for the Discord CTA, R11).
- **Trust note:** `Solo un correo a la semana. Nada más.` ("Only one email a week. Nothing more.") right below the field, with a `brand`
  dot and a `.line-idle` separator — the only line glint in the section (D104).
- **Entry (D101/D102/D103):** the panel enters with `.panel-in` and **each** form element
  (label, input, button, hairline, note and status region) enters and leaves with `.reveal`; eyebrow/h2/copy
  do so with `.reveal-left` from the rail.

### 6.6 `Nav` / `SiteHeader`
- `position: sticky; top: 0` · height 80px (5rem, in sync with the hero's `-mt-20` and the `scroll-padding-top: 6rem`). **SOLID 100% bar** that adopts the polarity of the section behind it (`data-header-surface` on `<html>`, published by the `HeaderSurface` island, D47). The "broad shading" that dissolves it is a **gradient strip BELOW the bar** (`.header-fade-*`, `top: 100%`, 2.5rem) — so the CTA never peeks through a translucent area (D47b). `ink`↔`paper` crossfade of 250ms by `opacity` (CLS 0). Without JS the header stays `ink` (progressive enhancement). **D92:** on the blue surfaces (`mist`, exposed via `data-header-tint`) the light header does **not** project the bottom shadow or the `paper→transparent` dissolution strip (they looked like a gray/white smudge on blue); white and dark keep the treatment. **D94:** additionally, the dissolution strips use stops with **explicit alpha** (no `transparent`, which left a gray band) in a 5-stop ramp.
- Desktop (≥1024): logo composition (§2a) · anchor links (`#como-funciona`… R45) in 600 `paper` on `ink` (≥8:1), `whitespace-nowrap`, hover underline `brand` 2px, targets ≥44px tall · anchors in tiers: `lg` (`#como-funciona`, `#torneos`, `#talento`/`#talento`), `xl` (`#networking`, `#testimonios`, `#newsletter`) and `2xl` (`#noticias`) (D53/D90/D95) · compact `ButtonPrimary` CTA with `whitespace-nowrap` — **never on 2 lines** (the nav clips links, not the button). **No box** around the anchors (D45: the hairline frame was retired); it is a bare row of links.
- The header container is `page-container` (**72rem, D49**): the SAME axis as the content, so the logo, nav and CTA align with the page. There is a **scrollspy** (`aria-current="location"` on the active link, D49) and a **progress hairline** (`.header-progress`, 2px `brand`, `scaleX` with `animation-timeline: scroll(root)`, D49).
- Active nav state (AA): on a dark surface the active link is `brand` (6.17:1); on light the text stays `ink` and `brand` goes **only as an underline** (R26 forbids green as text on `paper`).
- 640–1023: logo + CTA + hamburger · <640: logo + hamburger (the CTA lives in the panel).
- Dropdown menu (<1024): full-width `paper` panel, links in a 48px stack + full-width Discord CTA. Native `<details>`: Enter/Space by default, zero JS.
- Focus-skip links: first `body` element = sr-only "Skip to content" revealed on focus (own accessibility criterion; not hidden text with keywords, does not violate R60).

### 6.7 `NewsCard` (×3, section 8)
- `paper`, 1px `line` border, straight corners (`rounded-none`), `1.5rem` padding (featured `1.5rem` / `2.5rem` at `lg`), hover `scale-[1.02]` + `brand` border + `bg-mist` + `shadow-glow` and `.sheen-sweep` sweep (D76/D98).
- `.card-idle` ring (D86); `.reveal-left` entry/exit on each cell wrapper + `.bento-lit` lighting on the card (D61/D98), like the sections above.
- Category chip: `ember` background, `ink` `label` pill text (6.12 ✅) · `slate` `small` date · `h3` 700 `ink` title · `body` summary · descriptive link as `TextLink`.
- **Featured editorial plate (D98):** full-bleed banner inside the cell (bottom border `line`, `mist` background + `.news-field` grid at 4%) with the **official symbol** `logo-symbol-gradient.svg` (~80/96px) and an `ember` dot with `.animate-activity` pulse. It is **decorative** (`aria-hidden` + `alt=""`), `loading="lazy"` and explicit `width`/`height` (R55/R56); it asserts nothing about the mock news (R18/J2). The section uses the `ember` ambient thread (`Section idleAccent="ember"`) and a `.line-idle-ember` divider.
- The `ember` appears only as decoration (dot of the `mockNote`, pulsing dot of the plate, chip, thread and divider), never as text on `paper` (R26).

### 6.8 "How it works" stepper (D66/D67/D69/D70)
- **Replaces the D38 bento only in this section** (and the old circular `StepCard`). It is an `<ol>` of
  one column that **reuses the page rail as the track**: no new line is drawn.
- Each `<li>` is a step: **double-circle node** on the rail (ring + disc with a gap),
  `1.1`–`1.4`, **36px mobile / 48px `lg`**, in the **`ember`** accent (R25) with an `ink` numeral
  (6.12:1 ✅ R26); then `h3` + description + **result line** with a `brand` bar (`border-l-2`).
- **Hierarchy and grid (D70):** the text moves to `lg:col-span-8` (title 4 cols · text 8 cols,
  `lg:gap-x-12`) to close the empty lane; the description drops to `text-slate` and the **result**
  rises to `text-lead font-semibold text-ink` with a `border-l-[3px] border-brand` bar — the promise
  rules over the explanation.
- **Connector (D70):** a node→title hairline that lit up on scroll was proposed; **Lorena
  rejected it** (*"la línea entre los steppers y el título no me gustan para nada"*) and it was retired the same
  day. It does not exist: the rail does not join the titles.
- **Motion (D69):** all the text enters with `.reveal-left` (`translateX(-2.5rem) → 0`, from the rail);
  the node lights up with `.step-node-fill` (`cover` + `--i`). Pure CSS, no islands.
- **The D38/D61 bento-cell language (`.bento-reveal`/`.bento-lit`/`.bento-index`, with hover
  `scale-[1.02]` and no `cursor-pointer`) is still alive in News (7+5/5).** **Testimonials abandoned it in
  D89** when moving to marquee: there `.bento-reveal`/`.bento-lit`/`.bento-index` were removed from the
  cards and only `.card-idle` is kept.

---

## 7. Light/dark rhythm + visual hierarchy by section

Goal: for the page to "catch the eye" (J1 25%) with controlled alternation — **dark moments that frame (Hero, Audiences, Newsletter + Closing)**, light reading in the body and long light stretches separated by **distinct tints** (`paper`/`mist`/`brand-soft`) so they read as blocks, not a mass. Green shines WHERE IT SHINES: on `ink`.

The page reads as **a vertical timeline** (D32): the Hero is the door (no rail) and the rail draws steps 1–8, from "How it works" to "Newsletter". The Closing is the narrative goal but **no longer draws the final node** (D59). The order of this table is the current narrative one (`content.ts → timelineOrder`) and the reorder is declared in the README (R10).

| # | Section | Background | Emphasis and role of green |
|---|---|---|---|
| 0 | Nav | **Adaptive (D47/D49)**: `ink` on dark sections and `paper` on light ones (solid bar + dissolution strip below) | Bar that **blends with the section behind it** (250ms crossfade) and, on scroll, adds a `brand` progress hairline. `paper`/`ink` links depending on surface, the SAME tile+wordmark composite in both polarities (§2a/§2.2), active scrollspy and a compact green CTA always visible. Full-bleed axis with the system gutters (D53) |
| 1 | **Hero (door)** | **`ink`** | **D36 "Editorial Void" V5**: asymmetric 12-col grid, H1 in two editorial lines (question in `cloud` 7.77:1, answer in `paper` with the final word in `brand` 6.17:1), flat `ink` background (no glows or tiles or graph canvas), real metadata in the marginalia, symbol watermark (`logo-symbol-light` at 6%, D90) and filled `brand` CTA (`DiscordCta size="hero"`, single style D46) as the ONLY button (R11). It closes with a **ticker strip** (D38, pure CSS marquee, `aria-hidden`) with real tokens already published. No rail |
| 2 | How it works (**step 1**) | `paper` | **D66 vertical stepper** that reuses the rail as track: double nodes `1.1`–`1.4` in `ember`, title + description + **result line**; the page rail crosses it like the rest (no sub-timeline). **D70:** text at 8 cols and result as hierarchy anchor |
| 3 | **Tournaments (step 2)** | **`mist`** (D87; back to the neutral light tint) | "Game" section and **proof that the community is alive**, now in **light**: it breaks the light stretch without falling back to dark. Headline in **`ink` 700** (10.58 ✅; on light green cannot be text, R26) and **no watermark** (§2f: it does not go on light). **D71–D74:** ongoing tournament (7 cols) + loot / hall of fame stacked with an **`Ejemplo` chip** (5 cols, `ember`+`ink` 6.12 ✅) and a **real full-width closing** with a timezone table (Sora `tabular-nums`); straight corners and no shadows. **D80:** live counter (`Countdown`, 2nd client island) in `ink`. **D86:** its 4 separators carry a **`.line-idle-ember`** glow (orange, fixed size 8rem) and its 4 labels an **`ember` dot** (the "Tournament ongoing" one with `.animate-activity` pulse) |
| 4 | **Audiences (step 3)** | **`ink`** | **Split section (D75/D76)**, now **dark**: it is the counterpoint that separates the light stretches (How it works+Tournaments / Networking+Testimonials+News). A single H2 (with "empleo", SEO) + intro in `cloud` + **two raised `coal` cells** (`hairline-dark` border, §3.1 #14) side by side (dev / company), each with a **numbered badge** (1/2, echo of the D67 node), **`brand` icon** and a **scannable list** of 3 items. It makes the two audiences read as parallel paths, not a linear flow. Dev CTA filled `brand`; company CTA outline in dark polarity (§6.2); **both anchor to `#unete`** (there is no backend) |
| 5 | Networking (step 4) | `paper` | **D81 asymmetric composition**: the monolithic paragraph becomes a title + intro in the left column `lg:sticky` and **three blocks on the right** separated by 1px `line` hairlines — channels by area (`rounded-full` pills that emulate Discord channels), replies in minutes (`text-h3 text-ink` line + decorative `brand` dot) and the hidden market (`lead` anchor with a 3px `brand` bar). Hovers **only by opacity** (no new color, no `cursor-pointer`); green stays as border and dot fill, never as text (R26). Still no bento (D38). **D83:** the pills are the **8 real Discord areas** (`#Development`, `#Data & AI`, `#Infrastructure & Operations`, `#Cybersecurity`, `#Product & Design`, `#Quality`, `#IT & Support`, `#Business & Leadership`) + a note on channel/role access. **D82:** `ember` dot in each eyebrow, official icon under the title and `.reveal-enter` (entry without exit) in the sticky column. **D85:** the right column enters with `.reveal-left`. **D86:** the two blocks with a line carry `.line-idle` (not the first, borderless by `first:border-t-0`) |
| 6 | Testimonials (step 5) | **`mist`** (D87/D90) | The neutral light tint that Lorena approves (same as Tournaments). **D89/D90: pure CSS full-bleed horizontal marquee** inside a **`brand-soft` band** with `brand` hairlines, raised shadow and inner relief; **D123:** the band and the cards' fade **start blurred toward the RAIL** (to the left of the axis there is no field, hairline or shadow) and **the rail passes over** the slider (`z-20`, `className` prop of `TimelineRail`, only here); the right edge remains full-bleed. Duplicated track `−50%` with `REPEAT=3` (no gaps on any viewport) and pause by `hover`/`focus-within` + CSS-only control; `paper` cards (`ink/10` border), `.card-idle` and `.sheen-sweep` on hover; `brand` avatar, ghost quote and disabled LinkedIn slot (R17/R43). The repeated track is `aria-hidden` and the content is served in an `sr-only` list |
| 7 | News (step 6) | `paper` | **D38 bento 1 featured + 2** (hairline); the `ember` accent appears here for the first time (category chips) — controlled novelty |
| 8 | **Newsletter (step 7)** | **`ink`** (D100; previously a `brand` strip) | The solid green block is removed and the content lives in **ONE Bento card** `coal` + `white/12` hairline (§6.5): text on the left (`paper`/`cloud`) and form on the right. Green returns to its AA role: **button** fill, rail fill, **node 7** and focus ring. It is still the pre-footer block (R19) and does not compete with the Discord CTA (R11) |
| 9 | **Closing (goal)** | **`ink`** | Mirror of the hero (D35): H2 in two lines (`cloud` + `paper`) + the same dominant green button. `logo-symbol-light` watermark at 6% (D90). Last impact = same action as the first impact (R20). **No rail or node (D59)** and centered block. **D121:** **100vh** section (`min-h-svh` + centered content) with **the SAME faceted lights of the hero** in the background, the **"door"** gesture (two `ink` leaves that open with the scroll) and a **brand finish** under the CTA: the official lockup (icon in a square tile + `wordmark-duo`) inside a rotating ring of light; the copy and CTA stay above and are not touched (R34/R42) |
| 10 | Footer | `ink` (continuous, separated by `hairline-dark`) | Low hierarchy: `small` `cloud`, hover links `brand`. Logo: the header composite in dark polarity (D58, §2c). Legal with the honest note of specs/11 |

Anti-drift rule (updated D85/D100): **never two dark sections in a row except the closing blocks** — `Newsletter ink → Closing ink → Footer ink` (D100) and `Closing → Footer` (always) read as a single visual block; **never more than 3 light sections in a row and, if they are contiguous, alternate the tint** (`paper` ↔ `mist`/`brand-soft`) so the seam reads as a block change. Long-reading sections (copy > 3 lines) always on light.

**Current rhythm (D87/D100):** Hero `ink` → How it works `paper` → **Tournaments `mist`** → **Audiences `ink`** → Networking `paper` → Testimonials `mist` (with `brand-soft` band, D89/D90) → News `paper` → **Newsletter `ink`** → Closing `ink` → Footer `ink`. Longest light stretch: 3 (Networking+Testimonials+News), softened by the `paper`→`mist`→`paper` alternation. **D100:** the site no longer has a solid `brand` strip — green remains as an **action color** (buttons, focus), **progress** (rail) and **detail** (nodes, dots, threads), exactly the role R26 allows. The `--color-brand-soft` token and the `brand` variant of the rail remain **unused**.

**Living section layer (D84, §9 #17/#18):** besides the chromatic rhythm, the page carries two
fixed-scope ambient effects — the **text drift** tied to scroll (`±0.375rem` on the content
container) and the **section light** that travels along the top hairline (step ~5s, long pause, 9s loop). They apply
to steps **2–8** (How it works, Tournaments, Audiences, Networking, Testimonials, News and Newsletter) and are **excluded**
the nav/header (0), the hero (1), the closing (9)
and the footer (10): the hero keeps its static `section-sheen` to avoid adding movement to the first
impact and the footer carries no decoration (it closes the page). **D121:** the **closing is no longer a flat
background** and debuts its own movement (the **hero lights + "the door" + the brand finish**, §9 #25), in
a **100vh** section — without `.text-drift` or `.section-idle` (those two
still do not apply there), and with the `prefers-reduced-motion` guard turning it all off. The
**Networking** drift is limited to the right column: the left is `sticky` and a `transform`
on an ancestor would break the pin (that is why that section does not receive `.text-drift` on the common wrapper).

---

## 8. Accessibility and states (J6 gate, 10%)

- **Visible focus:** all interactive elements with 3px `focus-visible` (colors per surface, §6.1). `outline-none` without a replacement is forbidden. Verification: full tab through the page in logical DOM order.
- **Touch targets:** ≥44×44px on buttons, mobile nav, hamburger, LinkedIn icon (even disabled) and each footer link (padding on the `<a>`, not just on the text).
- **Contrast:** table §3.1 as the source of truth; any combination not listed requires recalculation before use.
- **Semantics:** a single `h1` (R40); `h2` per section without jumps (R41); `header/nav/main/section/article/footer/button` (R42); form with a visible `label` (§6.5); decorative watermark logos with `aria-hidden="true"`, functional logos with the accessible name "TechToJob".
- **`prefers-reduced-motion: reduce`:** disables transforms and transitions (§9); hover/focus states remain visible by color.
- **Keyboard:** mobile menu operable with Enter/Escape; the skip-link is the first tabbable.

---

## 9. Motion — current catalog (R34: "must not get in the way")

> **Review note (22/09, D30 → D38):** the original "maximum 3 micro-animations" criterion
> was our own, not the rules'. What R34 requires —that they do not get in the way— is maintained by design: the
> loops are slow (≥3.5s), they only animate `transform`/`opacity`/`box-shadow`, none changes the
> layout (CLS 0), none touches the copy or the CTA, and the global `prefers-reduced-motion` guard turns them all
> off. **D36 retired** the graph field (client island), the glows and the floating tile wall
> of the hero; **D38** added the hero ticker and the numbering of the bento cells.
> **D76 reincorporates a very subtle, hard-edge glow** (colored shadows, no `blur`) — see #14.
> **D84** adds the scroll-linked text drift (#17) and the section ambient light (#18),
> and limits their scope to the 7 central sections (neither nav, nor hero, nor closing, nor footer).
> **D85** changes the chromatic rhythm (Tournaments `brand-soft`, Audiences `ink`) and **D86** adds the
> idle life of separator lines (#19) and card borders (#20); **D87** returns Tournaments and
> Testimonials to `mist`. **D89/D90** turn Testimonials into a **pure CSS marquee** on `mist`
> with a `brand-soft` band (#21) and lower the watermarks of the dark surfaces to
> `logo-symbol-light` at 6%.
> **D100–D107** (newsletter session): the `brand` strip disappears and the newsletter moves to `ink` with a
> `coal` panel (D100); the form is redesigned in a "console" column with a square button (D101); the
> typographic scale of "How it works"/"Tournaments" drops with `.section-tight` and the entries/exits are
> slowed down (D102); the CTA idle glint (#22), the node halo (#23) and the panel's own
> entry (#24) appear (D103); ornament is pruned from the panel (D104); the rail debuts a halo (D105); and the
> exit is shortened (D106, plateau 84% → 92%). Everything is pure CSS: zero new client islands.
> **D121** opens the **closing** (`#unete`), which until now was a flat `ink` background (§9 #25): the
> section becomes **100vh** with **the hero's faceted lights** reused as is
> (`.hero-facet*`, without duplicating CSS), debuts **"the door"** (two `ink` leaves that open with the
> scroll, `translate` only) and closes with the **official lockup** inside a rotating ring of light.
> The `prefers-reduced-motion` guard turns it all off. (The discarded explorations
> D108–D120 —reticulated balloon, net and constellation— remain only in the decision log.)

| # | What | Spec | `reduced-motion` fallback |
|---|---|---|---|
| 1 | **Header entry** (`animate-header-in`, 500ms): drops `-0.75rem` + fade | First beat of the cascade (`transform`/`opacity` → CLS 0). The H1 is the LCP element, not the header | Header visible immediately |
| 2 | **Hero entry** (H1, sub, CTA, support, meta, nav: staggered 100→700ms) | The **H1 animates only `transform`** (`animate-lift-in`), never `opacity`: the LCP element is painted opaque on the first frame | All content visible on entry, in its final state |
| 3 | **Vertical timeline** (`timeline-fill` + `timeline-marker`, `animation-timeline: view()`) | The `brand` fill grows with scroll and each node lights up when entering view. One segment per section → the line looks continuous from "How it works" to "Newsletter" (the Closing is outside, D59) | Fully drawn line and active nodes |
| 4 | **Entry + exit per element** (`.reveal`, D62/D63/D64/**D77**/**D102**/**D106**): each section "beat" (h2, intro, cards, CTA) enters with fade-in + `translate(0, 2.5rem) → 0` (0→**38%** of the range, D102: previously 22%) and **exits upward** (**92→100%**, D106: the opaque plateau rises from 84% to 92%, so the farewell lasts half as long), with `animation-timeline: view()` and `cubic-bezier(0.2,0.9,0.2,1)` easing. Since it is tied to scroll, **it reverses on scroll up**: sections also "come alive" upward | Only `opacity`/`transform` → CLS 0; pure CSS, no islands; the hero does NOT use it on its H1 (it never fades: it is the LCP) | Static content visible in its final state |
| 4b | **`view()` anti-bug rule** (D63): the range uses the **`cover`** phase (relative to the viewport), never `entry` (relative to the element's height: a 40px h2 finished the fade in ~11px of scroll); and **no ancestor** of an element with `view()` may carry `overflow: hidden` (it creates a scroll container and freezes the timeline) → `overflow-clip` is used | **D77:** COMPLETE `cover` range with 16%–90% opaque plateau; at 90% the element is already entering under the fixed bar (~96px), so the content is never read half-faded (verified in browser: opacity 1.0 at the anchor landing) | — |
| 5 | **Hero ticker** (`.animate-marquee`, D38/**D96**): duplicated track, `translateX(0 → −50%)`, `--marquee-duration:102s` linear infinite; each half repeats the set ×3 (`TICKER_REPEAT`) to exceed any viewport and leave no gap on restart | `transform` only; the block is `aria-hidden` and non-interactive (R11/R34) | `animation: none` + `transform: none`: the track parks at the origin and only the first copy is read |
| 6 | **Bento ghost marker** (`.bento-index`, D38, `animation-timeline: view()`) | After D66 it remains **only in Testimonials** (the oversized editorial quote): `opacity`/`transform` on an inner `<span>`, decorative (`aria-hidden`) | Marker visible in its final state |
| 7 | **CTA hover** (all `DiscordCta`/`AudienceCta` instances, D42/D43/D46/D76): single filled `brand` style with hard-edge specular sweep (`-skew-x-12 bg-white/30`, 500ms, at rest outside the clip) + micro-elevation `-translate-y-0.5` + 2px arrow + soft glow (`--shadow-glow-cta`) | Button affordance feedback, not decorative. No `blur` | No sweep or translate (`motion-reduce:`); the color change is kept |
| 8 | **Nav link underline** (150ms) + hover of the quick nav links | Header and hero nav: hover `decoration-brand` 2px | Underline present on hover |
| 9 | **Living hero grid** (D44): `.hero-field` pans one cell with scroll (`animation-timeline: scroll()`) and `.hero-field-drift` adds a continuous drift of one cell (4rem in X and Y) over 28s | Nested layers so both `transform`s coexist; seamless loop thanks to the pattern's periodicity; `transform` only | Grid still and complete (the global guard collapses both) |
| 10 | **Adaptive header** (D47/D49): `ink`↔`paper` bar crossfade (250ms by `opacity`) + `.header-progress` hairline (`scaleX` with `animation-timeline: scroll(root)`) + `aria-current` scrollspy | Color/opacity/transform only, CLS 0; the hairline is pure CSS | Fixed `ink` header (no JS) and no hairline; no link marked active |
| 11 | **Bento cell entry + exit** (`.bento-reveal`, D61/D63/D64/**D77**): shares the `step-in-out` keyframe of `.reveal` (enters from below 0→16%, plateau 16→90%, exits upward 90→100%) with `animation-timeline: view()` and full `cover` range | Only `opacity`/`transform` → CLS 0; pure CSS, no islands | Static cell visible in its final state |
| 12 | **Bento cell lighting** (`.bento-lit`, D61): border `line → brand` as the cell enters the viewport, staggered by `--i`; hover `scale-[1.02]` + `border-brand` (+ `bg-mist` on `paper` sections) with `duration-300 ease-in-out` | **Hard border, no blur or halo** (D43); `brand` on `paper` is decorative (2.04:1), never text (R26) | Border at rest (`line`); hover keeps the color change (no scale) |
| 13 | **Entry from the rail + exit** (`.reveal-left`, D69/D72/D76/**D77**/**D85**/**D90**/**D98**; `#como-funciona`, `#torneos`, `#talento`, **the h2/sub/control of `#testimonios`**, **the right column of `#networking`** and **`#noticias`** — h2, note and the wrapper of each cell): enters `translate(-4.5rem, 0) → 0` (0→**38%**, D102) and **exits upward** (**92→100%**, D106), with `view()` and full `cover` range — each block seems to come out of the timeline and says goodbye on scroll up. In Networking **only the right column** changes to `.reveal-left` (D85); the left keeps `.reveal-enter` (entry without exit, sticky-safe, D82 — its `cover 0% cover 40%` range is **deliberately not lengthened**: with the column pinned, a larger range would leave the entry half-finished) | Only `transform`/`opacity` (CLS 0); does not generate horizontal overflow | Static content visible in its final state |
| 15 | **Hero on return** (`.hero-soft`, D77): the hero content block (without touching the H1) moves with `animation-timeline: scroll(root)`, `animation-range: 0 80vh`: opacity 1→0.9 and −0.75rem | Very subtle and positional (CSS does not distinguish scroll direction); at scroll 0 it starts in its final state, so **it does not touch the LCP** | Static hero in its final state |
| 14 | **Subtle glow** (D76): `.sheen-sweep` (diagonal `brand` hard-edge sweep on hover of the Audiences cells) + `--shadow-glow`/`--shadow-glow-cta` (soft glow on hover of cards and CTA) + `.section-sheen` (static luminous hairline on the top edge of each section) | Only `brand`/`ink` (R24/R25); they are **colored shadows and gradients**, no `filter: blur` or blobs (D37.1); the `.sheen-sweep` rests outside the clip (`-translate-x-full`) | The sweep does not run (`motion-reduce: hidden`); the glow stays at its base value |
| 16 | **Activity dot** (`.animate-activity`, D81/D82): an **`ember`** halo of 12px that grows (`scale 1 → 2.2`) and fades (`opacity 0.6 → 0`) over **3.6s infinite**, behind a static `ember` dot. Marks "replies in minutes" (Networking) and "Tournament ongoing" (Tournaments) | `transform`/`opacity` only (CLS 0); loop **≥3.5s** (catalog §9); decorative → the wrapper is `aria-hidden`, the real datum is the text line | The global guard (`0.01ms`, 1 iteration) freezes it as a visible **static dot** |
| 17 | **TEXT drift with scroll** (`.text-drift`, D84): the section's *content wrapper* shifts `±0.375rem` (0.75rem total, back and forth) following its own pass through the viewport — `animation-timeline: view()`, `animation-range: cover`, `linear`, `both`. No exit or fade: it NEVER touches `opacity`, it only accompanies the scroll (on scroll up, it reverses). It goes on its own element (the container) so as not to override the `transform` of the children's `.reveal`/`.reveal-left` | `transform` only (CLS 0); travel ≤0.75rem; **text only** → never on `<Image>` or watermarks; pure CSS, no islands. Scope: steps 2–8; **not** on hero/closing/footer | Text still in its natural position (`.text-drift` declares no base `transform`; without the `@supports` block there is no animation) |
| 18 | **Section ambient light** (`.section-idle`, D84/D86): a 1px thread (16% width) travels the top hairline (`::after`, `translateX(-100% → 525%)` + an `opacity` breath) with a **short 6s loop** (minimal pause) and a halo. Color per surface: `brand` by default, `ink` on the `brand` strip (`.section-idle-ink`) and **`ember` in Tournaments, Testimonials and News** (`.section-idle-ember`; in News via `Section idleAccent="ember"`, D98). It gives the section life when stopping, without touching copy, CTA or hierarchy | `transform`/`opacity` only (CLS 0); loop **6s ≥3.5s** (R34); decorative (`aria-hidden` + `pointer-events-none`); `overflow: clip` (does not create a scroll container, D63); pure CSS | The hairline stays as today (static `.section-sheen`): the guard leaves the thread off-screen — invisible decoration, never hiding content |
| 19 | **Living separator line** (`.line-idle`, D86): a **fixed-size** glow (`--idle-size`, 8rem; 4rem with `.line-idle-sm` in How it works) travels the top hairline of a block with a hairline **lighter** than the narration, **uniform** between blocks of different widths. It travels with `background-position` (`-100% → 100%`, 6s) and carries a halo (`drop-shadow` on the gradient's alpha). Color: `brand` by default, **`ember` in Tournaments and in the News divider** (`.line-idle-ember`, D98). In Networking it is omitted on the first block (`first:border-t-0`) | `opacity` + `background-position` (CLS 0; painting of a 1px line) and a 3px `drop-shadow` on the glow; loop **6s ≥3.5s**; `pointer-events-none`; never overflows (the background is clipped to the element) | Invisible glow (base state `opacity: 0`): the hairline stays exactly the same |
| 20 | **Breathing card border** (`.card-idle`, D86): a 1px `brand` ring on a `::after` layer (inset -1px) turns on and off (`opacity 0 → 0.4`) over **9s**, staggered by `--i`. It does not touch the real border or `.bento-lit` (which still lights up on entering view). On the Audiences, Testimonials and News cards | `opacity` only (CLS 0); loop **9s ≥3.5s**; decorative (`pointer-events-none`); pure CSS | Invisible ring (base state `opacity: 0`): the border stays as is |
| 21 | **Testimonials marquee + band** (`.animate-marquee` with `--marquee-duration:180s`, D89/D90): duplicated track `translateX(0 → −50%)`; each half repeats the set ×3 (`REPEAT`) to exceed any viewport width and leave no gap on restart; **pause** by `hover`/`focus-within` and a CSS-only control (hidden checkbox + `<label>`); the full-bleed **`brand-soft` band** carries hairlines, shadow and relief, and the edge mask is applied ONLY to the cards. **D123:** the LEFT fade aligns with the **rail x** of the timeline (`--fade-x` with `max(…, calc(50% − 36rem + …))`), not with the page edge; the right edge stays the same | `transform` only (CLS 0); loop ≥180s (R34); the track is `aria-hidden` and the content goes in an `sr-only` list; pure CSS, no islands | `animation: none` + `transform: none`: the track parks at the origin and the first copy is read; the band and the control become static |
| 22 | **Idle glint of the main CTA** (`.cta-glint`, D103): a specular sweep on `::after` crosses the button every **9s** (crossing ~1.3s, white at 22% — softer than the 30% of hover) so the main button breathes without asking for a click. Only in the `solid` variant (`cta-styles.ts`): header, hero, Tournaments, Audiences and Closing; the outline and the newsletter button stay still (R11) | `transform` only (CLS 0); loop 9s ≥3.5s (R34); decorative (`pointer-events: none`); same palette color as the hover sweep | `display: none` (explicit rule in the global guard: it must not be left frozen mid-crossing) |
| 23 | **Rail node glint** (`.node-flash`, D105): a soft halo with a **transparent-center** `radial-gradient` breathes over each node (7s), with the accent of each family — `brand` on the section nodes (`1`–`8`) and `ember` on the step ones (`1.1`–`1.4`) — without tinting the disc or numeral. The `--i` (position on the rail / step index) **staggers the phase** so the glint sweeps the page in a wave | `opacity`/`transform` only (CLS 0); loop 7s ≥3.5s (R34); decorative (`pointer-events: none`); zero new colors (R24/R25) | Halo in its base state (`opacity: 0`): the node looks exactly as before |
| 24 | **Newsletter panel entry** (`.panel-in`, D103): the box enters with a short travel (`1rem`) and its **own 26% window** of the `cover` instead of `.reveal`'s 38%. The reason is geometric: in `view()` the range lasts (viewport + element height), so a ~650px panel with 38% would stay half-faded until its edge is ~190px from the viewport | `opacity`/`transform` only (CLS 0); pure CSS | Panel fully visible and static |
| 25 | **Closing: hero lights, "the door" and brand finish** (D121, `.hero-facet*` / `.closing-door*` / `.closing-seal*`): the section is **100vh** (`min-h-svh` + centered content) and reuses the **same faceted lights of the hero** (`conic-gradient` wedges that rotate **64s/88s**, without duplicating CSS); on entry, two `ink` leaves —**"the door"**— open and let the light out toward the CTA; under the CTA, the official lockup (icon in a tile + `wordmark-duo`) lives inside a ring of light that rotates and breathes; the text enters/exits with `.reveal` | Only `opacity`/`transform` (CLS 0); door with a short range `cover 0% → 35%` and `pointer-events: none` (never covers the CTA or blocks the click); door and lights at 64s/88s and the ring 64s + 9s breathing (all ≥3.5s, R34); zero client islands (D37.2); `aria-hidden`; fixed palette `brand`/`brand-40`/`white-5`/`ember` at 22%, no `filter: blur` (D37.1/D86); the icon is not rotated (R27/R39) | **Default state = final**: without `animation-timeline` or with `prefers-reduced-motion` there is no door and the lights stay still; the content is fully visible and static |

**Ambient light tokens per surface (#18)** — the thread must read on the four
surfaces; on `brand` the green would disappear, so it inverts to `ink` (same criterion as
`.section-sheen-ink`):

| Surface (sections) | Thread `.section-idle::after` | Static glow of the thread |
|---|---|---|
| `paper` / `mist` / `brand-soft` (#como-funciona, #torneos, #networking, #testimonios, #noticias) | `brand` gradient `rgb(132 192 191 / 0.9)` | `rgb(132 192 191 / 0.45)` |
| `ink` (#talento and #newsletter, since D85/D100) | `brand` gradient `rgb(132 192 191 / 0.9)` | `rgb(132 192 191 / 0.45)` |
| `brand` (**unused since D100**) → class `section-idle-ink` | `ink` gradient `rgb(47 52 54 / 0.4)` | `rgb(47 52 54 / 0.22)` |

The thread rests **off-screen** (`translateX(-100%)`) as its base state: without animation the
usual hairline is seen, never a thread frozen halfway.

**Explicitly forbidden** (own criterion + R34): scroll-jacking (hijacking navigation),
**LAYER parallax** (moving backgrounds, images or the hero at a different speed than the flow) and
any animation that delays the LCP (that is why the H1 does not fade).

**Scoped and documented exception (D84) — text drift with scroll:** `.text-drift` (#17) is
allowed despite being tied to scroll, because **it is not layer parallax**: there are no layers
at different speeds, it does not move backgrounds or images, it does not hijack navigation and its travel is
minimal (0.75rem total, ±0.375rem) on the content container. That order of magnitude does not
alter the reading: it does not change the visual order, it does not cross the CTA and it responds in both
scroll directions. The reveals with `animation-timeline: view()` and the ambient light `.section-idle` (#18)
are not parallax either: they do not shift content relative to the scroll and their default state (without
support) is the final one.

---

## 10. Iconography and images

- **Lucide** as the single library (R33: it is not a component kit, they are icons; declare it in the README with the source, R9). Stroke 2, sizes 20/24px, always `aria-hidden` when accompanying visible text.
- Photography/illustration: **no photography is used** in this landing (section decisions above). The only section graphic piece is the **decorative plate of the featured news** (D98), built with the **official symbol of the kit itself** (`logo-symbol-gradient.svg`) on the `.news-field` grid: it introduces no third-party assets or new licenses, respects R24/R25 and is `aria-hidden` + `alt=""` (it is not a cosmetic `alt`: it conveys no information). If extra visual support were added in the future: only `next/image` with WebP/AVIF, explicit `width`/`height` (R55), lazy below the first viewport and never in the hero (R56), real descriptive alt (R57).
- The repo's SVG logos are light; the builder optimizes them with `svgo` before committing and notes the source in the README.

---

## 11. Pending items that touch Lorena (⚠️ human approval)

1. **Sign-off on the copy of `specs/11-content.md`** before the build (it is her voice before the jury — already flagged there).
2. **Footer credits**: name/handle for the final line (pending in specs/11 §11).
3. Confirm the `ember #f4a261` accent (it is our own criterion for this proposal, not a contest requirement; R25 allows it as "a supporting accent color" — if Lorena prefers zero accent, the category chips switch to a `mist` background with a `line` border and `ink` text, with no further changes).
