import { useMemo, useState } from "react";
import { Link } from "react-router";

import {
  ReproductorProvider,
  useReproductor,
} from "~/components/media/ReproductorAudio";
import { Boton } from "~/components/ui/Boton";
import { Etiqueta } from "~/components/ui/Etiqueta";
import { EtiquetaSeccion } from "~/components/ui/EtiquetaSeccion";
import { cn } from "~/components/ui/cn";
import { listarEpisodios, sitio } from "~/content";
import type { Episodio, Tema } from "~/content/types";
import {
  EPISODIOS_POR_PAGINA,
  formatoFechaEpisodio,
  formatoFechaEpisodioLarga,
  ordenarEpisodiosPorFecha,
  varianteEtiquetaTema,
} from "~/lib/podcast";
import {
  ETIQUETA_TEMA,
  FILTROS_TEMA,
  type FiltroTema,
} from "~/lib/recursos";

export function meta() {
  return [{ title: "Ser, Mujer" }];
}

function IconoPlay({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  );
}

function IconoPausa({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
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
        "min-h-11 shrink-0 rounded-full border-[1.5px] border-bahia px-[18px] py-1.5 font-sans text-[15px] font-semibold lg:px-5 lg:py-2",
        pressed ? "bg-bahia text-crema" : "bg-transparent text-bahia",
      )}
    >
      {label}
    </button>
  );
}

function hrefPlataforma(href: string): string {
  return href.includes("[") ? "#" : href;
}

function EpisodioDestacado({ episodio }: { episodio: Episodio }) {
  const { esActual, puedeReproducir, alternar } = useReproductor();
  const on = esActual(episodio);
  const puede = puedeReproducir(episodio);

  return (
    <section
      aria-label="Episodio destacado"
      className="px-4 py-8 lg:px-14 lg:pb-8 lg:pt-[72px]"
    >
      <div
        className={cn(
          "mx-auto box-border flex max-w-[1240px] flex-col items-start gap-3 rounded-[28px] bg-durazno px-5 py-6",
          "lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-14 lg:gap-y-10 lg:rounded-[32px] lg:p-12",
        )}
      >
        <div className="flex w-full items-center gap-4 lg:contents">
          <div
            aria-hidden="true"
            className="relative size-28 shrink-0 overflow-hidden rounded-[20px] bg-naranja lg:mx-auto lg:aspect-square lg:size-auto lg:max-w-[300px] lg:flex-[0_1_300px] lg:rounded-[28px]"
          >
            <div className="patron-crema absolute inset-0 opacity-45" />
            <div className="absolute bottom-2 left-3 font-serif text-[40px] italic leading-none text-bahia-profundo lg:bottom-5 lg:left-6 lg:text-[72px]">
              {episodio.numero}
            </div>
          </div>

          <div className="flex flex-col items-start gap-1.5 lg:hidden">
            <EtiquetaSeccion className="tracking-[0.16em]">
              Episodio destacado
            </EtiquetaSeccion>
            <Etiqueta variante={varianteEtiquetaTema(episodio.tema)}>
              {ETIQUETA_TEMA[episodio.tema]}
            </Etiqueta>
          </div>
        </div>

        <div className="flex min-w-0 flex-[1_1_520px] flex-col items-start gap-3 lg:gap-4">
          <div className="hidden flex-wrap items-center gap-x-4 gap-y-2.5 lg:flex">
            <EtiquetaSeccion>Episodio destacado</EtiquetaSeccion>
            <Etiqueta variante={varianteEtiquetaTema(episodio.tema)}>
              {ETIQUETA_TEMA[episodio.tema]}
            </Etiqueta>
          </div>

          <h2 className="m-0 font-serif text-h3-m font-normal text-bahia-profundo lg:text-h2">
            {episodio.titulo}
          </h2>

          <div className="text-sm font-semibold leading-[22px] text-bahia-profundo lg:text-[15px] lg:leading-normal">
            Episodio {episodio.numero} · {episodio.duracion} ·{" "}
            <span className="lg:hidden">
              {formatoFechaEpisodio(episodio.fecha)}
            </span>
            <span className="hidden lg:inline">
              {formatoFechaEpisodioLarga(episodio.fecha)}
            </span>
          </div>

          <p className="m-0 text-[15px] leading-6 text-bahia-profundo lg:max-w-[600px] lg:text-cuerpo lg:leading-[1.7]">
            {episodio.descripcion}
          </p>

          <div className="mt-1 flex w-full flex-col flex-wrap items-stretch gap-3 lg:w-auto lg:flex-row lg:items-center lg:gap-x-6">
            <button
              type="button"
              disabled={!puede}
              onClick={() => alternar(episodio)}
              className={cn(
                "inline-flex min-h-14 items-center justify-center gap-3 rounded-full border-0 bg-bahia px-8 py-3.5 pl-6 font-sans text-base font-semibold text-crema lg:justify-start lg:text-[17px]",
                !puede && "cursor-not-allowed opacity-45",
              )}
            >
              {on ? <IconoPausa /> : <IconoPlay />}
              {on ? "Pausar" : "Escuchar ahora"}
            </button>
            <Link
              to={`/podcast/${episodio.slug}`}
              className="inline-flex min-h-11 items-center justify-center font-semibold text-bahia-profundo underline-offset-[6px] hover:text-bahia-profundo lg:justify-start"
            >
              Ver notas y transcripción
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilaEpisodio({ episodio }: { episodio: Episodio }) {
  const { esActual, puedeReproducir, alternar } = useReproductor();
  const on = esActual(episodio);
  const puede = puedeReproducir(episodio);
  const temaLabel = ETIQUETA_TEMA[episodio.tema];
  const fecha = formatoFechaEpisodio(episodio.fecha);

  return (
    <li
      className={cn(
        "flex items-center gap-3.5 rounded-[20px] py-3 pl-3 pr-4 lg:grid lg:grid-cols-[56px_44px_minmax(0,1fr)_auto_90px_150px] lg:gap-5 lg:py-3.5 lg:pl-3.5 lg:pr-7",
        on ? "bg-niebla" : "bg-blanco",
      )}
    >
      <button
        type="button"
        disabled={!puede}
        aria-label={
          (on ? "Pausar" : "Reproducir") +
          ` episodio ${episodio.numero}: ${episodio.titulo}`
        }
        onClick={() => alternar(episodio)}
        className={cn(
          "inline-flex size-[52px] shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-bahia text-crema lg:size-14",
          !puede && "cursor-not-allowed opacity-45",
        )}
      >
        {on ? (
          <IconoPausa className="lg:h-[22px] lg:w-[22px]" />
        ) : (
          <IconoPlay className="lg:h-[22px] lg:w-[22px]" />
        )}
      </button>

      {/* Móvil */}
      <div className="flex min-w-0 flex-col gap-0.5 lg:hidden">
        <div className="text-[13.5px] font-semibold leading-5">
          N.º {episodio.numero} · {temaLabel}
        </div>
        <Link
          to={`/podcast/${episodio.slug}`}
          className="my-[-10px] block py-2.5 font-serif text-[19px] leading-[25px] no-underline"
        >
          {episodio.titulo}
        </Link>
        <div className="text-[13.5px] leading-5">
          {episodio.duracion} · {fecha}
        </div>
      </div>

      {/* Escritorio */}
      <span className="hidden font-serif text-[28px] italic leading-none lg:block">
        {episodio.numero}
      </span>
      <Link
        to={`/podcast/${episodio.slug}`}
        className="hidden font-serif text-2xl leading-8 no-underline lg:block"
      >
        {episodio.titulo}
      </Link>
      <Etiqueta
        variante={varianteEtiquetaTema(episodio.tema)}
        className="hidden px-3 py-0.5 text-[13.5px] lg:inline-flex"
      >
        {temaLabel}
      </Etiqueta>
      <span className="hidden text-right text-[15px] font-semibold lg:block">
        {episodio.duracion}
      </span>
      <span className="hidden text-right text-[15px] lg:block">{fecha}</span>
    </li>
  );
}

function ListaEpisodios({ todos }: { todos: Episodio[] }) {
  const [tema, setTema] = useState<FiltroTema>("todos");
  const [pagina, setPagina] = useState(1);

  const filtrados = useMemo(() => {
    if (tema === "todos") return todos;
    return todos.filter((e) => e.tema === (tema as Tema));
  }, [todos, tema]);

  const visibles = filtrados.slice(0, pagina * EPISODIOS_POR_PAGINA);
  const hayMas = pagina * EPISODIOS_POR_PAGINA < filtrados.length;
  const conteo =
    filtrados.length === 1
      ? "1 episodio"
      : `${filtrados.length} episodios`;

  function cambiarTema(valor: FiltroTema) {
    setTema(valor);
    setPagina(1);
  }

  return (
    <section
      aria-label="Todos los episodios"
      className="flex flex-col gap-3.5 px-0 pb-12 pt-6 lg:gap-6 lg:px-14 lg:pb-24 lg:pt-10"
    >
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-3.5 lg:gap-6">
        <h2 className="m-0 px-5 font-serif text-[28px] font-normal leading-9 text-bahia lg:px-0 lg:text-[36px] lg:leading-[44px]">
          Todos los episodios
        </h2>

        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-8">
          <div
            role="group"
            aria-label="Filtrar por tema"
            className="flex gap-2 overflow-x-auto px-4 py-1 lg:flex-wrap lg:gap-2.5 lg:overflow-visible lg:px-0 lg:py-0"
          >
            {FILTROS_TEMA.map((f) => (
              <ChipFiltro
                key={f.valor}
                label={f.label}
                pressed={tema === f.valor}
                onClick={() => cambiarTema(f.valor)}
              />
            ))}
          </div>
          <div
            aria-live="polite"
            className="px-5 text-sm leading-[22px] lg:px-0 lg:text-[15px] lg:leading-normal"
          >
            {conteo}
          </div>
        </div>

        <ol className="m-0 flex list-none flex-col gap-2.5 px-4 lg:gap-3 lg:px-0">
          {visibles.map((e) => (
            <FilaEpisodio key={e.slug} episodio={e} />
          ))}
        </ol>

        {hayMas ? (
          <Boton
            variante="secundario"
            tamano="grande"
            className="mx-4 mt-2 min-h-[52px] self-stretch lg:mx-auto lg:mt-2 lg:self-center lg:px-[30px]"
            onClick={() => setPagina((p) => p + 1)}
          >
            Ver episodios anteriores
          </Boton>
        ) : null}
      </div>
    </section>
  );
}

function PodcastContenido() {
  const episodios = useMemo(
    () => ordenarEpisodiosPorFecha(listarEpisodios()),
    [],
  );
  const destacado = episodios[0];
  const plataformas = [
    sitio.podcast.spotify,
    sitio.podcast.apple,
    sitio.podcast.youtube,
  ];

  return (
    <>
      <section
        id="arriba"
        className="degradado px-5 py-11 lg:px-14 lg:pb-24 lg:pt-[88px]"
      >
        <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-5 lg:gap-[22px]">
          <EtiquetaSeccion>Podcast</EtiquetaSeccion>
          <h1 className="m-0 max-w-[780px] font-serif text-h1-m font-normal tracking-[-0.01em] text-bahia lg:text-h1 lg:leading-[1.08]">
            Conversaciones para{" "}
            <span className="italic">escuchar a tu ritmo</span>
          </h1>
          <p className="m-0 max-w-[560px] text-[17px] leading-7 text-bahia lg:hidden">
            Para acompañarte también cuando prefieres estar a solas: con
            audífonos y sin prisa.
          </p>
          <p className="m-0 hidden max-w-[560px] text-[19px] leading-8 text-bahia lg:block">
            Un espacio para acompañarte también cuando prefieres estar a solas:
            con audífonos, sin prisa y sin tener que contarle nada a nadie.
          </p>

          <div className="mt-1 flex w-full flex-col gap-2 lg:mt-1 lg:flex-row lg:flex-wrap lg:items-center lg:gap-3">
            <span className="text-sm font-semibold lg:mr-1 lg:text-[15px]">
              Escúchalo también en
            </span>
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {plataformas.map((p) => (
                <a
                  key={p.label}
                  href={hrefPlataforma(p.href)}
                  className="inline-flex min-h-11 items-center rounded-full bg-blanco px-[18px] py-1.5 text-[15px] font-semibold no-underline lg:px-[22px] lg:py-2"
                >
                  {p.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {destacado ? <EpisodioDestacado episodio={destacado} /> : null}
      <ListaEpisodios todos={episodios} />
    </>
  );
}

export default function Podcast() {
  return (
    <ReproductorProvider>
      <PodcastContenido />
    </ReproductorProvider>
  );
}
