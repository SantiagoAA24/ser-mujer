import { FotoPerfil } from "~/components/contenido/FotoPerfil";
import { TarjetaProfesional } from "~/components/contenido/TarjetaProfesional";
import { LlamadoFinal } from "~/components/secciones/LlamadoFinal";
import { Boton } from "~/components/ui/Boton";
import { EtiquetaSeccion } from "~/components/ui/EtiquetaSeccion";
import { Tarjeta } from "~/components/ui/Tarjeta";
import { listarProfesionales, obtenerPerfil, sitio } from "~/content";
import { enlaceUsable } from "~/lib/enlaces";

const principiosEnfoque = [
  {
    titulo: "Tú marcas el ritmo",
    texto:
      "No hay etapas que cumplir ni soluciones rápidas. Avanzamos cuando tú lo sientes.",
  },
  {
    titulo: "Sin juicios ni etiquetas",
    texto:
      "Lo que compartes se recibe con respeto. Nadie te dirá cómo deberías sentirte.",
  },
  {
    titulo: "Herramientas a tu medida",
    texto:
      "Cada proceso es distinto; lo que trabajamos se adapta a lo que necesitas hoy.",
  },
] as const;

const valores = [
  {
    titulo: "Autenticidad y amor",
    texto:
      "La sanación comienza con el amor propio. Te acompaño a reconectar con tu fuerza interior siendo honesta y transparente contigo.",
    variante: "niebla" as const,
  },
  {
    titulo: "Empatía y acompañamiento",
    texto:
      "Un espacio seguro donde te sientas escuchada y valorada, con herramientas adaptadas a ti y respeto por tu propio ritmo.",
    variante: "primavera" as const,
  },
  {
    titulo: "Inspiración y confidencialidad",
    texto:
      "Una comunidad segura y confidencial donde descubrir tu fortaleza, con el apoyo de otras mujeres.",
    variante: "durazno" as const,
  },
] as const;

function IconoSello() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-9 shrink-0 text-margarita lg:size-10"
    >
      <circle cx="20" cy="16" r="10" />
      <path d="M14 24l-3 12 9-5 9 5-3-12" />
      <path d="M16 16l3 3 5-6" />
    </svg>
  );
}

export function meta() {
  return [
    { title: "Quién soy · Ser, Mujer" },
    {
      name: "description",
      content:
        "Conoce a quien acompaña en Ser, Mujer: trayectoria, enfoque y valores del espacio.",
    },
  ];
}

export default function QuienSoy() {
  const perfil = obtenerPerfil();
  const profesionales = listarProfesionales();
  const mostrarEquipo = profesionales.length > 1;

  return (
    <>
      <section
        id="arriba"
        className="degradado px-5 py-12 lg:px-14 lg:pb-24 lg:pt-[88px]"
      >
        <div className="mx-auto flex max-w-[1240px] flex-col items-stretch gap-5 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-20 lg:gap-y-14">
          <div className="order-1 w-full max-w-[440px] self-center lg:order-2 lg:flex-[1_1_360px] lg:self-auto">
            <FotoPerfil nombre={perfil.nombre} src={perfil.imagen} />
          </div>

          <div className="order-2 flex flex-[1.3_1_520px] flex-col items-start gap-[22px] lg:order-1">
            <EtiquetaSeccion>Quién soy</EtiquetaSeccion>
            <h1 className="m-0 font-serif text-h1-m font-normal tracking-[-0.01em] text-bahia lg:text-h1 lg:leading-[1.08]">
              {perfil.nombre}
            </h1>
            <div className="text-lg font-semibold leading-[26px] text-bahia lg:text-h4">
              {perfil.profesion} · Fundadora y acompañante en Ser, Mujer
            </div>
            <p className="m-0 max-w-[520px] text-[17px] leading-7 text-bahia lg:text-[19px] lg:leading-8">
              Acompaño a mujeres en su camino de sanación, con respeto por su
              historia y por su ritmo.
            </p>
            <div className="mt-2 flex w-full flex-col flex-wrap items-stretch gap-4 lg:mt-2 lg:w-auto lg:flex-row lg:items-center lg:gap-x-7">
              <Boton
                href="/agendar"
                className="w-full justify-center lg:w-auto"
              >
                Agendar una conversación
              </Boton>
              <Boton
                variante="texto"
                href="#trayectoria"
                className="hidden justify-center self-center px-0 lg:inline-flex lg:self-auto"
              >
                Ver formación y trayectoria
              </Boton>
            </div>
          </div>
        </div>
      </section>

      <section id="presentacion" className="px-5 py-16 lg:px-14 lg:py-24">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-start lg:gap-x-24 lg:gap-y-10">
          <div className="flex flex-[1_1_320px] flex-col gap-4 lg:gap-4">
            <EtiquetaSeccion>Presentación</EtiquetaSeccion>
            <h2 className="m-0 font-serif text-h2-m font-normal text-bahia lg:text-h2">
              Hola, soy {perfil.nombre}
            </h2>
          </div>
          <div className="flex max-w-[700px] flex-[1.6_1_520px] flex-col gap-5">
            <p className="m-0 text-[17px] leading-7 text-bahia lg:text-[19px] lg:leading-8">
              Gracias por querer saber quién está del otro lado. Para confiar en
              alguien, primero hay que conocerla.
            </p>
            {perfil.presentacion.map((parrafo) => (
              <p key={parrafo} className="m-0 text-bahia">
                {parrafo}
              </p>
            ))}
            <p className="m-0 font-serif text-2xl font-normal italic leading-9 text-bahia lg:leading-9">
              «{perfil.frase}»
            </p>
          </div>
        </div>
      </section>

      <section
        id="trayectoria"
        className="scroll-mt-24 px-4 pb-16 lg:px-14 lg:pb-24"
      >
        <div className="mx-auto flex max-w-[1240px] flex-col flex-wrap gap-3.5 rounded-[28px] bg-blanco p-5 lg:flex-row lg:gap-x-[72px] lg:gap-y-10 lg:rounded-[32px] lg:p-14">
          <div className="flex flex-[1_1_300px] flex-col gap-4">
            <EtiquetaSeccion>Formación y trayectoria</EtiquetaSeccion>
            <h2 className="m-0 font-serif text-h2-m font-normal text-bahia lg:text-h2">
              El camino que me trajo hasta aquí
            </h2>
            <p className="m-0 hidden text-bahia lg:block">
              Mi preparación es parte del cuidado que te ofrezco.
            </p>
          </div>
          <ol className="m-0 flex flex-[1.7_1_560px] list-none flex-col p-0">
            {perfil.trayectoria.map((hito, indice) => {
              const esUltimo = indice === perfil.trayectoria.length - 1;
              return (
                <li
                  key={`${hito.periodo}-${hito.titulo}`}
                  className={
                    esUltimo
                      ? "flex flex-col gap-0.5 py-3.5 lg:flex-row lg:flex-wrap lg:gap-x-8 lg:gap-y-1 lg:pb-0 lg:pt-[22px]"
                      : "flex flex-col gap-0.5 border-b border-bahia/25 py-3.5 lg:flex-row lg:flex-wrap lg:gap-x-8 lg:gap-y-1 lg:py-[22px] first:pt-0 first:lg:pb-[22px] first:lg:pt-0"
                  }
                >
                  <div className="shrink-0 text-sm font-semibold text-bahia lg:w-[140px] lg:text-base">
                    {hito.periodo}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="m-0 text-lg font-semibold leading-[26px] text-bahia lg:text-h4">
                      {hito.titulo}
                    </h3>
                    <div className="text-[15px] text-bahia lg:text-base">
                      {hito.detalle}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section
        id="enfoque"
        className="relative bg-margarita px-5 py-16 text-blanco lg:px-14 lg:py-28"
      >
        <div className="grano absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-4 lg:gap-12">
          <div className="flex max-w-[820px] flex-col gap-4 lg:gap-5">
            <EtiquetaSeccion className="text-blanco">
              Enfoque de trabajo
            </EtiquetaSeccion>
            <h2 className="m-0 font-serif text-h2-m font-normal text-blanco lg:text-h2">
              Acompañar no es dirigir:{" "}
              <span className="italic">es caminar al lado</span>
            </h2>
            <p className="m-0 max-w-[640px] text-base leading-7 text-blanco lg:text-lg lg:leading-8">
              {perfil.enfoque}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-5">
            {principiosEnfoque.map((principio) => (
              <div
                key={principio.titulo}
                className="border-t border-blanco/60 pt-3.5 lg:pt-5"
              >
                <h3 className="m-0 mb-0.5 font-sans text-lg font-semibold leading-[26px] text-blanco lg:mb-1.5 lg:text-h4">
                  {principio.titulo}
                </h3>
                <p className="m-0 text-base leading-7 text-blanco">
                  {principio.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="valores" className="px-4 py-16 lg:px-14 lg:py-24">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-4 lg:gap-12">
          <div className="flex flex-col gap-4 px-1 lg:gap-4">
            <EtiquetaSeccion>Valores</EtiquetaSeccion>
            <h2 className="m-0 font-serif text-h2-m font-normal text-bahia lg:text-h2">
              Lo que sostiene este espacio
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {valores.map((valor) => (
              <Tarjeta
                key={valor.titulo}
                variante={valor.variante}
                className="gap-3 p-6 lg:p-9"
              >
                <h3 className="m-0 font-serif text-h3-m font-normal lg:text-h3">
                  {valor.titulo}
                </h3>
                <p className="m-0 text-base leading-7">{valor.texto}</p>
              </Tarjeta>
            ))}
          </div>
        </div>
      </section>

      <section
        id="certificaciones"
        className="px-4 pb-16 lg:px-14 lg:pb-24"
      >
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 lg:gap-10">
          <div className="flex flex-col gap-4 px-1 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between lg:gap-x-16">
            <div className="flex flex-col gap-4">
              <EtiquetaSeccion>Certificaciones</EtiquetaSeccion>
              <h2 className="m-0 font-serif text-h2-m font-normal text-bahia lg:text-h2">
                Respaldo profesional
              </h2>
            </div>
            <p className="m-0 hidden max-w-[420px] text-bahia lg:block">
              {perfil.registro} · Puedes pedirme cualquiera de estos documentos.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {perfil.certificaciones.map((cert) => (
              <article
                key={cert.nombre}
                className="flex flex-row items-start gap-[14px] rounded-tarjeta bg-blanco p-5 text-bahia lg:gap-[18px] lg:p-7"
              >
                <IconoSello />
                <div>
                  <h3 className="m-0 text-[17px] font-semibold leading-6 text-bahia lg:text-lg lg:leading-[26px]">
                    {cert.nombre}
                  </h3>
                  <div className="text-[15px] text-bahia">
                    {cert.entidad} · {cert.anio}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="m-0 px-1 text-[15px] text-bahia lg:hidden">
            {perfil.registro} · Puedes pedirme cualquiera de estos documentos.
          </p>
        </div>
      </section>

      {mostrarEquipo ? (
        <section id="equipo" className="bg-niebla px-4 py-16 lg:px-14 lg:py-24">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-3.5 lg:gap-10">
            <div className="flex max-w-[760px] flex-col gap-4 px-1">
              <EtiquetaSeccion>Quienes acompañan</EtiquetaSeccion>
              <h2 className="m-0 font-serif text-h2-m font-normal text-bahia lg:text-h2">
                Un equipo que irá creciendo
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {profesionales.map((profesional) => (
                <TarjetaProfesional
                  key={profesional.slug}
                  profesional={profesional}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <LlamadoFinal
        id="agendar"
        titulo="Si quieres, nos conocemos"
        texto="Un primer encuentro para conversar, sin compromiso y a tu ritmo. Tú decides qué contar y si quieres continuar."
        acciones={
          <>
            <Boton
              sobreOscuro
              href="/agendar"
              className="w-full justify-center lg:w-auto"
            >
              Agendar con {perfil.nombre}
            </Boton>
            <Boton
              variante="secundario"
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
              Escribirme por WhatsApp
            </Boton>
          </>
        }
      />
    </>
  );
}
