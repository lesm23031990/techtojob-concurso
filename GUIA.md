# GUIA — Mapa vivo del proyecto TechToJob

> Archivo de trabajo de Lorena + agentes. Actualizarlo al cerrar cada fase.
> Última actualización: 22/09/2026

## 1. Resumen ejecutivo

- **Qué es:** landing page para un concurso de TechToJob cuyo premio es una oferta de empleo.
- **Implicación:** es una prueba técnica encubierta. Se evalúa stack (Next.js + TS + Tailwind),
  calidad de código, SEO técnico, diseño/UX, accesibilidad y presentación (README, commits, deploy).
- **Stack del concurso:** Next.js (App Router) + TypeScript + Tailwind — SOLO frontend + SEO.
- **Repo:** público (el jurado lo revisa). `material-concurso/` nunca se sube.

## 2. Fases

| Fase | Qué | Estado |
|---|---|---|
| 1. Estructura agéntica | Carpetas, AGENTS.md, opencode.json, agentes, skills, MCPs, git | ✅ HECHA (22/09) |
| 2. Ingesta Discord → specs | Procesar `material-concurso/`, generar `specs/` + checklist de reglas | ✅ HECHA (22/09) — ⚠️ 3 bloqueantes: brief.md, logo, link Discord (QA-P8/P9/P10) |
| 3. Sistema de diseño + scaffold | Design tokens, paletas, tipografías, `create-next-app` en `app/` | 🔴 URGENTE — entregar 23/09 23:59 |
| 4. Implementación | Secciones de la landing, una por una, con auditoría por sección | 🔴 URGENTE — mismo plazo |
| 5. SEO + QA + entrega | Lighthouse, JSON-LD, sitemap, evidencia en `docs/qa/`, README, deploy | 🔴 URGENTE — mismo plazo |

## 3. 📥 CHECKLIST: lo que hay que traer del Discord

Copiar todo esto a `material-concurso/` (puede ser UN solo txt, o varios, o screenshots —
lo que más convenga es **pegar los mensajes crudos tal cual**, con fechas y autores si puedes
en txt aparte, porque las capturas se ignoran para git pero los txt también).

### 3.1 Crítico — bloquea el inicio de la Fase 2
- [x] **Bases / reglas completas del concurso** → `material-concurso/discord.txt` ✅ 22/09
- [ ] **Brief exacto de la landing**: ⚠️ falta el contenido de `brief-techtojob.md` (QA-P8)
- [x] **Fecha límite**: 23/09/2026 23:59 ✅
- [x] **Cómo se entrega**: repo público GitHub + deploy (CF Pages/Vercel) + capturas + Lighthouse, al canal ENTREGAS ✅

### 3.2 Importante — define el diseño y la estrategia
- [x] **Criterios de evaluación y pesos** (en el propio post de bases, D215-227) ✅
- [ ] **Marca**: ⚠️ faltan los archivos del logo del canal 🎨 RECURSOS (QA-P9); paleta y Sora ✅
- [ ] **Contenido**: textos a escribir por nosotras (regla del concurso); falta brief (QA-P8)
- [x] **Requisitos técnicos**: transcritos textuales en `specs/20` ✅

### 3.3 Útil — sube el puntaje
- [x] Ejemplos/referencias: 17 capturas en `capturas/` ✅
- [ ] FAQ del canal CHARLA: nada relevante pegado (opcional)
- [ ] **Enlace de invitación al Discord** + nombre/handles oficiales para JSON-LD (QA-P10/P11)
- [x] ¿Se puede usar IA? SÍ, declarándolo (D102) ✅

### 3.4 Por confirmar (puede cambiar el plan)
- [ ] ¿Propiedad del código tras ganar? → sin LICENSE hasta confirmar (D5)
- [x] ¿Idioma? → ES con i18n-ready; bilingüe opcional descartado (D14)
- [x] ¿Límite de peso/bundle? → no declarado; gate CWV interno
- [x] ¿Testing requerido? → no pedido; QA manual + evidencia (specs/20)

## 4. Cómo se trabaja con el txt del Discord

1. Lorena guarda el material en `material-concurso/bases/BASES-CONCURSO.txt` (u otros nombres,
   cualquier .txt/.md sirve; los binarios van en `marca/` o `capturas/`).
2. Ordenar el pegado NO hace falta — se pega crudo, con separadores tipo
   `--- mensaje de @usuario, 21/09 ---` si los recuerdas (ayuda, no es obligatorio).
3. El comando/skill `discord-material-intake` procesa el material → genera:
   - `specs/00-checklist-reglas.md` (cada regla con cita, estado OK/pendiente/violada)
   - `specs/10-landing-spec.md` (secciones, contenido, conversión)
   - `specs/20-requisitos-tecnicos.md` (umbrales, stack, entregables)
   - `docs/DECISIONES.md` (vacíos de información que requieren pregunta a Lorena/organizador)
4. Nunca se asume información ausente: todo vacío va a la lista de preguntas.

## 5. Sistema multiagentes (6 roles)

| Agente | Modo | Lente sobre el trabajo |
|---|---|---|
| `spec-architect` | primary | Orquesta fases, mantiene specs, resuelve conflictos de fuentes |
| `design-ux` | subagent | Sistema de diseño, jerarquía, conversión, copy |
| `nextjs-builder` | subagent | ÚNICO que escribe código en `app/` |
| `seo-perf` | subagent | Metadata, JSON-LD, Core Web Vitals, indexabilidad |
| `qa-access` | subagent | Lighthouse, WCAG AA, responsive, + checklist de seguridad, evidencia |
| `rules-auditor` | subagent | Auditor implacable contra las bases del concurso |

MCPs: `playwright` (pruebas visuales/evidencia), `context7` (docs frescos Next/Tailwind),
`github` (apagado hasta crear el repo público).

## 6. Decisiones ya tomadas

- Estructura agéntica replica el patrón SportFlow adaptado (sin backend-builder).
- Seguridad NO es rol propio → checklist de 10 puntos dentro de `qa-access`
  (cabeceras, cero scripts terceros innecesarios, validación de formulario, deps limpias,
  sin secretos, CSP si aplica, `next/image` solo recursos permitidos, sin eval,
  links externos con `rel`, sin datos personales en código).
- `app/` como subcarpeta: raíz del repo queda limpia para README/docs/specs (vista del jurado).
- Sin LICENSE hasta confirmar propiedad en bases.
- Fases estrictas: no hay código sin spec; no hay spec sin material procesado.
