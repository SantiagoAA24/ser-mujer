import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { ReproductorFachada } from "~/components/media/ReproductorFachada";
import { cn } from "~/components/ui/cn";
import type { Episodio } from "~/content/types";
import {
  episodioReproducible,
  formatearTiempo,
  idEpisodioSpotify,
} from "~/lib/podcast";

type Modo = "audio" | "spotify" | null;

type ReproductorContexto = {
  episodio: Episodio | null;
  reproduciendo: boolean;
  currentTime: number;
  duration: number;
  modo: Modo;
  esActual: (episodio: Episodio) => boolean;
  puedeReproducir: (episodio: Episodio) => boolean;
  reproducir: (episodio: Episodio) => void;
  pausar: () => void;
  alternar: (episodio: Episodio) => void;
};

const Contexto = createContext<ReproductorContexto | null>(null);

export function useReproductor(): ReproductorContexto {
  const ctx = useContext(Contexto);
  if (!ctx) {
    throw new Error("useReproductor debe usarse dentro de ReproductorProvider");
  }
  return ctx;
}

function modoDe(episodio: Episodio): Modo {
  if (episodio.audioUrl && !episodio.audioUrl.includes("[")) return "audio";
  if (idEpisodioSpotify(episodio.spotifyUrl)) return "spotify";
  return null;
}

export function ReproductorProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const slugActualRef = useRef<string | null>(null);
  const [episodio, setEpisodio] = useState<Episodio | null>(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [spotifyActivo, setSpotifyActivo] = useState(false);

  const modo = episodio ? modoDe(episodio) : null;
  const spotifyId =
    modo === "spotify" && episodio
      ? idEpisodioSpotify(episodio.spotifyUrl)
      : undefined;

  useEffect(() => {
    slugActualRef.current = episodio?.slug ?? null;
  }, [episodio]);

  const pausar = useCallback(() => {
    const el = audioRef.current;
    if (el) {
      el.pause();
      el.removeAttribute("src");
      el.load();
    }
    setReproduciendo(false);
    setSpotifyActivo(false);
    setEpisodio(null);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const reproducir = useCallback((siguiente: Episodio) => {
    if (!episodioReproducible(siguiente)) return;

    const siguienteModo = modoDe(siguiente);
    const el = audioRef.current;

    if (siguienteModo === "audio" && siguiente.audioUrl) {
      setSpotifyActivo(false);
      setEpisodio(siguiente);
      if (el) {
        const mismo =
          slugActualRef.current === siguiente.slug && el.currentSrc !== "";
        if (!mismo) {
          el.src = siguiente.audioUrl;
          el.load();
        }
        void el.play().then(
          () => setReproduciendo(true),
          () => {
            setEpisodio(null);
            setReproduciendo(false);
          },
        );
      } else {
        setReproduciendo(true);
      }
      return;
    }

    if (siguienteModo === "spotify") {
      if (el) {
        el.pause();
        el.removeAttribute("src");
        el.load();
      }
      setCurrentTime(0);
      setDuration(0);
      setEpisodio(siguiente);
      setReproduciendo(true);
      setSpotifyActivo(true);
    }
  }, []);

  const alternar = useCallback(
    (candidato: Episodio) => {
      if (episodio && episodio.slug === candidato.slug && reproduciendo) {
        if (modo === "audio") {
          audioRef.current?.pause();
          setReproduciendo(false);
          return;
        }
        pausar();
        return;
      }
      reproducir(candidato);
    },
    [episodio, modo, pausar, reproduciendo, reproducir],
  );

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onTime = () => setCurrentTime(el.currentTime);
    const onMeta = () =>
      setDuration(Number.isFinite(el.duration) ? el.duration : 0);
    const onEnded = () => {
      setReproduciendo(false);
      setEpisodio(null);
      setCurrentTime(0);
    };
    const onPlay = () => setReproduciendo(true);
    const onPause = () => {
      if (modo === "audio") setReproduciendo(false);
    };

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("durationchange", onMeta);
    el.addEventListener("ended", onEnded);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);

    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("durationchange", onMeta);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, [modo, episodio]);

  const valor = useMemo<ReproductorContexto>(
    () => ({
      episodio,
      reproduciendo,
      currentTime,
      duration,
      modo,
      esActual: (e) => episodio?.slug === e.slug && reproduciendo,
      puedeReproducir: episodioReproducible,
      reproducir,
      pausar,
      alternar,
    }),
    [
      episodio,
      reproduciendo,
      currentTime,
      duration,
      modo,
      reproducir,
      pausar,
      alternar,
    ],
  );

  const progreso =
    modo === "audio" && duration > 0
      ? Math.min(100, (currentTime / duration) * 100)
      : 0;

  const mostrarBarra = episodio != null && reproduciendo;

  return (
    <Contexto.Provider value={valor}>
      {children}

      <audio ref={audioRef} preload="none" className="hidden" />

      {mostrarBarra && modo === "spotify" && spotifyId && spotifyActivo ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-[88px] z-[9] px-3 lg:bottom-[100px]">
          <div className="pointer-events-auto mx-auto max-w-[560px]">
            <ReproductorFachada
              key={spotifyId}
              proveedor="spotify"
              id={spotifyId}
              iniciarActivo
              ariaLabel={`Reproducir en Spotify: ${episodio.titulo}`}
              className="rounded-[20px] shadow-lg lg:rounded-[24px]"
            />
          </div>
        </div>
      ) : null}

      {mostrarBarra && episodio ? (
        <div
          role="region"
          aria-label="Reproductor"
          className={cn(
            "fixed inset-x-0 bottom-3 z-[9] mx-3 lg:bottom-4 lg:mx-auto lg:max-w-[900px]",
            "flex items-center gap-3 rounded-full bg-bahia py-2 pl-2 pr-4 text-crema lg:gap-4 lg:py-2.5 lg:pl-2.5 lg:pr-6",
          )}
        >
          <button
            type="button"
            aria-label="Pausar"
            onClick={pausar}
            className="inline-flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-naranja text-bahia-profundo lg:size-[52px]"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
            </svg>
          </button>

          <div className="min-w-0 flex-1 lg:flex-none lg:max-w-[40%]">
            <div className="truncate text-sm font-semibold lg:text-[15px]">
              {episodio.numero} · {episodio.titulo}
            </div>
            <div
              aria-hidden="true"
              className="mt-1.5 h-1 overflow-hidden rounded-sm bg-crema/30 lg:hidden"
            >
              <div
                className="h-full rounded-sm bg-crema transition-[width] duration-150"
                style={{ width: `${progreso}%` }}
              />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="hidden min-w-20 flex-1 overflow-hidden rounded-[3px] bg-crema/30 lg:block lg:h-1.5"
          >
            <div
              className="h-full rounded-[3px] bg-crema transition-[width] duration-150"
              style={{ width: `${progreso}%` }}
            />
          </div>

          <div className="shrink-0 text-[13px] font-semibold lg:text-sm">
            {modo === "audio" ? (
              <>
                <span className="lg:hidden">{formatearTiempo(currentTime)}</span>
                <span className="hidden lg:inline">
                  {formatearTiempo(currentTime)} /{" "}
                  {duration > 0
                    ? formatearTiempo(duration)
                    : episodio.duracion}
                </span>
              </>
            ) : (
              <span>{episodio.duracion}</span>
            )}
          </div>
        </div>
      ) : null}
    </Contexto.Provider>
  );
}
