# GUIA — Mapa del proyecto TechToJob Landing

> Documento de proceso: cómo se planificó, construyó y auditó esta entrega.
> Actualizado: 22/09/2026.

## 1. Qué es esto

Landing page para el **Torneo #2 de TechToJob** (premio: oferta de empleo). El código, el
historial de commits y esta documentación son parte de la evaluación del jurado: se priorizó
"qué puntúa ante un jurado técnico" sobre "qué es más rápido de hacer".

- Stack exigido por las bases: Next.js (App Router) + TypeScript + Tailwind — solo frontend + SEO.
- Idioma del sitio: español. Identificadores, commits y docs técnicos: inglés/español según
  la regla de "código en inglés" de las bases.

## 2. Fases y estado

| Fase | Qué | Estado |
|---|---|---|
| 1. Especificación | Bases del concurso → `specs/` (checklist de 61 reglas, landing spec, contenido, requisitos, rúbrica) | ✅ 22/09 |
| 2. Sistema de diseño | Tokens Tailwind, paleta, tipografía, uso del logo oficial → `docs/design-system.md` | ✅ 22/09 |
| 3. Construcción | Scaffold + 11 secciones + capa content-as-data + metadata/OG/JSON-LD/sitemap/robots | ✅ 22/09 |
| 4. Auditoría | rules-auditor (61 reglas, cita textual) + fixes R35/R56 + Lighthouse + capturas QA | ✅ 22/09 (evidencia en `docs/qa/`) |
| 5. Entrega | Repo público + deploy + mensaje al canal ENTREGAS con declaración de IA y capturas | ⏳ 23/09 |

> **Pendiente (22/09):** la landing se reordena y se lee como **línea de tiempo vertical** (D32).
> El hero pasó por dos iteraciones más el mismo día: **D34 "Cosmos en tinta"** (muro de tiles
> flotantes decorativos + nav pill + símbolo sobre el H1) y **D35 "Recruit en tinta"** (H1 partido
> en dos líneas editoriales, glows al 50%, tiles al 60%, píldoras-ancla + muro de stacks, cierre
> espejado). El campo de grafos vuelve a estar siempre activo (el flag `SHOW_GRAPH` se retiró).
> Todo está implementado y compilando (`tsc` + ESLint + `next build` en verde), pero **QA en pausa
> por decisión de Lorena (D28)**: nada de Playwright/Lighthouse/`rules-auditor` hasta su
> autorización explícita → quedan sin medir el INP del canvas, los contrastes del glow y la
> re-auditoría de R22 (reorden) y R11 (píldoras-ancla vs "un solo botón"). Implementó el
> orquestador por agotamiento de créditos de `opencode-go` (D29). La declaración del reorden para
> el README (R10) está redactada en D32 y se sube en la Fase 5.

## 3. Fuentes de verdad (jerarquía)

1. Bases oficiales del concurso y brief (material de entrada, no versionado por privacidad).
2. `specs/` — requisitos reescritos y verificables, cada uno con cita de la regla (R01–R61).
3. `AGENTS.md` — reglas de proceso y gates de calidad.

Los vacíos de información se registraron como preguntas en `docs/DECISIONES.md` (D1–D33);
nada de lo construido se asumió sin fuente.

## 4. Método: spec-driven + multiagente

Ninguna línea de código se escribió sin spec previa, y ninguna sección se dio por terminada
sin pasar el auditor de reglas. El trabajo lo ejecutaron 6 roles (definidos en
`.opencode/agent/`): orquestador/spec, diseño UX, constructor (único con permisos en `app/`),
SEO/rendimiento, QA de accesibilidad y auditor implacable de las bases. El uso de IA está
declarado en el README, como piden las bases.

## 5. Dónde está cada evidencia

| Afirmación | Prueba |
|---|---|
| "Cumple las 61 reglas" | `docs/qa/2026-09-22-rules-audit-1.md` (regla → estado → evidencia → acción) |
| "Calidad medida, no prometida" | `docs/qa/2026-09-22/` (Lighthouse JSON/HTML, capturas Playwright) |
| "Por qué se decidió X" | `docs/DECISIONES.md` (26 decisiones fechadas con motivo) |
| "El sistema de diseño es real" | `docs/design-system.md` + tokens en `app/app/globals.css` |
| "Los textos viven aparte del código" | `app/messages/es.json` (única fuente de copy visible) |
