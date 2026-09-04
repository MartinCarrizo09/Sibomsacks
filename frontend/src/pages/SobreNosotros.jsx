import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMotionSafe } from "../hooks/useMotionSafe.js";
import "./SobreNosotros.css";
import Seo from "../components/Seo.jsx";

/**
 * Sobre Nosotros — "la planta como protagonista".
 *
 * El argumento de la página es que fabricamos acá: producción propia, no
 * intermediación. Misma dirección visual que la home (Anton + Barlow sobre
 * navy, amarillo como único acento).
 */

const ico = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

/**
 * Indicadores del hero. Solo cifras verificables: los modelos son los que
 * devuelve la API de productos, sin afirmar certificaciones que no estan
 * la home. El año de fundación no se repite acá: ya es el remate del título.
 * [PENDIENTE] Confirmar producción anual y superficie de planta para sumar
 * un cuarto indicador.
 */
const DATOS = [
  {
    valor: "6",
    detalle: "Modelos de serie",
    // Bolsón sobre pallet: el mismo ícono que la home usa para el catálogo.
    icono: (
      <svg {...ico} strokeWidth={1.4}>
        <path d="M5.7 6.4 C5.2 10.6 5.05 15.2 5.25 19.1 L18.75 19.1 C18.95 15.2 18.8 10.6 18.3 6.4 C14.15 5.4 9.85 5.4 5.7 6.4 Z M7.5 6.15 L7.5 3.5 C7.5 2.6 8.22 1.9 9.1 1.9 C9.98 1.9 10.7 2.6 10.7 3.5 L10.7 5.75 M13.3 5.75 L13.3 3.5 C13.3 2.6 14.02 1.9 14.9 1.9 C15.78 1.9 16.5 2.6 16.5 3.5 L16.5 6.15 M11.35 5.6 L11.35 4.3 C11.35 3.6 11.9 3.05 12.6 3.05 C13.3 3.05 13.85 3.6 13.85 4.3 L13.85 5.6 M3.3 19.1 L20.7 19.1 L20.7 21.9 L3.3 21.9 Z M8.1 19.1 L8.1 21.9 M15.9 19.1 L15.9 21.9" />
      </svg>
    ),
  },
  {
    valor: "Propia",
    detalle: "Producción integrada",
    // Nave industrial: la planta como diferencial.
    icono: (
      <svg {...ico} strokeWidth={1.4}>
        <path d="M3 21V9l5-3.5V9l5-3.5V9l5-3.5V21" />
        <path d="M2 21h20M7 15v3M12 15v3M17 15v3" />
      </svg>
    ),
  },
  {
    valor: "Control",
    detalle: "Ensayo por partida",
    // Escudo con tilde: los ensayos que respaldan cada partida.
    icono: (
      <svg {...ico}>
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

/**
 * Etapas del proceso, en el orden en que ocurren en planta.
 * Arranca en el corte: la tela ya llega tejida.
 * [PENDIENTE] Confirmar con planta que estas cuatro son las etapas reales
 * y que la redacción de cada una es correcta.
 */
const ETAPAS = [
  {
    n: "01",
    titulo: "Corte",
    texto:
      "Se corta a la medida del pallet y del volumen real de carga, no a una medida de catálogo.",
  },
  {
    n: "02",
    titulo: "Confección",
    texto:
      "Costura de asas y bocas: es donde se gana o se pierde el factor de seguridad.",
  },
  {
    n: "03",
    titulo: "Control",
    texto:
      "Ensayo de carga por lote y revisión pieza por pieza antes de embalar.",
  },
  {
    n: "04",
    titulo: "Despacho",
    texto: "Prensado, identificado por partida y cargado con su documentación.",
  },
];

const SobreNosotros = () => {
  const { reducir, cardVariant, staggerContainer } = useMotionSafe();

  // Igual que en la home: se revela una sola vez, cuando entra un 20% del
  // bloque; nada que reaparezca al subir y bajar.
  const enVista = { once: true, amount: 0.2, margin: "0px 0px -80px 0px" };

  /**
   * La linga se tiende de izquierda a derecha: un recorte que se abre sobre
   * el propio elemento. Al trabajar en porcentajes no depende del ancho de
   * la pantalla ni del largo del trazo, que es lo que rompía el enfoque
   * anterior con `pathLength`.
   */
  const tender = reducir
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { clipPath: "inset(0 100% 0 0)" },
        show: {
          clipPath: "inset(0 0% 0 0)",
          transition: { duration: 1.2, ease: "easeOut" },
        },
      };

  /** Las etapas aparecen una tras otra, siguiendo el avance de la costura. */
  const etapasCont = reducir
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          // Arranca cuando la costura ya entró en cuadro y acompaña su ritmo.
          transition: { staggerChildren: 0.28, delayChildren: 0.32 },
        },
      };

  /** Cada ficha entra desde la izquierda, en la dirección de la costura. */
  const etapaItem = reducir
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: -24 },
        show: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (


    <>

      <Seo

        titulo="Fábrica de Big Bags en Córdoba desde 2007 | Sibom Sacks"

        descripcion="Lindor Sacks S.R.L. fabrica contenedores flexibles en Córdoba desde 2007. Planta propia, producción a medida y asesoramiento técnico para cada operación."

        ruta="/sobre-nosotros"

      />
    <div className="sn">
      {/* ================= HERO ================= */}
      <section className="sn-hero">
        <div className="sn-hero__bg" />
        <div className="sn-hero__velo" />

        <div className="sn-hero__in">
          <p className="sn-eyebrow">
            <span className="sn-eyebrow__linea" aria-hidden="true" />
            Quiénes somos
          </p>

          <h1 className="sn-titulo">
            <span className="sn-titulo__ln">Fabricamos en</span>
            <span className="sn-titulo__ln">Argentina desde</span>
            <span className="sn-titulo__ln sn-titulo__calado">2007</span>
          </h1>

          <p className="sn-hero__texto">
            Producimos Big Bags con planta propia: cada bolsón se diseña sobre
            el proceso real del cliente, se teje, se cose y se controla bajo el
            mismo techo.
          </p>

          <div className="sn-hero__acciones">
            <Link to="/contacto" className="sn-btn sn-btn--primario">
              Armá tu pedido
            </Link>
            <Link to="/productos" className="sn-btn sn-btn--texto">
              Ver los modelos <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <motion.ul
          className="sn-tira"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {DATOS.map((d) => (
            <motion.li key={d.detalle} variants={cardVariant}>
              <span className="sn-tira__ico">{d.icono}</span>
              <span className="sn-tira__txt">
                <b>{d.valor}</b>
                <span>{d.detalle}</span>
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* ================= PROCESO ================= */}
      <section className="sn-proceso" aria-labelledby="sn-proceso-tit">
        <motion.header
          className="sn-proceso__cab"
          variants={cardVariant}
          initial="hidden"
          whileInView="show"
          viewport={enVista}
        >
          <h2 id="sn-proceso-tit" className="sn-proceso__tit">
            De la tela al pallet
          </h2>
          <p className="sn-proceso__bajada">
            Cuatro etapas bajo el mismo techo. Este es el recorrido que hace
            cada bolsón antes de salir de la planta.
          </p>
        </motion.header>

        <div className="sn-proceso__hilo">
          {/* La cinta se descubre de izquierda a derecha con un recorte que
              avanza. Al ser un porcentaje sobre el propio elemento, funciona
              igual en cualquier ancho de pantalla.
              Lleva viewport propio: el `enVista` del resto recorta 80px por
              abajo y pide un 20% visible, condiciones que esta franja —de
              80px de alto— no alcanza a cumplir, y no se disparaba. */}
          <motion.div
            className="sn-linga"
            aria-hidden="true"
            variants={tender}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
          />

          <motion.ol
            className="sn-proceso__grilla"
            variants={etapasCont}
            initial="hidden"
            whileInView="show"
            viewport={enVista}
          >
            {ETAPAS.map((e) => (
              <motion.li key={e.n} className="sn-etapa" variants={etapaItem}>
                <div className="sn-etapa__cab">
                  <span className="sn-etapa__num" aria-hidden="true">
                    {e.n}
                  </span>
                  <span className="sn-etapa__linea" aria-hidden="true" />
                </div>
                <h3 className="sn-etapa__tit">{e.titulo}</h3>
                <p className="sn-etapa__txt">{e.texto}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* ================= CIERRE ================= */}
      <section className="sn-cierre">
        <h2 className="sn-cierre__tit">
          Contanos cómo cargás
          <br />y te decimos qué bolsón necesitás
        </h2>
        <Link to="/contacto" className="sn-btn sn-btn--primario">
          Armá tu pedido
        </Link>
      </section>
    </div>

    </>
  );
};

export default SobreNosotros;
