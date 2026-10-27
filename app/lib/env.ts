/**
 * Lectura tipada de las variables VITE_* de servicios externos.
 * Devuelve null si faltan o parecen placeholder, para deshabilitar UI
 * sin romper el build estático.
 */

function limpia(valor: string | undefined): string | null {
  if (!valor) return null;
  const t = valor.trim();
  if (!t || t.includes("[")) return null;
  return t;
}

/** URL completa del endpoint Formspree, o null. */
export function formspreeUrl(): string | null {
  const id = limpia(import.meta.env.VITE_FORMSPREE_ID);
  if (!id) return null;
  return `https://formspree.io/f/${id}`;
}

/** Usuario de Cal.com (path segment), o null. */
export function calUsuario(): string | null {
  return limpia(import.meta.env.VITE_CAL_USUARIO);
}

/** URL del formulario Brevo (sibforms), o null. */
export function brevoFormUrl(): string | null {
  const url = limpia(import.meta.env.VITE_BREVO_FORM_URL);
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    return url;
  } catch {
    return null;
  }
}
