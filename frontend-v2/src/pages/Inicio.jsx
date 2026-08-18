import { useEffect, useState } from "react";
import { Aviso, Boton, Contenedor, Seccion } from "../components/ui/Ui.jsx";
import Configurador from "../components/Configurador.jsx";
import api from "../lib/api.js";
import { normalizar } from "../lib/catalogo.js";
import { WHATSAPP_URL } from "../lib/contacto.js";
import "./inicio.css";

const SECTORES = [
  {
    nombre: "Agricultura",
    texto: "Granos, semillas y fertilizantes. Tratamiento UV para acopio a la intemperie.",
    img: "/images/agricultura.webp",
    w: 800,
    h: 600,
  },
  {
    nombre: "Industria",
    texto: "Materiales a granel. Reutilizables, bajan el costo de embalaje por tonelada.",
    img: "/images/industry.webp",
    w: 996,
    h: 612,
  },
  {
    nombre: "Minería",
    texto: "Cargas pesadas y abrasivas. Costura reforzada y tejido de alto gramaje.",
    img: "/images/mineria.webp",
    w: 700,
    h: 434,
  },
];

const CERTIFICADOS = [
  {
    sigla: "EFIBCA 006",
    texto: "Ensayo de rendimiento validado con laboratorios de Alemania y Escocia.",
    img: "/images/logoCertFlex.webp",
  },
  {
    sigla: "INTI · ISO 7500-1",
    texto: "Certificado de calibración con anexo A, emitido por el INTI.",
    img: "/images/certInti.webp",
  },
  {
    sigla: "I.N.A.L. 870/08",
    texto: "Apto para el transporte de productos alimenticios.",
    img: "/images/certInal.webp",
  },
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

export default function Inicio() {
  const [modelos, setModelos] = useState([]);
  const [estado, setEstado] = useState("cargando");

  useEffect(() => {
    let vigente = true;
    api
      .productos()
      .then((datos) => {
        if (!vigente) return;
        setModelos(datos.map(normalizar));
        setEstado("listo");
      })
      .catch(() => vigente && setEstado("error"));
    return () => {
      vigente = false;
    };
  }, []);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero" aria-labelledby="hero-titulo">
        <Contenedor className="hero__interior">
          <div className="hero__texto">
            <p className="etiqueta hero__eyebrow">Fabricación propia · Córdoba, Argentina</p>
            <h1 id="hero-titulo">
              El Big Bag correcto para tu operación, no el que sobró en depósito
            </h1>
            <p className="hero__bajada">
              Fabricamos contenedores flexibles de rafia de polipropileno con tratamiento
              UV. Elegí cómo cargás y cómo descargás, y te decimos qué modelo necesitás.
            </p>
            <div className="hero__acciones">
              <Boton to="#configurador" variante="secundario" tamano="lg">
                Encontrar mi modelo
              </Boton>
              <Boton href={WHATSAPP_URL} variante="contorno" tamano="lg">
                Consultar por WhatsApp
              </Boton>
            </div>
          </div>

          {/* Imagen principal: es el LCP, por eso va con prioridad alta y
              sin lazy. Las dimensiones evitan el salto de layout. */}
          <figure className="hero__figura">
            <img
              src="/images/Slide2BBags.webp"
              alt="Big Bags de polipropileno cargados con material a granel"
              width={1000}
              height={667}
              fetchPriority="high"
              decoding="async"
            />
            <figcaption className="hero__pie">
              <span className="etiqueta">En planta</span>
              Bolsones listos para despacho
            </figcaption>
          </figure>

          <ul className="hero__datos">
            <li><b className="cifra">6</b><span>modelos de serie</span></li>
            <li><b className="cifra">3</b><span>certificaciones</span></li>
            <li><b>UV</b><span>tratamiento en la rafia</span></li>
          </ul>
        </Contenedor>
      </section>

      {/* ---------- CONFIGURADOR ---------- */}
      <Seccion
        id="configurador"
        eyebrow="Encontrá tu modelo"
        titulo="Dos decisiones definen tu bolsón"
        bajada="Nuestros seis modelos son la combinación de cómo se carga y cómo se descarga. Elegí una de cada columna."
      >
        {estado === "cargando" && <Aviso>Cargando modelos…</Aviso>}
        {estado === "error" && (
          <Aviso tipo="error">
            No pudimos cargar el catálogo. Recargá la página o escribinos por WhatsApp.
          </Aviso>
        )}
        {estado === "listo" && <Configurador modelos={modelos} />}
      </Seccion>

      {/* ---------- SECTORES ---------- */}
      <Seccion
        tono="alt"
        id="sectores"
        eyebrow="Dónde se usan"
        titulo="Tres industrias, un mismo envase"
        acciones={<Boton to="/beneficios" variante="contorno">Ver beneficios</Boton>}
      >
        <ul className="sectores">
          {SECTORES.map((s) => (
            <li className="sector" key={s.nombre}>
              <img src={s.img} alt="" width={s.w} height={s.h} loading="lazy" />
              <div className="sector__cuerpo">
                <h3>{s.nombre}</h3>
                <p>{s.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </Seccion>

      {/* ---------- CERTIFICACIONES ---------- */}
      <Seccion
        id="certificaciones"
        eyebrow="Ensayado, no prometido"
        titulo="Certificaciones que respaldan cada lote"
      >
        <ul className="certs">
          {CERTIFICADOS.map((c) => (
            <li className="cert" key={c.sigla}>
              <img src={c.img} alt="" width={420} height={420} loading="lazy" />
              <div>
                <h3 className="cert__sigla">{c.sigla}</h3>
                <p>{c.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </Seccion>

      {/* ---------- CLIENTES ---------- */}
      <Seccion tono="alt" id="clientes" eyebrow="Nos eligen" titulo="Empresas que ya trabajan con nosotros">
        <ul className="clientes">
          {CLIENTES.map((c) => (
            <li key={c.alt}>
              <img src={c.src} alt={c.alt} width={c.w} height={c.h} loading="lazy" />
            </li>
          ))}
        </ul>
      </Seccion>

      {/* ---------- CIERRE ---------- */}
      <Seccion tono="azul" id="cotizar">
        <div className="cierre">
          <div>
            <h2>¿Listo para cotizar?</h2>
            <p>
              Contanos qué vas a transportar y en qué volumen. Te respondemos con
              medidas, plazos y precio.
            </p>
          </div>
          <div className="cierre__acciones">
            <Boton to="/contacto" variante="primario" tamano="lg">
              Pedir cotización
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
