import type { ReactNode } from "react";

import { EtiquetaSeccion } from "~/components/ui/EtiquetaSeccion";
import { cn } from "~/components/ui/cn";

export type AperturaProps = {
  etiqueta: string;
  /** Primera línea (o único bloque) del título. */
  titulo: ReactNode;
  /** Parte en cursiva, p. ej. la segunda línea del H1. */
  tituloCursiva?: ReactNode;
  texto: ReactNode;
  acciones: ReactNode;
  nota?: ReactNode;
  ilustracion?: ReactNode;
  className?: string;
};

export function Apertura({
  etiqueta,
  titulo,
  tituloCursiva,
  texto,
  acciones,
  nota,
  ilustracion,
  className,
}: AperturaProps) {
  return (
    <section className={cn("degradado px-5 py-12 lg:px-14 lg:pb-32 lg:pt-28", className)}>
      <div className="mx-auto flex max-w-[1240px] flex-col items-stretch gap-5 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-[72px] lg:gap-y-14">
        <div className="flex flex-[1.4_1_520px] flex-col items-start gap-5 lg:gap-7">
          <EtiquetaSeccion>{etiqueta}</EtiquetaSeccion>
          <h1 className="font-serif text-h1-m font-normal tracking-[-0.01em] text-bahia lg:text-h1 lg:leading-[1.08]">
            {titulo}
            {tituloCursiva != null ? (
              <>
                <br />
                <span className="italic">{tituloCursiva}</span>
              </>
            ) : null}
          </h1>
          <p className="m-0 max-w-[500px] text-[17px] leading-7 text-bahia lg:text-[19px] lg:leading-8">
            {texto}
          </p>
          <div className="mt-2 flex w-full flex-col flex-wrap items-stretch gap-4 lg:mt-3 lg:w-auto lg:flex-row lg:items-center lg:gap-x-7">
            {acciones}
          </div>
          {nota != null ? (
            <p className="m-0 hidden text-sm text-bahia lg:block">{nota}</p>
          ) : null}
        </div>
        {ilustracion != null ? (
          <div className="flex flex-[1_1_380px] justify-center lg:justify-end">
            {ilustracion}
          </div>
        ) : null}
      </div>
    </section>
  );
}
