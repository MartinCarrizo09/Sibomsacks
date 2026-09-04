import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMotionSafe } from "../hooks/useMotionSafe.js";
import "./Beneficios.css";
import Seo from "../components/Seo.jsx";

/**
 * Beneficios — eficiencia por tonelada y beneficios por industria.
 *
 * La página abre con el recorrido que hace cada partida en planta y sigue
 * con los beneficios por sector. Misma dirección visual que el resto del
 * sitio: Anton + Barlow sobre navy, amarillo como único acento.
 *
 * Sobre los datos: sólo se afirma lo verificable.
 *   · 1000 kg / 25 kg = 40 bolsas: es aritmética.
 *   · Los datos de produccion, sin afirmar certificaciones
 *     son las que ya exhibe la home.
 * El eje de reciclado quedó fuera a propósito: la empresa todavía no tiene
 * armado el circuito, así que la página no lo promete. Cuando exista, la
 * rueda puede volver a cerrarse con esa etapa.
 */

const ico = {
  viewBox: "0 0 26 26",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

/** Cifras del hero. Todas comprobables. */
const DATOS = [
  { valor: "1000 kg", detalle: "En un solo bulto" },
  { valor: "40", detalle: "Bolsas de 25 kg que reemplaza" },
  { valor: "A medida", detalle: "Según tu operación" },
];

/** Beneficios por sector, tal como los definió el cliente. */
const SECTORES = [
  {
    titulo: "Agricultura",
    icono: (
      <svg {...ico} width="26" height="26">
        <path d="M13 23v-11" />
        <path d="M13 15c0-3 2.6-5 5.5-5C18.5 13 15.9 15 13 15z" fill="currentColor" stroke="none" />
        <path d="M13 15c0-3-2.6-5-5.5-5C7.5 13 10.1 15 13 15z" />
      </svg>
    ),
    items: [
      "Protección de la carga frente al clima",
      "Menos mermas durante cosecha y traslado",
      "Identificación clara de lotes",
      "Menos mano de obra por tonelada movida",
    ],
  },
  {
    titulo: "Industria",
    icono: (
      <svg {...ico} width="26" height="26">
        <rect x="3" y="12" width="6" height="11" />
        <rect x="10" y="6" width="6" height="17" fill="currentColor" stroke="none" />
        <rect x="17" y="15" width="5" height="8" />
      </svg>
    ),
    items: [
      "Menos polvo ambiental en la línea",
      "Dosificación precisa en procesos",
      "Mejor aprovechamiento del espacio",
      "Trazabilidad práctica por etiqueta",
    ],
  },
  {
    titulo: "Minería",
    icono: (
      <svg {...ico} width="26" height="26">
        <path d="M2 22l7-13 4 6 3-4 8 11z" />
        <path d="M9 9l4 6" strokeWidth="2.6" />
      </svg>
    ),
    items: [
      "Soporta materiales de alta exigencia",
      "Minimiza pérdidas por roturas o derrames",
      "Maniobras de izaje seguras",
      "Menos bultos por tonelada movida",
    ],
  },
];

/** Etapas de la rueda, en el orden del ciclo. */
const CICLO = [
  { t: "Fabricación", x: 190, y: 66, lx: 190, ly: 24 },
  { t: "Control", x: 314, y: 190, lx: 314, ly: 236 },
  { t: "Despacho", x: 190, y: 314, lx: 190, ly: 360 },
  { t: "Trazabilidad", x: 66, y: 190, lx: 66, ly: 236 },
];

const Beneficios = () => {
  const { reducir, cardVariant, staggerContainer } = useMotionSafe();

  const enVista = { once: true, amount: 0.2, margin: "0px 0px -80px 0px" };

  /** La rueda se dibuja girando: cada arco aparece tras el anterior. */
  const girar = reducir
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, rotate: -12, scale: 0.94 },
        show: {
          opacity: 1,
          rotate: 0,
          scale: 1,
          transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (


    <>

      <Seo

        titulo="Ventajas de los Big Bags de polipropileno | Sibom Sacks"

        descripcion="Resistencia, tratamiento UV, apto alimenticio y trazabilidad. Por qué conviene un Big Bag fabricado a medida frente a uno estándar para tu carga."

        ruta="/beneficios"

      />
    <div className="bf">
      {/* ================= HERO + RUEDA ================= */}
      <section className="bf-hero">
        <div className="bf-hero__txt">
          <p className="bf-eyebrow">
            <span className="bf-eyebrow__linea" aria-hidden="true" />
            Beneficios
          </p>

          <h1 className="bf-titulo">
            <span className="bf-titulo__ln">Menos envase</span>
            <span className="bf-titulo__ln">
              por cada <span className="bf-titulo__calado">tonelada</span>
            </span>
          </h1>

          <p className="bf-hero__texto">
            Un bolsón de 1000 kg mueve lo que 40 bolsas de 25 kg: menos bultos,
            menos manipuleo y menos envase por cada tonelada. Y cada partida
            sale identificada, con su ensayo hecho.
          </p>

          <motion.ul
            className="bf-datos"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {DATOS.map((d) => (
              <motion.li key={d.detalle} variants={cardVariant}>
                <b>{d.valor}</b>
                <span>{d.detalle}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Rueda del ciclo de vida */}
        <motion.div
          className="bf-rueda"
          variants={girar}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <svg
            viewBox="0 0 380 380"
            role="img"
            aria-label="Recorrido de cada partida: fabricación, control, despacho y trazabilidad"
          >
            <defs>
              <marker
                id="bf-flecha"
                markerWidth="9"
                markerHeight="9"
                refX="4.5"
                refY="3"
                orient="auto"
              >
                <path d="M0 0 L6 3 L0 6 z" fill="#ffcc00" />
              </marker>
            </defs>

            {/* Anillo de fondo */}
            <circle
              cx="190"
              cy="190"
              r="124"
              fill="none"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="30"
            />

            {/* Un arco por etapa, con la flecha marcando el sentido */}
            <path d="M190 66 A124 124 0 0 1 314 190" className="bf-arco" />
            <path d="M314 190 A124 124 0 0 1 190 314" className="bf-arco" />
            <path d="M190 314 A124 124 0 0 1 66 190" className="bf-arco" />
            <path d="M66 190 A124 124 0 0 1 190 66" className="bf-arco" />

            {/* Nodos */}
            <circle cx="190" cy="66" r="27" className="bf-nodo" />
            {/* Techo en dientes de sierra: la silueta de fábrica que mejor
                se sostiene a tamaño chico, y la chimenea afinada hacia
                arriba (convención de Tabler y Material). */}
            <g
              transform="translate(190,66) scale(0.92) translate(-12,-12)"
              className="bf-nodo__ico"
            >
              <path d="M3 21h18" />
              <path d="M5 21V9l5 4V9l5 4h4" />
              <path d="M19 21v-8l-1.4-9.6h-1.2L15 13" />
              <path d="M9 17h.01M14 17h.01" />
            </g>

            <circle cx="314" cy="190" r="27" className="bf-nodo" />
            {/* Escudo con tilde: el ensayo de carga que valida cada lote. */}
            <g
              transform="translate(314,190) scale(0.92) translate(-12,-12)"
              className="bf-nodo__ico"
            >
              <path d="M12 3l7 3.5v5c0 4.4-3 7.5-7 8.7-4-1.2-7-4.3-7-8.7v-5z" />
              <path d="M9.2 11.8l2 2 3.6-3.8" />
            </g>

            <circle cx="190" cy="314" r="27" className="bf-nodo" />
            {/* Camión de perfil: la partida sale de planta. */}
            <g
              transform="translate(190,314) scale(0.92) translate(-12,-12)"
              className="bf-nodo__ico"
            >
              <path d="M3 6h10v10H3z" />
              <path d="M13 9h4l3 3.2V16h-7z" />
              <circle cx="7" cy="18" r="1.9" />
              <circle cx="17" cy="18" r="1.9" />
            </g>

            <circle cx="66" cy="190" r="27" className="bf-nodo" />
            {/* Etiqueta colgante con código: así se identifica cada partida. */}
            <g
              transform="translate(66,190) scale(0.92) translate(-12,-12)"
              className="bf-nodo__ico"
            >
              <path d="M20.6 12.4l-8.2 8.2a2 2 0 0 1-2.8 0l-6.2-6.2a2 2 0 0 1-.6-1.4V4.8a1 1 0 0 1 1-1h8.2c.5 0 1 .2 1.4.6l7.2 7.2a1 1 0 0 1 0 1.8z" />
              <path d="M7.5 7.5h.01" />
              <path d="M10.5 14.5l4-4" />
            </g>

            {/* Rótulos */}
            {CICLO.map((c) => (
              <text key={c.t} x={c.lx} y={c.ly} className="bf-nodo__lb">
                {c.t.toUpperCase()}
              </text>
            ))}

            {/* Centro */}
            <text x="190" y="185" className="bf-rueda__tit">
              CADA LOTE
            </text>
            <text x="190" y="207" className="bf-rueda__sub">
              IDENTIFICADO
            </text>
          </svg>
        </motion.div>
      </section>

      {/* ================= SECTORES ================= */}
      <section className="bf-sectores" aria-labelledby="bf-sectores-tit">
        <motion.header
          className="bf-sectores__cab"
          variants={cardVariant}
          initial="hidden"
          whileInView="show"
          viewport={enVista}
        >
          <h2 id="bf-sectores-tit" className="bf-sectores__tit">
            Y en tu operación
          </h2>
          <p className="bf-sectores__bajada">
            Lo que sirve en el campo no es lo que necesita una mina. Estos son
            los beneficios concretos según lo que movés.
          </p>
        </motion.header>

        <motion.ul
          className="bf-sectores__grilla"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={enVista}
        >
          {SECTORES.map((s) => (
            <motion.li key={s.titulo} className="bf-sector" variants={cardVariant}>
              <span className="bf-sector__ico">{s.icono}</span>
              <h3 className="bf-sector__tit">{s.titulo}</h3>
              <ul className="bf-sector__l">
                {s.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* ================= CIERRE ================= */}
      <section className="bf-cierre">
        <h2 className="bf-cierre__tit">Hablemos de tu operación</h2>
        <Link to="/contacto" className="bf-btn">
          Armá tu pedido
        </Link>
      </section>
    </div>

    </>
  );
};

export default Beneficios;
