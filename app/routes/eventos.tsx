import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";

import { CalendarioEventos } from "~/components/contenido/CalendarioEventos";
import { TarjetaEvento } from "~/components/contenido/TarjetaEvento";
import { EtiquetaSeccion } from "~/components/ui/EtiquetaSeccion";
import { cn } from "~/components/ui/cn";
import { listarEventos } from "~/content";
import {
  FILTROS_MODALIDAD,
  estaEnVivo,
  eventosDelMes,
  filtrarPorModalidad,
  filtrarProximos,
  ordenarPorInicio,
  textoConteo,
  type FiltroModalidad,
} from "~/lib/eventos";
import {
  claveDiaDeInicio,
  mesActualBogota,
  nombreMesParaConteo,
  partesEnBogota,
} from "~/lib/fechas";

export function meta() {
  return [
    { title: "Eventos · Ser, Mujer" },
    {
      name: "description",
      content:
        "Talleres, círculos y encuentros próximos. Virtuales y presenciales, con cupos limitados.",
    },
  ];
}

function ChipFiltro({
  label,
  pressed,
  onClick,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "min-h-11 shrink-0 rounded-full border-[1.5px] border-bahia px-[18px] py-1.5 font-sans text-[15px] font-semibold lg:px-[22px] lg:py-2",
        pressed ? "bg-bahia text-crema" : "bg-transparent text-bahia",
      )}
    >
      {label}
    </button>
  );
}

function SegmentoVista({
  vista,
  onCambiar,
}: {
  vista: "lista" | "calendario";
  onCambiar: (v: "lista" | "calendario") => void;
}) {
  return (
    <div
      role="group"
      aria-label="Cambiar vista"
      className="inline-flex w-full rounded-full bg-blanco p-1 lg:w-auto"
    >
      {(
        [
          { id: "lista" as const, label: "Lista" },
          { id: "calendario" as const, label: "Calendario" },
        ] as const
      ).map((v) => (
        <button
          key={v.id}
          type="button"
          aria-pressed={vista === v.id}
          onClick={() => onCambiar(v.id)}
          className={cn(
            "min-h-11 flex-1 rounded-full border-0 px-6 py-2 font-sans text-[15px] font-semibold lg:flex-none",
            vista === v.id
              ? "bg-bahia text-crema"
              : "bg-transparent text-bahia",
          )}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}

export default function Eventos() {
  const todos = listarEventos();
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalidad, setModalidad] = useState<FiltroModalidad>("todos");
  const [ahora, setAhora] = useState<Date | null>(null);

  const vista: "lista" | "calendario" =
    searchParams.get("vista") === "calendario" ? "calendario" : "lista";

  const [mesVisible, setMesVisible] = useState(() => mesActualBogota());
  const [mesAlineado, setMesAlineado] = useState(false);

  useEffect(() => {
    setAhora(new Date());
    const id = window.setInterval(() => setAhora(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  // Una sola vez tras hidratar: ir al mes del próximo evento
  useEffect(() => {
    if (!ahora || mesAlineado) return;
    const proximosInicio = ordenarPorInicio(filtrarProximos(todos, ahora));
    if (proximosInicio[0]) {
      const p = partesEnBogota(new Date(proximosInicio[0].inicio));
      setMesVisible({ anio: p.anio, mes: p.mes });
    } else {
      setMesVisible(mesActualBogota(ahora));
    }
    setMesAlineado(true);
  }, [ahora, mesAlineado, todos]);

  const proximos = useMemo(() => {
    const ref = ahora ?? new Date();
    return ordenarPorInicio(
      filtrarPorModalidad(filtrarProximos(todos, ref), modalidad),
    );
  }, [todos, ahora, modalidad]);

  const delMesVisible = useMemo(
    () => eventosDelMes(proximos, mesVisible.anio, mesVisible.mes),
    [proximos, mesVisible],
  );

  const nombreMes = nombreMesParaConteo(mesVisible.anio, mesVisible.mes);
  const conteoLista = useMemo(() => {
    if (proximos.length === 0) return textoConteo(0, nombreMes);
    // Conteo: eventos de la lista filtrada; el mes del texto es el del primer evento o el visible
    const primero = proximos[0];
    if (!primero) return textoConteo(0, nombreMes);
    const clave = claveDiaDeInicio(primero.inicio);
    const [y, m] = clave.split("-").map(Number);
    const mesLista =
      vista === "lista"
        ? nombreMesParaConteo(y, m)
        : nombreMes;
    const cantidad = vista === "lista" ? proximos.length : delMesVisible.length;
    return textoConteo(cantidad, mesLista);
  }, [proximos, vista, delMesVisible.length, nombreMes]);

  function cambiarVista(next: "lista" | "calendario") {
    const params = new URLSearchParams(searchParams);
    if (next === "calendario") {
      params.set("vista", "calendario");
    } else {
      params.delete("vista");
    }
    setSearchParams(params, { replace: true, preventScrollReset: true });
  }

  return (
    <>
      <section className="degradado px-5 py-11 lg:px-14 lg:pt-[88px] lg:pb-24">
        <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-4 lg:gap-[22px]">
          <EtiquetaSeccion>Eventos</EtiquetaSeccion>
          <h1 className="m-0 max-w-[780px] font-serif text-h1-m font-normal tracking-[-0.01em] text-bahia lg:text-h1 lg:leading-[1.08]">
            Encuentros para{" "}
            <span className="italic">conocernos sin prisa</span>
          </h1>
          <p className="m-0 max-w-[560px] text-[17px] leading-7 text-bahia lg:hidden">
            Por ahora todos son gratuitos, y puedes participar con la cámara
            apagada y sin hablar si así lo prefieres.
          </p>
          <p className="m-0 hidden max-w-[560px] text-[19px] leading-8 text-bahia lg:block">
            Talleres, círculos y transmisiones en vivo. Por ahora todos son
            gratuitos, y puedes participar con la cámara apagada y sin hablar si
            así lo prefieres.
          </p>
        </div>
      </section>

      <section
        aria-label="Próximos eventos"
        className="px-0 py-7 lg:px-14 lg:py-14 lg:pb-24"
      >
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3.5 lg:gap-7">
          {/* Controles: móvil = vista → filtros; escritorio = filtros | vista */}
          <div className="flex flex-col gap-3.5 px-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-8 lg:gap-y-4 lg:px-0">
            <div className="order-1 lg:order-2">
              <SegmentoVista vista={vista} onCambiar={cambiarVista} />
            </div>

            <div className="order-2 flex flex-col gap-2 lg:order-1 lg:flex-row lg:flex-wrap lg:items-center lg:gap-2.5">
              <div
                role="group"
                aria-label="Filtrar por modalidad"
                className="-mx-4 flex gap-2.5 overflow-x-auto px-4 py-0.5 lg:mx-0 lg:overflow-visible lg:px-0"
              >
                {FILTROS_MODALIDAD.map((f) => (
                  <ChipFiltro
                    key={f.id}
                    label={f.label}
                    pressed={modalidad === f.id}
                    onClick={() => setModalidad(f.id)}
                  />
                ))}
              </div>
              <span
                aria-live="polite"
                className="px-0 text-sm leading-[22px] text-bahia lg:ml-2 lg:text-[15px] lg:leading-normal"
              >
                {conteoLista}
              </span>
            </div>
          </div>

          <div className="px-4 lg:px-0">
            {vista === "lista" ? (
              <div className="flex flex-col gap-4">
                {proximos.length === 0 ? (
                  <p className="m-0 text-base text-bahia">
                    No hay eventos próximos con este filtro. Prueba otra
                    modalidad o vuelve más adelante.
                  </p>
                ) : (
                  proximos.map((evento) => (
                    <TarjetaEvento
                      key={evento.slug}
                      evento={evento}
                      variante="ampliada"
                      enVivo={estaEnVivo(evento, ahora)}
                    />
                  ))
                )}
              </div>
            ) : (
              <CalendarioEventos
                eventos={proximos}
                anio={mesVisible.anio}
                mes={mesVisible.mes}
                onCambiarMes={(anio, mes) => setMesVisible({ anio, mes })}
                ahora={ahora}
              />
            )}
          </div>

          <p className="m-0 hidden text-base text-bahia lg:block">
            ¿Quieres que te avisemos de nuevos eventos?{" "}
            <Link
              to="/contacto"
              className="font-semibold text-bahia underline underline-offset-[6px]"
            >
              Escríbenos
            </Link>{" "}
            y te contamos, sin compromiso.
          </p>
        </div>
      </section>
    </>
  );
}
