# 11 · Contenido — textos definitivos de la landing (ES)

> Redacción propia siguiendo `material-concurso/bases/brief.md`. Verificación anti-copia:
> ninguna frase de este documento aparece en el ejemplo orientativo del brief.
> Reglas aplicadas (D21): tuteo · frases cortas · cero folleto · hablar de la persona ·
> "gratis" solo como tranquilizador · sin promesas ni plazos · sin cifras · "TechToJob" sin espacios.
> CTA único: `https://discord.gg/h9FFgKdkRd` (D18).
> ⚠️ Estos textos pasan por visto bueno de Lorena antes del build (es su voz ante el jurado).

## Metadata (SEO)

- **title** (56): `TechToJob · Comunidad de desarrolladores y empresas tech`
- **description** (155): `TechToJob es una comunidad de desarrolladores y empresas tech en español. Publica tu perfil, participa en torneos, haz networking y entra al Discord ahora.`
- template Next: `title: { default: <title>, template: '%s | TechToJob' }` (R50)

---

## 1 · HERO

- **H1:** `No es un portal de empleo. Es una comunidad.`
- **Sub:** `TechToJob reúne a desarrolladores y empresas tech en español. Aquí construyes, participas y te conocen antes de que exista una vacante.`
- **Botón (único):** `Entrar al Discord de TechToJob`
- **Línea de apoyo (no titular):** `Entrar no cuesta nada. Ni un CV en PDF, ni una espera de semanas.`

> Cumple: qué es (comunidad, no portal), para quién (devs y empresas en español),
> qué ganas (te conocen antes de la vacante), diferenciador en 3 segundos.

## 2 · CÓMO FUNCIONA

- **H2:** `Cómo funciona`
- **Intro:** `Cuatro pasos. Ninguno es mandar un CV al vacío.`
- **Pasos (4):**
  1. `Entras al Discord` — `Un clic y dentro. Sin formularios de registro eternos.`
  2. `Te presentas` — `Tu stack, tu nivel, tu disponibilidad. Las personas del sector lo leen, no un robot.`
  3. `Participas` — `Canales por área, torneos, dudas resueltas en minutos. Aquí se nota que existes.`
  4. `Llega la oportunidad` — `Cuando alguien busca a alguien, acuerdate de quien ya estaba construyendo.`
- **Cierre de sección:** `Las oportunidades salen de participar, no de rellenar formularios.`

## 3 · AUDIENCIAS — TALENTO + EMPRESAS *(sección split, D75/D76)*

- **H2 de sección (nuevo, aprobado por Lorena):** `Para quien busca empleo y para quien contrata`
- **Intro de sección (nueva, D76, foco SEO):** `Dos caminos dentro de la misma comunidad de desarrolladores y empresas tech en español: publica tu perfil si buscas empleo, o encuentra talento si contratas.`
- **Bloque izquierdo · badge:** `1` · **icono:** lupa/código (Lucide `code`, decorativo)
- **Bloque izquierdo · eyebrow:** `Para desarrolladores`
- **Bloque izquierdo · H3:** `Ofrécete como talento`
- **Bloque izquierdo · copy:** `Publica tu perfil con tu stack, tu nivel y qué buscas. Las empresas de la comunidad lo consultan cuando necesitan a alguien y te escriben directamente. Aquí no hay filtro automático que te descarte antes de que una persona te lea. No hace falta ser senior. Y participar no te cuesta nada.`
- **Bloque izquierdo · CTA:** `Crear perfil de talento` (variante rellena `brand`; enlaza a `#unete`)
- **Bloque izquierdo · lista escaneable (D76):** `Tu stack` · `Tu nivel` · `Tu disponibilidad`
- **Bloque derecho · badge:** `2` · **icono:** edificio (Lucide `building-2`, decorativo)
- **Bloque derecho · eyebrow:** `Para empresas`
- **Bloque derecho · H3:** `Publica como empresa`
- **Bloque derecho · copy:** `Cuenta lo que buscas y accede a los perfiles de la comunidad. Aquí ves a la gente participar, construir y resolver antes de llamar a nadie a una entrevista. Menos cribar CVs a ciegas, más contexto real.`
- **Bloque derecho · CTA:** `Buscar talento real` (variante outline hairline; enlaza a `#unete`)
- **Bloque derecho · lista escaneable (D76):** `Publica lo que buscas` · `Accede a los perfiles` · `Contexto real, no solo CV`

> Fusión D75: antes eran dos secciones apiladas (`#talento` R13 y `#empresas` R14); ahora una
> sola `<section id="talento">` con dos `<article>` (la celda derecha lleva `id="empresas"`), para
> que se lean como dos caminos paralelos y no como un flujo lineal.
>
> CTA (D76): las acciones ("crear perfil", "buscar talento") ocurren dentro del Discord y **no hay
> backend** (AGENTS.md). Para que la sección no sea un callejón sin salida, cada botón es un **ancla
> in-page a `#unete`** (el bloque con el CTA real al Discord): no sale de la página ni finge destino
> (R43). El CTA único de conversión del sitio sigue siendo el del hero/cierre (R11).

## 4 · TORNEOS *(sección ampliada en D71/D72 — torneo real + maqueta declarada)*

- **H2:** `Torneos`
- **Copy:** `De vez en cuando, la comunidad juega: un reto real, entregas abiertas y un jurado con criterios públicos. Sirven para aprender, para tener algo que enseñar en tu próxima entrevista y para que te conozcan. Lo que gana se usa de verdad. Esta misma web salió de uno.`
- **Etiqueta de ejemplo (inline, D73):** chip `Ejemplo` (`ember`/`ink`) junto al rótulo de los bloques "El botín" y "Salón de la fama". Sustituye a la nota al pie.
- **Pilar 1 · Torneo en curso (real, D72):** `Torneo #2 — la landing de TechToJob` — `Diseña y construye esta landing con Next.js, TypeScript y Tailwind. Solo frontend y SEO.` · estado `Abierto a cualquiera del servidor` · CTA `Entrar al Discord` (enlace único, R11/R44).
- **Pilar 2 · Cierre de entregas (real, estático, D72):** titular `Miércoles 23, 23:59 (México) — cierre definitivo jueves 24, 00:00`; nota `Cerramos cuando sea medianoche en México, que es el último en cerrar.`; tabla de husos: México `jue 24 · 00:00` · Colombia/Perú/Ecuador `01:00` · Venezuela/Bolivia `02:00` · Argentina/Uruguay/Chile `03:00` · Canarias `07:00` · España peninsular `08:00`. **Sin contador vivo** (hoy es el cierre; quedaría expirado).
- **Pilar 3 · El botín *(maqueta)*:** `1º — Oportunidad laboral con una empresa de la comunidad` · `2º — Hardware y visibilidad en el servidor`.
- **Pilar 4 · Salón de la fama *(maqueta)*:** `@usuario — Torneo #1 · contratado en una empresa tech` (ejemplo) · estado vacío alternativo: `Todavía no hay ganadores publicados. El próximo puede ser tuyo.`

> ⚠️ **Regla de honestidad:** las bases y el brief prohíben cifras, plazos y promesas de empleo
> inventadas. El torneo y su fecha son **reales** (D72); premios y ganador van marcados **inline** con
> el chip `Ejemplo` (D73) y el CTA sigue siendo Discord. Cuando existan premios/ganadores reales, se
> sustituyen aquí y se retira el chip.

## 5 · NETWORKING

- **H2:** `Networking`
- **Copy:** `Canales por área y gente del sector de verdad. Preguntas que se responden en minutos. Ofertas que alguien comparte porque conoce a quien contrata. Los buenos trabajos muchas veces no se publican: se cuentan. Aquí te enteras.`

## 6 · TESTIMONIOS *(maqueta declarada — ver nota final)*

- **H2:** `Lo que se dice dentro`
- **Sub:** `Testimonios de muestra. Los reales se recogen en el servidor antes de publicar.`
- **Tarjetas (4, cada una con avatar redondo + nombre + rol + frase + hueco de enlace LinkedIn):**
  1. Marta Ruiz · Frontend en Sevilla — `Llevaba meses sin respuesta en portales. Aquí me escribieron dos empresas tras un torneo.`
  2. Diego Fuentes · Junior backend, Bogotá — `Entré sin experiencia y sin título. Me leyeron personas, no filtros.`
  3. Lucía Ortega · CTO, Valencia — `Fichamos a dos devs de la comunidad. Las vi resolver en directo antes de hablar con ellas.`
  4. Andrés Salas · DevOps, Ciudad de México — `Conseguí mi trabajo actual por un canal de networking. Ni lo habían publicado.`

## 7 · NOTICIAS *(3 entradas de ejemplo — maqueta)*

- **H2:** `Noticias`
- **Entradas (categoría · fecha · título · resumen · enlace descriptivo):**
  1. `Comunidad · 15/09/2026 ·` `Canales por área: ya puedes hablar solo con gente de tu stack` — `Frontend, backend, datos, mobile, DevOps… Entra al canal del tuyo desde el Discord.` → `Leer la novedad`
  2. `Torneos · 07/09/2026 ·` `Torneo #2 abierto: la landing de TechToJob se decide a retos` — `Cualquiera del servidor puede participar. El jurado publica criterios. La ganadora se convierte en la web oficial.` → `Ver las bases del torneo`
  3. `Empleo · 01/09/2026 ·` `Cómo leer una oferta antes de que la publiquen` — `Una guía breve sobre el mercado tech en español y por qué estar dentro cambia las reglas.` → `Leer la guía`

## 8 · NEWSLETTER *(franja pre-footer, R19)*

- **H2:** `El parte de la semana, los lunes`
- **Copy:** `Un correo cada lunes con las ofertas nuevas de la comunidad, los torneos que se abren y lo que merecía la pena leer esta semana. Sin relleno y sin spam: te bajas cuando quieras.`
- **Label input:** `Tu correo electrónico`
- **Placeholder:** `tu@correo.com`
- **Botón (dice qué recibes, no "Suscribirse"):** `Quiero el correo de los lunes`
- **Nota bajo formulario:** `Solo un correo a la semana. Nada más.`

## 9 · CIERRE

- **H2:** `Ya sabes cómo funciona. Lo que falta es que entres.`
- **Copy:** `Hay gente del sector al otro lado del enlace, construyendo cosas ahora mismo. La puerta es el Discord.`
- **Botón:** `Entrar al Discord de TechToJob`

## 10 · FOOTER

- **Bloque Talento:** `Cómo funciona` · `Ofrécete como talento` · `Torneos`
- **Bloque Empresas:** `Publica como empresa` · `Torneos`
- **Bloque Comunidad:** `Discord` · `Networking` · `Noticias` · `Newsletter`
- **Bloque Legal:** `Aviso legal` · `Privacidad` (→ nota honesta D19, sin 404)
- **Redes:** LinkedIn `https://www.linkedin.com/company/techtojob/` · X `https://x.com/techtojob` · Instagram `https://www.instagram.com/techtojob`
- **Línea final:** `© 2026 TechToJob — Web del Torneo #2. Diseño y contenido por [NOMBRE/HANDLE DE LORENA — pendiente].`

---

## Estructura `messages/es.json` (claves espejo de este doc)

```
meta.title / meta.description
nav.links.{inicio,comoFunciona,talento,empresas,torneos,networking,testimonios,noticias,newsletter,unete}
hero.{h1,sub,cta,apoyo}
comoFunciona.{h2,intro,pasos[4].{titulo,texto},cierre}
audiencias(h2) · talento.{eyebrow,h2,copy,cta} · empresas.{eyebrow,h2,copy,cta}
torneos.{h2,copy}
networking.{h2,copy}
testimonios.{h2,sub,items[4].{nombre,rol,frase}}
noticias.{h2,items[3].{categoria,fecha,titulo,resumen,cta}}
newsletter.{h2,copy,label,placeholder,boton,nota}
cierre.{h2,copy,cta}
footer.{bloques.{talento,empresas,comunidad,legal}.{titulo,enlaces[]},redes,creditos,legalNota}
discord.url
```

## Checklist de cumplimiento del brief (auto-auditoría)

- [x] Tuteo en todo; cero "usted"/"nuestros usuarios"
- [x] Cero palabras de folleto prohibidas (sinergia, ecosistema, revolucionar, solución integral, potenciar, disrupción)
- [x] "Gratis" no aparece como titular (aparece como "no te cuesta nada" en apoyo/tranquilizador)
- [x] Sin promesas de empleo ni plazos ni cifras
- [x] Sin números de miembros/empresas
- [x] "TechToJob" siempre sin espacios
- [x] Ejemplo orientativo NO copiado (verificado frase a frase)
- [x] Botón newsletter dice qué recibes
- [x] Testimonios y noticias rotulados como muestra en la propia web (honestidad + requisito de maqueta)
- [ ] Pendiente Lorena: nombre/handle para créditos del footer
