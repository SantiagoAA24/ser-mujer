import { brevoFormUrl } from "~/lib/env";

/**
 * Envía un correo al formulario de Brevo (sibforms).
 * No lanza: el fallo de red/CORS no debe bloquear la descarga del recurso.
 * Devuelve true solo si la respuesta HTTP es ok (cuando CORS lo permite).
 */
export async function enviarCorreoBrevo(correo: string): Promise<boolean> {
  const url = brevoFormUrl();
  if (!url) return false;

  const email = correo.trim();
  if (!email) return false;

  const cuerpo = new FormData();
  cuerpo.append("EMAIL", email);

  try {
    const res = await fetch(url, {
      method: "POST",
      body: cuerpo,
      // No enviamos cookies de terceros; solo el correo.
      credentials: "omit",
    });
    return res.ok;
  } catch {
    // CORS opaco o red caída: la descarga ya ocurrió en el llamador.
    return false;
  }
}
