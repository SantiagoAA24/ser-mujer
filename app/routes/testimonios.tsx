import { useCallback, useMemo, useRef, useState } from "react";

import { MiniaturaAbstracta } from "~/components/ilustracion/MiniaturaAbstracta";
import { ReproductorFachada } from "~/components/media/ReproductorFachada";
import { Boton } from "~/components/ui/Boton";
import { Etiqueta } from "~/components/ui/Etiqueta";
import { EtiquetaSeccion } from "~/components/ui/EtiquetaSeccion";
import { cn } from "~/components/ui/cn";
import { listarTestimonios } from "~/content";
import type { Testimonio, Tema } from "~/content/types";
import {
  ETIQUETA_TEMA,
  FILTROS_TEMA,
  ariaReproducirTestimonio,
  conteoTestimonios,
  varianteEtiquetaTemaTestimonio,
  type FiltroTema,
} from "~/lib/testimonios";

export function meta() {
  return [
    { title: "Testimonios · Ser, Mujer" },
    {
      name: "description",
      content:
        "Voces de mujeres que han pasado por este espacio. Relatos con cuidado y sin detalles que identifiquen.",
    },
  ];
}

function IconoConsentimiento({ className }: { className?: string }) {
  return (
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
      className={cn("shrink-0 text-exito", className)}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.8 2.8L16 9.5" />
    </svg>
  );
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

function GarantiasEscritorio() {
  return (
    <div className="hidden flex-col gap-1 rounded-aviso bg-blanco px-5 py-4 text-[15px] lg:flex">
      <div>No se reproduce solo: tú decides cuándo empezar.</div>
      <div>Subtítulos activados desde el inicio.</div>
      <div>
        La voz o la imagen pueden estar modificadas para proteger su identidad.
      </div>
      <div>Puedes pausar o salir en cualquier momento.</div>
    </div>
  );
}

export default function Testimonios() {
  const todos = listarTestimonios();
  const [tema, setTema] = useState<FiltroTema>("todos");
  const [seleccionado, setSeleccionado] = useState<Testimonio>(todos[0]!);
  const [reproduciendo, setReproduciendo] = useState(false);
  const reproductorRef = useRef<HTMLElement>(null);

  const filtrados = useMemo(() => {
    if (tema === "todos") return todos;
    return todos.filter((t) => t.tema === (tema as Tema));
  }, [todos, tema]);

  const onActivoChange = useCallback((activo: boolean) => {
    setReproduciendo(activo);
  }, []);

  function preferReducedMotion(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function elegir(t: Testimonio) {
    setSeleccionado(t);
    setReproduciendo(false);
    reproductorRef.current?.scrollIntoView({
      behavior: preferReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <>
      <section className="degradado px-5 py-16 lg:px-14 lg:pb-24 lg:pt-[88px]">
        <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-4 lg:gap-[22px]">
          <EtiquetaSeccion>Testimonios</EtiquetaSeccion>
          <h1 className="m-0 max-w-[780px] font-serif text-h1-m font-normal tracking-[-0.01em] text-bahia lg:text-h1">
            Historias compartidas,{" "}
            <span className="italic">en sus palabras</span>
          </h1>
          <p className="m-0 max-w-[560px] text-base leading-7 text-bahia lg:text-[19px] lg:leading-8">
            <span className="lg:hidden">
              Cada historia se publica con su consentimiento y cuidando su
              identidad.
            </span>
            <span className="hidden lg:inline">
              Mujeres que quisieron contar cómo ha sido su camino. Cada historia
              se publica con su consentimiento y cuidando su identidad.
            </span>
          </p>
        </div>
      </section>

      <section
        id="reproductor"
        ref={reproductorRef}
        aria-label="Reproductor"
        className="scroll-mt-24 px-5 py-8 lg:px-14 lg:pb-10 lg:pt-[72px]"
      >
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3.5 lg:flex-row lg:flex-wrap lg:items-start lg:gap-x-12 lg:gap-y-8">
          <div className="w-full lg:flex-[1.7_1_560px]">
            <ReproductorFachada
              key={seleccionado.slug}
              proveedor="youtube"
              id={seleccionado.youtubeId}
              ariaLabel={ariaReproducirTestimonio(
                seleccionado.titulo,
                seleccionado.duracion,
              )}
              onActivoChange={onActivoChange}
              fondo={
                <MiniaturaAbstracta
                  variante={seleccionado.variante}
                  layout="formas"
                />
              }
              className="h-60 aspect-auto lg:h-auto lg:aspect-[16/9]"
            />
          </div>

          <div className="flex flex-col items-start gap-2.5 px-1 lg:flex-[1_1_340px] lg:gap-4 lg:px-0">
            <div className="flex flex-wrap items-center gap-2 lg:gap-2.5">
              <Etiqueta
                variante={varianteEtiquetaTemaTestimonio(seleccionado.tema)}
              >
                {ETIQUETA_TEMA[seleccionado.tema]}
              </Etiqueta>
              <Etiqueta variante="contorno">
                {reproduciendo ? "Reproduciendo" : "En pausa"}
              </Etiqueta>
            </div>
            <h2 className="m-0 font-serif text-[28px] leading-9 font-normal text-bahia lg:text-[36px] lg:leading-[44px]">
              {seleccionado.titulo}
            </h2>
            <div className="inline-flex items-center gap-2 text-sm lg:text-[15px]">
              <IconoConsentimiento className="size-[18px] lg:size-5" />
              Publicado con su consentimiento · {seleccionado.duracion} min
            </div>
            <p className="m-0 hidden text-base lg:block">
              {seleccionado.descripcion}
            </p>
            <GarantiasEscritorio />
            <p className="m-0 text-sm leading-[22px] lg:hidden">
              No se reproduce solo y lleva subtítulos. La voz o la imagen pueden
              estar modificadas para proteger su identidad.
            </p>
          </div>
        </div>
      </section>

      <section className="px-0 py-4 pb-14 lg:px-14 lg:pb-[88px] lg:pt-10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-4 lg:gap-7">
          <h2 className="m-0 px-5 font-serif text-h3-m font-normal text-bahia lg:px-0 lg:text-h3">
            Todos los testimonios
          </h2>
          <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-8">
            <div
              role="group"
              aria-label="Filtrar por tema"
              className="flex gap-2 overflow-x-auto px-4 py-1 lg:flex-wrap lg:gap-2.5 lg:overflow-visible lg:px-0"
            >
              {FILTROS_TEMA.map((f) => (
                <ChipFiltro
                  key={f.valor}
                  label={f.label}
                  pressed={tema === f.valor}
                  onClick={() => setTema(f.valor)}
                />
              ))}
            </div>
            <div
              aria-live="polite"
              className="px-5 text-sm lg:px-0 lg:text-[15px]"
            >
              {conteoTestimonios(filtrados.length)}
            </div>
          </div>

          {/* Escritorio: cuadrícula */}
          <div className="hidden grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-x-6 gap-y-7 lg:grid">
            {filtrados.map((t) => {
              const activa = t.slug === seleccionado.slug;
              return (
                <article key={t.slug} className="flex flex-col gap-3">
                  <MiniaturaAbstracta
                    variante={t.variante}
                    layout="tarjeta"
                    duracion={t.duracion}
                    seleccionada={activa}
                    aria-label={`Ver en el reproductor: ${t.titulo}`}
                    onClick={() => elegir(t)}
                  />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <Etiqueta
                      variante={varianteEtiquetaTemaTestimonio(t.tema)}
                      className="px-3 py-0.5 text-[13.5px]"
                    >
                      {ETIQUETA_TEMA[t.tema]}
                    </Etiqueta>
                    {activa ? (
                      <span className="text-sm">En el reproductor</span>
                    ) : null}
                  </div>
                  <h3 className="m-0 font-serif text-h3-m font-normal lg:text-h3">
                    {t.titulo}
                  </h3>
                  <div className="inline-flex items-center gap-2 text-sm">
                    <IconoConsentimiento className="size-[18px]" />
                    Publicado con su consentimiento
                  </div>
                </article>
              );
            })}
          </div>

          {/* Móvil: lista */}
          <div className="flex flex-col gap-3 px-4 lg:hidden">
            {filtrados.map((t) => {
              const activa = t.slug === seleccionado.slug;
              return (
                <button
                  key={t.slug}
                  type="button"
                  aria-label={`Ver en el reproductor: ${t.titulo}`}
                  onClick={() => elegir(t)}
                  className={cn(
                    "flex min-h-11 w-full items-center gap-3.5 rounded-[20px] border-0 bg-blanco p-3 text-left text-bahia",
                    activa &&
                      "outline outline-[3px] outline-offset-2 outline-bahia",
                  )}
                >
                  <span className="relative h-[88px] w-[124px] shrink-0 overflow-hidden rounded-[14px]">
                    <MiniaturaAbstracta
                      variante={t.variante}
                      layout="formas"
                      className="rounded-[14px]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-2 left-2 flex size-8 items-center justify-center rounded-full bg-bahia text-crema"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5.5v13l11-6.5-11-6.5z" />
                      </svg>
                    </span>
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="font-serif text-[19px] leading-[25px]">
                      {t.titulo}
                    </span>
                    <span className="text-[13.5px] leading-5 font-semibold">
                      {ETIQUETA_TEMA[t.tema]} · {t.duracion}
                    </span>
                    <span className="text-[13.5px] leading-5">
                      Publicado con su consentimiento
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section
        aria-label="Compartir tu testimonio"
        className="px-4 pb-14 lg:px-14 lg:pb-24"
      >
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2.5 rounded-[24px] bg-niebla px-5 py-7 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-14 lg:gap-y-5 lg:rounded-[28px] lg:px-12 lg:py-10">
          <div className="flex max-w-[720px] flex-[1_1_480px] flex-col gap-2">
            <h2 className="m-0 font-serif text-h3-m font-normal lg:text-h3">
              ¿Te gustaría compartir tu historia?
            </h2>
            <p className="m-0 text-[15px] leading-6 lg:text-base lg:leading-7">
              Solo si quieres y cuando te sientas lista. Puede ser sin mostrar
              tu rostro ni tu nombre, tú revisas el video antes de publicarlo y
              puedes pedir que lo retiremos en cualquier momento.
            </p>
          </div>
          <Boton
            variante="secundario"
            href="/contacto"
            className="mt-1.5 w-full justify-center lg:mt-0 lg:w-auto"
          >
            Escribirnos para conversarlo
          </Boton>
        </div>
      </section>
    </>
  );
}
