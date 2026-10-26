export type EventoIcs = {
  /** Título neutro (p. ej. «Cita»), sin el nombre del sitio ni el tema. */
  titulo: string;
  inicio: Date;
  fin: Date;
  descripcion?: string;
  /** Identificador estable del VEVENT; por defecto se genera uno. */
  uid?: string;
};

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Formato UTC `YYYYMMDDTHHMMSSZ` para DTSTART/DTEND/DTSTAMP. */
export function fechaIcsUtc(fecha: Date): string {
  return (
    `${fecha.getUTCFullYear()}${pad2(fecha.getUTCMonth() + 1)}${pad2(fecha.getUTCDate())}` +
    `T${pad2(fecha.getUTCHours())}${pad2(fecha.getUTCMinutes())}${pad2(fecha.getUTCSeconds())}Z`
  );
}

function escaparTextoIcs(texto: string): string {
  return texto
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/**
 * Construye un archivo .ics mínimo (VEVENT) para descargar en el navegador.
 * El SUMMARY debe ser neutro: no incluir el nombre del sitio ni el tema.
 */
export function construirIcs(evento: EventoIcs): string {
  const uid =
    evento.uid ??
    `${fechaIcsUtc(evento.inicio)}-${Math.random().toString(36).slice(2, 10)}@local`;
  const lineas = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Calendario//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${fechaIcsUtc(new Date())}`,
    `DTSTART:${fechaIcsUtc(evento.inicio)}`,
    `DTEND:${fechaIcsUtc(evento.fin)}`,
    `SUMMARY:${escaparTextoIcs(evento.titulo)}`,
  ];

  if (evento.descripcion?.trim()) {
    lineas.push(`DESCRIPTION:${escaparTextoIcs(evento.descripcion.trim())}`);
  }

  lineas.push("END:VEVENT", "END:VCALENDAR");
  return lineas.join("\r\n");
}

/** Descarga un .ics en el navegador sin servidor. */
export function descargarIcs(contenido: string, nombreArchivo = "cita.ics"): void {
  const blob = new Blob([contenido], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = nombreArchivo.endsWith(".ics")
    ? nombreArchivo
    : `${nombreArchivo}.ics`;
  enlace.rel = "noopener";
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  URL.revokeObjectURL(url);
}
