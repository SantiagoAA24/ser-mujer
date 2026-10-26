# Ser, Mujer · Reglas del proyecto para el agente

Sitio web de Ser, Mujer: acompañamiento, sanación y transformación para mujeres que han vivido abuso físico, emocional o sexual. La seguridad, la privacidad y el tono cuidadoso pesan tanto como el diseño.

## Stack (no cambiar sin preguntar)

- React 19 + TypeScript estricto + React Router v7 en modo framework, con `prerender` para generar HTML estático de cada ruta. Sin servidor propio: el resultado de `npm run build` se publica como sitio estático.
- Tailwind CSS v4. Los tokens viven en `app/styles/tokens.css` (bloque `@theme`). Nunca escribas colores hex sueltos en componentes: usa las clases de los tokens (`bg-crema`, `text-bahia`, etc.).
- Fuentes autoalojadas con `@fontsource/montserrat` (400 y 600) y `@fontsource/noto-serif` (400 y 400 itálica). No cargues Google Fonts desde su CDN: filtra la IP de las visitantes.
- Contenido en `app/content/` como JSON o Markdown con tipos en `app/content/types.ts`.
- Servicios externos (solo cuando se indique): formulario de contacto (Formspree o Web3Forms), agenda y eventos (Cal.com embebido), boletín (Brevo o MailerLite).
- No añadas dependencias nuevas sin proponerlas antes y explicar por qué.

## Rutas

| Ruta | Referencia de diseño |
|---|---|
| `/` | `design/referencia/inicio.*.html` |
| `/como-te-acompanamos` | `como-te-acompanamos.*.html` |
| `/quien-soy` | `quien-soy.*.html` |
| `/testimonios` | `testimonios.*.html` (la sección para el inicio: `testimonios-seccion.*.html`) |
| `/podcast` y `/podcast/:slug` | `podcast.*.html`, `podcast-episodio.*.html` |
| `/recursos` | `recursos.*.html` |
| `/eventos` y `/eventos/:slug` | `eventos.*.html` (vista lista y calendario), `evento-detalle.*.html`, `evento-confirmado.*.html` |
| `/contacto` y `/contacto/enviado` | `contacto.*.html`, `contacto-enviado.*.html` |
| `/agendar` y `/agendar/confirmado` | `agendar.*.html`, `agendar-confirmado.*.html` |
| `/seguridad` | Guía «Cómo navegar con seguridad» (no tiene diseño; usar los componentes existentes) |

Cada página tiene versión `.escritorio.html` (1440 px) y `.movil.html` (390 px). Son UNA sola página responsive: el móvil es el mismo componente con otro layout por breakpoints, no otra ruta.

## Cómo leer las referencias de diseño

- Son archivos de una herramienta de diseño. El marcado HTML y los estilos inline son la fuente de verdad visual: tamaños, espaciados, colores, radios, textos.
- `<sc-for list="{{x}}">` es un bucle, `<sc-if value="{{x}}">` un condicional y `{{x}}` un valor; los datos y la lógica de ejemplo están en el `<script type="text/x-dc">` al final del archivo. Tradúcelos a React (map, condicionales, useState).
- `<x-dc>`, `<helmet>`, `support.js` y `data-props` son de la herramienta: ignóralos.
- Las láminas `sistema-*.html` documentan el sistema de diseño (color, tipografía, componentes, encabezado y pie, Salida rápida, ilustración). Respétalas por encima de cualquier detalle suelto de una página.
- Los textos entre corchetes, como `[NOMBRE]` o `[LÍNEA DE EMERGENCIA LOCAL]`, son datos pendientes. Mantenlos como están y pásalos a `app/content/sitio.json` para reemplazarlos en un solo lugar. Nunca inventes datos reales (precios, nombres, teléfonos, certificaciones, testimonios).

## Sistema de diseño (resumen)

- Texto por defecto Bahía Azul `#46467A` sobre Crema `#F2EBDA`. Sobre Rosa Primavera y Verano Naranja el texto es Bahía Profundo `#2F2F5C`. Sobre Margarita Azul, blanco. Sobre Bahía Azul, crema.
- Prohibido como color de texto: Niebla, Primavera, Durazno y Naranja sobre fondos claros, y Bahía sobre Margarita.
- Verano Naranja se reserva para «Salida rápida» y el botón principal sobre fondos oscuros.
- Títulos en Noto Serif 400; subtítulos, botones y etiquetas en Montserrat 600; párrafos en Montserrat 400. Escala: H1 72/78 (móvil 40/46), H2 44/54 (30/38), H3 30/38 (24/32), H4 20/28. Cuerpo 17 px (móvil 16). Mínimo 14 px para lectura y 13 px solo en etiquetas.
- Botones en píldora, mínimo 44 px de alto (56 px los principales). Anillo de foco: 3 px Margarita Azul con 2 px de separación.
- Degradado con grano solo en la apertura de cada página. El patrón del colibrí nunca va detrás de párrafos (excepción: 10 % sobre Bahía Azul).

## Reglas obligatorias de seguridad y privacidad

1. **Salida rápida** en el encabezado de TODAS las páginas, siempre visible y fuera del menú móvil. Usa `app/lib/salida-rapida.ts`: `window.location.replace(...)`, atajo Esc dos veces y aviso al pasar el cursor o enfocar.
2. Sin analítica con cookies, píxeles ni rastreadores. Si se pide medir, solo algo sin cookies (Plausible o Umami) y preguntando antes.
3. Los reproductores de YouTube y Spotify y el embebido de Cal.com se cargan solo cuando la usuaria pulsa (patrón «fachada»): imagen o botón propio primero, iframe después. YouTube siempre desde `youtube-nocookie.com`.
4. No guardes datos personales en `localStorage`, `sessionStorage` ni en la URL. No registres en consola el contenido de los formularios.
5. Formularios: pide solo lo indispensable, con etiquetas visibles, errores con texto e ícono (no solo color) y `autocomplete="off"` en los datos de contacto.
6. Los títulos de pestaña (`<title>`) y los metadatos deben ser discretos: «Ser, Mujer», sin palabras como «abuso» en el título de la pestaña.

## Accesibilidad (WCAG 2.1 AA)

- HTML semántico: `header`, `nav`, `main`, `footer`, un solo `h1` por página, encabezados en orden.
- Elementos interactivos reales (`a`, `button`, `input` + `label`). Nada de `onClick` en `div`.
- Imágenes decorativas con `alt=""` o `aria-hidden`. Íconos solos con `aria-label`.
- Todo usable con teclado y con `prefers-reduced-motion` respetado.

## Tono de los textos

Español, cercano, respetuoso y sin presión. Los botones invitan («Da el primer paso», «Si quieres, agenda una sesión»), nunca urgen. Copia los textos de las referencias tal cual.

## Forma de trabajar

- Antes de un cambio grande, muestra un plan corto y espera confirmación.
- Cambios pequeños y revisables: una página o un grupo de componentes por vez.
- Al terminar cada tarea ejecuta `npm run typecheck` y `npm run build` y corrige los errores antes de darla por terminada.
- No borres ni reescribas archivos que no estén relacionados con la tarea.
