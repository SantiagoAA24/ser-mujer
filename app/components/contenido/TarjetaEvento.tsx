import { Boton } from "~/components/ui/Boton";
import { Etiqueta } from "~/components/ui/Etiqueta";
import { Tarjeta } from "~/components/ui/Tarjeta";
import { cn } from "~/components/ui/cn";
import type { Evento } from "~/content/types";
import {
  cuposCompletos,
  etiquetaModalidad,
  formatoPrecio,
  textoCupos,
  transmisionUsable,
} from "~/lib/eventos";
import {
  formatoDiaSemanaCorto,
  formatoFechaCorta,
  formatoHora,
  formatoMesCorto,
  formatoMesLargo,
  formatoNumeroDia,
} from "~/lib/fechas";

export type TarjetaEventoProps = {
  evento: Evento;
  /** Compacta = inicio; ampliada = lista / panel del día. */
  variante?: "compacta" | "ampliada";
  /** Solo tras hidratar; si es true, estilo «En vivo». */
  enVivo?: boolean;
  className?: string;
};

function EtiquetaEnVivo() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-naranja py-0.5 pr-3.5 pl-2.5 font-sans text-sm font-semibold text-bahia-profundo">
      <span
        aria-hidden="true"
        className="size-2.5 shrink-0 rounded-full bg-bahia-profundo"
      />
      En vivo
    </span>
  );
}

function CtaAmpliada({
  evento,
  enVivo,
  sobreOscuro,
}: {
  evento: Evento;
  enVivo: boolean;
  sobreOscuro: boolean;
}) {
  if (enVivo) {
    if (transmisionUsable(evento.transmisionUrl)) {
      return (
        <Boton
          variante="primario"
          tamano="grande"
          sobreOscuro
          href={evento.transmisionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 min-h-[52px] w-full justify-center px-7 text-base lg:w-auto"
        >
          Unirme a la transmisión
        </Boton>
      );
    }
    return (
      <Boton
        variante="primario"
        tamano="grande"
        sobreOscuro
        href={`/eventos/${evento.slug}`}
        className="mt-1.5 min-h-[52px] w-full justify-center px-7 text-base lg:w-auto"
      >
        Unirme a la transmisión
      </Boton>
    );
  }

  if (cuposCompletos(evento.cupos)) {
    return (
      <Boton
        variante="secundario"
        tamano="grande"
        sobreOscuro={sobreOscuro}
        href="/contacto"
        className="mt-1.5 min-h-[52px] w-full justify-center px-7 text-base lg:w-auto"
      >
        Avisarme si hay cupo
      </Boton>
    );
  }

  return (
    <Boton
      variante="primario"
      tamano="grande"
      sobreOscuro={sobreOscuro}
      href={`/eventos/${evento.slug}`}
      className="mt-1.5 min-h-[52px] w-full justify-center px-7 text-base lg:w-auto"
    >
      Inscribirme
    </Boton>
  );
}

function Compacta({
  evento,
  className,
}: {
  evento: Evento;
  className?: string;
}) {
  return (
    <Tarjeta
      variante="blanca"
      className={cn("h-full gap-3.5 p-6 lg:gap-3.5 lg:p-8", className)}
    >
      <div className="flex flex-wrap gap-2">
        <Etiqueta variante="niebla">{formatoPrecio(evento.precio)}</Etiqueta>
        <Etiqueta variante="contorno">
          {etiquetaModalidad(evento.modalidad)}
        </Etiqueta>
      </div>
      <p className="m-0 font-semibold text-bahia">
        {formatoFechaCorta(evento.inicio)} · {formatoHora(evento.inicio)}
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

function Ampliada({
  evento,
  enVivo = false,
  className,
}: {
  evento: Evento;
  enVivo?: boolean;
  className?: string;
}) {
  const vivo = enVivo;
  const hora = formatoHora(evento.inicio);
  const mesLargo = formatoMesLargo(evento.inicio);
  const mesCorto = formatoMesCorto(evento.inicio);

  return (
    <article
      className={cn(
        "flex flex-col gap-2.5 rounded-[24px] p-5 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-9 lg:gap-y-5 lg:rounded-[28px] lg:p-7 lg:px-8",
        vivo ? "bg-bahia text-crema" : "bg-blanco text-bahia",
        className,
      )}
    >
      {/* Móvil: fecha + etiquetas/meta */}
      <div className="flex items-start gap-3 lg:contents">
        <div
          className={cn(
            "flex w-[76px] shrink-0 flex-col items-center rounded-2xl px-0 py-3.5 text-center text-bahia lg:w-[104px] lg:rounded-[20px]",
            vivo ? "bg-crema" : "bg-niebla",
          )}
        >
          <div className="text-[13px] font-semibold tracking-[0.08em] uppercase">
            {formatoDiaSemanaCorto(evento.inicio)}
          </div>
          <div className="font-serif text-[32px] leading-[1.05] lg:text-[44px]">
            {formatoNumeroDia(evento.inicio)}
          </div>
          <div className="text-[13px] font-semibold lg:text-sm">
            <span className="lg:hidden">{mesCorto}</span>
            <span className="hidden lg:inline">{mesLargo}</span>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5 lg:hidden">
          <div className="flex flex-wrap gap-2">
            {vivo ? <EtiquetaEnVivo /> : null}
            <span
              className={cn(
                "inline-flex items-center rounded-full border-[1.5px] px-3.5 py-0.5 font-sans text-sm font-semibold",
                vivo ? "border-crema text-crema" : "border-bahia text-bahia",
              )}
            >
              {etiquetaModalidad(evento.modalidad)}
            </span>
          </div>
          <p className="m-0 text-[14.5px] leading-[22px] font-semibold">
            {hora} · {evento.lugar}
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex min-w-0 flex-1 flex-col items-start gap-2 lg:min-w-[480px] lg:basis-[480px] lg:gap-2">
        <div className="hidden flex-wrap gap-2 lg:flex">
          {vivo ? <EtiquetaEnVivo /> : null}
          <span
            className={cn(
              "inline-flex items-center rounded-full border-[1.5px] px-3.5 py-0.5 font-sans text-sm font-semibold",
              vivo ? "border-crema text-crema" : "border-bahia text-bahia",
            )}
          >
            {etiquetaModalidad(evento.modalidad)}
          </span>
        </div>
        <h3 className="m-0 font-serif text-h3-m font-normal lg:text-h3">
          {evento.titulo}
        </h3>
        <p className="m-0 hidden text-base font-semibold lg:block">
          {hora} · {evento.lugar}
        </p>
        <p
          className={cn(
            "m-0 max-w-[640px] text-[15px] leading-6 lg:text-base lg:leading-[1.7]",
            vivo ? "text-crema" : "text-bahia",
          )}
        >
          {evento.descripcion}
        </p>
      </div>

      {/* Precio, cupos, CTA */}
      <div className="flex w-full flex-col items-stretch gap-1.5 lg:w-auto lg:max-w-[240px] lg:flex-none lg:basis-[240px] lg:items-start lg:gap-1.5">
        <div className="flex items-baseline justify-between gap-3 lg:flex-col lg:items-start lg:justify-start">
          <div className="font-serif text-xl leading-[1.2] lg:text-2xl">
            {formatoPrecio(evento.precio)}
          </div>
          <div className="text-sm lg:text-[15px]">{textoCupos(evento.cupos)}</div>
        </div>
        <CtaAmpliada evento={evento} enVivo={vivo} sobreOscuro={vivo} />
      </div>
    </article>
  );
}

export function TarjetaEvento({
  evento,
  variante = "compacta",
  enVivo = false,
  className,
}: TarjetaEventoProps) {
  if (variante === "ampliada") {
    return (
      <Ampliada evento={evento} enVivo={enVivo} className={className} />
    );
  }
  return <Compacta evento={evento} className={className} />;
}
