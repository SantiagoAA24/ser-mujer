import { Link } from "react-router";

import { MiniaturaAbstracta } from "~/components/ilustracion/MiniaturaAbstracta";
import { Boton } from "~/components/ui/Boton";
import { Etiqueta } from "~/components/ui/Etiqueta";
import { EtiquetaSeccion } from "~/components/ui/EtiquetaSeccion";
import {
  listarTestimonios,
  obtenerTestimonioDestacado,
} from "~/content";
import type { Testimonio } from "~/content/types";
import {
  ETIQUETA_TEMA,
  ariaReproducirTestimonio,
  varianteEtiquetaTemaTestimonio,
} from "~/lib/testimonios";

function IconoConsentimiento({ className }: { className?: string }) {
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
      className={className ?? "shrink-0 text-exito"}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.8 2.8L16 9.5" />
    </svg>
  );
}

function FilasLista({ items }: { items: Testimonio[] }) {
  return (
    <>
      {items.map((t) => (
        <Link
          key={t.slug}
          to="/testimonios"
          className="flex items-center gap-3.5 rounded-[20px] bg-blanco p-3 no-underline lg:gap-[18px] lg:p-3.5"
        >
          <MiniaturaAbstracta
            variante={t.variante}
            layout="lista"
            conPatron={t.variante === 3}
            className="h-[76px] w-[112px] shrink-0 lg:h-auto lg:w-[150px] lg:aspect-[16/10]"
          />
          <span className="flex flex-col gap-0.5">
            <span className="font-serif text-[19px] leading-[25px] text-bahia lg:text-[21px] lg:leading-7">
              {t.titulo}
            </span>
            <span className="text-[13.5px] leading-5 text-bahia lg:text-sm">
              {ETIQUETA_TEMA[t.tema]} · {t.duracion} · Con su consentimiento
            </span>
          </span>
        </Link>
      ))}
    </>
  );
}

/**
 * Bloque de testimonios para el inicio (destacado + 3 en lista).
 * Referencia: design/referencia/testimonios-seccion.*.html
 */
export function SeccionTestimonios() {
  const todos = listarTestimonios();
  const destacado = obtenerTestimonioDestacado();
  if (destacado == null) return null;

  const resto = todos.filter((t) => t.slug !== destacado.slug).slice(0, 3);

  return (
    <section className="px-4 py-16 lg:px-14 lg:py-24">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-4 lg:gap-11">
        <div className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between lg:gap-x-16">
          <div className="flex flex-col gap-2 px-1 lg:gap-4 lg:px-0">
            <EtiquetaSeccion>Testimonios</EtiquetaSeccion>
            <h2 className="m-0 font-serif text-h2-m font-normal text-bahia lg:text-h2">
              Historias compartidas,{" "}
              <span className="italic">en sus palabras</span>
            </h2>
          </div>
          <Boton
            variante="texto"
            href="/testimonios"
            className="hidden px-0 lg:inline-flex"
          >
            Ver todos los testimonios
          </Boton>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-stretch lg:gap-x-10 lg:gap-y-7">
          <article className="flex flex-col gap-2 lg:flex-[1.5_1_520px] lg:gap-4">
            <Link
              to="/testimonios"
              aria-label={ariaReproducirTestimonio(
                destacado.titulo,
                destacado.duracion,
              )}
              className="relative block h-[204px] overflow-hidden rounded-[24px] no-underline lg:h-auto lg:aspect-[16/9] lg:rounded-[28px]"
            >
              <MiniaturaAbstracta
                variante={destacado.variante}
                layout="formas"
                conPatron
                className="absolute inset-0"
              />
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 z-10 flex size-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bahia text-crema lg:size-[88px]"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="lg:h-8 lg:w-8"
                >
                  <path d="M8 5.5v13l11-6.5-11-6.5z" />
                </svg>
              </span>
              <span className="absolute right-3 bottom-3 z-10 rounded-full bg-blanco px-3 py-0.5 text-sm font-semibold text-bahia lg:right-4 lg:bottom-4">
                {destacado.duracion}
              </span>
            </Link>

            {/* Meta móvil */}
            <div className="flex flex-col gap-1.5 px-1 lg:hidden">
              <h3 className="m-0 font-serif text-h3-m font-normal">
                {destacado.titulo}
              </h3>
              <div className="flex items-center gap-2 text-sm leading-[22px]">
                <IconoConsentimiento />
                {ETIQUETA_TEMA[destacado.tema]} · Publicado con su consentimiento
              </div>
            </div>

            {/* Meta escritorio */}
            <div className="hidden flex-wrap items-center gap-x-4 gap-y-2.5 lg:flex">
              <Etiqueta
                variante={varianteEtiquetaTemaTestimonio(destacado.tema)}
              >
                {ETIQUETA_TEMA[destacado.tema]}
              </Etiqueta>
              <span className="inline-flex items-center gap-2 text-sm">
                <IconoConsentimiento />
                Publicado con su consentimiento
              </span>
            </div>
            <h3 className="m-0 hidden font-serif text-h3 font-normal lg:block">
              {destacado.titulo}
            </h3>
          </article>

          <div className="mt-2 flex flex-col gap-3 lg:mt-0 lg:flex-[1_1_380px] lg:gap-4">
            <FilasLista items={resto} />
            <p className="m-0 px-1 text-sm leading-[22px] lg:px-1 lg:pt-1">
              Las miniaturas son ilustraciones: protegemos la identidad de
              quienes comparten. Los videos tienen subtítulos y no se reproducen
              solos.
            </p>
          </div>
        </div>

        <Boton
          variante="secundario"
          href="/testimonios"
          className="w-full justify-center lg:hidden"
        >
          Ver todos los testimonios
        </Boton>
      </div>
    </section>
  );
}
