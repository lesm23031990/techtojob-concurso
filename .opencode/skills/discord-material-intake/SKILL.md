---
name: discord-material-intake
description: Procesa el material crudo del concurso TechToJob depositado en material-concurso/ (txt pegados de Discord, capturas, PDFs) y genera las specs y el checklist de reglas. Usar cuando Lorena reporte que ya subio material nuevo al Discord o pide "procesa el material".
---

# Ingesta de material del Discord

Convierte material crudo de Discord en especificaciones verificables. El material
CRUDO nunca se copia literal a `specs/` mas alla de citas puntuales de reglas
(sin usernames ni identificadores de terceros — parafrasear contexto, citar solo
el texto normativo del concurso).

## Procedimiento

1. **Inventario**: listar todo en `material-concurso/` (bases/, criterios/, marca/,
   capturas/). Notar fechas y versiones: si dos versiones de una regla contradicen,
   la mas reciente gana y se documenta el cambio.

2. **Checklist de reglas** → `specs/00-checklist-reglas.md`. Formato tabla:
   `| # | regla (cita textual corta) | tipo: obligatoria/evaluable/negativa/meta | fuente | estado |`
   - tipo META = requisitos del entregable (repo, deploy, formato, fecha).
   - todo vacio informational va a "Preguntas abiertas" al final del archivo.

3. **Spec de la landing** → `specs/10-landing-spec.md`:
   objetivo de conversion, publico, idioma, secciones propuestas (con justificacion
   "regla #N del checklist lo exige" o "criterio UX, NO requerido"), copy disponible
   vs copy a escribir, assets de marca disponibles.

4. **Requisitos tecnicos** → `specs/20-requisitos-tecnicos.md`:
   transcribir umbrales/stack/tests/limites que las bases exijan textualmente.
   Lo que las bases NO dicen NO se inventa: va a preguntas abiertas.

5. **Criterios de evaluacion** → si existe material en criterios/, cruzar:
   cada criterio con peso → que agente del sistema lo cubre y donde queda la evidencia.

6. **Cierre**: actualizar tabla de fases de GUIA.md y escribir en
   `docs/DECISIONES.md` las ambiguedades detectadas como lista de preguntas
   priorizadas para el organizador (si el concurso admite preguntas publicas).

## Regla anti-alucinacion
Toda afirmacion en una spec que no trace a una linea del material o a una decision
en docs/DECISIONES.md, se borra o se marca `[SUPUESTO - CONFIRMAR]`.
