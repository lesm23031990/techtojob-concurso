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
| Wordmark (`priority`, `alt=""`) | `h-5 w-auto sm:h-6`, `width=178 height=24` | `brand/wordmark-duo.svg` (`paper` + `brand`) | `brand/wordmark-ink.svg` (carbón `#303436`) |

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
| b | **Hero** | `brand/logo-symbol-gradient.svg` (Degradado) como marca de agua decorativa al 10% (D43, igual que Torneos/Cierre) + CTA dominante. **NO se repite el lockup**: el wordmark ya vive en el nav y el H1 es texto real (R39, R40) | `ink` oscuro | Duplicar logo en hero competiría con el CTA único (R11). La marca de agua en la esquina da identidad sin robar jerarquía |
| c | **Footer** | **El mismo composite del header en su polaridad oscura (D58)**: isotipo oficial `brand/logo-symbol-light.svg` (Negativo verde) en tile `h-10 w-10 rounded-none border-brand/40 bg-white/5` + `brand/wordmark-duo.svg` ("Tech" `paper`, "ToJob" `brand`), `gap-2.5`, wordmark `h-5 sm:h-6` | `ink` oscuro | Verde sobre carbón = 6.17:1 ✅. Antes usaba `logo-horizontal-light.svg` (32px) y se leía como una marca distinta a la del nav; el composite iguala peso y lectura de marca con la cabecera (pedido de la autora, D58). Decorativo: wrapper `aria-hidden="true"`, imágenes `alt=""` y `loading="lazy"` (R56, bajo el pliegue — **no** `priority` como el header). `logo-horizontal-light.svg` queda en el kit oficial, ya sin uso en la web |
| d | **Favicon** | `brand/logo-symbol.svg` → `icon.svg` (Next `app/icon.svg`); fallback PNG: `logo-symbol.svg` exportado a 180×180 sobre fondo blanco para `apple-touch-icon.png` y a 512×512 con fondo `brand` y símbolo carbón para `icon-512.png` (maskable) | — | El símbolo cuadrado es la única variante legible a 16–32px. Carbón sobre blanco del navegador ✅; nunca Degradado en favicon (las bandas oscuras desaparecen a tamaño miniatura) |
| e | **Open Graph 1200×630** | Composición estática nueva `app/opengraph-image.png` (builder la exporta, <200 KB): fondo `ink`; `brand/logo-stacked-light.svg` (v2Negativo) a la izquierda ocupando ~45% del alto; a la derecha el H1 del hero en Sora 700 blanco + línea de apoyo; `logo-symbol-gradient.svg` semitransparente como textura en la esquina inferior derecha | `ink` oscuro | v2 (1.8:1) es el único lockup que llena bien el formato OG sin quedar enana; verde sobre carbón legible en miniatura de Facebook/X; verificar en opengraph.xyz (R51) |
| f | **Marca de agua / fondo** | `brand/logo-symbol-gradient.svg` al **10% de opacidad** en hero (D43), Torneos y Cierre, `aria-hidden`, `pointer-events-none`, `loading="lazy"`, decorativo | `ink` oscuro | Refuerza identidad sin texto en imagen (R39) ni coste de LCP (decorativo, no `priority`). En secciones claras NO va marca de agua (compite con el texto) |

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

**Rol del acento `ember` (criterio propio + R25):** calienta el diseño y da un tercer plano de lectura (categorías de noticias, subrayados de datos, el "hueco" visual del avatar). **Nunca como color de texto sobre `paper`** (ratio 2.06:1 ❌) ni como único indicador de estado. Sus dos usos permitidos: (1) fondo de chip/etiqueta pequeña con texto `ink` encima (6.12:1 ✅), (2) detalle decorativo no informativo (punto de categoría, trazo de icono junto a texto ink).

### 3.1 Tabla de combinaciones texto/fondo (ratios calculados, WCAG 2.1)

| # | Foreground | Background | Ratio | AA normal (≥4.5) | AA grande/UI (≥3.0) | Veredicto de uso |
|---|---|---|---|---|---|---|
| 1 | `ink` | `paper` | **12.62** | ✅ | ✅ | Texto de lectura estándar en secciones claras |
| 2 | `ink` | `mist` | **11.71** | ✅ | ✅ | Texto en secciones tintadas |
| 3 | `ink` | `brand` | **6.77** | ✅ | ✅ | **Texto sobre botones verdes y sobre la franja newsletter** |
| 4 | `ink` | `ember` | **6.12** | ✅ | ✅ | Texto sobre chips de categoría |
| 5 | `slate` | `paper` | **5.57** | ✅ | ✅ | Texto secundario, roles, fechas |
| 6 | `slate` | `mist` | **5.17** | ✅ | ✅ | Secundario en secciones tintadas |
| 7 | `paper` | `ink` | **12.62** | ✅ | ✅ | Texto en secciones oscuras |
| 8 | `cloud` | `ink` | **7.77** | ✅ | ✅ | Secundario en oscuro (no usar blanco puro en párrafos: deslumbra) |
| 9 | `brand` | `ink` | **6.17** | ✅ | ✅ | **ÚNICO destino del verde como texto**: enlaces/énfasis en secciones oscuras. También UI components ≥3:1 ✅ |
| 10 | `brand` | `paper` | **2.04** | ❌ | ❌ | **PROHIBIDO**: verde como texto o como único color de un control interactivo sobre fondo claro, a CUALQUIER tamaño (falla incluso grande 3:1). Cita literal de las bases (R26): "el verde sobre blanco no llega al mínimo para texto pequeño. Úsalo en fondos, botones y detalles, no en párrafos" |
| 11 | `paper` | `brand` | **2.04** | ❌ | ❌ | **PROHIBIDO**: texto blanco sobre botón/franja verde. El texto sobre verde es SIEMPRE `ink` |
| 12 | `ember` | `paper` | **2.06** | ❌ | ❌ | Acento nunca como texto; solo fondo o adorno (§3) |
| 13 | `ink` | `brand-deep` | **5.06** | ✅ | ✅ | Hover de botones primarios |
| 14 | `paper` | `coal` | **10.9** | ✅ | ✅ | Tarjetas elevadas sobre secciones oscuras |

### 3.2 Veredicto explícito del verde (resumen para rules-auditor)

`#84c0bf` entra a la página solo de tres formas, todas AA:
1. **Como fondo** (botón primario con texto `ink` 6.77:1; franja newsletter con texto `ink` 6.77:1; círculos de pasos numerados).
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

---

## 5. Espaciado, layout, radius y sombras

### Grid y contenedor
- **Container máximo:** `72rem` (1152px), centrado (`mx-auto`).
- **Gutters:** móvil `1.25rem` (20px) · `md:` `2rem` · `lg:` `2.5rem`. En 360px el contenido nunca toca el borde.
- **Breakpoints de verificación (J3):** 360 / 768 / 1024 / 1440 — defaults de Tailwind (`sm 640, md 768, lg 1024, xl 1280`).
- **Grids por sección (sync D38 "Bento Signature" + D66):** "cómo funciona" → **stepper vertical de una columna** (D66; el bento se retiró solo aquí) · testimonios `7/5/5/7` desde `lg` (2×2 en `sm`) · noticias `7 (row-span 2) + 5 + 5` desde `lg` (destacada a ancho completo en `sm`) · footer `1 → sm:2 → lg:4` bloques. El sub-timeline de "cómo funciona" (D32) queda retirado: su raíl se reutiliza como track del stepper.
- **Raíl de la línea de tiempo (D32 · D65 · D67):** eje en el borde izquierdo del `page-container` (mismas métricas de gutter), **3px** (`w-[3px]`) y base `slate` (**5.57:1** sobre `paper`; el `line` #dfe6e6 original a 1px daba 1.27:1 y era invisible), `inset-y-0` por sección para que la línea sea continua. Sobre `ink` la base es `white/25` y en la franja `brand`, `ink/30`; el relleno de progreso sigue siendo `brand`. El **nodo de sección** es un **círculo doble** con disco `brand` de **44px móvil / 56px `lg`** (mayor que los nodos de paso `1.x` del stepper, 36/48px, D67). El contenido se indenta para dejarlo pasar: `pl-7 md:pl-14 lg:pl-20 xl:pl-24` (en 360px quedan ~288px útiles). Raíl y nodos son decorativos (`aria-hidden`). **Excepción (D59):** el Cierre ya **no** dibuja raíl — el pedido de la autora fue quitar la línea y el nodo de esa sección, así que el raíl recorre de "Cómo funciona" a "Newsletter" y el bloque del Cierre va centrado, sin indentación.

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
| Botones (primario y secundario) | `rounded-none` | Esquinas rectas — lenguaje editorial cuadrado (D36/D42). La píldora se descartó: no quedan botones-píldora (solo son circulares el avatar, el nodo del raíl y los puntos del ticker) |
| Tarjetas (testimonio, noticia) | `--radius-card` | 1rem (16px) |
| Inputs | `--radius-input` | 0.625rem (10px) |
| Chips / badges | `rounded-full` | pill |
| Celdas bento (D38) | `rounded-none` | Esquinas rectas + borde hairline 1px, sin sombra — continuidad editorial con el CTA `rounded-none` (D36/D46). Solo en testimonios y noticias (en "cómo funciona" el bento se retiró, D66) |

### Sombras (sutiles — R34 "que no estorben")
```css
@theme {
  --shadow-card: 0 1px 2px rgb(47 52 54 / 0.05), 0 8px 24px -12px rgb(47 52 54 / 0.12);
  --shadow-raised: 0 2px 4px rgb(47 52 54 / 0.06), 0 16px 32px -12px rgb(47 52 54 / 0.18);
}
```
- `card` por defecto en tarjetas sobre `paper`/`mist`; `raised` SOLO en hover de tarjeta con enlace.
- **En superficies `ink`: cero sombras** (no se ven); separar con `--color-coal` de superficie + borde `hairline-dark`.
- **CTA (D42/D43/D46):** un único estilo en todo el sitio — cuadrado relleno `brand`, texto `ink`, barrido especular de borde duro (`-skew-x-12 bg-white/30`) + micro-elevación `-translate-y-0.5` en hover. Sin halo ni sombra (nunca glow).
- El botón primario NO lleva sombra (el color ya domina la jerarquía).

---

## 6. Componentes base (patrones, sin código)

### 6.1 `ButtonPrimary` — CTA "Entrar al Discord de TechToJob" (hero, cierre, nav)
- Fondo `brand` · texto `ink` peso 700 · rectangular (`rounded-none`, D42) · `min-height: 48px` (hero) / `44px` (nav) · padding `0.75rem 1.75rem`.
- **Hover/focus:** fondo `brand-deep` (texto `ink` sigue AA: 5.06:1) + barrido especular de borde duro (`-skew-x-12 bg-white/25`, 500ms) y micro-elevación `-translate-y-0.5` (D43). Sin halo, sin sombra, sin cambio de tamaño del layout.
- **Un solo estilo de CTA (D46):** hero, header, menú móvil y cierre comparten exactamente las mismas clases salvo el tamaño (`nav`/`hero`/`block`). La antigua variante `line` (rectángulo hairline) se retiró. El hero mantiene UN solo botón (R11). Focus ring: `brand` sobre superficies oscuras, `ink` en el panel móvil (`paper`), por R26.
- **Focus-visible:** anillo `outline: 3px solid` — `ink` con `outline-offset: 3px` sobre superficies claras; `brand` sobre superficies oscuras (6.17 ≥3:1 ✅). Nunca `outline-none`.
- **On ink background (hero/cierre):** es el elemento más llamativo de la pantalla: tamaño de texto `lead`, icono Lucide `ArrowUpRight` 20px, `target="_blank" rel="noopener noreferrer"` + hint sr-only de "se abre en pestaña nueva" (texto en `messages/es.json`, R36).
- Contraste verificado: 6.77:1 ✅ AA normal y AAA grande.

### 6.2 `ButtonSecondary` / enlace de apoyo
- Sobre claro: borde 2px `ink/25`, texto `ink` 600, pill, `min-height: 44px`; hover: borde `ink`, fondo `mist`.
- Sobre oscuro: borde 2px `white/30`, texto `paper`; hover: borde `brand`, texto `brand` (6.17 ✅).
- Uso: SOLO donde el brief lo pida (ej. "Ver las bases del torneo" en noticias si se estiliza como botón). **En el hero no existe un segundo botón** (R11: un solo botón).

### 6.3 `TextLink`
- Sobre claro: `ink` 600 + `underline decoration-brand decoration-2 underline-offset-4` (el verde aquí es adorno de subrayado, el texto legible es `ink` → cumple R26). Hover: `decoration-thickness 3px`.
- Sobre oscuro: texto `brand` + subrayado a 2px.
- Siempre texto descriptivo, jamás "clic aquí" (R44).

### 6.4 `TestimonialCard` (×4, sección 7)
- Fondo `paper` sobre sección `mist` · `radius-card` · `shadow-card` · padding `1.5rem`.
- Estructura: fila superior → **avatar circular 48px** (hueco: fondo `brand` con iniciales `ink` 700 — placeholder honesto de la maqueta, listo para sustituir por `next/image` circular) + bloque nombre (`ink` 600, 1rem) y rol (`slate`, `small`).
- Debajo: frase en `body` 400, comillas tipográficas grandes en `brand` como adorno.
- **Hueco LinkedIn futuro (R17):** icono Lucide `Linkedin` 20px en la esquina inferior derecha del color `line`-dark con `aria-disabled`, `tabindex="-1"` y tooltip/sr-only "perfil próximo" — visible que el slot existe, pero claramente no clicable (no finge enlaces muertos, R43).
- Nota de maqueta: la sub-copy de la sección (ya redactada en specs/11) declara que son testimonios de muestra — mantener visible en `small` `slate`.

### 6.5 `NewsletterForm` (franja pre-footer sobre fondo `brand`)
- Fondo de sección `brand` con TODO el texto en `ink` (6.77 ✅) — la franja verde es el protagonismo cromático del que habla R26 ("úsalo en fondos").
- `label` visible arriba del input: "Tu correo electrónico" (`ink` 600, `small`) — nunca solo placeholder (J6 "etiquetas en el formulario").
- Input: fondo `paper`, borde 2px `ink/30`, `radius-input`, `min-height: 48px`, placeholder `slate` (5.57 ✅). Foco: borde `ink` + `outline 3px ink/40 offset 2px`.
- `type="email" required` (validación HTML5, Q8) + `aria-describedby` apuntando a nodo de error/éxito con `aria-live="polite"`. Mensajes de estado en `messages/es.json`.
- Botón: fondo `ink`, texto `paper` (12.62 ✅), rectangular (`rounded-none`, D42), `min-height: 48px`, hover `coal`. Es el único botón oscuro de la página → invierte el patrón del CTA principal y refuerza que esta franja es secundaria al Discord.
- Alineación móvil: label → input full-width → botón full-width (stack); `sm:` input + botón en fila.

### 6.6 `Nav` / `SiteHeader`
- `position: sticky; top: 0` · alto 80px (5rem, en sincronía con el `-mt-20` del hero y el `scroll-padding-top: 6rem`). **Barra SÓLIDA al 100%** que adopta la polaridad de la sección que tiene detrás (`data-header-surface` en `<html>`, publicado por la isla `HeaderSurface`, D47). El "sombreado amplio" que la disuelve es una **franja de gradiente por DEBAJO de la barra** (`.header-fade-*`, `top: 100%`, 2.5rem) — así el CTA nunca asoma por una zona translúcida (D47b). Crossfade `ink`↔`paper` de 250ms por `opacity` (CLS 0). Sin JS el header queda `ink` (progressive enhancement).
- Desktop (≥1024): composición de logo (§2a) · enlaces a anclas (`#como-funciona`… R45) en 600 `paper` sobre `ink` (≥8:1), `whitespace-nowrap`, hover subrayado `brand` 2px, targets ≥44px de alto · 5 anclas en `lg` y la 6.ª (`#noticias`) desde `xl` · CTA `ButtonPrimary` compacto con `whitespace-nowrap` — **jamás en 2 líneas** (el nav recorta enlaces, no el botón). **Sin recuadro** alrededor de las anclas (D45: se retiró el marco hairline); es una fila de enlaces desnuda.
- El contenedor del header es `page-container` (**72rem, D49**): el MISMO eje que el contenido, para que el logo, el nav y el CTA alineen con la página. Existe un **scrollspy** (`aria-current="location"` en el enlace activo, D49) y una **hairline de progreso** (`.header-progress`, 2px `brand`, `scaleX` con `animation-timeline: scroll(root)`, D49).
- Estado activo del nav (AA): en superficie oscura el enlace activo es `brand` (6.17:1); en clara el texto sigue `ink` y el `brand` va **solo como subrayado** (R26 prohíbe el verde como texto sobre `paper`).
- 640–1023: logo + CTA + hamburguesa · <640: logo + hamburguesa (el CTA vive en el panel).
- Menú desplegable (<1024): panel `paper` a ancho completo, enlaces en pila de 48px + CTA Discord full-width. `<details>` nativo: Enter/Space de serie, cero JS.
- Enlaces de salto de foco: primer elemento del `body` = "Saltar al contenido" sr-only que se revela al focus (criterio propio de accesibilidad; no es texto oculto con keywords, no viola R60).

### 6.7 `NewsCard` (×3, sección 8)
- `paper`, borde 1px `line`, `radius-card`, padding `1.5rem`, hover `shadow-raised` (es el único cambio).
- Chip de categoría: fondo `ember`, texto `ink` `label` pill (6.12 ✅) · fecha `slate` `small` · título `h3` 700 `ink` · resumen `body` · enlace descriptivo como `TextLink`.
- Sin imágenes de relleno (evita peso y alt cosméticos; R53/R57).

### 6.8 Stepper de "Cómo funciona" (D66/D67/D69)
- **Sustituye al bento D38 solo en esta sección** (y al antiguo `StepCard` circular). Es un `<ol>` de
  una columna que **reutiliza el raíl de página como track**: no se dibuja ninguna línea nueva.
- Cada `<li>` es un paso: **nodo doble círculo** sobre el raíl (anillo + disco con separación),
  `1.1`–`1.4`, **36px móvil / 48px `lg`**, en el acento **`ember`** (R25) con numeral `ink`
  (6.12:1 ✅ R26); luego `h3` + descripción + **línea de resultado** con barra `brand` (`border-l-2`).
  En `lg` cada paso se parte en 2 columnas (título 4 col · texto 6 col).
- **Motion (D69):** todo el texto entra con `.reveal-left` (`translateX(-2.5rem) → 0`, desde el raíl);
  el nodo se enciende con `.step-node-fill` (`cover` + `--i`). CSS puro, sin islas.
- **El lenguaje de celda bento D38/D61 (`.bento-reveal`/`.bento-lit`/`.bento-index`, con hover
  `scale-[1.02]` y sin `cursor-pointer`) sigue vivo en Testimonios (7/5/5/7) y Noticias (7+5/5).**
  No se toca.

---

## 7. Ritmo claro/oscuro + jerarquía visual por sección

Objetivo: que la página "entre por los ojos" (J1 25%) con alternancia controlada — **3 momentos oscuros que enmarcan, 1 franja verde que rompe, lectura siempre en claro**. El verde luce DONDE BRILLA: sobre `ink`.

La página se lee como **una línea de tiempo vertical** (D32): el Hero es la puerta (sin raíl) y el raíl dibuja los pasos 1–8, de "Cómo funciona" a "Newsletter". El Cierre es la meta narrativa pero **ya no dibuja el nodo final** (D59). El orden de esta tabla es el narrativo vigente (`content.ts → timelineOrder`) y el reorden se declara en el README (R10).

| # | Sección | Fondo | Énfasis y rol del verde |
|---|---|---|---|
| 0 | Nav | **Adaptativo (D47/D49)**: `ink` sobre secciones oscuras y `paper` sobre claras (barra sólida + franja de disolución debajo) | Barra que **se funde con la sección que tiene detrás** (crossfade 250ms) y, al scrollear, suma una hairline de progreso `brand`. Enlaces `paper`/`ink` según superficie, el MISMO composite tile+wordmark en ambas polaridades (§2a/§2.2), scrollspy activo y CTA verde compacto siempre visible. Eje full-bleed con gutters del sistema (D53) |
| 1 | **Hero (puerta)** | **`ink`** | **D36 "Vacío Editorial" V5**: grid asimétrico de 12 col, H1 en dos líneas editoriales (pregunta en `cloud` 7.77:1, respuesta en `paper` con la palabra final en `brand` 6.17:1), fondo `ink` plano (sin glows ni tiles ni canvas de grafos), metadatos reales en marginalia, marca de agua del símbolo al 10% y CTA relleno `brand` (`DiscordCta size="hero"`, estilo único D46) como ÚNICO botón (R11). Cierra una **franja ticker** (D38, marquee CSS puro, `aria-hidden`) con tokens reales ya publicados. Sin raíl |
| 2 | Cómo funciona (**paso 1**) | `paper` | **D66 stepper vertical** que reutiliza el raíl como track: nodos dobles `1.1`–`1.4` en `ember`, título + descripción + **línea de resultado**; el raíl de página la cruza igual que al resto (sin sub-timeline) |
| 3 | **Torneos (paso 2)** | **`ink`** | Sección "juego" y **prueba de que la comunidad está viva**: headline en `brand` 700 sobre oscuro (6.17 ✅) + símbolo de agua `gradient` al 10% (R15) |
| 4 | Talento (paso 3) | `paper` | H2 `ink` + copy en 65ch (eyebrow "Para desarrolladores" + borde superior `line`) |
| 5 | Empresas (paso 4) | `mist` | Mismo patrón que talento; el tinte marca el cambio de audiencia (dev → empresa) sin oscuridad |
| 6 | Networking (paso 5) | `paper` | Vuelta a lectura tranquila; sin bento (no tiene ítems: D38 lo deja editorial) |
| 7 | Testimonios (paso 6) | `mist` | **D38 bento 7/5/5/7**: celdas `paper` hairline sin sombra; avatar `brand`, comilla fantasma y slot LinkedIn deshabilitado (R17/R43) |
| 8 | Noticias (paso 7) | `paper` | **D38 bento 1 destacada + 2** (hairline); el acento `ember` aparece aquí por primera vez (chips de categoría) — novedad controlada |
| 9 | **Newsletter (paso 8)** | **`brand` (franja verde)** | La franja ES el color: todo el texto `ink` sobre verde. Único bloque verde macizo → no compite con el CTA (pre-footer, R19/D44). El raíl cruza en `ink/20` para no desaparecer |
| 10 | **Cierre (meta)** | **`ink`** | Espejo del hero (D35): H2 en dos líneas (`cloud` + `paper`) + el mismo botón verde dominante. Marca de agua `logo-symbol-gradient` al 10%. Último impacto = misma acción que el primer impacto (R20). **Sin raíl ni nodo (D59)** y bloque centrado |
| 11 | Footer | `ink` (continuo, separado por `hairline-dark`) | Jerarquía baja: `small` `cloud`, enlaces hover `brand`. Logo: el composite del header en polaridad oscura (D58, §2c). Legal con la nota honesta de specs/11 |

Regla anti-deriva: **nunca dos secciones oscuras seguidas salvo cierre→footer** (son el mismo bloque visual). Las secciones de lectura larga (copy > 3 líneas) siempre en claro.

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
> Todo es CSS puro: cero islas cliente nuevas.

| # | Qué | Spec | Fallback `reduced-motion` |
|---|---|---|---|
| 1 | **Entrada del header** (`animate-header-in`, 500ms): baja `-0.75rem` + fundido | Primer beat de la cascada (`transform`/`opacity` → CLS 0). El H1 es el elemento LCP, no el header | Header visible de inmediato |
| 2 | **Entrada del hero** (H1, sub, CTA, apoyo, meta, nav: escalonado 100→700ms) | El **H1 anima solo `transform`** (`animate-lift-in`), nunca `opacity`: el elemento LCP se pinta opaco en el primer frame | Todo el contenido visible de entrada, en su estado final |
| 3 | **Línea de tiempo vertical** (`timeline-fill` + `timeline-marker`, `animation-timeline: view()`) | El relleno `brand` crece con el scroll y cada nodo se enciende al entrar en vista. Un segmento por sección → la línea se ve continua de "Cómo funciona" a "Newsletter" (el Cierre queda fuera, D59) | Línea dibujada completa y nodos activos |
| 4 | **Entrada por elemento** (`.reveal`, D62/D63/D64): cada "beat" de sección (h2, intro, tarjetas, CTA) hace fade-in + `translateY(2.5rem)` → 0 con `animation-timeline: view()` y easing `cubic-bezier(0.2,0.9,0.2,1)`; `--i` desplaza el `animation-range` para el escalonado. Sustituye al viejo reveal de bloque | Solo `opacity`/`transform` → CLS 0; CSS puro, sin islas; el hero NO lo usa (su H1 jamás hace fade: es el LCP) | Contenido estático visible en su estado final |
| 4b | **Regla anti-bug de `view()`** (D63): el rango usa la fase **`cover`** (relativa al viewport), nunca `entry` (relativa al alto del elemento: un h2 de 40px terminaba el fade en ~11px de scroll); y **ningún ancestro** de un elemento con `view()` puede llevar `overflow: hidden` (crea scroll container y congela el timeline) → se usa `overflow-clip`. Rango corto para un efecto **brusco** (D64) | `cover 0% cover calc(12% + var(--i,0)*4%)` → ~56–96px de scroll con 40px de desplazamiento | — |
| 5 | **Ticker del hero** (`.animate-marquee`, D38): track duplicado, `translateX(0 → −50%)`, 34s lineal infinito | `transform` only; el bloque es `aria-hidden` y no interactivo (R11/R34) | `animation: none` + `transform: none`: el track se estaciona en el origen y se lee solo la primera copia |
| 6 | **Marcador fantasma bento** (`.bento-index`, D38, `animation-timeline: view()`) | Tras D66 queda **solo en Testimonios** (la comilla editorial sobredimensionada): `opacity`/`transform` en un `<span>` interno, decorativo (`aria-hidden`) | Marcador visible en su estado final |
| 7 | **Hover del CTA** (todas las instancias de `DiscordCta`, D42/D43/D46): estilo único relleno `brand` con barrido especular de borde duro (`-skew-x-12 bg-white/30`, 500ms) + micro-elevación `-translate-y-0.5` + flecha 2px | Feedback de asequibilidad del botón, no decorativo. Sin halo ni blur | Sin barrido ni translate (`motion-reduce:`); el cambio de color se mantiene |
| 8 | **Subrayado de enlaces de nav** (150ms) + hover de enlaces del nav rápido | Header y nav del hero: hover `decoration-brand` 2px | Subrayado presente en hover |
| 9 | **Grid del hero vivo** (D44): `.hero-field` panea una celda con el scroll (`animation-timeline: scroll()`) y `.hero-field-drift` añade un drift continuo de una celda (4rem en X e Y) en 28s | Capas anidadas para que ambos `transform` convivan; loop sin costura por la periodicidad del patrón; solo `transform` | Grid quieto y completo (el guard global colapsa ambos) |
| 10 | **Header adaptativo** (D47/D49): crossfade de la barra `ink`↔`paper` (250ms por `opacity`) + hairline de progreso `.header-progress` (`scaleX` con `animation-timeline: scroll(root)`) + scrollspy `aria-current` | Solo color/opacidad/transform, CLS 0; la hairline es CSS puro | Header `ink` fijo (sin JS) y sin hairline; ningún enlace marcado activo |
| 11 | **Entrada de celda bento** (`.bento-reveal`, D61/D63/D64): fade-in + `translateY(2.5rem)` → 0 con `animation-timeline: view()` y rango `cover`; stagger determinista por `--i` desplazando el `animation-range` (con `view()` el `animation-delay` se ignora) | Solo `opacity`/`transform` → CLS 0; CSS puro, sin islas | Celda estática visible en su estado final |
| 12 | **Iluminación de celda bento** (`.bento-lit`, D61): borde `line → brand` conforme la celda entra en el viewport, escalonado por `--i`; hover `scale-[1.02]` + `border-brand` (+ `bg-mist` en secciones `paper`) con `duration-300 ease-in-out` | Borde **duro, sin blur ni halo** (D43); `brand` sobre `paper` es decorativo (2.04:1), nunca texto (R26) | Borde en reposo (`line`); el hover conserva el cambio de color (sin escala) |
| 13 | **Entrada desde el raíl** (`.reveal-left`, D69; solo `#como-funciona`): `translateX(-2.5rem) → 0` + fundido con `view()` (rango `cover`, `--i`, easing `cubic-bezier(0.2,0.9,0.2,1)`) — cada paso parece salir de la línea de tiempo | Solo `transform`/`opacity` (CLS 0); no genera overflow horizontal | Contenido estático visible en su estado final |

**Prohibido explícitamente** (criterio propio + R34): scroll-jacking, parallax **de scroll**,
autoplay de nada y cualquier animación que retrase el LCP (por eso el H1 no hace fade).
Los reveals con `animation-timeline: view()` no son parallax: no desplazan contenido respecto
del scroll ni secuestran la navegación, y su estado por defecto (sin soporte) es el final.

---

## 10. Iconografía e imágenes

- **Lucide** como librería única (R33: no es un kit de componentes, son iconos; declarar en README con la fuente, R9). Trazo 2, tamaños 20/24px, siempre `aria-hidden` cuando acompañan texto visible.
- Fotografía/illustración: **no se usa** en esta landing (decisiones de sección arriba). Si el hero pidiera apoyo visual extra en futuro: solo `next/image` con WebP/AVIF, `width`/`height` explícitos (R55), lazy bajo el primer pantallazo y jamás en el hero (R56), alt descriptivo real (R57).
- Los logos SVG del repo pesan poco; el builder los optimiza con `svgo` antes de commitear y anota la fuente en README.

---

## 11. Pendientes que tocan a Lorena (⚠️ aprobación humana)

1. **Visto bueno del copy de `specs/11-contenido.md`** antes del build (es su voz ante el jurado — ya marcado allí).
2. **Créditos del footer**: nombre/handle para la línea final (pendiente en specs/11 §11).
3. Confirmar el acento `ember #f4a261` (es criterio propio de esta propuesta, no exigencia del concurso; R25 lo permite como "un color de acento de apoyo" — si Lorena prefiere cero acento, los chips de categoría pasan a fondo `mist` con borde `line` y texto `ink`, sin más cambios).
