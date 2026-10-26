import { Outlet } from "react-router";

import { Encabezado } from "~/components/layout/Encabezado";
import { PieReducido } from "~/components/layout/PieReducido";

export default function LayoutFormulario() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Encabezado />
      <main className="flex-1 pt-[84px] lg:pt-24">
        <Outlet />
      </main>
      <PieReducido />
    </div>
  );
}
