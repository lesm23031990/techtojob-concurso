---
name: nextjs-landing-patterns
description: Patrones de implementacion de la landing Next.js + TS + Tailwind del concurso (App Router, metadata, content-as-data, secciones). Usar al disenar o escribir cualquier componente o archivo de app/.
---

# Patrones de la landing TechToJob

Proyecto SOLO frontend: SSG por defecto, cero APIs propias. Next.js App Router +
TypeScript strict + Tailwind v4 (`@theme` tokens).

## Estructura de referencia
```
app/
├── app/(landing)/page.tsx      # unica pagina si las bases no piden mas
├── app/content/
│   ├── site.ts                 # nombre, descripcion, url, og — una fuente de verdad
│   └── sections/*.ts           # contenido tipado de cada seccion
├── app/components/
│   ├── sections/               # Hero, Programa, ComoParticipar, FAQ, CTA, Footer...
│   └── ui/                     # Button, Badge, Card... (primitivas del design system)
├── app/layout.tsx              # metadata global + fonts + skip-link
├── app/sitemap.ts
├── app/robots.ts
└── app/opengraph-image.tsx     # o estatica en public/ si las bases lo simplifican
```

## Reglas de patron
1. **Content-as-data**: ningun texto del jurado-visible hardcodeado en JSX.
   Cada seccion lee de `app/content/sections/`. El tipado (interfaces o zod si
   se aprueba) hace que faltar contenido sea error de build.
2. **Server components puros**: props serializables; interactividad minima
   (menus moviles, acordeones FAQ nativos con <details> antes que useState).
3. **Metadata centralizada**: un layout de ruta define title template
   (`%s | TechToJob`) y description desde site.ts.
4. **Tokens, no literales**: colores/espaciados/fuentes del design system
   (`bg-brand`, `text-ink-900`...). Los unicos valores crudos permitidos: utilidades
   Tailwind estandar de layout.
5. **Secciones = componentes + spec**: cada archivo en sections/ commence (solo si
   el porque no es obvio) con referencia a la regla del checklist que la justifica.
6. **Imágenes**: next/image con dimensions fijas o aspect-ratio container (CLS=0).
7. **FAQ**: usar <details>/<summary> estilizado — a11y gratis y menos JS. Si las
   bases piden SEO de contenido, el JSON-LD FAQPage solo es valido si el contenido
   es efectivamente visible.
8. **El footer del jurado**: credito/branding que las bases exijan va en content/site.ts
   y se audita literal contra el checklist.

## Anti-patrones especficos de este proyecto
- useState para algo que resuelve CSS o <details>.
- librerias de animacion si CSS keyframes + IntersectionObserver basta.
- "use client" en el layout raiz (mata el SSG del arbol).
- OG tags fuera de la Metadata API (duplicacion que diverge).
