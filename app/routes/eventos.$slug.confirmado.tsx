import { useState, type FormEvent } from "react";
import {
  data,
  isRouteErrorResponse,
  Link,
  useLoaderData,
} from "react-router";

import { Aviso } from "~/components/ui/Aviso";
import { Boton } from "~/components/ui/Boton";
import { GrupoOpciones } from "~/components/ui/GrupoOpciones";
import { obtenerEvento, sitio } from "~/content";
import {
  etiquetaModalidad,
  formatoPrecio,
} from "~/lib/eventos";
import {
  finEvento,
  formatoFechaEventoLarga,
  formatoHora,
} from "~/lib/fechas";
import { construirIcs, descargarIcs } from "~/lib/ics";

import type { Route } from "./+types/eventos.$slug.confirmado";

export function meta(): ReturnType<Route.MetaFunction> {
  return [
    { title: "Inscripción · Ser, Mujer" },
    {
      name: "description",
      content:
        "Tu inscripción al evento quedó registrada. Revisa los detalles y, si lo deseas, añádelo a tu calendario.",
    },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug ?? "";
  const evento = obtenerEvento(slug);
  if (!evento) {
    throw data("No encontrado", { status: 404 });
  }
  return { evento };
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let titulo = "Error";
  let detalle = "Ha ocurrido un error inesperado.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      titulo = "404";
      detalle = "No se encontró el evento solicitado.";
    } else {
      titulo = "Error";
      detalle = error.statusText || detalle;
    }
  } else if (import.meta.env.DEV && error instanceof Error) {
    detalle = error.message;
  }

  return (
    <div className="mx-auto max-w-[640px] px-4 py-16 lg:px-14 lg:py-24">
      <h1 className="m-0 font-serif text-h2-m font-normal text-bahia lg:text-h2">
        {titulo}
      </h1>
      <p className="mt-3 text-cuerpo text-bahia">{detalle}</p>
      <Link
        to="/eventos"
        className="mt-8 inline-flex min-h-11 items-center font-semibold underline-offset-[6px]"
      >
        Volver a eventos
      </Link>
    </div>
  );
}

const OPCIONES_RECORDATORIO = [
  { valor: "dia", etiqueta: "Un día antes" },
  { valor: "hora", etiqueta: "Una hora antes" },
  { valor: "ninguno", etiqueta: "Prefiero no recibir recordatorio" },
] as const;

export default function EventoConfirmado() {
  const { evento } = useLoaderData<typeof loader>();
  const [recordatorio, setRecordatorio] = useState("dia");
  const [guardado, setGuardado] = useState(false);

  const modalidadLinea = `${etiquetaModalidad(evento.modalidad)}, por ${evento.lugar.toLowerCase()} · ${formatoPrecio(evento.precio)}`;
  const fechaHoraEscritorio = `${formatoFechaEventoLarga(evento.inicio)} · ${formatoHora(evento.inicio)}`;

  function anadirAlCalendario() {
    const inicio = new Date(evento.inicio);
    const fin = finEvento(evento.inicio, evento.duracionMin);
    const ics = construirIcs({
      titulo: sitio.tituloCalendario,
      inicio,
      fin,
      uid: `${evento.slug}@local`,
    });
    descargarIcs(ics, "cita.ics");
  }

  function guardarRecordatorio(e: FormEvent) {
    e.preventDefault();
    // Sin persistir: no localStorage ni datos personales.
    setGuardado(true);
  }

  return (
    <div id="arriba" className="px-4 py-12 lg:px-14 lg:py-20 lg:pb-24">
      <div className="mx-auto flex max-w-[1040px] flex-col gap-3 rounded-[28px] bg-blanco p-3 lg:flex-row lg:flex-wrap lg:items-stretch lg:gap-3 lg:rounded-[32px]">
        <div
          role="status"
          className="flex flex-1 flex-col items-start gap-4 p-6 lg:basis-[420px] lg:p-10 lg:pb-11"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-exito py-1 pl-2.5 pr-4 text-sm font-semibold text-bahia">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="text-exito"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M8 12.5l2.8 2.8L16 9.5" />
            </svg>
            Inscripción confirmada
          </div>

          <h1 className="m-0 font-serif text-[30px] font-normal leading-[38px] text-bahia lg:text-h2 lg:leading-[54px]">
            Tu lugar está reservado.{" "}
            <span className="italic">Qué bueno que vienes.</span>
          </h1>

          <p className="m-0 text-base leading-[26px] text-bahia lg:text-[19px] lg:leading-8">
            Te enviamos el enlace al medio que indicaste. No necesitas preparar
            nada.
          </p>

          <div className="flex w-full flex-col gap-0.5 self-stretch rounded-[18px] bg-crema px-[18px] py-4 lg:gap-1 lg:rounded-[20px] lg:px-6 lg:py-5">
            <div className="font-serif text-[22px] leading-[29px] text-bahia lg:text-2xl lg:leading-8">
              {evento.titulo}
            </div>
            <div className="text-[15px] font-semibold text-bahia lg:text-cuerpo">
              {fechaHoraEscritorio}
            </div>
            <div className="text-[14.5px] text-bahia lg:text-base">
              {modalidadLinea}
            </div>
          </div>

          <Boton
            type="button"
            variante="secundario"
            tamano="pequeno"
            className="mt-1 min-h-[52px] w-full px-7 lg:mt-1 lg:w-auto"
            onClick={anadirAlCalendario}
          >
            Añadir a mi calendario
          </Boton>

          <div className="mt-1 hidden flex-wrap gap-x-4 gap-y-3 lg:mt-0 lg:flex">
            <Boton
              variante="texto"
              href="/eventos"
              tamano="pequeno"
              className="px-2"
            >
              Ver más eventos
            </Boton>
            <Boton
              variante="texto"
              href="/contacto"
              tamano="pequeno"
              className="px-2"
            >
              Cancelar mi inscripción
            </Boton>
          </div>
        </div>

        <form
          onSubmit={guardarRecordatorio}
          className="flex flex-1 flex-col gap-3 rounded-[20px] bg-crema px-4 py-[22px] lg:basis-[340px] lg:gap-3.5 lg:rounded-3xl lg:p-8"
        >
          <GrupoOpciones
            name="recordatorio"
            leyenda={
              <span className="block font-serif text-2xl font-normal leading-8 lg:text-[26px] lg:leading-[34px]">
                ¿Quieres un recordatorio?
                <span className="mt-1 block font-sans text-[14.5px] font-normal leading-[22px] lg:text-[15px]">
                  Es opcional. El mensaje dirá solo «Recordatorio: tu cita de
                  hoy», sin mencionar Ser, Mujer.
                </span>
              </span>
            }
            opciones={[...OPCIONES_RECORDATORIO]}
            valor={recordatorio}
            onChange={(e) => {
              setRecordatorio(e.target.value);
              setGuardado(false);
            }}
            className="[&_label]:min-h-[52px] [&_label]:rounded-xl [&_label]:bg-blanco [&_label]:px-4 [&_label]:py-2 lg:[&_label]:gap-3.5 lg:[&_label]:px-[18px]"
          />

          <Boton
            type="submit"
            variante="primario"
            tamano="pequeno"
            className="mt-1 min-h-[52px] w-full"
          >
            Guardar mi elección
          </Boton>

          {guardado ? (
            <Aviso tono="exito" titulo="Listo">
              Guardamos tu preferencia de recordatorio.
            </Aviso>
          ) : (
            <p className="m-0 hidden text-sm text-bahia lg:block">
              Llega al mismo medio donde enviamos el enlace.
            </p>
          )}
        </form>

        <div className="flex justify-center gap-6 px-0 py-1 pb-2 lg:hidden">
          <Boton variante="texto" href="/eventos" tamano="pequeno">
            Ver más eventos
          </Boton>
          <Boton variante="texto" href="/contacto" tamano="pequeno">
            Cancelar inscripción
          </Boton>
        </div>
      </div>

      <div
        role="note"
        className="mx-auto mt-5 flex max-w-[1040px] gap-3 rounded-2xl border-[1.5px] border-naranja px-4 py-3.5 text-[15px] leading-6 text-bahia lg:gap-3.5 lg:px-5 lg:py-4 lg:text-base"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="mt-0.5 size-[22px] shrink-0"
        >
          <path d="M12 4l9 15.5H3L12 4z" />
          <path d="M12 10v4.5M12 17h.01" />
        </svg>
        <div>
          Si compartes este dispositivo o tu calendario, revisa quién puede ver
          este evento.{" "}
          <Link
            to={sitio.enlaceSeguridad.href}
            className="inline-flex min-h-11 items-center font-semibold underline-offset-4"
          >
            {sitio.enlaceSeguridad.label}
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
