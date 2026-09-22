# 20 · Requisitos técnicos — Torneo #2

> Solo lo que las bases dicen textualmente (cita + línea de `discord.txt`). Lo que no está,
> no se inventa: ver "No especificado por las bases".

## Stack

| Requisito | Cita | Fuente |
|---|---|---|
| Vía elegida: Next.js + TypeScript + Tailwind | "Recomendado: Next.js con TypeScript y Tailwind, que es el stack final" | D84 |
| Tailwind obligatorio | "Tailwind obligatorio en las dos vías" | D92 |
| Next no puntúa extra por sí solo | "usar Next no suma puntos por sí solo" | D87 |
| Cero plantillas/kits | "Nada de plantillas compradas ni kits de componentes ya montados" | D95 |

**Decisión D-13:** Next.js (App Router) + TS estricto + Tailwind. Justificación: es el stack final
del proyecto real, permite Metadata API/`next/font`/`next/image` que las bases piden explícitamente
(D152, D162, D176), y la regla anti-plantillas se cumple escribiendo todos los componentes a mano.
Nota: "usar Next no suma puntos" → el esfuerzo se justifica por las reglas técnicas que asume,
no por favoritismo.

## Código

| Requisito | Cita | Fuente |
|---|---|---|
| Identificadores en inglés | "Variables, funciones, componentes y commits, todo en inglés" | D263 |
| Commits en inglés | misma cita | D263 |
| Textos centralizados (i18n-ready) | "los textos agrupados en un archivo aparte, nunca incrustados… Con Next → messages/es.json" | D271-272 |
| No hace falta traducir | "No hay que traducir nada" | D275 |
| Bilingüe opcional | next-intl + `app/[locale]/` + generateStaticParams + hreflang + selector enlace-real | D285-287 |

**Decisión D-14:** se entrega solo ES con arquitectura i18n-ready (`messages/es.json`). El coste
de next-intl + dos locales no compensa con plazo de 1 día; el criterio J4 premia la *organización*
de textos (D295), que sí se cumple.

## Estructura HTML / SEO técnico

| Requisito | Cita | Fuente |
|---|---|---|
| Un `<h1>` único con el mensaje principal | D127 | R40 |
| Jerarquía h2/h3 sin saltos | D128 | R41 |
| Etiquetas semánticas: header, nav, main, section, article, footer, button, a | D129 | R42 |
| Navegación con `<a>`/`<Link>`, nunca div+onClick | D133 | R43 |
| Texto de enlaces descriptivo | D139-142 | R44 |
| Anclas legibles (`/ofertas`-style, en landing: `#talento`, `#empresas`…) | D144 | R45 |
| `lang="es"` | D147 | R46 |
| title 50-60 chars, description 150-160 | D148-149 | R47-48 |
| canonical + viewport | D150 | R49 |
| Metadata API: `title.template` "%s \| TechToJob" + `metadataBase` en layout | D152 | R50 |
| OG + Twitter Card completos, imagen 1200×630, verificar en opengraph.xyz | D154 | R51 |
| JSON-LD Organization: nombre, logo, URL, redes | D156 | R52 |

## Imágenes y fuentes

| Requisito | Cita | Fuente |
|---|---|---|
| WebP/AVIF, sin PNGs pesados | D161 | R53 |
| `next/image` | D162 | R54 |
| `width`/`height` siempre (anti-CLS) | D163 | R55 |
| `loading="lazy"` bajo el primer pantallazo; NUNCA en hero | D164 | R56 |
| alt descriptivo honesto (sin spam de keywords) | D166-170 | R57 |
| Sora vía `next/font` | D176 | R58 |
| 1 fuente, ≤3 pesos | D178 | R59 |
| Prohibido texto oculto con keywords | D184 | R60 |

## Umbrales de calidad (Lighthouse, modo móvil)

| Métrica | Exigido por bases | Gate interno AGENTS.md |
|---|---|---|
| SEO | **100** (D192) | ≥95 → objetivo real: 100 |
| Accesibilidad | **>90** (D193) | ≥95 |
| Rendimiento | **>90** (D193) | ≥95 |
| Captura adjunta en entrega | D190/D205 | evidencia en `docs/qa/` |

## Responsive

- "Responsive real en móvil, tablet y escritorio" (D93); se prueba "en móvil real, no solo en
  el inspector" (D219, 15% de nota). Verificación interna: 360 / 768 / 1024 / 1440 + capturas.

## Accesibilidad (de la rúbrica D225)

Contraste, textos alternativos, navegación con teclado, etiquetas en el formulario, imágenes
optimizadas. WCAG 2.1 AA como marco interno (AGENTS.md).

## No especificado por las bases (NO inventar — no se implementa sin decisión)

- Tests automatizados (Vitest/Playwright) → no pedidos; solo QA manual + evidencia.
- Analytics → no pedidos; **no** añadir (superficie de terceros sin permiso).
- Dark mode → no pedido.
- Límite de peso de bundle/repo → no declarado; se mantiene ligero por CWV de todos modos.
- Framework de animación → "animaciones libres" (D96); se usa CSS puro, sin librerías.
- Zona horaria del plazo 23:59 → no declarada (Q: asumir España/peninsular, confirmar; el envío
  a 📦│ENTREGAS es manual por Lorena).

## Deploy (META)

- Destino: Cloudflare Pages o Vercel, gratuitos (D203). **Decisión D-16: Vercel** (cero config
  para Next.js App Router, deploy desde repo público). Pendiente: crear repo GitHub (activa MCP
  github) + cuenta Vercel de Lorena.
- `metadataBase`/canonical dependen de la URL final → Q4.
