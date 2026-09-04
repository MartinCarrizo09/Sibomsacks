import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Carrusel from "../components/Carrusel.jsx";
import "./FichaProducto.css";

/*
  Ficha del bolsón compartimentado.

  Existe como ruta propia porque "big bag compartimentado" es una búsqueda con
  intención de compra clara: el que la escribe ya sabe lo que necesita y está
  comparando proveedores. Dentro de /productos ese contenido no puede
  posicionar solo, sin URL ni título propios.

  Los datos técnicos son los mismos que en /productos: no se agregan cifras de
  rendimiento porque las que circulan en el rubro no tienen respaldo verificable.
*/

const CARACTERISTICAS = [
  {
    titulo: "Tabiques internos en las esquinas",
    texto:
      "Paneles de tela cosidos dentro del bolsón que atan las paredes entre sí. Al llenarse, en vez de hincharse hacia afuera, la tela queda contenida y el bolsón mantiene la forma cúbica.",
  },
  {
    titulo: "Se apila sin inclinarse",
    texto:
      "Como no se deforma, los bolsones apoyan parejos uno sobre otro y se pueden estibar en altura. Un bolsón común cargado toma forma de barril y no lo permite.",
  },
  {
    titulo: "Mejor aprovechamiento del contenedor",
    texto:
      "La base cuadrada elimina los huecos que quedan entre bolsones panzones: entra más producto en el mismo piso de contenedor, camión o depósito.",
  },
  {
    titulo: "Llenado parejo hasta las esquinas",
    texto:
      "Los tabiques se calan con aberturas para que el producto pase de un compartimento al otro y llegue a las esquinas sin dejar bolsones de aire.",
  },
  {
    titulo: "Fabricación a medida",
    texto:
      "Medidas, capacidad, tipo de boca y de fondo se definen según la operación: no hay un modelo único, se desarrolla con el cliente.",
  },
  {
    titulo: "Polipropileno con tratamiento UV",
    texto:
      "Misma tela y mismos controles que el resto de la producción, con protección UV para el que se almacena a la intemperie.",
  },
];

/* Vistas de producto: la de esquinas es la que mejor explica el
   producto, porque muestra los cuatro tabiques formando el octogono. */
const GALERIA = [
  {
    src: "/images/compartimentado-vista-general.webp",
    alt: "Big Bag compartimentado abierto, con los tabiques internos visibles desde arriba y las cuatro eslingas de izaje.",
    pie: "Bolsón completo con los tabiques a la vista",
    w: 900,
    h: 1070,
  },
  {
    src: "/images/compartimentado-interior-superior.webp",
    alt: "Vista cenital del interior: los cuatro tabiques cosidos en las esquinas forman una sección octogonal.",
    pie: "Los cuatro tabiques, vistos desde arriba",
    w: 878,
    h: 724,
  },
  {
    src: "/images/compartimentado-tabiques-esquinas.webp",
    alt: "Interior del bolsón en perspectiva, donde se ven los tabiques que unen cada esquina con las paredes.",
    pie: "Cómo se cosen a las paredes",
    w: 900,
    h: 685,
  },
  {
    src: "/images/prod-apilado-deposito.webp",
    alt: "Bolsones apilados en tres niveles sobre pallets en depósito, manteniendo la forma sin inclinarse.",
    pie: "Estiba en altura: no se deforman ni se inclinan",
    w: 1200,
    h: 1200,
  },
  {
    src: "/images/compartimentado-lateral.webp",
    alt: "Vista lateral del bolsón compartimentado vacío, con las costuras verticales y las eslingas.",
    pie: "Vista lateral, vacío",
    w: 823,
    h: 1262,
  },
];

const APLICACIONES = [
  "Granos y semillas",
  "Harinas y molienda",
  "Resinas y plásticos",
  "Productos químicos secos",
  "Fertilizantes",
  "Minerales de grano fino",
];

const BolsonCompartimentado = () => {
  return (
    <div className="fp">
      <Seo
        titulo="Big Bag compartimentado a medida en Córdoba | Sibom Sacks"
        descripcion="Fabricamos bolsones compartimentados con tabiques internos: mantienen la forma cúbica con la carga, se apilan y aprovechan mejor el contenedor. Producción a medida en Córdoba."
        ruta="/productos/bolson-compartimentado"
      >
        {/* Ficha del producto para Google: puede mostrarlo como resultado
            enriquecido en las búsquedas del rubro. */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Big Bag compartimentado",
            alternateName: ["Bolsón compartimentado", "Baffle bag", "FIBC compartimentado"],
            description:
              "Contenedor flexible de polipropileno con tabiques internos cosidos en las esquinas, que mantienen la forma cúbica del bolsón con la carga y permiten apilarlo.",
            category: "Contenedores flexibles industriales",
            material: "Rafia de polipropileno con tratamiento UV",
            brand: { "@type": "Brand", name: "Sibom Sacks" },
            manufacturer: { "@id": "https://www.sibomsacks.com.ar/#empresa" },
            image: "https://www.sibomsacks.com.ar/images/og-sibomsacks.jpg",
            url: "https://www.sibomsacks.com.ar/productos/bolson-compartimentado",
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

      {/* ---------- Encabezado ---------- */}
      <header className="fp-hero">
        <nav className="fp-miga" aria-label="Ruta de navegación">
          <Link to="/productos">Productos</Link>
          <span aria-hidden="true">/</span>
          <span>Big Bag compartimentado</span>
        </nav>

        <p className="fp-eyebrow">
          <span className="fp-eyebrow__linea" aria-hidden="true" />
          Desarrollo propio
        </p>

        <h1 className="fp-titulo">Big Bag compartimentado</h1>

        <p className="fp-bajada">
          Un bolsón común, al llenarse, se hincha y toma forma de barril: se
          pierde espacio entre bolsón y bolsón y no se puede apilar. El
          compartimentado lleva tabiques internos que sostienen las paredes
          desde adentro y lo mantienen cuadrado, lleno o vacío.
        </p>
      </header>

      {/* ---------- Visor + puntos ---------- */}
      <section className="fp-bloque" aria-labelledby="fp-como-tit">
        <div className="fp-bloque__media">
          <Carrusel imagenes={GALERIA} etiqueta="Fotos del Big Bag compartimentado" />
          <p className="fp-pie">
            Cuatro vistas del bolsón vacío. Deslizá para verlas todas.
          </p>
        </div>

        <div className="fp-bloque__texto">
          <h2 id="fp-como-tit" className="fp-h2">
            Cómo funciona
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

      {/* ---------- Aplicaciones ---------- */}
      <section className="fp-aplic" aria-labelledby="fp-aplic-tit">
        <h2 id="fp-aplic-tit" className="fp-h2">
          Para qué cargas conviene
        </h2>
        <p className="fp-aplic__intro">
          Rinde mejor con productos secos de buen escurrimiento, que fluyen y
          llenan las esquinas de forma pareja:
        </p>
        <ul className="fp-chips">
          {APLICACIONES.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        <p className="fp-nota">
          Para materiales gruesos, pesados o que no fluyen bien, el producto
          puede trabarse en los tabiques y dejar huecos. En esos casos conviene
          evaluar un modelo de serie: lo vemos juntos según lo que muevas.
        </p>
      </section>

      {/* ---------- Cierre ---------- */}
      <section className="fp-cta" aria-labelledby="fp-cta-tit">
        <h2 id="fp-cta-tit" className="fp-h2">
          ¿Lo querés para tu operación?
        </h2>
        <p>
          Se fabrica a medida: contanos qué movés, en qué volumen y cómo lo
          cargás, y lo desarrollamos con vos.
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

export default BolsonCompartimentado;
