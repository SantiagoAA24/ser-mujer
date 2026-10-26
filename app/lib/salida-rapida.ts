/**
 * Salida rápida: abandona el sitio en un solo gesto.
 * - location.replace() reemplaza la entrada del historial, así que «Atrás» no regresa aquí.
 * - Atajo: pulsar Esc dos veces en menos de un segundo.
 * - No borra el historial del navegador: eso se explica en /seguridad.
 */

// Cambiar por el sitio neutro definitivo (externo y cotidiano).
export const DESTINO_NEUTRO = "https://www.google.com/search?q=clima";

export function salidaRapida(): void {
  try {
    document.title = "Clima";
    document.body.style.visibility = "hidden";
  } catch {
    /* si algo falla, igual salimos */
  }
  window.location.replace(DESTINO_NEUTRO);
}

/** Registra el atajo Esc + Esc. Devuelve la función para quitarlo (útil en useEffect). */
export function registrarAtajoSalida(ventanaMs = 1000): () => void {
  let ultimo = 0;
  const alPulsar = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    const ahora = Date.now();
    if (ahora - ultimo < ventanaMs) salidaRapida();
    ultimo = ahora;
  };
  window.addEventListener("keydown", alPulsar);
  return () => window.removeEventListener("keydown", alPulsar);
}
