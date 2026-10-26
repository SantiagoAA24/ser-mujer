import { useId, useState } from "react";

import { Boton } from "~/components/ui/Boton";
import { CampoTexto } from "~/components/ui/CampoTexto";
import { Casilla } from "~/components/ui/Casilla";
import { cn } from "~/components/ui/cn";
import type { Recurso } from "~/content/types";
import {
  ETIQUETA_TEMA,
  ETIQUETA_TIPO,
  ICONO_TIPO,
} from "~/lib/recursos";

export type TarjetaRecursoProps = {
  recurso: Recurso;
  className?: string;
};

function IconoDocumento({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 12h5M10 16h5" />
    </svg>
  );
}

function IconoAudifonos({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 14v-2a7 7 0 0 1 14 0v2" />
      <rect x="4" y="14" width="4" height="6" rx="1.5" />
      <rect x="16" y="14" width="4" height="6" rx="1.5" />
    </svg>
  );
}

function IconoDescarga({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
    </svg>
  );
}

function IconoExito({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.8 2.8L16 9.5" />
    </svg>
  );
}

function dispararDescarga(archivo: string) {
  const enlace = document.createElement("a");
  enlace.href = archivo;
  enlace.download = "";
  enlace.rel = "noopener";
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
}

export function TarjetaRecurso({ recurso, className }: TarjetaRecursoProps) {
  const idCorreo = useId();
  const [panelAbierto, setPanelAbierto] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [boletin, setBoletin] = useState(false);

  const ariaDescargar = `Descargar: ${recurso.titulo} (${recurso.formato}, ${recurso.detalle})`;
  const mostrarBoton = !panelAbierto && !mensaje;
  const esPdf = recurso.formato === "PDF";

  function marcarListo(texto: string) {
    setMensaje(texto);
    setPanelAbierto(false);
  }

  function soloDescargar() {
    dispararDescarga(recurso.archivo);
    marcarListo("Descarga iniciada");
  }

  function enviarACorreo() {
    // TODO(fase 7): enviar el recurso por correo y suscribir al boletín si aplica (Brevo/MailerLite).
    dispararDescarga(recurso.archivo);
    marcarListo("Descarga iniciada · también va a tu correo");
  }

  return (
    <article
      className={cn(
        "flex flex-col items-start gap-3 rounded-tarjeta bg-blanco p-5 text-bahia lg:gap-3 lg:p-7",
        className,
      )}
    >
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className={cn(
              "flex size-[52px] shrink-0 items-center justify-center rounded-[14px] lg:size-14 lg:rounded-2xl",
              ICONO_TIPO[recurso.tipo],
            )}
          >
            {esPdf ? <IconoDocumento /> : <IconoAudifonos />}
          </div>
          <div className="flex flex-col leading-snug">
            <span className="text-[15px] font-semibold">{recurso.formato}</span>
            <span className="text-sm lg:text-[14px]">{recurso.detalle}</span>
          </div>
        </div>
        <span className="rounded-full bg-crema px-3 py-0.5 text-[13.5px] font-semibold">
          {ETIQUETA_TIPO[recurso.tipo]}
        </span>
      </div>

      <h3 className="mt-1 font-serif text-[22px] font-normal leading-[29px] lg:text-h3">
        {recurso.titulo}
      </h3>
      <p className="m-0 text-[15px] leading-6 lg:text-[15.5px]">
        {recurso.descripcion}
      </p>
      <div className="text-[13.5px] font-semibold leading-5 lg:text-sm">
        {ETIQUETA_TEMA[recurso.tema]} · Gratuito
      </div>

      {mostrarBoton && !recurso.correoOpcional ? (
        <a
          href={recurso.archivo}
          download
          aria-label={ariaDescargar}
          className="mt-1 inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-bahia px-7 py-3 pl-[22px] font-sans text-base font-semibold text-crema no-underline hover:bg-bahia-profundo"
          onClick={() => marcarListo("Descarga iniciada")}
        >
          <IconoDescarga />
          Descargar
        </a>
      ) : null}

      {mostrarBoton && recurso.correoOpcional ? (
        <Boton
          type="button"
          aria-label={ariaDescargar}
          className="mt-1 gap-2.5 px-7 pl-[22px]"
          onClick={() => setPanelAbierto(true)}
        >
          <IconoDescarga />
          Descargar
        </Boton>
      ) : null}

      {panelAbierto ? (
        <div className="mt-1 flex w-full flex-col gap-3 rounded-[18px] bg-crema p-5">
          <div>
            <div className="font-semibold">
              ¿Quieres recibirlo también por correo?
            </div>
            <div className="text-[14.5px]">
              Es opcional. Puedes descargarlo ahora sin dejar ningún dato.
            </div>
          </div>
          <CampoTexto
            id={idCorreo}
            etiqueta="Tu correo"
            opcional
            type="email"
            autoComplete="off"
            placeholder="nombre@ejemplo.com"
          />
          <Casilla
            etiqueta="Además quiero recibir el boletín [FRECUENCIA]. Puedo darme de baja cuando quiera."
            checked={boletin}
            onChange={(e) => setBoletin(e.target.checked)}
            contenedorClassName="items-start text-[14.5px] leading-normal"
          />
          <div className="flex flex-wrap gap-2.5">
            <Boton
              type="button"
              tamano="pequeno"
              className="min-h-12 px-6"
              onClick={soloDescargar}
            >
              Solo descargar
            </Boton>
            <Boton
              type="button"
              variante="secundario"
              tamano="pequeno"
              className="min-h-12 px-6"
              onClick={enviarACorreo}
            >
              Enviar a mi correo
            </Boton>
          </div>
        </div>
      ) : null}

      {mensaje ? (
        <div
          role="status"
          className="mt-1 flex min-h-[52px] items-center gap-2.5 text-[15px] font-semibold text-exito"
        >
          <IconoExito />
          {mensaje}
        </div>
      ) : null}
    </article>
  );
}
