import { useState, type FormEvent } from "react";
import {
  data,
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useNavigate,
} from "react-router";

import { TarjetaProfesional } from "~/components/contenido/TarjetaProfesional";
import { Boton } from "~/components/ui/Boton";
import { CampoTexto } from "~/components/ui/CampoTexto";
import { Etiqueta } from "~/components/ui/Etiqueta";
import {
  cuposCompletos,
  etiquetaModalidad,
  formatoDuracion,
  formatoPrecio,
  textoCuposDetalle,
} from "~/lib/eventos";
import {
  formatoFechaEventoLarga,
  formatoHora,
} from "~/lib/fechas";
import {
  obtenerEvento,
  obtenerProfesional,
} from "~/content";

import type { Route } from "./+types/eventos.$slug";

export function meta(): ReturnType<Route.MetaFunction> {
  return [{ title: "Ser, Mujer" }];
}

export function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug ?? "";
  const evento = obtenerEvento(slug);
  if (!evento) {
    throw data("No encontrado", { status: 404 });
  }
  const acompanante = obtenerProfesional(evento.acompanante);
  return { evento, acompanante };
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

type ErroresForm = {
  nombre?: string;
  medio?: string;
};

export default function EventoDetalle() {
  const { evento, acompanante } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const lleno = cuposCompletos(evento.cupos);
  const [errores, setErrores] = useState<ErroresForm>({});

  const duracion = formatoDuracion(evento.duracionMin);
  const horaConDuracion = duracion
    ? `${formatoHora(evento.inicio)} · ${duracion}`
    : formatoHora(evento.inicio);
  const precioTexto = formatoPrecio(evento.precio);
  const subtituloReserva =
    evento.precio === null
      ? "Dos datos y listo. Es gratuito y puedes cancelar cuando quieras."
      : `Dos datos y listo. El valor es ${precioTexto} y puedes cancelar cuando quieras.`;

  function validarYEnviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const datos = new FormData(form);
    const nombre = String(datos.get("nombre") ?? "").trim();
    const medio = String(datos.get("medio") ?? "").trim();
    const next: ErroresForm = {};
    if (!nombre) next.nombre = "Escribe un nombre o seudónimo.";
    if (!medio) next.medio = "Indica un correo o WhatsApp.";
    setErrores(next);
    if (Object.keys(next).length > 0) return;

    // TODO(fase-7): conectar Cal.com con evento.calSlug
    navigate(`/eventos/${evento.slug}/confirmado`);
  }

  return (
    <main id="arriba">
      <section className="flex flex-col items-start gap-3.5 bg-niebla px-5 pb-10 pt-4 text-bahia lg:gap-4 lg:px-14 lg:pb-16 lg:pt-10">
        <Link
          to="/eventos"
          className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold underline-offset-[6px]"
        >
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
          Todos los eventos
        </Link>

        <div className="flex flex-wrap gap-2">
          <Etiqueta variante="contorno">
            {etiquetaModalidad(evento.modalidad)}
          </Etiqueta>
          <Etiqueta variante="blanco">{precioTexto}</Etiqueta>
        </div>

        <h1 className="m-0 max-w-[820px] font-serif text-[36px] font-normal leading-[42px] tracking-[-0.01em] lg:text-[clamp(40px,4.6vw,64px)] lg:leading-[1.1]">
          {evento.titulo}
        </h1>

        <dl className="m-0 grid w-full grid-cols-[96px_minmax(0,1fr)] gap-x-3 gap-y-1.5 text-[15px] leading-6 lg:flex lg:flex-wrap lg:gap-x-14 lg:gap-y-4">
          <div className="contents lg:block">
            <dt className="font-semibold lg:text-[13px] lg:font-semibold lg:uppercase lg:tracking-[0.08em]">
              Fecha
            </dt>
            <dd className="m-0 font-semibold lg:font-serif lg:text-2xl lg:font-normal lg:leading-8">
              {formatoFechaEventoLarga(evento.inicio)}
            </dd>
          </div>
          <div className="contents lg:block">
            <dt className="font-semibold lg:text-[13px] lg:uppercase lg:tracking-[0.08em]">
              Hora
            </dt>
            <dd className="m-0 font-semibold lg:font-serif lg:text-2xl lg:font-normal lg:leading-8">
              {horaConDuracion}
            </dd>
          </div>
          <div className="contents lg:block">
            <dt className="font-semibold lg:text-[13px] lg:uppercase lg:tracking-[0.08em]">
              Modalidad
            </dt>
            <dd className="m-0 font-semibold lg:font-serif lg:text-2xl lg:font-normal lg:leading-8">
              {evento.lugar}
            </dd>
          </div>
          <div className="contents lg:block">
            <dt className="font-semibold lg:text-[13px] lg:uppercase lg:tracking-[0.08em]">
              Cupos
            </dt>
            <dd className="m-0 font-semibold lg:font-serif lg:text-2xl lg:font-normal lg:leading-8">
              {textoCuposDetalle(evento.cupos)}
            </dd>
          </div>
        </dl>

        {!lleno ? (
          <a
            href="#inscripcion"
            className="mt-1.5 flex min-h-14 w-full items-center justify-center rounded-full bg-bahia font-semibold text-crema no-underline lg:hidden"
          >
            Reservar mi lugar
          </a>
        ) : null}
      </section>

      <div className="mx-auto flex max-w-[1240px] flex-col gap-0 px-0 lg:flex-row lg:flex-wrap lg:items-start lg:gap-x-[72px] lg:gap-y-12 lg:px-14 lg:py-16 lg:pb-24">
        <section className="flex flex-1 flex-col gap-8 px-5 py-11 lg:max-w-[700px] lg:basis-[520px] lg:gap-10 lg:px-0 lg:py-0">
          <div className="flex flex-col gap-2.5 lg:gap-3">
            <h2 className="m-0 font-serif text-[26px] font-normal leading-[34px] text-bahia lg:text-h3 lg:leading-[38px]">
              De qué se trata
            </h2>
            <p className="m-0 text-[17px] leading-7 text-bahia lg:text-[19px] lg:leading-8">
              {evento.descripcion}
            </p>
            {evento.queEs ? (
              <p className="m-0 text-[15px] leading-6 text-bahia lg:text-cuerpo lg:leading-[1.7]">
                {evento.queEs}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2.5 lg:gap-3">
            <h2 className="m-0 font-serif text-[26px] font-normal leading-[34px] text-bahia lg:text-h3 lg:leading-[38px]">
              Cómo será
            </h2>
            <ul className="m-0 flex list-disc flex-col gap-1 pl-5 text-[15px] leading-6 text-bahia lg:gap-1.5 lg:pl-[22px] lg:text-cuerpo">
              {evento.comoSera.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {acompanante ? (
            <div className="flex flex-col gap-2.5 lg:gap-3">
              <h2 className="m-0 font-serif text-[26px] font-normal leading-[34px] text-bahia lg:text-h3 lg:leading-[38px]">
                Quién acompaña
              </h2>
              <TarjetaProfesional
                profesional={acompanante}
                variante="compacta"
              />
            </div>
          ) : null}
        </section>

        <section
          id="inscripcion"
          className="px-4 pb-12 lg:sticky lg:top-28 lg:flex-1 lg:basis-[400px] lg:self-start lg:px-0 lg:pb-0"
        >
          {lleno ? (
            <div className="flex flex-col gap-5 rounded-[28px] bg-blanco p-7 lg:rounded-[32px] lg:p-10">
              <h2 className="m-0 font-serif text-[26px] font-normal leading-[34px] text-bahia lg:text-h3 lg:leading-[38px]">
                Cupos completos
              </h2>
              <p className="m-0 text-[15px] leading-6 text-bahia">
                Este encuentro ya no tiene lugares disponibles. Si quieres, te
                avisamos si se libera un cupo.
              </p>
              <Boton variante="primario" href="/contacto" tamano="grande">
                Avisarme si hay cupo
              </Boton>
            </div>
          ) : (
            <form
              onSubmit={validarYEnviar}
              className="flex flex-col gap-[18px] rounded-[28px] bg-blanco px-5 py-7 lg:gap-[22px] lg:rounded-[32px] lg:p-10"
              noValidate
            >
              <div>
                <h2 className="m-0 font-serif text-[26px] font-normal leading-[34px] text-bahia lg:text-h3 lg:leading-[38px]">
                  Reserva tu lugar
                </h2>
                <p className="m-0 mt-0.5 text-[14.5px] leading-[22px] text-bahia lg:mt-1 lg:text-[15px]">
                  {subtituloReserva}
                </p>
              </div>

              <CampoTexto
                name="nombre"
                etiqueta="¿Cómo quieres que te llamemos?"
                placeholder="Tu nombre o un seudónimo"
                autoComplete="off"
                error={errores.nombre}
              />

              <CampoTexto
                name="medio"
                etiqueta="¿Dónde te enviamos el enlace?"
                placeholder="Correo o WhatsApp"
                autoComplete="off"
                ayuda="Elige un medio que solo tú revises. El mensaje será discreto."
                error={errores.medio}
              />

              <div className="flex items-baseline justify-between gap-4 rounded-2xl bg-crema px-[18px] py-3.5 lg:px-5 lg:py-4">
                <span className="font-semibold text-bahia">Valor</span>
                <span className="font-serif text-[22px] leading-[1.2] text-bahia lg:text-2xl">
                  {precioTexto}
                </span>
              </div>

              <Boton
                type="submit"
                variante="primario"
                tamano="grande"
                className="w-full"
              >
                Reservar mi lugar
              </Boton>
              <p className="m-0 -mt-1.5 text-center text-sm leading-[22px] text-bahia lg:text-left">
                Después podrás elegir si quieres un recordatorio.
              </p>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
