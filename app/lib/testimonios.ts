import type { EtiquetaVariante } from "~/components/ui/Etiqueta";
import type { Tema, TokenColor, VarianteMiniatura } from "~/content/types";
import { ETIQUETA_TEMA, FILTROS_TEMA, type FiltroTema } from "~/lib/recursos";

export { ETIQUETA_TEMA, FILTROS_TEMA, type FiltroTema };

export type PresetMiniatura = {
  fondo: TokenColor;
  forma1: TokenColor;
  forma2: TokenColor;
  x1: string;
  y1: string;
  x2: string;
  y2: string;
};

/** Seis composiciones de la referencia de diseño (índices 0–5). */
export const PRESETS_MINIATURA: Record<VarianteMiniatura, PresetMiniatura> = {
  0: {
    fondo: "margarita",
    forma1: "durazno",
    forma2: "naranja",
    x1: "-6%",
    y1: "48%",
    x2: "78%",
    y2: "12%",
  },
  1: {
    fondo: "niebla",
    forma1: "margarita",
    forma2: "crema",
    x1: "58%",
    y1: "-22%",
    x2: "10%",
    y2: "62%",
  },
  2: {
    fondo: "durazno",
    forma1: "primavera",
    forma2: "naranja",
    x1: "-12%",
    y1: "6%",
    x2: "74%",
    y2: "58%",
  },
  3: {
    fondo: "bahia",
    forma1: "niebla",
    forma2: "primavera",
    x1: "60%",
    y1: "40%",
    x2: "12%",
    y2: "14%",
  },
  4: {
    fondo: "primavera",
    forma1: "crema",
    forma2: "margarita",
    x1: "30%",
    y1: "52%",
    x2: "76%",
    y2: "10%",
  },
  5: {
    fondo: "naranja",
    forma1: "crema",
    forma2: "margarita",
    x1: "-8%",
    y1: "-24%",
    x2: "70%",
    y2: "56%",
  },
};

export const CLASE_TOKEN: Record<TokenColor, string> = {
  bahia: "bg-bahia",
  "bahia-profundo": "bg-bahia-profundo",
  crema: "bg-crema",
  niebla: "bg-niebla",
  primavera: "bg-primavera",
  durazno: "bg-durazno",
  naranja: "bg-naranja",
  margarita: "bg-margarita",
  blanco: "bg-blanco",
};

/** Etiqueta de tema según la lámina de testimonios (comunidad = blanco). */
export function varianteEtiquetaTemaTestimonio(tema: Tema): EtiquetaVariante {
  switch (tema) {
    case "sanacion":
      return "niebla";
    case "amor":
      return "durazno";
    case "perdon":
      return "primavera";
    case "comunidad":
      return "blanco";
  }
}

export function conteoTestimonios(n: number): string {
  return n === 1 ? "1 testimonio" : `${n} testimonios`;
}

export function ariaReproducirTestimonio(
  titulo: string,
  duracion: string,
): string {
  return `Reproducir: ${titulo}, ${duracion} minutos`;
}
