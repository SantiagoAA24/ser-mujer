import { useId, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "./cn";

export type CasillaProps = {
  etiqueta: ReactNode;
  className?: string;
  contenedorClassName?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className">;

export function Casilla({
  etiqueta,
  id: idProp,
  className,
  contenedorClassName,
  ...rest
}: CasillaProps) {
  const idGenerado = useId();
  const id = idProp ?? idGenerado;

  return (
    <label
      htmlFor={id}
      className={cn(
        "flex min-h-11 cursor-pointer items-center gap-3 font-sans text-cuerpo text-bahia",
        contenedorClassName,
      )}
    >
      <input
        id={id}
        type="checkbox"
        className={cn(
          "m-0 size-[22px] shrink-0 accent-bahia",
          className,
        )}
        {...rest}
      />
      <span>{etiqueta}</span>
    </label>
  );
}
