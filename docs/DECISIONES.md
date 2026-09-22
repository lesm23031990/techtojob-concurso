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

## Preguntas abiertas (para las bases del Discord / organizadores)

- [ ] QA-P1. ¿Idioma de la landing: ES, EN o bilingüe?
- [ ] QA-P2. ¿Propiedad del código tras el concurso? (define LICENSE y restricción de plantilla)
- [ ] QA-P3. ¿Destino de entrega: solo repo GitHub, o deploy público (Vercel/otro)?
- [ ] QA-P4. ¿Se exige (o penaliza) el uso de IA en el desarrollo? ¿Declaración obligatoria?
- [ ] QA-P5. ¿Límites de peso de repo/bundle o dependencias permitidas?
- [ ] QA-P6. ¿Fecha/hora límite exacta y zona horaria?
- [ ] QA-P7. (completar tras leer material-concurso/bases/)
