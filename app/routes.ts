import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("como-te-acompanamos", "routes/como-te-acompanamos.tsx"),
    route("quien-soy", "routes/quien-soy.tsx"),
    route("testimonios", "routes/testimonios.tsx"),
    route("podcast", "routes/podcast.tsx"),
    route("podcast/:slug", "routes/podcast.$slug.tsx"),
    route("recursos", "routes/recursos.tsx"),
    route("eventos", "routes/eventos.tsx"),
    route("eventos/:slug", "routes/eventos.$slug.tsx"),
    route("seguridad", "routes/seguridad.tsx"),
  ]),
  layout("routes/layout-formulario.tsx", [
    route("contacto", "routes/contacto.tsx"),
    route("contacto/enviado", "routes/contacto.enviado.tsx"),
    route("agendar", "routes/agendar.tsx"),
    route("agendar/confirmado", "routes/agendar.confirmado.tsx"),
  ]),
] satisfies RouteConfig;
