import { Boton } from "~/components/ui/Boton";
import { cn } from "~/components/ui/cn";

export type AgendaEmbebidaProps = {
  /** Slug del event-type de Cal.com; `null` deshabilita el botón. */
  calSlug: string | null;
  className?: string;
};

/**
 * Fachada de la agenda embebida.
 * En fase 7, «Ver horarios disponibles» montará Cal.com inline con el calSlug.
 */
export function AgendaEmbebida({ calSlug, className }: AgendaEmbebidaProps) {
  const listo = Boolean(calSlug);

  function verHorarios() {
    if (!calSlug) return;
    // TODO(fase-7): montar Cal.com inline con calSlug, VITE_CAL_USUARIO,
    // brandColor #46467A, layout inline, solo tras este clic (patrón fachada).
    // No abrir ventanas emergentes.
  }

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-4 rounded-2xl border-[1.5px] border-bahia/20 bg-crema/40 px-5 py-8 lg:px-6 lg:py-10",
        className,
      )}
    >
      <p className="m-0 text-cuerpo text-bahia">
        Aquí verás los horarios disponibles
      </p>
      <Boton
        type="button"
        variante="primario"
        tamano="grande"
        disabled={!listo}
        onClick={verHorarios}
        aria-disabled={!listo}
      >
        Ver horarios disponibles
      </Boton>
      {!listo ? (
        <p className="m-0 text-sm text-bahia">
          Primero elige un tipo de sesión.
        </p>
      ) : null}
    </div>
  );
}
