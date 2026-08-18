import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import productoService from "../services/productos.service.js"; // ← con .js
import "./DetalleProducto.css";

const imagenesPorModelo = {
  1: "valvuladecargaydescarga.webp",
  2: "polleradecierrrevalvuladedescarga.webp",
  3: "bocaabiertavalvuladedescarga.webp",
  4: "valvuladecargafondociego.webp",
  5: "polleradecierrefondociego.webp",
  6: "bocaabiertafondociego.webp",
};

const informacionAdicionalPorModelo = {
  1: { titulo: "VÁLVULA DE CARGA Y DESCARGA", superSacksTubular: { caracteristicas: ["Sin costura lateral", "Ancho estándar de 90cm x 90 cm", "Altura adaptable al pedido"] }, superSacksPlano: { caracteristicas: ["4 costuras laterales", "Ancho variable según pedido", "Altura variable según pedido"] } },
  2: { titulo: "POLLERA DE CIERRE Y VÁLVULA DE DESCARGA", superSacksTubular: { caracteristicas: ["Sin costura lateral", "Ancho estándar de 90cm x 90 cm", "Altura adaptable al pedido"] }, superSacksPlano: { caracteristicas: ["4 costuras laterales", "Ancho variable según pedido", "Altura variable según pedido"] } },
  3: { titulo: "BOCA ABIERTA CON VÁLVULA DE DESCARGA", superSacksTubular: { caracteristicas: ["Sin costura lateral", "Ancho estándar de 90cm x 90 cm", "Altura adaptable al pedido"] }, superSacksPlano: { caracteristicas: ["4 costuras laterales", "Ancho variable según pedido", "Altura variable según pedido"] } },
  4: { titulo: "VÁLVULA DE CARGA CON FONDO CIEGO", superSacksTubular: { caracteristicas: ["Sin costura lateral", "Ancho estándar de 90cm x 90 cm", "Altura adaptable al pedido"] }, superSacksPlano: { caracteristicas: ["4 costuras laterales", "Ancho variable según pedido", "Altura variable según pedido"] } },
  5: { titulo: "POLLERA DE CIERRE CON FONDO CIEGO", superSacksTubular: { caracteristicas: ["Sin costura lateral", "Ancho estándar de 90cm x 90 cm", "Altura adaptable al pedido"] }, superSacksPlano: { caracteristicas: ["4 costuras laterales", "Ancho variable según pedido", "Altura variable según pedido"] } },
  6: { titulo: "BOCA ABIERTA CON FONDO CIEGO", superSacksTubular: { caracteristicas: ["Sin costura lateral", "Ancho estándar de 90cm x 90 cm", "Altura adaptable al pedido"] }, superSacksPlano: { caracteristicas: ["4 costuras laterales", "Ancho variable según pedido", "Altura variable según pedido"] } }
};

const dimensionesPorModelo = {
  1: { w: 277, h: 357 },
  2: { w: 316, h: 358 },
  3: { w: 303, h: 368 },
  4: { w: 316, h: 342 },
  5: { w: 303, h: 376 },
  6: { w: 297, h: 335 },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const data = await productoService.obtenerPorId(id);
        setProducto(data);
      } catch (error) {
        console.error("❌ Error al cargar el producto:", error.message);
      }
    };
    cargarProducto();
  }, [id]);

  if (!producto) {
    return <section className="container pt-4 pb-5">Cargando producto... ⏳</section>;
  }

  const modelo = producto.caracteristicasGenerales?.id_tipo;
  const nombreImagen = imagenesPorModelo[modelo] || "default.webp";
  const imagenSrc = `/images/${nombreImagen}`;
  const infoAdicional = informacionAdicionalPorModelo[modelo];
  const dim = dimensionesPorModelo[modelo] || { w: 300, h: 355 };

  return (
    <motion.section
      className="container pt-4 pb-5 producto-detalle-page"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.15 } } }}
    >
      <div className="row">
        {/* Columna izquierda - Imagen */}
        <motion.div className="col-md-6" variants={fadeUp}>
          <h1 className="mb-2 mt-0 detalle-titulo" style={{ color: "#004aad" }}>
            MODELO SS {modelo}
          </h1>
          <div className="text-center mb-4">
            <motion.img
              src={imagenSrc}
              alt={producto.caracteristicasGenerales?.producto_nombre}
              width={dim.w}
              height={dim.h}
              style={{ maxHeight: "400px", objectFit: "contain", width: "100%", maxWidth: "400px", height: "auto" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Columna derecha - Información adicional */}
        <motion.div className="col-md-6" variants={fadeUp}>
          {infoAdicional && (
            <>
              <div
                className="p-3 mb-4 border rounded shadow"
                style={{ backgroundColor: "#F8F9FA", borderColor: "#ffd500", borderWidth: "2px" }}
              >
                <h3 className="text-center mb-0" style={{ color: "#004aad", fontWeight: "bold" }}>
                  {infoAdicional.titulo}
                </h3>
              </div>

              {/* Super sacks tubular */}
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <div className="p-3 rounded" style={{ backgroundColor: "#ffd500" }}>
                  <h5 className="mb-0" style={{ color: "#000" }}>Super sacks tubular:</h5>
                </div>
                <div className="p-3 border border-top-0" style={{ backgroundColor: "#E8E7F3" }}>
                  {infoAdicional.superSacksTubular.caracteristicas.map((car, idx) => (
                    <p key={idx} className="mb-1">{car}</p>
                  ))}
                </div>
              </motion.div>

              {/* Super sacks plano */}
              <motion.div className="mt-3" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <div className="p-3 rounded-top" style={{ backgroundColor: "#ffd500" }}>
                  <h5 className="mb-0" style={{ color: "#000" }}>Super sacks plano:</h5>
                </div>
                <div className="p-3 border border-top-0 rounded-bottom" style={{ backgroundColor: "#E8E7F3" }}>
                  {infoAdicional.superSacksPlano.caracteristicas.map((car, idx) => (
                    <p key={idx} className="mb-1">{car}</p>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>

      {/* Detalle de producto */}
      <motion.div className="row mt-5" variants={fadeUp}>
        <div className="col-12">
          <motion.div className="p-4 border rounded shadow bg-light" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            <h4 className="mb-4 text-center">Detalle de producto</h4>
            <div className="row">
              <div className="col-md-4">
                <p><strong>Material:</strong> {producto.material}</p>
                <p><strong>Color:</strong> {producto.color}</p>
                <p><strong>Tipo de Costuras:</strong> {producto.tipoCostura}</p>
              </div>
              <div className="col-md-4">
                <p><strong>Tipo de Tejido:</strong> {producto.tipoTejido}</p>
                <p><strong>Forro Interior:</strong> {producto.forroInterior}</p>
                <p><strong>Paleta Recomendada (Cm):</strong> {producto.paletaRecomendada}</p>
              </div>
              <div className="col-md-4">
                <p><strong>Largo x Ancho Interno (Cm):</strong> {producto.dimensionesInternas}</p>
                <p><strong>Altura Interna (Cm):</strong> {producto.altura}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Contactanos CTA */}
      <motion.section className="cta-contacto mt-5" variants={fadeUp}>
        <motion.div className="cta-card" whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
          <h3 className="cta-title">¿Tenés dudas o querés cotizar este modelo?</h3>
          <p className="cta-subtitle">
            Nuestro equipo te asesora para definir medidas, telas y terminaciones.
          </p>
          <div className="cta-actions">
            <Link to="/contacto" className="btn btn-cta">Contactanos</Link>
          </div>
        </motion.div>
      </motion.section>
    </motion.section>
  );
};

export default ProductoDetalle;
