import { useId, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "./cn";
import { MensajeError } from "./MensajeError";

export type CampoTextoProps = {
  etiqueta: ReactNode;
  opcional?: boolean;
  ayuda?: ReactNode;
  error?: string;
  className?: string;
  contenedorClassName?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "aria-invalid">;

export function CampoTexto({
  etiqueta,
  opcional = false,
  ayuda,
  error,
  id: idProp,
  className,
  contenedorClassName,
  autoComplete = "off",
  ...rest
}: CampoTextoProps) {
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
      <input
        id={id}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={descritoPor}
        className={cn(
          "box-border h-[52px] w-full rounded-campo border-[1.5px] border-bahia bg-blanco px-4 font-sans text-cuerpo font-normal text-bahia",
          "placeholder:text-bahia/50",
          error && "border-2 border-error",
          className,
        )}
        {...rest}
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
