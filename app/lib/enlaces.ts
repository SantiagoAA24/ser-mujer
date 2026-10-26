/** True si el href se puede usar (no vacío, no «#», sin marcadores `[…]`). */
export function enlaceUsable(href: string | undefined | null): href is string {
  if (href == null) return false;
  const valor = href.trim();
  if (valor === "" || valor === "#") return false;
  if (valor.includes("[")) return false;
  return true;
}
