/** Zona horaria del sitio (Colombia). */
export const ZONA_BOGOTA = "America/Bogota";

type PartesFecha = {
  anio: number;
  mes: number;
  dia: number;
  hora: number;
  minuto: number;
  /** 1 = lunes … 7 = domingo (ISO). */
  diaSemana: number;
};

const partesFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: ZONA_BOGOTA,
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hourCycle: "h23",
  weekday: "short",
});

const mapaSemanaEn: Record<string, number> = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
};

/** Partes de calendario en America/Bogota. */
export function partesEnBogota(fecha: Date): PartesFecha {
  const partes = Object.fromEntries(
    partesFormatter.formatToParts(fecha).map((p) => [p.type, p.value]),
  ) as Record<string, string>;

  return {
    anio: Number(partes.year),
    mes: Number(partes.month),
    dia: Number(partes.day),
    hora: Number(partes.hour),
    minuto: Number(partes.minute),
    diaSemana: mapaSemanaEn[partes.weekday ?? ""] ?? 1,
  };
}

export function ahoraEnBogota(): Date {
  return new Date();
}

/** Clave de día `YYYY-MM-DD` en Bogota. */
export function claveDiaBogota(fecha: Date): string {
  const { anio, mes, dia } = partesEnBogota(fecha);
  return `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
}

export function claveDiaDeInicio(inicioIso: string): string {
  return claveDiaBogota(new Date(inicioIso));
}

export function finEvento(inicioIso: string, duracionMin: number): Date {
  return new Date(new Date(inicioIso).getTime() + duracionMin * 60_000);
}

export function eventoHaPasado(
  inicioIso: string,
  duracionMin: number,
  ahora: Date,
): boolean {
  return finEvento(inicioIso, duracionMin).getTime() <= ahora.getTime();
}

export function eventoEnVivo(
  inicioIso: string,
  duracionMin: number,
  ahora: Date,
): boolean {
  const inicio = new Date(inicioIso).getTime();
  const fin = finEvento(inicioIso, duracionMin).getTime();
  const t = ahora.getTime();
  return inicio <= t && t < fin;
}

export function inicioCaeEnDia(inicioIso: string, claveDia: string): boolean {
  return claveDiaDeInicio(inicioIso) === claveDia;
}

/** Desplaza un mes (1–12) / año; `delta` en meses. */
export function anadirMeses(
  anio: number,
  mes: number,
  delta: number,
): { anio: number; mes: number } {
  const indice = anio * 12 + (mes - 1) + delta;
  return {
    anio: Math.floor(indice / 12),
    mes: (indice % 12) + 1,
  };
}

export type CeldaMes =
  | { tipo: "vacia" }
  | { tipo: "dia"; dia: number; clave: string };

/**
 * Cuadrícula mensual que empieza en lunes.
 * `mes` es 1–12.
 */
export function celdasMes(anio: number, mes: number): CeldaMes[] {
  // Día civil en Bogota: ISO con offset -05:00.
  const isoPrimero = `${anio}-${String(mes).padStart(2, "0")}-01T12:00:00-05:00`;
  const partes = partesEnBogota(new Date(isoPrimero));
  const offsetLunes = partes.diaSemana - 1; // 0 = lunes

  const diasEnMes = new Date(anio, mes, 0).getDate();
  const celdas: CeldaMes[] = [];

  for (let i = 0; i < offsetLunes; i++) {
    celdas.push({ tipo: "vacia" });
  }

  for (let dia = 1; dia <= diasEnMes; dia++) {
    const clave = `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
    celdas.push({ tipo: "dia", dia, clave });
  }

  return celdas;
}

const fmtSemanaCorta = new Intl.DateTimeFormat("es-CO", {
  timeZone: ZONA_BOGOTA,
  weekday: "short",
});

const fmtSemanaLarga = new Intl.DateTimeFormat("es-CO", {
  timeZone: ZONA_BOGOTA,
  weekday: "long",
});

const fmtMesCorto = new Intl.DateTimeFormat("es-CO", {
  timeZone: ZONA_BOGOTA,
  month: "short",
});

const fmtMesLargo = new Intl.DateTimeFormat("es-CO", {
  timeZone: ZONA_BOGOTA,
  month: "long",
});

const fmtHora = new Intl.DateTimeFormat("es-CO", {
  timeZone: ZONA_BOGOTA,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const fmtFechaCorta = new Intl.DateTimeFormat("es-CO", {
  timeZone: ZONA_BOGOTA,
  day: "numeric",
  month: "short",
  year: "numeric",
});

function capitalizar(texto: string): string {
  if (!texto) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function limpiarMes(texto: string): string {
  return texto.replace(/\./g, "").trim();
}

export function formatoDiaSemanaCorto(inicioIso: string): string {
  const raw = fmtSemanaCorta.format(new Date(inicioIso));
  // «mié» / «mie.» → 3 letras sin punto
  return limpiarMes(raw).slice(0, 3);
}

export function formatoDiaSemanaLargo(inicioIso: string): string {
  return capitalizar(fmtSemanaLarga.format(new Date(inicioIso)));
}

export function formatoNumeroDia(inicioIso: string): string {
  return String(partesEnBogota(new Date(inicioIso)).dia);
}

export function formatoMesCorto(inicioIso: string): string {
  return limpiarMes(fmtMesCorto.format(new Date(inicioIso))).slice(0, 3);
}

export function formatoMesLargo(inicioIso: string): string {
  return limpiarMes(fmtMesLargo.format(new Date(inicioIso)));
}

/** Hora estilo «6:00 p. m.». */
export function formatoHora(inicioIso: string): string {
  return fmtHora.format(new Date(inicioIso)).toLowerCase().replace(/\s+/g, " ");
}

/** «5 oct 2026» para tarjetas compactas. */
export function formatoFechaCorta(inicioIso: string): string {
  return fmtFechaCorta.format(new Date(inicioIso));
}

/** «Octubre de 2026». */
export function formatoTituloMes(anio: number, mes: number): string {
  const iso = `${anio}-${String(mes).padStart(2, "0")}-15T12:00:00-05:00`;
  const nombre = capitalizar(formatoMesLargo(iso));
  return `${nombre} de ${anio}`;
}

/** «Miércoles 8 de octubre». */
export function formatoTituloDia(claveDia: string): string {
  const iso = `${claveDia}T12:00:00-05:00`;
  const fecha = new Date(iso);
  const semana = formatoDiaSemanaLargo(iso);
  const { dia } = partesEnBogota(fecha);
  const mes = formatoMesLargo(iso);
  return `${semana} ${dia} de ${mes}`;
}

/** Aria-label de celda: «miércoles 8 de octubre: Título» o «…, sin eventos». */
export function formatoAriaDia(
  claveDia: string,
  tituloEvento?: string,
): string {
  const base = formatoTituloDia(claveDia).toLowerCase();
  if (tituloEvento) return `${base}: ${tituloEvento}`;
  return `${base}, sin eventos`;
}

export function mesActualBogota(ahora: Date = new Date()): {
  anio: number;
  mes: number;
} {
  const { anio, mes } = partesEnBogota(ahora);
  return { anio, mes };
}

export function nombreMesParaConteo(anio: number, mes: number): string {
  const iso = `${anio}-${String(mes).padStart(2, "0")}-15T12:00:00-05:00`;
  return formatoMesLargo(iso);
}
