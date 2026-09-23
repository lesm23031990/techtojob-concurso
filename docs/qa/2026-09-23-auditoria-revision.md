# Auditoría de revisión — 23/09/2026

> **Modo:** revisión (D124). Agentes: `rules-auditor` + `seo-perf` + `qa-access`, en **solo lectura**
> sobre el estado congelado. Modelo: `deepseek/deepseek-flash` (reserva, créditos `opencode-go`
> agotados). Este documento es el resumen consolidado; los fixes aplicados están en D125/D126 de
> `docs/DECISIONES.md`.

## Veredicto

Código de nivel alto, **paquete de entrega incompleto**. Bloqueante: **no hay deploy de este repo y
`site.url` apunta a un dominio ajeno**.

| Categoría | Estado | Evidencia |
|---|---|---|
| `tsc --noEmit` / ESLint / `next build` | ✅ verde | build del 23/09 |
| SEO (código) | ✅ tras fixes | metadata/OG/JSON-LD/sitemap revisados |
| Accesibilidad (código) | ✅ 100 en la última medición (22/09) | `docs/qa/2026-09-22/` |
| Rendimiento | ❌ **Perf 76** (< 90 base / < 95 gate) en la única medición (localhost, 22/09, pre-rediseño) | `docs/qa/2026-09-22/lighthouse/mobile-01.report.json` |
| Entregables R02/R03/R04 | ❌ pendientes | sin URL real, sin capturas, sin Lighthouse sobre deploy |

## Hallazgos críticos y su estado

| # | Hallazgo | Criterio | Estado |
|---|---|---|---|
| 1 | `content.ts:316` `site.url` = `https://techtojob.vercel.app` sirve la web de OTRO participante (verificado); `techtojob-landing.vercel.app` también es de otro | R02/R49/R50/R51/R52 | ✅ **CERRADO** — deploy real en `https://techtojob-concurso.vercel.app` y `site.url` corregido (D129); canonical/hreflang/OG/sitemap/JSON-LD verificados |
| 2 | Sin capturas desktop/móvil | R03/J3 | **ABIERTO** |
| 3 | Lighthouse móvil = Perf 76, medido en localhost y pre-rediseño | R61/J6 | **ABIERTO** — remedir sobre el deploy |
| 4 | `loading="lazy"` en la imagen del hero | R56 | ✅ corregido (`Hero.tsx`) |
| 5 | Cero medición del estado actual | R61 | **ABIERTO** |

## Fixes aplicados en esta pasada (D125/D126)

- **Perf:** provider i18n con solo `newsletter`; `HeaderSurface` → `IntersectionObserver`;
  `Countdown` pausa offscreen/pestaña oculta; 7 `will-change` retirados.
- **A11y:** `animation-delay: 0s` en el guard reduced-motion; borde del input newsletter a 3:1 (1.4.11);
  `newsletter-status` fuera del `aria-describedby`; `Ticker` pausa con hover.
- **SEO:** OG `alt` localizado (`generateImageMetadata`) y `twitter:image` a `…/og`; Twitter
  `site`/`creator`; JSON-LD `@graph` Organization+WebSite con `@id` y logo **PNG** (Google ignora SVG);
  `x-default`; sitemap solo ES con `lastmod` fijo; cabeceras de seguridad.
- **Contenido/J2:** testimonios sin Lorem ipsum; H1 línea 1 con la frase que posiciona (R38);
  CTAs de Noticias honestos con su destino (Discord).
- **UX/R45:** nav y footer «Empresas» → `#empresas`.
- **J4:** `IconArrowRight` eliminado.

## Pendientes de aceptación declarada (no bloquean pero restan)

- `will-change` eliminado: puede requerir re-medir compositing de `.hero-facet`/puerta si el INP
  empeora (no se espera).
- `.line-idle` anima `background-position` (repaint de 1px por elemento): se deja por coste
  despreciable frente al riesgo de regresión visual; candidato a optimizar si Perf no sube.
- Ticker: pausa por `hover` + guard reduced-motion; al ser decorativo (`aria-hidden`) no lleva
  control visible (2.2.2 cubierto por hover + reduced-motion).
- Deuda técnica preexistente: tipo `Messages` escrito a mano; `--i` inertes; `hallOfFame.empty`
  inalcanzable con el catálogo actual.

## Nota de proceso

La evidencia vigente de Lighthouse/Playwright es la del **22/09** y **no** cubre el rediseño
posterior (Hero V7, Newsletter D100–D107, Cierre D121–D123). Debe re-medirse **sobre el deploy** antes
de cerrar la Fase 5.

## Cierre 23/09 (tarde)

- **R02 cerrado:** deploy en `https://techtojob-concurso.vercel.app`; `site.url` corregido (D129).
  El **SEO 92** medido por Lorena en DevTools se atribuye al canonical/hreflang apuntando al dominio
  ajeno; con el fix debe volver a 100 (se re-mide con Lighthouse CLI).
- **Responsive (D130/D131):** steppers y enlaces más pequeños en móvil; hero a 100vh desde `md`.
- **Medición pendiente:** Lighthouse **móvil + escritorio** sobre el deploy y capturas responsive
  (paso siguiente de la Fase 5).
