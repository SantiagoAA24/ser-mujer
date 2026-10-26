import { Link, useSearchParams } from "react-router";

import { Boton } from "~/components/ui/Boton";
import {
  obtenerAgenda,
  obtenerSesion,
  sitio,
} from "~/content";
import {
  finEvento,
  formatoFechaEventoLarga,
  formatoHora,
} from "~/lib/fechas";
import { construirIcs, descargarIcs } from "~/lib/ics";

import type { Route } from "./+types/agendar.confirmado";

export function meta(): ReturnType<Route.MetaFunction> {
  return [{ title: "Ser, Mujer" }];
}

function fechaValida(valor: string | null): string | null {
  if (!valor) return null;
  const fecha = new Date(valor);
  if (Number.isNaN(fecha.getTime())) return null;
  return valor;
}

/** «miércoles 14 de octubre» (sin año), en minúscula como la lámina. */
function formatoDiaSinAnio(inicioIso: string): string {
  const largo = formatoFechaEventoLarga(inicioIso);
  // «Miércoles 14 de octubre de 2026» → «miércoles 14 de octubre»
  return largo.replace(/\s+de\s+\d{4}\s*$/, "").toLowerCase();
}

export default function AgendarConfirmado() {
  const [params] = useSearchParams();
  const agenda = obtenerAgenda();

  // Solo tipo y fecha: nunca nombre ni contacto desde la URL.
  const tipoParam = params.get("tipo");
  const fechaParam = fechaValida(params.get("fecha"));

  const sesion =
    (tipoParam ? obtenerSesion(tipoParam) : undefined) ??
    obtenerSesion(agenda.citaEjemplo.tipoSlug) ??
    agenda.items[0];

  const inicioIso = fechaParam ?? agenda.citaEjemplo.inicio;
  const diaHora = `${formatoDiaSinAnio(inicioIso)} · ${formatoHora(inicioIso)}`;
  const sesionLinea = sesion
    ? `${sesion.nombre} · ${sesion.duracion}`
    : "—";

  function anadirAlCalendario() {
    if (!sesion) return;
    const inicio = new Date(inicioIso);
    const fin = finEvento(inicioIso, sesion.duracionMin);
    const ics = construirIcs({
      titulo: sitio.tituloCalendario,
      inicio,
      fin,
      uid: `cita-${sesion.slug}@local`,
    });
    descargarIcs(ics, "cita.ics");
  }

  return (
    <div id="arriba" className="px-5 py-10 lg:px-14 lg:pb-[104px] lg:pt-[88px]">
      <div
        role="status"
        className="mx-auto flex max-w-[980px] flex-col gap-3 rounded-[28px] bg-blanco p-3 lg:flex-row lg:flex-wrap lg:items-stretch lg:gap-3 lg:rounded-[32px]"
      >
        <div className="flex flex-1 flex-col items-start gap-3.5 p-4 pb-2 lg:basis-[420px] lg:gap-[18px] lg:p-11 lg:pb-12">
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
            Cita confirmada
          </div>

          <h1 className="m-0 font-serif text-[30px] font-normal leading-[38px] text-bahia lg:text-h2 lg:leading-[54px]">
            Tu espacio está reservado.{" "}
            <span className="italic">Te esperamos.</span>
          </h1>

          <p className="m-0 text-cuerpo leading-7 text-bahia lg:text-[19px] lg:leading-8">
            No necesitas preparar nada. Llega como estés ese día.
          </p>

          {/* Escritorio: bullets y CTAs antes del aside; móvil: aside primero (orden flex). */}
          <ul className="m-0 hidden list-disc flex-col gap-1.5 py-0 pl-[22px] text-base text-bahia lg:flex">
            <li>
              Te enviamos la confirmación al medio que indicaste, con un texto
              discreto.
            </li>
            <li>
              Si es virtual, el enlace de la videollamada llega en ese mismo
              mensaje.
            </li>
            <li>
              Puedes cambiar o cancelar hasta {agenda.plazoCancelacion} antes,
              sin dar explicaciones.
            </li>
          </ul>

          <div className="mt-2 hidden flex-wrap gap-x-4 gap-y-3 lg:mt-2 lg:flex">
            <Boton
              type="button"
              variante="primario"
              tamano="grande"
              className="min-h-14 px-8"
              onClick={anadirAlCalendario}
            >
              Añadir a mi calendario
            </Boton>
            <Boton
              variante="secundario"
              tamano="grande"
              href="/agendar"
              className="min-h-14 px-8"
            >
              Cambiar o cancelar
            </Boton>
          </div>

          <p className="m-0 hidden text-sm text-bahia lg:block">
            En tu calendario aparecerá con un nombre neutro: «
            {sitio.tituloCalendario}».
          </p>
        </div>

        <aside className="flex flex-1 flex-col gap-3 rounded-[20px] bg-crema px-5 py-[22px] lg:basis-[300px] lg:gap-4 lg:rounded-3xl lg:p-8">
          <h2 className="m-0 font-serif text-2xl font-normal leading-8 text-bahia lg:text-[26px] lg:leading-[34px]">
            Tu cita
          </h2>
          <dl className="m-0 grid grid-cols-[92px_minmax(0,1fr)] gap-x-3 gap-y-1.5 text-[15px] leading-6 text-bahia lg:flex lg:flex-col lg:gap-3 lg:text-base lg:leading-normal">
            <div className="contents lg:block">
              <dt className="font-normal lg:text-[13px] lg:font-semibold lg:uppercase lg:tracking-[0.08em]">
                Sesión
              </dt>
              <dd className="m-0 font-semibold">{sesionLinea}</dd>
            </div>
            <div className="contents lg:block">
              <dt className="font-normal lg:text-[13px] lg:font-semibold lg:uppercase lg:tracking-[0.08em]">
                Día y hora
              </dt>
              <dd className="m-0 font-semibold">{diaHora}</dd>
            </div>
            <div className="contents lg:block">
              <dt className="font-normal lg:text-[13px] lg:font-semibold lg:uppercase lg:tracking-[0.08em]">
                Modalidad
              </dt>
              <dd className="m-0 font-semibold">{agenda.modalidadEjemplo}</dd>
            </div>
            <div className="contents lg:block">
              <dt className="font-normal lg:text-[13px] lg:font-semibold lg:uppercase lg:tracking-[0.08em]">
                Con
              </dt>
              <dd className="m-0 font-semibold">{agenda.acompanante}</dd>
            </div>
            <div className="contents lg:block">
              <dt className="font-normal lg:text-[13px] lg:font-semibold lg:uppercase lg:tracking-[0.08em]">
                <span className="lg:hidden">Código</span>
                <span className="hidden lg:inline">Código de tu cita</span>
              </dt>
              <dd className="m-0 font-semibold">{agenda.codigoEjemplo}</dd>
            </div>
          </dl>
          <div className="mt-1 hidden border-t border-bahia/30 pt-3.5 text-[15px] text-bahia lg:block">
            ¿Surgió algo?{" "}
            <Link
              to="/contacto"
              className="font-semibold underline-offset-4"
            >
              Escríbenos
            </Link>{" "}
            o usa{" "}
            <a
              href={sitio.whatsapp.href}
              className="font-semibold underline-offset-4"
            >
              WhatsApp
            </a>
            .
          </div>
        </aside>

        {/* Bloque móvil: bullets + CTAs + nota (después del aside en el flujo). */}
        <div className="flex flex-col gap-3 px-3 pb-4 pt-3 lg:hidden">
          <ul className="m-0 flex list-disc flex-col gap-1 py-0 pl-5 text-[15px] leading-6 text-bahia">
            <li>
              Te enviamos la confirmación al medio que indicaste, con un texto
              discreto.
            </li>
            <li>Si es virtual, el enlace llega en ese mismo mensaje.</li>
            <li>
              Puedes cambiar o cancelar hasta {agenda.plazoCancelacion} antes,
              sin dar explicaciones.
            </li>
          </ul>
          <Boton
            type="button"
            variante="primario"
            tamano="grande"
            className="mt-1 w-full min-h-14"
            onClick={anadirAlCalendario}
          >
            Añadir a mi calendario
          </Boton>
          <Boton
            variante="secundario"
            tamano="grande"
            href="/agendar"
            className="w-full min-h-14"
          >
            Cambiar o cancelar
          </Boton>
          <p className="m-0 text-sm leading-[22px] text-bahia">
            En tu calendario aparecerá con un nombre neutro: «
            {sitio.tituloCalendario}».
          </p>
        </div>
      </div>

      <div
        role="note"
        className="mx-auto mt-5 flex max-w-[980px] gap-3 rounded-2xl border-[1.5px] border-naranja px-4 py-3.5 text-[15px] leading-6 text-bahia lg:mt-5 lg:gap-3.5 lg:px-5 lg:py-4 lg:text-base"
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
          className="mt-0.5 size-[22px] shrink-0 lg:mt-[3px]"
        >
          <path d="M12 4l9 15.5H3L12 4z" />
          <path d="M12 10v4.5M12 17h.01" />
        </svg>
        <div>
          Si compartes este dispositivo o tu calendario, revisa quién puede ver
          esta cita.{" "}
          <Link
            to={sitio.enlaceSeguridad.href}
            className="font-semibold underline-offset-4"
          >
            {sitio.enlaceSeguridad.label}
          </Link>
          .
        </div>
      </div>

      <p className="mx-auto mt-4 max-w-[980px] px-1 text-[15px] leading-6 text-bahia lg:hidden">
        ¿Surgió algo?{" "}
        <Link to="/contacto" className="font-semibold underline-offset-4">
          Escríbenos
        </Link>{" "}
        o usa{" "}
        <a
          href={sitio.whatsapp.href}
          className="font-semibold underline-offset-4"
        >
          WhatsApp
        </a>
        .
      </p>
    </div>
  );
}
