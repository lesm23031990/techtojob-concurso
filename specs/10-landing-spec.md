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

Dos audiencias explícitas con sección propia cada una (reglas R13/R14):
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
| 2 | Cómo funciona | `#como-funciona` | Recorrido paso a paso: llegas → perfil → oportunidad (4 pasos). **Bento asimétrico (D38): 1 celda alta + 2 + 1 ancha, `<ol>` intacto** | R12 |
| 3 | **Torneos** (movida del #5) | `#torneos` | Competiciones abiertas como esta: la prueba de que la comunidad está viva | R15 |
| 4 | Ofrécete como talento | `#talento` | Publicar perfil: stack, nivel, disponibilidad | R13 |
| 5 | Publica como empresa | `#empresas` | Publicar búsqueda, acceder a perfiles | R14 |
| 6 | Networking | `#networking` | Canales por área, gente del sector | R16 |
| 7 | Testimonios | `#testimonios` | 4 tarjetas: nombre + frase (maqueta declarada); **diseño reserva sitio para foto + enlace a perfil LinkedIn** (slot de avatar circular + icono/link deshabilitado visualmente listo para datos reales). **Bento 7/5/5/7 (D38)** | R17 |
| 8 | Noticias | `#noticias` | 3 entradas de ejemplo (fecha, título, resumen, link descriptivo). **Bento 1 destacada alta + 2 (D38)** | R18 |
| 9 | Newsletter | `#newsletter` | Formulario email con label visible, validación HTML5 + feedback; franja antes del footer | R19 |
| 10 | Cierre | `#unete` | Último empujón: repetir CTA Discord (nodo "meta" del raíl) | R20 |
| 11 | Footer | — | Enlaces por bloques (secciones, comunidad, legal), redes (Q5), copyright | R21 |

## Línea de tiempo vertical (estructura compartida, D32)

La página se recorre como una línea de tiempo continua, con el Hero como **puerta** y el Cierre
como **meta**. Orden narrativo de arriba. Especificación:

| Elemento | Spec | Regla/nota |
|---|---|---|
| **Raíl** | Línea continua en el borde izquierdo del `page-container`. **Cada sección dibuja su propio segmento a altura completa** (`inset-y-0`) y los segmentos contiguos forman una sola línea: sin cálculo entre secciones | Decorativo → `aria-hidden` + `pointer-events-none` (R34: no estorba; no es interactivo) |
| **Relleno animado** | Sobre el segmento, relleno `brand` con `scaleY` 0→1 vía `animation-timeline: view()` (CSS puro, cero JS) | Sin soporte de scroll-driven animations → **línea dibujada completa** (nunca invisible) |
| **Nodo** | Círculo de 28px centrado en el raíl, alineado con el `h2` de la sección (`top-20 lg:top-32`, que es el padding de la sección). Contiene el numeral del paso (aria-hidden). Se activa al entrar en vista | **Sin etiqueta de texto**: el rótulo del paso ES el `h2` de la sección → no se duplica contenido (R36/SEO) |
| **Variantes de nodo** | `step` (secciones) y `goal` (Cierre: círculo de 40px relleno `brand`). El hero **no lleva raíl** ni nodo: es la puerta y el viaje arranca en el paso 1 | — |
| **Tones** | Claro: raíl `line` + relleno `brand` + nodo `border-brand`/`bg-paper`/`text-ink`. `ink`: raíl `white/12` + relleno/nodo `brand`. Franja `brand` (newsletter): raíl `ink/20`, relleno y nodo `ink` | Todas las combinaciones se mantienen dentro de la paleta fija (R24/R25) |
| **Sub-timeline** | ~~En "Cómo funciona" el raíl se abre en un timeline central alternado.~~ **Sustituido por D38:** "Cómo funciona" no abre sub-timeline: el raíl cruza la sección igual que el resto y los 4 pasos se disponen en **bento asimétrico** (ver §Bento). Se conserva el `<ol>` con la secuencia real | R12; sin copy nuevo (R36) |
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
| **Lenguaje de celda** | Borde hairline 1px, **esquinas rectas** (continuidad editorial con el CTA `rounded-none` de D36), sin sombra. En sección `paper`: celda transparente `border-line`. En sección `mist`: celda `bg-paper border-line` | R24/R25 (paleta fija); sustituye `--radius-card`+`shadow-card` SOLO en estas dos secciones |
| **Numeración de índice** | Las celdas de "Cómo funciona" muestran un numeral sobredimensionado (posición en el `<ol>`), decorativo (`aria-hidden`, tinta fantasma `ink/15` — R26 prohíbe el verde como texto sobre `paper`). En Testimonios el marcador es la comilla editorial y en Noticias la fila fecha+chip: no se añade numeral para no duplicar información | R34; no duplica contenido |
| **Grid** | 12 columnas desde `lg`; móvil/tablet: una columna apilada en orden DOM. "Cómo funciona": 7 (row-span 2) + 5 + 5 + 12. Testimonios: 7/5/5/7. Noticias: 7 (row-span 2) + 5 + 5 | R38; verificar 360/768/1024/1440 |
| **Hero ticker** | Marquee CSS puro bajo el hero (`border-t` hairline, `text-label` uppercase `cloud`, separador `brand`), con tokens reales ya publicados (stacks de `hero.meta`, "Torneo #2", "Comunidad técnica en español"). Track duplicado para bucle continuo. `aria-hidden` (duplica `hero.meta`) y **no interactivo** | R11 (no es CTA), R36 (strings en `es.json` como `hero.ticker`, derivados), R34 |
| **`.marquee`** | `transform: translateX(0 → −50%)` lineal, ≥30s, `infinite`; `reduced-motion` lo detiene en reposo | D37.2 (CSS puro, cero islas) |
| **`.bento-index`** | `animation-timeline: view()`; escala/opacidad del numeral al entrar en vista, en un `<span>` interno para no pelear con el posicionamiento | D37.2; fallback: numeral visible |
| **Reveal de celda** | Se reutiliza `.reveal` (ya existente en `globals.css`) en cada celda | R34 |

> **Fuera de alcance:** Talento / Empresas / Networking quedan editoriales (no tienen ítems).


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

### Ajustes D42–D50

| Ajuste | Spec | Regla/nota |
|---|---|---|
| **Soporte del hero** | `hero.support` y el `div` del CTA ganan `lg:col-span-5`: ya no caen en 1/12 y no se parten en 6 líneas | D42, R38 |
| **Botones cuadrados** | Todas las píldoras → `rounded-none`: `DiscordCta` (sin anillo `animate-breathe`, eliminado del CSS), header completo (logo, enlaces, hamburguesa, panel móvil) y botón del newsletter + skip-link | D42, R24, D36 |
| **Header más ancho** | El header usa `page-container-wide` (`--container-page-wide: 80rem`); el resto de la página sigue en 72rem | D43, R38 |
| **Marca de agua del hero** | `logo-symbol-gradient.svg` al 10% abajo-derecha, **520×520** (D45); reemplaza la red retirada | D43/D45, R39 |
| **Grid vivo** | El grid del hero se mueve: paneo por scroll (capa externa `.hero-field`) + **drift continuo** de una celda (4rem X/Y) en 28s (capa interna `.hero-field-drift`, sobredimensionada `-inset-16`). Loop sin costura; solo `transform` | D44, D37, R34 |
| **Nav sin recuadro** | El `<ul>` del nav de escritorio pierde borde/fondo/padding (queda `flex items-center gap-1`); enlaces con hover subrayado. El panel del menú móvil se conserva | D45, R42 |
| **CTA Discord único (D46)** | Un solo estilo en TODO el sitio: cuadrado relleno `brand`, texto `ink` (6.77:1), barrido especular + micro-elevación, flecha. Solo cambia el tamaño (`nav` compacto / `hero` prominente / `block` full-width). Se **retira la variante `line`** (hairline) y el hero pasa a `size="hero"`. Focus ring `ink` en el panel móvil sobre `paper` (R26) | D46, R11, R26, R34 |
| **Header adaptativo (D47)** | Barra **sólida** que adopta la polaridad de la sección de detrás (`data-header-surface` en `<html>` vía la isla `HeaderSurface`); disolución en una franja de gradiente **debajo** de la barra; logo compuesto en oscuro / `logo-horizontal.svg` en claro; bloque `brand` de la newsletter tratado como `dark`; en claro, CTA con borde `ink` (WCAG 1.4.11) | D47, R24/R25, R26, R34 |
| **H1 y copy (D48)** | Espacios reales entre palabras del `<h1>` (bug de a11y/SEO); `lg:col-span-8`; línea 2 → *"Aquí te conocen antes de la vacante."* + `meta.og.headline`/`ogImageAlt` sincronizados | D48, R39/R40 |
| **Header eje + nav vivo (D49)** | Header vuelve al eje `page-container` (72rem) como el contenido; **scrollspy** (`aria-current="location"`, activo `brand` en oscuro / `ink`+subrayado `brand` en claro por R26); **hairline de progreso** `.header-progress` (`scaleX`, `animation-timeline: scroll(root)`, CSS puro) | D49, R42, R45, R34 |
| **Ritmo vertical del hero (D50)** | `pt − pb = 80px` (altura del header, `-mt-20`) para centrar el bloque en el área visible: `pt-36 pb-16` / `lg:pt-40 lg:pb-20`; `support → quick-nav` pasa a `mt-10` en móvil (ritmo consistente) | D50, J1 |


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
