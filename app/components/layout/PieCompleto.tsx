import { Link } from "react-router";

import { sitio } from "~/content/sitio";
import { enlaceUsable } from "~/lib/enlaces";

function IconoWhatsApp() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 20l1.4-4.2A8 8 0 1 1 8.5 19L4 20z" />
    </svg>
  );
}

function IconoInstagram() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M16.6 7.4h.01" />
    </svg>
  );
}

export function PieCompleto() {
  return (
    <footer className="bg-crema px-5 pb-6 pt-8 lg:px-12 lg:pb-8 lg:pt-14">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-5 lg:gap-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:gap-[72px]">
          <div className="flex max-w-[360px] flex-col gap-4">
            <img
              src="/assets/logo-azul.png"
              alt="Ser, Mujer"
              className="h-[76px] w-auto self-start lg:h-[92px]"
              width={200}
              height={92}
            />
            <p className="m-0 font-serif text-cuerpo italic">{sitio.tagline}</p>
          </div>

          <div className="order-3 grid grid-cols-2 gap-x-4 text-[15px] lg:order-none lg:flex lg:flex-col lg:gap-1">
            <p className="col-span-2 mb-2 font-semibold lg:mb-2">Explora</p>
            {sitio.navPie.map((enlace) => (
              <Link
                key={enlace.href}
                to={enlace.href}
                className="py-2.5 no-underline lg:py-1.5"
              >
                {enlace.label}
              </Link>
            ))}
          </div>

          <div className="order-2 flex flex-col gap-3 text-[15px] lg:order-none">
            <p className="m-0 font-semibold">Escríbenos</p>
            {enlaceUsable(sitio.whatsapp.href) ? (
              <a
                href={sitio.whatsapp.href}
                className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-niebla px-[22px] py-2 font-semibold text-bahia no-underline lg:min-h-12"
                rel="noopener noreferrer"
                target="_blank"
              >
                <IconoWhatsApp />
                {sitio.whatsapp.etiqueta}
              </a>
            ) : (
              <span className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-niebla px-[22px] py-2 font-semibold text-bahia lg:min-h-12">
                <IconoWhatsApp />
                {sitio.whatsapp.etiqueta}
              </span>
            )}
            {enlaceUsable(sitio.instagram.href) ? (
              <a
                href={sitio.instagram.href}
                className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-primavera px-[22px] py-2 font-semibold text-bahia-profundo no-underline lg:min-h-12"
                rel="noopener noreferrer"
                target="_blank"
              >
                <IconoInstagram />
                {sitio.instagram.etiqueta}
              </a>
            ) : (
              <span className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-primavera px-[22px] py-2 font-semibold text-bahia-profundo lg:min-h-12">
                <IconoInstagram />
                {sitio.instagram.etiqueta}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-bahia/30 pt-3.5 text-sm lg:flex-row lg:justify-between lg:gap-8 lg:pt-5">
          <p className="m-0">
            Si estás en peligro inmediato, llama a {sitio.lineaEmergencia}.
          </p>
          <p className="m-0">
            <Link
              to={sitio.enlaceSeguridad.href}
              className="underline-offset-[6px]"
            >
              {sitio.enlaceSeguridad.label}
            </Link>
            {" · "}© {sitio.copyrightAnio} {sitio.nombre}
          </p>
        </div>
      </div>
    </footer>
  );
}
