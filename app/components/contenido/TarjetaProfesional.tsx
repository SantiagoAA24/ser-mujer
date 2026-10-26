import { Boton } from "~/components/ui/Boton";
import { Etiqueta } from "~/components/ui/Etiqueta";
import { cn } from "~/components/ui/cn";
import type { Profesional } from "~/content/types";

export type TarjetaProfesionalProps = {
  profesional: Profesional;
  className?: string;
};

function Avatar({
  nombre,
  imagen,
  actual,
}: {
  nombre: string;
  imagen?: string;
  actual?: boolean;
}) {
  const tieneImagen = Boolean(imagen?.trim());

  if (tieneImagen) {
    return (
      <img
        src={imagen}
        alt=""
        className="size-[76px] shrink-0 rounded-full object-cover lg:size-24"
      />
    );
  }

  if (actual) {
    return (
      <div
        role="img"
        aria-label={`Espacio para foto de ${nombre}`}
        className="flex size-[76px] shrink-0 items-center justify-center rounded-full bg-durazno text-[13px] font-semibold text-bahia lg:size-24"
      >
        [FOTO]
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="size-[76px] shrink-0 rounded-full border-[1.5px] border-dashed border-bahia box-border lg:size-24"
    />
  );
}

export function TarjetaProfesional({
  profesional,
  className,
}: TarjetaProfesionalProps) {
  const { nombre, rol, servicios, imagen, actual } = profesional;

  if (actual) {
    return (
      <article
        className={cn(
          "flex flex-row items-center gap-4 rounded-tarjeta bg-blanco p-5 text-bahia lg:flex-col lg:items-start lg:gap-3 lg:p-8",
          className,
        )}
      >
        <Avatar nombre={nombre} imagen={imagen} actual />
        <div className="flex min-w-0 flex-col gap-1 lg:gap-3">
          <h3 className="m-0 font-serif text-[22px] font-normal leading-[30px] text-bahia lg:text-[26px] lg:leading-[34px]">
            {nombre}
          </h3>
          <div className="text-[15px] font-semibold lg:text-base">{rol}</div>
          {servicios.length > 0 ? (
            <div className="mt-1 hidden flex-wrap gap-2 lg:mt-0 lg:flex">
              {servicios.map((servicio) => (
                <Etiqueta key={servicio} variante="niebla">
                  {servicio}
                </Etiqueta>
              ))}
            </div>
          ) : null}
          <div className="text-sm font-semibold lg:text-[15px]">
            Estás viendo este perfil
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "flex flex-row items-center gap-4 rounded-tarjeta border-[1.5px] border-dashed border-bahia p-5 text-bahia lg:flex-col lg:items-start lg:gap-3 lg:p-8",
        className,
      )}
    >
      <Avatar nombre={nombre} imagen={imagen} />
      <div className="flex min-w-0 flex-col gap-1 lg:gap-3">
        <h3 className="m-0 font-serif text-[22px] font-normal leading-[30px] text-bahia lg:text-[26px] lg:leading-[34px]">
          {nombre}
        </h3>
        <div className="text-[15px] font-semibold lg:text-base">{rol}</div>
        {servicios.length > 0 ? (
          <div className="mt-1 hidden flex-wrap gap-2 lg:mt-0 lg:flex">
            {servicios.map((servicio) => (
              <Etiqueta key={servicio} variante="contorno">
                {servicio}
              </Etiqueta>
            ))}
          </div>
        ) : null}
        <Boton
          variante="texto"
          href="/quien-soy"
          className="self-start px-0"
          tamano="pequeno"
        >
          Ver perfil
        </Boton>
      </div>
    </article>
  );
}
