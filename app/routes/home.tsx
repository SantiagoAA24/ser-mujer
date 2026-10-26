import { TarjetaEpisodioDestacado } from "~/components/contenido/TarjetaEpisodioDestacado";
import { TarjetaEvento } from "~/components/contenido/TarjetaEvento";
import { FormasOrganicas } from "~/components/ilustracion/FormasOrganicas";
import { ReproductorFachada } from "~/components/media/ReproductorFachada";
import { Apertura } from "~/components/secciones/Apertura";
import { LlamadoFinal } from "~/components/secciones/LlamadoFinal";
import { Boton } from "~/components/ui/Boton";
import { EtiquetaSeccion } from "~/components/ui/EtiquetaSeccion";
import { Tarjeta } from "~/components/ui/Tarjeta";
import {
  listarEpisodios,
  listarProximosEventos,
  listarServicios,
  obtenerTestimonioDestacado,
  sitio,
} from "~/content";
import type { TarjetaVariante } from "~/components/ui/Tarjeta";
import type { FondoServicio } from "~/content/types";

const enlacesInicioServicio: Record<
  string,
  { label: string; href: string }
> = {
  talleres: { label: "Ver talleres", href: "/eventos" },
  "recursos-emocionales": { label: "Explorar recursos", href: "/recursos" },
  "dinamicas-grupales": {
    label: "Conocer los grupos",
    href: "/como-te-acompanamos",
  },
  "sesiones-individuales": {
    label: "Saber cómo funcionan",
    href: "/como-te-acompanamos",
  },
};

function varianteTarjeta(fondo: FondoServicio): TarjetaVariante {
  return fondo === "blanco" ? "blanca" : fondo;
}

export function meta() {
  return [{ title: "Ser, Mujer" }];
}

export default function Home() {
  const servicios = listarServicios();
  const episodio = listarEpisodios()[0];
  const eventos = listarProximosEventos(3);
  const testimonio = obtenerTestimonioDestacado();

  return (
    <>
      <Apertura
        etiqueta="Un espacio seguro para ti"
        titulo="No estás sola,"
        tituloCursiva="te acompañamos"
        texto="No importa lo que hayas vivido: aquí serás escuchada, respetada y acompañada en tu camino de sanación, a tu ritmo."
        acciones={
          <>
            <Boton href="/contacto" className="w-full justify-center lg:w-auto">
              Da el primer paso
            </Boton>
            <Boton
              variante="texto"
              href="/como-te-acompanamos"
              className="justify-center self-center px-0 lg:self-auto"
            >
              Conoce cómo te acompañamos
            </Boton>
          </>
        }
        nota="Sin compromiso. Tú decides cuándo y cuánto contar."
        ilustracion={<FormasOrganicas />}
      />

      <section className="relative bg-margarita px-5 py-16 text-blanco lg:px-14 lg:py-28">
        <div className="grano absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-4 lg:flex-row lg:flex-wrap lg:gap-x-24 lg:gap-y-10">
          <div className="flex flex-[1.1_1_440px] flex-col gap-4 lg:gap-5">
            <EtiquetaSeccion className="text-blanco">Bienvenida</EtiquetaSeccion>
            <h2 className="m-0 font-serif text-h2-m font-normal text-blanco lg:text-h2">
              Llegar hasta aquí ya es un acto de valentía
            </h2>
          </div>
          <div className="flex flex-[1_1_440px] flex-col items-start gap-4 text-base leading-7 text-blanco lg:gap-5 lg:text-lg lg:leading-8">
            <p className="m-0">
              Somos Ser, Mujer: un espacio de acompañamiento para mujeres que han
              atravesado situaciones de abuso físico, emocional o sexual.
            </p>
            <p className="m-0">
              Aquí encuentras un lugar seguro y confidencial donde sanar,
              conectarte con otras mujeres y crecer. Nadie te va a apurar ni a
              decirte cómo debes sentirte: tu proceso es tuyo y lo acompañamos
              con respeto.
            </p>
            <Boton
              variante="texto"
              sobreOscuro
              href="/quien-soy"
              className="px-0 text-blanco hover:text-blanco"
            >
              Conoce quién soy
            </Boton>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-14 lg:py-24">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-4 lg:gap-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between lg:gap-x-16">
            <div className="flex flex-col gap-4">
              <EtiquetaSeccion>Cómo te acompañamos</EtiquetaSeccion>
              <h2 className="m-0 font-serif text-h2-m font-normal text-bahia lg:text-h2">
                Distintas maneras de caminar a tu lado
              </h2>
            </div>
            <p className="m-0 hidden max-w-[400px] text-bahia lg:block">
              Puedes empezar por donde te sientas más cómoda y cambiar cuando
              quieras.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5 xl:grid-cols-4">
            {servicios.map((servicio) => {
              const enlace =
                enlacesInicioServicio[servicio.slug] ?? servicio.cta;
              return (
                <Tarjeta
                  key={servicio.slug}
                  variante={varianteTarjeta(servicio.fondo)}
                  className="h-full gap-2 p-6 lg:gap-3 lg:p-8"
                >
                  <h3 className="m-0 font-serif text-h3-m font-normal lg:text-h3">
                    {servicio.titulo}
                  </h3>
                  <p className="m-0 flex-1 text-base">{servicio.resumen}</p>
                  <a
                    href={enlace.href}
                    className="inline-flex min-h-11 items-center font-semibold underline-offset-[6px] hover:decoration-2"
                  >
                    {enlace.label}
                  </a>
                </Tarjeta>
              );
            })}
          </div>
        </div>
      </section>

      {testimonio != null ? (
        <section className="px-5 pb-16 pt-0 lg:px-14 lg:pb-28 lg:pt-6">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-[72px] lg:gap-y-12">
            <div className="order-2 w-full lg:order-1 lg:flex-[1.1_1_460px]">
              <ReproductorFachada
                proveedor="youtube"
                id={testimonio.youtubeId}
                ariaLabel="Reproducir video del testimonio"
                badge={`[VIDEO DEL TESTIMONIO · ${testimonio.duracion}]`}
                fondo={
                  <div
                    className="patron-azul absolute inset-0 opacity-25"
                    aria-hidden="true"
                  />
                }
                className="h-[210px] aspect-auto lg:h-auto lg:aspect-[16/10]"
              />
            </div>
            <figure className="order-1 m-0 flex flex-[1_1_420px] flex-col items-start gap-4 lg:order-2 lg:gap-5">
              <EtiquetaSeccion>Una historia compartida</EtiquetaSeccion>
              <blockquote className="m-0 font-serif text-2xl italic leading-[34px] text-bahia lg:text-[30px] lg:leading-[42px]">
                «{testimonio.cita}»
              </blockquote>
              <figcaption className="text-[15px] text-bahia lg:text-base">
                <strong>{testimonio.nombre}</strong> · compartido con su permiso
              </figcaption>
              <p className="m-0 hidden text-sm text-bahia lg:block">
                El video incluye subtítulos y no se reproduce solo.
              </p>
              <Boton variante="texto" href="/testimonios" className="px-0">
                Ver más testimonios
              </Boton>
            </figure>
          </div>
        </section>
      ) : null}

      {episodio != null ? (
        <section className="bg-durazno px-5 py-16 lg:px-14 lg:py-24">
          <TarjetaEpisodioDestacado
            episodio={episodio}
            enlaceTodos={{
              label: "Escuchar todos los episodios",
              href: "/podcast",
            }}
          />
        </section>
      ) : null}

      <section className="px-5 py-16 lg:px-14 lg:py-24">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-4 lg:gap-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between lg:gap-x-16">
            <div className="flex flex-col gap-4">
              <EtiquetaSeccion>Próximos eventos gratuitos</EtiquetaSeccion>
              <h2 className="m-0 font-serif text-h2-m font-normal text-bahia lg:text-h2">
                Ven a conocernos, sin costo
              </h2>
            </div>
            <Boton
              variante="texto"
              href="/eventos"
              className="hidden px-0 lg:inline-flex"
            >
              Ver todos los eventos
            </Boton>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
            {eventos.map((evento) => (
              <TarjetaEvento key={evento.slug} evento={evento} />
            ))}
          </div>

          <p className="m-0 text-sm text-bahia">
            Puedes participar con la cámara apagada y sin hablar si así lo
            prefieres.
          </p>

          <Boton
            variante="texto"
            href="/eventos"
            className="self-start px-0 lg:hidden"
          >
            Ver todos los eventos
          </Boton>
        </div>
      </section>

      <LlamadoFinal
        titulo="Cuando te sientas lista, aquí estamos"
        texto="Puedes agendar una primera sesión o simplemente escribirnos para preguntar. Es confidencial y no te compromete a nada."
        acciones={
          <>
            <Boton
              sobreOscuro
              href="/agendar"
              className="w-full justify-center lg:w-auto"
            >
              Agendar una sesión
            </Boton>
            <Boton
              variante="secundario"
              sobreOscuro
              href={sitio.whatsapp.href}
              className="w-full justify-center gap-3 lg:w-auto"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 20l1.4-4.2A8 8 0 1 1 8.5 19L4 20z" />
              </svg>
              Escribirnos por WhatsApp
            </Boton>
          </>
        }
      />
    </>
  );
}
