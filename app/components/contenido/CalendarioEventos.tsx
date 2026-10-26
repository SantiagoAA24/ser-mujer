import { useEffect, useMemo, useState } from "react";

import { TarjetaEvento } from "~/components/contenido/TarjetaEvento";
import { cn } from "~/components/ui/cn";
import type { Evento } from "~/content/types";
import { agruparPorDia, estaEnVivo } from "~/lib/eventos";
import {
  anadirMeses,
  celdasMes,
  formatoAriaDia,
  formatoTituloDia,
  formatoTituloMes,
} from "~/lib/fechas";

const DIAS_ESCRITORIO = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const DIAS_MOVIL = ["L", "M", "X", "J", "V", "S", "D"];

export type CalendarioEventosProps = {
  eventos: Evento[];
  anio: number;
  mes: number;
  onCambiarMes: (anio: number, mes: number) => void;
  ahora: Date | null;
};

function IconoChevron({ direccion }: { direccion: "izq" | "der" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direccion === "izq" ? (
        <path d="M15 5l-7 7 7 7" />
      ) : (
        <path d="M9 5l7 7-7 7" />
      )}
    </svg>
  );
}

export function CalendarioEventos({
  eventos,
  anio,
  mes,
  onCambiarMes,
  ahora,
}: CalendarioEventosProps) {
  const porDia = useMemo(() => agruparPorDia(eventos), [eventos]);
  const celdas = useMemo(() => celdasMes(anio, mes), [anio, mes]);

  const primerDiaConEvento = useMemo(() => {
    for (const celda of celdas) {
      if (celda.tipo === "dia" && porDia.has(celda.clave)) {
        return celda.clave;
      }
    }
    return null;
  }, [celdas, porDia]);

  const [diaElegido, setDiaElegido] = useState<string | null>(null);

  useEffect(() => {
    setDiaElegido(primerDiaConEvento);
  }, [anio, mes, primerDiaConEvento]);

  const delDia = diaElegido ? (porDia.get(diaElegido) ?? []) : [];

  function mesAnterior() {
    const next = anadirMeses(anio, mes, -1);
    onCambiarMes(next.anio, next.mes);
  }

  function mesSiguiente() {
    const next = anadirMeses(anio, mes, 1);
    onCambiarMes(next.anio, next.mes);
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:items-start lg:gap-6">
      <div className="flex w-full flex-col gap-2.5 rounded-[24px] bg-blanco px-3 py-4 lg:min-w-0 lg:flex-[2_1_640px] lg:gap-3.5 lg:rounded-[28px] lg:p-7">
        <div className="flex items-center justify-between gap-3 px-1 lg:px-0">
          <h2 className="m-0 font-serif text-h3-m font-normal text-bahia lg:text-h3">
            {formatoTituloMes(anio, mes)}
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Mes anterior"
              onClick={mesAnterior}
              className="inline-flex size-11 items-center justify-center rounded-full border-[1.5px] border-bahia bg-transparent text-bahia"
            >
              <IconoChevron direccion="izq" />
            </button>
            <button
              type="button"
              aria-label="Mes siguiente"
              onClick={mesSiguiente}
              className="inline-flex size-11 items-center justify-center rounded-full border-[1.5px] border-bahia bg-transparent text-bahia"
            >
              <IconoChevron direccion="der" />
            </button>
          </div>
        </div>

        <div
          className="grid grid-cols-7 gap-1 px-1 lg:gap-1.5 lg:px-2"
          role="row"
        >
          {DIAS_ESCRITORIO.map((label) => (
            <div
              key={label}
              className="hidden py-1 text-center text-[13px] font-semibold text-bahia lg:block"
              aria-hidden="true"
            >
              {label}
            </div>
          ))}
          {DIAS_MOVIL.map((label) => (
            <div
              key={`m-${label}`}
              className="py-1 text-center text-[13px] font-semibold text-bahia lg:hidden"
              aria-hidden="true"
            >
              {label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 lg:gap-1.5">
          {celdas.map((celda, i) => {
            if (celda.tipo === "vacia") {
              return (
                <div
                  key={`vacia-${i}`}
                  className="invisible min-h-[46px] lg:min-h-24"
                  aria-hidden="true"
                />
              );
            }

            const delCelda = porDia.get(celda.clave) ?? [];
            const tieneEvento = delCelda.length > 0;
            const seleccionado = diaElegido === celda.clave;
            const primerTitulo = delCelda[0]?.titulo;

            return (
              <button
                key={celda.clave}
                type="button"
                disabled={!tieneEvento}
                aria-pressed={tieneEvento ? seleccionado : undefined}
                aria-label={formatoAriaDia(
                  celda.clave,
                  tieneEvento ? primerTitulo : undefined,
                )}
                onClick={() => setDiaElegido(celda.clave)}
                className={cn(
                  "flex flex-col items-center justify-center rounded-xl border-0 lg:items-start lg:justify-start lg:rounded-[14px] lg:border-[1.5px] lg:px-2.5 lg:py-2",
                  "min-h-[46px] lg:min-h-24",
                  !tieneEvento &&
                    "cursor-not-allowed text-bahia opacity-60 lg:border-bahia/15 lg:opacity-100 lg:disabled:opacity-100",
                  tieneEvento &&
                    !seleccionado &&
                    "bg-niebla text-bahia lg:border-niebla",
                  tieneEvento &&
                    seleccionado &&
                    "bg-bahia text-crema lg:border-bahia",
                  !tieneEvento && "bg-transparent font-normal",
                  tieneEvento && "font-semibold",
                )}
              >
                <span className="text-base leading-none">{celda.dia}</span>
                {tieneEvento && primerTitulo ? (
                  <span className="mt-1.5 hidden line-clamp-2 text-left text-[13px] leading-[1.3] font-semibold lg:block">
                    {primerTitulo}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-1 hidden items-center gap-4 text-sm text-bahia lg:flex">
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="size-3.5 rounded bg-niebla"
            />
            Día con evento
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="size-3.5 rounded bg-bahia"
            />
            Día elegido
          </span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 lg:min-w-0 lg:flex-[1_1_340px]">
        {diaElegido ? (
          <h3 className="m-0 px-1 font-serif text-[22px] leading-[29px] font-normal text-bahia lg:px-0 lg:text-[26px] lg:leading-[34px]">
            {formatoTituloDia(diaElegido)}
          </h3>
        ) : null}

        {delDia.length === 0 ? (
          <div className="rounded-3xl bg-blanco p-5 text-bahia lg:p-6">
            <p className="m-0 text-base">
              No hay eventos este día. Elige un día marcado en el calendario.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {delDia.map((evento) => (
              <TarjetaEvento
                key={evento.slug}
                evento={evento}
                variante="ampliada"
                enVivo={estaEnVivo(evento, ahora)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
