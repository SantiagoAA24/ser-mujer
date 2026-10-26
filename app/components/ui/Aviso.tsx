import type { ReactNode } from "react";

import { cn } from "./cn";

export type AvisoTono = "info" | "exito" | "aviso" | "error";

export type AvisoProps = {
  tono: AvisoTono;
  titulo: ReactNode;
  children: ReactNode;
  className?: string;
};

const bordes: Record<AvisoTono, string> = {
  info: "border-margarita",
  exito: "border-exito",
  aviso: "border-naranja",
  error: "border-error",
};

const iconos: Record<AvisoTono, string> = {
  info: "text-margarita",
  exito: "text-exito",
  aviso: "text-bahia",
  error: "text-error",
};

function IconoAviso({ tono }: { tono: AvisoTono }) {
  const clase = cn("mt-0.5 size-6 shrink-0", iconos[tono]);

  if (tono === "exito") {
    return (
      <svg
        className={clase}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12.5l2.5 2.5L16 9.5" />
      </svg>
    );
  }

  if (tono === "aviso") {
    return (
      <svg
        className={clase}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3.5L21 20H3L12 3.5z" />
        <path d="M12 10v4" />
        <circle cx="12" cy="16.5" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (tono === "error") {
    return (
      <svg
        className={clase}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5" />
        <circle cx="12" cy="16" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  // info
  return (
    <svg
      className={clase}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="8" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Aviso({ tono, titulo, children, className }: AvisoProps) {
  return (
    <div
      role={tono === "error" ? "alert" : "status"}
      className={cn(
        "flex gap-4 rounded-aviso border-[1.5px] bg-blanco px-6 py-5 text-bahia",
        bordes[tono],
        className,
      )}
    >
      <IconoAviso tono={tono} />
      <div className="min-w-0 flex-1">
        <p className="font-sans text-base font-semibold">{titulo}</p>
        <div className="mt-1 font-sans text-[15px] leading-normal">{children}</div>
      </div>
    </div>
  );
}
