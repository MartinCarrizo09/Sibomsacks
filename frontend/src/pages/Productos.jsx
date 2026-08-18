import React, { useEffect, useState } from "react";
import productoService from "../services/productos.service.js";
import { Link } from "react-router-dom";
import "./Productos.css";

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
    <section className="container pt-4 pb-5 productos-page">
      <h1 className="mb-4 text-center fw-bold productos-titulo">Conocé nuestros productos</h1>

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
                  <h5 className="card-title fw-semibold mb-1">{titulo}</h5>
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
  );
};

export default Productos;
