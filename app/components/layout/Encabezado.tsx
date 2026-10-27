import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

import { sitio } from "~/content/sitio";

import { SalidaRapida } from "./SalidaRapida";

function esRutaActiva(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function IconoMenu() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function IconoCerrar() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

const SELECTOR_FOCO =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Encabezado() {
  const { pathname } = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuId = useId();
  const botonMenuRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuAbierto(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuAbierto) return;

    const header = headerRef.current;
    if (!header) return;

    // Salida rápida, menú y enlaces del panel (no el resto de la página).
    const focables = () =>
      Array.from(header.querySelectorAll<HTMLElement>(SELECTOR_FOCO)).filter(
        (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
      );

    const primero = focables().find(
      (el) => el === botonMenuRef.current || el.closest("[data-salida-rapida]"),
    );
    (primero ?? focables()[0])?.focus();

    const alTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setMenuAbierto(false);
        return;
      }
      if (e.key !== "Tab") return;

      const lista = focables();
      if (lista.length === 0) return;

      const primeroEl = lista[0];
      const ultimoEl = lista[lista.length - 1];
      if (e.shiftKey && document.activeElement === primeroEl) {
        e.preventDefault();
        ultimoEl.focus();
      } else if (!e.shiftKey && document.activeElement === ultimoEl) {
        e.preventDefault();
        primeroEl.focus();
      }
    };

    document.addEventListener("keydown", alTecla, true);
    const anteriorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    return () => {
      document.removeEventListener("keydown", alTecla, true);
      document.body.style.overflow = anteriorOverflow;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      botonMenuRef.current?.focus();
    };
  }, [menuAbierto]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-40 border-b border-bahia/20 bg-crema"
    >
      <div className="flex h-[84px] items-center justify-between gap-2 px-4 py-2 lg:h-24 lg:gap-8 lg:px-10 lg:py-3.5">
        <Link to="/" className="shrink-0" onClick={() => setMenuAbierto(false)}>
          <img
            src="/assets/logo-azul.png"
            alt="Ser, Mujer"
            className="h-[68px] w-auto"
            width={180}
            height={68}
          />
        </Link>

        <nav
          aria-label="Principal"
          className="hidden items-center gap-[26px] text-[14.5px] lg:flex"
        >
          {sitio.navPrincipal.map((enlace) => {
            const activa = esRutaActiva(pathname, enlace.href);
            return (
              <NavLink
                key={enlace.href}
                to={enlace.href}
                aria-current={activa ? "page" : undefined}
                className={`inline-flex min-h-11 items-center py-3 no-underline ${
                  activa
                    ? "font-semibold shadow-[0_2px_0_0_var(--color-bahia)]"
                    : "font-normal hover:shadow-[0_2px_0_0_var(--color-bahia)]"
                }`}
              >
                {enlace.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 lg:gap-0">
          <SalidaRapida />

          <button
            ref={botonMenuRef}
            type="button"
            className={`flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-campo)] lg:hidden ${
              menuAbierto ? "bg-bahia text-crema" : "bg-transparent text-bahia"
            }`}
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
            aria-controls={menuId}
            onClick={() => setMenuAbierto((abierto) => !abierto)}
          >
            {menuAbierto ? <IconoCerrar /> : <IconoMenu />}
          </button>
        </div>
      </div>

      {menuAbierto ? (
        <div
          id={menuId}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal"
          className="absolute inset-x-0 top-[84px] bottom-0 h-[calc(100dvh-84px)] overflow-y-auto bg-crema lg:hidden"
        >
          <nav
            aria-label="Principal móvil"
            className="flex flex-col px-5 pb-6 pt-3"
          >
            {sitio.navPrincipal.map((enlace, i) => {
              const activa = esRutaActiva(pathname, enlace.href);
              const ultimo = i === sitio.navPrincipal.length - 1;
              return (
                <Link
                  key={enlace.href}
                  to={enlace.href}
                  aria-current={activa ? "page" : undefined}
                  onClick={() => setMenuAbierto(false)}
                  className={`min-h-12 py-3 font-serif text-2xl no-underline ${
                    activa ? "italic" : ""
                  } ${ultimo ? "" : "border-b border-bahia/20"}`}
                >
                  {enlace.label}
                </Link>
              );
            })}

            <Link
              to={sitio.ctaAgendar.href}
              onClick={() => setMenuAbierto(false)}
              className="mt-3 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-bahia px-6 font-semibold text-crema no-underline"
            >
              {sitio.ctaAgendar.label}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
