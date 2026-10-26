import sitioJson from "./sitio.json";

export type EnlaceSitio = {
  label: string;
  href: string;
};

export type Sitio = {
  nombre: string;
  tagline: string;
  copyrightAnio: number;
  whatsapp: { etiqueta: string; href: string };
  instagram: { etiqueta: string; href: string };
  lineaEmergencia: string;
  navPrincipal: EnlaceSitio[];
  navPie: EnlaceSitio[];
  ctaAgendar: EnlaceSitio;
  salidaRapida: {
    etiqueta: string;
    tooltipTitulo: string;
    tooltipCuerpo: string;
  };
  enlaceSeguridad: EnlaceSitio;
};

export const sitio: Sitio = sitioJson;
