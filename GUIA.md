# GUIA — Mapa del proyecto TechToJob Landing

> Documento de proceso: cómo se planificó, construyó y auditó esta entrega.
> Actualizado: 23/09/2026.

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
| 5. Entrega | Repo público + deploy + mensaje al canal ENTREGAS con declaración de IA y capturas | ⏳ 23/09 · **sin auditorías (D56)** |

### 2.0 Dónde se retoma (cierre de la sesión del 23/09)

- **Hero, header y footer: aprobados por Lorena.** Existe el **punto de retorno local `hero-v1`**
  (D60) sobre el commit `b18c3e1`; el hero no se vuelve a tocar sin una decisión nueva.
- **Lo que falta:** que Lorena revise **el resto de secciones** de la landing (el cuerpo:
  cómo funciona, torneos, talento, empresas, networking, testimonios, noticias, newsletter) y dar
  por bueno el conjunto; después, la **Fase 5** (repo público, deploy con URL real en `content.ts`
  → `site.url`, y mensaje en el canal ENTREGAS con la declaración de IA de R07).
- **Pendiente declarado:** la **traducción del EN** (D57) — el handoff está listo en
  `specs/12-i18n.md` y `/en` sirve hoy el catálogo ES como placeholder declarado.
- Los 17 commits del 23/09 están **solo en local**: `master` va 17 por delante de `origin/master`
  y no se hizo push por decisión de Lorena (D60).

### 2.1 Modo de trabajo vigente (D56, 23/09)

**Regla activa hasta que Lorena diga "vamos a revisar":** se trabaja con **3 agentes** y **cero
auditorías** en todas las tareas y fases, incluida la Fase 5.

- **Activos:** orquestador (specs, decisiones, coordinación), `design-ux` (criterio visual y
  copy) y `nextjs-builder` (única mano que escribe en `app/`).
- **Dormidos hasta el modo revisión:** `rules-auditor`, `qa-access`, `seo-perf`, Lighthouse,
  Playwright/axe, medición de INP y capturas de QA. Los agentes no se borran: siguen definidos
  en `.opencode/agent/` con su prompt y modelo intactos.
- **Permitido:** `tsc --noEmit`, ESLint y `next build` (segundos; evitan commitear código roto).
- **Motivo declarado por Lorena:** los ciclos de auditoría tardaban más que el propio cambio.
- **Supersede D28 y D39** (que pausaban QA solo mientras el diseño no estuviera congelado); los
  cierres "QA en pausa (D39)" de las iteraciones anteriores quedan como historia.
- **Consecuencia asumida:** la Fase 5 se cierra sin medición de Lighthouse/Playwright; al activar
  el modo revisión esos checks corren de una sola pasada sobre el estado congelado.

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
>
> **Pendiente (22/09, D38 "Bento Signature"):** a pedido de Lorena, las secciones del cuerpo
> dejan de ser uniformes (`h2 + párrafo`) y ganan ritmo con el lenguaje de tendencia 2026:
> **ticker** marquee bajo el hero + **bento asimétrico** en "Cómo funciona" (7+5+5+12),
> Testimonios (7/5/5/7) y Noticias (destacada + 2), todo CSS puro (cero islas cliente),
> Sora-only, paleta fija y `prefers-reduced-motion`. Talento / Empresas / Networking quedan
> editoriales (no tienen ítems: convertirlas obligaría a inventar copy). Implementado y
> compilando (`tsc` + ESLint + `next build` en verde) por el orquestador (excepción D29).
> **QA en pausa (D28):** sin Playwright/Lighthouse/`rules-auditor` hasta tu OK → quedan sin
> medir el INP del ticker, los contrastes del bento y la re-auditoría de R11 (ticker no-botón)
> y R26 (verde como texto).
>
> **Hecho (22/09 noche, D40 "Plano Cinético"):** pedido de rediseño del hero (mesh con manchas
> difuminadas + imágenes flotantes del torneo). **No se implementó literal** porque choca con
> D37.1 (prohibidos "blobs/aurora gradients" y "partículas flotantes"), con R24/R25 (violeta/
> cian/`#0B0F19`/`#F9FAFB` fuera de la paleta fija) y con J2 (no hay fotos reales del torneo).
> Se reinterpretó con vocabulario permitido por D37.1: campo de retícula hairline scroll-driven,
> haz de luz `brand` de bordes duros, marginalia tipo bracket, revelado del H1 por palabra
> (transform-only) y subrayado cinético continuo bajo la frase de acento. Spec en `specs/10`
> (§Hero V6). Implementado por `nextjs-builder` en `Hero.tsx` + `globals.css`; **`tsc --noEmit`,
> ESLint y `next build` en verde (cierre 22/09)**. Modo diseño (D39): sin `rules-auditor`/
> `qa-access`/`seo-perf` hasta congelar; el motion del H1 y el contraste del haz se miden en el
> gate de Fase 5.
>
> **Hecho (22/09 noche, D41 — iteración V7):** se **elimina el overline** (se apilaba en 5 líneas
> en `lg`), se añade el **combo #2 cristal facetado** (`conic-gradient` de borde duro en
> `brand`/`ember` + rotación lenta, cero blur) y **#4 red que se dibuja** (`HeroNetwork.tsx`, SVG
> server con `stroke-dashoffset`), y se **rebalancea la altura** del hero (`content-center`, padding
> superior reducido, H1 al frente de la fila con la marginalia). Spec en `specs/10` (§Hero V7);
> `tsc` + ESLint + `next build` en verde. QA sigue en pausa (D39).
>
> **Hecho (22/09 noche, D42/D43):** (D42) el apoyo del hero deja de partirse (`lg:col-span-5`) y
> **todos los botones-píldora pasan a `rounded-none`** (DiscordCta, header completo, newsletter,
> skip-link; se elimina el anillo `animate-breathe`). (D43) el **header se ensancha**
> (`page-container-wide`, 80rem), la **red del hero se retira** y en su lugar va la **marca de agua
> oficial** `logo-symbol-gradient.svg` al 10% (como Torneos/Cierre), y el **CTA gana impacto**
> (relleno `brand` que barre en `line`; barrido especular + micro-elevación en las rellenas, sin
> halo ni blur). `tsc` + ESLint + `next build` en verde. QA sigue en pausa (D39).
>
> **Hecho (22/09 noche, D44/D45):** (D44) el **grid de fondo del hero gana drift continuo** de
> una celda en 28s, en capa aparte del paneo por scroll (loop sin costura, solo `transform`).
> (D45) se **retira el recuadro del nav** de escritorio (queda una fila de enlaces sin marco) y la
> **marca de agua del hero sube a 520×520**. `tsc` + ESLint + `next build` en verde. QA sigue en
> pausa (D39).
>
> **Hecho (22/09 noche, D46):** **un solo estilo de botón Discord en toda la plataforma** —
> cuadrado relleno `brand`, texto `ink`, barrido especular + micro-elevación, flecha; solo cambia
> el tamaño (`nav`/`hero`/`block`). Se **retira la variante `line`** del hero (pasa a `size="hero"`)
> y el botón `hero` sube a `min-h-14 px-8` para más presencia. `tsc` + ESLint + `next build` en
> verde. QA sigue en pausa (D39).
>
> **Hecho (22/09 noche, D47/D47b/D48/D49):** (D47) **header adaptativo** con la isla
> `HeaderSurface` (la 2.ª isla cliente del sitio): la barra adopta la polaridad de la sección de
> detrás (crossfade `ink`↔`paper`), el logo cambia a `logo-horizontal.svg` en claro y el CTA recibe
> borde `ink` sobre claro; la franja `brand` de la newsletter se trata como oscura. (D47b) el
> **botón ya no "asoma"** fuera de la cabecera: barra sólida al 100% + franja de disolución debajo.
> (D48) **H1**: se corrigen los **espacios reales** entre palabras (bug a11y/SEO), `lg:col-span-8`
> y línea 2 acortada a *"Aquí te conocen antes de la vacante."*. (D49) **header alineado al eje de
> 72rem**, **scrollspy** (`aria-current`) y **hairline de progreso** CSS pura. `tsc` + ESLint +
> `next build` en verde. QA sigue en pausa (D39).
>
> **Hecho (22/09 noche, D50):** rebalance vertical del hero — se compensa el recorte de 80px del
> header (`-mt-20`) fijando `pt − pb = 80px` para centrar el bloque en el área visible, y se unifica
> el ritmo interno (`support → quick-nav` a `mt-10` en móvil). `tsc` + ESLint + `next build` en
> verde. QA sigue en pausa (D39).
>
> **Hecho (22/09 noche, D51 — variante A):** el quick-nav del hero pasa a **fila de salida** al pie
> (bloque principal `H1→CTA` centrado en `flex-1`, nav separado con su hairline, entre esta y la
> del ticker). Grid de 4rem y ticker intactos. **Checkpoint `b796176`** creado antes de
> experimentar → el diseño aprobado se recupera con `git revert`. `tsc` + ESLint + `next build` en
> verde. QA sigue en pausa (D39).
>
> **Hecho (22/09 noche, D52):** a pedido de Lorena, se **elimina el quick-nav** del hero (no le
> gustaba la fila de salida) y el hero **cierra con la banda del ticker**; sin texto muerto
> (`quickNavLabel` fuera). `tsc` + ESLint + `next build` en verde. QA sigue en pausa (D39).

> **Hecho (23/09, D54/D55/D57):** (D54) **i18n ES/EN** con next-intl: `/` sirve ES y `/en` sirve
> EN (`as-needed`, sin detección automática), hreflang cruzado en metadata y sitemap, OG por
> locale, selector de idioma como **enlace real** en header y panel móvil; textos solo en
> `messages/{es,en}.json` con paridad forzada por tipos. La **traducción real del EN queda
> aplazada (D57)** con handoff documentado en `specs/12-i18n.md`. (D55) el logo del header pasa a
> **composite simétrico tile+wordmark** en ambas polaridades, con el derivado
> `brand/wordmark-ink.svg` (mismos contornos oficiales, relleno carbón) para que el estado claro
> pese igual que el oscuro. `tsc` + ESLint + `next build` en verde.

> **Hecho (23/09, ajustes pedidos por Lorena):** (D56) el ciclo queda en **3 agentes sin
> auditorías** hasta que ella diga "vamos a revisar". (D57) la **traducción del EN se aplaza** con
> handoff listo para el equipo oficial. (D58) el **logo del footer** pasa a ser el composite del
> header en polaridad oscura (con `loading="lazy"` y decorativo). (D59) se **quita el raíl y el nodo
> del Cierre**, que ahora va centrado, y con ello se retira la variante `goal` de `TimelineRail`.
> Además, el CTA del menú móvil usa la etiqueta corta ("Entrar al Discord"), y se corrige la falta
> ortográfica del copy ("acuérdate"). Todo con `tsc` + ESLint + `next build` en verde.

## 3. Fuentes de verdad (jerarquía)

1. Bases oficiales del concurso y brief (material de entrada, no versionado por privacidad).
2. `specs/` — requisitos reescritos y verificables, cada uno con cita de la regla (R01–R61).
3. `AGENTS.md` — reglas de proceso y gates de calidad.

Los vacíos de información se registraron como preguntas en `docs/DECISIONES.md` (D1–D60);
nada de lo construido se asumió sin fuente.

## 4. Método: spec-driven + multiagente

Ninguna línea de código se escribió sin spec previa, y ninguna sección se dio por terminada
sin pasar el auditor de reglas. El trabajo lo ejecutaron 6 roles (definidos en
`.opencode/agent/`): orquestador/spec, diseño UX, constructor (único con permisos en `app/`),
SEO/rendimiento, QA de accesibilidad y auditor implacable de las bases. El uso de IA está
declarado en el README, como piden las bases.

> Desde el **23/09 (D56)** el ciclo se simplificó a **3 roles** (orquestador, `design-ux`,
> `nextjs-builder`) y sin auditorías, para priorizar avance; ver §2.1. Al decir Lorena
> "vamos a revisar" se reactivan los 6 roles y el gate de calidad completo.

## 5. Dónde está cada evidencia

| Afirmación | Prueba |
|---|---|
| "Cumple las 61 reglas" | `docs/qa/2026-09-22-rules-audit-1.md` (regla → estado → evidencia → acción) |
| "Calidad medida, no prometida" | `docs/qa/2026-09-22/` (Lighthouse JSON/HTML, capturas Playwright) |
| "Por qué se decidió X" | `docs/DECISIONES.md` (60 decisiones fechadas, D1–D60) |
| "El sistema de diseño es real" | `docs/design-system.md` + tokens en `app/app/globals.css` |
| "Los textos viven aparte del código" | `app/messages/es.json` (única fuente de copy visible) |
