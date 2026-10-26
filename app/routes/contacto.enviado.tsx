import { Link } from "react-router";

import { BotanicaEnLinea } from "~/components/ilustracion/BotanicaEnLinea";
import { Boton } from "~/components/ui/Boton";
import { sitio } from "~/content";

import type { Route } from "./+types/contacto.enviado";

export function meta(): ReturnType<Route.MetaFunction> {
  return [
    { title: "Mensaje enviado · Ser, Mujer" },
    {
      name: "description",
      content:
        "Recibimos tu mensaje. Te responderemos con calma por el medio que elegiste.",
    },
  ];
}

function AvisoHistorial({ className }: { className?: string }) {
  return (
    <div
      role="note"
      className={className}
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
        className="mt-0.5 size-[22px] shrink-0"
      >
        <path d="M12 4l9 15.5H3L12 4z" />
        <path d="M12 10v4.5M12 17h.01" />
      </svg>
      <div>
        Si compartes este dispositivo, quizá quieras borrar tu historial.{" "}
        <Link
          to={sitio.enlaceSeguridad.href}
          className="font-semibold underline-offset-4"
        >
          Te explicamos cómo
        </Link>
        .
      </div>
    </div>
  );
}

export default function ContactoEnviado() {
  return (
    <div
      id="arriba"
      className="flex flex-col gap-4 px-4 py-8 lg:px-14 lg:pb-[104px] lg:pt-[88px]"
    >
      <div
        role="status"
        className="mx-auto flex w-full max-w-[820px] flex-col gap-4 rounded-[28px] bg-blanco px-5 pb-7 pt-9 text-bahia lg:items-center lg:gap-5 lg:rounded-[32px] lg:px-[72px] lg:py-16 lg:text-center"
      >
        <BotanicaEnLinea className="h-16 w-12 lg:h-20 lg:w-[60px]" />

        <h1 className="m-0 font-serif text-[30px] font-normal leading-[38px] lg:text-h2 lg:leading-[54px]">
          Recibimos tu mensaje.{" "}
          <span className="italic">Gracias por escribir.</span>
        </h1>

        <p className="m-0 max-w-[560px] text-cuerpo leading-7 lg:text-[19px] lg:leading-8">
          Sabemos que no siempre es fácil dar este paso. No tienes que
          hacer nada más por ahora.
        </p>

        <div className="mt-0 flex w-full flex-col gap-4 self-stretch text-left lg:mt-3 lg:grid lg:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] lg:gap-4">
          <div className="rounded-2xl bg-crema px-[18px] py-4 lg:rounded-[20px] lg:px-6 lg:py-[22px]">
            <div className="font-semibold">Qué sigue</div>
            <div className="text-[15px] leading-6 lg:text-base lg:leading-[1.7]">
              Te responderemos por el medio que elegiste en{" "}
              {sitio.tiempoRespuesta}. Si pediste no ser contactada, no te
              escribiremos.
            </div>
          </div>
          <div className="rounded-2xl bg-crema px-[18px] py-4 lg:rounded-[20px] lg:px-6 lg:py-[22px]">
            <div className="font-semibold">Cómo se verá nuestro mensaje</div>
            <div className="text-[15px] leading-6 lg:text-base lg:leading-[1.7]">
              Será breve y discreto, firmado por {sitio.nombreFirma}. No
              mencionará el motivo de tu consulta.
            </div>
          </div>
        </div>

        <div className="mt-1 flex w-full flex-col gap-3 lg:mt-4 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-4 lg:gap-y-3">
          <Boton
            variante="secundario"
            tamano="grande"
            href="/agendar"
            className="w-full px-8 lg:w-auto"
          >
            Si quieres, agenda una sesión
          </Boton>
          <div className="flex justify-center gap-7 lg:contents">
            <Boton
              variante="texto"
              tamano="grande"
              href="/recursos"
              className="min-h-11 px-3 lg:min-h-14"
            >
              Explorar recursos
            </Boton>
            <Boton
              variante="texto"
              tamano="grande"
              href="/"
              className="min-h-11 px-3 lg:min-h-14"
            >
              Volver al inicio
            </Boton>
          </div>
        </div>

        <AvisoHistorial className="mt-3 hidden w-full gap-3.5 self-stretch rounded-2xl border-[1.5px] border-naranja px-5 py-4 text-left text-base text-bahia lg:mt-3 lg:flex" />
      </div>

      <AvisoHistorial className="mx-auto flex w-full max-w-[820px] gap-3 rounded-2xl border-[1.5px] border-naranja px-4 py-3.5 text-[15px] leading-6 text-bahia lg:hidden" />
    </div>
  );
}
