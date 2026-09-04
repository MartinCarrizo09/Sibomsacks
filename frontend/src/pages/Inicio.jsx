import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMotionSafe } from "../hooks/useMotionSafe.js";
import "./Inicio.css";
import Seo from "../components/Seo.jsx";

/**
 * Indicadores integrados al pie del hero.
 * Solo cifras verificables contra el catálogo.
 */
const ico = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round",
  strokeLinejoin: "round", "aria-hidden": true };

const DATOS = [
  {
    valor: "8",
    detalle: "Modelos disponibles",
    // Bolsón sobre pallet, dibujado a partir de la foto de producto del
    // cliente: cuerpo, asas de izaje y tarima.
    icono: (
      <svg {...ico} strokeWidth={1.4}>
        <path d="M5.7 6.4 C5.2 10.6 5.05 15.2 5.25 19.1 L18.75 19.1 C18.95 15.2 18.8 10.6 18.3 6.4 C14.15 5.4 9.85 5.4 5.7 6.4 Z M7.5 6.15 L7.5 3.5 C7.5 2.6 8.22 1.9 9.1 1.9 C9.98 1.9 10.7 2.6 10.7 3.5 L10.7 5.75 M13.3 5.75 L13.3 3.5 C13.3 2.6 14.02 1.9 14.9 1.9 C15.78 1.9 16.5 2.6 16.5 3.5 L16.5 6.15 M11.35 5.6 L11.35 4.3 C11.35 3.6 11.9 3.05 12.6 3.05 C13.3 3.05 13.85 3.6 13.85 4.3 L13.85 5.6 M3.3 19.1 L20.7 19.1 L20.7 21.9 L3.3 21.9 Z M8.1 19.1 L8.1 21.9 M15.9 19.1 L15.9 21.9" />
      </svg>
    ),
  },
  {
    valor: "2007",
    detalle: "Fabricando en Córdoba",
    // Roseta trazada del archivo del cliente: medalla, sello y las dos cintas.
    icono: (
      <svg {...ico} strokeWidth={1.3}>
        <path d="M 9.9 1.5 L 11.53 1.82 L 12.43 1.82 L 14.1 1.5 L 14.87 1.82 L 16.22 3.22 L 17.85 3.98 L 18.3 4.39 L 18.62 5.34 L 18.75 6.74 L 19.7 8.45 L 19.75 9.31 L 18.8 11.12 L 18.62 12.75 L 18.3 13.6 L 17.8 14.01 L 16.31 14.69 L 14.87 16.18 L 14.42 16.4 L 13.6 16.45 L 12.56 16.18 L 11.84 16.13 L 10.49 16.45 L 9.76 16.45 L 9.18 16.18 L 7.64 14.64 L 6.11 13.96 L 5.75 13.65 L 5.47 13.02 L 5.2 11.12 L 4.3 9.45 L 4.25 8.68 L 5.2 6.87 L 5.47 4.93 L 5.75 4.35 L 6.11 4.03 L 7.69 3.31 L 9.13 1.82 L 9.9 1.5 Z M 11.39 4.44 L 13.11 4.53 L 14.73 5.29 L 15.55 6.06 L 16.04 6.78 L 16.4 7.64 L 16.54 8.45 L 16.45 10.17 L 15.59 11.84 L 14.78 12.65 L 14.15 13.06 L 13.2 13.42 L 12.43 13.56 L 10.8 13.42 L 9.9 13.06 L 9.04 12.47 L 8 11.21 L 7.6 10.22 L 7.42 9.22 L 7.55 7.87 L 7.82 7.1 L 8.36 6.2 L 9.54 5.11 L 10.35 4.71 L 11.39 4.44 Z M 7.91 16.18 L 9.81 17.08 L 11.75 17.35 L 9.95 22.5 L 8.41 20.96 L 6.06 21.37 L 7.91 16.18 Z M 16.04 16.22 L 16.22 16.36 L 17.94 21.33 L 15.59 20.96 L 14.05 22.5 L 12.25 17.31 L 14.37 17.04 L 16.04 16.22 Z" />
      </svg>
    ),
  },
  {
    valor: "UV",
    detalle: "Tratamiento en la rafia",
    icono: (
      <svg {...ico}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2.4M12 19.6V22M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2 12h2.4M19.6 12H22M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
      </svg>
    ),
  },
  {
    valor: "100%",
    detalle: "Producción argentina",
    // Silueta real del pais, trazada del archivo del cliente
    // (continental + Tierra del Fuego).
    icono: (
      <svg {...ico} strokeWidth={1.2}>
        <path d="M 9.55 1.5 L 10.55 1.72 L 10.66 1.95 L 10.94 1.61 L 11.61 1.61 L 12.72 2.78 L 13.23 2.89 L 14.45 3.62 L 14.62 3.9 L 14.01 5.01 L 15.56 5.18 L 16.18 4.62 L 16.29 4.06 L 16.68 4.12 L 16.79 4.62 L 16.62 5.12 L 15.68 5.57 L 14.28 7.01 L 14.06 8.57 L 13.84 8.91 L 13.84 9.58 L 14.4 9.97 L 14.28 10.41 L 14.62 10.69 L 14.67 10.97 L 14.12 11.86 L 13 12.19 L 11.89 12.14 L 11.94 12.64 L 11.72 13.09 L 11.83 13.42 L 11.44 13.59 L 10.5 13.42 L 10.55 14.2 L 10.83 14.42 L 11.16 14.2 L 11.22 14.59 L 11 14.65 L 10.89 14.42 L 10.61 14.59 L 10.89 14.76 L 10.44 15.15 L 10.5 15.59 L 10.33 15.98 L 9.83 16.15 L 9.44 16.76 L 9.83 17.26 L 10.27 17.38 L 10.33 17.6 L 10.27 17.93 L 9.55 18.66 L 9.49 19.21 L 8.99 19.66 L 9.38 20.72 L 9.21 20.72 L 7.93 20.55 L 7.77 19.83 L 7.43 19.88 L 7.32 19.71 L 7.21 18.99 L 7.54 18.6 L 7.49 17.99 L 7.77 17.21 L 7.66 16.6 L 7.82 16.26 L 7.49 16.09 L 7.88 15.93 L 7.54 15.7 L 7.54 15.09 L 7.32 14.7 L 7.49 14.31 L 7.32 13.59 L 7.38 12.81 L 7.49 12.36 L 7.71 12.19 L 7.43 11.08 L 7.82 10.58 L 7.71 10.08 L 7.99 9.35 L 7.99 8.85 L 7.82 8.8 L 7.49 7.52 L 7.77 6.96 L 7.66 6.35 L 7.82 5.79 L 8.21 4.95 L 8.49 4.84 L 8.32 4.51 L 8.44 4.23 L 8.27 3.45 L 8.99 2.89 L 9.05 2.11 L 9.55 1.5 Z M 9.38 21 L 9.66 21.66 L 10.66 22.33 L 10.22 22.5 L 9.44 22.39 L 9.38 21 Z" />
      </svg>
    ),
  },
];

const SECTORES = [
  {
    n: "01",
    titulo: "Agricultura",
    texto:
      "Granos, semillas y fertilizantes. Barrera contra humedad y protección UV en la rafia.",
    img: "/images/agricultura.webp",
    w: 1400,
    h: 788,
    alt: "Camión cargado con Big Bags de grano en el campo, junto a un tractor con pluma",
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
    w: 1400,
    h: 933,
    alt: "Big Bag con mineral izado por la grúa de una excavadora en cantera",
    icono: (
      <svg width="28" height="28" viewBox="0 0 26 26" fill="none" stroke="#ffcc00" strokeWidth="1.6" aria-hidden="true">
        <path d="M2 22l7-13 4 6 3-4 8 11z" />
        <path d="M9 9l4 6" stroke="#ffcc00" strokeWidth="2.8" />
      </svg>
    ),
  },
];

/* Capacidades de fabricacion: reemplazan a la seccion de certificados. */
const CAPACIDADES = [
  {
    num: "01",
    titulo: "A medida, no de catálogo",
    texto:
      "Medidas, capacidad, tipo de boca de carga y de descarga se definen según lo que movés y cómo lo manipulás.",
  },
  {
    num: "02",
    titulo: "Tejido propio",
    texto:
      "La tela de rafia de polipropileno se produce en planta, con tratamiento UV para el bolsón que se almacena a la intemperie.",
  },
  {
    num: "03",
    titulo: "Control por lote",
    texto:
      "Cada partida sale identificada y con su ensayo hecho, para que puedas trazarla si algo hay que revisar.",
  },
  {
    num: "04",
    titulo: "Desarrollos propios",
    texto:
      "El compartimentado y las eslingas de izaje nacieron de pedidos que el bolsón estándar no resolvía.",
  },
];


/* La planta trabajando: es lo que respalda todo lo que dice el sitio.
   Fotos propias, no de banco. */
const PLANTA = [
  {
    src: "/images/plantaHilera.webp",
    alt: "Fardos de bolsones terminados alineados junto al galpón de la planta, listos para despacho.",
    pie: "Producción terminada, lista para despacho",
    w: 1712,
    h: 1142,
    ancha: true,
  },
  {
    src: "/images/prod-bolson-egran.webp",
    alt: "Bolsón cargado con garbanzos, impreso a dos colores para el cliente, con la etiqueta de Sibom Sacks.",
    pie: "Impresión a medida de cada cliente",
    w: 1200,
    h: 900,
  },
  {
    src: "/images/prod-despacho-camion.webp",
    alt: "Camión cargado con fardos de bolsones listos para salir a destino.",
    pie: "Despacho a todo el país",
    w: 1400,
    h: 1050,
  },
];


function Inicio() {
  const { reducir, cardVariant, staggerContainer } = useMotionSafe();

  // Se anima al montar la página, no al entrar en el viewport: el contenido
  // de estas secciones es información del negocio, no un adorno, así que
  // nunca debe depender de un scroll para volverse visible.
  // Se revela una sola vez, cuando entra un 20% del bloque: nada de
  // elementos que reaparecen al subir y bajar.
  const enVista = { once: true, amount: 0.2, margin: "0px 0px -80px 0px" };

  const subir = reducir
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 34 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
      };

  return (


    <>

      <Seo

        titulo="Big Bags en Córdoba | Fábrica de bolsones industriales — Sibom Sacks"

        descripcion="Fabricamos Big Bags industriales en Córdoba desde 2007. Bolsones de polipropileno con tratamiento UV para agro, industria y minería, hechos a la medida de tu carga. Pedí tu cotización."

        ruta="/inicio"

      />
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
            No hacemos bolsones estándar: desarrollamos con vos el Big Bag que
            tu carga necesita. Contanos qué movés y lo resolvemos.
          </p>

          <div className="hm-hero__acciones">
            <Link to="/contacto" className="hm-btn hm-btn--primario">
              Solicitar cotización
            </Link>
            <Link to="/productos" className="hm-btn hm-btn--texto">
              Ver los distintos modelos <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Invitacion a bajar: rotulo y linea con un trazo que la recorre. */}
        <a className="hm-sigue" href="#sectores">
          <span className="hm-sigue__txt">Encontrá tu solución a medida</span>
          <span className="hm-sigue__linea" aria-hidden="true" />
        </a>

        {/* Indicadores: al pie del hero, sobre la misma composicion. */}
        <motion.ul
          className="hm-tira"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {DATOS.map((d) => (
            <motion.li key={d.detalle} variants={cardVariant}>
              <span className="hm-tira__ico">{d.icono}</span>
              <span className="hm-tira__txt">
                <b>{d.valor}</b>
                <span>{d.detalle}</span>
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* ================= SECTORES ================= */}
      <section
        id="sectores"
        className="hm-sectores"
        aria-labelledby="hm-sectores-tit"
      >
        <motion.header
          className="hm-sectores__cab"
          variants={subir}
          initial="hidden"
          whileInView="show"
          viewport={enVista}
        >
          <h2 id="hm-sectores-tit" className="hm-sectores__tit">
            Sectores de aplicación
          </h2>
          <p className="hm-sectores__bajada">
            Soluciones de contención adaptadas a las exigencias operativas de las
            principales industrias productivas.
          </p>
        </motion.header>

        <motion.div
          className="hm-sectores__grilla"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={enVista}
        >
          {SECTORES.map((s) => (
            <motion.article key={s.n} className="hm-sec" variants={cardVariant}>
              <div className="hm-sec__foto">
                <img
                  src={s.img}
                  alt={s.alt}
                  width={s.w}
                  height={s.h}
                  loading="lazy"
                />
              </div>

              <div className="hm-sec__cuerpo">
                <span className="hm-sec__num">{s.n}</span>
                <h3 className="hm-sec__tit">{s.titulo}</h3>
                <p className="hm-sec__txt">{s.texto}</p>
                <Link to="/beneficios" className="hm-sec__link">
                  Ver beneficios <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ================= CAPACIDADES ================= */}
      {/* Reemplaza a certificaciones y clientes: el cliente prefiere no
          exponer todavia ni los logos de clientes ni los certificados. */}
      <motion.section
        className="hm-cap"
        aria-labelledby="hm-cap-tit"
        variants={subir}
        initial="hidden"
        whileInView="show"
        viewport={enVista}
      >
        <div className="hm-cap__cab">
          <h2 id="hm-cap-tit" className="hm-cap__tit">
            Cómo trabajamos
          </h2>
          <p className="hm-cap__bajada">
            Planta propia en Córdoba: el bolsón se teje, se cose y se controla
            bajo el mismo techo, con la medida y la terminación que pide cada
            operación.
          </p>
        </div>

        <ul className="hm-cap__lista">
          {CAPACIDADES.map((c) => (
            <li key={c.titulo} className="hm-cap__item">
              <span className="hm-cap__num" aria-hidden="true">
                {c.num}
              </span>
              <h3 className="hm-cap__item-tit">{c.titulo}</h3>
              <p className="hm-cap__item-txt">{c.texto}</p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ================= LA PLANTA ================= */}
      {/* Reemplaza a las preguntas frecuentes, que se mudaron a productos:
          en la portada rinde mas mostrar la fabrica funcionando. */}
      <section className="hm-planta" aria-labelledby="hm-planta-tit">
        <div className="hm-planta__cab">
          <p className="hm-eyebrow">
            <span className="hm-eyebrow__linea" aria-hidden="true" />
            Planta propia en Córdoba
          </p>
          <h2 id="hm-planta-tit" className="hm-planta__tit">
            La fábrica, funcionando
          </h2>
          <p className="hm-planta__bajada">
            Del tejido de la rafia a la costura de las fajas, todo pasa bajo el
            mismo techo. Estas son fotos de la planta y de bolsones nuestros en
            operación.
          </p>
        </div>

        <ul className="hm-planta__grid">
          {PLANTA.map((f) => (
            <li key={f.src} className={f.ancha ? "es-ancha" : undefined}>
              <figure>
                <img
                  src={f.src}
                  alt={f.alt}
                  width={f.w}
                  height={f.h}
                  loading="lazy"
                />
                <figcaption>{f.pie}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

    </div>

    </>
  );
}

export default Inicio;
