import {
  data,
  isRouteErrorResponse,
  Link,
  useLoaderData,
} from "react-router";

import {
  ReproductorProvider,
  useReproductor,
} from "~/components/media/ReproductorAudio";
import { ReproductorEpisodio } from "~/components/media/ReproductorEpisodio";
import { Etiqueta } from "~/components/ui/Etiqueta";
import type { EtiquetaVariante } from "~/components/ui/Etiqueta";
import { cn } from "~/components/ui/cn";
import {
  listarEpisodios,
  obtenerEpisodio,
  sitio,
} from "~/content";
import type { Episodio, RecursoEpisodio } from "~/content/types";
import { enlaceUsable } from "~/lib/enlaces";
import { metaDescripcion, tituloSeccion } from "~/lib/meta";
import {
  episodiosRelacionados,
  fondoPortadaTema,
  formatoFechaEpisodio,
  formatoFechaEpisodioLarga,
  parseTiempoMmSs,
  varianteEtiquetaTema,
} from "~/lib/podcast";
import { ETIQUETA_TEMA } from "~/lib/recursos";

import type { Route } from "./+types/podcast.$slug";

export function meta({
  loaderData,
}: Route.MetaArgs): ReturnType<Route.MetaFunction> {
  const titulo = loaderData?.episodio?.titulo;
  return [
    {
      title: titulo ? tituloSeccion(titulo) : tituloSeccion("Podcast"),
    },
    {
      name: "description",
      content: metaDescripcion(
        loaderData?.episodio?.descripcion,
        "Escucha este episodio del podcast de Ser, Mujer a tu ritmo.",
      ),
    },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug ?? "";
  const episodio = obtenerEpisodio(slug);
  if (!episodio) {
    throw data("No encontrado", { status: 404 });
  }
  const relacionados = episodiosRelacionados(
    episodio,
    listarEpisodios(),
    3,
  );
  return { episodio, relacionados };
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let titulo = "Error";
  let detalle = "Ha ocurrido un error inesperado.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      titulo = "404";
      detalle = "No se encontró el episodio solicitado.";
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
        to="/podcast"
        className="mt-8 inline-flex min-h-11 items-center font-semibold underline-offset-[6px]"
      >
        Volver al podcast
      </Link>
    </div>
  );
}

function varianteRecurso(tipo: string): EtiquetaVariante {
  const t = tipo.toLowerCase();
  if (t.includes("lectura")) return "primavera";
  if (t.includes("acompa")) return "durazno";
  return "niebla";
}

function IconoChevronIzq() {
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
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

function IconoChevronAbajo() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 8l5 5 5-5" />
    </svg>
  );
}

function PortadaNumero({
  numero,
  className,
  fondo = "bg-naranja",
}: {
  numero: number;
  className?: string;
  fondo?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden",
        fondo,
        className,
      )}
    >
      <div className="patron-crema absolute inset-0 opacity-45" />
      <div className="absolute bottom-2 left-3 font-serif text-[40px] italic leading-none text-bahia-profundo lg:bottom-5 lg:left-6 lg:text-[72px]">
        {numero}
      </div>
    </div>
  );
}

function EnlacesPlataformas() {
  const plataformas = [
    sitio.podcast.spotify,
    sitio.podcast.apple,
    sitio.podcast.youtube,
  ];
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 px-1 text-[15px] lg:gap-x-5 lg:px-0">
      <span className="font-semibold">También en</span>
      {plataformas.map((p) =>
        enlaceUsable(p.href) ? (
          <a
            key={p.label}
            href={p.href}
            className="inline-flex min-h-11 items-center font-semibold underline-offset-[6px]"
            rel="noopener noreferrer"
            target="_blank"
          >
            {p.label}
          </a>
        ) : (
          <span
            key={p.label}
            className="inline-flex min-h-11 items-center font-semibold"
          >
            {p.label}
          </span>
        ),
      )}
    </div>
  );
}

function NotasEpisodio({ episodio }: { episodio: Episodio }) {
  const { irA, tieneAudioNativo } = useReproductor();
  const nativo = tieneAudioNativo(episodio);

  return (
    <div className="flex flex-col gap-2.5 px-1 lg:gap-3.5 lg:px-0">
      <h2 className="m-0 font-serif text-[26px] font-normal leading-[34px] text-bahia lg:text-h3">
        Notas del episodio
      </h2>
      <ol className="m-0 flex list-none flex-col p-0 text-[15px] leading-6 lg:text-cuerpo lg:leading-[1.7]">
        {episodio.notas.map((nota, i) => {
          const esUltima = i === episodio.notas.length - 1;
          return (
            <li
              key={`${nota.tiempo}-${i}`}
              className={cn(
                "flex gap-3.5 border-t border-bahia/25 py-2.5 lg:gap-5 lg:py-3",
                esUltima && "border-b",
              )}
            >
              <button
                type="button"
                disabled={!nativo}
                onClick={() => irA(episodio, parseTiempoMmSs(nota.tiempo))}
                className={cn(
                  "shrink-0 basis-[52px] text-left font-semibold lg:basis-16",
                  nativo
                    ? "cursor-pointer underline-offset-[6px] hover:underline"
                    : "cursor-not-allowed opacity-45",
                )}
                aria-label={`Saltar a ${nota.tiempo}`}
              >
                {nota.tiempo}
              </button>
              <span>{nota.texto}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function TarjetaRecursoMencionado({ recurso }: { recurso: RecursoEpisodio }) {
  const usable = enlaceUsable(recurso.href);
  const interno = usable && recurso.href.startsWith("/");
  const clase = cn(
    "flex flex-col gap-0.5 rounded-[20px] bg-blanco px-5 py-4 lg:gap-1 lg:px-6 lg:py-5",
    usable && "no-underline",
  );
  const cuerpo = (
    <>
      <Etiqueta
        variante={varianteRecurso(recurso.tipo)}
        className="self-start px-3 py-0 text-[13.5px]"
      >
        {recurso.tipo}
      </Etiqueta>
      <span className="font-semibold">{recurso.titulo}</span>
      <span className="text-[14.5px] leading-[22px] lg:text-[15px] lg:leading-normal">
        {recurso.descripcion}
      </span>
    </>
  );

  if (!usable) {
    return <div className={clase}>{cuerpo}</div>;
  }

  if (interno) {
    return (
      <Link to={recurso.href} className={clase}>
        {cuerpo}
      </Link>
    );
  }

  return (
    <a
      href={recurso.href}
      className={clase}
      rel="noopener noreferrer"
      target="_blank"
    >
      {cuerpo}
    </a>
  );
}

function EpisodioRelacionado({ episodio }: { episodio: Episodio }) {
  const meta = `${ETIQUETA_TEMA[episodio.tema]} · ${episodio.duracion} · ${formatoFechaEpisodio(episodio.fecha)}`;
  return (
    <Link
      to={`/podcast/${episodio.slug}`}
      className="flex items-center gap-3.5 rounded-[20px] bg-blanco py-3 pl-3 pr-4 no-underline lg:gap-4 lg:py-3.5 lg:pl-3.5 lg:pr-5"
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex size-14 shrink-0 items-center justify-center rounded-[14px] font-serif text-2xl italic lg:size-16 lg:rounded-2xl lg:text-[28px]",
          fondoPortadaTema(episodio.tema),
        )}
      >
        {episodio.numero}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="font-serif text-[19px] leading-[25px] lg:text-h4 lg:leading-[27px]">
          {episodio.titulo}
        </span>
        <span className="text-[13.5px] leading-5 lg:text-sm lg:leading-normal">
          {meta}
        </span>
      </span>
    </Link>
  );
}

function ContenidoEpisodio({
  episodio,
  relacionados,
}: {
  episodio: Episodio;
  relacionados: Episodio[];
}) {
  const temaLabel = ETIQUETA_TEMA[episodio.tema];
  const transcripcionHref = enlaceUsable(episodio.transcripcionHref)
    ? episodio.transcripcionHref
    : null;

  return (
    <>
      <section
        id="arriba"
        className="bg-durazno px-4 pb-10 pt-6 text-bahia-profundo lg:px-14 lg:pb-16 lg:pt-10"
      >
        <div className="mx-auto flex max-w-[1240px] flex-col gap-5 lg:gap-7">
          <Link
            to="/podcast"
            className="inline-flex min-h-11 items-center gap-2 self-start text-[15px] font-semibold underline-offset-[6px]"
          >
            <IconoChevronIzq />
            Todos los episodios
          </Link>

          {/* Móvil: portada + meta en fila */}
          <div className="flex items-center gap-4 lg:hidden">
            <PortadaNumero
              numero={episodio.numero}
              className="size-28 shrink-0 rounded-[20px]"
            />
            <div className="flex flex-col items-start gap-1.5 text-sm font-semibold leading-[22px]">
              <span>Episodio {episodio.numero}</span>
              <span>
                {formatoFechaEpisodio(episodio.fecha)} · {episodio.duracion}
              </span>
              <Etiqueta
                variante={varianteEtiquetaTema(episodio.tema)}
                className="px-3 py-0"
              >
                {temaLabel}
              </Etiqueta>
            </div>
          </div>

          <h1 className="m-0 px-1 font-serif text-[36px] font-normal leading-[42px] tracking-[-0.01em] lg:sr-only">
            {episodio.titulo}
          </h1>

          {/* Escritorio: portada + columna */}
          <div className="hidden flex-wrap items-center gap-x-14 gap-y-10 lg:flex">
            <PortadaNumero
              numero={episodio.numero}
              className="mx-auto aspect-square max-w-[280px] flex-[0_1_280px] rounded-[28px]"
            />
            <div className="flex min-w-0 flex-[1_1_560px] flex-col items-start gap-4">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 text-[15px] font-semibold">
                <span>
                  Episodio {episodio.numero} ·{" "}
                  {formatoFechaEpisodioLarga(episodio.fecha)} ·{" "}
                  {episodio.duracion}
                </span>
                <Etiqueta
                  variante={varianteEtiquetaTema(episodio.tema)}
                  className="px-3 py-0.5 text-sm"
                >
                  {temaLabel}
                </Etiqueta>
              </div>
              <p
                aria-hidden="true"
                className="m-0 font-serif text-[clamp(40px,4.6vw,64px)] font-normal leading-[1.1] tracking-[-0.01em]"
              >
                {episodio.titulo}
              </p>
              <ReproductorEpisodio episodio={episodio} />
              <EnlacesPlataformas />
            </div>
          </div>

          {/* Móvil: reproductor y plataformas */}
          <div className="flex flex-col gap-3 lg:hidden">
            <ReproductorEpisodio episodio={episodio} />
            <EnlacesPlataformas />
          </div>
        </div>
      </section>

      <section className="px-4 py-12 lg:px-14 lg:py-[72px] lg:pb-24">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-10 lg:flex-row lg:flex-wrap lg:items-start lg:gap-x-[72px] lg:gap-y-14">
          <div className="flex max-w-[760px] flex-[2_1_600px] flex-col gap-10 lg:gap-12">
            <div className="flex flex-col gap-2.5 px-1 lg:gap-3.5 lg:px-0">
              <h2 className="m-0 font-serif text-[26px] font-normal leading-[34px] text-bahia lg:text-h3">
                De qué hablamos
              </h2>
              <p className="m-0 text-[17px] leading-7 text-bahia lg:text-[19px] lg:leading-8">
                {episodio.descripcion}
              </p>
              <p className="m-0 text-sm leading-[22px] text-bahia lg:text-[15px] lg:leading-normal">
                Este episodio toca temas sensibles. Puedes pausar cuando quieras
                y volver después.
              </p>
            </div>

            <NotasEpisodio episodio={episodio} />

            <div className="flex flex-col gap-2.5 lg:gap-3.5">
              <h2 className="m-0 px-1 font-serif text-[26px] font-normal leading-[34px] text-bahia lg:px-0 lg:text-h3">
                Recursos mencionados
              </h2>
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
                {episodio.recursos.map((r) => (
                  <TarjetaRecursoMencionado
                    key={`${r.tipo}-${r.titulo}`}
                    recurso={r}
                  />
                ))}
              </div>
            </div>

            <details className="rounded-[24px] bg-blanco px-5 py-1 lg:px-7 lg:py-2">
              <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-3 lg:min-h-16 [&::-webkit-details-marker]:hidden">
                <span className="font-serif text-2xl leading-8 lg:text-[26px] lg:leading-[34px]">
                  Transcripción
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold lg:gap-2.5 lg:text-[15px]">
                  <span className="lg:hidden">Mostrar</span>
                  <span className="hidden lg:inline">Mostrar u ocultar</span>
                  <IconoChevronAbajo />
                </span>
              </summary>
              <div className="mt-1 flex flex-col gap-3 border-t border-bahia/25 pb-5 pt-4 text-[15px] leading-6 lg:gap-3.5 lg:pb-6 lg:pt-5 lg:text-base lg:leading-[1.7]">
                {episodio.transcripcion.map((linea, i) => (
                  <p key={`${linea.tiempo}-${i}`} className="m-0">
                    <strong>
                      {linea.tiempo} · {linea.quien}:
                    </strong>{" "}
                    {linea.texto}
                  </p>
                ))}
                {transcripcionHref ? (
                  <a
                    href={transcripcionHref}
                    className="inline-flex min-h-11 items-center self-start font-semibold underline-offset-[6px]"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Descargar la transcripción completa
                  </a>
                ) : (
                  <span className="inline-flex min-h-11 items-center self-start font-semibold">
                    Descargar la transcripción completa
                  </span>
                )}
              </div>
            </details>
          </div>

          <aside
            aria-label="Episodios relacionados"
            className="flex flex-[1_1_320px] flex-col gap-2.5 lg:gap-3.5"
          >
            <h2 className="m-0 px-1 font-serif text-[26px] font-normal leading-[34px] text-bahia lg:mb-1 lg:px-0 lg:text-h3">
              Episodios relacionados
            </h2>
            {relacionados.map((e) => (
              <EpisodioRelacionado key={e.slug} episodio={e} />
            ))}
            <Link
              to="/podcast"
              className={cn(
                "mt-1.5 inline-flex min-h-[52px] items-center justify-center rounded-full border-[1.5px] border-bahia font-semibold no-underline lg:mt-0 lg:min-h-11 lg:justify-start lg:border-0 lg:underline-offset-[6px]",
              )}
            >
              Ver todos los episodios
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}

export default function PodcastEpisodio() {
  const { episodio, relacionados } = useLoaderData<typeof loader>();

  return (
    <ReproductorProvider barraFija={false}>
      <ContenidoEpisodio
        episodio={episodio}
        relacionados={relacionados}
      />
    </ReproductorProvider>
  );
}
