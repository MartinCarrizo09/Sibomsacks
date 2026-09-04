import React, { Suspense, lazy, useEffect, useState } from "react";
import productoService from "../services/productos.service.js";
import { Link } from "react-router-dom";
import "./Productos.css";
import Seo from "../components/Seo.jsx";

// El visor arrastra three.js: se carga sólo cuando esta página se monta.
const VisorBolson3D = lazy(() => import("../components/VisorBolson3D.jsx"));

const imagenesPorModelo = {
  1: "valvuladecargaydescarga.webp",
  2: "polleradecierrrevalvuladedescarga.webp",
  3: "bocaabiertavalvuladedescarga.webp",
  4: "valvuladecargafondociego.webp",
  5: "polleradecierrefondociego.webp",
  6: "bocaabiertafondociego.webp",
};

const dimensionesPorModelo = {
  1: { w: 277, h: 357 },
  2: { w: 316, h: 358 },
  3: { w: 303, h: 368 },
  4: { w: 316, h: 342 },
  5: { w: 303, h: 376 },
  6: { w: 297, h: 335 },
};

/* Puntos de cada estrella. Se mantienen fuera del JSX para que el bloque
   destacado se lea de un vistazo y sea fácil ajustarlos con el cliente. */
/* Resumen de cada estrella. El desarrollo completo vive en su ficha:
   repetirlo aca duplicaria contenido y las dos URLs competirian entre si. */
const PUNTOS_COMPARTIMENTADO = [
  {
    titulo: "Mantiene la forma cúbica",
    texto:
      "Los tabiques cosidos en las cuatro esquinas atan las paredes entre sí y frenan el pandeo: cargado queda cuadrado, no con forma de barril.",
  },
  {
    titulo: "Se apila y aprovecha el contenedor",
    texto:
      "Al no deformarse se estiba en altura, y la base cuadrada elimina los huecos que quedan entre bolsones panzones.",
  },
];

const PUNTOS_SLINGBAG = [
  {
    titulo: "No es un bolsón: es un portador",
    texto:
      "Se cargan bolsas ya envasadas de 25 a 50 kg sobre la tela y se izan todas juntas, en un solo movimiento de grúa.",
  },
  {
    titulo: "Se preeslinga en origen",
    texto:
      "Las eslingas se colocan bajo la carga en el puerto de embarque y viajan puestas: en destino se engancha y sale la unidad completa.",
  },
];

/* Fotos de produccion real: dan credibilidad que ningun render alcanza.
   Van al cierre de la pagina, despues de los modelos de serie. */
const PRODUCCION = [
  {
    src: "/images/prod-bolson-egran.webp",
    alt: "Bolsón cargado con garbanzos, impreso a dos colores para el cliente, con la etiqueta de Sibom Sacks colgando.",
    pie: "Impresión a medida del cliente",
    w: 1200,
    h: 900,
  },
  {
    src: "/images/prod-mineria-izaje.webp",
    alt: "Bolsón izado por una excavadora en cantera, cargado con áridos.",
    pie: "En operación: minería y áridos",
    w: 1264,
    h: 842,
  },
  {
    src: "/images/prod-bolson-mani.webp",
    alt: "Bolsón de boca abierta cargado con maní, con eslingas azules, apoyado sobre pallet en depósito.",
    pie: "Boca abierta, cargado y sobre pallet",
    w: 1200,
    h: 900,
  },
  {
    src: "/images/prod-despacho-camion.webp",
    alt: "Camión cargado con fardos de bolsones listos para despachar.",
    pie: "Despacho a todo el país",
    w: 1400,
    h: 1050,
  },
];

/* Preguntas que hace el comprador antes de pedir presupuesto. Viven aca,
   con los productos, que es donde surgen. */

/* Preguntas que hace el comprador antes de pedir presupuesto. Viven aca,
   con los productos, que es donde surgen. */
const FAQ = [
  {
    q: "¿Qué es un Big Bag y para qué sirve?",
    a: "Es un contenedor flexible de rafia de polipropileno que mueve alrededor de una tonelada en un solo bulto. Reemplaza decenas de bolsas chicas: menos manipuleo, menos envase y menos tiempo de carga.",
  },
  {
    q: "¿Qué capacidad tienen?",
    a: "Lo más pedido ronda los 1000 kg, pero la medida y la capacidad se definen para cada operación. No hay un tamaño único: depende del producto y de cómo lo cargues.",
  },
  {
    q: "¿Se fabrican a medida?",
    a: "Sí, es la forma habitual de trabajo. Se define el ancho, el alto, el tipo de boca superior y el fondo según el producto y el equipo con el que se manipula.",
  },
  {
    q: "¿Sirven para productos alimenticios?",
    a: "Sí. Contanos de qué producto se trata y te confirmamos el modelo y la tela que corresponden para uso alimenticio.",
  },
  {
    q: "¿Hacen envíos fuera de Córdoba?",
    a: "Sí, despachamos a todo el país. La planta está en Córdoba Capital y desde ahí sale la mercadería.",
  },
  {
    q: "¿Cuál es la diferencia entre boca abierta y válvula de carga?",
    a: "La boca abierta permite cargar a mayor caudal y es más fácil de llenar; la válvula cierra mejor y protege el producto del ambiente. La elección depende de con qué equipo llenás el bolsón.",
  },
];

const Productos = () => {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    try {
      const data = await productoService.obtenerTodos();
      setProductos(data);
    } catch (error) {
      console.error("❌ Error al cargar productos:", error.message);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (


    <>

      <Seo

        titulo="Modelos de Big Bag y bolsón compartimentado | Sibom Sacks Córdoba"

        descripcion="Ocho modelos de Big Bag a medida: seis de serie con válvula de carga, pollera de cierre, boca abierta y fondo ciego, más el bolsón compartimentado y las eslingas de izaje, desarrollos propios de la planta."

        ruta="/productos"

      >
        {/* Google puede mostrar estas preguntas desplegadas bajo el
            resultado, lo que gana espacio en pantalla. */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          })}
        </script>
      </Seo>
    <div className="productos-page">
      {/* ================= DESTACADOS ================= */}
      {/* Los dos desarrollos propios van arriba: son el diferencial de la
          planta y lo que conviene que el visitante vea primero. */}
      <section className="pd-destacados" aria-labelledby="pd-destacados-tit">
        <header className="pd-destacados__cab">
          <p className="pd-eyebrow">
            <span className="pd-eyebrow__linea" aria-hidden="true" />
            Desarrollos propios
          </p>
          <h1 id="pd-destacados-tit" className="pd-destacados__tit">
            Nuestros dos productos estrella
          </h1>
          <p className="pd-destacados__bajada">
            Además de los seis modelos de serie, la planta se especializa en dos
            soluciones que resuelven problemas que el bolsón estándar no cubre.
          </p>
        </header>

        {/* Las dos estrellas van lado a lado y con la misma altura: apiladas
            ocupaban media pagina y quedaba aire muerto entre una y otra. */}
        <div className="pd-duo">
          {/* ---- Compartimentado: visor 3D ---- */}
          <article className="pd-card">
            <div className="pd-card__media">
              <Suspense
                fallback={
                  <div className="pd-visor-fallback" role="status">
                    Cargando modelo 3D…
                  </div>
                }
              >
                <VisorBolson3D />
              </Suspense>
            </div>

            <div className="pd-card__cuerpo">
              <span className="pd-chip">Big Bag compartimentado</span>
              <h2 className="pd-card__tit">
                El que <em>no</em> se deforma con la carga
              </h2>
              <p className="pd-card__intro">
                Un bolsón común se hincha al llenarse y toma forma de barril. El
                compartimentado lleva tabiques cosidos en las cuatro esquinas
                que lo mantienen cuadrado, lleno o vacío.
              </p>

              <ul className="pd-puntos">
                {PUNTOS_COMPARTIMENTADO.map((punto) => (
                  <li key={punto.titulo}>
                    <h3>{punto.titulo}</h3>
                    <p>{punto.texto}</p>
                  </li>
                ))}
              </ul>

              <Link
                to="/productos/bolson-compartimentado"
                className="pd-cta pd-card__cta"
              >
                Ver ficha completa <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>

          {/* ---- SlingBag: foto real de operación en puerto ---- */}
          <article className="pd-card">
            <div className="pd-card__media">
              <figure className="pd-foto">
                <img
                  src="/images/slingbag.webp"
                  alt="Grúa portuaria izando un bloque de bolsas de 50 kg sostenido por eslingas, con eslingas vacías preparadas sobre el muelle."
                  width={1160}
                  height={653}
                  loading="lazy"
                />
              </figure>
            </div>

            <div className="pd-card__cuerpo">
              <span className="pd-chip">SlingBag</span>
              <h2 className="pd-card__tit">Eslingas de izaje para muelle</h2>
              <p className="pd-card__intro">
                El sistema con el que se mueve mercadería embolsada entre el
                muelle y la bodega del buque: levanta la carga completa de una
                vez, en lugar de bolsa por bolsa.
              </p>

              <ul className="pd-puntos">
                {PUNTOS_SLINGBAG.map((punto) => (
                  <li key={punto.titulo}>
                    <h3>{punto.titulo}</h3>
                    <p>{punto.texto}</p>
                  </li>
                ))}
              </ul>

              <Link
                to="/productos/eslingas-de-izaje"
                className="pd-cta pd-card__cta"
              >
                Ver ficha completa <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </div>

      </section>

      {/* ================= MODELOS DE SERIE ================= */}
      <section className="container pb-5 pd-serie" aria-labelledby="pd-serie-tit">
        <header className="pd-serie__cab">
          <p className="pd-serie__eyebrow">Línea de serie</p>
          <h2 id="pd-serie-tit" className="productos-titulo fw-bold">
            Los seis modelos de Big Bag
          </h2>
          <p className="pd-serie__bajada">
            Fabricamos en <Link to="/big-bags-cordoba">Córdoba</Link> y
            despachamos a todo el país. Se diferencian por cómo se carga
            arriba y cómo se descarga abajo:
            válvula, pollera de cierre o boca abierta en la parte superior, y
            válvula de descarga o fondo ciego en la inferior. Todos se fabrican
            a la medida de tu operación.
          </p>
        </header>

        <div className="row g-4">
          {productos.map((producto) => {
            const modelo = producto.caracteristicasGenerales?.id_tipo;
            const nombreImagen = imagenesPorModelo[modelo] || "default.webp";
            const imagenSrc = `/images/${nombreImagen}`;
            const titulo =
              producto.caracteristicasGenerales?.producto_nombre || "Sin nombre";
            const tipo = producto.caracteristicasGenerales?.tipo || "N/A";
            const dim = dimensionesPorModelo[modelo] || { w: 300, h: 355 };

            return (
              <div className="col-12 col-sm-6 col-lg-4" key={producto.id}>
                <Link
                  to={`/productos/${producto.id}`}
                  className="card product-card h-100 border-0 rounded shadow-sm"
                  aria-label={`Ver detalle de ${titulo}`}
                >
                  <img
                    src={imagenSrc}
                    alt={`Big Bag modelo ${modelo} - ${titulo}`}
                    className="product-image"
                    width={dim.w}
                    height={dim.h}
                    loading="lazy"
                  />

                  <div className="card-body d-flex flex-column align-items-center text-center">
                    <h3 className="card-title h5 fw-semibold mb-1">{titulo}</h3>
                    <p className="card-text text-muted mb-0">
                      <strong>{tipo}</strong>
                    </p>

                    {/* Indicador sutil en hover */}
                    <span className="card-cta" aria-hidden="true">
                      Ver detalle →
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- Producción real ---------- */}
      <section className="pd-produccion" aria-labelledby="pd-prod-tit">
        <div className="container">
          <p className="pd-serie__eyebrow">De la planta</p>
          <h2 id="pd-prod-tit" className="productos-titulo fw-bold">
            Producción real
          </h2>
          <p className="pd-serie__bajada">
            Bolsones fabricados en Córdoba, cargados y en operación.
          </p>

          <ul className="pd-fotos">
            {PRODUCCION.map((f) => (
              <li key={f.src}>
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
        </div>
      </section>

      {/* ---------- Preguntas frecuentes ---------- */}
      <section className="pd-faq" aria-labelledby="pd-faq-tit">
        <div className="container">
          <h2 id="pd-faq-tit" className="productos-titulo fw-bold">
            Preguntas frecuentes
          </h2>
          <dl className="pd-faq__lista">
            {FAQ.map((f) => (
              <div key={f.q} className="pd-faq__item">
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

    </div>

    </>
  );
};

export default Productos;
