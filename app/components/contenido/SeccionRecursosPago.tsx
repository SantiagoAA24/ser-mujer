import { sitio } from "~/content";

/**
 * Espacio reservado para programas y recursos de pago.
 * Mientras `mostrarRecursosPago` sea false no se renderiza nada.
 */
export function SeccionRecursosPago() {
  if (!sitio.mostrarRecursosPago) return null;
  // Cuando existan recursos de pago, montar aquí la fila de tarjetas.
  return null;
}
