import { BloqueServicio } from "~/components/contenido/BloqueServicio";
import { PreguntaFrecuente } from "~/components/contenido/PreguntaFrecuente";
import { Apertura } from "~/components/secciones/Apertura";
import { LlamadoFinal } from "~/components/secciones/LlamadoFinal";
import { Boton } from "~/components/ui/Boton";
import { EtiquetaSeccion } from "~/components/ui/EtiquetaSeccion";
import { listarPreguntas, listarServicios, sitio } from "~/content";
import { enlaceUsable } from "~/lib/enlaces";

const puntosRitmo = [
  {
    titulo: "Puedes ir despacio",
    texto: "Empezar solo leyendo o escuchando también es empezar.",
  },
  {
    titulo: "Puedes hacer una pausa",
    texto: "Si necesitas detenerte, lo haces. La puerta sigue abierta.",
  },
  {
    titulo: "Puedes cambiar de camino",
    texto: "Pasar de un taller a un grupo, o a sesiones, cuando lo sientas.",
  },
] as const;

export function meta() {
  return [
    { title: "Cómo te acompañamos · Ser, Mujer" },
    {
      name: "description",
      content:
        "Talleres, recursos, grupos y sesiones individuales. Cuatro formas de caminar juntas, sin prisa.",
    },
  ];
}

export default function ComoTeAcompanamos() {
  const servicios = listarServicios();
  const preguntas = listarPreguntas();

  return (
    <>
      <Apertura
        etiqueta="Cómo te acompañamos"
        titulo="Hay más de una forma de"
        tituloCursiva="empezar"
        texto="Te contamos, sin prisa, las cuatro maneras en que podemos caminar a tu lado. No tienes que elegir hoy, ni elegir una sola."
        acciones={
          <nav
            aria-label="En esta página"
            className="flex w-full flex-wrap gap-2.5 lg:gap-3"
          >
            {servicios.map((servicio) => (
              <a
                key={servicio.id}
                href={`#${servicio.id}`}
                className="inline-flex min-h-11 items-center rounded-full bg-blanco px-[18px] py-1.5 text-[15px] font-semibold text-bahia no-underline lg:px-[22px] lg:py-2"
              >
                {servicio.titulo}
              </a>
            ))}
          </nav>
        }
      />

      <section className="px-4 py-10 lg:px-14 lg:py-20 lg:pb-24">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-5 lg:gap-7">
          {servicios.map((servicio) => (
            <BloqueServicio key={servicio.id} servicio={servicio} />
          ))}
        </div>
      </section>

      <section
        id="ritmo"
        className="relative bg-margarita px-5 py-16 text-blanco lg:px-14 lg:py-28"
      >
        <div className="grano absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-4 lg:gap-12">
          <div className="flex max-w-[860px] flex-col gap-4 lg:gap-5">
            <EtiquetaSeccion className="text-blanco">A tu ritmo</EtiquetaSeccion>
            <h2 className="m-0 font-serif text-h2-m font-normal text-blanco lg:text-h2">
              Cada mujer avanza a su propio ritmo.{" "}
              <span className="italic">El tuyo está bien.</span>
            </h2>
            <p className="m-0 max-w-[640px] text-base leading-7 text-blanco lg:text-lg lg:leading-8">
              Sanar no es una línea recta ni tiene fecha de entrega. Aquí no hay
              etapas que cumplir ni un orden correcto.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-5">
            {puntosRitmo.map((punto) => (
              <div
                key={punto.titulo}
                className="border-t border-blanco/60 pt-3.5 lg:pt-5"
              >
                <h3 className="m-0 mb-0.5 font-sans text-lg font-semibold leading-[26px] text-blanco lg:mb-1.5 lg:text-h4">
                  {punto.titulo}
                </h3>
                <p className="m-0 text-base leading-7 text-blanco">{punto.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="preguntas" className="px-4 py-16 lg:px-14 lg:py-24">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-start lg:gap-x-[72px] lg:gap-y-10">
          <div className="flex flex-[1_1_320px] flex-col items-start gap-3 px-1 lg:gap-4">
            <EtiquetaSeccion>Preguntas frecuentes</EtiquetaSeccion>
            <h2 className="m-0 font-serif text-h2-m font-normal text-bahia lg:text-h2">
              Lo que suelen preguntarnos
            </h2>
            <p className="m-0 hidden text-bahia lg:block">
              ¿Tu duda no está aquí? Escríbenos; ninguna pregunta está de más.
            </p>
            <Boton
              variante="texto"
              href="/contacto"
              className="hidden px-0 lg:inline-flex"
            >
              Hacer una pregunta
            </Boton>
          </div>

          <div className="flex flex-[2_1_560px] flex-col gap-3">
            {preguntas.map((item, indice) => (
              <PreguntaFrecuente
                key={item.pregunta}
                pregunta={item.pregunta}
                respuesta={item.respuesta}
                abierta={indice < 3}
              />
            ))}
          </div>

          <Boton
            variante="texto"
            href="/contacto"
            className="mt-2 self-start px-1 lg:hidden"
          >
            Hacer otra pregunta
          </Boton>
        </div>
      </section>

      <LlamadoFinal
        id="contacto"
        titulo="¿Conversamos?"
        texto="Si algo de esto resuena contigo, escríbenos. Te respondemos con calma y sin compromiso, por el medio que prefieras."
        acciones={
          <>
            <Boton
              sobreOscuro
              className="w-full justify-center gap-3 lg:w-auto"
              {...(enlaceUsable(sitio.whatsapp.href)
                ? {
                    href: sitio.whatsapp.href,
                    rel: "noopener noreferrer",
                    target: "_blank" as const,
                  }
                : { disabled: true })}
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
            <Boton
              variante="secundario"
              sobreOscuro
              href="/contacto"
              className="w-full justify-center lg:w-auto"
            >
              Ir al formulario de contacto
            </Boton>
          </>
        }
      />
    </>
  );
}
