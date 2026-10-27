import { Link } from "react-router";

import { sitio } from "~/content/sitio";

export function PieReducido() {
  return (
    <footer className="border-t border-bahia/30 px-5 py-5 text-sm leading-[22px] lg:px-14 lg:py-6 lg:pb-8">
      <div className="mx-auto flex max-w-[1240px] flex-col flex-wrap gap-2 lg:flex-row lg:items-start lg:justify-between lg:gap-x-8 lg:gap-y-2">
        <p className="m-0">
          Si estás en peligro inmediato, llama a {sitio.lineaEmergencia}.
        </p>
        <p className="m-0">
          <Link
            to={sitio.enlaceSeguridad.href}
            className="inline-flex min-h-11 items-center underline-offset-[6px]"
          >
            {sitio.enlaceSeguridad.label}
          </Link>
          {" · "}© {sitio.copyrightAnio} {sitio.nombre}
        </p>
      </div>
    </footer>
  );
}
