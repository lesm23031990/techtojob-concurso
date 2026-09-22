# 30 · Rúbrica de evaluación ↔ agentes

> Pesos oficiales de D215-D227. "Si hay empate, decide el criterio de diseño" (D227) →
> J1 no se descuida nunca, ni siquiera por rendimiento.

| Criterio | Peso | Agente responsable | Qué lo cubre | Dónde queda la evidencia |
|---|---|---|---|---|
| J1 Diseño y jerarquía visual (logo, paleta) | 25% | `design-ux` (lente) + `nextjs-builder` (ejecución) | `docs/design-system.md`, tokens Tailwind con paleta fija R24, dominio de los 3 colores, uso correcto del verde R26, logo en nav/hero/footer/OG | Revisión design-ux pre-entrega + capturas `docs/qa/screens/` |
| J2 Contenido y mensaje | 25% | Orquestador + Lorena (copy) + `design-ux` | Todas las secciones R11-R21, mensaje del brief (Q1 pendiente), texto específico sin relleno, cero copia del ejemplo orientativo D248 | `specs/10-landing-spec.md` + `messages/es.json` + revisión final de copy |
| J3 Responsive | 15% | `qa-access` | Playwright en 360/768/1024/1440 + prueba en móvil real (manual, Lorena) | `docs/qa/responsive/` (capturas por viewport) |
| J4 Código y estructura | 15% | `nextjs-builder` + `rules-auditor` | HTML semántico R40-R42, componentes por sección, nombres claros en inglés R35, sin código muerto, textos centralizados R36, commits convencionales en inglés | `git log` + `app/` legible + auditoría `docs/qa/` |
| J5 SEO | 10% | `seo-perf` | Metadata API R46-R52, Lighthouse SEO=100, OG verificado en opengraph.xyz, JSON-LD Organization, anclas legibles | `docs/qa/lighthouse/` + volcado opengraph.xyz |
| J6 Accesibilidad y rendimiento | 10% | `qa-access` | Contraste AA (crítico con #84c0bf, R26), alt reales, teclado, labels del formulario newsletter, imágenes optimizadas, CWV | Reportes axe + Lighthouse en `docs/qa/` |

## Reglas transversales (gate de cualquier criterio)

- `rules-auditor` verifica contra `00-checklist-reglas.md` **antes** de dar por cerrada cada fase.
- Entrega (META R01-R05) es binaria: sin repo público + deploy + capturas + Lighthouse antes del
  23/09 23:59 → no se puntúa nada. **Prioridad absoluta del plan.**
- Declaración de uso de IA (R07) en README y mensaje de entrega.

## Matriz riesgo/peso a 1 día del cierre

| Riesgo | Afecta | Mitigación |
|---|---|---|
| Brief (Q1) no recuperado a tiempo | J2 25% | Escribir copy desde D3/D20/D120 + estructura del propio post; marcar como bloqueante para Lorena HOY |
| Logo no descargado (Q2) | J1 25% | Lorena descarga del canal 🎨 RECURSOS HOY; placeholder tipográfico solo como red de seguridad |
| Link Discord (Q3) no obtenido | J2+conversión | Lorena copia la invitación permanente del servidor |
| Deploy no hecho | META total | Vercel desde el día 1 (preview), no al final |
