import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

export type EtiquetaVariante =
  | "niebla"
  | "primavera"
  | "durazno"
  | "crema"
  | "contorno"
  | "oscura";

export type EtiquetaProps = {
  variante?: EtiquetaVariante;
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLSpanElement>, "children" | "className">;

const variantes: Record<EtiquetaVariante, string> = {
  niebla: "bg-niebla text-bahia",
  primavera: "bg-primavera text-bahia-profundo",
  durazno: "bg-durazno text-bahia",
  crema: "bg-crema text-bahia",
  contorno: "border-[1.5px] border-bahia bg-transparent text-bahia",
  oscura: "bg-bahia text-crema",
};

export function Etiqueta({
  variante = "niebla",
  children,
  className,
  ...rest
}: EtiquetaProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3.5 py-1 font-sans text-sm font-semibold leading-[1.375rem]",
        variante === "contorno" ? "py-[2.5px]" : undefined,
        variantes[variante],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
