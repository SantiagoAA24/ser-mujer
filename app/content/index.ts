import episodiosJson from "./episodios.json";
import eventosJson from "./eventos.json";
import perfilJson from "./perfil.json";
import preguntasJson from "./preguntas.json";
import profesionalesJson from "./profesionales.json";
import recursosJson from "./recursos.json";
import serviciosJson from "./servicios.json";
import testimoniosJson from "./testimonios.json";
import type {
  Coleccion,
  Episodio,
  Evento,
  Perfil,
  Pregunta,
  Profesional,
  Recurso,
  Servicio,
  Testimonio,
} from "./types";

export type {
  Certificacion,
  Coleccion,
  CtaServicio,
  CuposEvento,
  EnlaceSitio,
  Episodio,
  Evento,
  FondoServicio,
  FormatoRecurso,
  HitoTrayectoria,
  IdServicio,
  LineaTranscripcion,
  ModalidadEvento,
  NotaEpisodio,
  Perfil,
  Pregunta,
  Profesional,
  Recurso,
  RecursoEpisodio,
  Servicio,
  Sitio,
  Tema,
  Testimonio,
  TipoRecurso,
  TokenColor,
  VarianteMiniatura,
} from "./types";

export { sitio } from "./sitio";

const episodios = episodiosJson as Coleccion<Episodio>;
const eventos = eventosJson as Coleccion<Evento>;
const perfil = perfilJson as Perfil;
const preguntas = preguntasJson as Coleccion<Pregunta>;
const profesionales = profesionalesJson as Coleccion<Profesional>;
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

export function listarProximosEventos(cantidad = 3): Evento[] {
  const ahora = new Date();
  return [...eventos.items]
    .filter((e) => {
      const fin = new Date(e.inicio).getTime() + e.duracionMin * 60_000;
      return fin > ahora.getTime();
    })
    .sort((a, b) => a.inicio.localeCompare(b.inicio))
    .slice(0, cantidad);
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

export function obtenerTestimonioDestacado(): Testimonio | undefined {
  return (
    testimonios.items.find((item) => item.destacado) ?? testimonios.items[0]
  );
}

export function listarServicios(): Servicio[] {
  return servicios.items;
}

export function obtenerServicio(slug: string): Servicio | undefined {
  return porSlug(servicios.items, slug);
}

export function listarPreguntas(): Pregunta[] {
  return preguntas.items;
}

export function obtenerPerfil(): Perfil {
  return perfil;
}

export function listarProfesionales(): Profesional[] {
  return profesionales.items;
}

export function obtenerProfesional(slug: string): Profesional | undefined {
  return porSlug(profesionales.items, slug);
}
