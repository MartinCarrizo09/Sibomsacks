import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Carrusel from "../components/Carrusel.jsx";
import "./FichaProducto.css";

/*
  Ficha de las eslingas de izaje (SlingBag).

  Se separa de /productos por la misma razón que el compartimentado: "eslingas
  de izaje" y "sling bag" son búsquedas de alta intención y necesitan URL,
  título y contenido propios para posicionar.

  Los textos describen la operación real de puerto. No se ponen cifras de
  toneladas por hora: las que circulan vienen de descargadores neumáticos, que
  son otra tecnología, y no aplican a eslingas.
*/

const CARACTERISTICAS = [
  {
    titulo: "No es un bolsón: es un portador",
    texto:
      "La eslinga no se llena con producto suelto. Se cargan bolsas ya envasadas de 25 a 50 kg sobre la tela y se izan todas juntas en un solo movimiento.",
  },
  {
    titulo: "Se preeslinga en origen",
    texto:
      "Las eslingas se colocan bajo la carga en el puerto de embarque y viajan puestas. En destino se engancha y sale la unidad completa, sin rearmar nada en la bodega.",
  },
  {
    titulo: "Menos ciclos de grúa",
    texto:
      "Cada izaje mueve el equivalente a decenas de bolsas sueltas, así que se reduce la cantidad de maniobras y la manipulación manual dentro de la bodega.",
  },
  {
    titulo: "Bolsas cruzadas y trabadas",
    texto:
      "Se estiban en camadas cruzadas para que se traben entre sí, y después se aseguran con las fajas transversales antes de levantar.",
  },
  {
    titulo: "Fajas de izaje cosidas",
    texto:
      "Tela de polipropileno con fajas de izaje cosidas a la base. La capacidad se define según el equipo de izaje del puerto y el peso de bolsa de la operación.",
  },
  {
    titulo: "La mercadería llega entera",
    texto:
      "Al manipularse en bloque y no bolsa por bolsa, se reduce el maltrato de los envases durante la carga y la descarga.",
  },
];

/* Fotos de operaciones reales: el preeslingado en deposito y el izaje al
   buque. Dan mas credibilidad que un render. */
const GALERIA = [
  {
    src: "/images/sling-izaje-buque.webp",
    alt: "Grúa de buque izando un bloque completo de bolsas sostenido por eslingas, con estibadores y eslingas vacías sobre el muelle.",
    pie: "Izaje del bloque completo hacia la bodega",
    w: 1160,
    h: 653,
  },
  {
    src: "/images/sling-preeslingado.webp",
    alt: "Bolsas apiladas en camadas cruzadas con las eslingas ya colocadas debajo, listas para izar.",
    pie: "Preeslingado: las eslingas se colocan antes de cargar",
    w: 768,
    h: 1024,
  },
];

const CARGAS = [
  "Cemento",
  "Fertilizantes",
  "Granos",
  "Arroz",
  "Azúcar",
  "Materiales de construcción",
];

const EslingasIzaje = () => {
  return (
    <div className="fp">
      <Seo
        titulo="Eslingas de izaje para puerto (SlingBag) | Sibom Sacks Córdoba"
        descripcion="Fabricamos eslingas de izaje de polipropileno para carga y descarga de mercadería embolsada en muelle. Sistema de preeslingado para cemento, fertilizantes, granos y azúcar."
        ruta="/productos/eslingas-de-izaje"
        imagen="https://www.sibomsacks.com.ar/images/slingbag.webp"
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Eslingas de izaje (SlingBag)",
            alternateName: ["Sling bag", "Eslinga de izaje", "Lifting sling"],
            description:
              "Eslingas de polipropileno con fajas de izaje cosidas, para carga y descarga de mercadería embolsada entre el muelle y la bodega del buque.",
            category: "Equipamiento de izaje para carga embolsada",
            material: "Polipropileno con fajas de izaje cosidas",
            brand: { "@type": "Brand", name: "Sibom Sacks" },
            manufacturer: { "@id": "https://www.sibomsacks.com.ar/#empresa" },
            image: "https://www.sibomsacks.com.ar/images/slingbag.webp",
            url: "https://www.sibomsacks.com.ar/productos/eslingas-de-izaje",
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              priceCurrency: "ARS",
              url: "https://www.sibomsacks.com.ar/contacto",
              seller: { "@id": "https://www.sibomsacks.com.ar/#empresa" },
            },
          })}
        </script>
      </Seo>

      <header className="fp-hero">
        <nav className="fp-miga" aria-label="Ruta de navegación">
          <Link to="/productos">Productos</Link>
          <span aria-hidden="true">/</span>
          <span>Eslingas de izaje</span>
        </nav>

        <p className="fp-eyebrow">
          <span className="fp-eyebrow__linea" aria-hidden="true" />
          Desarrollo propio
        </p>

        <h1 className="fp-titulo">Eslingas de izaje · SlingBag</h1>

        <p className="fp-bajada">
          Es el sistema con el que se mueve mercadería embolsada entre el muelle
          y la bodega del buque: tela de polipropileno con fajas de izaje
          cosidas, que levanta la carga completa de una sola vez en lugar de
          bolsa por bolsa.
        </p>
      </header>

      <section className="fp-bloque" aria-labelledby="fp-como-tit">
        <div className="fp-bloque__media">
          <Carrusel imagenes={GALERIA} etiqueta="Fotos de la operación con eslingas" />
          <p className="fp-pie">
            Fotos de operaciones reales. Deslizá para verlas todas.
          </p>
        </div>

        <div className="fp-bloque__texto">
          <h2 id="fp-como-tit" className="fp-h2">
            Cómo se usa
          </h2>
          <ul className="fp-lista">
            {CARACTERISTICAS.map((c) => (
              <li key={c.titulo}>
                <h3>{c.titulo}</h3>
                <p>{c.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="fp-aplic" aria-labelledby="fp-aplic-tit">
        <h2 id="fp-aplic-tit" className="fp-h2">
          Cargas habituales
        </h2>
        <p className="fp-aplic__intro">
          Se usa con mercadería que viaja envasada en bolsas y se mueve por
          puerto o por ferrocarril:
        </p>
        <ul className="fp-chips">
          {CARGAS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p className="fp-nota">
          La medida y la capacidad se definen según el equipo de izaje del
          puerto donde opere y el peso de bolsa con el que trabajen: no hay una
          eslinga única para toda operación.
        </p>
      </section>

      <section className="fp-cta" aria-labelledby="fp-cta-tit">
        <h2 id="fp-cta-tit" className="fp-h2">
          ¿Necesitás eslingas para tu operación?
        </h2>
        <p>
          Contanos con qué producto trabajan, el peso de bolsa y el puerto donde
          operan, y te cotizamos la medida que corresponde.
        </p>
        <div className="fp-cta__acciones">
          <Link to="/contacto" className="fp-btn fp-btn--primario">
            Pedir cotización
          </Link>
          <Link to="/productos" className="fp-btn fp-btn--texto">
            Ver todos los modelos <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EslingasIzaje;
