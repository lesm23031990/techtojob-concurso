# TechToJob — Landing del Torneo #2

Landing page de **TechToJob**, comunidad de desarrolladores y empresas tech en español.
Este sitio es la entrega de Lorena Salas al **Torneo #2** de la comunidad: el premio es una
oferta de empleo y la prueba técnica es la propia web.

> **No es un portal de empleo. Es una comunidad.**
> [Entra al Discord](https://discord.gg/h9FFgKdkRd) · Web desplegada: [techtojob-concurso.vercel.app](https://techtojob-concurso.vercel.app)

## Stack

- **Next.js 16** (App Router) · Server Components por defecto, solo 3 client components justificados (header adaptativo, countdown y formulario)
- **TypeScript estricto** · sin `any`, `tsc --noEmit` limpio
- **Tailwind CSS v4** · design tokens en `@theme`, cero CSS a mano, cero UI kits
- Frontend puro + SEO técnico: sin backend, sin APIs propias, sin trackers de terceros

## Cómo correr en local

```bash
cd app
npm install
npm run build && npm start   # http://localhost:3000 (producción local)
# o en desarrollo:
npm run dev
```

## Qué contiene la landing

Hero con un único CTA (entrar al Discord) → Cómo funciona (4 pasos) → Torneos → Talento → Empresas →
Networking → Testimonios (de muestra, con slot honesto para LinkedIn) → Noticias (maqueta declarada)
→ Newsletter (franja pre-footer) → Cierre → Footer por bloques.

**Sobre el orden (R10):** las bases dejan el orden del cuerpo como orientativo y solo fijan el hero
al principio y el footer al final. Se reordenó a propósito para que la página se lea como una
**línea de tiempo vertical**: primero *cómo funciona*, después la prueba viva (el torneo en curso),
luego qué gana cada lado (talento / empresas), la comunidad, la validación, las noticias y el
cierre. El orden real vive en `app/app/[locale]/page.tsx` y el criterio está registrado en
`docs/DECISIONES.md` (D32, D38).

## Internacionalización (ES / EN)

- **Español en `/`** (idioma principal y canonical) y **`/en`** para la versión inglesa. Mientras el
  catálogo EN sea un espejo del ES, `/en` queda accesible pero **`noindex`** y fuera del `sitemap`
  (evita anunciar un `hreflang` cuyo idioma no coincide); el `lang` de cada ruta ya es correcto.
- El selector de idioma del header es un **enlace real** (`<a href>`, sin JavaScript, sin estado),
  como piden las bases.
- Todo el texto visible vive en `app/messages/es.json` y `app/messages/en.json`, nunca incrustado
  en los componentes; el tipado comprueba que ambos catálogos tengan exactamente las mismas claves.

> **Estado de la traducción:** `/en` sirve hoy **el mismo contenido en español** (el catálogo EN es
> un espejo del ES, *placeholder declarado*). La infraestructura bilingüe está completa y probada;
> la traducción es un trabajo de copy pendiente que **no requiere tocar código**. Para publicarlo
> basta traducir `en.json` y revertir el `noindex` + la entrada de `sitemap` (un cambio de 2 líneas,
> documentado en `specs/12-i18n.md` → *Handoff de traducción*).

## Calidad verificada

| Gate | Estado |
|---|---|
| `next build` + `tsc --noEmit` + ESLint | ✅ 0 errores |
| Auditoría de las 61 reglas del concurso (`docs/qa/2026-09-22-rules-audit-1.md`) | ✅ tras fixes R35/R56 |
| Lighthouse móvil (SEO / Accesibilidad / Rendimiento) | ⏳ a medir sobre el deploy final (última medición local: SEO 100 · A11y 100 · Perf 76 en `docs/qa/2026-09-22/`) |
| Responsive 360 / 768 / 1024 / 1440 | ⏳ capturas a generar sobre el deploy final |
| Auditorías, Lighthouse y Playwright | ⏸ **en pausa desde el 23/09 (D56)**; la evidencia vigente es la del 22/09 en `docs/qa/` |
| Metadata API + OG 1200×630 + Twitter Card + JSON-LD Organization + sitemap + robots | ✅ |
| WCAG 2.1 AA: semántica, jerarquía H1×1, contraste, teclado, `prefers-reduced-motion` | ✅ |

## Mapa del repo

| Carpeta | Contenido |
|---|---|
| `app/` | El sitio Next.js (todo el código) |
| `specs/` | Especificaciones derivadas de las bases: checklist de 61 reglas, landing spec, contenido, requisitos técnicos, rúbrica |
| `docs/` | Decisiones (`DECISIONES.md`), design system, evidencia de QA fechada |
| `AGENTS.md` · `GUIA.md` · `.opencode/` | El sistema multiagente con el que se construyó y auditó este repo |

## Declaración de uso de IA (requerido por las bases)

Este proyecto se construyó con un sistema multiagente propio (6 roles orquestados: spec, diseño,
construcción, SEO, QA de accesibilidad y auditor de reglas — definidos en `.opencode/agent/`).
Los agentes escribieron y auditaron código bajo especificaciones derivadas de las bases del
concurso; la dirección de producto, las decisiones de copy y la revisión final son humanas.
El proceso completo es auditable en el historial de commits y en `docs/`.

> **Modo de trabajo actual (D56):** desde el 23/09 el ciclo se redujo a **3 roles** (orquestador,
> diseño UX y construcción) y las auditorías/Lighthouse quedaron **en pausa declarada**; los
> agentes de QA, SEO y auditoría siguen definidos en `.opencode/agent/`. La evidencia de calidad
> publicada es la de la Fase 4 (22/09) y los fixes posteriores se validan con `tsc`, ESLint y
> `next build`.

## Fuentes y créditos

- **Logo**: kit oficial de marca proporcionado por TechToJob (`app/public/brand/`). El resto de
  variantes se sirven **sin modificar**. Tres archivos son **derivados documentados** sobre los
  contornos oficiales (mismo `viewBox`, solo cambian los rellenos), usados en el composite del
  header: `wordmark-duo.svg` (D31), `wordmark-ink.svg` (D55) y `wordmark-ink-duo.svg` (D97).
- **Tipografía**: Sora (Google Fonts, OFL) cargada con `next/font`; pesos 400/600/700.
- **Iconos**: SVG dibujados a mano en `app/components/icons.tsx` (sin librerías).
- **Paleta**: carbón `#2f3436`, verde `#84c0bf`, blanco `#ffffff` + grises y un acento, según el brief.
- **Copy**: 100 % original, agrupado en `app/messages/es.json` y `app/messages/en.json` (regla de
  textos separados del código; el catálogo EN está pendiente de traducción, ver arriba).
- **Testimonios y noticias**: maquetas honestamente rotuladas como tales (el brief pide maqueta, no datos inventados).

Diseño y contenido por **Lorena Salas** · Web del Torneo #2 de TechToJob.
