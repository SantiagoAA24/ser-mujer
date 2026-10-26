import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

export type TarjetaVariante = "blanca" | "niebla" | "primavera" | "durazno";

export type TarjetaProps = {
  variante?: TarjetaVariante;
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">;

const fondos: Record<TarjetaVariante, string> = {
  blanca: "bg-blanco text-bahia",
  niebla: "bg-niebla text-bahia",
  primavera: "bg-primavera text-bahia-profundo",
  durazno: "bg-durazno text-bahia",
};

export function Tarjeta({
  variante = "blanca",
  children,
  className,
  ...rest
}: TarjetaProps) {
  return (
    <article
      className={cn(
        "flex flex-col items-start gap-3 rounded-tarjeta p-8",
        fondos[variante],
        className,
      )}
      {...rest}
    >
      {children}
    </article>
  );
}
