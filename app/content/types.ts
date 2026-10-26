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
  /**
   * Título neutro para archivos .ics (calendario).
   * Sin el nombre del sitio ni el tema del encuentro.
   */
  tituloCalendario: string;
  /** Plazo de respuesta al formulario de contacto (placeholder hasta definir). */
  tiempoRespuesta: string;
  /** Nombre con el que se firman los mensajes de respuesta. */
  nombreFirma: string;
  /** Cuando sea true, SeccionRecursosPago mostrará programas de pago. */
  mostrarRecursosPago: boolean;
  /** Enlaces al show en plataformas externas (solo texto, sin logos). */
  podcast: {
    spotify: EnlaceSitio;
    apple: EnlaceSitio;
    youtube: EnlaceSitio;
  };
};

export type NotaEpisodio = {
  /** Marca de tiempo en formato mm:ss. */
  tiempo: string;
  texto: string;
};

export type RecursoEpisodio = {
  tipo: string;
  titulo: string;
  descripcion: string;
  href: string;
};

export type LineaTranscripcion = {
  tiempo: string;
  quien: string;
  texto: string;
};

export type Episodio = {
  slug: string;
  numero: number;
  tema: Tema;
  titulo: string;
  duracion: string;
  fecha: string;
  descripcion: string;
  notas: NotaEpisodio[];
  recursos: RecursoEpisodio[];
  transcripcion: LineaTranscripcion[];
  /** Enlace para descargar la transcripción completa. */
  transcripcionHref?: string;
  /** Audio propio (MP3, etc.). Si está, tiene prioridad sobre Spotify. */
  audioUrl?: string;
  /** URL del episodio en Spotify (open.spotify.com/episode/…). */
  spotifyUrl?: string;
};

export type CuposEvento = {
  total: number;
  disponibles: number;
};

export type Evento = {
  slug: string;
  titulo: string;
  /** ISO 8601 con offset, p. ej. 2026-10-08T18:00:00-05:00 */
  inicio: string;
  duracionMin: number;
  modalidad: ModalidadEvento;
  lugar: string;
  /** Resumen corto para tarjetas y listados. */
  descripcion: string;
  /** Texto largo de «De qué se trata». */
  queEs: string;
  /** Bullets de «Cómo será». */
  comoSera: string[];
  /** Slug del profesional en profesionales.json. */
  acompanante: string;
  cupos: CuposEvento;
  /** `null` = gratuito */
  precio: number | null;
  transmisionUrl?: string;
  calSlug?: string;
};

export type Recurso = {
  slug: string;
  tipo: TipoRecurso;
  tema: Tema;
  titulo: string;
  descripcion: string;
  formato: FormatoRecurso;
  detalle: string;
  archivo: string;
  correoOpcional: boolean;
};

/** Índice de composición abstracta de miniatura (0–5). */
export type VarianteMiniatura = 0 | 1 | 2 | 3 | 4 | 5;

export type Testimonio = {
  slug: string;
  tema: Tema;
  titulo: string;
  duracion: string;
  /** Presentación breve del testimonio, sin datos identificables. */
  descripcion: string;
  /** Composición de MiniaturaAbstracta (sin fotos ni fotogramas). */
  variante: VarianteMiniatura;
  /** Cita del bloque destacado legado (placeholder hasta contenido real). */
  cita?: string;
  /** Nombre o inicial mostrada junto a la cita. */
  nombre?: string;
  /** ID de YouTube; si viene entre corchetes no se carga el iframe. */
  youtubeId?: string;
  destacado?: boolean;
};

export type IdServicio = "talleres" | "recursos" | "grupos" | "sesiones";

export type CtaServicio = {
  texto: string;
  href: string;
};

export type Servicio = {
  /** Ancla en la página Cómo te acompañamos (`#talleres`, etc.). */
  id: IdServicio;
  slug: string;
  numero: string;
  titulo: string;
  /** Resumen corto para tarjetas de inicio. */
  resumen: string;
  queEs: string;
  paraQuien: string;
  pasos: string[];
  cta: CtaServicio;
  fondo: FondoServicio;
};

export type Pregunta = {
  pregunta: string;
  respuesta: string;
};

export type HitoTrayectoria = {
  periodo: string;
  titulo: string;
  detalle: string;
};

export type Certificacion = {
  nombre: string;
  entidad: string;
  anio: string;
};

export type Perfil = {
  nombre: string;
  profesion: string;
  presentacion: string[];
  frase: string;
  trayectoria: HitoTrayectoria[];
  enfoque: string;
  certificaciones: Certificacion[];
  registro: string;
  /** Ruta o URL de la foto; vacío = placeholder. */
  imagen: string;
};

export type Profesional = {
  slug: string;
  nombre: string;
  rol: string;
  servicios: string[];
  imagen?: string;
  /** Si es true, muestra «Estás viendo este perfil» en lugar del enlace. */
  actual?: boolean;
};
