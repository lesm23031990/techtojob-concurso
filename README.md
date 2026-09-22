# TechToJob — Landing del Torneo #2

Landing page de **TechToJob**, comunidad de desarrolladores y empresas tech en español.
Este sitio es la entrega de Lorena Salas al **Torneo #2** de la comunidad: el premio es una
oferta de empleo y la prueba técnica es la propia web.

> **No es un portal de empleo. Es una comunidad.**
> [Entra al Discord](https://discord.gg/h9FFgKdkRd) · Web desplegada: _enlace en el canal 📦│ENTREGAS_

## Stack

- **Next.js 16** (App Router) · Server Components por defecto, solo 2 client components justificados
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

Hero con un único CTA (entrar al Discord) → Cómo funciona (4 pasos) → Talento → Empresas →
Torneos → Networking → Testimonios (de muestra, con slot honesto para LinkedIn) → Noticias
(maqueta declarada) → Newsletter (franja pre-footer) → Cierre → Footer por bloques.
El orden es el del brief; no se reordenó ninguna sección.

## Calidad verificada

| Gate | Estado |
|---|---|
| `next build` + `tsc --noEmit` + ESLint | ✅ 0 errores |
| Auditoría de las 61 reglas del concurso (`docs/qa/2026-09-22-rules-audit-1.md`) | ✅ tras fixes R35/R56 |
| Lighthouse móvil (SEO / Accesibilidad / Rendimiento) | 📊 evidencia en `docs/qa/` |
| Responsive 360 / 768 / 1024 / 1440 | 📊 capturas en `docs/qa/` |
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

## Fuentes y créditos

- **Logo**: kit oficial de marca proporcionado por TechToJob (`app/public/brand/`, SVGs sin modificar).
- **Tipografía**: Sora (Google Fonts, OFL) cargada con `next/font`; pesos 400/600/700.
- **Iconos**: SVG dibujados a mano en `app/components/icons.tsx` (sin librerías).
- **Paleta**: carbón `#2f3436`, verde `#84c0bf`, blanco `#ffffff` + grises y un acento, según el brief.
- **Copy**: 100 % original, agrupado en `app/messages/es.json` (regla de textos separados del código).
- **Testimonios y noticias**: maquetas honestamente rotuladas como tales (el brief pide maqueta, no datos inventados).

Diseño y contenido por **Lorena Salas** · Web del Torneo #2 de TechToJob.
