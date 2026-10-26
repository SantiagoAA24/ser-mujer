import type { CuposEvento, Evento, ModalidadEvento } from "~/content/types";
import {
  claveDiaDeInicio,
  eventoEnVivo,
  eventoHaPasado,
} from "~/lib/fechas";

export type FiltroModalidad = "todos" | ModalidadEvento;

export const FILTROS_MODALIDAD: { id: FiltroModalidad; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "virtual", label: "Virtuales" },
  { id: "presencial", label: "Presenciales" },
];

const precioFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function formatoPrecio(precio: number | null): string {
  if (precio === null) return "Gratuito";
  return precioFormatter.format(precio);
}

export function textoCupos(cupos: CuposEvento): string {
  if (cupos.total === 0) return "Sin límite de cupos";
  if (cupos.disponibles === 0) return "Cupos completos";
  return `${cupos.disponibles} cupos disponibles de ${cupos.total}`;
}

export function cuposCompletos(cupos: CuposEvento): boolean {
  return cupos.total > 0 && cupos.disponibles === 0;
}

export function etiquetaModalidad(modalidad: ModalidadEvento): string {
  return modalidad === "virtual" ? "Virtual" : "Presencial";
}

/** URL usable (no vacía ni con marcadores entre corchetes). */
export function transmisionUsable(url: string | undefined): url is string {
  if (!url || url.trim() === "") return false;
  if (url.includes("[")) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function filtrarPorModalidad(
  eventos: Evento[],
  filtro: FiltroModalidad,
): Evento[] {
  if (filtro === "todos") return eventos;
  return eventos.filter((e) => e.modalidad === filtro);
}

export function filtrarProximos(eventos: Evento[], ahora: Date): Evento[] {
  return eventos.filter(
    (e) => !eventoHaPasado(e.inicio, e.duracionMin, ahora),
  );
}

export function ordenarPorInicio(eventos: Evento[]): Evento[] {
  return [...eventos].sort((a, b) => a.inicio.localeCompare(b.inicio));
}

export function estaEnVivo(evento: Evento, ahora: Date | null): boolean {
  if (!ahora) return false;
  return eventoEnVivo(evento.inicio, evento.duracionMin, ahora);
}

/** Agrupa eventos por clave de día `YYYY-MM-DD` (Bogota). */
export function agruparPorDia(eventos: Evento[]): Map<string, Evento[]> {
  const mapa = new Map<string, Evento[]>();
  for (const evento of ordenarPorInicio(eventos)) {
    const clave = claveDiaDeInicio(evento.inicio);
    const lista = mapa.get(clave);
    if (lista) lista.push(evento);
    else mapa.set(clave, [evento]);
  }
  return mapa;
}

export function eventosDelMes(
  eventos: Evento[],
  anio: number,
  mes: number,
): Evento[] {
  const prefijo = `${anio}-${String(mes).padStart(2, "0")}`;
  return eventos.filter((e) => claveDiaDeInicio(e.inicio).startsWith(prefijo));
}

export function textoConteo(cantidad: number, nombreMes: string): string {
  if (cantidad === 1) return `1 evento en ${nombreMes}`;
  return `${cantidad} eventos en ${nombreMes}`;
}
