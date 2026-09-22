---
name: evidence-qa
description: Genera y organiza la evidencia de calidad para el entregable del concurso (reportes Lighthouse/axe/Playwright en docs/qa y README del repo). Usar al cerrar cada fase, seccion o release.
---

# Evidencia QA para el entregable

El jurado no ve nuestras sesiones de trabajo: ve el repo. La evidencia en `docs/qa/`
y el README ES el informe de calidad. Si no esta documentado, no existe.

## Convencion de carpetas
```
docs/qa/YYYY-MM-DD/
├── REPORTE.md              # ver estructura abajo
├── lighthouse-<view>.json  # o md resumido si pesa mucho
├── 360.png / 768.png / 1024.png / 1440.png
├── axe.md
└── AUDITORIA-REGLAS.md     # salida de rules-auditor
```

## REPORTE.md minimo
- Commit audita do (`git rev-parse --short HEAD`) y comando de build.
- Tabla Lighthouse: categoria | movil | desktop (objetivo ≥95 AGENTS.md).
- Tabla axe: regla | impact | estado.
- Errores de consola: ninguno = decirlo explicitamente.
- Capturas adjuntas con ruta relativa (renderizan en GitHub).
- Veredicto: PASA / NO PASA + hallazgos priorizados.

## README.md del repo (caras al jurado, se pule en FASE 5)
Estructura objetivo: contexto concurso → stack → capturas (la tabla
"como se ve" con las imagenes de docs/qa) → decisiones tecnicas destacadas
(¿por que SSG, ¿por que content-as-data) → SEO implemented (metadata,
JSON-LD, sitemap: lo que un jurado tech quisiera leer) → a11y y perf con
numeros → como correr local (npm i && npm run dev) → estructura de carpetas.
El README es una pagina de venta del propio trabajo: mismo rigor de copy
que la landing.

## Reglas
- Nunca reemplazar reportes viejos: solo agregar carpeta con nueva fecha
  (el historial de mejora TAMBIEN es evidencia).
- Los numeros sin fecha/commit no valen como prueba.
- Antes de declarar cualquier fase completada: verificar que la evidencia
  de esa fase existe y enlaza desde REPORTE.md.
