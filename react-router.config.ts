import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  prerender: [
    "/",
    "/como-te-acompanamos",
    "/quien-soy",
    "/testimonios",
    "/podcast",
    "/recursos",
    "/eventos",
    "/contacto",
    "/contacto/enviado",
    "/agendar",
    "/agendar/confirmado",
    "/seguridad",
  ],
} satisfies Config;
