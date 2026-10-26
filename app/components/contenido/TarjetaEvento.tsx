import { Boton } from "~/components/ui/Boton";
import { Etiqueta } from "~/components/ui/Etiqueta";
import { Tarjeta } from "~/components/ui/Tarjeta";
import type { Evento } from "~/content/types";
import { cn } from "~/components/ui/cn";

export type TarjetaEventoProps = {
  evento: Evento;
  className?: string;
};

const mesesCortos = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

function formatearFecha(iso: string): string {
  const [anio, mes, dia] = iso.split("-").map(Number);
  if (!anio || !mes || !dia) return iso;
  return `${dia} ${mesesCortos[mes - 1]} ${anio}`;
}

function etiquetaModalidad(modalidad: Evento["modalidad"]): string {
  return modalidad === "virtual" ? "Virtual" : "Presencial";
}

export function TarjetaEvento({ evento, className }: TarjetaEventoProps) {
  return (
    <Tarjeta
      variante="blanca"
      className={cn(
        "h-full gap-3.5 p-6 lg:gap-3.5 lg:p-8",
        className,
      )}
    >
      <div className="flex flex-wrap gap-2">
        <Etiqueta variante="niebla">Gratuito</Etiqueta>
        <Etiqueta variante="contorno">
          {etiquetaModalidad(evento.modalidad)}
        </Etiqueta>
      </div>
      <p className="m-0 font-semibold text-bahia">
        {formatearFecha(evento.fecha)} · {evento.hora}
      </p>
      <h3 className="m-0 font-serif text-h3-m font-normal text-bahia lg:text-h3">
        {evento.titulo}
      </h3>
      <p className="m-0 flex-1 text-base text-bahia">{evento.descripcion}</p>
      <Boton
        variante="secundario"
        tamano="pequeno"
        href={`/eventos/${evento.slug}`}
        className="mt-1.5 w-full justify-center lg:mt-0 lg:w-auto"
      >
        Quiero participar
      </Boton>
    </Tarjeta>
  );
}
