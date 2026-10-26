import { useId, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import { SeccionRecursosPago } from "~/components/contenido/SeccionRecursosPago";
import { TarjetaRecurso } from "~/components/contenido/TarjetaRecurso";
import { Boton } from "~/components/ui/Boton";
import { EtiquetaSeccion } from "~/components/ui/EtiquetaSeccion";
import { cn } from "~/components/ui/cn";
import { listarRecursos } from "~/content";
import {
  FILTROS_TEMA,
  FILTROS_TIPO,
  type FiltroTema,
  type FiltroTipo,
  normalizarTexto,
} from "~/lib/recursos";

export function meta() {
  return [{ title: "Ser, Mujer" }];
}

function parseTipo(valor: string | null): FiltroTipo {
  if (valor === "guia" || valor === "ejercicio" || valor === "audio") {
    return valor;
  }
  return "todos";
}

function parseTema(valor: string | null): FiltroTema {
  if (
    valor === "sanacion" ||
    valor === "amor" ||
    valor === "perdon" ||
    valor === "comunidad"
  ) {
    return valor;
  }
  return "todos";
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
        "min-h-11 shrink-0 rounded-full border-[1.5px] border-bahia px-5 py-2 font-sans text-[15px] font-semibold",
        pressed ? "bg-bahia text-crema" : "bg-transparent text-bahia",
      )}
    >
      {label}
    </button>
  );
}

export default function Recursos() {
  const idBuscar = useId();
  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState("");

  const tipo = parseTipo(searchParams.get("tipo"));
  const tema = parseTema(searchParams.get("tema"));

  const recursos = listarRecursos();

  const lista = useMemo(() => {
    const nq = normalizarTexto(q.trim());
    return recursos.filter((r) => {
      if (tipo !== "todos" && r.tipo !== tipo) return false;
      if (tema !== "todos" && r.tema !== tema) return false;
      if (!nq) return true;
      return (
        normalizarTexto(`${r.titulo} ${r.descripcion}`).includes(nq)
      );
    });
  }, [recursos, q, tipo, tema]);

  function actualizarFiltro(clave: "tipo" | "tema", valor: string) {
    const next = new URLSearchParams(searchParams);
    if (valor === "todos") {
      next.delete(clave);
    } else {
      next.set(clave, valor);
    }
    setSearchParams(next, { replace: true, preventScrollReset: true });
  }

  function limpiar() {
    setQ("");
    setSearchParams({}, { replace: true, preventScrollReset: true });
  }

  const conteo =
    lista.length === 1 ? "1 recurso" : `${lista.length} recursos`;

  return (
    <>
      <section className="degradado px-5 py-12 lg:px-14 lg:pb-24 lg:pt-[88px]">
        <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-5 lg:gap-[22px]">
          <EtiquetaSeccion>Recursos gratuitos</EtiquetaSeccion>
          <h1 className="m-0 max-w-[780px] font-serif text-h1-m font-normal tracking-[-0.01em] text-bahia lg:text-h1 lg:leading-[1.08]">
            Herramientas para{" "}
            <span className="italic">cuando las necesites</span>
          </h1>
          <p className="m-0 max-w-[560px] text-[17px] leading-7 text-bahia lg:text-[19px] lg:leading-8">
            Guías, ejercicios y audios para usar en privado y a tu ritmo. Todo
            es gratuito y se descarga sin registrarte.
          </p>
          <div
            role="search"
            className="mt-1 flex w-full max-w-[640px] flex-col gap-2 self-stretch"
          >
            <label
              htmlFor={idBuscar}
              className="font-sans text-[15px] font-semibold text-bahia"
            >
              Buscar en la biblioteca
            </label>
            <div className="relative">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
                className="pointer-events-none absolute top-[15px] left-[18px] text-bahia lg:top-[17px] lg:left-5"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l4.5 4.5" />
              </svg>
              <input
                id={idBuscar}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Por ejemplo: calma, límites, carta…"
                className="box-border h-[52px] w-full rounded-full border-[1.5px] border-bahia bg-blanco py-0 pr-5 pl-[50px] font-sans text-base font-normal text-bahia placeholder:text-bahia/50 lg:h-14 lg:pl-[54px] lg:text-[17px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Biblioteca"
        className="flex flex-col gap-3 px-0 py-8 lg:gap-7 lg:px-14 lg:py-14 lg:pb-[72px]"
      >
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-4 lg:gap-7">
          <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between lg:gap-x-10 lg:gap-y-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:gap-x-10 lg:gap-y-4">
              <div
                role="group"
                aria-label="Filtrar por tipo"
                className="flex flex-col gap-2"
              >
                <div className="px-5 text-[13px] font-semibold tracking-[0.08em] uppercase lg:px-0">
                  Tipo
                </div>
                <div className="flex gap-2 overflow-x-auto px-4 pb-1 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0">
                  {FILTROS_TIPO.map((f) => (
                    <ChipFiltro
                      key={f.valor}
                      label={f.label}
                      pressed={tipo === f.valor}
                      onClick={() => actualizarFiltro("tipo", f.valor)}
                    />
                  ))}
                </div>
              </div>
              <div
                role="group"
                aria-label="Filtrar por tema"
                className="flex flex-col gap-2"
              >
                <div className="px-5 text-[13px] font-semibold tracking-[0.08em] uppercase lg:px-0">
                  Tema
                </div>
                <div className="flex gap-2 overflow-x-auto px-4 pb-1 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0">
                  {FILTROS_TEMA.map((f) => (
                    <ChipFiltro
                      key={f.valor}
                      label={f.label}
                      pressed={tema === f.valor}
                      onClick={() => actualizarFiltro("tema", f.valor)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div
              aria-live="polite"
              className="px-5 text-sm lg:px-0 lg:pb-2.5 lg:text-[15px]"
            >
              {conteo}
            </div>
          </div>

          {lista.length === 0 ? (
            <div className="mx-4 flex flex-col items-center gap-3 rounded-tarjeta bg-blanco px-5 py-8 text-center lg:mx-0 lg:gap-3 lg:p-12">
              <h2 className="m-0 font-serif text-h3-m font-normal lg:text-h3">
                No encontramos recursos con esa búsqueda
              </h2>
              <p className="m-0 max-w-[480px] text-[15px] leading-6 lg:text-cuerpo lg:leading-7">
                Prueba con otra palabra o quita algún filtro. Si buscas algo en
                particular, escríbenos y te orientamos.
              </p>
              <Boton
                type="button"
                variante="secundario"
                className="mt-1"
                onClick={limpiar}
              >
                Ver todos los recursos
              </Boton>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5 px-4 lg:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] lg:gap-5 lg:px-0 lg:items-start">
              {lista.map((recurso) => (
                <TarjetaRecurso key={recurso.slug} recurso={recurso} />
              ))}
            </div>
          )}
        </div>
      </section>

      <SeccionRecursosPago />
    </>
  );
}
