# TechToJob Concurso — Landing Page

## Contexto del proyecto

Concurso cuyo premio es una **oferta de empleo**. La entrega es una landing page.
El código, el repo y el historial de commits SON parte de la evaluación del jurado.

**Regla de oro:** cada decisión técnica o de diseño se toma preguntando
"¿qué puntúa ante un jurado técnico?" — no "qué es más rápido de hacer".

## Stack obligatorio (definido por las bases del concurso)

- Next.js (App Router) + TypeScript estricto
- Tailwind CSS
- Deploy local en Fase 3 (el destino de entrega se confirma en `specs/`)

## Fuentes de verdad (jerarquía)

1. `material-concurso/bases/` — reglas oficiales del concurso (NUNCA contradecirlas)
2. `specs/` — especificaciones derivadas y aprobadas
3. `AGENTS.md` — este archivo (reglas de proceso)

Si dos fuentes se contradicen: **las bases ganan**, y se registra el conflicto en `docs/DECISIONES.md`.

## Reglas innegociables

### Alcance
- Este concurso es **solo frontend + SEO**. NO existe backend propio en este proyecto:
  sin APIs, sin bases de datos, sin servidores Node. Todo lo dinámico es del lado del cliente
  o generación estática de Next.js (SSG/ISR).
- No inventar requisitos: si una regla no está en `material-concurso/`, NO existe.
  Ante ambigüedad, preguntar a Lorena, no asumir.

### Repo público (el jurado lo va a leer)
- `material-concurso/` está en `.gitignore` — NUNCA entra al repo (capturas de Discord
  con usernames y mensajes de terceros). Solo salen hacia `specs/` requirements reescritos,
  sin datos personales ni material gráfico ajeno.
- Commits pequeños, frecuentes, mensaje convencional (`feat:`, `fix:`, `design:`, `seo:`, `docs:`...).
  Prohibido: "initial commit" con 80 archivos, force-push, mensajes vacíos.
- Jamás secretos, tokens ni emails personales en código, commits o historial.
- Sin archivo LICENSE hasta confirmar propiedad del código en las bases.

### Calidad mínima exigida (gate de toda entrega)
> Este gate **NO se ejecuta por defecto**. Solo se activa cuando Lorena dice "vamos a revisar"
> (ver *Modo rápido* más abajo). Es el listón que la entrega debe alcanzar en ese momento, no una
> tarea de cada cambio.

- Lighthouse ≥ 95 en Performance, SEO y Accessibility (móvil y escritorio)
- Accesibilidad WCAG 2.1 AA: semántica HTML, roles ARIA cuando toque, contraste,
  navegación por teclado, `alt` reales, jerarquía de encabezados correcta
- Responsive mobile-first verificado (360px, 768px, 1024px, 1440px)
- TypeScript sin `any`, sin errores de `tsc --noEmit`, ESLint limpio
- Server Components por defecto; `"use client"` solo donde justifique
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP bajo; fuentes con `next/font`;
  imágenes con `next/image`
- Metadata API completa + Open Graph + JSON-LD + `sitemap.ts` + `robots.ts`

### Proceso (SDD: spec-driven development)
- Nada de código sin spec escrita en `specs/`. Orden de fases:
  1. Ingesta del material de Discord → `specs/`
  2. Sistema de diseño → `docs/design-system.md` + tokens Tailwind
  3. Scaffold Next.js en `app/`
  4. Implementación por secciones (en modo revisión: `rules-auditor` + `qa-access`)
  5. Pulido SEO + evidencia de QA en `docs/qa/` + README final (solo en modo revisión)

### Roles de trabajo
- Los agentes y sus permisos están definidos en `opencode.json` + `.opencode/agent/`.
- `rules-auditor` y `qa-access` NO editan código: solo auditan y reportan a `docs/qa/`.
- `nextjs-builder` es el único que escribe en `app/`. Excepción registrada: D29 (créditos
  de `opencode-go` agotados), donde el orquestador implementó directamente.
- Los reportes de auditoría citan textual la regla del concurso que motiva el hallazgo.
- **Modo rápido vigente (D56):** `rules-auditor`, `qa-access` y `seo-perf` están **dormidos**;
  no se invocan hasta que Lorena diga "vamos a revisar". Los roles de abajo siguen vigentes
  para cuando eso ocurra.

### Modo rápido: 3 agentes, cero auditorías (REGLA VIGENTE por defecto)
- **Vigente desde D56 (23/09/2026) y hasta que Lorena diga "vamos a revisar" o cambie la
  decisión.** No tiene fecha de caducidad: aplica a **toda** tarea y a **todas** las fases,
  incluida la Fase 5 (entrega).
- **Solo 3 roles activos:** el orquestador (specs, decisiones, coordinación), **`design-ux`**
  (criterio visual y copy) y **`nextjs-builder`** (única mano que escribe en `app/`).
- **Prohibido invocar** `rules-auditor`, `qa-access`, `seo-perf`, y cualquier herramienta de
  verificación: Lighthouse, Playwright/axe, auditorías de contraste, medición de INP, capturas
  de QA. Motivo declarado: el ciclo de auditoría tardaba más que el propio cambio y frenaba el
  avance; Lorena prioriza iterar.
- Los agentes pausados **no se borran**: siguen definidos en `.opencode/agent/` y su prompt,
  permisos y modelo intactos. Solo quedan dormidos hasta el modo revisión.
- **Permitido en este modo** (no es auditoría ni agente): `tsc --noEmit`, ESLint y `next build`
  — verificaciones locales de segundos que evitan commitear código roto. Nada más.
- **Al activar el modo revisión** (Lorena dice "vamos a revisar"): vuelve a aplicar completo el
  gate "Calidad mínima exigida" + Fase 5, con `rules-auditor`, `qa-access` y `seo-perf` sobre el
  estado congelado en ese momento.
- Origen: D56 en `docs/DECISIONES.md`; **supersede D28 y D39** (que pausaban QA solo mientras el
  diseño no estuviera congelado y reactivaban el gate al congelarlo).

### Modelos de los agentes (arquitectura dual)
- **Primario: `opencode-go`**, con el modelo afinado de cada agente (kimi-k3 para el builder,
  glm-5.3 para diseño, qwen3.8-flash para spec/QA/auditoría/SEO).
- **Reserva: `deepseek/deepseek-flash`**, solo mientras los créditos de `opencode-go` estén
  agotados. Es reserva de **disponibilidad**, no de calidad: los agentes conservan su prompt,
  permisos y temperatura.
- Interruptor: `node scripts/set-agent-models.mjs opencode-go|deepseek|status [--dry-run]`.
- opencode **no recarga la config en caliente**: tras cambiar de modo hay que reiniciar opencode.
- La evidencia de `docs/qa/` debe indicar con qué modelo se generó.

## Estructura del repositorio

```
techtojob-concurso/
├── AGENTS.md                 ← reglas generales (este archivo)
├── GUIA.md                   ← mapa vivo: estado, fases, checklist Discord
├── opencode.json             ← agentes + MCPs
├── .opencode/
│   ├── agent/                ← prompts de los 6 agentes
│   └── skills/               ← skills de proyecto
├── material-concurso/        ← 🚫 FUERA DE GIT: Lorena deposita aquí el Discord
│   ├── bases/                ←   reglas, requisitos, fechas (txt/pdf/screenshots)
│   ├── criterios/            ←   ponderación de evaluación
│   ├── marca/                ←   logos, paletas, tipografías
│   └── capturas/             ←   screenshots de posts del canal
├── specs/                    ← FASE 2: especificaciones verificables
├── docs/                     ← decisiones, design system, evidencia QA
│   └── qa/
└── app/                      ← FASE 3-4: proyecto Next.js (create-next-app)
```

## Estado actual

**FASES 1–4 completadas (22/09/2026):** specs con 61 reglas trazadas, design system con tokens,
landing completa en `app/` (11 secciones + SEO técnico), auditoría rules-auditor pasada 1 con
fixes aplicados (R35 commits+identificadores, R56 lazy, J6 aria-label footer) y evidencia QA
en `docs/qa/`. Historial reescrito local antes del primer push (D22) — sin remote aún, seguro.
**Queda FASE 5 (23/09):** repo público GitHub → deploy Vercel con URL real en `content.ts`
(`site.url`) → Lighthouse + capturas sobre el deploy → mensaje al canal ENTREGAS con
declaración de IA (R07).
**Modo vigente (D56, 23/09):** Fase 5 se ejecuta **sin auditorías**: solo orquestador +
`design-ux` + `nextjs-builder`. Lighthouse/Playwright/`rules-auditor`/`qa-access`/`seo-perf`
se reactivan **solo** cuando Lorena diga "vamos a revisar". Nota: la rama `backup/pre-reword`
ya se borró (22/09) porque sus
blobs contenían el invite no oficial; el historial quedó reescrito con `filter-branch` y
verificado con `git grep` sobre `rev-list --all` → 0 ocurrencias.
