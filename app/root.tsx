import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { Encabezado } from "~/components/layout/Encabezado";
import { Boton } from "~/components/ui/Boton";
import "./app.css";

export const links: Route.LinksFunction = () => [
  {
    rel: "icon",
    href: "/assets/colibri-azul.png",
    type: "image/png",
  },
];

export function meta(): ReturnType<Route.MetaFunction> {
  return [
    { title: "Ser, Mujer" },
    {
      name: "description",
      content: "Acompañamiento, sanación y transformación para mujeres",
    },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const es404 = isRouteErrorResponse(error) && error.status === 404;

  let titulo = "Algo no salió como esperábamos";
  let detalle =
    "Puedes volver al inicio o escribirnos cuando quieras. No hay prisa.";
  let stack: string | undefined;

  if (es404) {
    titulo = "No encontramos esta página";
    detalle =
      "Es posible que el enlace haya cambiado o que la dirección no sea correcta. Puedes volver al inicio o escribirnos si lo necesitas.";
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    detalle = error.message;
    stack = error.stack;
  }

  return (
    <div className="flex min-h-dvh flex-col bg-crema text-bahia">
      <Encabezado />
      <main className="flex flex-1 flex-col justify-center px-5 pb-16 pt-[84px] lg:px-14 lg:pb-24 lg:pt-24">
        <div className="mx-auto w-full max-w-[640px]">
          <h1 className="m-0 font-serif text-h2-m font-normal text-bahia lg:text-h2">
            {titulo}
          </h1>
          <p className="mt-4 text-cuerpo leading-7 text-bahia">{detalle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Boton href="/" className="w-full justify-center sm:w-auto">
              Ir al inicio
            </Boton>
            <Boton
              variante="secundario"
              href="/contacto"
              className="w-full justify-center sm:w-auto"
            >
              Ir a contacto
            </Boton>
          </div>
          {stack ? (
            <pre className="mt-10 w-full overflow-x-auto rounded-2xl bg-niebla p-4 text-sm text-bahia">
              <code>{stack}</code>
            </pre>
          ) : null}
        </div>
      </main>
    </div>
  );
}
