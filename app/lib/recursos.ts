import type { Tema, TipoRecurso } from "~/content/types";

export function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export const ETIQUETA_TIPO: Record<TipoRecurso, string> = {
  guia: "Guía",
  ejercicio: "Ejercicio",
  audio: "Audio",
};

export const ETIQUETA_TIPO_PLURAL: Record<TipoRecurso, string> = {
  guia: "Guías",
  ejercicio: "Ejercicios",
  audio: "Audios",
};

export const ETIQUETA_TEMA: Record<Tema, string> = {
  sanacion: "Sanación",
  amor: "Amor propio",
  perdon: "Perdón",
  comunidad: "Comunidad",
};

export const ICONO_TIPO: Record<TipoRecurso, string> = {
  guia: "bg-niebla text-bahia",
  ejercicio: "bg-durazno text-bahia",
  audio: "bg-primavera text-bahia-profundo",
};

export type FiltroTipo = "todos" | TipoRecurso;
export type FiltroTema = "todos" | Tema;

export const FILTROS_TIPO: { valor: FiltroTipo; label: string }[] = [
  { valor: "todos", label: "Todos" },
  { valor: "guia", label: "Guías" },
  { valor: "ejercicio", label: "Ejercicios" },
  { valor: "audio", label: "Audios" },
];

export const FILTROS_TEMA: { valor: FiltroTema; label: string }[] = [
  { valor: "todos", label: "Todos" },
  { valor: "sanacion", label: "Sanación" },
  { valor: "amor", label: "Amor propio" },
  { valor: "perdon", label: "Perdón" },
  { valor: "comunidad", label: "Comunidad" },
];
