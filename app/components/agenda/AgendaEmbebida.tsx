import { useEffect, useId, useRef, useState } from "react";

import { Boton } from "~/components/ui/Boton";
import { cn } from "~/components/ui/cn";
import { calListo, montarCalInline } from "~/lib/cal";

export type AgendaEmbebidaProps = {
  /** Slug del event-type de Cal.com; `null` deshabilita el botón. */
  calSlug: string | null;
  /** Texto del botón de la fachada. */
  etiquetaBoton?: string;
  className?: string;
};

/**
 * Fachada de la agenda embebida.
 * «Ver horarios disponibles» monta Cal.com inline con el calSlug
 * (brandColor Bahía Azul, sin ventanas emergentes).
 */
export function AgendaEmbebida({
  calSlug,
  etiquetaBoton = "Ver horarios disponibles",
  className,
}: AgendaEmbebidaProps) {
  const idContenedor = useId();
  const contenedorRef = useRef<HTMLDivElement>(null);
  const [activo, setActivo] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  const listo = Boolean(calSlug) && calListo();

  // Al cambiar el tipo de sesión, volver a la fachada.
  useEffect(() => {
    setActivo(false);
    setCargando(false);
    setError(false);
    if (contenedorRef.current) {
      contenedorRef.current.replaceChildren();
    }
  }, [calSlug]);

  useEffect(() => {
    if (!activo || !calSlug || !contenedorRef.current) return;

    let cancelado = false;
    setCargando(true);
    setError(false);

    void montarCalInline({
      contenedor: contenedorRef.current,
      calSlug,
    })
      .then(() => {
        if (!cancelado) setCargando(false);
      })
      .catch(() => {
        if (!cancelado) {
          setCargando(false);
          setError(true);
          setActivo(false);
        }
      });

    return () => {
      cancelado = true;
    };
  }, [activo, calSlug]);

  function verHorarios() {
    if (!calSlug || !listo) return;
    setActivo(true);
  }

  return (
    <div
      className={cn(
        "flex flex-col items-stretch gap-4 rounded-2xl border-[1.5px] border-bahia/20 bg-crema/40 px-5 py-8 lg:px-6 lg:py-10",
        className,
      )}
    >
      {activo && listo ? (
        <>
          {cargando ? (
            <p className="m-0 text-cuerpo text-bahia" role="status">
              Cargando horarios…
            </p>
          ) : null}
          <div
            id={idContenedor}
            ref={contenedorRef}
            className="min-h-[420px] w-full overflow-auto"
          />
        </>
      ) : (
        <div className="flex flex-col items-start gap-4">
          <p className="m-0 text-cuerpo text-bahia">
            Aquí verás los horarios disponibles
          </p>
          {error ? (
            <p className="m-0 text-sm text-bahia" role="alert">
              No pudimos cargar la agenda. Puedes intentarlo de nuevo en un
              momento.
            </p>
          ) : null}
          <Boton
            type="button"
            variante="primario"
            tamano="grande"
            disabled={!listo}
            onClick={verHorarios}
            aria-disabled={!listo}
          >
            {etiquetaBoton}
          </Boton>
          {!listo ? (
            <p className="m-0 text-sm text-bahia">
              {calSlug
                ? "La agenda aún no está conectada."
                : "Primero elige un tipo de sesión."}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}
