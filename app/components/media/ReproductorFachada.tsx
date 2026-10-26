import { useState, type ReactNode } from "react";

import { cn } from "~/components/ui/cn";

export type ReproductorFachadaProps = {
  /** YouTube video id, or Spotify episode/show embed id. */
  id?: string;
  proveedor: "youtube" | "spotify";
  /** Etiqueta del badge inferior (p. ej. duración). */
  badge?: ReactNode;
  /** Fondo decorativo detrás del botón (patrón, etc.). */
  fondo?: ReactNode;
  ariaLabel?: string;
  className?: string;
  /**
   * Si es true y el id es válido, monta el iframe de inmediato.
   * Usar solo tras un clic explícito de la usuaria (p. ej. play en la lista).
   */
  iniciarActivo?: boolean;
};

function idListo(id: string | undefined): id is string {
  if (!id || id.trim() === "") return false;
  if (id.includes("[")) return false;
  return true;
}

function urlEmbebido(
  proveedor: "youtube" | "spotify",
  id: string,
): string {
  if (proveedor === "youtube") {
    const params = new URLSearchParams({
      autoplay: "1",
      cc_load_policy: "1",
      rel: "0",
    });
    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?${params.toString()}`;
  }
  return `https://open.spotify.com/embed/episode/${encodeURIComponent(id)}`;
}

export function ReproductorFachada({
  id,
  proveedor,
  badge,
  fondo,
  ariaLabel = "Reproducir",
  className,
  iniciarActivo = false,
}: ReproductorFachadaProps) {
  const puedeCargar = idListo(id);
  const [activo, setActivo] = useState(iniciarActivo && puedeCargar);

  return (
    <div
      className={cn(
        "relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[24px] bg-niebla lg:rounded-[28px]",
        className,
      )}
    >
      {activo && puedeCargar ? (
        <iframe
          title={ariaLabel}
          src={urlEmbebido(proveedor, id)}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <>
          {fondo}
          <button
            type="button"
            aria-label={ariaLabel}
            className="relative z-10 inline-flex size-[68px] cursor-pointer items-center justify-center rounded-full border-0 bg-bahia text-crema lg:size-[84px]"
            onClick={() => {
              if (puedeCargar) setActivo(true);
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="lg:h-[30px] lg:w-[30px]"
            >
              <path d="M8 5.5v13l11-6.5-11-6.5z" />
            </svg>
          </button>
          {badge != null ? (
            <div className="absolute bottom-3 left-3 z-10 rounded-full bg-blanco px-3 py-0.5 text-sm font-semibold text-bahia lg:bottom-4 lg:left-5 lg:px-3.5 lg:py-1">
              {badge}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
