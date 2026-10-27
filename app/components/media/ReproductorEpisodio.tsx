import type { Episodio } from "~/content/types";
import { useReproductor } from "~/components/media/ReproductorAudio";
import { cn } from "~/components/ui/cn";
import { etiquetaVelocidad, formatearTiempoMmSs } from "~/lib/podcast";

function IconoPlay({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  );
}

function IconoPausa({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
    </svg>
  );
}

function IconoVolumen({ silenciado }: { silenciado: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4z" />
      {silenciado ? (
        <path d="M16 9l5 5M21 9l-5 5" />
      ) : (
        <>
          <path d="M15.5 9a4 4 0 0 1 0 6" />
          <path d="M18 6.5a7.5 7.5 0 0 1 0 11" />
        </>
      )}
    </svg>
  );
}

type Props = {
  episodio: Episodio;
};

export function ReproductorEpisodio({ episodio }: Props) {
  const {
    episodio: actual,
    reproduciendo,
    currentTime,
    duration,
    velocidad,
    silenciado,
    puedeReproducir,
    tieneAudioNativo,
    alternar,
    saltar,
    seek,
    cicloVelocidad,
    alternarSilencio,
  } = useReproductor();

  const esEste = actual?.slug === episodio.slug;
  const on = esEste && reproduciendo;
  const puede = puedeReproducir(episodio);
  const nativo = tieneAudioNativo(episodio);
  const controlesAvance = nativo && esEste;

  const tiempoMostrado = esEste ? currentTime : 0;
  const maxRange = esEste && duration > 0 ? duration : Math.max(tiempoMostrado, 1);
  const duracionEtiqueta =
    esEste && duration > 0
      ? formatearTiempoMmSs(duration)
      : episodio.duracion;

  function onChangeRange(value: string) {
    if (!controlesAvance) return;
    seek(Number(value));
  }

  return (
    <div
      role="region"
      aria-label="Reproductor del episodio"
      className="flex flex-col gap-3 self-stretch rounded-[24px] bg-blanco px-4 py-[18px] lg:gap-2.5 lg:px-6 lg:pb-4 lg:pt-[18px]"
    >
      {/* Escritorio: tiempo | barra | duración */}
      <div className="hidden items-center gap-3.5 lg:flex">
        <div className="shrink-0 text-sm font-semibold">
          {formatearTiempoMmSs(tiempoMostrado)}
        </div>
        <input
          type="range"
          min={0}
          max={maxRange}
          step={1}
          value={Math.min(tiempoMostrado, maxRange)}
          disabled={!controlesAvance}
          aria-label="Avance del episodio"
          onChange={(e) => onChangeRange(e.target.value)}
          className={cn(
            "h-11 flex-1 cursor-pointer appearance-none rounded bg-transparent accent-bahia disabled:cursor-not-allowed disabled:opacity-50",
            "[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded [&::-webkit-slider-runnable-track]:bg-bahia/22",
            "[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded [&::-moz-range-track]:bg-bahia/22",
            "[&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:mt-[-14px] [&::-webkit-slider-thumb]:size-11 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[14px] [&::-webkit-slider-thumb]:border-transparent [&::-webkit-slider-thumb]:bg-clip-padding [&::-webkit-slider-thumb]:bg-bahia",
            "[&::-moz-range-thumb]:size-11 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-bahia",
          )}
        />
        <div className="shrink-0 text-sm font-semibold">{duracionEtiqueta}</div>
      </div>

      {/* Móvil: barra arriba, luego tiempos */}
      <div className="flex flex-col gap-2 lg:hidden">
        <input
          type="range"
          min={0}
          max={maxRange}
          step={1}
          value={Math.min(tiempoMostrado, maxRange)}
          disabled={!controlesAvance}
          aria-label="Avance del episodio"
          onChange={(e) => onChangeRange(e.target.value)}
          className={cn(
            "h-11 w-full cursor-pointer appearance-none rounded bg-transparent accent-bahia disabled:cursor-not-allowed disabled:opacity-50",
            "[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded [&::-webkit-slider-runnable-track]:bg-bahia/22",
            "[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded [&::-moz-range-track]:bg-bahia/22",
            "[&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:mt-[-14px] [&::-webkit-slider-thumb]:size-11 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[14px] [&::-webkit-slider-thumb]:border-transparent [&::-webkit-slider-thumb]:bg-clip-padding [&::-webkit-slider-thumb]:bg-bahia",
            "[&::-moz-range-thumb]:size-11 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-bahia",
          )}
        />
        <div className="-mt-1 flex justify-between text-[13px] font-semibold leading-[18px]">
          <span>{formatearTiempoMmSs(tiempoMostrado)}</span>
          <span>{on ? "Reproduciendo" : "En pausa"}</span>
          <span>{duracionEtiqueta}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        {/* Escritorio: −15 · play · +30 · estado */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <button
            type="button"
            aria-label="Retroceder 15 segundos"
            disabled={!controlesAvance}
            onClick={() => saltar(-15)}
            className="h-11 rounded-full border-[1.5px] border-bahia bg-transparent px-3.5 font-sans text-sm font-semibold text-bahia disabled:cursor-not-allowed disabled:opacity-45"
          >
            −15 s
          </button>
          <button
            type="button"
            aria-label={on ? "Pausar" : "Reproducir"}
            disabled={!puede}
            onClick={() => alternar(episodio)}
            className={cn(
              "inline-flex size-[60px] items-center justify-center rounded-full border-0 bg-bahia text-crema",
              !puede && "cursor-not-allowed opacity-45",
            )}
          >
            {on ? <IconoPausa /> : <IconoPlay />}
          </button>
          <button
            type="button"
            aria-label="Adelantar 30 segundos"
            disabled={!controlesAvance}
            onClick={() => saltar(30)}
            className="h-11 rounded-full border-[1.5px] border-bahia bg-transparent px-3.5 font-sans text-sm font-semibold text-bahia disabled:cursor-not-allowed disabled:opacity-45"
          >
            +30 s
          </button>
          <span className="ml-1.5 text-sm font-semibold">
            {on ? "Reproduciendo" : "En pausa"}
          </span>
        </div>

        <div className="hidden items-center gap-2.5 lg:flex">
          <button
            type="button"
            aria-label={`Velocidad ${etiquetaVelocidad(velocidad)}, cambiar`}
            disabled={!nativo}
            onClick={cicloVelocidad}
            className="h-11 min-w-16 rounded-full border-[1.5px] border-bahia bg-transparent px-3.5 font-sans text-sm font-semibold text-bahia disabled:cursor-not-allowed disabled:opacity-45"
          >
            {etiquetaVelocidad(velocidad)}
          </button>
          <button
            type="button"
            aria-label={silenciado ? "Activar volumen" : "Silenciar"}
            disabled={!nativo}
            onClick={alternarSilencio}
            className="inline-flex size-11 items-center justify-center rounded-full border-0 bg-transparent text-bahia disabled:cursor-not-allowed disabled:opacity-45"
          >
            <IconoVolumen silenciado={silenciado} />
          </button>
        </div>

        {/* Móvil: vel · −15 · play · +30 · vol */}
        <div className="flex w-full items-center justify-between gap-2 lg:hidden">
          <button
            type="button"
            aria-label={`Velocidad ${etiquetaVelocidad(velocidad)}, cambiar`}
            disabled={!nativo}
            onClick={cicloVelocidad}
            className="h-11 min-w-[60px] rounded-full border-[1.5px] border-bahia bg-transparent px-2.5 font-sans text-sm font-semibold text-bahia disabled:cursor-not-allowed disabled:opacity-45"
          >
            {etiquetaVelocidad(velocidad)}
          </button>
          <button
            type="button"
            aria-label="Retroceder 15 segundos"
            disabled={!controlesAvance}
            onClick={() => saltar(-15)}
            className="h-11 rounded-full border-[1.5px] border-bahia bg-transparent px-3 font-sans text-sm font-semibold text-bahia disabled:cursor-not-allowed disabled:opacity-45"
          >
            −15 s
          </button>
          <button
            type="button"
            aria-label={on ? "Pausar" : "Reproducir"}
            disabled={!puede}
            onClick={() => alternar(episodio)}
            className={cn(
              "inline-flex size-16 items-center justify-center rounded-full border-0 bg-bahia text-crema",
              !puede && "cursor-not-allowed opacity-45",
            )}
          >
            {on ? <IconoPausa size={26} /> : <IconoPlay size={26} />}
          </button>
          <button
            type="button"
            aria-label="Adelantar 30 segundos"
            disabled={!controlesAvance}
            onClick={() => saltar(30)}
            className="h-11 rounded-full border-[1.5px] border-bahia bg-transparent px-3 font-sans text-sm font-semibold text-bahia disabled:cursor-not-allowed disabled:opacity-45"
          >
            +30 s
          </button>
          <button
            type="button"
            aria-label={silenciado ? "Activar volumen" : "Silenciar"}
            disabled={!nativo}
            onClick={alternarSilencio}
            className="inline-flex size-11 items-center justify-center rounded-full border-0 bg-transparent text-bahia disabled:cursor-not-allowed disabled:opacity-45"
          >
            <IconoVolumen silenciado={silenciado} />
          </button>
        </div>
      </div>
    </div>
  );
}
