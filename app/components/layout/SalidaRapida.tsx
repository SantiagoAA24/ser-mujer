import { useEffect, useId, useState } from "react";

import { sitio } from "~/content/sitio";
import { registrarAtajoSalida, salidaRapida } from "~/lib/salida-rapida";

function IconoCerrar({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M3 3l10 10M13 3L3 13" />
    </svg>
  );
}

export function SalidaRapida() {
  const tooltipId = useId();
  const [visible, setVisible] = useState(false);
  const { etiqueta, tooltipTitulo, tooltipCuerpo } = sitio.salidaRapida;

  useEffect(() => registrarAtajoSalida(), []);

  return (
    <div className="relative shrink-0" data-salida-rapida>
      <button
        type="button"
        onClick={salidaRapida}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        aria-describedby={visible ? tooltipId : undefined}
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-naranja px-4 py-2 text-sm font-semibold text-bahia-profundo transition-colors hover:bg-bahia-profundo hover:text-crema focus-visible:outline-crema lg:gap-2.5 lg:px-[22px] lg:py-2.5 lg:text-[14.5px]"
      >
        <IconoCerrar className="size-3.5 lg:size-4" />
        {etiqueta}
      </button>

      <div
        id={tooltipId}
        role="tooltip"
        className={`absolute right-0 top-full z-50 mt-2 max-w-80 rounded-[14px] bg-bahia px-[18px] py-4 text-[14.5px] leading-[1.55] text-crema transition-opacity ${
          visible
            ? "pointer-events-none opacity-100 delay-150"
            : "pointer-events-none opacity-0 delay-0"
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute -top-[7px] right-16 size-3.5 rotate-45 bg-bahia"
        />
        <div className="relative font-semibold">{tooltipTitulo}</div>
        <div className="relative">{tooltipCuerpo}</div>
      </div>
    </div>
  );
}
