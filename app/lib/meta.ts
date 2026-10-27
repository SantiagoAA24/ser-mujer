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

/** Palabras que no deben aparecer en el título de la pestaña. */
const PALABRAS_SENSIBLES =
  /\b(abuso|abusos|violaci[oó]n|violaciones|violador[ae]?s?|violento[sa]?s?|violencia|agres[ií]on|agresiones)\b/i;

/**
 * Título de pestaña discreto: «Sección · Ser, Mujer».
 * Si el texto trae palabras sensibles o plantillas, solo «Ser, Mujer».
 */
export function tituloSeccion(seccion: string): string {
  const limpio = seccion.trim();
  if (!limpio || limpio.includes("[") || PALABRAS_SENSIBLES.test(limpio)) {
    return "Ser, Mujer";
  }
  return `${limpio} · Ser, Mujer`;
}
