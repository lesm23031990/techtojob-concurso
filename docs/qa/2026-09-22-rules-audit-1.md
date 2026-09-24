# Auditoría de reglas — Pasada 1 (completa) — 2026-09-22

**Auditor:** `rules-auditor` (hostil, literal). **Fuente de verdad:** `specs/00-checklist-reglas.md` (R01–R61) + rúbrica J1–J7.
**Objeto:** `app/` (Next 16.3.5 + TS strict + Tailwind v4), HTML generado de `next build` (`app/.next/server/app/index.html`), servidor local en `:3199` para OG/robots/sitemap, `git log`, `git ls-files`, greps sobre árbol versionado.

**Comandos de verificación ejecutados:** `npm run build` ✓ · `npx tsc --noEmit` ✓ (strict:true, `app/tsconfig.json:7`) · `npm run lint` ✓ (0 errores) · contados de `<h1/2/3>` y longitudes title/description sobre el HTML renderizado · fetch HTTP de `/opengraph-image` (PNG 1200×630, 62.6 KB), `/robots.txt`, `/sitemap.xml` · `git grep` de invites, strings prohibidos, `onClick`, secretos · `git ls-files | grep material-concurso` → **0**.

## Veredicto global

| | |
|---|---|
| **VIOLADAS (bloquean entrega)** | **2** — R35, R56 |
| EN RIESGO | 3 — R05, R07, R31 |
| PENDIENTE (meta de fase final) | 6 — R01, R02, R03, R04, R08, R61 |
| N-A | 3 — R06, R10, R37 |
| CUMPLIDA | 47 |

**Regla de descarte (extra no requerido):** nothing structural detectado fuera de reglas salvo `brand-deep` (shade de hover, documentada como mismo tono — aceptable) y `opencode.json`/`.opencode/`+`AGENTS.md`+`GUIA.md` publicados en el repo: no violan ninguna base, pero el jurado las leerá (ver §Criterio propio).

---

## Tabla regla → estado → evidencia → acción

### A. Entregables (META)

| # | Regla (cita) | Estado | Evidencia | Acción correctiva |
|---|---|---|---|---|
| R01 | "Repo público en GitHub con README" | **PENDIENTE** | `git remote -v` → vacío. README raíz existe (`README.md:1-33`) pero **obsoleto**: dice "FASE 1 completada" (línea 6) y "Cómo correr en local (cuando exista `app/`)" (línea 9) cuando `app/` ya existe y compila. | Crear repo público + reescribir README raíz HOY (deploy, capturas, declaración IA, fuentes, orden de secciones). |
| R02 | "Enlace a la web desplegada (Cloudflare Pages o Vercel…)" | **PENDIENTE** | Sin deploy. Además `app/content.ts:172` fija `url: "un dominio placeholder ajeno"` como placeholder: si el dominio real de Vercel difiere, canonical/OG/sitemap/JSON-LD quedan mal. | Al desplegar: actualizar `site.url` (o `NEXT_PUBLIC_SITE_URL`) y re-build antes de publicar el enlace. |
| R03 | "Capturas de escritorio y móvil" | pendiente-fase-final | `docs/qa/` solo contiene `.gitkeep` y `server.log`. | Playwright 360/768/1024/1440 + desktop, a `docs/qa/`. |
| R04 | "Captura de Lighthouse" (móvil) | pendiente-fase-final | Sin evidencia en `docs/qa/`. | Ejecutar Lighthouse sobre el deploy, adjuntar captura. |
| R05 | "Todo en 📦│ENTREGAS antes del miércoles 23 a las 23:59" | **EN RIESGO** | Queda **1 día**; faltan repo público (R01), deploy (R02), capturas (R03/R04) y hay 2 violaciones abiertas. | Cronograma hoy: fixes R35/R56 → push → deploy → evidencia → ENTREGAS. |
| R06 | "Si vais dos, decidlo al entregar" | N-A | Participación solitaria (D13 en `docs/DECISIONES.md:66`). | — |
| R07 | IA: "Solo pedimos que lo digas al entregar" | **EN RIESGO** | Declarado solo en `app/README.md:39-40`; el README raíz (el que se lee primero) NO declara nada, y la entrega en Discord aún no existe. | Mover/duplicar la declaración al README raíz y al mensaje de ENTREGAS. |
| R08 | "Entender y poder defender lo que entregas" | pendiente | Humano (Lorena). | Repasar `docs/design-system.md` + `specs/11` antes de entregar. |
| R09 | "Fuente apuntada en el README" | **CUMPLIDA** | `app/README.md:30-40`: logos kit oficial, Sora Google Fonts, iconos Lucide-ISC inline, copy original. | Asegurar que esta sección migre al README raíz (relacionado R01). |
| R10 | "Si reordenas secciones, cuéntalo" | N-A | Orden = spec sin cambios (`app/app/page.tsx:13-17`). | — |

### B. Secciones obligatorias

| # | Regla (cita) | Estado | Evidencia |
|---|---|---|---|
| R11 | Hero: "Un solo botón: entrar al Discord" | **CUMPLIDA** | `Hero.tsx:39-41`: un único `<DiscordCta>`; grep: ningún otro botón/enlace dentro de la sección `#inicio`. H1 real texto (`Hero.tsx:30-35`). |
| R12 | Cómo funciona: "el recorrido" | **CUMPLIDA** | `HowItWorks.tsx:22-42` 4 pasos `<ol>` + cierre. |
| R13 | Talento: "stack, nivel, disponibilidad" | **CUMPLIDA** | `es.json:72` (stack/nivel) + `es.json:56` "Tu stack, tu nivel, tu disponibilidad." |
| R14 | Empresas: "publicas lo que buscas y accedes a perfiles" | **CUMPLIDA** | `es.json:77`. |
| R15 | Torneos: "Competiciones abiertas como esta" | **CUMPLIDA** | `es.json:81` ("Esta misma web salió de uno"). |
| R16 | Networking: "Canales por área y gente del sector" | **CUMPLIDA** | `es.json:85`. |
| R17 | Testimonios 4-5 con hueco foto+LinkedIn | **CUMPLIDA** | `Testimonials.tsx`: 4 tarjetas; avatar placeholder (`:27-32`); slot LinkedIn presente pero NO falso-enlace (`:41-53`, `aria-disabled` + `tabindex=-1`); rótulo "Testimonios de muestra" visible (`:67-69`, texto `es.json:89`). |
| R18 | Noticias: "Maqueta tres entradas" | **CUMPLIDA** | `News.tsx:53-56` 3 `<article>`; nota maqueta visible `es.json:117` en `:50-52`. |
| R19 | Newsletter "franja antes del footer", no hero | **CUMPLIDA** | `page.tsx:29` sección 9 de 10, pre-footer; franja verde sólida (`Newsletter.tsx:12`); label visible (`NewsletterForm.tsx:25-30`); no hay formulario en hero. |
| R20 | Cierre: "último empujón" | **CUMPLIDA** | `Closing.tsx` (#unete) tras newsletter, antes del footer, con el CTA. |
| R21 | Footer "enlaces por bloques, redes y legal" | **CUMPLIDA** | `SiteFooter.tsx:6-11` 4 bloques (incl. Legal); `:82-97` redes; `:100-105` créditos + nota legal honesta (`es.json:200`). |
| R22 | "El orden es orientativo menos hero y footer" | **CUMPLIDA** | Hero primero (`page.tsx:21`), footer último (layout). |
| R23 | Objetivo: "que la gente entre al Discord" | **CUMPLIDA** | CTAs en header, hero, cierre, footer; noticias apuntan al Discord (`News.tsx:28`). |

### C. Identidad de marca

| # | Regla (cita) | Estado | Evidencia |
|---|---|---|---|
| R24 | 3 colores + Sora "tienen que dominar" | **CUMPLIDA** | `globals.css:11-13` tokens exactos #2f3436/#84c0bf/#ffffff; todo el color de la página sale de `@theme`. |
| R25 | Grises + "un color de acento… sin sustituir a los base" | **CUMPLIDA** | Grises `:19-24`; UN acento `--color-ember` (`:27`) usado solo en chip de categoría (`News.tsx:18`), texto ink sobre ember 6.12:1. |
| R26 | "verde sobre blanco… no en párrafos" | **CUMPLIDA** | `grep text-brand`: 4 usos → Tournaments h2 sobre **ink** (6.17:1 calculada), footer hover sobre ink, comillas decorativas `aria-hidden` tamaño display en tarjeta ("detalles" explícitamente permitido por D68). Ningún párrafo verde sobre blanco. Botones: `bg-brand text-ink` (`DiscordCta.tsx:34`) — nunca texto blanco sobre verde. |
| R27 | Logo: versiones del kit oficial | **CUMPLIDA** | `app/public/brand/` 6 SVG del kit (R27 ✅ recibido 22/09), renombrados ASCII. |
| R28 | Sora fija | **CUMPLIDA** | `layout.tsx:11-16`. |

### D. Stack y requisitos técnicos

| # | Regla (cita) | Estado | Evidencia / Acción |
|---|---|---|---|
| R29 | Next.js + TS + Tailwind | **CUMPLIDA** | `package.json:12-23`; build ✓, `tsc --noEmit` ✓ strict. |
| R30 | Tailwind obligatorio | **CUMPLIDA** | Tailwind v4 (`globals.css:1` `@import "tailwindcss"`); cero CSS a mano fuera de tokens/utilities. |
| R31 | "Responsive real móvil/tablet/desktop" | **EN RIESGO** | Mobile-first en código (breakpoints md/lg en todas las secciones), pero J3 dice "Se prueba en móvil real, no solo en el inspector" y **no hay evidencia** en `docs/qa/`. |
| R32 | HTML semántico | **CUMPLIDA** | HTML generado: header×1, nav×3, main×1, section×10, article×3, footer×1, button×1, ol, figure×4, blockquote×4, time×3. |
| R33 | "Nada de plantillas compradas ni kits de componentes" | **CUMPLIDA** | `package.json`: solo next/react/tailwind/typescript/eslint — cero UI kits, cero librerías de iconos; iconos SVG escritos a mano (`icons.tsx:1-9`). |
| R34 | "Animaciones libres, pero que no estorben" | **CUMPLIDA** | Reveal CSS scroll-driven con doble guard (`globals.css:124-132` `@supports`+`prefers-reduced-motion`) y kill-switch global (`:147-155`). |
| R35 | "Variables, funciones, componentes y commits, todo en inglés" | **VIOLADA** | (a) **Commits**: 4 mensajes en español en el historial público — `6b97570`, `ef4f961`, `06856d4`, `6cb301d` (`git log --oneline`). (b) **Identificadores**: claves de `es.json` usadas como variables en código: `comoFunciona`, `titulo`, `texto`, `nombre`, `frase`, `maquetaNota`, `bloques`, `enlaces`, `redes`, `creditos`, `legalNota`, `unete` (p. ej. `content.ts:60-147`, `HowItWorks.tsx:23` `step.titulo`). Las interfaces `Messages` espejo son código, no contenido. **Acción:** (a) reescribir mensajes con `git rebase -i`/`filter-branch` ANTES del primer push (el repo no tiene remote → no es force-push sobre historia pública; registrar en `docs/DECISIONES.md`); (b) renombrar claves de `es.json` + interfaces + accesos a inglés (`title`, `text`, `name`, `quote`, `howItWorks`, `blocks`, `links`, `social`, `legal`…). Los VALORES siguen en español (R36 no se toca). |
| R36 | "textos agrupados en un archivo aparte" | **CUMPLIDA** | Todo el texto visible en `messages/es.json`; grep de literales con acentos en `.tsx/.ts/.css`: solo 3 **comentarios** que citan títulos de sección (`HowItWorks.tsx:5`, `Talent.tsx:5`, `SiteHeader.tsx:38`) — no son strings de UI. Ver nota §opinión-comentarios. |
| R37 | OPCIONAL bilingüe | N-A | Decisión D-14 (NO por plazo), documentada. Pierde oportunidad de suma en J5; es elección registrada. |

### E/F. SEO

| # | Regla (cita) | Estado | Evidencia (medida sobre el HTML generado, no sobre el fuente) |
|---|---|---|---|
| R38 | Frase que posiciona | **CUMPLIDA** | Title y description contienen "Comunidad de desarrolladores y empresas tech en español" (`index.html` `<title>`/meta); la ❌ "Conectamos talento…" no aparece. |
| R39 | "texto de verdad, no dentro de una imagen" | **CUMPLIDA** | H1/h2/h3 y copies son nodos de texto; las únicas imágenes son logos/marcas de agua decorativas. |
| R40 | "Un solo <h1>" | **CUMPLIDA** | `index.html`: **h1×1** (hero), h2×14, h3×7 — verificado por regex sobre el HTML, coincide con el reporte del builder. |
| R41 | "Jerarquía sin saltos" | **CUMPLIDA** | Secuencia de niveles en el HTML: `1 2 3 3 3 3 2 2 2 2 2 2 3 3 3 2 2 2 2 2 2 2` — ningún salto. |
| R42 | header/nav/main/section/article/footer/button/a | **CUMPLIDA** | Ver R32 + `<a>` reales en todos los enlaces. |
| R43 | "div con onClick no es un enlace" | **CUMPLIDA** | `git grep onClick` → 0. Navegación solo con `<a>`/`<Link>`. El slot LinkedIn no navega y está marcado `aria-disabled` (`Testimonials.tsx:41-44`). Menú móvil = `<details>` nativo, sin JS. |
| R44 | "Texto descriptivo siempre" | **CUMPLIDA** | Inventariado de hrefs del HTML: textos "Cómo funciona", "Entrar al Discord de TechToJob", "Leer la guía", "TechToJob en LinkedIn"… Ningún "aquí/más/info". |
| R45 | "nombres que se entienden" | **CUMPLIDA** | Anclas `#como-funciona #talento #empresas #torneos #networking #testimonios #noticias #newsletter #unete #legal-nota` (`content.ts:182-193`). |
| R46 | `lang="es"` | **CUMPLIDA** | `<html lang="es" …>` en el HTML generado. |
| R47 | "<title> de 50 a 60" | **CUMPLIDA** | Title renderizado = **56 caracteres** (contado sobre `index.html`). |
| R48 | "description de 150 a 160" | **CUMPLIDA** | Meta description renderizada = **155 caracteres**. |
| R49 | "canonical y viewport" | **CUMPLIDA** | `<link rel="canonical">` + `name="viewport" width=device-width, initial-scale=1` en el HTML. |
| R50 | title.template + metadataBase | **CUMPLIDA** | `layout.tsx:22-25` (`template: "%s \| TechToJob"`, `metadataBase`). Ojo: metadataBase apunta al placeholder → ver R02. |
| R51 | "OG y Twitter Card completos, imagen 1200×630" | **CUMPLIDA** | 11 tags `og:*` (incl. image:width/height/alt/type) + 4 `twitter:*` con `summary_large_image`. `/opengraph-image` servido por `next start`: **HTTP 200, image/png, 1200×630, 62.6 KB**. Pendiente solo el check externo opengraph.xyz (requiere deploy). |
| R52 | "JSON-LD Organization con nombre, logo, URL y redes" | **CUMPLIDA** | Script ld+json en el HTML con `name/url/logo/sameAs` (3 redes). **CTAs:** `git grep discord.gg` sobre árbol versionado → en código y HTML SOLO `https://discord.gg/h9FFgKdkRd`; el invite alternativo no oficial NO aparece en ningún CTA, PERO sí constaba en texto de `docs/DECISIONES.md` — redactado antes del push (D25). |
| R53 | "WebP o AVIF, nunca un PNG de dos megas" | **CUMPLIDA** | Sin raster en el sitio: logos SVG + OG PNG de 62 KB generado. |
| R54 | "next/image" | **CUMPLIDA** | Los 6 `<img>` del HTML llevan `data-nimg="1"`; único `<img>` crudo es el JSX de satori (`opengraph-image.tsx:1-3`, con eslint-disable justificado — nunca llega a navegador). |
| R55 | "width y height siempre" | **CUMPLIDA** | Todos los `<img>` del HTML con width+height. |
| R56 | "lazy bajo el primer pantallazo, nunca en el hero" | **VIOLADA** | `Tournaments.tsx:22`: marca de agua **debajo del fold** con `loading="eager"`. El resto cumple: hero eager ✓ (`Hero.tsx:26`), Closing y footer lazy ✓. **Acción:** cambiar a `loading="lazy"` en `Tournaments.tsx:22` (1 línea). |
| R57 | "alt descriptivo de verdad" | **CUMPLIDA** | Decorativas con `alt=""` + `aria-hidden` (correcto: no fingir descripciones); logo del header dentro de enlace con `aria-label` (`SiteHeader.tsx:35`); `og:image:alt` descriptivo sin stuffing. |
| R58 | "Sora con next/font" | **CUMPLIDA** | `layout.tsx:2,11`. |
| R59 | "Una fuente y tres pesos. No ocho variantes" | **CUMPLIDA** | `weight: ["400","600","700"]` (`layout.tsx:13`); TTF locales para OG son exactamente esos 3 pesos. |
| R60 | "No escondas texto lleno de keywords" | **CUMPLIDA** | `sr-only` solo en ayudas reales (skip-link, hint "pestaña nueva", etiquetas de menú); grep de `opacity-0|display:none|visibility:hidden` en HTML → 0. |
| R61 | "Lighthouse móvil: SEO 100 / Accesibilidad y rendimiento >90" | **PENDIENTE** | Sin evidencia en `docs/qa/`. El gate interno de AGENTS.md (≥95/95/95) es más estricto que la base: aplicar el de AGENTS.md al medir. |

### G. Rúbrica — lectura de jurado (no son reglas, son puntos)

| # | Peso | Lectura hostil |
|---|---|---|
| J1 | 25% | Sólida: paleta fija respetada, logo oficial presente, jerarquía visual con un solo acento. Riesgo bajo. |
| J2 | 25% | Copy original trazado a brief; "copiar el ejemplo orientativo penaliza" — `specs/11` declara no copiado, pero conviene **comparación literal final** contra el ejemplo del brief antes de entregar. |
| J3 | 15% | **Sin evidencia de prueba en móvil real** (ver R31). El jurado lo prueba en dispositivo. |
| J4 | 15% | Aquí duele R35: commits y claves en español son exactamente "código y estructura". También `package.json:2` `"name": "app"`. |
| J5 | 10% | Técnico impecable sobre el HTML (R46-R52), pero todo depende del deploy con URL real (R02). |
| J6 | 10% | Buen diseño a11y en código (focus rings ≥44px, labels, status region, skip-link), pero **cero evidencia documentada** (axe/Lighthouse) — J6 se puntúa con lo que se puede verificar. |
| J7 | — | El desempate es diseño: el cierre visual hero/cierre espejo ayuda. |

---

## Opinión solicitada: comentarios en español (punto 4 del encargo)

La regla textual es "Variables, funciones, componentes y commits, todo en inglés" (D261-263). **Los comentarios no están enumerados.** Los 3 comentarios con citas en español (`HowItWorks.tsx:5`, `Talent.tsx:5`, `SiteHeader.tsx:38`) citan el contenido que describen y NO violan la letra de la regla. Veredicto: cum-plida para comentarios; **la violación real de R35 son los commits y las claves-identificador**, que sí están en la lista literal.

## Datos prohibidos del brief (punto 17)

Grep sobre árbol versionado: sin cifras de miembros/empresas (regex `[0-9]{3,} (desarrolladores|empresas|miembros|usuarios)` → 0), sin "garantizad*", sin "30 días". "gratis" aparece solo en docs internos del proyecto (specs/decisiones), nunca en H1/H2 ni copy visible; el tranquilizador usa "no te cuesta nada" (`es.json:44,72`), patrón que `specs/11-contenido.md:6` ya valida contra el brief. **CUMPLIDA.**

## Higiene del repo

- Commits: granulares y convencionales desde `3b3a3e9` (scaffold → secciones → metadata) ✓; **4 mensajes en español** ✗ (R35). Sin secretos (grep api_key/token/password → solo menciones en docs de proceso), sin `tsbuildinfo`/`.env` versionados ✓.
- `material-concurso/` en `.gitignore` y `git ls-files` → **0 archivos** ✓.
- `docs/DECISIONES.md:63` contiene invite no oficial → limpiar antes del push.

## Criterio propio (no requisito de las bases — sugerencias)

1. `package.json` `"name": "app"` → renombrar a `techtojob-landing` (cosmético, lo ve el jurado).
2. El README raíz describe un proyecto en "FASE 1" con tono de work-in-progress; un jurado técnico lo lee como desorden. Reescribirlo es barato y toca R01+R07+R09+R10 de golpe.
3. `SiteHeader` y `SiteFooter` comparten `aria-label="Navegación principal"` (`es.json:14` usado en dos nav): dar al footer "Navegación del pie de página" mejora J6.
4. Publicar `AGENTS.md`/`GUIA.md`/`.opencode/` es honesto y defendible, pero `GUIA.md` habla de "lo que hay que traer del Discord"; valorar si suma o distrae en la lectura del jurado.

---

**Gate:** con R35 y R56 abiertas **NO HAY ENTREGA**. Ambas son corregibles en <1 hora (lazy 1 línea; rename de claves + rebase local antes del primer push). Plazo: quedan ~36h para ENTREGAS (R05) y aún faltan repo público, deploy y toda la evidencia de QA.
