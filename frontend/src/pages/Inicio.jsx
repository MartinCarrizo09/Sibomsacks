import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMotionSafe } from "../hooks/useMotionSafe.js";
import "./Inicio.css";

/**
 * Datos de la tira bajo el hero.
 * Solo cifras verificables contra el catálogo y las certificaciones reales.
 */
const DATOS = [
  { valor: "6", detalle: "Modelos de serie" },
  { valor: "3", detalle: "Certificaciones" },
  { valor: "UV", detalle: "Tratamiento en la rafia" },
  { valor: "100%", detalle: "Producción argentina" },
];

const SECTORES = [
  {
    n: "01",
    titulo: "Agricultura",
    texto:
      "Granos, semillas y fertilizantes. Barrera contra humedad y protección UV para acopio prolongado a la intemperie.",
    img: "/images/agricultura.webp",
    w: 800,
    h: 600,
    alt: "Big Bag izado con grúa sobre un cultivo",
    icono: (
      <svg width="28" height="28" viewBox="0 0 26 26" fill="none" stroke="#ffcc00" strokeWidth="1.6" aria-hidden="true">
        <path d="M13 23v-11" />
        <path d="M13 15c0-3 2.6-5 5.5-5C18.5 13 15.9 15 13 15z" fill="#ffcc00" stroke="none" />
        <path d="M13 15c0-3-2.6-5-5.5-5C7.5 13 10.1 15 13 15z" />
      </svg>
    ),
  },
  {
    n: "02",
    titulo: "Industria",
    texto:
      "Reutilizables para materiales a granel. Reducen el costo de embalaje por tonelada frente al saco tradicional.",
    img: "/images/industry.webp",
    w: 996,
    h: 612,
    alt: "Depósito con Big Bags almacenados en estantería industrial",
    icono: (
      <svg width="28" height="28" viewBox="0 0 26 26" fill="none" stroke="#ffcc00" strokeWidth="1.6" aria-hidden="true">
        <rect x="3" y="12" width="6" height="11" />
        <rect x="10" y="6" width="6" height="17" fill="#ffcc00" stroke="none" />
        <rect x="17" y="15" width="5" height="8" />
      </svg>
    ),
  },
  {
    n: "03",
    titulo: "Minería",
    texto:
      "Cargas pesadas y abrasivas. Costura reforzada y tejido de alto gramaje para operación en entornos extremos.",
    img: "/images/mineria.webp",
    w: 700,
    h: 434,
    alt: "Big Bags en acopio a la intemperie junto a una pila de material",
    icono: (
      <svg width="28" height="28" viewBox="0 0 26 26" fill="none" stroke="#ffcc00" strokeWidth="1.6" aria-hidden="true">
        <path d="M2 22l7-13 4 6 3-4 8 11z" />
        <path d="M9 9l4 6" stroke="#ffcc00" strokeWidth="2.8" />
      </svg>
    ),
  },
];

const CERTIFICADOS = [
  {
    titulo: "EFIBCA 006",
    texto: "Rendimiento validado junto a laboratorios de Alemania y Escocia.",
    icono: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#ffcc00" strokeWidth="1.4" aria-hidden="true">
        <circle cx="15" cy="12" r="8" />
        <path d="M10 19l-2 9 7-3.4 7 3.4-2-9" />
        <path d="M11 12l3 3 5-5.5" stroke="#fff" strokeWidth="2" />
      </svg>
    ),
  },
  {
    titulo: "INTI · ISO 7500-1",
    texto: "Certificado de calibración con anexo A validado.",
    icono: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#ffcc00" strokeWidth="1.4" aria-hidden="true">
        <rect x="3" y="6" width="24" height="18" />
        <path d="M9 19l5-6 3.5 3.5L22 10" stroke="#fff" strokeWidth="2" />
      </svg>
    ),
  },
  {
    titulo: "I.N.A.L. 870/08",
    texto: "Apto para el transporte de productos alimenticios.",
    icono: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#ffcc00" strokeWidth="1.4" aria-hidden="true">
        <path d="M15 2l11 5v9c0 7-5.5 10.5-11 12-5.5-1.5-11-5-11-12V7z" />
        <path d="M10 15l3.5 3.5L21 10" stroke="#fff" strokeWidth="2" />
      </svg>
    ),
  },
];

const CLIENTES = [
  { src: "/images/egran.webp", w: 153, h: 98, alt: "Egran" },
  { src: "/images/caima.webp", w: 155, h: 77, alt: "Caima" },
  { src: "/images/plasticosbv.webp", w: 162, h: 163, alt: "Plásticos BV" },
  { src: "/images/pirquitas.webp", w: 200, h: 200, alt: "Pirquitas" },
  { src: "/images/biofarma.webp", w: 83, h: 88, alt: "Biofarma" },
  { src: "/images/donadelmo.webp", w: 127, h: 104, alt: "Don Adelmo" },
  { src: "/images/tapi.webp", w: 139, h: 80, alt: "Tapi" },
  { src: "/images/cerrito.webp", w: 171, h: 147, alt: "Cerrito" },
];

function Inicio() {
  const { reducir, cardVariant, staggerContainer } = useMotionSafe();

  // Se anima al montar la página, no al entrar en el viewport: el contenido
  // de estas secciones es información del negocio, no un adorno, así que
  // nunca debe depender de un scroll para volverse visible.
  const subir = reducir
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 34 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
      };

  return (
    <div className="home">
      {/* ================= HERO ================= */}
      <section className="hm-hero">
        <div className="hm-hero__bg" />
        <div className="hm-hero__velo" />
        <div className="hm-hero__trama" />

        <div className="hm-hero__in">
          <p className="hm-eyebrow">
            <span className="hm-eyebrow__linea" aria-hidden="true" />
            Contenedores flexibles · Desde Córdoba al país
          </p>

          <h1 className="hm-titulo">
            <span className="hm-titulo__ln">
              <span>Sostenemos</span>
            </span>
            <span className="hm-titulo__ln">
              <span className="hm-titulo__calado">Toneladas</span>
            </span>
          </h1>

          <p className="hm-hero__texto">
            Big Bags de rafia de polipropileno con tratamiento UV, ensayados bajo
            norma EFIBCA 006 antes de salir de planta.
          </p>

          <div className="hm-hero__acciones">
            <Link to="/contacto" className="hm-btn hm-btn--primario">
              Solicitar cotización
            </Link>
            <Link to="/productos" className="hm-btn hm-btn--texto">
              Ver los 6 modelos <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <p className="hm-scroll" aria-hidden="true">
          Seguí bajando
          <svg width="14" height="30" viewBox="0 0 14 30" fill="none" stroke="currentColor">
            <path d="M7 0v26M2 21l5 5 5-5" />
          </svg>
        </p>
      </section>

      {/* ================= TIRA DE DATOS ================= */}
      <motion.ul
        className="hm-tira"
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

      {/* ================= SECTORES ================= */}
      <section className="hm-sectores" aria-labelledby="hm-sectores-tit">
        <h2 id="hm-sectores-tit" className="sr-only">
          Industrias donde se usan nuestros Big Bags
        </h2>

        {SECTORES.map((s) => (
          <motion.article
            key={s.n}
            className="hm-fila"
            variants={subir}
            initial="hidden"
            animate="show"
          >
            <span className="hm-fila__num" aria-hidden="true">
              {s.n}
            </span>

            <div className="hm-fila__texto">
              <h3>
                {s.icono}
                {s.titulo}
              </h3>
              <p>{s.texto}</p>
              <Link to="/beneficios" className="hm-fila__link">
                Ver beneficios <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="hm-fila__img">
              <img src={s.img} alt={s.alt} width={s.w} height={s.h} loading="lazy" />
            </div>
          </motion.article>
        ))}
      </section>

      {/* ================= CERTIFICACIONES ================= */}
      <motion.section
        className="hm-cert"
        aria-labelledby="hm-cert-tit"
        variants={subir}
        initial="hidden"
        animate="show"
      >
        <h2 id="hm-cert-tit" className="hm-cert__tit">
          Ensayado,<br />no prometido
        </h2>
        <ul className="hm-cert__lista">
          {CERTIFICADOS.map((c) => (
            <li key={c.titulo}>
              {c.icono}
              <div>
                <h3>{c.titulo}</h3>
                <p>{c.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ================= CLIENTES ================= */}
      <section className="hm-clientes" aria-labelledby="hm-clientes-tit">
        <h2 id="hm-clientes-tit" className="hm-clientes__lb">
          Nos eligen
        </h2>
        <motion.ul
          className="hm-clientes__grid"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {CLIENTES.map((c) => (
            <motion.li
              key={c.alt}
              className="hm-cliente"
              variants={cardVariant}
              whileHover={reducir ? undefined : { y: -4 }}
            >
              <img src={c.src} alt={`Cliente ${c.alt}`} width={c.w} height={c.h} loading="lazy" />
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </div>
  );
}

export default Inicio;
