import React, { Suspense, lazy, useEffect, useState } from "react";
import productoService from "../services/productos.service.js";
import { Link } from "react-router-dom";
import "./Productos.css";

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
const PUNTOS_COMPARTIMENTADO = [
  {
    titulo: "Mantiene la forma cúbica",
    texto:
      "Los tabiques cosidos en las cuatro esquinas atan las paredes entre sí y frenan el pandeo. Cargado queda cuadrado, no con forma de barril.",
  },
  {
    titulo: "Se apila y no se inclina",
    texto:
      "Al no deformarse, los bolsones se apoyan parejos y se pueden estibar en altura. Un bolsón común, cargado, no lo permite.",
  },
  {
    titulo: "Aprovecha el contenedor",
    texto:
      "La base cuadrada elimina los huecos que quedan entre bolsones panzones: entra más producto en el mismo piso de contenedor o depósito.",
  },
  {
    titulo: "Llega parejo a las esquinas",
    texto:
      "Los tabiques se calan con aberturas para que el producto pase de un compartimento al otro y llene las esquinas parejo, sin bolsones de aire.",
  },
];

const PUNTOS_SLINGBAG = [
  {
    titulo: "No es un bolsón: es un portador",
    texto:
      "La eslinga no se llena con producto suelto. Se cargan bolsas ya envasadas de 25 a 50 kg sobre la tela y se izan todas juntas en un solo movimiento.",
  },
  {
    titulo: "Se preeslinga en origen",
    texto:
      "Las eslingas se colocan bajo la carga en el puerto de embarque y viajan puestas. En destino se engancha y sale la unidad completa, sin rearmar nada.",
  },
  {
    titulo: "Menos ciclos de grúa",
    texto:
      "Cada izaje mueve el equivalente a decenas de bolsas sueltas. Se reduce la manipulación manual dentro de la bodega y las bolsas llegan enteras.",
  },
  {
    titulo: "Bolsas cruzadas y trabadas",
    texto:
      "Se estiban en camadas cruzadas para que se traben entre sí y después se aseguran con las fajas transversales antes de levantar.",
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

        {/* ---- Compartimentado: visor 3D ---- */}
        <article className="pd-estrella">
          <div className="pd-estrella__media">
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

          <div className="pd-estrella__texto">
            <span className="pd-chip">Big Bag compartimentado</span>
            <h2 className="pd-estrella__tit">
              El que <em>no</em> se deforma con la carga
            </h2>
            <p className="pd-estrella__intro">
              Un bolsón común, al llenarse, se hincha y toma forma de barril: se
              pierde espacio entre bolsón y bolsón, y no se puede apilar. El
              compartimentado lleva tabiques internos que sostienen las paredes
              desde adentro y lo mantienen cuadrado, lleno o vacío.
            </p>

            <p className="pd-estrella__tip">
              Tocá <strong>“Ver por dentro”</strong> en el modelo para ver los
              tabiques internos, marcados en amarillo.
            </p>

            <ul className="pd-puntos">
              {PUNTOS_COMPARTIMENTADO.map((p) => (
                <li key={p.titulo}>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </li>
              ))}
            </ul>

            <p className="pd-nota">
              Recomendado para productos secos de buen escurrimiento: granos,
              semillas, harinas, resinas y químicos. Para materiales gruesos o
              que no fluyen bien, conviene evaluar un modelo de serie.
            </p>

            <Link to="/contacto" className="pd-cta">
              Consultar por el compartimentado <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>

        {/* ---- SlingBag: foto real de operación en puerto ---- */}
        <article className="pd-estrella pd-estrella--invertida">
          <div className="pd-estrella__media">
            <figure className="pd-foto">
              <img
                src="/images/slingbag.webp"
                alt="Grúa portuaria izando un bloque de bolsas de 50 kg sostenido por eslingas, con eslingas vacías preparadas sobre el muelle."
                width={1160}
                height={653}
                loading="lazy"
              />
              <figcaption>
                Izaje de bolsas trabadas con eslingas durante la carga de un
                buque.
              </figcaption>
            </figure>
          </div>

          <div className="pd-estrella__texto">
            <span className="pd-chip">SlingBag</span>
            <h2 className="pd-estrella__tit">
              Eslingas de izaje para carga y descarga en muelle
            </h2>
            <p className="pd-estrella__intro">
              Es el sistema con el que se mueve mercadería embolsada entre el
              muelle y la bodega del buque. Tela de polipropileno con fajas de
              izaje cosidas, que levanta la carga completa de una sola vez en
              lugar de bolsa por bolsa.
            </p>

            <ul className="pd-puntos">
              {PUNTOS_SLINGBAG.map((p) => (
                <li key={p.titulo}>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </li>
              ))}
            </ul>

            <p className="pd-nota">
              Se usa habitualmente con cemento, fertilizantes, granos, arroz y
              azúcar. La capacidad se define según el equipo de izaje del puerto
              y el peso de bolsa con el que trabaje la operación.
            </p>

            <Link to="/contacto" className="pd-cta">
              Consultar por eslingas <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      </section>

      {/* ================= MODELOS DE SERIE ================= */}
      <section className="container pb-5 pd-serie" aria-labelledby="pd-serie-tit">
        <header className="pd-serie__cab">
          <h2 id="pd-serie-tit" className="productos-titulo fw-bold">
            Busquemos el modelo adecuado para tus necesidades
          </h2>
          <p className="pd-serie__bajada">
            Seis configuraciones de serie según cómo cargues y descargues. Todas
            se fabrican a medida de tu operación.
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
    </div>
  );
};

export default Productos;
