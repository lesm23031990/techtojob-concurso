# Decisiones y preguntas abiertas — TechToJob

Registro cronológico. Toda decisión relevante del proyecto vive aquí con fecha y motivo.
Las preguntas abiertas bloquean la Fase 2 y NO se responden asumiendo.

## Decisiones

### 2026-09-22
- **D1.** Repo público → `material-concurso/` excluido de git (datos de terceros en capturas).
- **D2.** Seguridad como checklist dentro de `qa-access`, no como agente dedicado
  (superficie mínima en landing estática; evita roles vacíos).
- **D3.** Sistema de 6 agentes (orquestador + 5 lentes), adaptado del patrón SportFlow
  sin roles de backend: el concurso es solo frontend + SEO.
- **D4.** `app/` como subcarpeta del repo: la raíz queda limpia para README/specs/docs,
  que es lo que el jurado ve primero.
- **D5.** Sin LICENSE por ahora — confirmar propiedad del código en las bases (QA-P2).
- **D6.** MCPs: playwright + context7 activos; github apagado hasta crear el repo remoto.
- **D7.** Ingesta completada: `discord.txt` + 17 capturas procesados → `specs/00/10/20/30`.
  Material coherente entre sí (capturas confirman el txt línea a línea).
- **D8.** Plazo confirmado: **miércoles 23/09 23:59** ("Nada del 24 en adelante"). Zona horaria
  no declarada en bases → se asume peninsular española para el envío a 📦│ENTREGAS, pero el plan
  interno cierra TODO hoy 22 para no depender de la ambigüedad.
- **D9.** El concurso permite IA explícitamente ("Se permite, tanto para código como para
  imágenes", D102) → todo el sistema agéntico es legítimo; obligación: declararlo al entregar (R07).
- **D10.** Los textos de la landing los escribimos nosotros guiados por el brief; está PROHIBIDO
  copiar el ejemplo orientativo del brief ("penaliza", D248) → el copy final pasa revisión
  anti-copia antes de cerrar J2.
- **D11.** Testimonios y noticias son maqueta declarada por la organización (D38, D41) → se
  rotulan discretamente como ejemplos en el README de entrega, no en la web.
- **D12.** Contraste: #84c0bf sobre #ffffff NO pasa AA para texto pequeño (las bases lo advierten,
  D68) → el verde solo en fondos/botones/detalles; sobre él, texto #2f3436.

### 2026-09-22 (post-ingesta)
- **D13.** Stack: **Next.js App Router + TS estricto + Tailwind** (vía recomendada D84). Justificado
  en `specs/20-requisitos-tecnicos.md`. La regla "usar Next no suma puntos" se acepta: se elige
  porque las bases piden expresivamente funciones de Next (Metadata API, next/font, next/image).
- **D14.** **No se entrega la versión bilingüe opcional** (D281-289). Coste/beneficio con 1 día de
  plazo: next-intl + 2 locales + hreflang no compensa el 10% de SEO parcial que podría sumar.
  SÍ se cumple lo obligatorio: textos en `messages/es.json` (D271) → arquitectura i18n-ready
  documentada en README. Reversible: si sobra tiempo tras el gate META, se añade.
- **D15.** Newsletter sin backend (regla de alcance AGENTS.md): formulario con label visible,
  input email, validación HTML5 + feedback en cliente, sin envío real ni endpoint. Es "formulario
  de suscripción" maqueta, coherente con noticias/testimonios maqueta que las bases aceptan.
- **D16.** Deploy: **Vercel** (una de las dos opciones gratis admitidas, D203); cero fricción con
  App Router. Cloudflare Pages como fallback.
- **D17.** Sin `any`, sin deps de UI (anti-kit D95): 0 librerías de componentes; iconos de Lucide
  (fuente en README, R09); fuentes vía next/font.

## Preguntas abiertas — RESUELTAS por la ingesta

- [x] QA-P1. Idioma → **ES, con arquitectura lista para EN** (D269-275); bilingüe opcional descartado (D14).
- [x] QA-P3. Destino de entrega → **repo público GitHub + deploy Vercel/CF Pages + capturas escritorio/móvil + captura Lighthouse, todo enviado al canal 📦│ENTREGAS** (D202-207).
- [x] QA-P4. IA → **permitida, declararla al entregar** (D102, decisión D9).
- [x] QA-P6. Fecha límite → **miércoles 23/09/2026 23:59, revisión 24, ganador 25** (D207, D241).

## Preguntas abiertas — RESUELTAS (2ª tanda, 22/09 tarde)

- [x] QA-P8. Brief → **recibido completo** en `material-concurso/bases/brief.md` (posicionamiento,
      reglas de tono, datos oficiales, ejemplo orientativo NO copiable). Alimenta `specs/11-contenido.md`.
- [x] QA-P9. Logo → **recibido kit completo** en `material-concurso/marca/TechToJob/` (SVG/PNG/PDF ×
      v1/v2/Símbolo × Positivo/Negro/Blanco/Degradado). Al copiar a `app/public/`: nombres ASCII.
- [x] QA-P10. Discord → **usar el oficial del brief: https://discord.gg/h9FFgKdkRd** ("Datos que no se
      inventan"). Se recibió además un invite alternativo no oficial que se descarta; el brief es
      fuente oficial → decisión D18.
- [x] QA-P11. Redes → **oficiales del brief**: LinkedIn company/techtojob · X @techtojob ·
      Instagram /techtojob. Van en footer + `sameAs` del JSON-LD. Reales, no placeholder.
- [x] QA-P13. Participación → solitario (Lorena).

## Preguntas abiertas — SIGUEN ABIERTAS

- [ ] QA-P12. 🟡 Enlaces legales del footer: el brief exige bloque "legal" pero el proyecto legal no
      existe aún → **resuelto por D19**: links a anclas/páginas maquetadas honestas ("Aviso legal",
      "Privacidad") que llevan a una nota "web del Torneo #2 — legal se completa al publicar".
      Confirmar con organizadores en CHARLA si hay texto legal real.
- [ ] QA-P14. 🟢 ¿Zona horaria de las 23:59? → irrelevante en la práctica: cerramos todo hoy 22/09.

## Decisiones 2ª tanda (22/09 tarde)

- **D18.** CTA Discord = `https://discord.gg/h9FFgKdkRd` (brief, sección "Datos que no se inventan").
- **D19.** Bloque legal del footer: maquetado con nota honesta (ver QA-P12). Nunca link roto ni
      página 404 — el jurado hace clic.
- **D20.** Modelos por agente (frontmatter `.opencode/agent/`): builder=kimi-k3, design-ux=glm-5.3,
  seo-perf/qa-access/rules-auditor/spec-architect=qwen3.8-flash. GPT-5.6 Luna no disponible desde
  la región de Lorena (probado).
- **D21.** Reglas de copy vinculantes del brief (para `specs/11`): tuteo · frases cortas · cero
      palabras de folleto (sinergia/ecosistema/revolucionar/solución integral/potenciar/disrupción) ·
      hablar de la persona, no de nosotros · "gratis" solo como tranquilizador, nunca titular ·
      PROHIBIDO prometer empleo/plazos/cifras · PROHIBIDO números de miembros/empresas ·
      nombre siempre "TechToJob" sin espacios · no copiar el ejemplo orientativo.

## Decisiones 3ª tanda (22/09 noche — cierre pre-entrega)

- **D22.** R35-commits: los 4 primeros commits del historial tenían mensaje en español. Se reescribieron
      a inglés con `git rebase -i` LOCAL antes del primer push (sin remote configurado → no es
      force-push sobre historia pública; árbol verificado idéntico vía `git diff` contra rama backup).
- **D23.** R35-código: rename completo de claves-identificador de `messages/es.json` a inglés
      (`titulo`→`title`, `comoFunciona`→`howItWorks`, etc.) en JSON + interfaces + componentes.
      Los VALORES visibles y los anchors (`#inicio`, `#unete`) siguen en español (R36/R45 intactas).
      Los 3 comentarios en español en componentes se mantienen: la regla literal enumera
      "variables, funciones, componentes y commits" — los comentarios no están (veredicto rules-auditor).
- **D24.** Publicación: `AGENTS.md`, `.opencode/` y `docs/` SÍ van al repo público (proceso
      multiagente honesto y defendible, refuerza J4 y la declaración de IA). `GUIA.md` se reescribió
      como doc público de proceso, sin el checklist interno de Discord. `material-concurso/` sigue
      excluido por `.gitignore`.
- **D25.** Invite no oficial de Discord retirado de `docs/DECISIONES.md` antes del push (R52: el repo
      no debe exhibir invites ajenos). El único enlace que queda es el oficial del brief (D18).
- **D26.** `package.json` name `app` → `techtojob-landing`. Footer `<nav>` con `aria-label` propio
      ("Navegación del pie de página") para desambiguar los 3 landmarks (J6).

### 2026-09-22 (rediseño hero)

- **D27.** Rediseño estético del Hero (minimalismo premium): escala `display` reescalada
      (3rem/4.5rem, line-height 1.05/1.0, tracking −0.04em), fondo `bg-hero-radial` ink→`ink-deep`
      (`#262b2d`, sombra de la misma familia de tono — R25: no es color nuevo), badges orbitales
      decorativos con datos mock de actividad de la comunidad (`aria-hidden`, ocultos <md,
      flotado CSS puro apagado por el guard reduced-motion) y glow de hover exclusivo del CTA
      del hero. Los textos de los orbitales son maqueta de actividad comunitaria — mismo criterio
      que el `mockNote` de noticias (D11): no son cifras reales de miembros (D21) y no forman
      parte del contenido indexable. El H1 sigue sin animarse (LCP protegido, R39/R40).
- **D28.** QA suspendido por decisión de Lorena (22/09): NINGÚN agente de pruebas
      (qa-access, Lighthouse, Playwright, rules-auditor sobre el rediseño hero) se ejecuta
      hasta que ella lo autorice expresamente. El rediseño del Hero queda implementado y
      compilando (tsc + lint + build OK) pero SIN evidencia QA en `docs/qa/`. Pendiente para
      cuando se reactive: auditoría rules-auditor del hero (R25 ink-deep, contraste orbitales),
      QA responsive con Playwright (colisiones badges↔texto en 768–1024) y revisión design-ux.
      Gate de AGENTS.md (toda entrega pasa rules-auditor + qa-access) NO se elimina: solo se
      pospone; la Fase 5 no se cierra sin esa evidencia.

## Arquitectura de modelos y rediseño V3 del hero (22/09, noche)

- **D29.** Arquitectura dual de modelos: **primario `opencode-go`** (kimi-k3 builder, glm-5.3
      diseño, qwen3.8-flash spec/QA/auditoría/SEO) y **reserva `deepseek/deepseek-flash`** solo
      mientras los créditos estén agotados. No existe fallback nativo en opencode (verificado
      contra el schema oficial: 0 ocurrencias de `fallback`/`retry`), así que el cambio se hace
      con `scripts/set-agent-models.mjs opencode-go|deepseek|status [--dry-run]`, documentado en
      `AGENTS.md`. Las temperaturas y permisos de cada agente no cambian entre modos.
      **Excepción de proceso:** con los créditos de `opencode-go` agotados y `nextjs-builder`
      indisponible, el orquestador implementó directamente en `app/` (hero V3, header, grafo,
      CTA, logo). Los cambios están compilando y pasan `tsc --noEmit`, ESLint y `next build`,
      pero **deben pasar `rules-auditor` y `qa-access` cuando Lorena reactive el QA (D28)**.
- **D30.** Rediseño estético del hero (orden directa de Lorena): se eliminan las tarjetas
      orbitales flotantes (se veían mal) y se construye una **constelación 3D en canvas** como
      ambiente, con topología estable precalculada, twinkle por nodo, campo que responde al
      cursor, viñeta elíptica y **cobertura del ancho completo** del hero (el cálculo original
      usaba `Math.min(width, height)` y dejaba el cúmulo reducido a un cuadrado central — el
      ajuste escala cada eje por su semieje y protege el texto con un dip elíptico). Es la única
      isla cliente del hero (`"use client"` justificado: necesitaba render loop y puntero), sin
      dependencias (nada de three.js: ~300 KB por una decoración habrían puesto en riesgo el gate
      de Lighthouse ≥95). Guardas: DPR ≤1.5, pausa offscreen/pestaña oculta y frame estático con
      `prefers-reduced-motion`. Además: entrada escalonada de los elementos del hero (**el H1
      anima solo `transform`** para no retrasar el LCP), el anillo respirante + glow de hover se
      vuelven universales en `DiscordCta` (nav, hero, menú y cierre), el header pasa a 5rem con
      superficie `header-veil` (`ink` opaco al 70% → transparente) y **el hero sube por detrás
      del header (`-mt-20`)** para que el degradado resuelva sobre `ink` y no sobre el blanco del
      `body`: ese era el corte claro que se veía entre header y hero. Se fija además que el botón
      de Discord **nunca** puede quedar en dos líneas (`whitespace-nowrap` + `shrink-0`, y el nav
      recorta enlaces por breakpoint en lugar de comprimir el botón).
- **D31.** El kit oficial **no tiene variante clara del wordmark** (§0.1: la "Negativa" es verde
      y la "Degradada" es carbón→turquesa, que sobre `ink` desaparece). Para el header oscuro se
      usa una **composición**: el isotipo oficial (SímboloNegativo, verde) dentro de un tile
      `rounded-xl` con borde `brand/40`, más `brand/wordmark-duo.svg`, un **asset derivado** con
      los **mismos trazados oficiales** (9 glifos, sin redibujar nada) y tinta doble "Tech"
      `paper` / "ToJob" `brand`. Los archivos oficiales no se alteran; el color de marca se usa
      dentro de la paleta fija (R24). Geometría verificada: la tinta cae dentro del `viewBox`
      (sin recortes).

## Línea de tiempo vertical, reorden narrativo y hero V4 (22/09, madrugada)

- **D32.** La landing se recorre como una **línea de tiempo vertical** continua: raíl en el borde
      izquierdo del `page-container`, un segmento a altura completa por sección (los segmentos
      contiguos forman una sola línea, sin cálculos entre secciones), relleno `brand` que crece
      con el scroll y nodo numerado que se enciende al entrar en vista (`animation-timeline:
      view()`, CSS puro, cero JS; sin soporte la línea se ve completa). "Cómo funciona" abre el
      raíl en un sub-timeline de pasos (alternado en `xl`, apilado con conector por debajo).
      **Reorden narrativo** (R22: *"El orden es orientativo menos el hero y el footer"*): Torneos
      pasa del #5 al #3 para que la página cuente cómo funciona → prueba (torneo vivo) → qué
      ganás → qué gana la empresa → red → validación → actualidad → CTA. Hero primero y footer
      último intactos; la declaración que R10 exige para el README queda redactada acá y se sube
      al README en la Fase 5 (todavía no existe). El orden vive en `content.ts → timelineOrder`
      (fuente única: de ahí salen los numerales del raíl) y se reflejó en
      `specs/10-landing-spec.md`; la línea de R22 en el checklist pasa a **"en riesgo,
      re-auditar"** porque decía "orden del brief sin cambios".
- **D33.** Cuarta iteración del hero, sobre orden directa de Lorena:
      1. **Se quita el chip de eyebrow** ("Comunidad tech en español · 100% gratis"): clave
         eliminada de `messages/es.json` y de la interfaz `Hero` (sin texto muerto, R36).
      2. **Se quita el raíl del hero**: la puerta del relato no lleva línea; el viaje arranca en
         el paso 1 (Cómo funciona) y la variante `start` de `TimelineRail` se elimina por quedar
         sin uso.
      3. **Centrado del bloque**: se probó dejar el H1 exacto en la línea central
         (`grid-rows-[1fr_auto_1fr]`) y **se revirtió el mismo día** a pedido de Lorena: el H1, el sub,
         el CTA y la línea de apoyo se leen como **una sola pieza**, así que lo que se centra es el
         bloque completo (`flex` centrado + `pt-20` que compensa el header y `pb-0` para que el
         centro sea el del área visible). También se revirtió el `pl-*` que existía para esquivar
         el raíl → centrado simétrico.
      4. **`HeroGraph` v2.2 = campo de grafos con puntitos luminosos.** Iterado en tres pasos el
         mismo día con Lorena: primero se pidieron grafos "al menos 6× más grandes y más
         cantidad" (elegida esa escala advertida del entrelazamiento), después que los vértices
         fueran **puntitos y no círculos**, y finalmente **la mitad del tamaño** de esos grafos.
         Estado final: **span ~300px** (`CLUSTER_SPREAD` 0.21, mitad del build 6×), **6/8/10
         clusters** según ancho, vértices de **1.8/2.2/2.6px de radio** con halo a 2.6× y 18% del
         alpha (techo de núcleo 0.9), **aristas de 1.5px** (alpha ≤0.30), deriva orbital 18–42px,
         parallax por capa 10/20/36 y cursor de radio 240 con empuje 24. La lección quedó escrita
         en el código: **un grafo se lee por los enlaces largos entre puntos chicos**, no por
         discos grandes. El **dip de protección del texto** se mantiene en 560×320 con piso 0.15 y
         los clusters conservan el sesgo suave fuera de la columna central. Siguen activas todas
         las guardas (DPR ≤1.5, buffers reutilizados, buckets de alpha, pausa fuera de
         pantalla/pestaña oculta, frame estático con `reduced-motion`).
      5. **Glow del hero**: halo ambiental (dos halos `brand`, uno con `glow-pulse` de 7s y otro
         con `drift` de 18s), franja luminosa bajo el header y foco difuminado detrás del titular.
         Todo ≤15% de opacidad para no comprometer el contraste AA del H1 (7:1) ni del subtítulo,
         y todo decorativo (`aria-hidden`, `pointer-events-none`, absoluto → CLS 0).
       **Estado:** implementado y compilando (`tsc --noEmit`, ESLint y `next build` en verde). El
       QA sigue **en pausa (D28)**, así que INP/Lighthouse y los contrastes del glow quedan
       pendientes de medición; la implementación la hizo el orquestador por la excepción de D29.
- **D34.** 22/09, a pedido de Lorena (referencia visual: cosmos.so): **"Cosmos en tinta"** —
      el lenguaje del referente se tradujo sin copiar lo que las bases vetan:
      1. **Muro de tiles flotantes** (`HeroTiles.tsx`, server component, sin JS): 15 fichas
         inclinadas en 3 capas (ghost `brand/10` con blur, glass con iconos Lucide, brand/coal con
         el símbolo oficial), rotaciones −12°…+12°, deriva `tile-drift` solo `transform` (≥14s,
         delays escalonados). **Cero fotografías** → sin coste LCP, sin alt cosmético (R53–R57),
         todo dentro de la paleta fija (R24). Decorativo: `aria-hidden` + `pointer-events-none`,
         z-0 bajo el copy (z-10). Posiciones por breakpoint: en móvil solo 2 ghosts en las esquinas
         inferiores; los anchos aparecen de `xl`.
      2. **Descartados y por qué**: buscador Cosmos (sin backend, funcionalidad falsa), segundo
         botón "Get the app" (R11: un solo botón), fondo crema (R24: dominan los 3 colores),
         fotos de la galería (prohibido inventar + R56).
      3. **Nav pill**: las anclas de escritorio se envolvieron en una píldora hairline
         (`border-white/10 bg-white/5 rounded-full`) — eco visual del pill del referente sin
         fingir un buscador.
      4. **Símbolo oficial pequeño** (40px) sobre el H1 como marca centrada (eco del wordmark),
         decorativo; la marca accesible sigue viviendo en el logo del nav.
      5. Se añadió un **enlace terciario** "Ver cómo funciona" (text link, no botón). → **Queda
         sustituido por D35.**
      Implementó el orquestador (excepción D29). `SHOW_GRAPH` se retiró como flag: el campo de
      grafos vuelve a renderizar siempre (era el estado exigido antes de entregar).
- **D35.** 22/09, a pedido de Lorena (referencia visual: plantilla "Recruit"): **"Recruit en
      tinta"** — firma tipográfica del referente aplicada al hero y al cierre, con las 61 reglas
      intactas:
      1. **H1 partido en dos líneas editoriales**: línea 1 (pregunta) en `cloud` (7.77:1), línea 2
         (respuesta) en `paper` con la palabra final en `brand` (6.17:1). Sigue siendo UN `h1` con
         el mismo texto (R40); `es.json` pasa de `h1` a `line1`/`line2` + `highlight`.
      2. **Glows al 50%** (`0.3→0.15`, `0.16→0.08`, `0.2→0.1`, `0.14→0.07`) y **muro de tiles al
         60%** de opacidad: escenario plano y oscuro donde la tipografía manda.
      3. **Fila de píldoras-ancla** bajo el CTA (`Cómo funciona · Torneos · Talento · Empresas`):
         `<Link>` reales a las secciones (R43/R45), etiquetas reusadas de `nav.links` (R36),
         estilo outline (nunca relleno) para que el Discord siga siendo el ÚNICO botón del hero
         (R11). `<nav>` propio con `aria-label` distinto al del header (landmarks).
      4. **Muro de stacks** (`React · Next.js · Laravel · Node · Python · Rust · AWS`) como eco
         honesto del "logo wall": tecnologías reales, cero empresas inventadas, cero cifras falsas
         (prohibido inventar, D7). Texto `cloud` AA.
      5. **Cierre espejado**: `closing.h2` → `line1`/`line2` con el mismo tratamiento.
      6. **Descartados**: chip "Trusted by 100k+" (cifras inventadas; y el eyebrow lo borró
         Lorena en D33 → no vuelve sin pedido explícito), buscador de vacantes (sin backend +
         contradice el posicionamiento), botón blanco del nav (R24: domina la paleta; el CTA
         sigue verde), job cards (no hay ofertas que listar).
      **Pendiente:** re-auditoría enfocada (R11 pills-vs-botones, R26, R40, R44, contraste
      `cloud`/`brand`) y decisión de Lorena sobre el H1 editorial propuesto aparte
      ("El empleo llega a quien ya estaba construyendo." — aún NO aplicado).

- **D36.** 22/09, rediseño radical del hero a pedido de Lorena (referente: sofisticación editorial
      de cosmos.so; rechaza el V4 por "genérico, saturado de iconos flotantes"): **"Vacío
      Editorial" V5**, commit `a2964e6`.
      1. **Conflicto tipográfico y su resolución (bases ganan):** el brief pedía serif de alta
         costura (Ogg/Chronicle) + mono (JetBrains) → viola R24 ("la tipografía es fija… Sora"),
         R28, R58 y R59 ("Una fuente y tres pesos. No ocho variantes"), y arriesga J1 (25%).
         Lorena eligió **Sora-only**: el contraste se logra con peso/escala/tracking (display 700
         −0.045em vs etiquetas 600 uppercase 0.15em). Cero familias nuevas.
      2. **Grid asimétrico 12 col** (H1 cols 2–8, col 1 vacía, metadatos cols 10–12, anclaje al
         tercio superior): rompe el centrado de landing genérica. Móvil: una columna, SIEMPRE a la
         izquierda.
      3. **Fondo ink plano** (#2f3436 — ni #F9F9F9 ni #000: colores fuera de tokens R24/R25). Se
         eliminan glows, tiles flotantes y el canvas del grafo (`HeroGraph`/`HeroTiles` borradas;
         el hero V5 es server component puro, cero islas cliente).
      4. **CTA hairline** (`DiscordCta size="line"`): rectángulo de borde 1px, sin píldora, sin
         relleno; hover = flecha desliza + subrayado `brand` que se dibuja. Sigue siendo el ÚNICO
         botón del hero (R11) y el `<a>` real al Discord (R43).
      5. **Copy propio anti-copia (J2/D248):** H1 "El fin de la búsqueda pasiva. / Aquí te
         conocen antes de que exista la vacante." — abandona el ejemplo orientativo del brief que
         el V4 usaba literal. Metadatos 100% reales (sin cifras inventadas). `meta.og.headline`
         y `ogImageAlt` sincronizados.
- **D37.** 22/09, **directriz de diseño vinculante de Lorena** (owner, no regla del concurso):
      "Nada de landings comunes ni de tendencias de diseño viejas. Diseño sofisticado, minimalista,
      funcional, muy estético, **arquitectónico**, que parezca que tiene **mucha vida, movimiento y
      dinamismo**; tendencia de diseño web **2026**; tan impactante que quien la visite quiera
      invertir y conocer TechToJob."
      Traducción a restricciones operativas (para que sea verificable y no choque con las bases):
      1. **Dinamismo 2026 = motion por scroll y micro-interacciones, NO decoración suelta**:
         line-mask reveals, tipografía cinética, marquee de stacks, columna sticky, numeración de
         índice, hairlines de plano. Prohibido: partículas flotantes, blobs/aurora gradients,
         glassmorphism, cursores con glow (tendencias 2021-2024 ya saturadas y vetadas por Lorena).
      2. **Todo CSS puro** (`animation-timeline: view()` + transiciones): cero islas cliente nuevas
         → protege Lighthouse ≥95 (gate AGENTS.md), INP y el precedente D30 (nada de three.js).
      3. **Respeta las 61 reglas**: Sora-only (D36.1), paleta fija R24/R25, R34 "animaciones que no
         estorben" + `prefers-reduced-motion`, cero cifras/contenidos inventados (J2/D7).
      4. Criterio de impacto honesto: la landing debe dar sensación de **sistema vivo** (estado
         "en curso", ticker, ritmo al scrollear), no de maqueta estática.
- **D38.** 22/09, a pedido de Lorena: **"Bento Signature"** — la página se leía uniforme (todas
      las secciones del cuerpo eran `h2 + párrafo`), y el referente cosmos.so se percibe "vivo"
      por **ritmo**, no por decoración. Se aplica bento **solo donde ya existen varios ítems**
      (así no se inventa contenido, J2/R36):
      1. **Hero ticker** (marquee CSS puro): franja hairline bajo el hero con tokens reales ya
         publicados (los 7 stacks de `hero.meta`, "Torneo #2", "Comunidad técnica en español").
         Se añade `hero.ticker: string[]` en `messages/es.json` como **derivado** de strings ya
         existentes — cero datos nuevos. El bloque es `aria-hidden` (duplica info de `hero.meta`)
         y **no es un control**: R11 intacta (el Discord sigue siendo el único botón).
      2. **"Cómo funciona" → bento asimétrico** (12 col): 1 celda alta dominante + 2 apiladas +
         1 ancha de cierre, con numeral de índice sobredimensionado. Se conserva el `<ol>` y su
         orden; el sub-timeline central de D32 se **retira** (la spec de la línea de tiempo se
         actualiza para no contradecirse).
      3. **Testimonios → bento 7/5/5/7** con las mismas 4 celdas-semántica (`figure`/
         `blockquote`/`figcaption`), avatar y slot LinkedIn deshabilitado intactos (R17/R43).
      4. **Noticias → bento 7+5/5** (1 destacada alta + 2), conservando `article`, `<time>`,
         chip `ember` y enlace descriptivo (R18/R44).
      5. **Lenguaje de celda bento:** borde hairline 1px, **esquinas rectas** (continuidad
         editorial con el CTA `rounded-none` de D36; se sustituye el uso de `--radius-card` +
         sombra en estas dos secciones), sin relleno en claro, `bg-paper` sobre `mist`.
      6. **Motion nuevo (CSS puro, D37.2):** `.marquee` (≥30s, `transform` only, pausa con
         `reduced-motion`) y `.bento-index` (`animation-timeline: view()`, `transform`/`opacity`
         en un `<span>` interno). El resto reusa `.reveal`. Cero islas cliente nuevas.
      7. **Fuera de alcance (a propósito):** Talento / Empresas / Networking quedan editoriales
         (no tienen ítems; convertirlas a bento obligaría a inventar copy). Toda la página en
         bento se descarta por repetitivo y por canibalizar la Fase 5.
      Implementó el orquestador por la excepción de D29 (créditos `opencode-go` agotados; modo
      reserva `deepseek/deepseek-flash` activo en `.opencode/agent/*`). Pendiente (D28): que
      `design-ux` sincronice `docs/design-system.md` §5/§6/§9 (celdas sin `radius-card`, piezas
      3 y 9 ya retiradas en D36) y que el QA reactive re-audite R11 (ticker no-botón), R26
      (verde), R40 (único `h1`) y R44.
- **D39.** 22/09, criterio de Lorena (owner): **mientras el diseño esté en iteración, no se
      invocan los agentes de verificación** (`rules-auditor`, `qa-access`, `seo-perf`,
      Lighthouse/Playwright/axe). Se reservan para **cuando el diseño esté definido y congelado**:
      ahí sí corren completos y su veredicto manda. Amplía D28 (QA en pausa) de "hero" a "todo el
      diseño en curso" y evita gastar ciclos auditando algo que va a cambiar. El gate de
      AGENTS.md NO se elimina: sigue pendiente antes de cerrar la Fase 5.
      Implicación operativa: `design-ux` sí puede usarse durante la iteración (es diseño, no
      auditoría); `nextjs-builder` implementa; el orquestador mantiene specs y decisiones.

- **D40.** 22/09 (noche), pedido de rediseño del hero: "mesh gradient animado con manchas
      difuminadas", "imágenes del torneo flotando" y paleta `#0B0F19`/`#F9FAFB` + violeta/cian.
      **Conflicto vinculante detectado; resuelto a favor de las bases (AGENTS.md: "las bases ganan")
      y de la directriz de la owner.** Por qué NO se implementó literal:
      1. **Manchas difuminadas en movimiento = "blobs/aurora gradients"**, prohibidos por **D37.1**
         (directriz de Lorena): *"Prohibido: partículas flotantes, blobs/aurora gradients,
         glassmorphism, cursores con glow"*. El pedido pide exactamente eso; gana D37.
      2. **Imágenes flotantes del torneo = "partículas flotantes"** (misma prohibición de D37.1);
         además no hay fotos reales del torneo en el material (prohibido inventar, J2) y R56 pide
         no cargar peso sobre el primer pantallazo. Las decoraciones flotantes ya se retiraron en
         D33/D34/D36 ("se veían mal").
      3. **Colores nuevos** `#0B0F19` (dark) y `#F9FAFB` (light) + tonos violeta/cian **violan
         R24** ("los tres colores… son fijos y tienen que dominar") y **R25** (solo grises
         intermedios + UN acento). La landing no tiene modo claro/oscuro: el hero es `ink` por
         diseño (§7 del design-system).
      4. **`filter: blur(100px)` animado es caro** (repaints de GPU) y contradice el gate
         Lighthouse ≥95 y el catálogo de motion (solo `transform`/`opacity`/`box-shadow`).
      **Resolución — Hero V6 "Plano Cinético" (spec en `specs/10`, §Hero V6):** se conserva la
      intención (color vivo, movimiento, revelado editorial, tema torneo) con el vocabulario que
      D37.1 sí autoriza: **campo de retícula hairline** con paneo scroll-driven, **haz de luz**
      `brand` de bordes duros (no difuminado) en deriva lenta, **marginalia tipo bracket** (raíl +
      nodo por dato) en lugar de fotos, **revelado por palabra del H1** (transform-only, LCP-safe)
      y **subrayado cinético** `brand` con `animation-timeline: view()`. Todo CSS puro, cero islas
      cliente nuevas, Sora-only, paleta R24/R25 y guard `prefers-reduced-motion`.
      **Estado:** **implementado y compilando** por `nextjs-builder` en
      `app/components/sections/Hero.tsx` + `app/app/globals.css`; `tsc --noEmit`, ESLint y
      `next build` **en verde (22/09, cierre de sesión)**. El subrayado del acento se emite como
      un solo token (la frase "te conocen") para que la regla sea continua. Sigue en **modo
      diseño (D39)**: el gate de Fase 5 (Lighthouse/axe/rules-auditor) está pendiente (D28) y ahí
      se miden el LCP del revelado por palabra y el contraste del haz. **Ruta de override:** si
      Lorena quiere el mesh/blobs de todas formas,       se registra como override explícito de owner y
      se marca R24/R25/D37 como "violada/en riesgo" en el checklist — no se hace por defecto.

- **D41.** 22/09 (noche), iteración V7 del hero pedida por Lorena (sobre D40): (1) **quitar el
      overline** que, al no tener `col-span` en `lg`, se apilaba en 5 líneas; (2) implementar el
      **combo aprobado #2 cristal facetado + #4 red que se dibuja**; (3) **rebalancear la altura**
      del hero para que no quede un hueco superior.
      1. **Overline fuera de punta a punta**: `<p>` del hero + campo `overline` de `content.ts` +
         clave `hero.overline` de `es.json`. Sin texto muerto (R36); el mensaje vive ya en
         `hero.ticker` y `meta.description`.
      2. **Cristal facetado**: cuñas `conic-gradient` de **borde duro** en `brand`/`ember` (≤10% de
         alfa) sobre una máscara radial, con rotación lenta (64s/88s). Es el sustituto legal del
         "mesh": geometría con bordes, no manchas difuminadas → no viola la prohibición de
         blobs/aurora de D37.1. Se **descartó `mix-blend-mode`** (el `mask` + `-z-10` aísla el
         blend y volvía impredecible el resultado); alfa directo = mismo efecto y portable.
      3. **Red que se dibuja**: `HeroNetwork.tsx` (server, SVG inline `aria-hidden`) con aristas
         trazándose por `stroke-dashoffset` escalonado + nodos que aparecen + 2 hubs con pulso. Es
         el "tema torneo" sin fotos (que no existen) y sin decoración flotante prohibida.
      4. **Rebalance**: `justify-center` en móvil y `lg:content-center` en desktop, padding superior
         reducido (`pt-28 lg:pt-32`) y el H1 como primer bloque del grid (comparte fila con la
         marginalia) → se elimina la fila superior vacía que se veía en la captura.
      **Estado:** implementado por `nextjs-builder`; `tsc --noEmit`, ESLint y `next build` **en
      verde (22/09)**. Sigue en **modo diseño (D39)**: el gate de Fase 5 (Lighthouse/axe/
      rules-auditor) está pendiente y debe medir el LCP del revelado/red, el INP del facet rotatorio
      y el contraste del facet/beam, con `prefers-reduced-motion` activo.

- **D42.** 22/09 (noche), pedido de Lorena: el párrafo de apoyo del hero se rompía en 6 líneas
      (estaba en una columna de 1/12, sin `col-span`) y el diseño general es **cuadrado**, así que
      todos los **botones tipo píldora** pasan al lenguaje rectangular. Alcance aplicado:
      1. **Hero**: `hero.support` y el `div` del CTA ganan `lg:col-span-5` (ya no se parten).
      2. **`DiscordCta`** variantes `nav`/`hero`/`block`: `rounded-none`, se elimina el anillo
         respirante (`animate-breathe`, también borrado de `globals.css` por código muerto) y el
         `scale`/halo de hover. Queda relleno `brand` → `brand-deep`.
      3. **Header**: logo (foco + tile), marco del nav, enlaces, hamburguesa, panel móvil y enlaces
         del panel → `rounded-none`.
      4. **Newsletter** (botón) y **skip-link** → `rounded-none`.
      Se conservan circulares por semántica (avatar de testimonio, nodo del raíl, puntos del ticker)
      y los chips de categoría (no son botones). Alineado con D36 (CTA `rounded-none`).
- **D43.** 22/09 (noche), 3 pedidos de Lorena sobre el hero/header:
      1. **Header más ancho**: la barra usa un contenedor propio `page-container-wide`
         (`--container-page-wide: 80rem`, mismas métricas de gutter) para que el nav respire; el
         resto de la página sigue en 72rem.
      2. **La red de la esquina del hero "es horrible"** → se **elimina** `HeroNetwork.tsx` (y su
         CSS/keyframes) y en su lugar se coloca el **mismo logo watermark** que usan las demás
         secciones oscuras: `logo-symbol-gradient.svg` al `opacity-10`, `-bottom-28 -right-20`,
         `pointer-events-none`, `loading="lazy"` (copiado de `Tournaments.tsx`/`Closing.tsx`).
      3. **Impacto del CTA**: la variante `line` del hero ahora se **rellena de `brand` de
         izquierda a derecha** en hover/focus (texto pasa a `ink`) y sube a `min-h-14 px-6 py-4
         text-lead font-bold`; las variantes rellenas (`nav`/`hero`/`block`) llevan un **barrido
         especular** de borde duro (`-skew-x-12 bg-white/25`) más una **micro-elevación**
         (`-translate-y-0.5`). Todo sin halo, sin blur y solo `transform`/`color` → D37 y R24/R25
         intactas. `motion-reduce` desactiva barrido/elevación.
      **Estado:** implementado por `nextjs-builder`; `tsc --noEmit`, ESLint y `next build` **en
      verde (22/09)**. Sigue en modo diseño (D39): pendiente el gate de Fase 5 (LCP del relleno
      hover, INP, contraste del estado relleno).

- **D44.** 22/09 (noche), pedido de Lorena: **el grid de fondo del hero se queda, pero debe
      moverse un poco**. Se añade un **drift continuo** además del paneo por scroll que ya existía,
      en capas separadas para que ambos `transform` convivan: la capa externa `.hero-field` man-
      tiene la máscara y el paneo (`animation-timeline: scroll()`); la interna `.hero-field-drift`
      (sobredimensionada `-inset-16`) lleva el `background-image` y un bucle `field-drift` de 28s
      que traslada exactamente **una celda (4rem en X e Y)** → como el patrón repite cada 4rem, el
      loop es **sin costura**. Solo `transform`, `will-change` acotado al layer interno. Motivo del
      diseño: mantener el "plano vivo" de D40/D41 sin caer en decoración suelta (D37).
- **D45.** 22/09 (noche), dos ajustes de Lorena:
      1. **Fuera el recuadro del menú** de escritorio: el `<ul>` del nav pierde `border`/`bg`/`px`/
         `py` (queda `flex items-center gap-1`); los enlaces conservan su hover subrayado. Motivo:
         el marco hairline alrededor de las anclas "se ve horrible". El panel del menú móvil
         (`<details>`) se mantiene: es un desplegable y necesita su superficie.
      2. **Marca de agua del hero más grande**: `logo-symbol-gradient.svg` pasa de 320×320 a
         **520×520**, mismo anclaje `-bottom-28 -right-20` y `opacity-10` (D43).
      **Estado:** implementado por `nextjs-builder`; `tsc --noEmit`, ESLint y `next build` **en
      verde (22/09)**. QA sigue en pausa (D39).

- **D46.** 22/09 (noche), pedido de Lorena: **los botones que llevan a Discord deben ser iguales
      en toda la plataforma y llamativos**. Hasta ahora había dos lenguajes: la variante `line`
      (hairline del hero, D36/D43) y las rellenas `nav`/`hero`/`block`. Se unifica en **un único
      estilo**: cuadrado `rounded-none`, relleno `brand` con texto `ink` (6.77:1), barrido especular
      de borde duro (`-skew-x-12 bg-white/30`) + micro-elevación `-translate-y-0.5` + flecha. Solo
      cambia el tamaño (`nav` compacto / `hero` prominente `min-h-14 px-8` / `block` full-width).
      **Se retira la variante `line`** por completo y el hero pasa a `size="hero"`. El `hero` sube de
      `min-h-12 px-7` a `min-h-14 px-8` para ganar presencia (era el objetivo "llamativos").
      Detalle de accesibilidad: el focus ring es `brand` sobre superficies oscuras y `ink` en el
      panel móvil (`.block`, sobre `paper`) → cumple R26. R11 intacta (un solo botón por contexto).
      **Estado:** implementado por `nextjs-builder`; `tsc --noEmit`, ESLint y `next build` **en
      verde (22/09)**. Sigue en modo diseño (D39); el contraste del estado relleno y el foco se
      miden en el gate de Fase 5.

- **D47.** 22/09 (noche), pedido de Lorena: **header adaptativo** — arranca con fondo `ink` sólido
      y, al scrollear, adopta la polaridad de la sección que tiene detrás con un "sombreado amplio"
      que lo disuelve, más una sombra sutil. Se aprobó la **Opción A (isla mínima)**.
      1. **Isla `HeaderSurface.tsx`** (`"use client"`, la 2.ª del sitio tras `NewsletterForm`): lee
         el `data-surface` de la sección que cruza la línea de 72px y publica
         `data-header-surface`/`data-header-scrolled` en `<html>`. Es **rAF-throttled, no
         IntersectionObserver**: el *band detection* por `rootMargin` es frágil con alturas de
         viewport variables; el resultado funcional es el mismo. Progressive enhancement: sin JS el
         header queda `ink` (legible siempre). **Excepción deliberada a D37.2 (cero islas)** →
         declarar en el README con el resto del uso de IA.
      2. **`data-surface` en TODA `<section>`**: centralizado en `Section.tsx` (`paper`/`mist` →
         `light`; `ink` → `dark`) y añadido a las 3 standalone (`Hero`, `Tournaments`, `Closing`).
         **`brand` (newsletter) se trata como `dark`** para no hacer desaparecer el CTA `brand`
         (R26).
      3. **Barra SÓLIDA (D47b)**: el viejo `header-veil` era opaco solo hasta el 70% y el botón de
         Discord (centrado, ~18–62px) asomaba por la zona translúcida → "parecía quedar por fuera de
         la cabecera". Ahora `.header-veil-dark/light` son `background-color` sólido al 100% y el
         *fade* es una **franja aparte debajo de la barra** (`.header-fade-*`, `top: 100%`, 2.5rem).
         Crossfade por `opacity` (250ms, CLS 0) entre `ink` y `paper`.
      4. **Contraste en superficie clara**: nav/iconos pasan a `ink`; el logo cambia a
         `logo-horizontal.svg` (lockup oficial carbón) y el CTA del header recibe borde `ink`
         (`ring`/focus) porque `brand` sobre `paper` es 2.04:1 y un control relleno necesita 3:1
         (WCAG 1.4.11 / R26).
      **Estado:** implementado por `nextjs-builder`; `tsc`, ESLint y `next build` **en verde**. Sigue
      en modo diseño (D39); el gate de Fase 5 debe medir contraste de los dos estados (claro/oscuro)
      y validar que no hay salto perceptible en la transición.

- **D48.** 22/09 (noche), sobre el H1 del hero:
      1. **Bug de accesibilidad/SEO corregido**: el revelado por palabra (`HeroWord`) separaba solo
         con `mr-[0.24em]`, así que el `textContent` del `<h1>` no tenía espacios
         (`Elfindelabúsquedapasiva.`) → un solo ⚠ para lectores de pantalla y buscadores (R39/R40).
         Ahora hay **espacios reales** (`{" "}` entre palabras vía `Fragment`) y se retiró el margen;
         el revelado se mantiene.
      2. **Menos líneas**: el H1 pasa de `lg:col-span-7` a **`lg:col-span-8`** (la meta sigue en
         10–12) y se **acorta la línea 2** de *"Aquí te conocen antes de que exista la vacante."* a
         *"Aquí te conocen antes de la vacante."*. `hero.highlight` sigue `"te conocen"`.
         `meta.og.headline` y `meta.ogImageAlt` se sincronizaron con la frase nueva.
      La perilla extra (bajar `display-lg` 4.5rem → 4rem) queda disponible si se quiere menos de
      4 líneas. **Estado:** implementado; `tsc`, ESLint y `next build` en verde.

- **D49.** 22/09 (noche), 3 mejoras al header para maximizar J1/J6 (a pedido de Lorena:
      "¿qué arreglarías para ganar el concurso?"):
      1. **Alineación de eje**: el header vuelve de `page-container-wide` (80rem) a
         `page-container` (**72rem**), el mismo eje que el contenido. El punto medio de 80rem no
         alineaba con nada (el logo quedaba ~145px a la izquierda del H1); alinear es la jugada más
         fuerte de disciplina de grilla. Se eliminan el token `--container-page-wide` y la utility
         (sin código muerto).
      2. **Scrollspy**: la isla `HeaderSurface` (ya existente) marca el enlace de la sección visible
         con `aria-current="location"` y limpia el resto; solo escribe cuando cambia. Estilo AA por
         superficie: en oscuro el activo es `brand` (6.17:1); en claro el texto sigue `ink` y el
         `brand` va **solo como subrayado** (R26 lo prohíbe como texto sobre `paper`).
      3. **Hairline de progreso**: `.header-progress`, una línea `brand` de 2px al pie de la barra
         que crece con el scroll vía `animation-timeline: scroll(root)` (`transform: scaleX`, CSS
         puro). Conecta el header con la narrativa de línea de tiempo (D32); sin soporte o con
         reduced-motion queda invisible (no estorba, R34).
      **Estado:** implementado por `nextjs-builder`; `tsc`, ESLint y `next build` **en verde**. Sigue
      en modo diseño (D39); el gate de Fase 5 debe verificar contraste del estado activo en ambos
      temas, que el scrollspy no rompa la navegación por teclado y el INP de la isla.

- **D50.** 22/09 (noche), Lorena notó que **el hueco inferior del hero era mayor que el superior**.
      Causa: el hero va `-mt-20` (80px por detrás del header) pero el contenedor centraba el
      contenido sin compensar ese recorte → el bloque quedaba ~24px alto. Se fija
      **`pt − pb = 80px`** (la altura exacta del header) en ambos breakpoints
      (`pt-36 pb-16` / `lg:pt-40 lg:pb-20`), que centra el bloque en el área **visible**. Además se
      unifica el ritmo interno: `support → quick-nav` pasa de `mt-16` a `mt-10` en móvil (el `lg`
      queda en `mt-12`), para que acompañe al ritmo `sub → CTA`. Solo `Hero.tsx`; server component,
      sin copy ni colores. `tsc`, ESLint y `next build` en verde.

- **D51.** 22/09 (noche), pedido de Lorena: **variante A** — anclar el quick-nav del hero como
      **fila de salida** al pie, separada del bloque principal. Antes de experimentar se creó el
      **commit de checkpoint `b796176`** ("adaptive header, unified CTA and hero polish D41–D50")
      para poder volver exacto al diseño aprobado con `git revert`.
      1. La `<section>` del hero pasa a **columna flex a viewport** (`flex min-h-svh flex-col`) y el
         bloque principal (`H1 → sub → CTA → support → meta`) queda en **`flex-1` centrado**.
      2. El quick-nav sale del bloque centrado y pasa a su propio `page-container` + `<nav>` con
         `border-t border-white/12 py-5`, **entre la hairline propia y la del ticker** → banda de
         salida. Sigue siendo `<nav>` real (R42) con anclas descriptivas (R43/R44) y el Discord el
         único botón (R11); los `href` no cambian, así que el **scrollspy del header sigue
         funcionando**.
      3. **Grid de fondo intacto** (4rem, `field-drift` 4rem/28s, `-inset-16`) y ticker sin cambios,
         según lo pedido.
      **Estado:** implementado por `nextjs-builder`; `tsc`, ESLint y `next build` **en verde**. Sigue
      en modo diseño (D39); el gate de Fase 5 debe evaluar el hero en 360/768/1024/1440 (que la
      fila de salida no apriete en móvil, donde los 4 anclas pueden pasar a 2 líneas) y confirmar la
      jerarquía H1→CTA.

- **D52.** 22/09 (noche), Lorena: la fila de salida del hero no le gusta; prefiere que el hero
      **cierre con la banda del ticker** (el marquee animado). Se **elimina el quick-nav** del hero
      (y con él `QUICK_LINK_HREFS`/`quickLinks`, el import de `Link`/`navItems` y la clave
      `a11y.quickNavLabel` de `content.ts`/`es.json`, sin texto muerto). Los enlaces de sección
      viven solo en el header. El hero queda: bloque principal centrado (`flex-1`) y **ticker como
      último hijo** de la `<section>`. Grid de 4rem y decorativos intactos. Supersede la variante A
      de D51. `tsc`, ESLint y `next build` en verde.

## Preguntas abiertas (antiguas, contexto histórico)

- [ ] QA-P2. ¿Propiedad del código tras el concurso? (define LICENSE y restricción de plantilla)
      → Las bases no declaran cesión; premian "crédito visible" (D233). **Se mantiene sin LICENSE (D5).**
- [ ] QA-P5. ¿Límites de peso de repo/bundle? → Las bases no lo dicen; se aplica gate CWV interno.
