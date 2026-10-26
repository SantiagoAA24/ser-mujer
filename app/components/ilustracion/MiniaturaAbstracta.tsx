import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "~/components/ui/cn";
import type { VarianteMiniatura } from "~/content/types";
import { CLASE_TOKEN, PRESETS_MINIATURA } from "~/lib/testimonios";

export type LayoutMiniatura = "formas" | "tarjeta" | "lista" | "destacado";

export type MiniaturaAbstractaProps = {
  variante: VarianteMiniatura;
  /** Solo formas, para usar como fondo de ReproductorFachada. */
  layout?: LayoutMiniatura;
  duracion?: string;
  seleccionada?: boolean;
  /** Patrón colibrí forzado; por defecto según el preset. */
  conPatron?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

function IconoPlay({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  );
}

function Formas({
  variante,
  conPatron,
}: {
  variante: VarianteMiniatura;
  conPatron: boolean;
}) {
  const preset = PRESETS_MINIATURA[variante];
  return (
    <>
      <span
        className={cn("absolute inset-0", CLASE_TOKEN[preset.fondo])}
        aria-hidden="true"
      />
      {conPatron ? (
        <span
          className="patron-crema absolute inset-0 opacity-25"
          aria-hidden="true"
        />
      ) : null}
      <span
        aria-hidden="true"
        className={cn(
          "absolute aspect-square w-1/2",
          CLASE_TOKEN[preset.forma1],
        )}
        style={{
          left: preset.x1,
          top: preset.y1,
          borderRadius: "52% 48% 60% 40% / 50% 58% 42% 50%",
        }}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute aspect-square w-[16%] rounded-full",
          CLASE_TOKEN[preset.forma2],
        )}
        style={{ left: preset.x2, top: preset.y2 }}
      />
    </>
  );
}

/**
 * Miniatura ilustrada (sin fotos ni fotogramas). Variantes 0–5 de la marca.
 */
export function MiniaturaAbstracta({
  variante,
  layout = "formas",
  duracion,
  seleccionada = false,
  conPatron,
  className,
  children,
  type = "button",
  ...rest
}: MiniaturaAbstractaProps) {
  const mostrarPatron = conPatron ?? false;

  if (layout === "formas") {
    return (
      <div
        className={cn("absolute inset-0 overflow-hidden", className)}
        aria-hidden="true"
      >
        <Formas variante={variante} conPatron={mostrarPatron} />
        {children}
      </div>
    );
  }

  if (layout === "lista") {
    return (
      <span
        className={cn(
          "relative block overflow-hidden rounded-[12px] lg:rounded-[14px]",
          className,
        )}
        aria-hidden="true"
      >
        <Formas variante={variante} conPatron={mostrarPatron} />
      </span>
    );
  }

  const esDestacado = layout === "destacado";

  return (
    <button
      type={type}
      className={cn(
        "relative block w-full cursor-pointer overflow-hidden border-0 p-0",
        esDestacado
          ? "aspect-[16/9] rounded-[24px] lg:rounded-[28px]"
          : "aspect-[16/10] rounded-[24px]",
        seleccionada && "outline outline-[3px] outline-offset-[3px] outline-bahia",
        className,
      )}
      {...rest}
    >
      <Formas variante={variante} conPatron={mostrarPatron} />
      {esDestacado ? (
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 z-10 flex size-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bahia text-crema lg:size-[88px]"
        >
          <IconoPlay size={26} />
        </span>
      ) : (
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-4 z-10 flex size-[52px] items-center justify-center rounded-full bg-bahia text-crema"
        >
          <IconoPlay size={22} />
        </span>
      )}
      {duracion != null ? (
        <span className="absolute bottom-3 right-3.5 z-10 rounded-full bg-blanco px-3 py-0.5 text-sm font-semibold text-bahia lg:bottom-4 lg:right-4">
          {duracion}
        </span>
      ) : null}
      {children}
    </button>
  );
}
