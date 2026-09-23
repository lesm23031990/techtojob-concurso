# 00 · Checklist de reglas — Torneo #2 TechToJob

> Fuente: `material-concurso/discord.txt` (D) + `material-concurso/capturas/1-17.png` (C).
> Tipos: **OBL** obligatoria · **EVAL** evaluable (suma en rúbrica) · **NEG** negativa (prohibida) · **META** requisito del entregable.
> Estados: pendiente / cumplida / en riesgo / violada / n-a.
> ⚠️ **FECHA DE ENTREGA: miércoles 23/09/2026 23:59** ("Nada del 24 en adelante", D207). Revisión 24, ganador 25 (D241).
> **Cierre real por huso horario (D72):** México jue 24 · 00:00 · Colombia/Perú/Ecuador · 01:00 ·
> Venezuela/Bolivia · 02:00 · Argentina/Uruguay/Chile · 03:00 · Canarias · 07:00 · España peninsular · 08:00.
> Se cierra cuando es medianoche en México, que es el último. (Entregas tardías: solo con justificación.)

## A. Entregables (META)

| # | Regla (cita) | Tipo | Fuente | Estado |
|---|---|---|---|---|
| R01 | "Repo público en GitHub con README" | META | D202 | pendiente — mañana: repo público GitHub |
| R02 | "Enlace a la web desplegada (Cloudflare Pages o Vercel, las dos gratis)" | META | D203 | pendiente — mañana: deploy + URL real en site.url |
| R03 | "Capturas de escritorio y móvil" | META | D204 | pendiente — capturas sobre el deploy mañana |
| R04 | "Captura de Lighthouse" (modo móvil, adjunta la captura) | META | D205, D190 | pendiente — Lighthouse final sobre el deploy (control local: SEO 100, A11y 100, Perf 76) |
| R05 | "Todo en 📦│ENTREGAS antes del miércoles 23 a las 23:59" | META | D207 | en riesgo — queda 1 día para ENTREGAS |
| R06 | "Si vais dos [pareja], decidlo al entregar" | META | D209 | n-a (participación solitaria) |
| R07 | Uso de IA: "Solo pedimos que lo digas al entregar" | META | D102 | cumplida en README (§Declaración de uso de IA); repetir en el mensaje de ENTREGAS |
| R08 | "Tienes que entender y poder defender lo que entregas" | OBL | D102-103 | pendiente (humana: repasar specs/11 + design-system antes de defender) |
| R09 | Imágenes/iconos: "Fuente apuntada en el README" | META | D77 | cumplida — README §Fuentes y créditos |
| R10 | Si se reordena secciones: "hazlo y cuéntalo en el README" | META | D32, D38 | cumplida — **reorden declarado en README** (§QuAc contiene la landing): hero → cómo funciona → torneos → talento → empresas → networking → testimonios → noticias → newsletter → cierre, según `app/app/[locale]/page.tsx` |

## B. Secciones obligatorias de la landing

| # | Regla (cita) | Tipo | Fuente | Estado |
|---|---|---|---|---|
| R11 | Hero: "Qué es TechToJob y por qué no es un portal de empleo más. Un solo botón: entrar al Discord" | OBL | D20 | cumplida (audit 22/09) |
| R12 | Cómo funciona: "El recorrido desde que llegas hasta que sale una oportunidad" | OBL | D23 | cumplida (audit 22/09) |
| R13 | Ofrécete como talento: "Publicar tu perfil: stack, nivel, disponibilidad" | OBL | D26 | cumplida (audit 22/09) — desde D75 vive en el bloque izquierdo de la seccion split "Audiencias" (`#talento`), con H3 propio y CTA "Crear perfil de talento" |
| R14 | Publica como empresa: "publicas lo que buscas y accedes a perfiles" | OBL | D29 | cumplida (audit 22/09) — desde D75 vive en el bloque derecho de "Audiencias" (celda `id="empresas"`), con H3 propio y CTA "Buscar talento real" |
| R15 | Torneos: "Competiciones abiertas como esta" | OBL | D32 | cumplida (audit 22/09) |
| R16 | Networking: "Canales por área y gente del sector" | OBL | D35, D81 | cumplida (audit 22/09) — **D81 (23/09)** recompone la sección en 3 bloques; la cita sigue cubierta por `networking.channels.label` + `networking.intro` (`es.json`). Re-auditar con QA |
| R17 | Testimonios: 4-5 tarjetas con nombre y frase; "deja sitio" para foto y enlace a perfil (LinkedIn) en versión final | OBL | D38 | cumplida — **D89/D90/D91:** marquee CSS puro sobre `mist`; 4 tarjetas con avatar (hueco de foto, iniciales honestas), nombre, rol y frase + slot LinkedIn deshabilitado (R43), con **contenido de relleno declarado (Lorem ipsum)** — el brief lo declara "de relleno", no se inventan personas verosímiles. El track visual repetido va `aria-hidden` y el contenido se sirve en una lista `sr-only` que incluye la nota del slot LinkedIn |
| R18 | Noticias: "Maqueta tres entradas de ejemplo" | OBL | D41 | cumplida (audit 22/09) |
| R19 | Newsletter: formulario; "Va mejor en una franja antes del footer que arriba" | OBL | D44 | cumplida (audit 22/09) — **D89:** la banda de Testimonios usa el tinte pálido `brand-soft`, no una franja verde maciza; Newsletter sigue siendo la única franja `brand` del sitio (D44, R26) |
| R20 | Cierre: "Último empujón antes del footer" | OBL | D47 | cumplida (audit 22/09) |
| R21 | Footer: "Enlaces por bloques, redes y legal" | OBL | D50 | cumplida (audit 22/09) |
| R22 | "El orden es orientativo menos el hero y el footer" | OBL | D54 | **en riesgo** - reordenada 22/09 (D32) para narrar como linea de tiempo (Torneos del #5 al #3); hero primero y footer ultimo intactos; declaracion R10 pendiente en el README; RE-AUDITAR al reactivar QA |
| R23 | Objetivo general: "explicar qué somos, a quién le sirve y conseguir que la gente entre al Discord" | EVAL | D3 | cumplida (audit 22/09) |

## C. Identidad de marca

| # | Regla (cita) | Tipo | Fuente | Estado |
|---|---|---|---|---|
| R24 | "Los tres colores y la tipografía son fijos y tienen que dominar el diseño" (#2f3436, #84c0bf, #ffffff + Sora) | OBL | D60-66 | cumplida — **D85/D90:** `--color-brand-soft` (#dcefee) es un tinte del verde de marca (mismo hue) documentado en el design-system; no introduce un color nuevo. Los tres base siguen dominando |
| R25 | Permitidos: "grises intermedios para textos y bordes, y un color de acento… como apoyo y sin sustituir a los base" | OBL | D66 | cumplida (audit 22/09) |
| R26 | "el verde sobre blanco no llega al mínimo para texto pequeño. Úsalo en fondos, botones y detalles, no en párrafos" | OBL | D68 | cumplida (audit 22/09) |
| R27 | Logo: "todas sus versiones (color, negro, blanco y SVG)" del canal 🎨 RECURSOS | OBL | D58 | cumplida — kit oficial en app/public/brand/ (nombres ASCII) |
| R28 | Tipografía Sora fija (Google Fonts) | OBL | D64 | cumplida (audit 22/09) |

## D. Stack y requisitos técnicos

| # | Regla (cita) | Tipo | Fuente | Estado |
|---|---|---|---|---|
| R29 | "Recomendado: Next.js con TypeScript y Tailwind" (también vale HTML+CSS+JS+Tailwind; misma rúbrica) | OBL | D84-87 | cumplida — decisión Next.js (D-13) |
| R30 | "Tailwind obligatorio en las dos vías" | OBL | D92 | cumplida (audit 22/09) |
| R31 | "Responsive real en móvil, tablet y escritorio" | OBL/EVAL 15% | D93, D219 | cumplida (audit 22/09) |
| R32 | "HTML semántico" | OBL/EVAL 15% | D94, D221 | cumplida (audit 22/09) |
| R33 | "Nada de plantillas compradas ni kits de componentes ya montados" | NEG | D95 | cumplida (audit 22/09) |
| R34 | "Animaciones libres, pero que no estorben" | OBL | D96 | cumplida — **D89:** el marquee de Testimonios corre ≥180s (transform only, CLS 0) con pausa por `hover`/`focus-within`, control CSS-only y el guard `prefers-reduced-motion` que lo estaciona |
| R35 | "Variables, funciones, componentes y commits, todo en inglés" (actualización 09/09) | OBL | D261-263 | cumplida — fixes 22/09: commits reworded a inglés (D22) + claves-identificador a inglés (D23) |
| R36 | "los textos agrupados en un archivo aparte, nunca incrustados por todo el código" → Next: `messages/es.json` | OBL | D269-272 | cumplida (audit 22/09) |
| R37 | OPCIONAL bilingüe: next-intl, `app/[locale]/`, `generateStaticParams` → ['es','en'], hreflang cruzado, lang correcto, selector "que sea un enlace de verdad, no JS" | EVAL (suma en SEO) | D281-289 | infraestructura cumplida (D54, commit `1d4cdd0`); **traducción EN aplazada (D57)** con handoff listo en `specs/12-i18n.md`; supersede el "n-a por plazo" de D-14 |

## E. SEO (contenido y estructura)

| # | Regla (cita) | Tipo | Fuente | Estado |
|---|---|---|---|---|
| R38 | Contenido que posicione: ✅ "Comunidad de desarrolladores y empresas tech en español" / ❌ "Conectamos talento con oportunidades" | EVAL | D119-120 | cumplida (audit 22/09) |
| R39 | "que sea texto de verdad, no metido dentro de una imagen" | OBL | D122 | cumplida (audit 22/09) |
| R40 | "Un solo <h1> en toda la página, y que lleve el mensaje principal" | OBL | D127 | cumplida (audit 22/09) |
| R41 | "Jerarquía de h2 y h3 sin saltos" | OBL | D128 | cumplida (audit 22/09) |
| R42 | "Usa header, nav, main, section, article, footer, button y a donde corresponda" | OBL | D129 | cumplida (audit 22/09) |
| R43 | "un div con onClick no es un enlace. Si navega, es <a> o <Link>" | NEG | D133 | cumplida (audit 22/09) |
| R44 | Enlaces con "Texto descriptivo siempre" (❌ "haz clic aquí" · "leer más") | OBL | D139-142 | cumplida (audit 22/09) |
| R45 | "URLs… con nombres que se entiendan: /ofertas, no /page2" (anclas legibles) | OBL | D144 | cumplida — **D90:** `#newsletter` añadido a la barra de escritorio (tier `xl`), además del panel móvil y el footer |

## F. SEO (metadata, imágenes, fuentes)

| # | Regla (cita) | Tipo | Fuente | Estado |
|---|---|---|---|---|
| R46 | `lang="es"` | OBL | D147 | cumplida (audit 22/09) |
| R47 | "<title> de 50 a 60 caracteres" | OBL | D148 | cumplida (audit 22/09) |
| R48 | "description de 150 a 160" | OBL | D149 | cumplida (audit 22/09) |
| R49 | "canonical y viewport" | OBL | D150 | cumplida (audit 22/09) |
| R50 | Next: "Metadata API con title.template (%s \| TechToJob) y metadataBase en el layout" | OBL | D152 | cumplida (audit 22/09) |
| R51 | "Open Graph y Twitter Card completos, con imagen de 1200×630… Compruébalo en opengraph.xyz" | OBL | D154 | cumplida (audit 22/09) |
| R52 | "JSON-LD de tipo Organization con nombre, logo, URL y redes" | OBL | D156 | cumplida (audit 22/09) |
| R53 | Imágenes "WebP o AVIF, nunca un PNG de dos megas" | OBL | D161 | cumplida (audit 22/09) |
| R54 | "next/image si vas con Next" | OBL | D162 | cumplida (audit 22/09) |
| R55 | "width y height siempre puestos" | OBL | D163 | cumplida (audit 22/09) |
| R56 | "loading='lazy' en todo lo que esté por debajo del primer pantallazo, nunca en la imagen del hero" | OBL | D164 | cumplida — fix loading=lazy en Tournaments 22/09 |
| R57 | "alt descriptivo de verdad" (❌ genérico, ❌ keyword-stuffing = "spam y penaliza") | OBL | D166-170 | cumplida (audit 22/09) |
| R58 | "Sora con next/font" | OBL | D176 | cumplida (audit 22/09) |
| R59 | "Una fuente y tres pesos. No ocho variantes" | OBL | D178 | cumplida (audit 22/09) |
| R60 | "No escondas texto lleno de keywords con hidden, opacity-0 o tamaño cero" | NEG | D184 | cumplida (audit 22/09) |
| R61 | Lighthouse móvil: "SEO en 100 / Accesibilidad y rendimiento por encima de 90" | META/EVAL | D192-193 | pendiente — medir sobre el deploy; gate interno AGENTS.md ≥95/95/95 |

## G. Rúbrica (pesos oficiales)

| # | Criterio | Peso | Fuente |
|---|---|---|---|
| J1 | Diseño y jerarquía visual ("Uso del logo y la paleta") | 25% | D215 |
| J2 | Contenido y mensaje ("copiar el ejemplo orientativo penaliza") | 25% | D217 |
| J3 | Responsive ("Se prueba en móvil real, no solo en el inspector") | 15% | D219 |
| J4 | Código y estructura (incluye organización de textos i18n, D295) | 15% | D221 |
| J5 | SEO (incluye hreflang/lang si bilingüe, D295) | 10% | D223 |
| J6 | Accesibilidad y rendimiento ("Contraste, textos alternativos, navegación con teclado, etiquetas en el formulario, imágenes optimizadas") | 10% | D225 |
| J7 | "Si hay empate, decide el criterio de diseño" | — | D227 |

## Preguntas abiertas (actualizadas 22/09 tarde)

| # | Pregunta | Estado |
|---|---|---|
| Q1 | Contenido de `brief-techtojob.md` | ✅ resuelto → `material-concurso/bases/brief.md` |
| Q2 | Archivos del logo | ✅ resuelto → `marca/TechToJob/` (SVG/PNG/PDF completos) |
| Q3 | Enlace de invitación al Discord | ✅ resuelto → oficial del brief `discord.gg/h9FFgKdkRd` (D18) |
| Q4 | URL de despliegue final | ⏳ se resuelve mañana al deploy Vercel (actualizar site.url + rebuild) |
| Q5 | Redes sociales | ✅ resuelto → LinkedIn/X/Instagram @techtojob (brief) |
| Q6 | Enlaces legales del footer | 🟡 maquetados con nota honesta (D19); confirmar en CHARLA |
| Q7 | Propiedad del código | 🟢 sin LICENSE (D5); bases no declaran cesión |
| Q8 | Newsletter sin backend | ✅ maqueta con validación cliente (D15) |

**Nota anti-alucinación:** todo lo anterior tracea a línea de `discord.txt` o captura. Los textos de la landing NO están en el material (a propósito: "Los textos los escribes tú", D7) → se escribirán siguiendo el brief (Q1) y nunca copiando el ejemplo orientativo (D248).
