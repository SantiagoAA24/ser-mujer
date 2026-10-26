# Ser, Mujer · Paso a paso con Cursor (modo Agent)

Cada fase tiene: qué haces tú, el prompt para pegar en el chat de Cursor (modo **Agent**) y cómo comprobar que quedó bien. Haz **una fase por conversación nueva** y un commit al final de cada una.

Convenciones en los prompts: `@archivo` adjunta un archivo al contexto (escribe `@` en el chat y elígelo).

---

## Fase 0 · Preparación (manual, una vez)

1. Instala Node.js LTS (22 o superior), Git y Cursor.
2. Crea una cuenta en GitHub y otra en Cloudflare (o Netlify).
3. En Cursor › Settings:
   - Rules: confirma que lee las reglas del proyecto (`.cursor/rules`).
   - Agent: deja activada la aprobación manual de comandos de terminal al principio; así ves qué instala.
   - Usa los *checkpoints* del chat para deshacer si un cambio sale mal.

## Fase 1 · Crear el proyecto (manual)

```bash
npx create-react-router@latest ser-mujer
cd ser-mujer
git init && git add -A && git commit -m "Proyecto base"
npm i @fontsource/montserrat @fontsource/noto-serif
```

La plantilla de React Router ya trae TypeScript y Tailwind v4. Si no trae Tailwind:
`npm i tailwindcss @tailwindcss/vite` y añade el plugin en `vite.config.ts`.

Copia el contenido de este kit en la raíz del proyecto (respeta las carpetas):
`AGENTS.md`, `.cursor/`, `design/`, `public/assets/`, `public/_headers`, `app/styles/tokens.css`, `app/lib/salida-rapida.ts`, `docs/`.

Abre la carpeta `ser-mujer` en Cursor.

## Fase 2 · Configuración base

**Prompt:**
```
Lee @AGENTS.md. Configura el proyecto según esas reglas:
1. En app/app.css importa tailwindcss y luego app/styles/tokens.css; elimina estilos de la plantilla que choquen.
2. En react-router.config.ts deja ssr: false y prerender con la lista de rutas estáticas de AGENTS.md (más adelante añadiremos las dinámicas).
3. Crea app/routes.ts con todas las rutas de AGENTS.md apuntando a componentes vacíos (solo un h1 con el nombre de la página).
4. En root.tsx: lang="es", <title> por defecto «Ser, Mujer», meta description discreta, favicon con /assets/colibri-azul.png.
5. Añade scripts typecheck, lint y build en package.json si faltan.
Muéstrame el plan antes de escribir.
```
**Comprueba:** `npm run dev`, navega por todas las rutas y `npm run build` sin errores.

## Fase 3 · Layout: encabezado, pie y Salida rápida

**Prompt:**
```
Con @AGENTS.md, @design/referencia/sistema-navegacion.html, @design/referencia/sistema-salida.html
y @app/lib/salida-rapida.ts crea:
- app/components/layout/Encabezado.tsx: fijo arriba, logo (/assets/logo-azul.png, 68 px de alto), navegación principal con la página actual marcada (aria-current), botón Salida rápida a la derecha.
  En móvil (<1024 px): logo, Salida rápida y botón de menú; el menú se abre como panel a pantalla completa (aria-expanded, cierra con Esc, foco atrapado y devuelto al botón).
- app/components/layout/SalidaRapida.tsx: píldora naranja con texto Bahía Profundo, tooltip al hover y al foco con el texto de la lámina, sin confirmación; registra el atajo Esc+Esc en un useEffect.
- app/components/layout/PieCompleto.tsx y PieReducido.tsx según la lámina (el reducido es para formularios y confirmaciones).
- Un layout raíz que use Encabezado y PieCompleto, y un layout para /contacto, /agendar y sus confirmaciones con PieReducido.
Los datos pendientes ([NÚMERO], [@USUARIO], [LÍNEA DE EMERGENCIA LOCAL]...) van en app/content/sitio.json.
```
**Comprueba:** la Salida rápida aparece en todas las rutas; al pulsarla y luego «Atrás» no se vuelve al sitio; Esc dos veces también sale; el menú móvil funciona solo con teclado.

## Fase 4 · Componentes del sistema

**Prompt:**
```
Con @AGENTS.md y @design/referencia/sistema-componentes.html, @design/referencia/sistema-tipografia.html y
@design/referencia/sistema-color.html crea en app/components/ui/:
Boton (primario, secundario, texto; variante sobre-oscuro; tamaños grande 56 y pequeño 44; puede renderizar <a> o <button>),
Etiqueta, Tarjeta (blanca y de color: niebla, primavera, durazno), CampoTexto, AreaTexto, Selector, GrupoOpciones (radio),
Casilla, Aviso (info, exito, aviso, error) y EtiquetaSeccion.
Tipos estrictos, sin colores hex sueltos (solo tokens). Crea también la ruta interna /_sistema (excluida de la navegación y con noindex) que muestre todos los componentes con sus estados, para revisarlos.
```
**Comprueba:** compara `/_sistema` con la lámina de componentes, lado a lado.

## Fase 5 · Contenido tipado

**Prompt:**
```
Crea app/content/ con tipos en types.ts y archivos JSON de ejemplo para: episodios del podcast, eventos, recursos, testimonios y servicios (cómo te acompañamos).
Toma los datos de ejemplo de los <script type="text/x-dc"> de @design/referencia/podcast.escritorio.html, @design/referencia/eventos.escritorio.html,
@design/referencia/recursos.escritorio.html y @design/referencia/testimonios.escritorio.html. Cada elemento con slug.
Marca en cada archivo, con un campo "ejemplo": true, que son datos de muestra.
Crea funciones de lectura en app/content/index.ts. Actualiza react-router.config.ts para prerenderizar /podcast/:slug y /eventos/:slug a partir de esos datos.
```

## Fase 6 · Páginas (una conversación por página)

Plantilla de prompt (cambia los nombres de archivo):
```
Implementa la ruta /  con @AGENTS.md, @design/referencia/inicio.escritorio.html y @design/referencia/inicio.movil.html.
Usa los componentes de app/components/ y los datos de app/content/. Es UNA página responsive: escritorio desde 1024 px, móvil por debajo.
Copia los textos tal cual. Las ilustraciones (formas orgánicas, patrón, degradado) con las clases de tokens.css, como elementos decorativos aria-hidden.
Antes de escribir, enumera las secciones que vas a crear y los componentes nuevos que necesitas.
```
Orden recomendado: inicio → cómo te acompañamos → quién soy → recursos → podcast y episodio → testimonios (incluye la sección reutilizable para el inicio) → eventos, lista y calendario, y detalle → contacto y su confirmación → agendar y su confirmación → /seguridad.

Notas por página:
- **Podcast y testimonios:** pide el patrón «fachada»: el iframe de Spotify o YouTube (youtube-nocookie) solo se monta tras pulsar reproducir.
- **Eventos:** la vista de calendario es la misma ruta con un control Lista/Calendario (estado en la URL con `?vista=calendario` está bien porque no es un dato personal).
- **Recursos:** buscador y filtros en el cliente; el paso del correo es opcional y por ahora solo muestra el formulario (se conecta en la fase 7).
- **Contacto:** el campo de correo o WhatsApp aparece según la opción; «Prefiero no ser contactada» no pide nada.

**Comprueba en cada página:** escritorio a 1440 px y móvil a 390 px en las DevTools, contra las láminas.

## Fase 7 · Servicios externos (sin backend)

Crea primero las cuentas y copia los identificadores en un archivo `.env` (nunca en el código):
`VITE_FORMSPREE_ID`, `VITE_CAL_USUARIO`, `VITE_BREVO_FORM_URL`.

**Prompt:**
```
Con @AGENTS.md conecta:
1. Contacto: envío a Formspree (id en VITE_FORMSPREE_ID) con fetch, estados de envío y error según los Avisos del sistema, y redirección a /contacto/enviado. Incluye un campo trampa (honeypot) contra spam.
2. Agendar: reemplaza el calendario de ejemplo por el embebido inline de Cal.com (usuario en VITE_CAL_USUARIO), cargado solo tras pulsar «Ver horarios disponibles», con colores de marca (brandColor #46467A) y sin abrir ventanas emergentes.
3. Eventos: el botón de inscripción del detalle abre el tipo de evento de Cal.com correspondiente (campo calSlug en el JSON del evento).
4. Recursos: el paso opcional envía el correo al formulario de Brevo y la descarga nunca depende de ese envío.
Actualiza public/_headers (CSP) con los dominios exactos que use cada servicio y explícame cada cambio.
```
**Comprueba:** envía un mensaje de prueba, agenda una cita de prueba y revisa que los correos que llegan sean discretos (remitente y asunto sin el tema).

## Fase 8 · Revisión de accesibilidad, privacidad y rendimiento

**Prompt:**
```
Revisa todo el proyecto contra @AGENTS.md y dame una lista priorizada de problemas, sin corregir todavía:
contraste (según las parejas permitidas), tamaños táctiles de 44 px, orden de encabezados, foco visible, navegación por teclado,
textos alternativos, títulos de pestaña discretos, ausencia de rastreadores y de datos en localStorage, y embebidos cargados solo tras un clic.
```
Luego pide que corrija la lista por partes. Herramientas: Lighthouse en Chrome, la extensión axe DevTools y una pasada completa solo con teclado.

## Fase 9 · Publicar en tu dominio

1. Sube el repositorio a GitHub (privado).
2. En Cloudflare › Workers & Pages › Create › Pages › conecta el repositorio.
   - Build command: `npm run build`
   - Output directory: `build/client`
   - Variables de entorno: las del `.env`.
3. Prueba la URL `*.pages.dev`.
4. Custom domains › añade tu dominio. Si el dominio está en otro registrador, cambia sus DNS a Cloudflare o crea el registro CNAME que te indique.
5. Verifica HTTPS, las cabeceras (securityheaders.com) y que cada ruta cargue directamente (sin pasar por el inicio).

Cada `git push` a la rama principal publica una nueva versión; las ramas generan vistas previas.

## Fase 10 · Antes de anunciar el sitio

- Reemplaza todos los `[CORCHETES]` de `app/content/sitio.json` y los datos con `"ejemplo": true`.
- Define el destino real de la Salida rápida y escribe la guía /seguridad.
- Publica la política de tratamiento de datos (Ley 1581 de 2012) y revisa con un abogado los textos de autorización y las transferencias a servicios fuera de Colombia.
- Haz la prueba con usuarias reales (lista de validación de la revisión de diseño).
