# Kit de arranque · Ser, Mujer

Archivos para empezar la implementación del sitio con Cursor (modo Agent). Cópialos en la raíz del proyecto creado en la fase 1 de `docs/paso-a-paso.md`.

| Archivo | Para qué sirve |
|---|---|
| `AGENTS.md` | Reglas del proyecto que lee el agente: stack, rutas, sistema de diseño, privacidad, accesibilidad y forma de trabajar. |
| `.cursor/rules/ser-mujer.mdc` | Regla siempre activa en Cursor que remite a `AGENTS.md`. |
| `docs/paso-a-paso.md` | Las fases del proyecto con los prompts listos para pegar. |
| `design/referencia/` | El código fuente limpio de cada lámina del diseño (escritorio y móvil) y del sistema de diseño. Es mucho más liviano y legible para el agente que los HTML exportados. |
| `app/styles/tokens.css` | Colores, tipografías, escala y utilidades (degradado, patrón, forma orgánica) para Tailwind v4. |
| `app/lib/salida-rapida.ts` | Implementación de referencia de la Salida rápida y del atajo Esc + Esc. |
| `public/assets/` | Logo (azul y crema), colibrí del patrón (azul y crema) y textura de grano. |
| `public/_headers` | Cabeceras de seguridad para Cloudflare Pages o Netlify. |

Los HTML exportados (los que pesan 0,6 a 4 MB) guárdalos aparte para mirarlos en el navegador; no los adjuntes al chat de Cursor.

Pendiente fuera del código: el logo en vector (SVG) en sus versiones del manual, el destino de la Salida rápida, los datos entre corchetes y la política de tratamiento de datos.
