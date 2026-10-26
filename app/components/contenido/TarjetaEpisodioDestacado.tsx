import { Link } from "react-router";

import { EtiquetaSeccion } from "~/components/ui/EtiquetaSeccion";
import type { Episodio } from "~/content/types";
import { cn } from "~/components/ui/cn";

export type TarjetaEpisodioDestacadoProps = {
  episodio: Episodio;
  /** Enlace bajo el reproductor (p. ej. lista completa). */
  enlaceTodos?: { label: string; href: string };
  className?: string;
};

export function TarjetaEpisodioDestacado({
  episodio,
  enlaceTodos,
  className,
}: TarjetaEpisodioDestacadoProps) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-[1240px] flex-col items-start gap-4 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-[72px] lg:gap-y-12",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="relative size-40 shrink-0 overflow-hidden rounded-[24px] bg-naranja lg:aspect-square lg:size-auto lg:max-w-[300px] lg:flex-[0_1_300px] lg:rounded-[28px]"
      >
        <div className="patron-crema absolute inset-0 opacity-45" />
      </div>

      <div className="flex min-w-0 flex-[1_1_520px] flex-col items-start gap-4 lg:gap-[18px]">
        <EtiquetaSeccion>Podcast · último episodio</EtiquetaSeccion>
        <h2 className="m-0 font-serif text-h2-m font-normal text-bahia lg:text-h2">
          {episodio.titulo}
        </h2>
        <p className="m-0 max-w-[600px] text-bahia">{episodio.descripcion}</p>

        <Link
          to={`/podcast/${episodio.slug}`}
          className="flex w-full max-w-[640px] items-center gap-3.5 rounded-full bg-blanco py-2 pl-2 pr-5 no-underline lg:gap-[18px] lg:py-2.5 lg:pl-2.5 lg:pr-6"
          aria-label={`Escuchar episodio: ${episodio.titulo}`}
        >
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-bahia text-crema lg:size-[52px]">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5.5v13l11-6.5-11-6.5z" />
            </svg>
          </span>
          <span
            aria-hidden="true"
            className="h-1 flex-1 rounded-sm bg-bahia/25"
          />
          <span className="text-sm font-semibold text-bahia">
            {episodio.duracion}
          </span>
        </Link>

        {enlaceTodos != null ? (
          <a
            href={enlaceTodos.href}
            className="inline-flex min-h-11 items-center font-semibold text-bahia underline-offset-[6px] hover:text-bahia-profundo"
          >
            {enlaceTodos.label}
          </a>
        ) : null}
      </div>
    </div>
  );
}
