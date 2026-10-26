import { type ReactNode, useState } from "react";

import { cn } from "~/components/ui/cn";

export type PreguntaFrecuenteProps = {
  pregunta: string;
  respuesta: ReactNode;
  /** Si es true, el acordeón inicia abierto. */
  abierta?: boolean;
  className?: string;
};

export function PreguntaFrecuente({
  pregunta,
  respuesta,
  abierta = false,
  className,
}: PreguntaFrecuenteProps) {
  const [abierto, setAbierto] = useState(abierta);

  return (
    <details
      open={abierto}
      onToggle={(evento) => {
        setAbierto(evento.currentTarget.open);
      }}
      className={cn(
        "group rounded-[20px] bg-blanco px-5 py-1 lg:px-7 lg:py-2",
        className,
      )}
    >
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 font-sans text-[17px] font-semibold text-bahia marker:content-none lg:gap-4 lg:text-[19px] [&::-webkit-details-marker]:hidden">
        <span>{pregunta}</span>
        <span className="relative size-5 shrink-0" aria-hidden="true">
          <svg
            className="absolute inset-0 size-5 group-open:hidden"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M10 4v12M4 10h12" />
          </svg>
          <svg
            className="absolute inset-0 hidden size-5 group-open:block"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M4 10h12" />
          </svg>
        </span>
      </summary>
      <div className="max-w-[640px] pb-4 text-base leading-7 text-bahia lg:pb-5 [&_ol]:m-0 [&_ol]:list-decimal [&_ol]:ps-5 [&_ol]:leading-7 [&_p]:m-0 [&_p+p]:mt-3 [&_li+li]:mt-1.5">
        {typeof respuesta === "string" || typeof respuesta === "number" ? (
          <p className="m-0">{respuesta}</p>
        ) : (
          respuesta
        )}
      </div>
    </details>
  );
}
