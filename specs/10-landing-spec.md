# 10 · Spec de la landing — TechToJob Torneo #2

> Fuentes: `discord.txt`→`bases/bases-concurso.txt` (citas D+línea), checklist `00-checklist-reglas.md` (R#)
> y **`bases/brief.md`** (recibido 22/09 — posicionamiento y reglas de tono vinculantes).
> Posicionamiento oficial: "TechToJob no es un tablón de anuncios, es una comunidad" +
> "Comunidad de desarrolladores y empresas tech en español" (D120).

## Objetivo de conversión

- **Acción única principal:** entrar al Discord (R11 — "Un solo botón: entrar al Discord").
- **Secundaria:** suscripción a newsletter, deliberadamente ubicada en franja pre-footer para
  que no compita con el CTA del hero (R19, D44).
- **Qué debe comunicar la página:** "qué somos, a quién le sirve y conseguir que la gente entre
  al Discord" (D3).

## Público

Dos audiencias explícitas (reglas R13/R14), presentadas en **una sola sección split
"Audiencias" (D75)** — dos bloques lado a lado, no dos secciones apiladas, para que se lean
como dos caminos paralelos elegidos según el perfil y no como un flujo lineal:
1. **Talento dev** — quiere publicar perfil (stack, nivel, disponibilidad) y encontrar oportunidades.
2. **Empresas tech** — quiere publicar lo que busca y acceder a perfiles.
Ambas en el mismo ecosistema: comunidad + torneos + networking.

## Idioma

- Web en **español** (`lang="es"`, R46). Código y textos listos para añadir inglés sin reescribir
  (R36): todos los textos viven en `messages/es.json`, cero strings incrustados en componentes.
- Versión bilingüe entregada: **NO** por restricción de tiempo (decisión D-14); se documenta en README
  que la arquitectura está lista.

## Estructura de secciones (orden narrativo)

Orden orientativo salvo hero primero y footer último (R22: *"El orden es orientativo menos el
hero y el footer"*). **Decisión (22/09, D32):** se reordena respecto del orden propuesto del
brief para que la página se lea como una línea de tiempo — explicación → prueba → qué ganás →
qué gana la empresa → comunidad → confirmación → actualidad → CTA final. El reorden se declara
en el README y la declaración queda redactada en `docs/DECISIONES.md` (D32) hasta que el README
exista (Fase 5), según exige R10.

| # | Sección | Ancla | Qué comunica (brief disponible) | Regla |
|---|---|---|---|---|
| 0 | Nav (header) | — | **Barra adaptativa (D47/D49)**: adopta la polaridad de la sección de detrás, con logo/nav que cambian de color, **scrollspy** (`aria-current`) y **hairline de progreso**; logo + enlaces a secciones + CTA Discord | R42, R45 |
| 1 | Hero | `#inicio` | Qué es TechToJob, por qué no es un portal de empleo más. **Un solo CTA: entrar al Discord** (link real, pendiente Q3) | R11 |
| 2 | Cómo funciona | `#como-funciona` | Recorrido paso a paso: llegas → perfil → oportunidad (4 pasos). **D66 stepper vertical** que reutiliza el raíl de página como track (nodos `1.1`–`1.4`, línea de resultado por paso), `<ol>` intacto | R12 |
| 3 | **Torneos** (movida del #5) | `#torneos` | Competiciones abiertas como esta: la prueba de que la comunidad está viva. **D71–D74:** activo (7 col) + botín y salón de la fama apilados (5 col), y **cierre a todo el ancho** con la tabla de husos (`tabular-nums`); botín y salón marcados con chip `Ejemplo`. **D80:** contador en vivo del tiempo restante en la tarjeta del torneo | R15 |
| 4 | **Audiencias** (Talento + Empresas) | `#talento` (nav y footer apuntan aquí; `#empresas` queda como deep-link a la celda derecha) | Dos caminos paralelos en una sección split (D75): izquierda "Ofrécete como talento" (perfil: stack, nivel, disponibilidad), derecha "Publica como empresa" (publicar búsqueda, acceder a perfiles). H2 propio + intro SEO y listas escaneables (D76). Cada celda con badge numerado e icono; CTA dev relleno y CTA empresa outline, **ambos anclan a `#unete`** (el CTA real al Discord) | R13 + R14 (ambas en una misma `<section>` con dos `<article>`) |
| 5 | Networking | `#networking` | Canales por área y gente del sector, en composición asimétrica (D81): título + intro `lg:sticky` a la izquierda y tres bloques a la derecha — canales por área (píldoras), respuestas en minutos (punto `brand` de actividad) y el mercado oculto (ancla de jerarquía) | R16 |
| 6 | Testimonios | `#testimonios` | 4 tarjetas: nombre + frase (maqueta declarada); **diseño reserva sitio para foto + enlace a perfil LinkedIn** (slot de avatar circular + icono/link deshabilitado visualmente listo para datos reales). **Bento 7/5/5/7 (D38)** | R17 |
| 7 | Noticias | `#noticias` | 3 entradas de ejemplo (fecha, título, resumen, link descriptivo). **Bento 1 destacada alta + 2 (D38)** | R18 |
| 8 | Newsletter | `#newsletter` | **D100:** tarjeta Bento (`coal` + hairline) sobre `ink` con el h2/copy a la izquierda y el formulario a la derecha; label visible, validación HTML5 + feedback y nota de confianza bajo el input; franja antes del footer | R19 |
| 9 | Cierre | `#unete` | Último empujón: repetir CTA Discord (nodo "meta" del raíl) | R20 |
| 10 | Footer | — | Enlaces por bloques (secciones, comunidad, legal), redes (Q5), copyright | R21 |

## Línea de tiempo vertical (estructura compartida, D32)

La página se recorre como una línea de tiempo continua, con el Hero como **puerta** y el Cierre
como **meta**. Orden narrativo de arriba. Especificación:

| Elemento | Spec | Regla/nota |
|---|---|---|
| **Raíl** | Línea continua en el borde izquierdo del `page-container`. **Cada sección dibuja su propio segmento a altura completa** (`inset-y-0`) y los segmentos contiguos forman una sola línea: sin cálculo entre secciones | Decorativo → `aria-hidden` + `pointer-events-none` (R34: no estorba; no es interactivo) |
| **Relleno animado** | Sobre el segmento, relleno `brand` con `scaleY` 0→1 vía `animation-timeline: view()` (CSS puro, cero JS) | Sin soporte de scroll-driven animations → **línea dibujada completa** (nunca invisible) |
| **Nodo** | Círculo de 28px centrado en el raíl, alineado con el `h2` de la sección (`top-20 lg:top-32`, que es el padding de la sección). Contiene el numeral del paso (aria-hidden). Se activa al entrar en vista | **Sin etiqueta de texto**: el rótulo del paso ES el `h2` de la sección → no se duplica contenido (R36/SEO) |
| **Variantes de nodo** | `step` (secciones) y `goal` (Cierre: círculo de 40px relleno `brand`). El hero **no lleva raíl** ni nodo: es la puerta y el viaje arranca en el paso 1 | — |
| **Tones y grosor (D65)** | Claro: raíl base **`slate` 2px** (5.57:1 sobre `paper`; antes `line` 1px = 1.27:1, invisible) + relleno `brand` + nodo `border-brand`/`bg-paper`/`text-ink`. `ink`: raíl `white/25` + relleno/nodo `brand`. **D100:** la variante de la franja `brand` (raíl `ink/30`, relleno y nodo `ink`) queda **sin uso** — Newsletter pasa a `ink` y usa la variante oscura estándar | Todas las combinaciones se mantienen dentro de la paleta fija (R24/R25) |
| **Sub-timeline** | ~~timeline central alternado~~ → **D38:** sin sub-timeline; el raíl cruza la sección. **D66:** "Cómo funciona" pasa a **stepper vertical que reutiliza ese raíl como track** (nodos de paso `1.1`–`1.4` sobre la línea), sin dibujar una segunda línea. Se conserva el `<ol>` con la secuencia real | R12; copy nuevo aprobado por Lorena (R36) |
| **Anchos** | Raíl completo desde `xl` (1280+); compacto (mismo raíl, contenido con `pl-7`) entre 360 y 1279. Verificar que las rejillas de 4 y 3 columnas no se aprieten | R38 (responsive 360/768/1024/1440) |

> **Pendiente de auditoría:** el reorden deja obsoleta la línea previa de R22 en
> `specs/00-checklist-reglas.md` ("orden del brief sin cambios") → debe re-auditarse cuando se
> reactive el QA (D28).

## Bento grid y motion (D38 — "Bento Signature")

**Motivo (D37 + D38):** las secciones del cuerpo eran uniformes (`h2 + párrafo`); el referente
cosmos.so se percibe "vivo" por **ritmo y movimiento**, no por decoración. El bento se aplica
**solo donde ya hay varios ítems** para no inventar contenido (J2/R36).

| Pieza | Spec | Regla/nota |
|---|---|---|
| **Lenguaje de celda** | Borde hairline 1px, **esquinas rectas** (continuidad editorial con el CTA `rounded-none` de D36), sin sombra. En sección `paper`: celda transparente `border-line`. En sección `mist`: celda `bg-paper border-line`. **D85 (Audiencias `ink`): celda `bg-coal` + borde `border-hairline-dark`** y `.bento-lit-ink`; **D86/D87 (Testimonios `mist`): celda `bg-paper` + borde `border-line`** + `.card-idle`; **D100 (Newsletter `ink`): UNA tarjeta `bg-coal` + `border-hairline-dark`** + `.bento-lit-ink` + `.card-idle` que envuelve texto y formulario | R24/R25 (paleta fija); sustituye `--radius-card`+`shadow-card` SOLO en estas secciones |
| **Numeración de índice** | En Testimonios el marcador es la comilla editorial y en Noticias la fila fecha+chip: no se añade numeral para no duplicar información. ("Cómo funciona" ya no usa este recurso: pasó al stepper con nodos `1.1`–`1.4`, D66) | R34; no duplica contenido |
| **Grid** | 12 columnas desde `lg`; móvil/tablet: una columna apilada en orden DOM. Testimonios: 7/5/5/7. Noticias: 7 (row-span 2) + 5 + 5. ("Cómo funciona" es stepper de 1 columna, D66) | R38; verificar 360/768/1024/1440 |
| **Hero ticker** | Marquee CSS puro bajo el hero (`border-t` hairline, `text-label` uppercase `cloud`, separador `brand`), con tokens reales ya publicados (stacks de `hero.meta`, "Torneo #2", "Comunidad técnica en español"). Track duplicado para bucle continuo. `aria-hidden` (duplica `hero.meta`) y **no interactivo** | R11 (no es CTA), R36 (strings en `es.json` como `hero.ticker`, derivados), R34 |
| **`.marquee`** | `transform: translateX(0 → −50%)` lineal, ≥30s, `infinite`; `reduced-motion` lo detiene en reposo | D37.2 (CSS puro, cero islas) |
| **`.bento-index`** | `animation-timeline: view()`; escala/opacidad del numeral al entrar en vista, en un `<span>` interno para no pelear con el posicionamiento | D37.2; fallback: numeral visible |
| **Reveal de celda (D38 → D61)** | Sustituye a `.reveal` en las celdas bento: `.bento-reveal` (fade-in + `translateY(1.25rem)` → 0) con `animation-timeline: view()`. El stagger es determinista desplazando el `animation-range` con `--i` (con `view()` el `animation-delay` se ignora: el progreso es el scroll) | R34; `prefers-reduced-motion` → celda visible sin animación |
| **Iluminación secuencial (D61)** | `.bento-lit`: el borde de cada celda pasa de `line` a `brand` (borde **duro, sin blur ni halo**, D43) conforme entra en el viewport, escalonado por `--i` | R34; borde `brand` sobre `paper` = decorativo (2.04:1, nunca texto ni único indicador: R26) |
| **Hover de celda (D61)** | `transition-[transform,background-color,border-color,box-shadow] duration-300 ease-in-out` + `hover:scale-[1.02]` + `hover:border-brand`; en secciones `paper` además `hover:bg-mist`. **Sin `cursor-pointer`**: las celdas no son enlaces, el hover es feedback honesto y no finge clic | R34 (CLS 0: `transform` no reflow); afordancia honesta |

> **Networking (D81):** deja de ser un párrafo editorial para convertirse en una composición
> asimétrica con tres bloques (canales / minutos / mercado oculto). **No usa el lenguaje de
> celda bento** (sus bloques no son "ítems" repetidos): se separan con hairlines `line` de 1px
> sobre `paper`, con hovers de opacidad. **Audiencias (D75)** sí usa el lenguaje de celda para
> el split de 2 bloques (dos caminos): dos `<article>` `paper` hairline sobre `mist`.

## Entrada por elemento en todas las secciones (D62/D63/D64)

**Motivo:** el reveal anterior (`.reveal` en el contenedor) animaba cada sección como **una sola
pieza**; Lorena pidió que los elementos vayan apareciendo **uno a uno** al scrollear. Se repurposa
`.reveal` de "contenedor" a "elemento" y se retira del wrapper.

| Pieza | Spec | Regla/nota |
|---|---|---|
| **`.reveal` (elemento)** | Fade-in + `translateY(2.5rem)` → 0 con `animation-timeline: view()`; `animation-range: cover 0% cover calc(12% + var(--i,0) * 4%)`; easing `cubic-bezier(0.2, 0.9, 0.2, 1)`. Reutiliza el keyframe `step-in` (D61). Efecto **brusco** (D64) | R34; CLS 0 (`opacity`/`transform`); sin JS ni islas |
| **Rango en `cover`, no `entry`** (fix D63) | `entry` se mide sobre el **alto del elemento** (un h2 de ~40px terminaba el fade en ~11px de scroll → imperceptible); `cover` es relativo al **viewport** y da ~56–96px de scroll con cualquier tamaño (D64) | Verificado en navegador |
| **Nada de `overflow: hidden`** (fix D63) | Un ancestro con `overflow: hidden` crea scroll container propio y **congela** el timeline `view()` (pasaba en Torneos y Cierre) → se usa `overflow-clip` (recorta igual, no crea scroll container) | `Tournaments.tsx`, `Closing.tsx` |
| **Aplicación** | Torneos (h2/copy/bloques), Audiencias (h2 + 2 celdas), Networking (h2 + intro estáticos en la columna `sticky`; los 3 bloques de la derecha con `.reveal`), Testimonios (h2/sub), Noticias (h2/nota), Newsletter (h2/copy/formulario), Cierre (h2/p/CTA). Las celdas bento conservan `.bento-reveal` (D61). **"Cómo funciona" y "Torneos" usan `.reveal-left`** (desde el raíl, D69/D72), no `.reveal` | `--i` para escalonar cuando los elementos van en fila (Newsletter/Cierre); en columna el scroll ya escalona. **D81:** la columna `lg:sticky` de Networking NO lleva `.reveal` (un `view()` sobre caja sticky es poco fiable) |
| **Hero excluido** | Mantiene su entrada propia; el H1 nunca hace fade (elemento LCP) | R34/R40 |
| **Fallbacks** | Sin soporte de `animation-timeline` o con `prefers-reduced-motion` → contenido visible y estático | WCAG 2.3.3 |


## Stepper de "Cómo funciona" (D66/D67/D69/D70)

Sustituye al bento D38 **solo en esta sección** (los de Testimonios y Noticias siguen igual). El raíl
de página se reutiliza como track: no se dibuja una segunda línea.

| Pieza | Spec | Regla/nota |
|---|---|---|
| **Estructura** | `<ol>` de una columna; cada `<li>` = paso (nodo + `h3` + descripción + **línea de resultado** con barra `brand`). En `lg` cada paso se parte en 2 columnas (título 4 col · texto 8 col, D70) | R12 (recorrido de 4 pasos); orden DOM = orden visual (R32) |
| **Nodo de paso** | Círculo doble (anillo + disco interior con separación `paper`) sobre el raíl; `1.1`–`1.4`; **36px móvil / 48px `lg`**; acento **`ember`** (R25); numeral `ink` (6.12:1 ✅ R26) | `aria-hidden` (el orden lo da el `<ol>`); `-left-*` cancela el indent de `Section` |
| **Nodo de sección** (D67) | Círculo **doble** con disco `brand`; **44px móvil / 56px `lg`** (mayor que el de paso); numeral `ink` sobre `brand` (6.77:1) | Mismo `TimelineRail` para todas las secciones |
| **Raíl** (D65/D67) | Base `slate` de **3px** (`w-[3px]`); relleno de progreso `brand` | 5.57:1 sobre `paper` |
| **Entrada desde el raíl** (D69) | Todo el texto de la sección (H2, intro, título + descripción + resultado de cada paso, cierre y enlace) usa `.reveal-left` (`step-in-left`, `translateX(-2.5rem) → 0`) con el `cover`/`--i`/easing de `.reveal`: cada paso "sale" de la línea de tiempo. El hero conserva su revelado palabra a palabra | Solo `transform`/`opacity` (CLS 0); sin overflow horizontal; sin soporte o `prefers-reduced-motion` → estático |
| **Jerarquía del resultado** (D70) | La descripción es `text-slate` (secundaria) y el `result` pasa a `text-lead font-semibold text-ink` con barra `border-l-[3px] border-brand`: la promesa ("lo que ganas") manda sobre la explicación | R36/J2 (copy ya aprobado, sin inventar); R24/R25 |
| **Columnas** (D70) | `h3` 4 col + texto `lg:col-span-8` (sin `col-start`), `lg:gap-x-12`: se cierra el carril vacío de la col 5 y los ~190px muertos a la derecha | R38 (verificar 360/768/1024/1440) |
| **Enlace final** | `TextLink` al Discord (nunca botón, R11) con `IconArrowUpRight` + hint sr-only de pestaña nueva | R44 (texto descriptivo) |
| **Copy** | Líneas de resultado + `cta` aprobadas por Lorena; viven en `messages/{es,en}.json` (`Step.result`, `HowItWorks.cta`) | R36; sin cifras inventadas (J2) |


## Newsletter — tarjeta Bento sobre `ink` (D100, 23/09)

**Motivo:** pedido de Lorena (*"elimina el bloque gigante de color plano… el contenido debe vivir
dentro de una tarjeta Bento unificada"*). Se retira la franja `brand` maciza (D44) y la sección se
reintegra al **ritmo oscuro** con una tarjeta única, conservando el raíl y su nodo (paso 7).

| Pieza | Spec | Regla/nota |
|---|---|---|
| **Superficie** | `tone="ink"` (`#2f3436`): la sección deja de ser la única franja `brand` del sitio y enlaza con el `ink` del Cierre. El verde queda como **fondo de botón, relleno del raíl y nodo** — el rol que R26 permite | R19 se sigue cumpliendo: **franja pre-footer** con formulario y `label` visible (la norma pide "una franja", no un color); R24/R25: los 3 colores base siguen dominando |
| **Tarjeta Bento** | UN panel que envuelve eyebrow + título + copy + formulario: `bg-coal` + `border border-hairline-dark` (1px), esquinas rectas, sin sombra, `p-6 lg:p-10`; `.panel-in` (entrada del panel, D103) + `.bento-lit-ink` (borde que se ilumina al entrar). **D104:** se retiran `.card-idle` y el `line-idle` del borde superior (repetían el hilo de sección y el encendido del borde) | Lenguaje de celda sobre `ink` ya establecido en Audiencias (D85); **sin tokens nuevos** |
| **Raíl y nodo 7** | Sin cambios de estructura: `TimelineRail tone="ink"` → base `white/25`, relleno `brand`, nodo doble `border-brand bg-ink` con numeral `ink` sobre disco `brand` (6.17:1). **D105:** el nodo lleva un **halo `brand` que respira** (`node-flash`, 7s, centro transparente, fase escalonada por `--i`) | R34 (decorativo, `aria-hidden`); el numeral ya es **7** (`timelineOrder` → posición 7); `brand` `#84c0bf` es el "verde menta" del brief |
| **Rejilla** | `lg:grid-cols-12`: texto en `lg:col-span-7` y formulario en `lg:col-span-5`, separados por **hairline vertical** (`lg:border-l border-hairline-dark lg:pl-12`). Móvil: apilado (texto → formulario) | R38 (verificar 360/768/1024/1440) |
| **Eyebrow** | Overline `text-label uppercase text-brand` con punto `brand`, reutilizando la etiqueta ya existente `nav.links.newsletter` | R36 (cero copy nuevo) |
| **Entrada** | El **panel entra con `.panel-in`** (recorrido 1rem y ventana del 26%, D103) y **cada** elemento del formulario (label, input, botón, hairline, nota y estado) entra y sale con `.reveal`; eyebrow/h2/copy con `.reveal-left`. `.text-drift` **solo** en la columna de texto (un `transform` ancestro mueve los controles) | D62/D84/D101/D102/D103 |
| **Input** | Fondo `ink` (hundido sobre la tarjeta `coal`), borde **1px `white/40`** (**3.37:1** ≥3:1, WCAG 1.4.11 del control), `rounded-input`, `min-h-12`, **ancho completo**, texto `paper` (12.62:1), placeholder `cloud/70` (4.64:1). Foco: `focus:border-brand` (6.17:1) + `outline-3 brand` con offset. Transición de color suave | `type="email" required` + `aria-describedby` (§6.5). El `focus:border-cyan-500` del brief **NO se aplica**: el cian viola R24/R25 (paleta fija) → se mapea a `brand`, el mismo "verde menta/cian" |
| **Label** | Overline visible sobre el campo (`text-label uppercase text-cloud`) — nunca solo placeholder | J6 ("etiquetas en el formulario") |
| **Nota de confianza** | `Solo un correo a la semana. Nada más.` **justo debajo del campo**, con punto `brand` y separador `.line-idle`; `text-small text-cloud/80` (**4.73:1** sobre `coal`) | R36 (copy existente, sin tocar); el `text-slate-400` del brief se mapea a `cloud/80` (token de la paleta) |
| **Botón** | Relleno `brand` + texto `ink` (6.17:1) + `font-bold`, **`rounded-none`** (D101; el `rounded-lg` de D100 se retiró), `min-h-12` y **ancho completo bajo el campo** (el input deja de ir estrangulado); hover: `bg-brand-deep` (5.01:1) + `-translate-y-0.5` + `shadow-glow-cta` + barrido especular; foco: `outline-3 brand` | R26 (texto sobre verde = siempre `ink`); R11 (no compite como primario: **sin** flecha, **sin** `cta-glint` y sin flecha de CTA Discord) |
| **Estado** | `<p role="status" aria-live="polite">` bajo la nota, sin altura reservada (el mensaje aparece tras una acción del usuario → fuera del CLS) | R19/Q8 (maqueta sin backend, feedback honesto) |

> **Mapeos declarados (brief → sistema):** (1) "fondo sutilmente más oscuro que el general" → se usa
> `coal`, la superficie de tarjeta **documentada sobre `ink`** (D85); no existe un token más oscuro que
> `ink` y crear uno violaría R24/R25 sin necesidad. (2) "cian" → `brand`. (3) "slate-400" → `cloud/80`.
> (4) `rounded-lg` en el botón → **probado en D100 y revertido en D101**: era la única pieza redondeada
> del sitio y rompía el lenguaje cuadrado de D42. Hoy todo el sitio es `rounded-none`.
> (5) **D107:** el mensaje pasa a estructura escaneable (lead + `<ul>` de 3 items verbatim del copy
> aprobado + sello de la promesa); el tipo `Messages` es una interfaz escrita a mano en `content.ts`,
> así que cada cambio de catálogo exige ampliarla (`items`, `seal`).
> **Ajustes posteriores al brief (D101–D106):** D101 formulario en columna estrecha → apilado a ancho
> completo + eyebrow + botón cuadrado; D102 escala tipográfica propia de "Cómo funciona"/"Torneos"
> (`.section-tight`) y entradas/salidas más lentas; D103 `panel-in` + destello idle de los CTA
> (`.cta-glint`); D104 poda de ornamento del panel; D105 halo de los nodos del raíl (`node-flash`);
> D106 salida acortada (meseta 84% → 92%).
> **Efecto en el ritmo (design-system §7):** Newsletter deja de ser la franja que rompe; el tramo
> `Newsletter ink → Cierre ink` se lee como un **único bloque de cierre** (misma excepción que
> `Cierre → Footer`). Se actualiza la tabla de ritmo y la regla anti-deriva.

## Cierre (`#unete`) — 100vh, "la puerta", luces del hero y remate de marca (D121, 23/09)

**Motivo:** el globo reticulado y la red de D108–D120, y después la retícula + constelación, fueron
**exploraciones descartadas** por Lorena. Pedido final: *"la animación que quiero replicar en toda
esta sección es la de las luces esas que están dando vuelta por el hero"*, *"asegúrate de que ocupe
100vh"*, *"el logo en un cuadrado y más grande… el nombre con el mismo efecto… que este elemento sea
un todo"* y *"texto centrado llamativo con su respectiva animación de entrada/salida y de
salida/entrada"*.

| Pieza | Spec | Regla/nota |
|---|---|---|
| **Alto** | `flex min-h-svh flex-col justify-center`: la sección ocupa **una pantalla** con el contenido centrado verticalmente (patrón del hero). El bloque del remate baja a `h-[140px] sm:h-[160px] lg:h-[180px]` para que nada desborde | Pedido explícito (*"ocupe 100vh"*); R38 (verificar 360/768/1024/1440 y viewports bajos en el gate) |
| **Luces** | Fondo a toda la sección con **las MISMAS clases del hero** (`.hero-facet-mask` + `.hero-facet` + `.hero-facet-alt`): cuñas `conic-gradient` de borde duro que rotan **64s y 88s**. No se duplica CSS | Lorena (*"las luces que están dando vuelta por el hero"*); al compartir clases, hero y cierre no pueden divergir; R34 (bucles ≥3.5s, CLS 0) |
| **"La puerta"** | Dos hojas `ink` con canto `brand` cubren la sección y se **abren con el scroll** (`view()`, solo `translate`), dejando salir la luz hacia el CTA | Literaliza el copy ya aprobado (*"La puerta es el Discord"*, R36: cero copy nuevo); **estado por defecto = abiertas**; rango corto `cover 0% → cover 35%` (a un salto de ancla las hojas ya están abiertas y nunca tapan el CTA); `pointer-events: none` |
| **Remate** | Lockup oficial del header (D31/D55) en grande: isotipo en tile cuadrado (`border-brand/40 bg-white/5`, `h-16/lg:h-24`) + `wordmark-duo` (`h-7/lg:h-10`), envuelto por un anillo de luz facetada que gira (64s) y respira (9s) | Ortogonal al isotipo y al nombre (*"que este elemento sea un todo"*); el **isotipo no se rota ni se deforma** (R27/R39): gira la luz; assets oficiales reutilizados, sin piezas nuevas |
| **Texto** | H2 en dos líneas (`cloud`/`paper`), copy y CTA centrados; entran y salen con `.reveal` (fade + `translate`, **se invierte al subir el scroll**) | Pedido explícito (*"entrada/salida y de salida/entrada"*); D62/D63/D77/D102/D106 intactas; R36 (cero copy nuevo) |
| **Tono** | `brand`, `brand/40`, `white/5` y el acento `ember` al 22% (ya existente); cero colores nuevos | R24/R25; sin `filter: blur` (D37.1/D86) |
| **Accesibilidad** | Luces, puerta y remate son decorativos (`aria-hidden` + `pointer-events-none`); el foco y el clic pasan siempre | R34/R42; el CTA y el copy no cambian (mismo texto de `messages/{es,en}.json`) |
| **Limpieza** | Se borraron `ClosingNetwork.tsx`/`ClosingConstellation.tsx` y todo el CSS `.network-*`/`.constellation-*` (incluido `SHOW_GRATICULE`); queda respaldo fuera del repo | R35 (sin código muerto); `overflow-clip` intacto (D63) |

> **Pendiente del gate "vamos a revisar":** capturas 360/768/1024/1440, contraste del conjunto y
> confirmación de que la sección no supera una pantalla en viewports bajos.

## Hero V6 — "Plano Cinético" (D40)

**Motivo:** pedido de rediseño del hero (22/09 noche) con *mesh gradient* animado e imágenes
flotantes del torneo. **Ambos elementos están vetados**: manchas difuminadas = "blobs/aurora
gradients" (prohibidos por D37.1) e "imágenes flotantes decorativas" = "partículas flotantes"
(misma prohibición); además violeta/cian/`#0B0F19`/`#F9FAFB` violan R24/R25 (paleta fija) y no
existen fotos del torneo en el material (prohibido inventar, J2). Se conserva la **intención**
(color vivo, movimiento, revelado editorial, tema torneo) con el vocabulario que D37.1 sí admite:
háirlines de plano, tipografía cinética y numeración.

| Pieza | Spec | Regla |
|---|---|---|
| **Campo de retícula** (`hero-field`) | Plano `repeating-linear-gradient` (hairline `rgb(255 255 255 / 0.05)`, celda 64px) en un div absoluto `-inset-y-16`, `aria-hidden` + `pointer-events-none`; `mask-image` lineal para desvanecer hacia el pie. Paneo de una celda (`translate3d(0,-64px,0)`) con `animation-timeline: scroll(root block)`, `animation-range: 0 80vh` | R24/R25 (sin colores nuevos), D37.1 (hairline de plano, no decoración suelta), R34 |
| **Haz de luz** (`hero-beam`) | Hairline larga (1px) + compañera ancha (6rem) a `brand/25` y `brand/6`, **bordes duros** (gradiente lineal, **cero `blur`**), rotadas 22°; deriva `translate3d` + `rotate` 26s. `will-change: transform` + `backface-visibility: hidden` | D37.1 (prohibido blob/aurora: el haz tiene borde, no difumina), R34 |
| **Numeral de edición** (marginalia con raíl) | La columna `hero.meta` pasa a **escalera hairline**: borde izquierdo `white/12` + nodo `brand` por dato (eco de *bracket* de torneo). Sustituye a las "imágenes flotantes del torneo" | D37.1 (numeración/hairlines), J2 (sin assets inventados), R56 |
| **Revelado del H1** (`word-rise`) | H1 partido en palabras; cada una en `overflow-hidden` + `translate3d(0, 115%, 0)`, escalonado 45ms, **transform only, sin opacidad** (protege el LCP; el H1 deja de usar `animate-lift-in` para no duplicar transform). Fallback: si el gate de Fase 5 mide peor LCP, se colapsa al `animate-lift-in` de bloque | R39/R40 (texto real, un solo `h1`), design-system §9 #2, R34 |
| **Subrayado cinético** (`hero-highlight-line`) | Rule `brand/60` de 1px bajo la palabra destacada que se dibuja con `scaleX` vía `animation-timeline: view()`; sin soporte, visible | D37.1 (tipografía cinética), R34 |
| **Prohibido en el hero (D40)** | Manchas difuminadas (`filter: blur`), `mesh`/aurora, violeta/cian/`#0B0F19`/`#F9FAFB`, imágenes flotantes | D37.1, R24/R25, R56 |

> Nota (D40): la landing **no tiene selector de tema** claro/oscuro; el hero es una superficie
> `ink` por diseño (ritmo claro/oscuro, §7). Un "light mode" del hero sería una función nueva →
> decisión aparte. El sistema `@theme` no define modo oscuro.

### Hero V7 — combo "cristal + red" y limpieza (D41)

Iteración pedida por Lorena sobre el V6: quitar el overline que se apilaba, añadir el combo
aprobado (#2 cristal facetado + #4 red que se dibuja) y rebalancear la altura.

| Cambio | Spec | Regla/nota |
|---|---|---|
| **Overline eliminado** | Se quita el `<p>` folio del hero, el campo `overline` de `content.ts` y la clave `hero.overline` de `es.json` (sin texto muerto). Se veía como 5 líneas en `lg` (sin `col-span`, quedaba en 1/12 de ancho). El mensaje "comunidad técnica en español" sigue en `hero.ticker` y `meta.description` | R36 (texto muerto fuera), D41 |
| **Cristal facetado (#2)** | `hero-facet-mask` (máscara radial) con `hero-facet` / `hero-facet-alt`: cuñas `conic-gradient` de **borde duro** en `brand`/`ember` (≤10%), rotación `facet-turn` 64s / 88s. **Sin `blur` ni blend modes** (se descartó `mix-blend-mode` por aislamiento del layer decorativo; alfa directo = predecible) | D37.1 (prohibido blob/aurora: hay bordes), R24/R25, R34 |
| **Red que se dibuja (#4)** | ~~`HeroNetwork.tsx`~~ **retirada en D43** (Lorena: "es horrible"): en su lugar va la **marca de agua oficial** `logo-symbol-gradient.svg` al 10%, abajo-derecha (`-bottom-28 -right-20`, `pointer-events-none`, `loading="lazy"`), idéntica a Torneos/Cierre | D43, J1, R39 |
| **Rebalance del hero** | Contenedor a `justify-center` + `lg:content-center`, `pt-28 lg:pt-32`, `pb-20 lg:pb-24`; el `<h1>` pasa a ser el primer bloque → comparte fila con la marginalia (se elimina la fila superior vacía) | R38 (sin hueco muerto), J1 |

> Pendiente de Fase 5 (D28/D39): medir LCP del revelado por palabra e INP del facetado rotatorio;
> verificar contraste del facet/beam y del estado relleno del CTA. Todo es CSS puro, cero islas.

### Ajustes D42–D52

| Ajuste | Spec | Regla/nota |
|---|---|---|
| **Soporte del hero** | `hero.support` y el `div` del CTA ganan `lg:col-span-5`: ya no caen en 1/12 y no se parten en 6 líneas | D42, R38 |
| **Botones cuadrados** | Todas las píldoras → `rounded-none`: `DiscordCta` (sin anillo `animate-breathe`, eliminado del CSS), header completo (logo, enlaces, hamburguesa, panel móvil), botón del newsletter y skip-link. **D100** lo excepcionó con `rounded-lg` y **D101 lo revirtió** al verlo en pantalla: hoy **no hay ninguna excepción** | D42, D100/D101, R24, D36 |
| **Header más ancho** | El header usa `page-container-wide` (`--container-page-wide: 80rem`); el resto de la página sigue en 72rem | D43, R38 |
| **Marca de agua del hero** | `logo-symbol-gradient.svg` al 10% abajo-derecha, **520×520** (D45); reemplaza la red retirada | D43/D45, R39 |
| **Grid vivo** | El grid del hero se mueve: paneo por scroll (capa externa `.hero-field`) + **drift continuo** de una celda (4rem X/Y) en 28s (capa interna `.hero-field-drift`, sobredimensionada `-inset-16`). Loop sin costura; solo `transform` | D44, D37, R34 |
| **Nav sin recuadro** | El `<ul>` del nav de escritorio pierde borde/fondo/padding (queda `flex items-center gap-1`); enlaces con hover subrayado. El panel del menú móvil se conserva | D45, R42 |
| **CTA Discord único (D46)** | Un solo estilo en TODO el sitio: cuadrado relleno `brand`, texto `ink` (6.77:1), barrido especular + micro-elevación, flecha. Solo cambia el tamaño (`nav` compacto / `hero` prominente / `block` full-width). Se **retira la variante `line`** (hairline) y el hero pasa a `size="hero"`. Focus ring `ink` en el panel móvil sobre `paper` (R26) | D46, R11, R26, R34 |
| **Header adaptativo (D47)** | Barra **sólida** que adopta la polaridad de la sección de detrás (`data-header-surface` en `<html>` vía la isla `HeaderSurface`); disolución en una franja de gradiente **debajo** de la barra; logo compuesto en oscuro / `logo-horizontal.svg` en claro; bloque `brand` de la newsletter tratado como `dark` (**D100:** ya no aplica — la newsletter es `ink` y se declara `dark` por su propio tono); en claro, CTA con borde `ink` (WCAG 1.4.11) | D47, D100, R24/R25, R26, R34 |
| **H1 y copy (D48)** | Espacios reales entre palabras del `<h1>` (bug de a11y/SEO); `lg:col-span-8`; línea 2 → *"Aquí te conocen antes de la vacante."* + `meta.og.headline`/`ogImageAlt` sincronizados | D48, R39/R40 |
| **Header eje + nav vivo (D49)** | Header vuelve al eje `page-container` (72rem) como el contenido; **scrollspy** (`aria-current="location"`, activo `brand` en oscuro / `ink`+subrayado `brand` en claro por R26); **hairline de progreso** `.header-progress` (`scaleX`, `animation-timeline: scroll(root)`, CSS puro) | D49, R42, R45, R34 |
| **Ritmo vertical del hero (D50)** | `pt − pb = 80px` (altura del header, `-mt-20`) para centrar el bloque en el área visible: `pt-36 pb-16` / `lg:pt-40 lg:pb-20`; `support → quick-nav` pasa a `mt-10` en móvil (ritmo consistente) | D50, J1 |
| **Fila de salida del hero (D51)** | ~~Variante A~~ **superseded por D52**: el quick-nav se elimina; el hero cierra con el ticker | D52, R11 |
| **Hero cierra con el ticker (D52)** | Se elimina el quick-nav del hero (y `quickNavLabel` de `content.ts`/`es.json`). El hero queda bloque principal `flex-1` centrado + ticker como último hijo. Enlaces de sección solo en el header | D52, R36, R11 |


## Copy

- **NO existe copy oficial** — es parte de lo que se compite (D7-D9). Redacción en
  `specs/11-contenido.md` siguiendo el brief: tuteo, frases cortas, cero palabras de folleto,
  hablar de la persona no de nosotros (D21 en DECISIONES).
- **Prohibido copiar el ejemplo orientativo del brief** ("penaliza en el criterio de contenido", D248).
- **Prohibido inventar**: cifras de miembros/empresas, garantías de empleo, plazos, "gratis" como titular (brief).
- Palabras clave semilla del propio material: "comunidad de desarrolladores", "empresas tech",
  "en español", "empleo tech", "torneos", "networking" (R38).
- Cada sección: encabezado con sustantivo real + párrafo específico; nada de relleno genérico
  ("El relleno se nota", D217).
- Estructura de textos: `messages/es.json` con keys por sección (R36); componentes Server sin
  strings literales.

## Assets

| Asset | Estado | Uso |
|---|---|---|
| Logo TechToJob (color/negro/blanco/SVG) | 🔴 **NO descargado** (Q2) | nav, hero, footer, OG, JSON-LD |
| Paleta #2f3436 / #84c0bf / #ffffff | ✅ fija (R24) | design tokens → `docs/design-system.md` |
| Sora (Google Fonts) | ✅ vía `next/font` (R58) | única fuente, ≤3 pesos (R59) |
| Ilustraciones/fotografía | A elegir: uso libre comercial (Unsplash, Pexels, unDraw, Lucide, Heroicons, Phosphor) + fuente en README (R09) | secciones, noticias, hero |
| Imagen OG 1200×630 | A construir con logo+paleta (R51) | `opengraph-image` |

## Restricciones de diseño (del brief del torneo)

- Los 3 colores base deben **dominar**; grises intermedios y UN acento como apoyo (R25).
- Verde #84c0bf **nunca como texto pequeño sobre blanco** (R26) → usar sobre #2f3436 o como fondo
  de botones con texto oscuro/blanco según contraste AA.
- Mobile-first real (J3, 15%): se verificará en 360/768/1024/1440 con capturas de evidencia.
- Animaciones permitidas si no estorban (R34) → respetar `prefers-reduced-motion` (criterio J6).

## Criterio de conversión

Un solo objetivo medible por página: clic al Discord. El botón del hero y el del cierre apuntan
al mismo enlace con texto descriptivo (R44), p. ej. "Entrar al Discord de TechToJob" — nunca
"click aquí".
