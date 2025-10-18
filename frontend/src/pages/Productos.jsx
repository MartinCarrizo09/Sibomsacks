import React, { useEffect, useState } from "react";
import productoService from "../services/productos.service.js";
import { useNavigate } from "react-router-dom";
import "./Productos.css";

const imagenesPorModelo = {
  1: "valvuladecargaydescarga.png",
  2: "polleradecierrrevalvuladedescarga.png",
  3: "bocaabiertavalvuladedescarga.png",
  4: "valvuladecargafondociego.png",
  5: "polleradecierrefondociego.png",
  6: "bocaabiertafondociego.png",
};

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

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

  const irADetalle = (id) => navigate(`/productos/${id}`);
  const onKeyOpen = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      irADetalle(id);
    }
  };

  return (
    <section className="container pt-4 pb-5 productos-page">
      <h2 className="mb-4 text-center fw-bold">Conocé nuestros productos</h2>

      <div className="row g-4">
        {productos.map((producto) => {
          const modelo = producto.caracteristicasGenerales?.id_tipo;
          const nombreImagen = imagenesPorModelo[modelo] || "default.png";
          const imagenSrc = `/images/${nombreImagen}`;
          const titulo =
            producto.caracteristicasGenerales?.producto_nombre || "Sin nombre";
          const tipo = producto.caracteristicasGenerales?.tipo || "N/A";

          return (
            <div className="col-12 col-sm-6 col-lg-4" key={producto.id}>
              <div
                className="card product-card h-100 border-0 rounded shadow-sm"
                role="button"
                tabIndex={0}
                aria-label={`Ver detalle de ${titulo}`}
                onClick={() => irADetalle(producto.id)}
                onKeyDown={(e) => onKeyOpen(e, producto.id)}
              >
                <img
                  src={imagenSrc}
                  alt={`Big Bag modelo ${modelo} - ${titulo}`}
                  className="product-image"
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
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Productos;
