/** Description para meta: descarta plantillas con corchetes. */
export function metaDescripcion(
  texto: string | undefined,
  respaldo: string,
): string {
  if (!texto || texto.includes("[")) return respaldo;
  const limpio = texto.trim();
  if (limpio.length <= 160) return limpio;
  return `${limpio.slice(0, 157).trimEnd()}…`;
}

export function tituloSeccion(seccion: string): string {
  return `${seccion} · Ser, Mujer`;
}
