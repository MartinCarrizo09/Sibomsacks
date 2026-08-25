import { Boton, Contenedor, Seccion } from "../components/ui/Ui.jsx";
import { WHATSAPP_URL } from "../lib/contacto.js";
import "./beneficios.css";

/** Por qué conviene pasar a Big Bag, antes de elegir cuál. */
const RAZONES = [
  ["Menos manipulación", "Una sola maniobra mueve lo que antes eran decenas de bolsas. Menos tiempos muertos y menos gente expuesta."],
  ["Mejor uso del espacio", "Se aprovecha mejor el volumen del camión y del depósito."],
  ["Menos pérdidas", "Cierres confiables y material resistente reducen roturas, derrames y mermas en el traslado."],
  ["Trazabilidad por bulto", "Cada bolsón se identifica y se sigue por lote, sin planillas paralelas."],
  ["Se adapta al proceso", "Distintas bocas y fondos según cómo cargás y cómo dosificás en planta."],
  ["Escala con la demanda", "Sumar volumen no obliga a rediseñar la logística: se suman bolsones."],
];

/** Impacto operativo. Cifras declaradas por la empresa. */
const METRICAS = [
  ["↑ 30%", "Aprovechamiento de espacio"],
  ["− 25%", "Tiempos de carga y descarga"],
  ["≤ 1%", "Tasa de roturas en operación"],
];

const SECTORES = [
  {
    nombre: "Agricultura",
    img: "/images/agricultura.webp",
    w: 800,
    h: 600,
    puntos: [
      "Protección de la carga frente al clima",
      "Menos mermas durante cosecha y traslado",
      "Cargas y descargas más ágiles en campaña",
      "Identificación clara de lotes",
      "Menos mano de obra por tonelada movida",
    ],
  },
  {
    nombre: "Industria",
    img: "/images/industry.webp",
    w: 996,
    h: 612,
    puntos: [
      "Dosificación precisa en procesos",
      "Menos polvo ambiental en la línea",
      "Mejor aprovechamiento del espacio",
      "Integración simple con la operación",
      "Buenas prácticas de higiene y orden",
    ],
  },
  {
    nombre: "Minería",
    img: "/images/mineria.webp",
    w: 700,
    h: 434,
    puntos: [
      "Soporta materiales de alta exigencia",
      "Maniobras de izaje seguras",
      "Minimiza pérdidas por roturas o derrames",
      "Costura reforzada y tejido de alto gramaje",
      "Menos bultos por tonelada movida",
    ],
  },
];

export default function Beneficios() {
  return (
    <>
      {/* ---------- Encabezado ---------- */}
      <section className="ben-hero">
        <Contenedor>
          <p className="etiqueta">Beneficios</p>
          <h1>Mover a granel sin pelearse con la logística</h1>
          <p className="ben-hero__bajada">
            El Big Bag no es solo un envase más grande: cambia cómo se carga, se
            almacena y se despacha. Esto es lo que gana una operación al pasarse.
          </p>
          <div className="ben-hero__acciones">
            <Boton to="/productos" variante="secundario" tamano="lg">
              Ver los 6 modelos
            </Boton>
            <Boton href={WHATSAPP_URL} variante="contorno" tamano="lg">
              Consultar por WhatsApp
            </Boton>
          </div>
        </Contenedor>
      </section>

      {/* ---------- Razones ---------- */}
      <Seccion
        id="razones"
        eyebrow="Por qué conviene"
        titulo="Seis cosas que cambian el primer día"
      >
        <ul className="razones">
          {RAZONES.map(([titulo, texto], i) => (
            <li key={titulo}>
              <span className="razones__n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{titulo}</h3>
              <p>{texto}</p>
            </li>
          ))}
        </ul>
      </Seccion>

      {/* ---------- Métricas ---------- */}
      <Seccion tono="azul" id="impacto">
        <div className="impacto">
          <div className="impacto__tx">
            <p className="etiqueta">Impacto operativo</p>
            <h2>Lo que se nota en la planilla</h2>
            <p className="impacto__nota">
              Valores de referencia relevados en operaciones de nuestros clientes.
              Varían según material, volumen y equipamiento.
            </p>
          </div>
          <ul className="impacto__cifras">
            {METRICAS.map(([valor, texto]) => (
              <li key={texto}>
                <b className="cifra">{valor}</b>
                <span>{texto}</span>
              </li>
            ))}
          </ul>
        </div>
      </Seccion>

      {/* ---------- Por sector ---------- */}
      <Seccion
        tono="alt"
        id="sectores"
        eyebrow="Por industria"
        titulo="Qué gana cada operación"
        bajada="El beneficio no es el mismo en un acopio de granos que en una planta química o en una mina."
      >
        <div className="sectores-ben">
          {SECTORES.map((s) => (
            <article className="sec-ben" key={s.nombre}>
              <img src={s.img} alt="" width={s.w} height={s.h} loading="lazy" />
              <div className="sec-ben__cuerpo">
                <h3>{s.nombre}</h3>
                <ul>
                  {s.puntos.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Seccion>

      {/* ---------- Cierre ---------- */}
      <Seccion id="cotizar">
        <div className="ben-cierre">
          <div>
            <h2>¿Cuál te sirve a vos?</h2>
            <p>
              Contanos qué material movés y en qué volumen. Te decimos qué modelo
              conviene y con qué medidas.
            </p>
          </div>
          <div className="ben-cierre__acciones">
            <Boton to="/productos" variante="primario" tamano="lg">
              Encontrar mi modelo
            </Boton>
            <Boton to="/contacto" variante="contorno" tamano="lg">
              Pedir cotización
            </Boton>
          </div>
        </div>
      </Seccion>
    </>
  );
}
