import { useId, type ReactNode, type TextareaHTMLAttributes } from "react";

import { cn } from "./cn";
import { MensajeError } from "./MensajeError";

export type AreaTextoProps = {
  etiqueta: ReactNode;
  opcional?: boolean;
  ayuda?: ReactNode;
  error?: string;
  className?: string;
  contenedorClassName?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className" | "aria-invalid">;

export function AreaTexto({
  etiqueta,
  opcional = false,
  ayuda,
  error,
  id: idProp,
  className,
  contenedorClassName,
  rows = 4,
  ...rest
}: AreaTextoProps) {
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
      <textarea
        id={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={descritoPor}
        className={cn(
          "box-border w-full resize-y rounded-campo border-[1.5px] border-bahia bg-blanco px-4 py-3.5 font-sans text-cuerpo font-normal leading-[1.6] text-bahia",
          "placeholder:text-bahia/50",
          error && "border-2 border-error",
          className,
        )}
        {...rest}
        autoComplete="off"
      />
      {ayuda && !error ? (
        <p id={idAyuda} className="text-pequeno font-normal text-bahia">
          {ayuda}
        </p>
      ) : null}
      {error ? <MensajeError id={idError}>{error}</MensajeError> : null}
    </div>
  );
}
