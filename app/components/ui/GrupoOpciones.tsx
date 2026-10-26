import { useId, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "./cn";
import { MensajeError } from "./MensajeError";

export type OpcionRadio = {
  valor: string;
  etiqueta: ReactNode;
};

export type GrupoOpcionesProps = {
  leyenda: ReactNode;
  name: string;
  opciones: OpcionRadio[];
  valor?: string;
  defaultValue?: string;
  error?: string;
  className?: string;
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
};

export function GrupoOpciones({
  leyenda,
  name,
  opciones,
  valor,
  defaultValue,
  error,
  className,
  onChange,
}: GrupoOpcionesProps) {
  const idError = useId();

  return (
    <fieldset className={cn("m-0 border-0 p-0", className)}>
      <legend className="mb-1.5 font-sans text-cuerpo font-semibold text-bahia">
        {leyenda}
      </legend>
      <div className="flex flex-col gap-1" role="presentation">
        {opciones.map((opcion) => {
          const id = `${name}-${opcion.valor}`;
          const marcado =
            valor !== undefined
              ? valor === opcion.valor
              : defaultValue !== undefined
                ? defaultValue === opcion.valor
                : undefined;

          return (
            <label
              key={opcion.valor}
              htmlFor={id}
              className="flex min-h-11 cursor-pointer items-center gap-3 font-sans text-cuerpo text-bahia"
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={opcion.valor}
                checked={valor !== undefined ? marcado : undefined}
                defaultChecked={
                  valor === undefined && defaultValue !== undefined
                    ? marcado
                    : undefined
                }
                onChange={onChange}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? idError : undefined}
                className="m-0 size-[22px] shrink-0 accent-bahia"
              />
              <span>{opcion.etiqueta}</span>
            </label>
          );
        })}
      </div>
      {error ? (
        <MensajeError id={idError} className="mt-2">
          {error}
        </MensajeError>
      ) : null}
    </fieldset>
  );
}
