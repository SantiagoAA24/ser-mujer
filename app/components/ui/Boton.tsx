import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

type Variante = "primario" | "secundario" | "texto";
type Tamano = "grande" | "pequeno";

type BotonBase = {
  variante?: Variante;
  tamano?: Tamano;
  sobreOscuro?: boolean;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

type BotonComoBoton = BotonBase &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "disabled"> & {
    href?: undefined;
  };

type BotonComoEnlace = BotonBase &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

export type BotonProps = BotonComoBoton | BotonComoEnlace;

function clasesBoton({
  variante,
  tamano,
  sobreOscuro,
  className,
  disabled,
}: {
  variante: Variante;
  tamano: Tamano;
  sobreOscuro: boolean;
  className?: string;
  disabled?: boolean;
}): string {
  const base =
    "inline-flex items-center justify-center font-sans font-semibold no-underline transition-colors";

  const tamanos: Record<Tamano, string> = {
    grande: "min-h-14 px-7 text-base",
    pequeno: "min-h-11 text-[15px] leading-6",
  };

  if (variante === "texto") {
    return cn(
      base,
      tamanos[tamano],
      "underline underline-offset-[6px]",
      sobreOscuro ? "text-crema hover:text-crema" : "text-bahia hover:text-bahia-profundo hover:decoration-2",
      "rounded-md focus-visible:rounded-md",
      disabled && "pointer-events-none opacity-45",
      className,
    );
  }

  const pildora = cn(base, "rounded-full", tamanos[tamano], tamano === "grande" ? "py-3.5" : "px-5");

  if (variante === "primario") {
    return cn(
      pildora,
      "border-0",
      sobreOscuro
        ? "bg-naranja text-bahia-profundo hover:bg-naranja"
        : "bg-bahia text-crema hover:bg-bahia-profundo",
      disabled && "pointer-events-none opacity-45",
      className,
    );
  }

  // secundario
  return cn(
    pildora,
    "border-[1.5px] bg-transparent",
    sobreOscuro
      ? "border-crema text-crema hover:bg-crema/10"
      : "border-bahia text-bahia hover:border-bahia-profundo hover:bg-bahia/8 hover:text-bahia-profundo",
    disabled && "pointer-events-none opacity-45",
    className,
  );
}

export function Boton(props: BotonProps) {
  const {
    variante = "primario",
    tamano = "grande",
    sobreOscuro = false,
    children,
    className,
    disabled,
    ...rest
  } = props;

  const clases = clasesBoton({ variante, tamano, sobreOscuro, className, disabled });

  if ("href" in props && props.href !== undefined) {
    const { href, ...enlaceRest } = rest as Omit<
      BotonComoEnlace,
      "variante" | "tamano" | "sobreOscuro" | "children" | "className" | "disabled"
    > & { href: string };

    if (disabled) {
      return (
        <span className={clases} aria-disabled="true">
          {children}
        </span>
      );
    }

    return (
      <a href={href} className={clases} {...enlaceRest}>
        {children}
      </a>
    );
  }

  const botonRest = rest as Omit<
    BotonComoBoton,
    "variante" | "tamano" | "sobreOscuro" | "children" | "className" | "disabled"
  >;

  return (
    <button type="button" className={clases} disabled={disabled} {...botonRest}>
      {children}
    </button>
  );
}
