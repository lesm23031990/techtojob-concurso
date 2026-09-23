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
| 3. Construcción | Scaffold + 9 secciones (Audiencias unifica Talento+Empresas, D75) + capa content-as-data + metadata/OG/JSON-LD/sitemap/robots | ✅ 22/09 · revisada 23/09 |
| 4. Auditoría | rules-auditor (61 reglas, cita textual) + fixes R35/R56 + Lighthouse + capturas QA | ✅ 22/09 (evidencia en `docs/qa/`) |
| 4b. Blindaje + RE-auditoría | Re-auditar las 61 reglas + Lighthouse + Playwright/axe sobre el estado final | 🔄 **23/09:** auditoría en solo-lectura corrida (`rules-auditor` + `seo-perf` + `qa-access`) y fixes críticos aplicados (D125/D126); falta Lighthouse/capturas sobre el deploy |
| 5. Entrega | Repo público + deploy + mensaje al canal ENTREGAS con declaración de IA y capturas | ⏳ **bloqueante:** fijar la URL real en `content.ts` (`site.url` hoy apunta a un dominio ajeno) → capturas + Lighthouse + mensaje ENTREGAS |

### 2.0 Dónde se retoma (cierre de la sesión del 23/09)

- **23/09 (D125/D126) · auditoría estricta aplicada.** `rules-auditor`, `seo-perf` y `qa-access`
  corrieron en **solo-lectura** sobre el estado congelado. **Hallazgo bloqueante:** `content.ts:316`
  (`site.url`) apunta a `https://techtojob.vercel.app`, que **hoy sirve la web de OTRO participante**
  (y `techtojob-landing.vercel.app` también es de otro); **no hay deploy de este repo**, así que
  canonical/OG/sitemap/JSON-LD apuntan fuera. **No es entregable hasta fijar la URL real.**
  Aplicado: `loading="lazy"` fuera del hero (R56), `animation-delay: 0s` en el guard de reduced-motion,
  provider i18n recortado a `newsletter`, `HeaderSurface` con `IntersectionObserver`, `Countdown` con
  pausa offscreen/pestaña oculta, 7 `will-change` fuera, `og:image:alt` localizado, JSON-LD
  `@graph` Organization+WebSite + logo PNG, `x-default`, sitemap solo ES con `lastmod` fijo, cabeceras
  de seguridad, testimonios sin Lorem ipsum, H1 con la frase que posiciona (R38), nav/footer
  "Empresas" → `#empresas`, `IconArrowRight` fuera. `/en` queda `noindex` (D126). `tsc`+ESLint+`next build` en verde.

> **DISEÑO CERRADO (D88/D98/D100–D107, 23/09): Hero → Newsletter.** Las secciones **Hero, Cómo
> funciona, Torneos, Audiencias, Networking, Testimonios (D89/D90), Noticias (D98) y Newsletter
> (D100–D107)** quedan congeladas: **no se vuelven a tocar sin una decisión nueva.**
> El **Cierre (`#unete`) pasó por varias vueltas el 23/09** —globo reticulado y red (D108–D120),
> retícula + constelación, **todas descartadas**— hasta la versión final **D121/D122** (100vh + "la
> puerta" + luces del hero + remate de marca + ticker compartido), que Lorena **aprobó** ("diseño
> totalmente aprobado, todo me encanta"). Después, el
> **entregable (Fase 5)** y, cuando Lorena diga *"vamos a revisar"*, el gate de auditoría (D56).

- **Hero, header y footer: aprobados por Lorena.** Existe el **punto de retorno local `hero-v1`**
  (D60) sobre el commit `b18c3e1`; el hero no se vuelve a tocar sin una decisión nueva.
- **"Cómo funciona": DISEÑO CERRADO (23/09, D66–D69) y REABIERTO ese mismo día con D70** (Lorena pidió
  "¿qué le falta para ganar?"): texto a 8 col para cerrar el hueco título↔texto y el resultado como
  ancla de jerarquía. El conector nodo→título que se probó fue **rechazado y retirado**. **No se vuelve
  a tocar sin una decisión nueva** (los puntos 5 ritmo `lg` y 6 firma quedan para el gate de revisión).
- **Torneos: REDISEÑADO (23/09, D71), con datos reales (D72), pulido (D73), reequilibrado (D74) y
  superficie final `mist` (D87). DISEÑO CERRADO (D88).** Deja de ser `h2 + párrafo` y pasa a **4 pilares**:
  torneo real (`Torneo #2 — la landing de TechToJob` + CTA Discord) en 7 col con **botín y salón de la
  fama apilados** en 5 (chip `Ejemplo`), y **cierre real a todo el ancho** con tabla de husos (estático,
  Sora `tabular-nums`). Entradas con `.reveal-left` (la misma que `#como-funciona`). Sin islas nuevas.
- **Audiencias (Talento + Empresas): CERRADA (23/09, D75–D79), aprobada por Lorena.** Las dos
  secciones apiladas se fusionan en UNA split sobre `mist` (dos celdas `paper` con badge `1`/`2`,
  icono en tile, listas escaneables), H2 SEO, intro sin eco y microcopy honesto ("Se hace dentro del
  Discord."). Los CTA anclan a `#unete`; nav y footer apuntan a `#talento`. La pasada de jurado (D79)
  alineó la etiqueta del CTA de Empresas ("Publicar vacante"), dio presencia a los iconos y limpió
  código muerto (`--i`).**No se vuelve a tocar sin una decisión nueva.**
- **Torneos: contador en vivo añadido (D80)** en el hueco de la tarjeta del torneo (entre el reto y el
  CTA): `Countdown`, la 2.ª isla cliente del sitio, con estado "Entregas cerradas." al expirar.
  **Pendiente del gate de revisión:** capturas responsive y contraste (J3/J6).
- **Networking: rediseño asimétrico (D81)** — el párrafo monolítico pasa a título + intro `lg:sticky`
  a la izquierda y tres bloques a la derecha (canales por área como píldoras, respuestas en minutos
  con punto `brand` de actividad, y el mercado oculto como ancla). **Se conserva el tono `paper`** por
  decisión de Lorena; hovers solo por opacidad. Contenido en `messages.networking` (R36).
  **Pendiente del gate de revisión:** capturas responsive 360/768/1024/1440 y contraste (J3/J6).
- **Networking: contenido real + ember + isotipo (D82/D83)** — las 4 píldoras inventadas pasan a las
  **8 áreas reales del Discord** (`#Development`, `#Data & AI`…), con nota de acceso a canales/roles;
  punto `ember` en cada eyebrow, isotipo oficial bajo el título y entrada `.reveal-enter` en la
  columna sticky. **D85:** la columna derecha entra con `.reveal-left`.
- **Movimiento global + ritmo cromático + vida idle (D84/D85/D86/D87)** — deriva de texto con el scroll
  (`.text-drift`, 7 secciones), hilo ambiental por sección (`.section-idle`), **Torneos `mist`** y
  **Audiencias `ink`** (CTA con `surface`), **Testimonios `mist`** (el mismo azul claro que Torneos:
  `mist` `#f4f7f7`, NO `brand-soft`, que queda reservado sin uso — D87) y brillos idle de líneas y
  bordes (`.line-idle`/`.card-idle`) con acento **`ember`** en Torneos (glints + puntos + pulso en
  "Torneo en curso"). Detalle en `design-system.md` §3/§3.1/§7/§9 y `DECISIONES.md` D82–D87.
- **Testimonios: marquee + banda + watermarks + nav (D89/D90, 23/09)** — la sección deja el bento
  7/5/5/7 y pasa a un **slider horizontal CSS puro full-bleed** sobre `mist`, dentro de una **banda
  `brand-soft`** (hairlines, sombra y relieve; el desvanecido de bordes va solo en las tarjetas).
  Track duplicado `−50%` con `REPEAT=3` (sin huecos en ningún viewport), pausa por `hover`/`focus`
  + control CSS-only, tarjetas `paper` (borde `ink/10`), `.reveal`/`.reveal-left`, dos puntos `ember`
  y enlace de cierre al Discord (texto, R11). Las **marcas de agua** de Hero, Audiencias (nueva) y
  Cierre pasan de `logo-symbol-gradient` a `logo-symbol-light` al **6%**. `#newsletter` entra en la
  **nav de escritorio** (tier `xl`). Detalle en `DECISIONES.md` D89/D90 y `design-system.md`
  §6.4/§7/§9. `tsc` + ESLint + `next build` en verde.
- **Newsletter rediseñada de punta a punta (D100–D107, 23/09) — sección CERRADA, pendiente solo tu
  visto bueno visual.** Por petición de Lorena se retira la franja `brand` maciza: la sección pasa a
  **`ink`** y todo el bloque vive en **UN panel Bento** `coal` + hairline (D100), con la rejilla 7/5 y
  hairline vertical (D101). El formulario se rehace como **columna "consola"**: overline de label,
  input a ancho completo (`border-white/40` = 3.37:1, WCAG 1.4.11) y **botón cuadrado a ancho
  completo** (D101 — el `rounded-lg` de D100 se revirtió al verlo en pantalla). El mensaje deja de ser
  un párrafo y pasa a **estructura escaneable** con las mismas palabras del copy aprobado: lead +
  `<ul>` de 3 items + sello "sin relleno y sin spam" (D107). Movimiento: **entrada del panel**
  (`.panel-in`), **destello idle de los CTA rellenos** (`.cta-glint`) y **halo de los nodos del raíl**
  (`.node-flash`, con el acento propio de cada familia y fase escalonada por `--i`) (D103/D105); la
  **entrada/salida se ralentiza** (entrada 22%→38%) y luego **la salida se acorta** (meseta 84%→92%)
  (D102/D106); y se **poda ornamento** del panel (fuera `.card-idle` y el glint del borde superior,
  D104). Además, "Cómo funciona" y "Torneos" bajan su escala tipográfica con `.section-tight` (D102).
  Cero copy nuevo, cero islas nuevas, cero colores fuera de la paleta. `tsc` + ESLint + `next build`
  en verde.
- **CIERRE (`#unete`): "100vh + la puerta + luces del hero + remate de marca + ticker" (D121/D122,
  23/09) — ✅ APROBADO por Lorena ("diseño totalmente aprobado, todo me encanta").** Tras varias
  vueltas exploratorias descartadas (globo reticulado y red, D108–D120; después retícula +
  constelación), el estado final es: sección de **una pantalla** (`min-h-svh`, contenido centrado) con
  **las luces facetadas del hero** reutilizadas tal cual, el gesto **"la puerta"** (dos hojas `ink`
  con canto `brand` que se abren con el scroll, rango corto y `pointer-events-none`), el **remate de
  marca** (isotipo oficial grande dentro de un anillo de luz que gira y respira) y, como última fila,
  el **`Ticker` compartido** (mismo componente que cierra el hero, `hidden sm:block`) para que la
  página abra y cierre con la misma banda. Texto centrado con su reveal bidireccional intacto. Cero
  colores nuevos, cero `filter: blur`, cero islas cliente. **Refactor registrado:** el ticker se
  extrajo a `components/Ticker.tsx` tocando el hero (congelado en D88) sin cambiar un píxel (D122).
  `tsc` + ESLint + `next build` en verde. **Último ajuste (D123):** el desvanecido izquierdo del
  slider de Testimonios ahora arranca en la **línea de tiempo**, no en el canto de la página.
  **Pendiente del gate "vamos a revisar":** capturas 360/768/1024/1440 y confirmar que el Cierre no
  supera una pantalla.
- **PRÓXIMA SESIÓN (handoff, D124): BLINDAJE + TRAZABILIDAD + AUDITORÍA.** El diseño está **aprobado**,
  así que se vuelve al gate completo y se prepara el entregable. Orden sugerido:
  0. **⏰ Ojo con la fecha de cierre del Torneo #2** (dato real, D72): entrega **jueves 24 · 00:00
     México → 08:00 España**. Hoy es miércoles 23, así que **el entregable va primero**: si el tiempo
     aprieta, se entrega con lo que ya está en verde y la auditoría se cierra después.
  1. **Commit de congelado** del estado aprobado (working tree actual: Hero/Closing/Ticker/
     Testimonials/TimelineRail, `globals.css`, docs y specs) para que el veredicto apunte a un SHA.
  2. **PARTE 0 · Trazabilidad con las BASES y el BRIEF** (petición expresa de Lorena): re-leer
     `material-concurso/bases-concurso.txt` y `material-concurso/brief.md` (material local, fuera de
     git) y comprobar, **requisito por requisito**, que (a) **todas** las reglas de las bases están
     capturadas en `specs/00-checklist-reglas.md` (R01–R61) y que sus **citas textuales son fieles**,
     (b) no hay **ningún requisito del brief** sin cubrir en `specs/10`/`specs/20`, (c) lo entregado
     cumple el **formato de entrega** de las bases (qué se envía, dónde y con qué declaración de IA,
     R07), y (d) **no hay requisitos inventados** (nada en `specs/` sin fuente en las bases o el brief).
     Salida esperada: matriz **bases/brief → spec → implementación → evidencia** con los huecos
     marcados. Cualquier hueco se le presenta a Lorena con opciones (regla D124) **antes** de tocar algo.
  3. **Re-auditoría de las 61 reglas** (rules-auditor, cita textual) sobre el estado congelado — la
     evidencia de `docs/qa/` es del 22/09 y no cubre el rediseño posterior.
  4. **Lighthouse + capturas 360/768/1024/1440 + contraste** (qa-access/seo-perf) y medición de
     CWV (LCP/CLS/INP).
  5. **Plan de pruebas funcional** (anclas, CTA, formulario, marquee, teclado, reduced-motion).
  6. **Cerrar pendientes declarados**: R22 ("en riesgo": reorden narrativo + declaración en README),
     traducción del EN (D57), tipo `Messages` a mano, `--i` inertes.
  7. **Fase 5**: repo público → deploy Vercel con la URL real en `content.ts` → Lighthouse/capturas
     sobre el deploy → mensaje al canal ENTREGAS con la declaración de IA (R07).
  **Regla para los cambios (D124):** cualquier hallazgo se le presenta a Lorena **con opciones
  equivalentes en diseño** y solo se ejecuta con su OK. Punto de partida del código:
  `Closing.tsx` + `Ticker.tsx` + `globals.css` (bloques D121–D123) y `docs/DECISIONES.md` D121–D124.
- **Freeze vigente:** **Hero → Networking cerradas** (D88); no se tocan sin decisión nueva. Excepción
  registrada: **Audiencias** recibió el watermark en D90 por petición expresa (solo decoración).
  **Noticias** (D98) y **Newsletter** (D100–D107) también quedan cerradas. El **Cierre (D121/D122/D123)**
  queda **cerrado y aprobado por Lorena**. Desde la próxima sesión aplica el **modo revisión (D124)**:
  6 agentes y gate completo, con la regla de que todo cambio de diseño se consulta y se ofrece con
  opciones equivalentes.
- **Después, Fase 5 (entregable):** repo público en GitHub → deploy Vercel con URL real en `content.ts`
  (`site.url`) → Lighthouse/capturas → mensaje al canal ENTREGAS con la declaración de IA (R07).
- **Pendiente declarado:** la **traducción del EN** (D57) — el handoff está listo en
  `specs/12-i18n.md` y `/en` sirve hoy el catálogo ES como placeholder declarado (por eso
  `messages/en.json` mantiene el texto en español, incluidos los nuevos `items`/`seal`).
- **Deuda técnica declarada (para el gate "vamos a revisar"):** (1) el tipo `Messages` es una
  **interfaz escrita a mano en `content.ts`**, no se deriva de `es.json`: cada cambio de catálogo
  exige ampliarla (pasó en D107); (2) los `style={{ "--i": n }}` que quedan sobre elementos `.reveal`
  son inertes (el rango volvió a `cover` completo en D77): solo sirven a `.bento-lit`/`.step-node-fill`.
  *(La deuda (3) —`stroke-dashoffset` en los arcos del Cierre— quedó **cerrada al retirar esa capa en
  D121**: hoy el catálogo de motion no tiene ninguna propiedad de pintado.)*
- **Commits (23/09, sesión de newsletter):** `7f8d2a6` (`feat(newsletter): bento panel, console form
  and scannable message`) y `4325e02` (`design(motion): slower reveals, shorter exit, cta glint and
  rail node flash`), más el commit de documentación que cierra este registro
  (`docs: record D100-D107 and sync design system, specs and guide`). Working tree **limpio**;
  **sin push** (`master` va por delante de `origin/master`; no se tocó el remoto).
  Tag `hero-v1` sobre `b18c3e1`.

### 2.1 Modo de trabajo vigente (D124, 23/09) — MODO REVISIÓN

**Regla activa:** con el diseño **aprobado por Lorena**, se vuelve al **gate completo**. **D124
supersede D56** (el "modo rápido" de 3 agentes queda como historia).

- **Activos:** los 6 roles — orquestador, `design-ux`, `nextjs-builder`, `rules-auditor`, `qa-access`
  y `seo-perf` — más Lighthouse, Playwright/axe y capturas de QA.
- **Gate aplicable (AGENTS.md, "Calidad mínima exigida"):** Lighthouse ≥95 en Performance, SEO y
  Accessibility (móvil y escritorio); WCAG 2.1 AA; responsive en 360/768/1024/1440; CWV
  (LCP < 2.5s, CLS < 0.1, INP bajo); `tsc` sin errores y ESLint limpio.
- **Regla de la owner para los cambios:** cualquier hallazgo que exija tocar el diseño se le presenta
  **con opciones equivalentes en diseño** y **solo se ejecuta con su OK** (D124).
- **Objetivo de la sesión:** (a) congelar/commitear el estado aprobado; (b) re-auditar las **61 reglas**
  con cita textual (la evidencia de `docs/qa/` es del 22/09 y **no** cubre el rediseño posterior:
  Hero V7, Newsletter D100-D107, Cierre D108-D123); (c) Lighthouse + capturas 360/768/1024/1440 +
  contraste; (d) plan de pruebas funcional; (e) cerrar pendientes declarados (**R22 en riesgo**,
  traducción EN de D57, deuda del tipo `Messages`).

> Nota histórica: el bloque siguiente describe el modo rápido D56 que estuvo vigente hasta hoy.
> **Regla que estaba activa hasta que Lorena dijo "vamos a revisar":** se trabajaba con **3 agentes** y
> **cero auditorías** en todas las tareas y fases, incluida la Fase 5.

- **Activos (ya no):** orquestador (specs, decisiones, coordinación), `design-ux` (criterio visual y
  copy) y `nextjs-builder` (única mano que escribe en `app/`).
- **Dormidos hasta el modo revisión (ya despiertos):** `rules-auditor`, `qa-access`, `seo-perf`,
  Lighthouse, Playwright/axe, medición de INP y capturas de QA. Los agentes no se borran: siguen
  definidos en `.opencode/agent/` con su prompt y modelo intactos.
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

> **Hecho (23/09, D61 — "bento vivo"):** a pedido de Lorena, los tres bentos D38 ("Cómo funciona",
> Testimonios y Noticias) ganan **entrada escalonada** (fade-in + slide-up) e **iluminación
> secuencial de borde** (`line → brand`, borde duro sin blur) al entrar en viewport, y un **hover**
> de `scale-[1.02]` + contraste con `duration-300 ease-in-out`. Se eligió la **Opción B** (sin línea
> física: el raíl de página D32 ya cuenta el recorrido) y se descartó Framer Motion por D17/D95
> (cero librerías de UI, cero islas cliente): todo es CSS nativo `animation-timeline: view()`.
> Sin `cursor-pointer` (las celdas no son enlaces). `tsc --noEmit` + ESLint + `next build` en verde.

> **Hecho (23/09, D62 — "entrada por elemento"):** a pedido de Lorena, el reveal deja de ser **de
> bloque** (sección entera) y pasa a ser **por elemento**: en las 9 secciones del cuerpo los "beats"
> (h2, intro, tarjetas, CTA) aparecen uno a uno al scrollear con un fade-in + desplazamiento de
> **12px** y escalonado vía `--i`. CSS nativo `animation-timeline: view()` (cero JS), reutilizando
> el keyframe `step-in` de D61; `reveal-in` retirado. Hero excluido (su H1 no hace fade: es el LCP)
> y footer excluido. `tsc --noEmit` + ESLint + `next build` en verde.

> **Fix (23/09, D63 — "las animaciones no se veían"):** Lorena reportó no ver las entradas de
> sección. Diagnóstico con navegador real (Playwright): las animaciones estaban montadas pero
> (1) el rango `entry` se medía sobre el **alto del elemento** → un h2 lo completaba en ~11px de
> scroll (imperceptible), y (2) `overflow-hidden` en **Torneos y Cierre** creaba un scroll container
> que **congelaba** el timeline `view()` → esas secciones nunca animaban. Fix: rango a fase `cover`
> (relativo al viewport, `cover 0% → calc(20% + --i*4%)` ≈ 162–280px) y `overflow-hidden` →
> `overflow-clip`. Re-medido: las 9 secciones animan y el CTA del Cierre llega a opacidad 1.
> `tsc --noEmit` + ESLint + `next build` en verde.

> **Ajuste (23/09, D64 — "más bruscas"):** Lorena pide entradas más contundentes. Recorrido de
> **40px** (`translateY(2.5rem)`, antes 12px), rango más corto (`cover 12% + --i*4%`, antes 20-28%)
> y easing `cubic-bezier(0.2, 0.9, 0.2, 1)` (antes `linear`). Medido: el fade dura **56–96px** de
> scroll (antes 162–264px) con **40px** de desplazamiento real. Solo `transform`/`opacity` (CLS 0)
> y sigue cubierto por `prefers-reduced-motion`. `tsc --noEmit` + ESLint + `next build` en verde.

> **Fix (23/09, D65 — raíl visible):** Lorena: *"la línea de tiempo vertical no se ve"*. Medido: el
> relleno SÍ animaba (401→1358px con el scroll); el problema era contraste/grosor (base `line` 1px =
> 1.27:1; relleno `brand` 1px = 2.04:1). Fix **global** en `TimelineRail`: base `slate` a **2px**
> (**5.57:1** sobre `paper`), `white/25` sobre `ink` y `ink/30` en la franja green. Verificado en
> navegador (`rgb(95,106,109)`, 2px) + captura. Reversible con dos tokens. `next build` en verde.

> **Hecho (23/09, D66/D67/D68 — rediseño de `#como-funciona`):** aprobado por Lorena el rediseño de
> `design-ux`: el bento D38 se retira **solo en esta sección** y pasa a **stepper vertical** que
> reutiliza el raíl de página como track (nodos de paso `1.1`–`1.4`, con **línea de resultado** por
> paso y enlace de texto al Discord; el bento sigue en Testimonios/Noticias). (D66) El H2 y los
> títulos usan **revelado palabra a palabra** (el `word-rise` del hero adaptado a scroll con
> `overflow-clip`, no `overflow-hidden`). (D67) raíl a **3px** y nodos de sección (los `1,2,3…`) a
> **círculo doble** y **44/56px**, por encima de los nodos de paso (36/48px, `ember`). (D68) la
> entrada de la sección se invierte a **desde arriba** (`step-in-down` + `word-drop`) porque el
> slide-up iba en el mismo sentido que el scroll y no se percibía. Medido en `lg`: raíl 3px, nodo de
> sección 56px, nodo de paso 48px; el párrafo baja de `−40 → 0`. Nota: el guard `prefers-reduced-motion`
> sigue apagando todo (Lorena lo tiene activo en su sistema → por eso no las ve; no es un bug).
> `tsc` + ESLint + `next build` en verde.
>
> **Ajuste (23/09, D69):** Lorena no quedó conforme con la caída (D68) y eligió la **Opción A**:
> toda la entrada de `#como-funciona` pasa a **deslizar desde el raíl** (izquierda → derecha,
> `translateX −40 → 0`, `.reveal-left`), como si cada paso saliera de la línea de tiempo. Se retiran
> el revelado palabra a palabra de la sección (el hero conserva el suyo) y `.reveal-down`/
> `.word-drop-view`/`.word-rise-view`. Verificado: sin overflow horizontal.

> **Hecho (23/09, D70 — reapertura de `#como-funciona`):** a pedido de Lorena ("¿qué le falta para ser
> el ganador indiscutible?") y con el diagnóstico del orquestador como jurado, se aplican 2 ajustes:
> texto a `lg:col-span-8` + `lg:gap-x-12` (cierra el hueco título↔texto y el carril vacío) y la
> descripción baja a `slate` mientras el **resultado** sube a `text-lead` + barra `border-l-[3px] brand`
> (la promesa manda). **Rechazado el mismo día:** el conector hairline nodo→título (`step-link`/`link-lit`);
> Lorena pidió removerlo ("la línea entre los steppers y el título no me gustan para nada") y se retiró.
> Cero islas, cero copy nuevo. `tsc` + ESLint + `next build` en verde. Puntos 5–6 (ritmo `lg` y firma)
> diferidos al gate "vamos a revisar".

> **Hecho (23/09, D71 — rediseño de `#torneos`):** a pedido de Lorena, la sección pasa de `h2 + párrafo`
> a **4 pilares en rejilla hairline sobre `ink`**: (1) torneo en curso (label + `h3` + reto + CTA
> `DiscordCta size="nav"` + estado), (2) **tiempo estático** Días/Horas/Minutos con placeholders `—` y
> Sora `tabular-nums` (sin isla cliente ni fecha → nunca expira, D56), (3) **el botín** (`1º`/`2º` con
> numerales `brand`) y (4) **salón de la fama** (ejemplo + estado vacío honesto). Todo rotulado con
> `mockNote` (maqueta declarada) para no inventar cifras, plazos ni ganadores (brief/J2); sin marcas de
> terceros. Cero islas nuevas; `tsc` + ESLint + `next build` en verde. **Pendiente de visto bueno visual
> de Lorena.**

> **Hecho (23/09, D72 — datos reales del Torneo #2 en `#torneos`):** Lorena aportó el anuncio real de
> cierre/entrega y eligió la opción A. El **torneo en curso es el real** (`Torneo #2 — la landing de
> TechToJob`) y el bloque de **tiempo** deja los placeholders para mostrar el **cierre real + tabla de
> husos** (México jue 24 · 00:00 → España · 08:00), en **estático** (hoy es el cierre: un contador vivo
> quedaría expirado para el jurado). Premios y ganador siguen como **maqueta declarada** (`mockNote`
> acotada). Además, la entrada de `#torneos` pasa a **`.reveal-left`**, la misma animación que
> `#como-funciona` (pedido de Lorena). `tsc` + ESLint + `next build` en verde.

> **Hecho (23/09, D73 — pulido de `#torneos` tras crítica de jurado):** se aplican A + B + D.
> (A) el `mockNote` del pie se sustituye por un **chip `Ejemplo`** (`ember`/`ink`) junto al rótulo de
> "El botín" y "Salón de la fama", para que un lector rápido no los tome por reales (J2). (B) la rejilla
> pasa a **2×2 (7/5 + 7/5)**: el cierre deja de estar dentro de la tarjeta activa y tiene bloque propio;
> desaparece la columna apilada que dejaba hueco al pie. (D) la prueba social queda honesta con el chip
> y el estado vacío listo. **Diferido al gate:** C (numeral de edición `02`) y E (hover de borde).
> `tsc` + ESLint + `next build` en verde.

> **Hecho (23/09, D74 — arreglo de los defectos visibles de `#torneos`):** sobre la captura se corrige
> (1) la **tabla de husos** que partía el tiempo en dos líneas (`whitespace-nowrap` en el tiempo,
> `min-w-0` en la región y rejilla `sm:2 / lg:3`), (2) el **desequilibrio**: la fila 1 pasa a
> **activo (7) + [botín y salón apilados] (5)** con `lg:justify-between`, y el **cierre va a todo el
> ancho** (`lg:col-span-12`) como banda, y (3) el **titular huérfano** con `text-balance`.
> C, E y F siguen diferidos al gate. `tsc` + ESLint + `next build` en verde.

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
