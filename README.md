# TechToJob Concurso — Landing Page

Landing page construida para el concurso de TechToJob (premio: oferta de empleo).
Stack: Next.js (App Router) + TypeScript + Tailwind CSS — frontend puro + SEO técnico.

> Estado actual: FASE 1 (estructura) completada. El proyecto se documentará
> aquí en detalle a medida que avance (capturas, decisiones, evidencia de QA).

## Cómo correr en local (cuando exista `app/`)

```bash
cd app
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

## Mapa del repo

| Carpeta | Contenido |
|---|---|
| `specs/` | Especificaciones verificables derivadas de las bases del concurso |
| `docs/` | Decisiones, design system, evidencia de QA con fechas |
| `app/` | Código de la landing (Next.js) — a partir de Fase 3 |
| `AGENTS.md` | Reglas del proyecto y del sistema multiagente |
| `GUIA.md` | Mapa vivo de fases y checklist de información pendiente |

## Estructura multiagente

El trabajo lo ejecuta un sistema de 6 roles orquestado por `spec-architect`:
`design-ux` (diseño/conversión) · `nextjs-builder` (único que escribe código) ·
`seo-perf` (SEO técnico + Core Web Vitals) · `qa-access` (Lighthouse, WCAG AA,
seguridad) · `rules-auditor` (cumplimiento literal de las bases del concurso).
