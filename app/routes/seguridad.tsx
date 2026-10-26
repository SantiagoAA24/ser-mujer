import type { ReactNode } from "react";

import { PreguntaFrecuente } from "~/components/contenido/PreguntaFrecuente";
import { Apertura } from "~/components/secciones/Apertura";
import { LlamadoFinal } from "~/components/secciones/LlamadoFinal";
import { Aviso } from "~/components/ui/Aviso";
import { Boton } from "~/components/ui/Boton";
import { EtiquetaSeccion } from "~/components/ui/EtiquetaSeccion";
import { Tarjeta } from "~/components/ui/Tarjeta";
import { sitio } from "~/content/sitio";

type GuiaNavegador = {
  id: string;
  pregunta: string;
  respuesta: ReactNode;
};

const guiasNavegador: GuiaNavegador[] = [
  {
    id: "chrome",
    pregunta: "Chrome (computador)",
    respuesta: (
      <ol>
        {/* REVISAR */}
        <li>
          Abre el menú (los tres puntos) y elige Configuración → Privacidad y
          seguridad.
        </li>
        {/* REVISAR */}
        <li>
          Entra en Borrar datos de navegación, elige el intervalo y marca
          Historial (y lo demás que quieras borrar).
        </li>
        {/* REVISAR */}
        <li>
          Para navegar sin guardar historial: menú → Nueva ventana de
          incógnito.
        </li>
      </ol>
    ),
  },
  {
    id: "safari",
    pregunta: "Safari (Mac)",
    respuesta: (
      <ol>
        {/* REVISAR */}
        <li>En el menú Historial, elige Borrar historial…</li>
        {/* REVISAR */}
        <li>Elige el intervalo y confirma.</li>
        {/* REVISAR */}
        <li>
          Para una ventana privada: Archivo → Nueva ventana privada.
        </li>
      </ol>
    ),
  },
  {
    id: "firefox",
    pregunta: "Firefox (computador)",
    respuesta: (
      <ol>
        {/* REVISAR */}
        <li>
          Abre el menú y ve a Ajustes → Privacidad y seguridad.
        </li>
        {/* REVISAR */}
        <li>
          En Historial, elige Borrar historial… y marca lo que quieras
          eliminar.
        </li>
        {/* REVISAR */}
        <li>
          Para navegar en privado: menú → Nueva ventana privada.
        </li>
      </ol>
    ),
  },
  {
    id: "edge",
    pregunta: "Edge (computador)",
    respuesta: (
      <ol>
        {/* REVISAR */}
        <li>
          Abre el menú (los tres puntos) → Configuración → Privacidad,
          búsqueda y servicios.
        </li>
        {/* REVISAR */}
        <li>
          En Borrar datos de exploración, elige Qué borrar y confirma.
        </li>
        {/* REVISAR */}
        <li>
          Para una ventana InPrivate: menú → Nueva ventana InPrivate.
        </li>
      </ol>
    ),
  },
  {
    id: "safari-movil",
    pregunta: "Safari (iPhone o iPad)",
    respuesta: (
      <ol>
        {/* REVISAR */}
        <li>
          Abre Ajustes del teléfono → Safari → Borrar historial y datos del
          sitio web.
        </li>
        {/* REVISAR */}
        <li>Confirma cuando te lo pida.</li>
        {/* REVISAR */}
        <li>
          Para navegar en privado: en Safari, toca las pestañas y elige
          Privado.
        </li>
      </ol>
    ),
  },
  {
    id: "chrome-movil",
    pregunta: "Chrome (celular)",
    respuesta: (
      <ol>
        {/* REVISAR */}
        <li>
          Abre el menú (los tres puntos) → Historial → Borrar datos de
          navegación.
        </li>
        {/* REVISAR */}
        <li>
          Elige el intervalo, marca Historial y confirma.
        </li>
        {/* REVISAR */}
        <li>
          Para una pestaña de incógnito: menú → Nueva pestaña de
          incógnito.
        </li>
      </ol>
    ),
  },
];

const consejosMedio = [
  {
    titulo: "Elige un medio que solo tú revises",
    texto:
      "Si puedes, usa un correo o un número de WhatsApp que otras personas no suelan abrir. Así tus mensajes quedan en un lugar más tuyo.",
  },
  {
    titulo: "Borra los mensajes cuando termines",
    texto:
      "Después de leer o escribir, puedes eliminar la conversación o los mensajes concretos. En WhatsApp también puedes borrar para ti.",
  },
  {
    titulo: "Revisa la pantalla bloqueada",
    texto:
      "En el teléfono, puedes ocultar el contenido de las notificaciones en la pantalla de bloqueo, para que no se lean sin desbloquear.",
  },
] as const;

export function meta() {
  return [
    { title: "Navegar con seguridad · Ser, Mujer" },
    {
      name: "description",
      content:
        "Ideas sencillas para cuidar tu privacidad mientras visitas este sitio, a tu ritmo.",
    },
  ];
}

export default function Seguridad() {
  return (
    <>
      <Apertura
        etiqueta="Seguridad"
        titulo="Cómo navegar"
        tituloCursiva="con seguridad"
        texto="Algunas ideas sencillas para cuidar tu privacidad mientras visitas este sitio. Léelas con calma; no tienes que hacer todo de una vez."
        acciones={
          <nav
            aria-label="En esta página"
            className="flex w-full flex-wrap gap-2.5 lg:gap-3"
          >
            <a
              href="#salida-rapida"
              className="inline-flex min-h-11 items-center rounded-full bg-blanco px-[18px] py-1.5 text-[15px] font-semibold text-bahia no-underline lg:px-[22px] lg:py-2"
            >
              Salida rápida
            </a>
            <a
              href="#historial"
              className="inline-flex min-h-11 items-center rounded-full bg-blanco px-[18px] py-1.5 text-[15px] font-semibold text-bahia no-underline lg:px-[22px] lg:py-2"
            >
              Historial
            </a>
            <a
              href="#correo-whatsapp"
              className="inline-flex min-h-11 items-center rounded-full bg-blanco px-[18px] py-1.5 text-[15px] font-semibold text-bahia no-underline lg:px-[22px] lg:py-2"
            >
              Correo y WhatsApp
            </a>
          </nav>
        }
      />

      <section
        id="salida-rapida"
        className="px-5 py-12 lg:px-14 lg:py-20"
      >
        <div className="mx-auto flex max-w-[800px] flex-col gap-6 lg:gap-8">
          <div className="flex flex-col gap-3 lg:gap-4">
            <EtiquetaSeccion>Salida rápida</EtiquetaSeccion>
            <h2 className="m-0 font-serif text-h2-m font-normal text-bahia lg:text-h2">
              Qué hace y qué no hace
            </h2>
            <p className="m-0 text-base leading-7 text-bahia lg:text-lg lg:leading-8">
              El botón naranja del encabezado te ayuda a dejar esta página en
              un gesto, si alguien se acerca. También puedes pulsar Esc dos
              veces.
            </p>
          </div>

          <Aviso tono="aviso" titulo="Un límite importante">
            Salida rápida no borra el historial del navegador. Solo te lleva a
            una página neutra en esta misma pestaña, para que el botón Atrás
            no regrese aquí.
          </Aviso>

          <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
            <Tarjeta variante="blanca">
              <h3 className="m-0 font-serif text-h4 font-normal">Qué sí hace</h3>
              <p className="m-0 text-[15px] leading-6">
                Reemplaza esta pestaña por un sitio cotidiano (como el clima),
                sin confirmación ni despedida. El título de la pestaña cambia
                de inmediato.
              </p>
            </Tarjeta>
            <Tarjeta variante="niebla">
              <h3 className="m-0 font-serif text-h4 font-normal">Qué no hace</h3>
              <p className="m-0 text-[15px] leading-6">
                No limpia tu historial, ni las cookies, ni las pestañas
                abiertas. Si compartes el dispositivo, conviene borrar el
                historial a mano o usar una ventana privada.
              </p>
            </Tarjeta>
          </div>
        </div>
      </section>

      <section
        id="historial"
        className="bg-niebla/40 px-5 py-12 lg:px-14 lg:py-20"
      >
        <div className="mx-auto flex max-w-[800px] flex-col gap-6 lg:gap-8">
          <div className="flex flex-col gap-3 lg:gap-4">
            <EtiquetaSeccion>Historial</EtiquetaSeccion>
            <h2 className="m-0 font-serif text-h2-m font-normal text-bahia lg:text-h2">
              Cómo borrar el historial y navegar en privado
            </h2>
            <p className="m-0 text-base leading-7 text-bahia lg:text-lg lg:leading-8">
              Los menús cambian un poco según el navegador y la versión. Estos
              pasos son orientativos; si algo no coincide, busca «borrar
              historial» o «ventana privada» en la ayuda de tu navegador.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {guiasNavegador.map((guia) => (
              <PreguntaFrecuente
                key={guia.id}
                pregunta={guia.pregunta}
                respuesta={guia.respuesta}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="correo-whatsapp"
        className="px-5 py-12 lg:px-14 lg:py-20"
      >
        <div className="mx-auto flex max-w-[1240px] flex-col gap-6 lg:gap-10">
          <div className="mx-auto flex max-w-[800px] flex-col gap-3 lg:gap-4">
            <EtiquetaSeccion>Correo y WhatsApp</EtiquetaSeccion>
            <h2 className="m-0 font-serif text-h2-m font-normal text-bahia lg:text-h2">
              Cuidar tu correo y tu WhatsApp
            </h2>
            <p className="m-0 text-base leading-7 text-bahia lg:text-lg lg:leading-8">
              Si escribes o recibes mensajes sobre este acompañamiento, puedes
              reducir lo que queda a la vista en el teléfono o el computador.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
            {consejosMedio.map((consejo) => (
              <Tarjeta key={consejo.titulo} variante="blanca">
                <h3 className="m-0 font-serif text-h4 font-normal">
                  {consejo.titulo}
                </h3>
                <p className="m-0 text-[15px] leading-6">{consejo.texto}</p>
              </Tarjeta>
            ))}
          </div>
        </div>
      </section>

      <section
        id="emergencia"
        className="sobre-oscuro bg-bahia px-5 py-14 text-crema lg:px-14 lg:py-20"
      >
        <div className="mx-auto flex max-w-[760px] flex-col gap-4 text-left lg:gap-5 lg:text-center">
          <EtiquetaSeccion className="text-crema">
            Si estás en peligro inmediato
          </EtiquetaSeccion>
          <h2 className="m-0 font-serif text-h2-m font-normal text-crema lg:text-h2">
            Llama a {sitio.lineaEmergencia}
          </h2>
          <p className="m-0 text-base leading-7 text-crema lg:text-lg lg:leading-8">
            Si tu vida o tu integridad corren peligro ahora mismo, pide ayuda
            a los servicios de emergencia de tu localidad. Este sitio no
            sustituye esa respuesta.
          </p>
        </div>
      </section>

      <LlamadoFinal
        titulo="Si quieres, estamos aquí"
        texto="Cuando te sientas lista, puedes escribirnos. Respondemos con calma y sin compromiso."
        acciones={
          <Boton
            sobreOscuro
            href="/contacto"
            className="w-full justify-center lg:w-auto"
          >
            Si quieres, escribe
          </Boton>
        }
      />
    </>
  );
}
