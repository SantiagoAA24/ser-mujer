export type Tema = "sanacion" | "amor" | "perdon" | "comunidad";

export type ModalidadEvento = "virtual" | "presencial";

export type TipoRecurso = "guia" | "ejercicio" | "audio";

export type FormatoRecurso = "PDF" | "Audio";

/** Tokens de color usados en portadas e ilustraciones (sin hex). */
export type TokenColor =
  | "bahia"
  | "bahia-profundo"
  | "crema"
  | "niebla"
  | "primavera"
  | "durazno"
  | "naranja"
  | "margarita"
  | "blanco";

export type FondoServicio = "niebla" | "durazno" | "primavera" | "blanco";

export type Coleccion<T> = {
  ejemplo: boolean;
  items: T[];
};

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

export type Episodio = {
  slug: string;
  numero: number;
  tema: Tema;
  titulo: string;
  duracion: string;
  fecha: string;
  descripcion: string;
};

export type Evento = {
  slug: string;
  fecha: string;
  modalidad: ModalidadEvento;
  titulo: string;
  hora: string;
  lugar: string;
  descripcion: string;
  cupos: string;
  enVivo: boolean;
  cuposCompletos: boolean;
  precio: string;
  calSlug: string;
};

export type Recurso = {
  slug: string;
  tipo: TipoRecurso;
  tema: Tema;
  titulo: string;
  descripcion: string;
  formato: FormatoRecurso;
  detalle: string;
  pideCorreo: boolean;
};

export type PortadaTestimonio = {
  fondo: TokenColor;
  forma1: TokenColor;
  forma2: TokenColor;
  x1: string;
  y1: string;
  x2: string;
  y2: string;
};

export type Testimonio = {
  slug: string;
  tema: Tema;
  titulo: string;
  duracion: string;
  portada: PortadaTestimonio;
  /** Cita del bloque destacado en inicio (placeholder hasta contenido real). */
  cita?: string;
  /** Nombre o inicial mostrada junto a la cita. */
  nombre?: string;
  /** ID de YouTube; si viene entre corchetes no se carga el iframe. */
  youtubeId?: string;
  destacado?: boolean;
};

export type CtaServicio = {
  label: string;
  href: string;
};

export type Servicio = {
  slug: string;
  numero: string;
  titulo: string;
  /** Resumen corto para tarjetas de inicio. */
  resumen: string;
  queEs: string;
  paraQuien: string;
  comoFunciona: string[];
  cta: CtaServicio;
  fondo: FondoServicio;
};
