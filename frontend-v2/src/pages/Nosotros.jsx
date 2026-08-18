import { Boton, Contenedor, Seccion } from "../components/ui/Ui.jsx";
import { WHATSAPP_URL, HORARIO } from "../lib/contacto.js";
import "./nosotros.css";

/** Cifras de la empresa. */
const CIFRAS = [
  ["2015", "Año de fundación"],
  ["65", "Clientes activos"],
  ["30+", "Personas en el equipo"],
  ["100%", "Producción propia"],
];

/**
 * Diferenciales. Cada uno afirma algo verificable sobre cómo se trabaja,
 * no adjetivos genéricos: es lo que un comprador industrial evalúa.
 */
const PILARES = [
  {
    titulo: "Planta propia en Córdoba",
    texto:
      "No tercerizamos la fabricación. Tejido, corte, costura y control salen de la misma planta, así que los plazos y la calidad no dependen de un tercero.",
  },
  {
    titulo: "Cada lote se ensaya",
    texto:
      "Antes de despachar, el lote pasa por ensayo bajo norma EFIBCA 006. El equipo de medición está calibrado por INTI según ISO 7500-1.",
  },
  {
    titulo: "Se fabrica a tu medida",
    texto:
      "Los seis modelos de serie son el punto de partida. Ajustamos dimensiones, gramaje, forro y color según tu material y tu pallet.",
  },
  {
    titulo: "Hablás con quien produce",
    texto:
      "No hay call center en el medio. Consultás y te responde alguien que conoce la planta y puede decirte plazos reales.",
  },
];

const CERTS = [
  ["EFIBCA 006", "Ensayo de rendimiento para contenedores flexibles, validado con laboratorios de Alemania y Escocia."],
  ["INTI · ISO 7500-1", "Certificado de calibración con anexo A, emitido por el Instituto Nacional de Tecnología Industrial."],
  ["I.N.A.L. 870/08", "Habilitación para el transporte de productos alimenticios."],
];

const CLIENTES = [
  { src: "/images/egran.webp", alt: "Egran", w: 153, h: 98 },
  { src: "/images/caima.webp", alt: "Caima", w: 155, h: 77 },
  { src: "/images/plasticosbv.webp", alt: "Plásticos BV", w: 162, h: 163 },
  { src: "/images/pirquitas.webp", alt: "Pirquitas", w: 200, h: 200 },
  { src: "/images/biofarma.webp", alt: "Biofarma", w: 83, h: 88 },
  { src: "/images/donadelmo.webp", alt: "Don Adelmo", w: 127, h: 104 },
  { src: "/images/tapi.webp", alt: "Tapi", w: 139, h: 80 },
  { src: "/images/cerrito.webp", alt: "Cerrito", w: 171, h: 147 },
];

export default function Nosotros() {
  return (
    <>
      {/* ---------- Encabezado ---------- */}
      <section className="nos-hero">
        <Contenedor className="nos-hero__grid">
          <div>
            <p className="etiqueta">Nosotros · Desde 2015</p>
            <h1>Fabricamos los bolsones que después tenemos que respaldar</h1>
            <p className="nos-hero__bajada">
              Sibom Sacks es una fábrica de Big Bags de rafia de polipropileno en
              Córdoba. Producimos en planta propia, ensayamos cada lote y
              atendemos directo, sin intermediarios.
            </p>
            <div className="nos-hero__acciones">
              <Boton to="/productos" variante="secundario" tamano="lg">
                Ver los modelos
              </Boton>
              <Boton href={WHATSAPP_URL} variante="contorno" tamano="lg">
                Hablar con nosotros
              </Boton>
            </div>
          </div>

          <figure className="nos-hero__figura">
            <img
              src="/images/slide1MaquinadeCoser.webp"
              alt="Costura industrial de Big Bags en la planta de Sibom Sacks"
              width={490}
              height={339}
              fetchPriority="high"
            />
            <figcaption>Línea de costura · planta Córdoba</figcaption>
          </figure>
        </Contenedor>
      </section>

      {/* ---------- Cifras ---------- */}
      <section className="nos-cifras">
        <Contenedor>
          <ul>
            {CIFRAS.map(([valor, texto]) => (
              <li key={texto}>
                <b className="cifra">{valor}</b>
                <span>{texto}</span>
              </li>
            ))}
          </ul>
        </Contenedor>
      </section>

      {/* ---------- Pilares ---------- */}
      <Seccion
        id="como"
        eyebrow="Cómo trabajamos"
        titulo="Cuatro cosas que podés verificar"
        bajada="No son valores de marca: son decisiones sobre cómo producimos, y cada una tiene una consecuencia concreta para tu operación."
      >
        <ul className="pilares">
          {PILARES.map((p, i) => (
            <li key={p.titulo}>
              <span className="pilares__n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </li>
          ))}
        </ul>
      </Seccion>

      {/* ---------- Certificaciones ---------- */}
      <Seccion
        tono="alt"
        id="certificaciones"
        eyebrow="Respaldo"
        titulo="Ensayado, no prometido"
      >
        <ul className="nos-certs">
          {CERTS.map(([sigla, texto]) => (
            <li key={sigla}>
              <h3>{sigla}</h3>
              <p>{texto}</p>
            </li>
          ))}
        </ul>
      </Seccion>

      {/* ---------- Clientes ---------- */}
      <Seccion id="clientes" eyebrow="Nos eligen" titulo="Empresas que trabajan con nosotros">
        <ul className="nos-clientes">
          {CLIENTES.map((c) => (
            <li key={c.alt}>
              <img src={c.src} alt={c.alt} width={c.w} height={c.h} loading="lazy" />
            </li>
          ))}
        </ul>
      </Seccion>

      {/* ---------- Cierre ---------- */}
      <Seccion tono="azul" id="visitanos">
        <div className="nos-cierre">
          <div>
            <h2>¿Querés conocer la planta?</h2>
            <p>
              Recibimos visitas de clientes que quieren ver cómo se fabrica lo que
              compran. Coordinamos día y horario. {HORARIO}
            </p>
          </div>
          <div className="nos-cierre__acciones">
            <Boton to="/contacto" variante="primario" tamano="lg">
              Coordinar una visita
            </Boton>
            <Boton href={WHATSAPP_URL} variante="fantasma" tamano="lg">
              WhatsApp
            </Boton>
          </div>
        </div>
      </Seccion>
    </>
  );
}
