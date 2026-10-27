import { Outlet } from "react-router";

import { Encabezado } from "~/components/layout/Encabezado";
import { PieReducido } from "~/components/layout/PieReducido";

export default function LayoutFormulario() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-bahia focus:px-5 focus:py-3 focus:font-semibold focus:text-crema focus:outline focus:outline-3 focus:outline-offset-2 focus:outline-margarita"
      >
        Saltar al contenido
      </a>
      <Encabezado />
      <main id="contenido" className="flex-1 pt-[84px] lg:pt-24">
        <Outlet />
      </main>
      <PieReducido />
    </div>
  );
}
