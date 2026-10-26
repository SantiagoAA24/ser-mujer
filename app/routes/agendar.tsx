import { useState } from "react";
import { Link } from "react-router";

import { AgendaEmbebida } from "~/components/agenda/AgendaEmbebida";
import { EtiquetaSeccion } from "~/components/ui/EtiquetaSeccion";
import { Selector } from "~/components/ui/Selector";
import { cn } from "~/components/ui/cn";
import { listarSesiones, obtenerAgenda } from "~/content";

import type { Route } from "./+types/agendar";

export function meta(): ReturnType<Route.MetaFunction> {
  return [
    { title: "Agendar · Ser, Mujer" },
    {
      name: "description",
      content:
        "Agenda una primera conversación confidencial, sin compromiso y a tu ritmo.",
    },
  ];
}

const MODALIDADES = [
  { valor: "virtual", etiqueta: "Virtual (videollamada)" },
  { valor: "presencial", etiqueta: "Presencial" },
] as const;

function IconoCandado({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  );
}

export default function Agendar() {
  const agenda = obtenerAgenda();
  const sesiones = listarSesiones();
  const [tipoSlug, setTipoSlug] = useState(sesiones[0]?.slug ?? "");
  const [modalidad, setModalidad] = useState<string>("virtual");

  const sesionElegida = sesiones.find((s) => s.slug === tipoSlug);
  const calSlug = sesionElegida?.calSlug ?? null;

  return (
    <div id="arriba" className="px-5 py-10 lg:px-14 lg:pb-24 lg:pt-[72px]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 lg:gap-9">
        <div className="flex flex-col gap-3.5 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between lg:gap-x-16 lg:gap-y-4">
          <div className="flex flex-col gap-3.5">
            <EtiquetaSeccion>Agendar una sesión</EtiquetaSeccion>
            <h1 className="m-0 font-serif text-[40px] font-normal leading-[46px] tracking-[-0.01em] text-bahia lg:text-[clamp(40px,4.6vw,64px)] lg:leading-[1.1]">
              Elige un momento{" "}
              <span className="italic">que te quede bien</span>
            </h1>
          </div>
          <p className="m-0 max-w-[420px] text-cuerpo leading-[1.7] text-bahia">
            Puedes cambiar o cancelar tu cita cuando lo necesites, sin dar
            explicaciones.
          </p>
        </div>

        <section
          aria-label="Agenda en línea"
          className="flex flex-col rounded-[28px] bg-blanco p-3 lg:rounded-[32px]"
        >
          <div className="flex flex-col gap-2 px-2 pb-0 pt-2 text-[13px] leading-5 text-bahia lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-6 lg:gap-y-2 lg:px-7 lg:pb-[18px] lg:pt-3.5 lg:text-sm lg:leading-normal">
            <ol className="m-0 hidden list-none flex-wrap gap-x-7 gap-y-2 p-0 font-semibold lg:flex">
              <li>1 · Tipo de sesión</li>
              <li>2 · Día y hora</li>
              <li>3 · Confirmación</li>
            </ol>
            <div className="inline-flex items-center gap-2">
              <IconoCandado className="shrink-0" />
              <span>Reserva segura con {agenda.proveedorAgenda}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-stretch lg:gap-3">
            <fieldset className="m-0 flex flex-1 flex-col gap-2.5 border-0 px-2 py-3 lg:basis-[280px] lg:gap-3 lg:px-6 lg:pb-7 lg:pt-6">
              <legend className="float-left mb-0.5 p-0 font-serif text-2xl leading-8 text-bahia lg:mb-1 lg:text-[26px] lg:leading-[34px]">
                <span className="lg:hidden">1 · Tipo de sesión</span>
                <span className="hidden lg:inline">Tipo de sesión</span>
              </legend>

              <div
                className="flex flex-col gap-2.5 lg:gap-3"
                role="radiogroup"
                aria-label="Tipo de sesión"
              >
                {sesiones.map((sesion) => {
                  const marcado = tipoSlug === sesion.slug;
                  const id = `tipo-${sesion.slug}`;
                  return (
                    <label
                      key={sesion.slug}
                      htmlFor={id}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-2xl border-[1.5px] px-4 py-3.5 lg:gap-3.5 lg:px-[18px] lg:py-4",
                        marcado
                          ? "border-bahia bg-crema"
                          : "border-bahia/35 bg-blanco",
                      )}
                    >
                      <input
                        id={id}
                        type="radio"
                        name="tipo"
                        value={sesion.slug}
                        checked={marcado}
                        onChange={() => setTipoSlug(sesion.slug)}
                        className="mt-0.5 size-[22px] shrink-0 accent-bahia lg:mt-[3px]"
                      />
                      <span>
                        <span className="block font-semibold text-bahia">
                          {sesion.nombre}
                        </span>
                        <span className="block text-[14.5px] leading-[22px] text-bahia lg:text-[15px] lg:leading-[1.5]">
                          {sesion.descripcion} {sesion.duracion}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>

              <Selector
                id="a-mod"
                etiqueta="Modalidad"
                opciones={[...MODALIDADES]}
                value={modalidad}
                onChange={(e) => setModalidad(e.target.value)}
                contenedorClassName="mt-1.5 lg:mt-2"
              />
            </fieldset>

            <div className="flex flex-[1.5] flex-col gap-3 border-t border-bahia/20 px-0.5 py-4 lg:basis-[420px] lg:gap-4 lg:border-l lg:border-t-0 lg:px-6 lg:pb-7 lg:pt-6">
              <h2 className="m-0 font-serif text-2xl font-normal leading-8 text-bahia lg:text-[26px] lg:leading-[34px]">
                <span className="lg:hidden">2 · Día y hora</span>
                <span className="hidden lg:inline">Día y hora</span>
              </h2>
              <AgendaEmbebida calSlug={calSlug} />
            </div>
          </div>
        </section>

        <p className="m-0 px-1 text-[15px] leading-6 text-bahia lg:px-0 lg:text-base lg:leading-normal">
          ¿Ningún horario te sirve o prefieres preguntar antes?{" "}
          <Link
            to="/contacto"
            className="font-semibold underline-offset-[6px] lg:underline-offset-[6px]"
          >
            Escríbenos
          </Link>{" "}
          y lo vemos juntas.
        </p>
      </div>
    </div>
  );
}
