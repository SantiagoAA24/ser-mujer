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

/** Tiempo con minutos a dos dígitos (p. ej. «03:20»). */
export function formatearTiempoMmSs(segundos: number): string {
  if (!Number.isFinite(segundos) || segundos < 0) return "00:00";
  const total = Math.floor(segundos);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

/** Convierte «mm:ss» o «m:ss» a segundos. */
export function parseTiempoMmSs(tiempo: string): number {
  const match = tiempo.trim().match(/^(\d+):([0-5]?\d)$/);
  if (!match) return 0;
  const minutos = Number(match[1]);
  const segundos = Number(match[2]);
  if (!Number.isFinite(minutos) || !Number.isFinite(segundos)) return 0;
  return minutos * 60 + segundos;
}

/**
 * Hasta `cantidad` episodios del mismo tema (excluyendo el actual).
 * Si faltan, completa con los más recientes.
 */
export function episodiosRelacionados(
  actual: Episodio,
  todos: Episodio[],
  cantidad = 3,
): Episodio[] {
  const mismosTema = ordenarEpisodiosPorFecha(
    todos.filter((e) => e.tema === actual.tema && e.slug !== actual.slug),
  );
  if (mismosTema.length >= cantidad) {
    return mismosTema.slice(0, cantidad);
  }

  const vistos = new Set(mismosTema.map((e) => e.slug));
  vistos.add(actual.slug);
  const recientes = ordenarEpisodiosPorFecha(todos).filter(
    (e) => !vistos.has(e.slug),
  );
  return [...mismosTema, ...recientes].slice(0, cantidad);
}

/** Fondo de la miniatura de portada / relacionados según el tema. */
export function fondoPortadaTema(tema: Tema): string {
  switch (tema) {
    case "sanacion":
      return "bg-niebla";
    case "amor":
      return "bg-durazno";
    case "perdon":
      return "bg-primavera text-bahia-profundo";
    case "comunidad":
      return "bg-crema";
  }
}

export const EPISODIOS_POR_PAGINA = 6;

export const VELOCIDADES_AUDIO = [1, 1.25, 1.5] as const;

export function etiquetaVelocidad(velocidad: number): string {
  if (velocidad === 1) return "1×";
  if (velocidad === 1.25) return "1,25×";
  if (velocidad === 1.5) return "1,5×";
  return `${String(velocidad).replace(".", ",")}×`;
}
