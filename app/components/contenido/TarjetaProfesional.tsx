import { Boton } from "~/components/ui/Boton";
import { Etiqueta } from "~/components/ui/Etiqueta";
import { cn } from "~/components/ui/cn";
import type { Profesional } from "~/content/types";

export type TarjetaProfesionalProps = {
  profesional: Profesional;
  /** `compacta` = fila del detalle de evento (sin chips, siempre «Ver perfil»). */
  variante?: "completa" | "compacta";
  className?: string;
};

function Avatar({
  nombre,
  imagen,
  actual,
  tamano,
}: {
  nombre: string;
  imagen?: string;
  actual?: boolean;
  tamano: "completo" | "compacto";
}) {
  const tieneImagen = Boolean(imagen?.trim());
  const tamanoClase =
    tamano === "compacto"
      ? "size-16 shrink-0 lg:size-[72px]"
      : "size-[76px] shrink-0 lg:size-24";

  if (tieneImagen) {
    return (
      <img
        src={imagen}
        alt=""
        className={cn(tamanoClase, "rounded-full object-cover")}
      />
    );
  }

  if (actual) {
    return (
      <div
        role="img"
        aria-label={`Espacio para foto de ${nombre}`}
        className={cn(
          tamanoClase,
          "flex items-center justify-center rounded-full bg-durazno text-[13px] font-semibold text-bahia",
        )}
      >
        [FOTO]
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        tamanoClase,
        "box-border rounded-full border-[1.5px] border-dashed border-bahia",
      )}
    />
  );
}

function Compacta({
  profesional,
  className,
}: {
  profesional: Profesional;
  className?: string;
}) {
  const { nombre, rol, imagen, actual } = profesional;

  return (
    <article
      className={cn(
        "flex items-center gap-3.5 rounded-tarjeta bg-blanco px-4 py-3.5 text-bahia lg:gap-[18px] lg:px-[22px] lg:py-[18px]",
        className,
      )}
    >
      <Avatar
        nombre={nombre}
        imagen={imagen}
        actual={actual ?? true}
        tamano="compacto"
      />
      <div className="flex min-w-0 flex-col gap-0.5 text-[15px] leading-[23px] lg:gap-0">
        <div className="font-semibold">{nombre}</div>
        <div className="lg:inline">
          <span>{rol}</span>
          <span className="hidden lg:inline">
            {" "}
            ·{" "}
            <Boton
              variante="texto"
              href="/quien-soy"
              className="inline px-0 min-h-0 py-0 align-baseline text-[15px]"
              tamano="pequeno"
            >
              Ver perfil
            </Boton>
          </span>
        </div>
        <Boton
          variante="texto"
          href="/quien-soy"
          className="self-start px-0 min-h-0 py-0 text-[15px] lg:hidden"
          tamano="pequeno"
        >
          Ver perfil
        </Boton>
      </div>
    </article>
  );
}

export function TarjetaProfesional({
  profesional,
  variante = "completa",
  className,
}: TarjetaProfesionalProps) {
  if (variante === "compacta") {
    return <Compacta profesional={profesional} className={className} />;
  }

  const { nombre, rol, servicios, imagen, actual } = profesional;

  if (actual) {
    return (
      <article
        className={cn(
          "flex flex-row items-center gap-4 rounded-tarjeta bg-blanco p-5 text-bahia lg:flex-col lg:items-start lg:gap-3 lg:p-8",
          className,
        )}
      >
        <Avatar nombre={nombre} imagen={imagen} actual tamano="completo" />
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
      <Avatar nombre={nombre} imagen={imagen} tamano="completo" />
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
