import type { EtiquetaVariante } from "~/components/ui/Etiqueta";
import type { Episodio, Tema } from "~/content/types";

const fechaLista = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const fechaLarga = new Intl.DateTimeFormat("es-CO", {
  dateStyle: "long",
});

/** Fecha corta para filas de la lista (p. ej. «28 sep 2026»). */
export function formatoFechaEpisodio(iso: string): string {
  return fechaLista.format(parseFechaLocal(iso));
}

/** Fecha larga para el episodio destacado (p. ej. «28 de septiembre de 2026»). */
export function formatoFechaEpisodioLarga(iso: string): string {
  return fechaLarga.format(parseFechaLocal(iso));
}

function parseFechaLocal(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

/** Más reciente primero; desempate por número de episodio. */
export function ordenarEpisodiosPorFecha(episodios: Episodio[]): Episodio[] {
  return [...episodios].sort((a, b) => {
    const porFecha = b.fecha.localeCompare(a.fecha);
    if (porFecha !== 0) return porFecha;
    return b.numero - a.numero;
  });
}

/** Variante de Etiqueta según el tema (colores de la referencia). */
export function varianteEtiquetaTema(tema: Tema): EtiquetaVariante {
  switch (tema) {
    case "sanacion":
      return "niebla";
    case "amor":
      return "durazno";
    case "perdon":
      return "primavera";
    case "comunidad":
      return "crema";
  }
}

/**
 * Extrae el id de un episodio de Spotify desde una URL
 * (open.spotify.com/episode/… o spotify:episode:…).
 */
export function idEpisodioSpotify(url: string | undefined): string | undefined {
  if (!url || url.trim() === "" || url.includes("[")) return undefined;

  const uri = url.match(/^spotify:episode:([A-Za-z0-9]+)/i);
  if (uri?.[1]) return uri[1];

  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(/\/episode\/([A-Za-z0-9]+)/i);
    return match?.[1];
  } catch {
    return undefined;
  }
}

export function episodioReproducible(episodio: Episodio): boolean {
  if (episodio.audioUrl && !episodio.audioUrl.includes("[")) return true;
  return idEpisodioSpotify(episodio.spotifyUrl) != null;
}

export function formatearTiempo(segundos: number): string {
  if (!Number.isFinite(segundos) || segundos < 0) return "0:00";
  const total = Math.floor(segundos);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export const EPISODIOS_POR_PAGINA = 6;
