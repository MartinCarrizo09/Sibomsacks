import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import "./BigBagsCordoba.css";

/*
  Página de aterrizaje para "big bags córdoba".

  Existe porque esa búsqueda tiene intención local clara y hoy la gana un
  competidor que sí tiene una URL dedicada. Sin una página propia, Google
  posiciona /productos, que habla de modelos y no de dónde comprar.

  El contenido es el que un comprador de Córdoba busca antes de llamar:
  qué se fabrica, para qué carga sirve, y cómo se compra. Nada de cifras
  de rendimiento sin respaldo.
*/

const APLICACIONES = [
  {
    titulo: "Agro",
    texto:
      "Granos, semillas, harinas y fertilizantes. Es el uso más común en la provincia, con la cosecha y el acopio como temporada fuerte.",
  },
  {
    titulo: "Industria",
    texto:
      "Resinas, plásticos, químicos secos y materia prima a granel para plantas de la zona industrial.",
  },
  {
    titulo: "Minería y áridos",
    texto:
      "Minerales, arena, cal y materiales de construcción, donde hace falta tela resistente y costuras reforzadas.",
  },
];

const PREGUNTAS = [
  {
    q: "¿Cuál es el pedido mínimo?",
    a: "Depende del modelo y de la medida. Al fabricarse a pedido, conviene consultar con el volumen que necesitás y te pasamos la cantidad mínima para ese caso.",
  },
  {
    q: "¿Hacen big bags a medida?",
    a: "Sí, es la forma habitual de trabajo. Se definen medidas, capacidad, tipo de boca de carga y de descarga según lo que muevas y cómo lo manipules.",
  },
  {
    q: "¿Envían fuera de Córdoba?",
    a: "Sí, despachamos a todo el país. La planta está en Córdoba Capital y desde ahí sale la mercadería.",
  },
  {
    q: "¿Sirven para producto alimenticio?",
    a: "Sí. Contanos de qué producto se trata y te confirmamos el modelo y la tela que corresponden para uso alimenticio.",
  },
  {
    q: "¿Qué capacidad tienen?",
    a: "Se fabrican según la carga: lo más pedido es alrededor de 1000 kg, pero la medida y la capacidad se definen para cada operación.",
  },
  {
    q: "¿Cuánto tardan en entregar?",
    a: "El plazo depende de la cantidad y del modelo. Al cotizar te confirmamos la fecha de entrega para tu pedido.",
  },
];

const BigBagsCordoba = () => {
  return (
    <div className="bbc">
      <Seo
        titulo="Big Bags en Córdoba | Fábrica de bolsones industriales — Sibom Sacks"
        descripcion="Fábrica de Big Bags en Córdoba Capital desde 2007. Bolsones de polipropileno a medida para agro, industria y minería, con tratamiento UV. Envíos a todo el país. Pedí tu cotización."
        ruta="/big-bags-cordoba"
      >
        {/* Preguntas frecuentes: Google puede mostrarlas desplegadas debajo
            del resultado, lo que gana espacio en pantalla. */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: PREGUNTAS.map((p) => ({
              "@type": "Question",
              name: p.q,
              acceptedAnswer: { "@type": "Answer", text: p.a },
            })),
          })}
        </script>
      </Seo>

      {/* ---------- Encabezado ---------- */}
      <header className="bbc-hero">
        <p className="bbc-eyebrow">
          <span className="bbc-eyebrow__linea" aria-hidden="true" />
          Fábrica en Córdoba Capital
        </p>

        <h1 className="bbc-titulo">Big Bags en Córdoba</h1>

        <p className="bbc-bajada">
          Fabricamos bolsones industriales de rafia de polipropileno en Córdoba
          desde 2007. Planta propia: el bolsón se corta, se cose y se controla
          bajo el mismo techo, y se hace a la medida de lo que movés.
        </p>

        <div className="bbc-acciones">
          <Link to="/contacto" className="bbc-btn bbc-btn--primario">
            Pedir cotización
          </Link>
          <a
            href="https://wa.me/5493515081014"
            className="bbc-btn bbc-btn--texto"
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar por WhatsApp <span aria-hidden="true">→</span>
          </a>
        </div>

        <ul className="bbc-datos">
          <li>
            <b>2007</b>
            <span>Fabricando en Córdoba</span>
          </li>
          <li>
            <b>8</b>
            <span>Modelos disponibles</span>
          </li>
          <li>
            <b>A medida</b>
            <span>Según tu operación</span>
          </li>
          <li>
            <b>Todo el país</b>
            <span>Despacho desde Córdoba</span>
          </li>
        </ul>
      </header>

      {/* ---------- Aplicaciones ---------- */}
      <section className="bbc-sec" aria-labelledby="bbc-aplic-tit">
        <h2 id="bbc-aplic-tit" className="bbc-h2">
          Para qué se usan en la provincia
        </h2>
        <div className="bbc-grid">
          {APLICACIONES.map((a) => (
            <article key={a.titulo}>
              <h3>{a.titulo}</h3>
              <p>{a.texto}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Qué fabricamos ---------- */}
      <section className="bbc-sec" aria-labelledby="bbc-que-tit">
        <h2 id="bbc-que-tit" className="bbc-h2">
          Qué fabricamos
        </h2>
        <p className="bbc-texto">
          Ocho modelos en total. Seis de serie, que se diferencian por cómo se
          carga arriba (válvula, pollera de cierre o boca abierta) y cómo se
          descarga abajo (válvula de descarga o fondo ciego). Y dos desarrollos
          propios para operaciones que el bolsón estándar no resuelve.
        </p>

        <div className="bbc-enlaces">
          <Link to="/productos" className="bbc-card">
            <h3>Los seis modelos</h3>
            <p>Configuraciones de carga y descarga, todas a medida.</p>
            <span aria-hidden="true">Ver modelos →</span>
          </Link>

          <Link to="/productos/bolson-compartimentado" className="bbc-card">
            <h3>Big Bag compartimentado</h3>
            <p>
              Con tabiques internos: mantiene la forma cúbica con la carga y se
              apila.
            </p>
            <span aria-hidden="true">Ver ficha →</span>
          </Link>

          <Link to="/productos/eslingas-de-izaje" className="bbc-card">
            <h3>Eslingas de izaje</h3>
            <p>
              Para carga y descarga de mercadería embolsada en muelle.
            </p>
            <span aria-hidden="true">Ver ficha →</span>
          </Link>
        </div>
      </section>

      {/* ---------- Preguntas frecuentes ---------- */}
      <section className="bbc-sec" aria-labelledby="bbc-faq-tit">
        <h2 id="bbc-faq-tit" className="bbc-h2">
          Preguntas frecuentes
        </h2>
        <dl className="bbc-faq">
          {PREGUNTAS.map((p) => (
            <div key={p.q}>
              <dt>{p.q}</dt>
              <dd>{p.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- Cierre ---------- */}
      <section className="bbc-cierre" aria-labelledby="bbc-cta-tit">
        <h2 id="bbc-cta-tit" className="bbc-h2">
          Contanos qué necesitás mover
        </h2>
        <p>
          Con el producto, el volumen y cómo lo cargás alcanza para cotizarte el
          bolsón que corresponde.
        </p>
        <div className="bbc-acciones">
          <Link to="/contacto" className="bbc-btn bbc-btn--primario">
            Pedir cotización
          </Link>
          <a
            href="tel:+5493515081014"
            className="bbc-btn bbc-btn--texto"
          >
            351 508-1014
          </a>
        </div>
      </section>
    </div>
  );
};

export default BigBagsCordoba;
