import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";

import { AreaTexto } from "~/components/ui/AreaTexto";
import { Aviso } from "~/components/ui/Aviso";
import { Boton } from "~/components/ui/Boton";
import { CampoTexto } from "~/components/ui/CampoTexto";
import { EtiquetaSeccion } from "~/components/ui/EtiquetaSeccion";
import { GrupoOpciones } from "~/components/ui/GrupoOpciones";
import { cn } from "~/components/ui/cn";
import { sitio } from "~/content";
import { enlaceUsable } from "~/lib/enlaces";
import { formspreeUrl } from "~/lib/env";

import type { Route } from "./+types/contacto";

export function meta(): ReturnType<Route.MetaFunction> {
  return [
    { title: "Contacto · Ser, Mujer" },
    {
      name: "description",
      content:
        "Escríbenos con calma y sin compromiso. Respondemos por el medio que prefieras.",
    },
  ];
}

type ViaContacto = "correo" | "whatsapp" | "ninguna";

type ErroresForm = {
  nombre?: string;
  via?: string;
  correo?: string;
  whatsapp?: string;
};

const OPCIONES_VIA = [
  { valor: "correo", etiqueta: "Por correo electrónico" },
  { valor: "whatsapp", etiqueta: "Por WhatsApp" },
  { valor: "ninguna", etiqueta: "Prefiero no ser contactada" },
] as const;

const CORREO_OK = /.+@.+\..+/;

function EnlacesDirectos({ className }: { className?: string }) {
  const whatsappOk = enlaceUsable(sitio.whatsapp.href);
  return (
    <p className={cn("m-0 text-base text-bahia", className)}>
      ¿Prefieres hablar directamente?{" "}
      {whatsappOk ? (
        <a
          href={sitio.whatsapp.href}
          className="font-semibold underline-offset-[6px]"
          rel="noopener noreferrer"
          target="_blank"
        >
          Escríbenos por WhatsApp
        </a>
      ) : (
        <span className="font-semibold">Escríbenos por WhatsApp</span>
      )}{" "}
      o{" "}
      <Link
        to="/agendar"
        className="font-semibold underline-offset-[6px]"
      >
        agenda una sesión
      </Link>
      .
    </p>
  );
}

function IconoCandado({ className }: { className?: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("mt-0.5 shrink-0", className)}
    >
      <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  );
}

type EstadoEnvio = "idle" | "enviando" | "error";

export default function Contacto() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [via, setVia] = useState<ViaContacto>("correo");
  const [errores, setErrores] = useState<ErroresForm>({});
  const [estado, setEstado] = useState<EstadoEnvio>("idle");
  const debeEnfocarError = useRef(false);

  useEffect(() => {
    if (!debeEnfocarError.current) return;
    debeEnfocarError.current = false;
    const primero = formRef.current?.querySelector<HTMLElement>(
      "[aria-invalid=true]",
    );
    primero?.focus();
  }, [errores]);

  async function validarYEnviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado === "enviando") return;

    const form = e.currentTarget;
    const datos = new FormData(form);
    const nombre = String(datos.get("nombre") ?? "").trim();
    const correo = String(datos.get("correo") ?? "").trim();
    const whatsapp = String(datos.get("whatsapp") ?? "").trim();
    const next: ErroresForm = {};

    if (!nombre) {
      next.nombre = "Escribe un nombre o seudónimo.";
    }

    if (via === "correo") {
      if (!correo) {
        next.correo = "Escribe un correo para poder responderte.";
      } else if (!CORREO_OK.test(correo)) {
        next.correo =
          "Parece que falta una parte, por ejemplo @correo.com.";
      }
    } else if (via === "whatsapp") {
      if (!whatsapp) {
        next.whatsapp =
          "Escribe un número de WhatsApp para poder responderte.";
      }
    }

    if (Object.keys(next).length > 0) {
      debeEnfocarError.current = true;
      setErrores(next);
      setEstado("idle");
      return;
    }

    setErrores({});

    const endpoint = formspreeUrl();
    if (!endpoint) {
      setEstado("error");
      return;
    }

    // No enviar el honeypot si está vacío (Formspree lo ignora si tiene valor).
    const payload = new FormData();
    payload.set("nombre", nombre);
    payload.set("via", via);
    if (via === "correo") payload.set("correo", correo);
    if (via === "whatsapp") payload.set("whatsapp", whatsapp);
    const mensaje = String(datos.get("mensaje") ?? "").trim();
    if (mensaje) payload.set("mensaje", mensaje);
    const gotcha = String(datos.get("_gotcha") ?? "");
    if (gotcha) payload.set("_gotcha", gotcha);

    setEstado("enviando");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        setEstado("error");
        return;
      }
      navigate("/contacto/enviado");
    } catch {
      setEstado("error");
    }
  }

  return (
    <div
      id="arriba"
      className="px-5 py-10 lg:px-14 lg:pb-24 lg:pt-20"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 lg:flex-row lg:flex-wrap lg:items-start lg:gap-x-20 lg:gap-y-12">
        <div className="flex flex-1 flex-col items-start gap-5 lg:basis-[400px] lg:gap-[22px]">
          <EtiquetaSeccion>Primer contacto</EtiquetaSeccion>
          <h1 className="m-0 font-serif text-[40px] font-normal leading-[46px] tracking-[-0.01em] text-bahia lg:text-[clamp(40px,4.6vw,64px)] lg:leading-[1.1]">
            Escríbenos{" "}
            <span className="italic">cuando quieras</span>
          </h1>
          <p className="m-0 max-w-[480px] text-cuerpo leading-7 text-bahia lg:text-[19px] lg:leading-8">
            <span className="lg:hidden">
              Es un formulario corto. Solo te pedimos lo necesario para
              responderte, y puedes dejar en blanco lo que prefieras.
            </span>
            <span className="hidden lg:inline">
              Es un formulario corto. Solo te pedimos lo necesario para
              poder responderte, y puedes dejar en blanco lo que prefieras.
            </span>
          </p>

          <div
            role="note"
            className="flex max-w-[480px] gap-3.5 rounded-[20px] bg-niebla px-5 py-[18px] text-bahia lg:gap-4 lg:px-6 lg:py-[22px]"
          >
            <IconoCandado className="size-6 lg:size-[26px]" />
            <div>
              <div className="font-semibold">
                Lo que compartas aquí es confidencial
              </div>
              <div className="text-[15px] leading-6 lg:text-base lg:leading-[1.7]">
                Se queda entre nosotras, y tú decides cuánto contar.
              </div>
            </div>
          </div>

          <EnlacesDirectos className="hidden lg:block" />
        </div>

        <form
          ref={formRef}
          noValidate
          onSubmit={validarYEnviar}
          className="relative flex w-full flex-col gap-6 rounded-[28px] bg-blanco px-5 py-7 lg:flex-[1.2] lg:basis-[480px] lg:gap-7 lg:rounded-[32px] lg:p-12"
        >
          {/* Campo trampa: oculto a humanas; Formspree descarta si tiene valor. */}
          <div className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
            <label htmlFor="c-gotcha">
              No rellenar
              <input
                id="c-gotcha"
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          {estado === "error" ? (
            <Aviso tono="error" titulo="No pudimos enviar tu mensaje">
              No es por algo que hayas hecho. Puedes intentarlo de nuevo en un
              momento.
            </Aviso>
          ) : null}

          <CampoTexto
            id="c-nombre"
            name="nombre"
            etiqueta="¿Cómo quieres que te llamemos?"
            placeholder="Tu nombre o un seudónimo"
            autoComplete="off"
            ayuda="No hace falta tu nombre real."
            error={errores.nombre}
          />

          <GrupoOpciones
            name="via"
            leyenda="¿Cómo prefieres que te contactemos?"
            opciones={[...OPCIONES_VIA]}
            valor={via}
            error={errores.via}
            onChange={(e) => {
              setVia(e.target.value as ViaContacto);
              setErrores((prev) =>
                prev.nombre ? { nombre: prev.nombre } : {},
              );
            }}
            className={cn(
              "[&_div]:gap-2",
              "[&_label]:min-h-[52px] [&_label]:rounded-xl [&_label]:border-[1.5px] [&_label]:border-bahia/35 [&_label]:bg-blanco [&_label]:px-4 [&_label]:py-2 lg:[&_label]:gap-3.5 lg:[&_label]:px-[18px]",
              "[&_label:has(input:checked)]:border-bahia [&_label:has(input:checked)]:bg-crema",
            )}
          />

          {via === "correo" ? (
            <CampoTexto
              id="c-correo"
              name="correo"
              type="email"
              etiqueta="Tu correo"
              placeholder="nombre@ejemplo.com"
              autoComplete="off"
              ayuda="Elige un correo que solo tú revises."
              error={errores.correo}
            />
          ) : null}

          {via === "whatsapp" ? (
            <CampoTexto
              id="c-tel"
              name="whatsapp"
              type="tel"
              etiqueta="Tu número de WhatsApp"
              placeholder="Con indicativo, p. ej. +57…"
              autoComplete="off"
              ayuda="Elige un número que solo tú revises. Nuestro primer mensaje será discreto."
              error={errores.whatsapp}
            />
          ) : null}

          {via === "ninguna" ? (
            <div className="rounded-xl bg-crema px-4 py-3.5 text-[15px] leading-6 text-bahia lg:px-[18px] lg:py-4 lg:text-base lg:leading-[1.7]">
              Está bien. No te escribiremos: leeremos tu mensaje y aquí
              seguiremos cuando quieras volver.
            </div>
          ) : null}

          <AreaTexto
            id="c-msg"
            name="mensaje"
            opcional
            etiqueta="¿Quieres contarnos algo?"
            placeholder="Hasta donde te sientas cómoda. También puedes dejarlo en blanco."
            rows={4}
          />

          <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-6 lg:gap-y-3">
            <Boton
              type="submit"
              variante="primario"
              tamano="grande"
              disabled={estado === "enviando"}
              aria-disabled={estado === "enviando"}
            >
              {estado === "enviando" ? "Enviando…" : "Enviar mensaje"}
            </Boton>
            <p className="m-0 max-w-[260px] text-center text-sm text-bahia lg:text-left">
              Al enviar no te comprometes a nada.
            </p>
          </div>
        </form>

        <EnlacesDirectos className="px-1 text-[15px] leading-6 lg:hidden" />
      </div>
    </div>
  );
}
