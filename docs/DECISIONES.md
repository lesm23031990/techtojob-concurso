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
      inventan"). Lorena pasó otro invite ([invite-no-oficial-retirado]) pero el brief es fuente oficial → decisión D18.
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

## Preguntas abiertas (antiguas, contexto histórico)

- [ ] QA-P2. ¿Propiedad del código tras el concurso? (define LICENSE y restricción de plantilla)
      → Las bases no declaran cesión; premian "crédito visible" (D233). **Se mantiene sin LICENSE (D5).**
- [ ] QA-P5. ¿Límites de peso de repo/bundle? → Las bases no lo dicen; se aplica gate CWV interno.
