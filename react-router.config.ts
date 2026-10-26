import type { Config } from "@react-router/dev/config";
import { listarEpisodios, listarEventos } from "./app/content";

const rutasEstaticas = [
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
  "/_sistema",
] as const;

export default {
  ssr: false,
  prerender: () => [
    ...rutasEstaticas,
    ...listarEpisodios().map((episodio) => `/podcast/${episodio.slug}`),
    ...listarEventos().map((evento) => `/eventos/${evento.slug}`),
  ],
} satisfies Config;
