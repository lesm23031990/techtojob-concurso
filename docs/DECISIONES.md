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

## Preguntas abiertas (antiguas, contexto histórico)

- [ ] QA-P2. ¿Propiedad del código tras el concurso? (define LICENSE y restricción de plantilla)
      → Las bases no declaran cesión; premian "crédito visible" (D233). **Se mantiene sin LICENSE (D5).**
- [ ] QA-P5. ¿Límites de peso de repo/bundle? → Las bases no lo dicen; se aplica gate CWV interno.
