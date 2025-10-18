import React, { useState, useEffect } from "react";
import axios from "../services/axios.config";
import { motion } from "framer-motion";
import "./Contacto.css";

function Contacto() {
  const [formData, setFormData] = useState({
    empresa: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    mensaje: "",
    id_provincia: "",
    id_sector: "",
  });

  const [provincias, setProvincias] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [mensajeEstado, setMensajeEstado] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [resProvincias, resSectores] = await Promise.all([
          axios.get("/api/provincias"),
          axios.get("/api/sectores"),
        ]);
        setProvincias(resProvincias.data);
        setSectores(resSectores.data);
      } catch (error) {
        console.error("Error al cargar provincias o sectores", error);
      }
    };
    fetchDatos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const valorFinal =
      name === "id_provincia" || name === "id_sector" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: valorFinal }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensajeEstado(null);

    try {
      await axios.post("/api/contacto", formData);
      setMensajeEstado({ tipo: "exito", texto: "✅ Mensaje enviado correctamente." });
      setFormData({
        empresa: "",
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        mensaje: "",
        id_provincia: "",
        id_sector: "",
      });
    } catch (error) {
      console.error(error);
      setMensajeEstado({ tipo: "error", texto: "❌ Hubo un error al enviar el mensaje." });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="container pt-4 pb-5 contacto-page">
      <motion.h2
        className="mb-3 text-white text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contáctenos, envíenos su especificación y solicite su presupuesto o
        información detallada.
      </motion.h2>

      <motion.p
        className="mb-4 text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Gracias a nuestra experiencia demostrada, garantizamos a nuestros
        clientes el diseño, producción y entrega de cualquier Big Bag que puedan
        necesitar para sus propósitos.
      </motion.p>

      <div className="d-flex justify-content-center mb-4">
        <motion.h2
          className="titulo-formulario"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Formulario de Contacto
        </motion.h2>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="form-contacto-animado"
        noValidate
      >
        <div className="mb-3">
          <label className="form-label">Empresa</label>
          <input
            type="text"
            name="empresa"
            className="form-control"
            value={formData.empresa}
            onChange={handleChange}
            autoComplete="organization"
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
              required
              autoComplete="given-name"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              name="apellido"
              className="form-control"
              value={formData.apellido}
              onChange={handleChange}
              required
              autoComplete="family-name"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              name="correo"
              className="form-control"
              value={formData.correo}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              className="form-control"
              value={formData.telefono}
              onChange={handleChange}
              required
              autoComplete="tel"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Provincia</label>
            <select
              name="id_provincia"
              className="form-select"
              value={formData.id_provincia}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar provincia</option>
              {provincias.map((provincia) => (
                <option key={provincia.id} value={provincia.id}>
                  {provincia.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Sector</label>
            <select
              name="id_sector"
              className="form-select"
              value={formData.id_sector}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar sector</option>
              {sectores.map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Mensaje</label>
          <textarea
            name="mensaje"
            className="form-control"
            rows={5}
            value={formData.mensaje}
            onChange={handleChange}
            required
          />
        </div>

        {mensajeEstado && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`alert alert-${mensajeEstado.tipo === "exito" ? "success" : "danger"}`}
          >
            {mensajeEstado.texto}
          </motion.div>
        )}

        <motion.button
          type="submit"
          className="btn btn-primary"
          disabled={enviando}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          {enviando ? "Enviando..." : "Enviar"}
        </motion.button>
      </motion.form>
    </section>
  );
}
  
export default Contacto;
