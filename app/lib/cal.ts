import { calUsuario } from "~/lib/env";

const EMBED_SRC = "https://app.cal.com/embed/embed.js";
const BRAND_COLOR = "#46467A";

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, CalApi>;
  q?: unknown[][];
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

let scriptPromise: Promise<void> | null = null;

/**
 * Instala el stub de cola de Cal.com (igual que el snippet oficial)
 * y carga embed.js una sola vez.
 */
function asegurarCal(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Cal solo en el navegador"));
  }

  if (window.Cal?.loaded && scriptPromise) {
    return scriptPromise;
  }

  if (!window.Cal) {
    const Cal = function (...args: unknown[]) {
      const cal = window.Cal as CalApi;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        const s = document.createElement("script");
        s.src = EMBED_SRC;
        s.async = true;
        document.head.appendChild(s);
        cal.loaded = true;
      }
      if (args[0] === "init") {
        const api = function (...inner: unknown[]) {
          (api.q = api.q || []).push(inner);
        } as CalApi;
        api.q = api.q || [];
        const namespace = args[1];
        if (typeof namespace === "string") {
          cal.ns = cal.ns || {};
          cal.ns[namespace] = cal.ns[namespace] || api;
          (cal.ns[namespace].q = cal.ns[namespace].q || []).push(args);
          (cal.q = cal.q || []).push(["initNamespace", namespace]);
        } else {
          (cal.q = cal.q || []).push(args);
        }
        return;
      }
      (cal.q = cal.q || []).push(args);
    } as CalApi;
    Cal.q = [];
    Cal.ns = {};
    window.Cal = Cal;
  }

  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existente = document.querySelector<HTMLScriptElement>(
      `script[src="${EMBED_SRC}"]`,
    );

    const listo = () => {
      // Marcar loaded para que el stub no vuelva a inyectar el script.
      if (window.Cal) window.Cal.loaded = true;
      resolve();
    };

    if (existente) {
      // Si el script ya está en el DOM, esperar a que cargue o resolver ya.
      if ((existente as HTMLScriptElement & { dataset: DOMStringMap }).dataset.loaded === "1") {
        listo();
        return;
      }
      existente.addEventListener("load", () => {
        existente.dataset.loaded = "1";
        listo();
      }, { once: true });
      existente.addEventListener(
        "error",
        () => {
          scriptPromise = null;
          reject(new Error("No se pudo cargar Cal.com"));
        },
        { once: true },
      );
      return;
    }

    const s = document.createElement("script");
    s.src = EMBED_SRC;
    s.async = true;
    s.onload = () => {
      s.dataset.loaded = "1";
      listo();
    };
    s.onerror = () => {
      scriptPromise = null;
      reject(new Error("No se pudo cargar Cal.com"));
    };
    document.head.appendChild(s);
    if (window.Cal) window.Cal.loaded = true;
  });

  return scriptPromise;
}

export type MontarCalInlineOpts = {
  contenedor: HTMLElement;
  calSlug: string;
};

/**
 * Monta el embebido inline de Cal.com en el contenedor.
 * Solo API `inline` (sin modal ni ventanas emergentes).
 */
export async function montarCalInline({
  contenedor,
  calSlug,
}: MontarCalInlineOpts): Promise<void> {
  const usuario = calUsuario();
  if (!usuario) {
    throw new Error("Falta VITE_CAL_USUARIO");
  }

  contenedor.replaceChildren();
  await asegurarCal();

  const Cal = window.Cal;
  if (!Cal) {
    throw new Error("Cal.com no está disponible");
  }

  Cal("init", {
    origin: "https://cal.com",
  });
  Cal("ui", {
    theme: "light",
    hideEventTypeDetails: false,
    styles: {
      branding: {
        brandColor: BRAND_COLOR,
      },
    },
  });
  Cal("inline", {
    elementOrSelector: contenedor,
    calLink: `${usuario}/${calSlug}`,
    config: {
      layout: "month_view",
      theme: "light",
    },
  });
}

/** True si hay usuario de Cal configurado. */
export function calListo(): boolean {
  return Boolean(calUsuario());
}
