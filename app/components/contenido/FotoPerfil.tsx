import { cn } from "~/components/ui/cn";

export type FotoPerfilProps = {
  nombre: string;
  /** Ruta o URL; vacío o ausente muestra el placeholder. */
  src?: string;
  className?: string;
};

const formaOrganica =
  "rounded-[48%_52%_46%_54%/40%_42%_58%_60%]";

export function FotoPerfil({ nombre, src, className }: FotoPerfilProps) {
  const tieneImagen = Boolean(src?.trim());

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[4/5] w-full max-w-[440px]",
        className,
      )}
    >
      <div
        className="absolute -right-[5%] -top-[5%] aspect-square w-[22%] rounded-full bg-naranja"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-[5%] -left-[7%] aspect-square w-[36%] rounded-[52%_48%_60%_40%/50%_58%_42%_50%] bg-durazno"
        aria-hidden="true"
      />
      {tieneImagen ? (
        <img
          src={src}
          alt={nombre}
          className={cn(
            "absolute inset-0 size-full object-cover",
            formaOrganica,
          )}
        />
      ) : (
        <div
          role="img"
          aria-label="Espacio reservado para la foto de la fundadora"
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-niebla px-8 text-center text-bahia box-border lg:gap-2.5 lg:px-10",
            formaOrganica,
          )}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-9 lg:size-11"
          >
            <rect x="3" y="6" width="18" height="13" rx="3" />
            <circle cx="12" cy="12.5" r="3.4" />
            <path d="M8.5 6l1.2-2h4.6l1.2 2" />
          </svg>
          <div className="font-semibold">[FOTO · retrato 4:5]</div>
          <div className="hidden max-w-[220px] text-sm lg:block">
            Luz natural, fondo sencillo, mirada a cámara y expresión serena.
          </div>
        </div>
      )}
    </div>
  );
}
