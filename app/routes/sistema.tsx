import type { ReactNode } from "react";

import {
  AreaTexto,
  Aviso,
  Boton,
  CampoTexto,
  Casilla,
  Etiqueta,
  EtiquetaSeccion,
  GrupoOpciones,
  Selector,
  Tarjeta,
} from "~/components/ui";

import type { Route } from "./+types/sistema";

export function meta(): ReturnType<Route.MetaFunction> {
  return [
    { title: "Sistema · Ser, Mujer" },
    {
      name: "description",
      content: "Catálogo interno de componentes del sistema de diseño.",
    },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

function Seccion({
  titulo,
  children,
}: {
  titulo: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-serif text-h3-m font-normal text-bahia lg:text-h3">
        {titulo}
      </h2>
      {children}
    </section>
  );
}

function Fila({
  etiqueta,
  children,
}: {
  etiqueta: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-pequeno font-semibold text-bahia">{etiqueta}</p>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

export default function Sistema() {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-16 px-5 py-12 lg:px-20 lg:py-16">
      <header className="flex flex-col gap-3">
        <EtiquetaSeccion>Sistema de diseño · componentes</EtiquetaSeccion>
        <h1 className="font-serif text-h1-m font-normal text-bahia lg:text-h1">
          Sistema de componentes
        </h1>
        <p className="max-w-2xl text-cuerpo text-bahia">
          Catálogo interno para revisar variantes y estados. No forma parte de
          la navegación pública.
        </p>
      </header>

      <Seccion titulo="Botones">
        <Fila etiqueta="Primario · grande (56) y pequeño (44)">
          <Boton variante="primario" tamano="grande">
            Dar el primer paso
          </Boton>
          <Boton variante="primario" tamano="pequeno">
            Agendar una conversación
          </Boton>
          <Boton variante="primario" tamano="grande" disabled>
            Deshabilitado
          </Boton>
        </Fila>
        <Fila etiqueta="Secundario">
          <Boton variante="secundario" tamano="grande">
            Escribir por WhatsApp
          </Boton>
          <Boton variante="secundario" tamano="pequeno">
            Conoce quién soy
          </Boton>
          <Boton variante="secundario" tamano="grande" disabled>
            Deshabilitado
          </Boton>
        </Fila>
        <Fila etiqueta="Texto (enlace)">
          <Boton variante="texto" tamano="pequeno" href="#como">
            Cómo te acompañamos
          </Boton>
          <Boton variante="texto" tamano="pequeno" href="#saber" disabled>
            Deshabilitado
          </Boton>
        </Fila>
        <div
          id="como"
          className="sobre-oscuro flex flex-col gap-6 rounded-tarjeta bg-bahia p-8 text-crema"
        >
          <p className="text-pequeno font-semibold text-crema">
            Sobre fondo oscuro
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Boton variante="primario" tamano="grande" sobreOscuro>
              Dar el primer paso
            </Boton>
            <Boton variante="secundario" tamano="grande" sobreOscuro>
              Escribir por WhatsApp
            </Boton>
            <Boton
              variante="texto"
              tamano="pequeno"
              sobreOscuro
              href="#conoce"
            >
              Conoce quién soy
            </Boton>
          </div>
        </div>
        <p id="saber" className="sr-only">
          Ancla de demo para botón deshabilitado
        </p>
      </Seccion>

      <Seccion titulo="Etiquetas">
        <Fila etiqueta="Pastillas informativas">
          <Etiqueta variante="niebla">Taller</Etiqueta>
          <Etiqueta variante="primavera">Podcast</Etiqueta>
          <Etiqueta variante="durazno">Recurso</Etiqueta>
          <Etiqueta variante="contorno">Virtual</Etiqueta>
          <Etiqueta variante="oscura">Cupos abiertos</Etiqueta>
        </Fila>
        <Fila etiqueta="Etiqueta de sección">
          <EtiquetaSeccion>Cómo te acompañamos</EtiquetaSeccion>
        </Fila>
      </Seccion>

      <Seccion titulo="Tarjetas">
        <div id="conoce" className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Tarjeta variante="blanca">
            <Etiqueta variante="niebla">Taller</Etiqueta>
            <h3 className="font-serif text-[26px] leading-[1.25] font-normal">
              Tarjeta de contenido
            </h3>
            <p className="text-[15px] leading-normal">
              Blanca sobre Crema. Para eventos, recursos y episodios del
              podcast.
            </p>
            <Boton variante="texto" tamano="pequeno" href="#saber-mas">
              Saber más
            </Boton>
          </Tarjeta>
          <Tarjeta variante="niebla">
            <span
              className="font-serif text-[36px] leading-none italic"
              aria-hidden="true"
            >
              01
            </span>
            <h3 className="font-serif text-[26px] leading-[1.25] font-normal">
              Niebla Marina
            </h3>
            <p className="text-[15px] leading-normal">
              Para formas de acompañamiento y bloques de color.
            </p>
          </Tarjeta>
          <Tarjeta variante="primavera">
            <span
              className="font-serif text-[36px] leading-none italic"
              aria-hidden="true"
            >
              02
            </span>
            <h3 className="font-serif text-[26px] leading-[1.25] font-normal">
              Rosa Primavera
            </h3>
            <p className="text-[15px] leading-normal">
              Texto en Bahía Profundo para contraste suficiente.
            </p>
          </Tarjeta>
          <Tarjeta variante="durazno">
            <span
              className="font-serif text-[36px] leading-none italic"
              aria-hidden="true"
            >
              03
            </span>
            <h3 className="font-serif text-[26px] leading-[1.25] font-normal">
              Rosa Durazno
            </h3>
            <p className="text-[15px] leading-normal">
              Misma estructura tipográfica que las demás.
            </p>
          </Tarjeta>
        </div>
      </Seccion>

      <Seccion titulo="Formularios">
        <div id="saber-mas" className="grid max-w-xl gap-8">
          <CampoTexto
            etiqueta="¿Cómo quieres que te llamemos?"
            placeholder="Puede ser un apodo"
            ayuda="Campo normal · no hace falta tu nombre real."
          />
          <CampoTexto
            etiqueta="WhatsApp o correo"
            defaultValue="mi.correo"
            error="Parece que falta una parte, por ejemplo @correo.com"
          />
          <AreaTexto
            etiqueta="Cuéntanos lo que quieras"
            opcional
            placeholder="Hasta donde te sientas cómoda"
          />
          <Selector
            etiqueta="¿Cómo prefieres que te contactemos?"
            opciones={[
              { valor: "whatsapp", etiqueta: "WhatsApp" },
              { valor: "correo", etiqueta: "Correo electrónico" },
              { valor: "llamada", etiqueta: "Llamada" },
            ]}
            defaultValue="whatsapp"
          />
          <div className="flex flex-col gap-1">
            <p className="mb-1.5 font-semibold text-bahia">Me interesa</p>
            <Casilla
              etiqueta="Acompañamiento personalizado"
              defaultChecked
            />
            <Casilla etiqueta="Talleres y encuentros grupales" />
          </div>
          <GrupoOpciones
            leyenda="Modalidad"
            name="modalidad-demo"
            defaultValue="virtual"
            opciones={[
              { valor: "virtual", etiqueta: "Virtual" },
              { valor: "presencial", etiqueta: "Presencial" },
            ]}
          />
        </div>
      </Seccion>

      <Seccion titulo="Avisos">
        <div className="flex max-w-2xl flex-col gap-4">
          <Aviso tono="info" titulo="Información">
            Respondemos en un plazo cercano a tu mensaje, dentro del{" "}
            [HORARIO DE ATENCIÓN].
          </Aviso>
          <Aviso tono="exito" titulo="Recibimos tu mensaje">
            Gracias por escribirnos. Te responderemos con cuidado y sin
            prisa.
          </Aviso>
          <Aviso tono="aviso" titulo="Antes de continuar">
            Si compartes este dispositivo, revisa cómo navegar con seguridad.
          </Aviso>
          <Aviso tono="error" titulo="No pudimos enviar tu mensaje">
            No es por algo que hayas hecho. Puedes intentarlo de nuevo en un
            momento.
          </Aviso>
        </div>
      </Seccion>
    </div>
  );
}
