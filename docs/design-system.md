# Design System — TechToJob · Landing Torneo #2

> Autor: `design-ux` · 22/09/2026 · Ejecutor: `nextjs-builder` (este doc NO contiene código de componentes, solo tokens y decisiones).
> Fuentes: `specs/00-checklist-reglas.md` (R24–R28, R34–R36, R59), `specs/10-landing-spec.md`, `specs/11-contenido.md`, `material-concurso/bases/brief.md`, logos inspeccionados en `material-concurso/marca/TechToJob/`.
> Regla de nomenclatura (R35): TODO token, variable, clase y comentario en inglés. El contenido visible en español vive en `messages/es.json` (R36) — este doc referencia secciones, nunca strings.

---

## 0. Lectura de la marca (qué vimos en los logos)

Inspección visual real de los 12 PNG + medidas:

| Familia | Qué es | Proporción | Variantes cromáticas (verificadas) |
|---|---|---|---|
| `v1` | Isotipo + wordmark **horizontal** en una línea | 4619×684 ≈ **6.75:1** (muy apaisado) | Positivo = carbón `#2f3436` · Negro = negro puro · Negativo = **verde `#84c0bf` sólido** (para fondo oscuro) · Degradado = carbón→verde diagonal |
| `v2` | Isotipo a la izquierda + wordmark **apilado** "Tech / to / Job" en 3 líneas | 2558×1418 ≈ **1.8:1** (casi cuadrado) | mismas 4 variantes |
| `Símbolo` | **solo isotipo** (nodo/red de 4 brazos redondeados con hueco de conexión central — lee como "conexión entre personas", coherente con el posicionamiento de comunidad) | 1151×1151 = 1:1 | mismas 4 variantes |

Hallazgos que condicionan las decisiones:

1. **"Negativo" NO es blanco**: es la versión en verde `#84c0bf`. Sobre fondo oscuro `#2f3436` el verde da **6.17:1** → es la variante correcta para secciones oscuras. No existe versión blanca del logo: si algún día hiciera falta sobre negro puro, se usa filtro CSS `brightness-0 invert` (no esperado en esta landing).
2. **v1 es demasiado ancho para móvil**: a 32px de alto mide ~216px de ancho. En 360px deja ~100px para el resto del nav → en móvil se usa el `Símbolo` (ver tabla §2).
3. **v2 es el lockup natural para formatos casi cuadrados** (OG 1200×630, hero con espacio vertical).
4. **Problema de nombres de archivo**: `Símbolo*` lleva acento (`í` → `%C3%AD` en URLs, fricción con git/scripts/herramientas de deploy) y **`SVG/SímboloBlack .svg` tiene un espacio antes de la extensión**. Además "Positivo/Negativo/Black/Degradado" son en español y describen el fondo, no el uso → poco legibles en código inglés (R35).

### 2.1 Renombrado ASCII recomendado (builder al copiar a `app/public/`)

| Origen (`material-concurso/marca/TechToJob/SVG/`) | Destino `app/public/brand/` |
|---|---|
| `v1Positivo.svg` | `logo-horizontal.svg` |
| `v1Negativo.svg` | `logo-horizontal-light.svg` |
| `v1Black.svg` | `logo-horizontal-black.svg` |
| `v1Degradado.svg` | `logo-horizontal-gradient.svg` |
| `v2Positivo.svg` | `logo-stacked.svg` |
| `v2Negativo.svg` | `logo-stacked-light.svg` |
| `v2Black.svg` | `logo-stacked-black.svg` |
| `v2Degradado.svg` | `logo-stacked-gradient.svg` |
| `SímboloPositivo.svg` | `logo-symbol.svg` |
| `SímboloNegativo.svg` | `logo-symbol-light.svg` |
| `SímboloBlack .svg` ⚠️ (espacio) | `logo-symbol-black.svg` |
| `SímboloDegradado.svg` | `logo-symbol-gradient.svg` |

Regla: `-light` = para fondo oscuro (la variante verde). SVG siempre en runtime; PNG/PDF solo como archivo muerto del repo del concurso, NO entran a `app/`.

### 2.2 Composite del header — medidas y clases exactas (revisión del estado claro, D47)

El header es el único punto donde el logo NO es un asset único: es un composite de dos piezas
(tile + wordmark) para que ambas polaridades tengan el mismo peso visual. Las medidas son
idénticas en `dark` y `light`; solo cambian el `src` del isotipo y los tokens de color:

| Pieza | Clases comunes | Superficie `ink` (dark) | Superficie `paper` (light) |
|---|---|---|---|
| Contenedor | `flex items-center gap-2.5` | — | — |
| Tile | `grid h-10 w-10 shrink-0 place-items-center rounded-none` | `border border-brand/40 bg-white/5` | `border border-brand bg-ink/5` |
| Isotipo (`priority`, `alt=""`) | `h-6 w-6` (24px) | `brand/logo-symbol-light.svg` (verde `#84c0bf`) | `brand/logo-symbol.svg` (carbón `#303436`) |
| Wordmark (`priority`, `alt=""`) | `h-5 w-auto sm:h-6`, `width=178 height=24` | `brand/wordmark-duo.svg` (`paper` + `brand`) | `brand/wordmark-ink-duo.svg` (ink `#303436` + `brand`, con contorno ink fino en las letras verdes — D97) |

Ratios medidos (WCAG 2.1): isotipo carbón sobre `paper` **12.58:1** ✅ · wordmark carbón sobre
`paper` **12.58:1** ✅ · borde `brand` sólido sobre `paper` **2.04:1** (decorativo: el tile no
transmite información; el nombre accesible es el `aria-label` del enlace). El borde del tile
oscuro (`brand/40` sobre `ink`) mide **2.23:1**; por eso en claro el borde va **sin alpha** — el
mismo `brand/40` diluido sobre blanco caería a 1.31:1 y el marco desaparecería. Es el único
ajuste asimétrico, y es por paridad percibida, no por capricho.

`wordmark-ink.svg` es un **derivado documentado** (mismo criterio que `wordmark-duo.svg`, D31):
idénticos contornos y `viewBox` (`176 26 934 126`), los `fill` a carbón `#303436`. Ningún archivo
oficial se altera. Se anota en el README (§Fuentes y créditos, R9).

---

## 2. Tabla de uso de logos por ubicación

| # | Ubicación | Archivo exacto (destino) | Fondo | Justificación |
|---|---|---|---|---|
| a | **Navbar** | **Adaptativo (D47), composite simétrico**: `data-header-surface="dark"` → isotipo `brand/logo-symbol-light.svg` (SímboloNegativo verde) en tile `h-10 w-10 rounded-none border-brand/40 bg-white/5` + `brand/wordmark-duo.svg` ("Tech" `paper`, "ToJob" `brand`). `data-header-surface="light"` → **la MISMA composición en polaridad clara** (revisión de D47 pedida por Lorena): isotipo oficial `brand/logo-symbol.svg` (Positivo carbón) en tile `h-10 w-10 rounded-none border-brand bg-ink/5` + `brand/wordmark-ink.svg` (derivado monocromo carbón). Medidas y ratios exactos en §2.2 | `ink`/`paper` según la sección | Cada superficie usa la variante OFICIAL correcta: Positivo en claro, Negativo en oscuro (el mark no se recolorea, se elige). `wordmark-duo.svg` **no sirve en claro**: su mitad "Tech" es `#ffffff` → **1.00:1** sobre `paper` (invisible), no es una simple excepción de logotipo; y "ToJob" verde daría 2.04:1, prohibido por R26 (§3.1 #10). En claro el verde queda **solo en el borde del tile** (detalle decorativo, permitido por R26). Ambas polaridades comparten tile `h-10 w-10`, wordmark `h-5 sm:h-6` y `gap-2.5` → idéntico peso (228px a `sm`). Nombre accesible por `aria-label` del enlace; imágenes `alt=""` |
| b | **Hero** | `brand/logo-symbol-light.svg` (símbolo verde) como marca de agua decorativa al 6% (D90, igual que Audiencias y el Cierre) + CTA dominante. **NO se repite el lockup**: el wordmark ya vive en el nav y el H1 es texto real (R39, R40) | `ink` oscuro | Duplicar logo en hero competiría con el CTA único (R11). La marca de agua en la esquina da identidad sin robar jerarquía |
| c | **Footer** | **El mismo composite del header en su polaridad oscura (D58)**: isotipo oficial `brand/logo-symbol-light.svg` (Negativo verde) en tile `h-10 w-10 rounded-none border-brand/40 bg-white/5` + `brand/wordmark-duo.svg` ("Tech" `paper`, "ToJob" `brand`), `gap-2.5`, wordmark `h-5 sm:h-6` | `ink` oscuro | Verde sobre carbón = 6.17:1 ✅. Antes usaba `logo-horizontal-light.svg` (32px) y se leía como una marca distinta a la del nav; el composite iguala peso y lectura de marca con la cabecera (pedido de la autora, D58). Decorativo: wrapper `aria-hidden="true"`, imágenes `alt=""` y `loading="lazy"` (R56, bajo el pliegue — **no** `priority` como el header). `logo-horizontal-light.svg` queda en el kit oficial, ya sin uso en la web |
| d | **Favicon** | `brand/logo-symbol.svg` → `icon.svg` (Next `app/icon.svg`); fallback PNG: `logo-symbol.svg` exportado a 180×180 sobre fondo blanco para `apple-touch-icon.png` y a 512×512 con fondo `brand` y símbolo carbón para `icon-512.png` (maskable) | — | El símbolo cuadrado es la única variante legible a 16–32px. Carbón sobre blanco del navegador ✅; nunca Degradado en favicon (las bandas oscuras desaparecen a tamaño miniatura) |
| e | **Open Graph 1200×630** | Composición estática nueva `app/opengraph-image.png` (builder la exporta, <200 KB): fondo `ink`; `brand/logo-stacked-light.svg` (v2Negativo) a la izquierda ocupando ~45% del alto; a la derecha el H1 del hero en Sora 700 blanco + línea de apoyo; `logo-symbol-gradient.svg` semitransparente como textura en la esquina inferior derecha | `ink` oscuro | v2 (1.8:1) es el único lockup que llena bien el formato OG sin quedar enana; verde sobre carbón legible en miniatura de Facebook/X; verificar en opengraph.xyz (R51) |
| f | **Marca de agua / fondo** | `brand/logo-symbol-light.svg` (verde sólido) al **6% de opacidad** en Hero, Audiencias y Cierre (D90; antes era el `logo-symbol-gradient` al 10%), `aria-hidden`, `pointer-events-none`, `loading="lazy"`, decorativo. **Torneos y Testimonios NO la llevan** (superficies claras, D87) | `ink` oscuro | Refuerza identidad sin texto en imagen (R39) ni coste de LCP (decorativo, no `priority`). Sobre `ink` el gradiente carbón→verde dejaba media marca invisible; el símbolo verde al 6% se lee sutil (D90). En secciones claras NO va marca de agua (compite con el texto) |

---

## 3. Tokens de color (Tailwind v4 `@theme`)

Paleta base obligatoria (R24) + grises intermedios y UN acento (R25). Nombres en inglés (R35).

```css
@theme {
  /* ── Base (fixed by contest rules R24) ── */
  --color-ink:    #2f3436;  /* carbon — dark surfaces, primary text on light */
  --color-brand:  #84c0bf;  /* teal green — buttons, dark-section accents    */
  --color-paper:  #ffffff;  /* light surfaces                                 */

  /* ── Brand state shade (same hue, hover only — not a new color) ── */
  --color-brand-deep: #6faeae; /* hover/active fill of brand buttons          */

  /* ── Brand light tint (RESERVED, unused — D87) ──
     D85 introduced it as Torneos' surface, but D87 retired it: Torneos and
     Testimonios both use `mist` (the light blue Lorena approved). Kept defined
     (a brand tint, not a new hue — R24/R25) in case it is revisited; no
     section references it today. */
  --color-brand-soft: #dcefee; /* reserved brand tint (unused, D87)           */

  /* ── Intermediate grays (allowed by R25) ── */
  --color-mist:   #f4f7f7;  /* tinted light section background                */
  --color-line:   #dfe6e6;  /* borders/dividers on light surfaces             */
  --color-slate:  #5f6a6d;  /* secondary text on light surfaces               */
  --color-cloud:  #c3cdcd;  /* secondary text on dark surfaces                */
  --color-coal:   #3a4144;  /* raised card surface on ink background          */
  --color-hairline-dark: rgba(255,255,255,0.12); /* dividers on ink           */

  /* ── Single accent (allowed by R25, support only) ── */
  --color-ember:  #f4a261;  /* warm amber: decorative fills, chips, highlights */
}
```

**Rol del acento `ember` (criterio propio + R25):** calienta el diseño y da un tercer plano de lectura (categorías de noticias, subrayados de datos, el "hueco" visual del avatar). **Nunca como color de texto sobre `paper`** (ratio 2.06:1 ❌) ni como único indicador de estado. Sus dos usos permitidos: (1) fondo de chip/etiqueta pequeña con texto `ink` encima (6.12:1 ✅), (2) detalle decorativo no informativo (punto de categoría, trazo de icono junto a texto ink). **D78:** también aparece como punto decorativo en la marginalia y el ticker del hero (sobre `ink`), como punto antes de los eyebrows de Audiencias y como fondo del badge `2` de Empresas (`ink`: 6.12:1).

**Tinte `brand-soft` (D85 → RETIRADO en D87):** se añadió como superficie "azul clarita" de Torneos,
pero Lorena confirmó que el azul correcto es **`mist` (#f4f7f7)**, el que Testimonios tenía. Desde
**D87** ni Torneos ni Testimonios lo usan (ambos en `mist`, §7). El token queda **reservado** (mismo
tono que `brand` aclarado; R24/R25) sin ninguna sección que lo referencie.

### 3.1 Tabla de combinaciones texto/fondo (ratios calculados, WCAG 2.1)

| # | Foreground | Background | Ratio | AA normal (≥4.5) | AA grande/UI (≥3.0) | Veredicto de uso |
|---|---|---|---|---|---|---|
| 1 | `ink` | `paper` | **12.62** | ✅ | ✅ | Texto de lectura estándar en secciones claras |
| 2 | `ink` | `mist` | **11.71** | ✅ | ✅ | Texto en secciones tintadas |
| 3 | `ink` | `brand` | **6.17** | ✅ | ✅ | **Texto sobre botones verdes** (y sobre la franja `brand` mientras existió; desde D100 el verde ya no es superficie de sección). Recálculo D85: antes decía 6.77 — es el mismo par que la fila 9, que ya marcaba 6.17 |
| 4 | `ink` | `ember` | **6.12** | ✅ | ✅ | Texto sobre chips de categoría |
| 5 | `slate` | `paper` | **5.57** | ✅ | ✅ | Texto secundario, roles, fechas |
| 6 | `slate` | `mist` | **5.17** | ✅ | ✅ | Secundario en secciones tintadas |
| 7 | `paper` | `ink` | **12.62** | ✅ | ✅ | Texto en secciones oscuras |
| 8 | `cloud` | `ink` | **7.77** | ✅ | ✅ | Secundario en oscuro (no usar blanco puro en párrafos: deslumbra) |
| 9 | `brand` | `ink` | **6.17** | ✅ | ✅ | **ÚNICO destino del verde como texto**: enlaces/énfasis en secciones oscuras. También UI components ≥3:1 ✅ |
| 10 | `brand` | `paper` | **2.04** | ❌ | ❌ | **PROHIBIDO**: verde como texto o como único color de un control interactivo sobre fondo claro, a CUALQUIER tamaño (falla incluso grande 3:1). Cita literal de las bases (R26): "el verde sobre blanco no llega al mínimo para texto pequeño. Úsalo en fondos, botones y detalles, no en párrafos" |
| 11 | `paper` | `brand` | **2.04** | ❌ | ❌ | **PROHIBIDO**: texto blanco sobre botón/franja verde. El texto sobre verde es SIEMPRE `ink` |
| 12 | `ember` | `paper` | **2.06** | ❌ | ❌ | Acento nunca como texto; solo fondo o adorno (§3) |
| 13 | `ink` | `brand-deep` | **5.01** | ✅ | ✅ | Hover de botones primarios (recálculo D85; antes 5.06) |
| 14 | `paper` | `coal` | **10.40** | ✅ | ✅ | Tarjetas elevadas sobre secciones oscuras (recálculo D85; antes 10.9). `cloud` sobre `coal`: **6.40**; `brand` sobre `coal`: **5.09** |
| 15 | `ink` | `brand-soft` | **10.58** | ✅ | ✅ | Texto de lectura en **Torneos** (sustituye a `paper`/`cloud` del esquema oscuro) |
| 16 | `slate` | `brand-soft` | **4.68** | ✅ | ✅ | Secundario en **Torneos**. Pasa el 4.5 justo: para párrafos largos preferir `ink` |
| 17 | `brand` | `brand-soft` | **1.72** | ❌ | ❌ | **PROHIBIDO**: verde como texto sobre su propio tinte claro (R26). El h2 de Torneos va en `ink` |
| 18 | `brand-deep` | `brand-soft` | **2.11** | ❌ | ❌ | Ni el shade sirve como texto sobre el tinte |
| 19 | `ember` | `brand-soft` | **1.73** | ❌ | ❌ | El acento sigue sin poder ser texto (§3); en Torneos solo como **fondo** de chip con `ink` (6.12) |
| 20 | `line` | `brand-soft` | **1.06** | — | — | `line` desaparece sobre `brand-soft`: **NO usarlo como divisor**. Raíl base `slate` sobre `brand-soft` = 4.68 ✅ |
| 21 | `cloud` | `coal` | **6.40** | ✅ | ✅ | Secundario y copy del newsletter sobre la tarjeta (D100) |
| 22 | `cloud/80` | `coal` | **4.73** | ✅ | ✅ | Nota de confianza bajo el input (D100) |
| 23 | `cloud/70` | `ink` | **4.64** | ✅ | ✅ | Placeholder del input del newsletter (D100) |
| 24 | `white/40` (**borde**) | `ink` | **3.37** | — | ✅ | Límite del control de formulario (input del newsletter, D100): cumple WCAG **1.4.11** (≥3:1). El mismo borde a `white/25` caería a 2.19:1 ❌ |

> **D87:** las filas 15–20 documentan ratios del token **`brand-soft`, hoy SIN USO** (Torneos y
> Testimonios van en `mist`, filas 2 y 6). Se conservan como referencia por si se retoma el tinte.

> **Nota de recálculo (D85):** ratios recomputados con la fórmula WCAG 2.1 (sRGB). Se corrigen
> las filas 3, 13 y 14, que estaban ligeramente altas. Los comentarios de código que aún citan
> `6.77`/`5.06` deben alinearse a `6.17`/`5.01` en la próxima pasada de `nextjs-builder`.

### 3.2 Veredicto explícito del verde (resumen para rules-auditor)

`#84c0bf` entra a la página solo de tres formas, todas AA:
1. **Como fondo** (botón primario con texto `ink` 6.77:1; círculos de pasos numerados; botón del newsletter desde D100).
2. **Como texto/énfasis ÚNICAMENTE sobre `ink`** (6.17:1 — enlaces, números grandes, subrayados activos en secciones oscuras).
3. **Como detalle decorativo** sobre cualquier fondo (trazos, marca de agua, borde de avatar), donde no transmite información por sí solo.
Sobre `paper`: el verde jamás es texto, jamás es el único estado de un control (focus-ring en claro es `ink`, en oscuro es `brand`).

---

## 4. Tipografía — Sora (fija, R28/R58/R59)

`next/font/google` → `Sora({ subsets: ['latin'], weight: ['400','600','700'], display: 'swap' })`. **Una familia, tres pesos, ni uno más** (R59). Variable `--font-sora` → clases `font-sans` (mapear Sora como sans por defecto).

| Peso | Rol (inglés en código) |
|---|---|
| **400** | `body` — párrafos, quotes de testimonios, textos de pasos |
| **600** | `ui` — nav, botones, labels, roles de testimonio, metadatos de noticia, h3 |
| **700** | `display` — h1, h2, números grandes de pasos, headlines de tarjeta |

### Escala mobile-first (móvil por defecto → `md:`/`lg:` desktop)

| Token | Móvil (≥360) | Desktop (≥1024) | Line-height | Tracking | Uso |
|---|---|---|---|---|---|
| `display` (h1, único en la página, R40) | 3rem / 48px | 4.5rem / 72px | 1.05 (móvil) · 1.0 (desktop) | −0.04em | Hero. `text-balance` |
| `h2` | 1.75rem / 28px | 2.5rem / 40px | 1.15 | −0.015em | Título de sección. `text-balance` |
| `h3` | 1.25rem / 20px | 1.5rem / 24px | 1.3 | −0.01em | Tarjetas, pasos, noticias |
| `lead` | 1.125rem / 18px | 1.25rem / 20px | 1.55 | 0 | Sub del hero, intros |
| `body` | 1rem / 16px | 1rem / 16px | 1.65 | 0 | Párrafos; measure máx. 65ch |
| `small` | 0.875rem / 14px | 0.875rem / 14px | 1.5 | 0 | Notas, footer, roles |
| `label` (overline) | 0.75rem / 12px | 0.75rem / 12px | 1.4 | +0.08em, `uppercase`, peso 600 | Categorías de noticia, eyebrows de sección |

Nota de rendimiento: 3 pesos = 3 archivos woff2 por subset vía `next/font` (latin); nada de `italic` (no lo usa el contenido) → no pedirlo.

Nota de escala: la fila `display` se reescaló el 22/09 para el rediseño del hero (minimalismo premium, D27 en `docs/DECISIONES.md`): el H1 pasa a ser el centro de gravedad visual de la primera pantalla.

Nota de escala global (D99): la raíz pasa a `font-size: 94%`, así que **toda** la escala de arriba se reduce ~6% de forma uniforme (Tailwind v4 es `rem`). Es la forma elegida de acercar el diseño al "90% de zoom" que Lorena prefirió, sin bajar `body` de 15px ni los overlines de ~11px. Efecto en los tokens: `display` desktop ≈67.7px, `h2` ≈37.6px, `body` ≈15px, `small` ≈13.2px, `label` ≈11.3px; los targets de 44px quedan en ≈41px (sobre el mínimo AA de 24px). Sora y sus 3 pesos no se tocan (R24/R28/R58/R59).

---

## 5. Espaciado, layout, radius y sombras

### Grid y contenedor
- **Container máximo:** `72rem` (1152px), centrado (`mx-auto`).
- **Gutters:** móvil `1.25rem` (20px) · `md:` `2rem` · `lg:` `2.5rem`. En 360px el contenido nunca toca el borde.
- **Breakpoints de verificación (J3):** 360 / 768 / 1024 / 1440 — defaults de Tailwind (`sm 640, md 768, lg 1024, xl 1280`).
- **Grids por sección (sync D38 "Bento Signature" + D66):** "cómo funciona" → **stepper vertical de una columna** (D66; el bento se retiró solo aquí) · testimonios → **marquee horizontal full-bleed** en banda `brand-soft` con tarjetas de ancho fijo, sin bento (D89/D90) · noticias `7 (row-span 2) + 5 + 5` desde `lg` (destacada a ancho completo en `sm`) · footer `1 → sm:2 → lg:4` bloques. El sub-timeline de "cómo funciona" (D32) queda retirado: su raíl se reutiliza como track del stepper.
- **Raíl de la línea de tiempo (D32 · D65 · D67):** eje en el borde izquierdo del `page-container` (mismas métricas de gutter), **3px** (`w-[3px]`) y base `slate` (**5.57:1** sobre `paper`; el `line` #dfe6e6 original a 1px daba 1.27:1 y era invisible), `inset-y-0` por sección para que la línea sea continua. Sobre `ink` la base es `white/25` y en la franja `brand`, `ink/30`; el relleno de progreso sigue siendo `brand`. En `brand-soft` (Torneos, D85) la base también es `slate` (**4.68:1**) y el hueco del nodo usa `bg-brand-soft` para fundirse con la superficie. El **nodo de sección** es un **círculo doble** con disco `brand` de **44px móvil / 56px `lg`** (mayor que los nodos de paso `1.x` del stepper, 36/48px, D67). El contenido se indenta para dejarlo pasar: `pl-7 md:pl-14 lg:pl-20 xl:pl-24` (en 360px quedan ~288px útiles). Raíl y nodos son decorativos (`aria-hidden`). **Excepción (D59):** el Cierre ya **no** dibuja raíl — el pedido de la autora fue quitar la línea y el nodo de esa sección, así que el raíl recorre de "Cómo funciona" a "Newsletter" y el bloque del Cierre va centrado, sin indentación. **D100:** la variante `brand` (raíl `ink/30`, relleno/nodo `ink`, creada solo para la franja verde) queda **sin uso**: Newsletter pasa a `ink` y usa la variante oscura estándar (`white/25` + `brand`).

### Escala vertical (ritmo entre secciones)
```css
@theme {
  --spacing-section-y: 5rem;    /* py de sección en móvil */
}
```
Desktop (`lg:`): `8rem`. Nav sticky de `5rem` (80px, `header-veil`). Hero: `min-height: 100svh` con **todo el bloque centrado como una sola pieza** (H1 + sub + CTA + apoyo, `flex` centrado + `pt-20` que compensa el header y `pb-0` para que el centro sea el del área visible). Se probó fijar solo el H1 a la línea central con un grid `1fr/auto/1fr`: **se revirtió el mismo día** porque el bloque se lee como una unidad y quedaba descolgado (D33). No `100vh` fijo: `svh` evita el salto de la barra de URL en móvil → CLS. El hero sube con `-mt-20` para quedar **detrás** del header (transición sin costura).

### Radius
| Elemento | Token | Valor |
|---|---|---|
| Botones (primario y secundario) | `rounded-none` | Esquinas rectas — lenguaje editorial cuadrado (D36/D42). La píldora se descartó: no quedan botones-píldora (solo son circulares el avatar, el nodo del raíl y los puntos del ticker). **D100 propuso `rounded-lg` para el botón del newsletter y D101 lo revirtió** al verlo en pantalla: era la única pieza redondeada del sitio. Hoy **todos** los botones son cuadrados |
| Tarjetas (testimonio, noticia) | `--radius-card` | 1rem (16px) |
| Inputs | `--radius-input` | 0.625rem (10px) |
| Chips / badges | `rounded-full` | pill |
| Celdas bento (D38) | `rounded-none` | Esquinas rectas + borde hairline 1px, sin sombra — continuidad editorial con el CTA `rounded-none` (D36/D46). En testimonios, noticias y la sección de audiencias (dos celdas `coal` sobre `ink` desde D85); en "cómo funciona" el bento se retiró (D66) |

### Sombras (sutiles — R34 "que no estorben")
```css
@theme {
  --shadow-card: 0 1px 2px rgb(47 52 54 / 0.05), 0 8px 24px -12px rgb(47 52 54 / 0.12);
  --shadow-raised: 0 2px 4px rgb(47 52 54 / 0.06), 0 16px 32px -12px rgb(47 52 54 / 0.18);
}
```
- `card` por defecto en tarjetas sobre `paper`/`mist`; `raised` SOLO en hover de tarjeta con enlace.
- **En superficies `ink`: cero sombras** (no se ven); separar con `--color-coal` de superficie + borde `hairline-dark`.
- **CTA (D42/D43/D46):** un único estilo en todo el sitio — cuadrado relleno `brand`, texto `ink`, barrido especular de borde duro (`-skew-x-12 bg-white/30`) + micro-elevación `-translate-y-0.5` en hover. Sin sombra proyectada; desde **D76** el hover añade un **glow sutil** de color `brand` (`--shadow-glow-cta`, una sombra de color de bajo alfa, **sin `blur`**) — revierte el "nunca glow" de D43.
- El botón primario NO lleva sombra (el color ya domina la jerarquía).

---

## 6. Componentes base (patrones, sin código)

### 6.1 `ButtonPrimary` — CTA "Entrar al Discord de TechToJob" (hero, cierre, nav)
- Fondo `brand` · texto `ink` peso 700 · rectangular (`rounded-none`, D42) · `min-height: 48px` (hero) / `44px` (nav) · padding `0.75rem 1.75rem`.
- **Hover/focus:** fondo `brand-deep` (texto `ink` sigue AA: 5.06:1) + barrido especular de borde duro (`-skew-x-12 bg-white/25`, 500ms) y micro-elevación `-translate-y-0.5` (D43). Sin cambio de tamaño del layout; el glow (D76) no reflowea.
- **Un solo estilo de CTA (D46):** hero, header, menú móvil y cierre comparten exactamente las mismas clases salvo el tamaño (`nav`/`hero`/`block`). La antigua variante `line` (rectángulo hairline) se retiró. El hero mantiene UN solo botón (R11). Focus ring: `brand` sobre superficies oscuras, `ink` en el panel móvil (`paper`), por R26.
- **Focus-visible:** anillo `outline: 3px solid` — `ink` con `outline-offset: 3px` sobre superficies claras; `brand` sobre superficies oscuras (6.17 ≥3:1 ✅). Nunca `outline-none`.
- **On ink background (hero/cierre):** es el elemento más llamativo de la pantalla: tamaño de texto `lead`, icono Lucide `ArrowUpRight` 20px, `target="_blank" rel="noopener noreferrer"` + hint sr-only de "se abre en pestaña nueva" (texto en `messages/es.json`, R36).
- Contraste verificado: 6.77:1 ✅ AA normal y AAA grande.

### 6.2 `ButtonSecondary` — `AudienceCta` outline (D76/D85)
- **Único uso hoy:** CTA "Buscar talento real" del bloque Empresas de "Audiencias" (D75/D76). Desde **D85** esa sección es **`ink`**, así que el outline se define en su **polaridad oscura**.
- Superficie `ink`: borde 2px **`paper/60`** (**5.66:1** ≥3:1, WCAG 1.4.11), texto `paper` 600, **rectangular** (`rounded-none`, D42), `min-height` de 56px (mismo alto que el CTA relleno `hero`). Hover: borde `brand` **y** fondo `white/5` a la vez — dos pistas, para que el verde nunca sea el ÚNICO indicador de estado (R26). Sin barrido especular. **Focus ring `brand`** (6.17:1 sobre `ink`).
- La polaridad clara (borde `ink/60`, texto `ink`, hover borde `brand` + fondo `mist`, focus ring `ink`) queda en el catálogo para futuros usos sobre `paper`/`mist`, pero **hoy no se instancia**. La clase la conmuta el prop `surface` de `AudienceCta`/`DiscordCta` (`light` | `ink`).
- **Destino honesto:** es un ancla **in-page a `#unete`** (el bloque del CTA real al Discord), no un enlace externo ni un botón muerto (R43). La flecha es hacia abajo, nunca la de "abre fuera".
- El CTA relleno `brand` sigue siendo el único estilo de conversión del sitio (D46); el outline no compite como primario.
- **En el hero no existe un segundo botón** (R11: un solo botón). Anteriormente esta variante (hairline/pill) había sido retirada en D46; se reintroduce, ya sin píldora, solo para el bloque de empresas.

### 6.3 `TextLink`
- Sobre claro: `ink` 600 + `underline decoration-brand decoration-2 underline-offset-4` (el verde aquí es adorno de subrayado, el texto legible es `ink` → cumple R26). Hover: `decoration-thickness 3px`.
- Sobre oscuro: texto `brand` + subrayado a 2px.
- Siempre texto descriptivo, jamás "clic aquí" (R44).

### 6.4 `TestimonialCard` (×4, sección 7 — marquee D89/D90)
- Fondo `paper` sobre la **banda `brand-soft`** · esquinas rectas · borde hairline `ink/10` · padding `p-5`.
  Ancho fijo (`18rem` en `sm`, `20rem` en `lg`) porque cada tarjeta es un ítem del track del marquee.
- Fila superior → **comilla fantasma** `text-ink/15` (ya sin `.bento-index`: dentro de un track con
  `transform` continuo su `animation-timeline: view()` no dispara).
- Pie → **avatar circular 36px** (`brand` con iniciales `ink` 700 — hueco honesto de la foto de la
  maqueta, listo para sustituir por `next/image`) + nombre (`ink` 600, `small`) y rol (`slate`, `small`).
- **Hueco LinkedIn futuro (R17):** icono `Linkedin` en la esquina inferior derecha con `aria-disabled`,
  `tabindex="-1"` y tooltip/sr-only "perfil próximo" — el slot existe y se ve, pero no finge un enlace
  muerto (R43).
- Hover: `scale-[1.02]` + `border-brand` + barrido `.sheen-sweep`; `.card-idle` respira el borde.
- Nota de maqueta: la `sub` de la sección declara que son testimonios de muestra; el track repetido es
  `aria-hidden` y el contenido se sirve una sola vez en una lista `sr-only`.

### 6.5 `NewsletterForm` — panel Bento sobre `ink` (D100/D101/D104)
- **Superficie (D100):** la sección es **`ink`** y todo el bloque (eyebrow + h2 + copy + formulario)
  vive en **UN panel** `bg-coal` + `border-hairline-dark` 1px, esquinas rectas, sin sombra,
  `p-6 lg:p-10`, con `.panel-in` (entrada del panel, D103) + `.bento-lit-ink` (borde que se ilumina
  al entrar). **D104:** se retiraron `.card-idle` y el `line-idle` del borde superior del panel —
  repetían la información del hilo de sección y del propio encendido del borde.
- **Rejilla (D101):** `lg:grid-cols-12` — texto en `lg:col-span-7` y formulario en `lg:col-span-5`,
  separados por hairline vertical (`lg:border-l border-hairline-dark lg:pl-12`); en móvil se apila.
- **Eyebrow (D101):** overline `text-label uppercase text-brand` con punto `brand`, reutilizando la
  etiqueta ya existente `nav.links.newsletter` — cero copy nuevo (R36).
- **Copy sobre `coal`:** h2 en `paper` (12.62 ✅), párrafo en `cloud` (6.40 ✅) y nota en `cloud/80`
  (4.73 ✅) — §3.1 filas 21–22.
- **Label:** overline visible sobre el campo (`text-label uppercase text-cloud`) — nunca solo
  placeholder (J6 "etiquetas en el formulario").
- **Input:** fondo **`ink`** (hundido dentro del panel `coal`), borde **1px `white/40`**
  (**3.37:1**, WCAG 1.4.11 — el `white/25` de los divisores no alcanza para un control),
  `radius-input` (10px), `min-h-12`, **ancho completo**, texto `paper` (12.62 ✅), placeholder
  `cloud/70` (4.64 ✅). **Foco:** `focus:border-brand` (6.17 ✅) con transición de color de 200ms +
  `outline 3px brand` con offset para teclado. (El `focus:border-cyan-500` del brief se descartó:
  el cyan viola R24/R25.)
- `type="email" required` (validación HTML5, Q8) + `aria-describedby="newsletter-note
  newsletter-status"`; el estado vive en un `<p role="status" aria-live="polite">` **sin altura
  reservada** (el mensaje aparece tras una acción del usuario → fuera del CLS). Mensajes en
  `messages/es.json`.
- **Botón (D101):** relleno `brand`, texto `ink` (6.17 ✅, R26), `font-bold`, **`rounded-none`**
  (el `rounded-lg` de D100 se retiró: era la única pieza redondeada del sitio), `min-h-12` y **ancho
  completo bajo el campo** (así el input deja de ir estrangulado). Hover **vivo**: `bg-brand-deep`
  (5.01 ✅) + `-translate-y-0.5` + `shadow-glow-cta` + barrido especular; foco `outline-3 brand`.
  **Sin** flecha y **sin** destello idle (`cta-glint` es solo del CTA del Discord, R11).
- **Nota de confianza:** `Solo un correo a la semana. Nada más.` justo debajo del campo, con punto
  `brand` y separador `.line-idle` — el único destello de línea de la sección (D104).
- **Entrada (D101/D102/D103):** el panel entra con `.panel-in` y **cada** elemento del formulario
  (label, input, botón, hairline, nota y región de estado) entra y sale con `.reveal`; eyebrow/h2/copy
  lo hacen con `.reveal-left` desde el raíl.

### 6.6 `Nav` / `SiteHeader`
- `position: sticky; top: 0` · alto 80px (5rem, en sincronía con el `-mt-20` del hero y el `scroll-padding-top: 6rem`). **Barra SÓLIDA al 100%** que adopta la polaridad de la sección que tiene detrás (`data-header-surface` en `<html>`, publicado por la isla `HeaderSurface`, D47). El "sombreado amplio" que la disuelve es una **franja de gradiente por DEBAJO de la barra** (`.header-fade-*`, `top: 100%`, 2.5rem) — así el CTA nunca asoma por una zona translúcida (D47b). Crossfade `ink`↔`paper` de 250ms por `opacity` (CLS 0). Sin JS el header queda `ink` (progressive enhancement). **D92:** sobre las superficies azules (`mist`, expuestas vía `data-header-tint`) el header claro **no** proyecta la sombra inferior ni la franja de disolución `paper→transparent` (se veían como una mancha gris/blanca sobre azul); blanco y oscuro conservan el tratamiento. **D94:** además, las franjas de disolución usan paradas con **alfa explícito** (nada de `transparent`, que dejaba una banda gris) en una rampa de 5 paradas.
- Desktop (≥1024): composición de logo (§2a) · enlaces a anclas (`#como-funciona`… R45) en 600 `paper` sobre `ink` (≥8:1), `whitespace-nowrap`, hover subrayado `brand` 2px, targets ≥44px de alto · anclas en tiers: `lg` (`#como-funciona`, `#torneos`, `#talento`/`#talento`), `xl` (`#networking`, `#testimonios`, `#newsletter`) y `2xl` (`#noticias`) (D53/D90/D95) · CTA `ButtonPrimary` compacto con `whitespace-nowrap` — **jamás en 2 líneas** (el nav recorta enlaces, no el botón). **Sin recuadro** alrededor de las anclas (D45: se retiró el marco hairline); es una fila de enlaces desnuda.
- El contenedor del header es `page-container` (**72rem, D49**): el MISMO eje que el contenido, para que el logo, el nav y el CTA alineen con la página. Existe un **scrollspy** (`aria-current="location"` en el enlace activo, D49) y una **hairline de progreso** (`.header-progress`, 2px `brand`, `scaleX` con `animation-timeline: scroll(root)`, D49).
- Estado activo del nav (AA): en superficie oscura el enlace activo es `brand` (6.17:1); en clara el texto sigue `ink` y el `brand` va **solo como subrayado** (R26 prohíbe el verde como texto sobre `paper`).
- 640–1023: logo + CTA + hamburguesa · <640: logo + hamburguesa (el CTA vive en el panel).
- Menú desplegable (<1024): panel `paper` a ancho completo, enlaces en pila de 48px + CTA Discord full-width. `<details>` nativo: Enter/Space de serie, cero JS.
- Enlaces de salto de foco: primer elemento del `body` = "Saltar al contenido" sr-only que se revela al focus (criterio propio de accesibilidad; no es texto oculto con keywords, no viola R60).

### 6.7 `NewsCard` (×3, sección 8)
- `paper`, borde 1px `line`, esquinas rectas (`rounded-none`), padding `1.5rem` (destacada `1.5rem` / `2.5rem` en `lg`), hover `scale-[1.02]` + borde `brand` + `bg-mist` + `shadow-glow` y barrido `.sheen-sweep` (D76/D98).
- Anillo `.card-idle` (D86); entrada/salida `.reveal-left` en el wrapper de cada celda + iluminación `.bento-lit` en la tarjeta (D61/D98), igual que las secciones de arriba.
- Chip de categoría: fondo `ember`, texto `ink` `label` pill (6.12 ✅) · fecha `slate` `small` · título `h3` 700 `ink` · resumen `body` · enlace descriptivo como `TextLink`.
- **Placa editorial de la destacada (D98):** banner a sangre dentro de la celda (borde inferior `line`, fondo `mist` + retícula `.news-field` al 4%) con el **símbolo oficial** `logo-symbol-gradient.svg` (~80/96px) y un punto `ember` con pulso `.animate-activity`. Es **decorativa** (`aria-hidden` + `alt=""`), `loading="lazy"` y `width`/`height` explícitos (R55/R56); no afirma nada sobre la noticia de maqueta (R18/J2). La sección usa el hilo ambiental `ember` (`Section idleAccent="ember"`) y un divisor `.line-idle-ember`.
- El `ember` aparece solo como decoración (punto del `mockNote`, punto pulsante de la placa, chip, hilo y divisor), nunca como texto sobre `paper` (R26).

### 6.8 Stepper de "Cómo funciona" (D66/D67/D69/D70)
- **Sustituye al bento D38 solo en esta sección** (y al antiguo `StepCard` circular). Es un `<ol>` de
  una columna que **reutiliza el raíl de página como track**: no se dibuja ninguna línea nueva.
- Cada `<li>` es un paso: **nodo doble círculo** sobre el raíl (anillo + disco con separación),
  `1.1`–`1.4`, **36px móvil / 48px `lg`**, en el acento **`ember`** (R25) con numeral `ink`
  (6.12:1 ✅ R26); luego `h3` + descripción + **línea de resultado** con barra `brand` (`border-l-2`).
- **Jerarquía y rejilla (D70):** el texto pasa a `lg:col-span-8` (título 4 col · texto 8 col,
  `lg:gap-x-12`) para cerrar el carril vacío; la descripción baja a `text-slate` y el **resultado**
  sube a `text-lead font-semibold text-ink` con barra `border-l-[3px] border-brand` — la promesa
  manda sobre la explicación.
- **Conector (D70):** se propuso una hairline nodo→título que se encendía al scrollear; **Lorena la
  rechazó** (*"la línea entre los steppers y el título no me gustan para nada"*) y se retiró el mismo
  día. No existe: el raíl no se une a los títulos.
- **Motion (D69):** todo el texto entra con `.reveal-left` (`translateX(-2.5rem) → 0`, desde el raíl);
  el nodo se enciende con `.step-node-fill` (`cover` + `--i`). CSS puro, sin islas.
- **El lenguaje de celda bento D38/D61 (`.bento-reveal`/`.bento-lit`/`.bento-index`, con hover
  `scale-[1.02]` y sin `cursor-pointer`) sigue vivo en Noticias (7+5/5).** **Testimonios lo abandonó en
  D89** al pasar a marquee: allí se retiraron `.bento-reveal`/`.bento-lit`/`.bento-index` de las
  tarjetas y solo se conserva `.card-idle`.

---

## 7. Ritmo claro/oscuro + jerarquía visual por sección

Objetivo: que la página "entre por los ojos" (J1 25%) con alternancia controlada — **momentos oscuros que enmarcan (Hero, Audiencias, Newsletter + Cierre)**, lectura en claro en el cuerpo y los tramos claros largos separados por **tintes distintos** (`paper`/`mist`/`brand-soft`) para que se lean como bloques, no como una masa. El verde luce DONDE BRILLA: sobre `ink`.

La página se lee como **una línea de tiempo vertical** (D32): el Hero es la puerta (sin raíl) y el raíl dibuja los pasos 1–8, de "Cómo funciona" a "Newsletter". El Cierre es la meta narrativa pero **ya no dibuja el nodo final** (D59). El orden de esta tabla es el narrativo vigente (`content.ts → timelineOrder`) y el reorden se declara en el README (R10).

| # | Sección | Fondo | Énfasis y rol del verde |
|---|---|---|---|
| 0 | Nav | **Adaptativo (D47/D49)**: `ink` sobre secciones oscuras y `paper` sobre claras (barra sólida + franja de disolución debajo) | Barra que **se funde con la sección que tiene detrás** (crossfade 250ms) y, al scrollear, suma una hairline de progreso `brand`. Enlaces `paper`/`ink` según superficie, el MISMO composite tile+wordmark en ambas polaridades (§2a/§2.2), scrollspy activo y CTA verde compacto siempre visible. Eje full-bleed con gutters del sistema (D53) |
| 1 | **Hero (puerta)** | **`ink`** | **D36 "Vacío Editorial" V5**: grid asimétrico de 12 col, H1 en dos líneas editoriales (pregunta en `cloud` 7.77:1, respuesta en `paper` con la palabra final en `brand` 6.17:1), fondo `ink` plano (sin glows ni tiles ni canvas de grafos), metadatos reales en marginalia, marca de agua del símbolo (`logo-symbol-light` al 6%, D90) y CTA relleno `brand` (`DiscordCta size="hero"`, estilo único D46) como ÚNICO botón (R11). Cierra una **franja ticker** (D38, marquee CSS puro, `aria-hidden`) con tokens reales ya publicados. Sin raíl |
| 2 | Cómo funciona (**paso 1**) | `paper` | **D66 stepper vertical** que reutiliza el raíl como track: nodos dobles `1.1`–`1.4` en `ember`, título + descripción + **línea de resultado**; el raíl de página la cruza igual que al resto (sin sub-timeline). **D70:** texto a 8 col y resultado como ancla de jerarquía |
| 3 | **Torneos (paso 2)** | **`mist`** (D87; vuelve al tinte claro neutro) | Sección "juego" y **prueba de que la comunidad está viva**, ahora en **claro**: rompe el tramo de claras sin recaer en oscuro. Headline en **`ink` 700** (10.58 ✅; en claro el verde no puede ser texto, R26) y **sin marca de agua** (§2f: en claro no va). **D71–D74:** torneo en curso (7 col) + botín / salón de la fama apilados con **chip `Ejemplo`** (5 col, `ember`+`ink` 6.12 ✅) y **cierre real a todo el ancho** con tabla de husos (Sora `tabular-nums`); esquinas rectas y sin sombras. **D80:** contador en vivo (`Countdown`, 2.ª isla cliente) en `ink`. **D86:** sus 4 separadores llevan brillo **`.line-idle-ember`** (naranja, tamaño fijo 8rem) y sus 4 labels un **punto `ember`** (el de "Torneo en curso" con pulso `.animate-activity`) |
| 4 | **Audiencias (paso 3)** | **`ink`** | Sección **split (D75/D76)**, ahora **oscura**: es el contrapunto que separa los tramos claros (Cómo funciona+Torneos / Networking+Testimonios+Noticias). Un único H2 (con "empleo", SEO) + intro en `cloud` + **dos celdas `coal` elevadas** (borde `hairline-dark`, §3.1 #14) lado a lado (dev / empresa), cada una con **badge numerado** (1/2, eco del nodo D67), **icono `brand`** y **lista escaneable** de 3 ítems. Hace leer las dos audiencias como caminos paralelos, no como un flujo lineal. CTA dev relleno `brand`; CTA empresa outline en polaridad oscura (§6.2); **ambos anclan a `#unete`** (no hay backend) |
| 5 | Networking (paso 4) | `paper` | **D81 composición asimétrica**: el párrafo monolítico pasa a título + intro en columna izquierda `lg:sticky` y **tres bloques a la derecha** separados por hairlines `line` de 1px — canales por área (píldoras `rounded-full` que emulan canales de Discord), respuestas en minutos (línea `text-h3 text-ink` + punto `brand` decorativo) y el mercado oculto (ancla `lead` con barra `brand` 3px). Hovers **solo por opacidad** (sin color nuevo, sin `cursor-pointer`); el verde queda como borde y relleno del punto, nunca como texto (R26). Sigue sin bento (D38). **D83:** las píldoras son las **8 áreas reales del Discord** (`#Development`, `#Data & AI`, `#Infrastructure & Operations`, `#Cybersecurity`, `#Product & Design`, `#Quality`, `#IT & Support`, `#Business & Leadership`) + nota de acceso a canales/roles. **D82:** punto `ember` en cada eyebrow, isotipo oficial bajo el título y `.reveal-enter` (entrada sin salida) en la columna sticky. **D85:** la columna derecha entra con `.reveal-left`. **D86:** los dos bloques con línea llevan `.line-idle` (no el primero, sin borde por `first:border-t-0`) |
| 6 | Testimonios (paso 5) | **`mist`** (D87/D90) | El tinte claro neutro que Lorena aprueba (mismo que Torneos). **D89/D90: marquee horizontal CSS puro full-bleed** dentro de una **banda `brand-soft`** con hairlines `brand`, sombra elevada y relieve interior; el desvanecido de bordes se aplica SOLO a las tarjetas (`marquee-fade`), no a la banda. Track duplicado `−50%` con `REPEAT=3` (sin huecos en ningún viewport) y pausa por `hover`/`focus-within` + control CSS-only; tarjetas `paper` (borde `ink/10`), `.card-idle` y `.sheen-sweep` al hover; avatar `brand`, comilla fantasma y slot LinkedIn deshabilitado (R17/R43). El track repetido va `aria-hidden` y el contenido se sirve en lista `sr-only` |
| 7 | Noticias (paso 6) | `paper` | **D38 bento 1 destacada + 2** (hairline); el acento `ember` aparece aquí por primera vez (chips de categoría) — novedad controlada |
| 8 | **Newsletter (paso 7)** | **`ink`** (D100; antes franja `brand`) | Se retira el bloque verde macizo y el contenido vive en **UNA tarjeta Bento** `coal` + hairline `white/12` (§6.5): texto a la izquierda (`paper`/`cloud`) y formulario a la derecha. El verde vuelve a su rol AA: relleno del **botón**, relleno del raíl, **nodo 7** y anillo de foco. Sigue siendo el bloque pre-footer (R19) y no compite con el CTA Discord (R11) |
| 9 | **Cierre (meta)** | **`ink`** | Espejo del hero (D35): H2 en dos líneas (`cloud` + `paper`) + el mismo botón verde dominante. Marca de agua `logo-symbol-light` al 6% (D90). Último impacto = misma acción que el primer impacto (R20). **Sin raíl ni nodo (D59)** y bloque centrado |
| 10 | Footer | `ink` (continuo, separado por `hairline-dark`) | Jerarquía baja: `small` `cloud`, enlaces hover `brand`. Logo: el composite del header en polaridad oscura (D58, §2c). Legal con la nota honesta de specs/11 |

Regla anti-deriva (actualizada D85/D100): **nunca dos secciones oscuras seguidas salvo los bloques de cierre** — `Newsletter ink → Cierre ink → Footer ink` (D100) y `Cierre → Footer` (siempre) se leen como un único bloque visual; **nunca más de 3 secciones claras seguidas y, si son contiguas, alternar el tinte** (`paper` ↔ `mist`/`brand-soft`) para que la costura se lea como cambio de bloque. Las secciones de lectura larga (copy > 3 líneas) siempre en claro.

**Ritmo vigente (D87/D100):** Hero `ink` → Cómo funciona `paper` → **Torneos `mist`** → **Audiencias `ink`** → Networking `paper` → Testimonios `mist` (con banda `brand-soft`, D89/D90) → Noticias `paper` → **Newsletter `ink`** → Cierre `ink` → Footer `ink`. Tramo claro más largo: 3 (Networking+Testimonios+Noticias), atenuado por alternancia `paper`→`mist`→`paper`. **D100:** el sitio deja de tener una franja `brand` maciza — el verde queda como **color de acción** (botones, foco), **progreso** (raíl) y **detalle** (nodos, puntos, hilos), exactamente el rol que R26 permite. Los tokens `--color-brand-soft` y la variante `brand` del raíl quedan **sin uso**.

**Capa viva de las secciones (D84, §9 #17/#18):** además del ritmo cromático, la página lleva dos
efectos ambientales de alcance fijo — la **deriva de texto** ligada al scroll (`±0.375rem` sobre el
contenedor de contenido) y la **luz de sección** que recorre la hairline superior (paso ~5s, pausa
larga, bucle 9s). Se aplican a los pasos **2–8** (Cómo funciona, Torneos, Audiencias, Networking,
Testimonios, Noticias y Newsletter) y se **excluyen** el nav/header (0), el hero (1), el cierre (9)
y el footer (10): el hero y el cierre conservan su `section-sheen` estático para no añadir
movimiento al primer ni al último impacto, y el footer no lleva decoración (cierra la página). La
deriva de **Networking** se limita a la columna derecha: la izquierda es `sticky` y un `transform`
en un ancestro rompería el pin (por eso esa sección no recibe `.text-drift` en el wrapper común).

---

## 8. Accesibilidad y estados (gate J6, 10%)

- **Foco visible:** todos los interactivos con `focus-visible` de 3px (colores por superficie, §6.1). Prohibido `outline-none` sin reemplazo. Verificación: tab completo por la página en orden DOM lógico.
- **Targets táctiles:** ≥44×44px en botones, nav móvil, hamburguesa, icono LinkedIn (aunque esté disabled) y cada enlace del footer (padding en el `<a>`, no solo en el texto).
- **Contraste:** tabla §3.1 como fuente de verdad; cualquier combinación no listada requiere recalcular antes de usarse.
- **Semántica:** un solo `h1` (R40); `h2` por sección sin saltos (R41); `header/nav/main/section/article/footer/button` (R42); formulario con `label` visible (§6.5); logos decorativos de agua con `aria-hidden="true"`, logos funcionales con nombre accesible "TechToJob".
- **`prefers-reduced-motion: reduce`:** desactiva transforms y transiciones (§9); los estados hover/focus siguen siendo visibles por color.
- **Teclado:** menú móvil operable con Enter/Escape; el skip-link es el primer tabbable.

---

## 9. Movimiento — catálogo vigente (R34: "que no estorben")

> **Nota de revisión (22/09, D30 → D38):** el criterio original de "máximo 3 microanimaciones"
> era propio, no de las bases. Lo que R34 exige —que no estorben— se mantiene por diseño: los
> bucles son lentos (≥3.5s), solo animan `transform`/`opacity`/`box-shadow`, ninguno cambia el
> layout (CLS 0), ninguno toca el copy ni el CTA, y el guard global `prefers-reduced-motion` los
> apaga todos. **D36 retiró** el campo de grafos (isla cliente), los glows y el muro de tiles
> flotantes del hero; **D38** añadió el ticker del hero y la numeración de las celdas bento.
> **D76 reincorpora un glow muy sutil y de borde duro** (sombras de color, sin `blur`) — ver #14.
> **D84** añade la deriva de texto ligada al scroll (#17) y la luz ambiental de sección (#18),
> y limita su alcance a las 7 secciones centrales (ni nav, ni hero, ni cierre, ni footer).
> **D85** cambia el ritmo cromático (Torneos `brand-soft`, Audiencias `ink`) y **D86** añade la
> vida idle de líneas separadoras (#19) y de bordes de tarjeta (#20); **D87** devuelve Torneos y
> Testimonios a `mist`. **D89/D90** convierten Testimonios en un **marquee CSS puro** sobre `mist`
> con banda `brand-soft` (#21) y bajan las marcas de agua de las superficies oscuras a
> `logo-symbol-light` al 6%.
> **D100–D107** (sesión de newsletter): la franja `brand` desaparece y el newsletter pasa a `ink` con
> panel `coal` (D100); el formulario se rediseña en columna "consola" con botón cuadrado (D101); la
> escala tipográfica de "Cómo funciona"/"Torneos" baja con `.section-tight` y las entradas/salidas se
> ralentizan (D102); aparecen el destello idle del CTA (#22), el halo de los nodos (#23) y la entrada
> propia del panel (#24) (D103); se poda ornamento del panel (D104); el raíl estrena halo (D105); y la
> salida se acorta (D106, meseta 84% → 92%). Todo es CSS puro: cero islas cliente nuevas.

| # | Qué | Spec | Fallback `reduced-motion` |
|---|---|---|---|
| 1 | **Entrada del header** (`animate-header-in`, 500ms): baja `-0.75rem` + fundido | Primer beat de la cascada (`transform`/`opacity` → CLS 0). El H1 es el elemento LCP, no el header | Header visible de inmediato |
| 2 | **Entrada del hero** (H1, sub, CTA, apoyo, meta, nav: escalonado 100→700ms) | El **H1 anima solo `transform`** (`animate-lift-in`), nunca `opacity`: el elemento LCP se pinta opaco en el primer frame | Todo el contenido visible de entrada, en su estado final |
| 3 | **Línea de tiempo vertical** (`timeline-fill` + `timeline-marker`, `animation-timeline: view()`) | El relleno `brand` crece con el scroll y cada nodo se enciende al entrar en vista. Un segmento por sección → la línea se ve continua de "Cómo funciona" a "Newsletter" (el Cierre queda fuera, D59) | Línea dibujada completa y nodos activos |
| 4 | **Entrada + salida por elemento** (`.reveal`, D62/D63/D64/**D77**/**D102**/**D106**): cada "beat" de sección (h2, intro, tarjetas, CTA) entra con fade-in + `translate(0, 2.5rem) → 0` (0→**38%** del rango, D102: antes 22%) y **sale por arriba** (**92→100%**, D106: la meseta opaca sube de 84% a 92%, así la despedida dura la mitad), con `animation-timeline: view()` y easing `cubic-bezier(0.2,0.9,0.2,1)`. Al ir atado al scroll, **se invierte al subir**: las secciones también "cobran vida" hacia arriba | Solo `opacity`/`transform` → CLS 0; CSS puro, sin islas; el hero NO lo usa en su H1 (jamás hace fade: es el LCP) | Contenido estático visible en su estado final |
| 4b | **Regla anti-bug de `view()`** (D63): el rango usa la fase **`cover`** (relativa al viewport), nunca `entry` (relativa al alto del elemento: un h2 de 40px terminaba el fade en ~11px de scroll); y **ningún ancestro** de un elemento con `view()` puede llevar `overflow: hidden` (crea scroll container y congela el timeline) → se usa `overflow-clip` | **D77:** rango `cover` COMPLETO con meseta opaca 16%–90%; a 90% el elemento ya entra bajo la barra fija (~96px), así que el contenido nunca se lee a media tinta (verificado en navegador: opacidad 1.0 en el aterrizaje del ancla) | — |
| 5 | **Ticker del hero** (`.animate-marquee`, D38/**D96**): track duplicado, `translateX(0 → −50%)`, `--marquee-duration:102s` lineal infinito; cada mitad repite el set ×3 (`TICKER_REPEAT`) para superar cualquier viewport y no dejar hueco al reiniciar | `transform` only; el bloque es `aria-hidden` y no interactivo (R11/R34) | `animation: none` + `transform: none`: el track se estaciona en el origen y se lee solo la primera copia |
| 6 | **Marcador fantasma bento** (`.bento-index`, D38, `animation-timeline: view()`) | Tras D66 queda **solo en Testimonios** (la comilla editorial sobredimensionada): `opacity`/`transform` en un `<span>` interno, decorativo (`aria-hidden`) | Marcador visible en su estado final |
| 7 | **Hover del CTA** (todas las instancias de `DiscordCta`/`AudienceCta`, D42/D43/D46/D76): estilo único relleno `brand` con barrido especular de borde duro (`-skew-x-12 bg-white/30`, 500ms, en reposo fuera del recorte) + micro-elevación `-translate-y-0.5` + flecha 2px + glow suave (`--shadow-glow-cta`) | Feedback de asequibilidad del botón, no decorativo. Sin `blur` | Sin barrido ni translate (`motion-reduce:`); el cambio de color se mantiene |
| 8 | **Subrayado de enlaces de nav** (150ms) + hover de enlaces del nav rápido | Header y nav del hero: hover `decoration-brand` 2px | Subrayado presente en hover |
| 9 | **Grid del hero vivo** (D44): `.hero-field` panea una celda con el scroll (`animation-timeline: scroll()`) y `.hero-field-drift` añade un drift continuo de una celda (4rem en X e Y) en 28s | Capas anidadas para que ambos `transform` convivan; loop sin costura por la periodicidad del patrón; solo `transform` | Grid quieto y completo (el guard global colapsa ambos) |
| 10 | **Header adaptativo** (D47/D49): crossfade de la barra `ink`↔`paper` (250ms por `opacity`) + hairline de progreso `.header-progress` (`scaleX` con `animation-timeline: scroll(root)`) + scrollspy `aria-current` | Solo color/opacidad/transform, CLS 0; la hairline es CSS puro | Header `ink` fijo (sin JS) y sin hairline; ningún enlace marcado activo |
| 11 | **Entrada + salida de celda bento** (`.bento-reveal`, D61/D63/D64/**D77**): comparte el keyframe `step-in-out` de `.reveal` (entra por abajo 0→16%, meseta 16→90%, sale por arriba 90→100%) con `animation-timeline: view()` y rango `cover` completo | Solo `opacity`/`transform` → CLS 0; CSS puro, sin islas | Celda estática visible en su estado final |
| 12 | **Iluminación de celda bento** (`.bento-lit`, D61): borde `line → brand` conforme la celda entra en el viewport, escalonado por `--i`; hover `scale-[1.02]` + `border-brand` (+ `bg-mist` en secciones `paper`) con `duration-300 ease-in-out` | Borde **duro, sin blur ni halo** (D43); `brand` sobre `paper` es decorativo (2.04:1), nunca texto (R26) | Borde en reposo (`line`); el hover conserva el cambio de color (sin escala) |
| 13 | **Entrada desde el raíl + salida** (`.reveal-left`, D69/D72/D76/**D77**/**D85**/**D90**/**D98**; `#como-funciona`, `#torneos`, `#talento`, **el h2/sub/control de `#testimonios`**, **la columna derecha de `#networking`** y **`#noticias`** — h2, nota y el wrapper de cada celda): entra `translate(-4.5rem, 0) → 0` (0→**38%**, D102) y **sale por arriba** (**92→100%**, D106), con `view()` y rango `cover` completo — cada bloque parece salir de la línea de tiempo y se despide al subir. En Networking **solo la columna derecha** cambia a `.reveal-left` (D85); la izquierda conserva `.reveal-enter` (entrada sin salida, sticky-safe, D82 — su rango `cover 0% cover 40%` **no se alarga a propósito**: con la columna pinada, un rango mayor dejaría la entrada a medias) | Solo `transform`/`opacity` (CLS 0); no genera overflow horizontal | Contenido estático visible en su estado final |
| 15 | **Hero al volver** (`.hero-soft`, D77): el bloque de contenido del hero (sin tocar el H1) se mueve con `animation-timeline: scroll(root)`, `animation-range: 0 80vh`: opacidad 1→0.9 y −0.75rem | Muy sutil y posicional (CSS no distingue la dirección del scroll); a scroll 0 arranca en su estado final, así que **no toca el LCP** | Hero estático en su estado final |
| 14 | **Brillo sutil** (D76): `.sheen-sweep` (barrido diagonal `brand` de borde duro al hover de las celdas de Audiencias) + `--shadow-glow`/`--shadow-glow-cta` (glow suave en hover de tarjetas y CTA) + `.section-sheen` (hairline luminosa estática en el borde superior de cada sección) | Solo `brand`/`ink` (R24/R25); son **sombras de color y gradientes**, sin `filter: blur` ni blobs (D37.1); el `.sheen-sweep` reposa fuera del recorte (`-translate-x-full`) | El barrido no corre (`motion-reduce: hidden`); el glow se queda en su valor base |
| 16 | **Punto de actividad** (`.animate-activity`, D81/D82): un halo **`ember`** de 12px que crece (`scale 1 → 2.2`) y se desvanece (`opacity 0.6 → 0`) en **3.6s infinito**, tras un punto `ember` estático. Marca "respuestas en minutos" (Networking) y "Torneo en curso" (Torneos) | `transform`/`opacity` only (CLS 0); bucle **≥3.5s** (catálogo §9); decorativo → el wrapper va `aria-hidden`, el dato real es la línea de texto | El guard global (`0.01ms`, 1 iteración) lo congela como **punto estático** visible |
| 17 | **Deriva de TEXTO con el scroll** (`.text-drift`, D84): el *wrapper de contenido* de la sección se desplaza `±0.375rem` (0.75rem totales, va y vuelve) siguiendo su propio paso por el viewport — `animation-timeline: view()`, `animation-range: cover`, `linear`, `both`. Sin salida ni fundido: NUNCA toca `opacity`, solo acompaña al scroll (al subir, se invierte). Va en un elemento propio (el contenedor) para no pisar el `transform` de `.reveal`/`.reveal-left` de los hijos | `transform` only (CLS 0); recorrido ≤0.75rem; **solo texto** → jamás en `<Image>` ni marcas de agua; CSS puro, sin islas. Alcance: pasos 2–8; **no** en hero/cierre/footer | Texto quieto en su posición natural (`.text-drift` no declara `transform` base; sin el bloque `@supports` no hay animación) |
| 18 | **Luz ambiental de sección** (`.section-idle`, D84/D86): un hilo de 1px (16% de ancho) recorre la hairline superior (`::after`, `translateX(-100% → 525%)` + respiro de `opacity`) con **bucle corto de 6s** (pausa mínima) y halo. Color por superficie: `brand` por defecto, `ink` en la franja `brand` (`.section-idle-ink`) y **`ember` en Torneos, Testimonios y Noticias** (`.section-idle-ember`; en Noticias vía `Section idleAccent="ember"`, D98). Da vida a la sección al detenerse, sin tocar copy, CTA ni jerarquía | `transform`/`opacity` only (CLS 0); bucle **6s ≥3.5s** (R34); decorativo (`aria-hidden` + `pointer-events-none`); `overflow: clip` (no crea scroll container, D63); CSS puro | La hairline queda como hoy (`.section-sheen` estático): el guard deja el hilo fuera de pantalla — decoración invisible, nunca oculta contenido |
| 19 | **Línea separadora viva** (`.line-idle`, D86): un brillo de **tamaño fijo** (`--idle-size`, 8rem; 4rem con `.line-idle-sm` en Cómo funciona) recorre la hairline superior de un bloque con hairline **más claro** que la narración, **uniforme** entre bloques de anchos distintos. Viaja con `background-position` (`-100% → 100%`, 6s) y lleva halo (`drop-shadow` sobre el alpha del degradado). Color: `brand` por defecto, **`ember` en Torneos y en el divisor de Noticias** (`.line-idle-ember`, D98). En Networking se omite en el primer bloque (`first:border-t-0`) | `opacity` + `background-position` (CLS 0; pintado de una línea de 1px) y `drop-shadow` de 3px sobre el brillo; bucle **6s ≥3.5s**; `pointer-events-none`; nunca desborda (el fondo se recorta al elemento) | Brillo invisible (estado base `opacity: 0`): la hairline queda exactamente igual |
| 20 | **Borde de tarjeta que respira** (`.card-idle`, D86): un anillo `brand` de 1px en una capa `::after` (inset -1px) se enciende y se apaga (`opacity 0 → 0.4`) en **9s**, escalonado por `--i`. No toca el borde real ni `.bento-lit` (que sigue iluminando al entrar en vista). En las tarjetas de Audiencias, Testimonios y Noticias | `opacity` only (CLS 0); bucle **9s ≥3.5s**; decorativo (`pointer-events-none`); CSS puro | Anillo invisible (estado base `opacity: 0`): el borde queda como está |
| 21 | **Marquee de Testimonios + banda** (`.animate-marquee` con `--marquee-duration:180s`, D89/D90): track duplicado `translateX(0 → −50%)`; cada mitad repite el set ×3 (`REPEAT`) para superar cualquier ancho de viewport y no dejar hueco al reiniciar; **pausa** por `hover`/`focus-within` y control CSS-only (checkbox oculto + `<label>`); la **banda `brand-soft`** full-bleed lleva hairlines, sombra y relieve, y la máscara de borde se aplica SOLO a las tarjetas | `transform` only (CLS 0); bucle ≥180s (R34); el track es `aria-hidden` y el contenido va en lista `sr-only`; CSS puro, sin islas | `animation: none` + `transform: none`: el track se estaciona en el origen y se lee la primera copia; la banda y el control quedan estáticos |
| 22 | **Destello idle del CTA principal** (`.cta-glint`, D103): un barrido especular en `::after` cruza el botón cada **9s** (cruce ~1,3s, blanco al 22% — más suave que el 30% del hover) para que el botón principal respire sin pedir clic. Solo en la variante `solid` (`cta-styles.ts`): header, hero, Torneos, Audiencias y Cierre; el outline y el botón del newsletter se quedan quietos (R11) | `transform` only (CLS 0); bucle 9s ≥3.5s (R34); decorativo (`pointer-events: none`); mismo color de la paleta que el barrido de hover | `display: none` (regla explícita en el guard global: no debe quedar congelado a medio cruce) |
| 23 | **Destello de los nodos del raíl** (`.node-flash`, D105): un halo suave con `radial-gradient` de **centro transparente** respira sobre cada nodo (7s), con el acento propio de cada familia — `brand` en los nodos de sección (`1`–`8`) y `ember` en los de paso (`1.1`–`1.4`) — sin teñir disco ni numeral. El `--i` (posición en el raíl / índice del paso) **escalona la fase** para que el destello recorra la página en oleada | `opacity`/`transform` only (CLS 0); bucle 7s ≥3.5s (R34); decorativo (`pointer-events: none`); cero colores nuevos (R24/R25) | Halo en su estado base (`opacity: 0`): el nodo se ve exactamente como antes |
| 24 | **Entrada del panel de newsletter** (`.panel-in`, D103): el cuadro entra con recorrido corto (`1rem`) y **ventana propia del 26%** del `cover` en lugar del 38% de `.reveal`. El motivo es geométrico: en `view()` el rango dura (viewport + alto del elemento), así que un panel de ~650px con el 38% quedaría a media tinta hasta tener el borde a ~190px del viewport | `opacity`/`transform` only (CLS 0); CSS puro | Panel visible completo y estático |

**Tokens por superficie de la luz ambiental (#18)** — el hilo debe leerse sobre las cuatro
superficies; sobre `brand` el verde desaparecería, así que invierte a `ink` (mismo criterio que
`.section-sheen-ink`):

| Superficie (secciones) | Hilo `.section-idle::after` | Glow estático del hilo |
|---|---|---|
| `paper` / `mist` / `brand-soft` (#como-funciona, #torneos, #networking, #testimonios, #noticias) | gradiente `brand` `rgb(132 192 191 / 0.9)` | `rgb(132 192 191 / 0.45)` |
| `ink` (#talento y #newsletter, desde D85/D100) | gradiente `brand` `rgb(132 192 191 / 0.9)` | `rgb(132 192 191 / 0.45)` |
| `brand` (**sin uso desde D100**) → clase `section-idle-ink` | gradiente `ink` `rgb(47 52 54 / 0.4)` | `rgb(47 52 54 / 0.22)` |

El hilo reposa **fuera de pantalla** (`translateX(-100%)`) como estado base: sin animación se ve
la hairline de siempre, nunca un hilo congelado a mitad.

**Prohibido explícitamente** (criterio propio + R34): scroll-jacking (secuestrar la navegación),
**parallax de CAPAS** (mover fondos, imágenes o el hero a distinta velocidad que el flujo) y
cualquier animación que retrase el LCP (por eso el H1 no hace fade).

**Excepción acotada y documentada (D84) — deriva de texto con el scroll:** se permite
`.text-drift` (#17) pese a estar atada al scroll, porque **no es parallax de capas**: no hay capas
a distinta velocidad, no mueve fondos ni imágenes, no secuestra la navegación y su recorrido es
mínimo (0.75rem totales, ±0.375rem) sobre el contenedor de contenido. Ese orden de magnitud no
altera la lectura: no cambia el orden visual, no cruza el CTA y responde en ambos sentidos del
scroll. Los reveals con `animation-timeline: view()` y la luz ambiental `.section-idle` (#18)
tampoco son parallax: no desplazan contenido respecto del scroll y su estado por defecto (sin
soporte) es el final.

---

## 10. Iconografía e imágenes

- **Lucide** como librería única (R33: no es un kit de componentes, son iconos; declarar en README con la fuente, R9). Trazo 2, tamaños 20/24px, siempre `aria-hidden` cuando acompañan texto visible.
- Fotografía/illustración: **no se usa fotografía** en esta landing (decisiones de sección arriba). La única pieza gráfica de sección es la **placa decorativa de la noticia destacada** (D98), construida con el **símbolo oficial del propio kit** (`logo-symbol-gradient.svg`) sobre la retícula `.news-field`: no introduce assets de terceros ni licencias nuevas, respeta R24/R25 y es `aria-hidden` + `alt=""` (no es un `alt` cosmético: no transmite información). Si en el futuro se añadiera apoyo visual extra: solo `next/image` con WebP/AVIF, `width`/`height` explícitos (R55), lazy bajo el primer pantallazo y jamás en el hero (R56), alt descriptivo real (R57).
- Los logos SVG del repo pesan poco; el builder los optimiza con `svgo` antes de commitear y anota la fuente en README.

---

## 11. Pendientes que tocan a Lorena (⚠️ aprobación humana)

1. **Visto bueno del copy de `specs/11-contenido.md`** antes del build (es su voz ante el jurado — ya marcado allí).
2. **Créditos del footer**: nombre/handle para la línea final (pendiente en specs/11 §11).
3. Confirmar el acento `ember #f4a261` (es criterio propio de esta propuesta, no exigencia del concurso; R25 lo permite como "un color de acento de apoyo" — si Lorena prefiere cero acento, los chips de categoría pasan a fondo `mist` con borde `line` y texto `ink`, sin más cambios).
