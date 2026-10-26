import { Boton } from "~/components/ui/Boton";
import { cn } from "~/components/ui/cn";
import type { FondoServicio, Servicio } from "~/content/types";

const fondos: Record<FondoServicio, string> = {
  niebla: "bg-niebla text-bahia",
  durazno: "bg-durazno text-bahia",
  primavera: "bg-primavera text-bahia-profundo",
  blanco: "bg-blanco text-bahia",
};

function clasesPanel(fondo: FondoServicio): string {
  if (fondo === "blanco") {
    return "bg-crema text-bahia";
  }
  if (fondo === "primavera") {
    return "bg-blanco text-bahia";
  }
  return "bg-blanco text-bahia";
}

export type BloqueServicioProps = {
  servicio: Servicio;
  className?: string;
};

export function BloqueServicio({ servicio, className }: BloqueServicioProps) {
  const { id, numero, titulo, queEs, paraQuien, pasos, cta, fondo } = servicio;

  return (
    <article
      id={id}
      className={cn(
        "scroll-mt-24 grid grid-cols-1 gap-2.5 rounded-[28px] px-5 pb-5 pt-7 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-4 lg:rounded-bloque lg:p-12",
        fondos[fondo],
        className,
      )}
    >
      <div className="flex flex-col items-start gap-2.5 lg:gap-4">
        <div
          aria-hidden="true"
          className="font-serif text-[28px] italic leading-none lg:text-4xl"
        >
          {numero}
        </div>
        <h2 className="m-0 font-serif text-h3-m font-normal lg:text-h2">
          {titulo}
        </h2>
        <h3 className="m-0 mt-1.5 font-sans text-lg font-semibold leading-[26px] lg:mt-0 lg:text-h4">
          Qué es
        </h3>
        <p className="m-0 text-base leading-7 lg:flex-1 lg:text-[17px] lg:leading-[1.7]">
          {queEs}
        </p>
      </div>

      <div
        className={cn(
          "mt-2 flex flex-col gap-1.5 rounded-[20px] p-5 lg:row-span-2 lg:mt-0 lg:gap-2.5 lg:rounded-tarjeta lg:p-8",
          clasesPanel(fondo),
        )}
      >
        <h3 className="m-0 font-sans text-lg font-semibold leading-[26px] lg:text-h4">
          Para quién es
        </h3>
        <p className="m-0 mb-2.5 text-base leading-7 lg:mb-3">
          {paraQuien}
        </p>
        <h3 className="m-0 font-sans text-lg font-semibold leading-[26px] lg:text-h4">
          Cómo funciona
        </h3>
        <ol className="m-0 flex list-decimal flex-col gap-1 pl-5 text-base leading-7 lg:gap-1.5">
          {pasos.map((paso) => (
            <li key={paso}>{paso}</li>
          ))}
        </ol>
      </div>

      <Boton
        href={cta.href}
        className="mt-2 w-full justify-center lg:mt-0 lg:w-auto lg:justify-center lg:self-start"
      >
        {cta.texto}
      </Boton>
    </article>
  );
}
