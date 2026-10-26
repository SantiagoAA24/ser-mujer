import type { ReactNode } from "react";

import { cn } from "~/components/ui/cn";

export type LlamadoFinalProps = {
  titulo: ReactNode;
  texto: ReactNode;
  /** Hasta dos botones (primario / secundario sobre oscuro). */
  acciones: ReactNode;
  className?: string;
};

export function LlamadoFinal({
  titulo,
  texto,
  acciones,
  className,
}: LlamadoFinalProps) {
  return (
    <section
      className={cn(
        "sobre-oscuro relative overflow-hidden bg-bahia px-5 py-[72px] text-crema lg:px-14 lg:py-[120px]",
        className,
      )}
    >
      <div
        className="patron-crema absolute inset-0 opacity-10"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-[760px] flex-col items-stretch gap-4 text-left lg:items-center lg:gap-[22px] lg:text-center">
        <h2 className="m-0 font-serif text-h2-m font-normal text-crema lg:text-h2">
          {titulo}
        </h2>
        <p className="m-0 max-w-[560px] text-base leading-7 text-crema lg:text-lg lg:leading-8">
          {texto}
        </p>
        <div className="mt-2 flex w-full flex-col flex-wrap items-stretch justify-center gap-4 lg:mt-3 lg:flex-row lg:items-center">
          {acciones}
        </div>
      </div>
    </section>
  );
}
