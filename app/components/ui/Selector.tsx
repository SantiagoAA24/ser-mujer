import { useId, type ReactNode, type SelectHTMLAttributes } from "react";

import { cn } from "./cn";
import { MensajeError } from "./MensajeError";

export type SelectorOpcion = {
  valor: string;
  etiqueta: string;
};

export type SelectorProps = {
  etiqueta: ReactNode;
  opciones: SelectorOpcion[];
  opcional?: boolean;
  ayuda?: ReactNode;
  error?: string;
  className?: string;
  contenedorClassName?: string;
  placeholder?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "className" | "aria-invalid" | "children">;

export function Selector({
  etiqueta,
  opciones,
  opcional = false,
  ayuda,
  error,
  id: idProp,
  className,
  contenedorClassName,
  placeholder,
  ...rest
}: SelectorProps) {
  const idGenerado = useId();
  const id = idProp ?? idGenerado;
  const idAyuda = ayuda ? `${id}-ayuda` : undefined;
  const idError = error ? `${id}-error` : undefined;
  const descritoPor = [idAyuda, idError].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", contenedorClassName)}>
      <label htmlFor={id} className="font-sans text-cuerpo font-semibold text-bahia">
        {etiqueta}
        {opcional ? (
          <span className="font-normal"> (opcional)</span>
        ) : null}
      </label>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={descritoPor}
        className={cn(
          "box-border h-[52px] w-full rounded-campo border-[1.5px] border-bahia bg-blanco px-4 font-sans text-cuerpo font-normal text-bahia",
          error && "border-2 border-error",
          className,
        )}
        {...rest}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {opciones.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.etiqueta}
          </option>
        ))}
      </select>
      {ayuda && !error ? (
        <p id={idAyuda} className="text-pequeno font-normal text-bahia">
          {ayuda}
        </p>
      ) : null}
      {error ? <MensajeError id={idError}>{error}</MensajeError> : null}
    </div>
  );
}
