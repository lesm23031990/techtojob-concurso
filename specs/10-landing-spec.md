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

## Estructura de secciones (orden propuesto)

Orden orientativo salvo hero primero y footer último (R22). Este orden NO se reordena respecto
al brief → no requiere justificación extra en README (R10).

| # | Sección | Ancla | Qué comunica (brief disponible) | Regla |
|---|---|---|---|---|
| 0 | Nav (header) | — | logo + enlaces a secciones + CTA Discord | R42 |
| 1 | Hero | `#inicio` | Qué es TechToJob, por qué no es un portal de empleo más. **Un solo CTA: entrar al Discord** (link real, pendiente Q3) | R11 |
| 2 | Cómo funciona | `#como-funciona` | Recorrido paso a paso: llegas → perfil → oportunidad (3-4 pasos visuales) | R12 |
| 3 | Ofrécete como talento | `#talento` | Publicar perfil: stack, nivel, disponibilidad | R13 |
| 4 | Publica como empresa | `#empresas` | Publicar búsqueda, acceder a perfiles | R14 |
| 5 | Torneos | `#torneos` | Competiciones abiertas como esta | R15 |
| 6 | Networking | `#networking` | Canales por área, gente del sector | R16 |
| 7 | Testimonios | `#testimonios` | 4-5 tarjetas: nombre + frase (maqueta declarada); **diseño reserva sitio para foto + enlace a perfil LinkedIn** (slot de avatar circular + icono/link deshabilitado visualmente listo para datos reales) | R17 |
| 8 | Noticias | `#noticias` | 3 entradas de ejemplo (fecha, título, resumen, link descriptivo) | R18 |
| 9 | Newsletter | `#newsletter` | Formulario email con label visible, validación HTML5 + feedback; franja antes del footer | R19 |
| 10 | Cierre | `#unete` | Último empujón: repetir CTA Discord | R20 |
| 11 | Footer | — | Enlaces por bloques (secciones, comunidad, legal), redes (Q5), copyright | R21 |

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
