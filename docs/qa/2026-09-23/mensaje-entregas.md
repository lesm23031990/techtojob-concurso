# Mensaje de entrega — Torneo #2 TechToJob

> Pegar en el canal 📦│ENTREGAS (solo con la fecha aún abierta). Adjuntar las capturas + la de Lighthouse.

---

**Entrega final — Torneo #2 (solo, participación individual)**

- **Repo:** https://github.com/lesm23031990/techtojob-concurso
- **Web:** https://techtojob-concurso.vercel.app
- **Capturas:** adjunto escritorio (1440×900 y 1024×800) y móvil (360×800 + tablet 768×1024).
- **Lighthouse (modo móvil):** adjunto captura → **SEO 100 · Best Practices 100 · Accesibilidad 100**.
  Sobre **Performance**: el número sale bajo por la CPU del equipo local — la propia captura lo avisa
  (*"the tested device appears to have a slower CPU than Lighthouse expects"*); en **escritorio marca 97**.
- **Stack:** Next.js (App Router) + TypeScript estricto + Tailwind.
- **IA:** **sí, la usé.** El proyecto se construyó con un sistema multiagente propio (roles de
  especificación, diseño, construcción, SEO y QA) que escribió y auditó el código bajo
  especificaciones derivadas de las bases; la dirección de producto, el copy y la revisión final son
  humanos. Está declarado también en el README.
- **Iconos:** SVG dibujados a mano siguiendo la geometría de **Lucide** (ISC); fuente acreditada en el README.
- **Extra:** se entrega la arquitectura bilingüe ES/EN (`/` en español, `/en` preparado para traducir;
  EN queda `noindex` hasta que exista la traducción). Sitemap, robots, Open Graph 1200×630 y JSON-LD incluidos.

---

### Evidencia (rutas del repo)

- Capturas: `docs/qa/2026-09-23/deploy-desktop-1440.png`, `deploy-desktop-1024.png`,
  `deploy-mobile-360.png`, `deploy-tablet-768.png`
- Lighthouse: `docs/qa/2026-09-23/lighthouse-mobile-capture.png` (+ `.report.html`/`.json`) y
  `lighthouse-desktop.report.html`/`.json`
- Auditoría: `docs/qa/2026-09-23-auditoria-revision.md` · `docs/qa/2026-09-22-rules-audit-1.md`
- Decisiones: `docs/DECISIONES.md`
