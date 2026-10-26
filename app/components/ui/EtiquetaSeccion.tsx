import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

export type EtiquetaSeccionProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">;

export function EtiquetaSeccion({
  as: Componente = "p",
  children,
  className,
  ...rest
}: EtiquetaSeccionProps) {
  return (
    <Componente className={cn("etiqueta text-bahia", className)} {...rest}>
      {children}
    </Componente>
  );
}
