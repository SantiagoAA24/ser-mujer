import { Outlet } from "react-router";

import { Encabezado } from "~/components/layout/Encabezado";
import { PieCompleto } from "~/components/layout/PieCompleto";

export default function LayoutSitio() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Encabezado />
      <main className="flex-1 pt-[84px] lg:pt-24">
        <Outlet />
      </main>
      <PieCompleto />
    </div>
  );
}
