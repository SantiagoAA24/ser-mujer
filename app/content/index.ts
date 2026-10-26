import episodiosJson from "./episodios.json";
import eventosJson from "./eventos.json";
import recursosJson from "./recursos.json";
import serviciosJson from "./servicios.json";
import testimoniosJson from "./testimonios.json";
import type {
  Coleccion,
  Episodio,
  Evento,
  Recurso,
  Servicio,
  Testimonio,
} from "./types";

export type {
  Coleccion,
  CtaServicio,
  EnlaceSitio,
  Episodio,
  Evento,
  FondoServicio,
  FormatoRecurso,
  ModalidadEvento,
  PortadaTestimonio,
  Recurso,
  Servicio,
  Sitio,
  Tema,
  Testimonio,
  TipoRecurso,
  TokenColor,
} from "./types";

export { sitio } from "./sitio";

const episodios = episodiosJson as Coleccion<Episodio>;
const eventos = eventosJson as Coleccion<Evento>;
const recursos = recursosJson as Coleccion<Recurso>;
const testimonios = testimoniosJson as Coleccion<Testimonio>;
const servicios = serviciosJson as Coleccion<Servicio>;

function porSlug<T extends { slug: string }>(
  items: T[],
  slug: string,
): T | undefined {
  return items.find((item) => item.slug === slug);
}

export function listarEpisodios(): Episodio[] {
  return episodios.items;
}

export function obtenerEpisodio(slug: string): Episodio | undefined {
  return porSlug(episodios.items, slug);
}

export function listarEventos(): Evento[] {
  return eventos.items;
}

export function obtenerEvento(slug: string): Evento | undefined {
  return porSlug(eventos.items, slug);
}

export function listarRecursos(): Recurso[] {
  return recursos.items;
}

export function obtenerRecurso(slug: string): Recurso | undefined {
  return porSlug(recursos.items, slug);
}

export function listarTestimonios(): Testimonio[] {
  return testimonios.items;
}

export function obtenerTestimonio(slug: string): Testimonio | undefined {
  return porSlug(testimonios.items, slug);
}

export function listarServicios(): Servicio[] {
  return servicios.items;
}

export function obtenerServicio(slug: string): Servicio | undefined {
  return porSlug(servicios.items, slug);
}
