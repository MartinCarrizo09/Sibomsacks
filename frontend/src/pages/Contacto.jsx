import React, { useState, useEffect, useRef } from "react";
import axios from "../services/axios.config";
import { motion } from "framer-motion";
import { useMotionSafe } from "../hooks/useMotionSafe.js";
import "./Contacto.css";

const FORM_VACIO = {
  empresa: "",
  nombre: "",
  apellido: "",
  correo: "",
  telefono: "",
  mensaje: "",
  id_provincia: "",
  id_sector: "",
};

/** Devuelve un objeto { campo: mensaje } con los errores encontrados. */
function validar(datos) {
  const errores = {};

  if (!datos.nombre.trim()) errores.nombre = "Ingresá tu nombre.";
  if (!datos.apellido.trim()) errores.apellido = "Ingresá tu apellido.";

  if (!datos.correo.trim()) {
    errores.correo = "Ingresá tu correo electrónico.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.correo.trim())) {
    errores.correo = "Revisá el correo: falta el @ o el dominio.";
  }

  if (!datos.id_provincia) errores.id_provincia = "Elegí tu provincia.";
  if (!datos.id_sector) errores.id_sector = "Elegí tu sector.";

  if (!datos.mensaje.trim()) {
    errores.mensaje = "Contanos qué necesitás.";
  } else if (datos.mensaje.trim().length < 10) {
    errores.mensaje = "Escribí al menos 10 caracteres para que podamos ayudarte.";
  }

  return errores;
}

function Contacto() {
  const [formData, setFormData] = useState(FORM_VACIO);
  const [errores, setErrores] = useState({});
  const [provincias, setProvincias] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [mensajeEstado, setMensajeEstado] = useState(null);

  const estadoRef = useRef(null);
  const { reducir, escala } = useMotionSafe();

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
        setMensajeEstado({
          tipo: "error",
          texto:
            "No pudimos cargar las provincias y sectores. Recargá la página o escribinos por WhatsApp.",
        });
      }
    };
    fetchDatos();
  }, []);

  // Mover el foco al aviso para que los lectores de pantalla lo anuncien.
  // En errores de validación el foco va al campo, no acá.
  useEffect(() => {
    if (mensajeEstado?.enfocar && estadoRef.current) estadoRef.current.focus();
  }, [mensajeEstado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const valorFinal =
      name === "id_provincia" || name === "id_sector" ? value : value;
    setFormData((prev) => ({ ...prev, [name]: valorFinal }));
    // Limpiar el error del campo apenas el usuario lo corrige.
    setErrores((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevosErrores = validar(formData);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setMensajeEstado({
        tipo: "error",
        texto: `Revisá ${Object.keys(nuevosErrores).length === 1 ? "el campo marcado" : "los campos marcados"} antes de enviar.`,
        enfocar: false,
      });
      const primero = document.getElementById(Object.keys(nuevosErrores)[0]);
      primero?.focus();
      return;
    }

    setEnviando(true);
    setMensajeEstado(null);

    try {
      await axios.post("/api/contacto", {
        ...formData,
        id_provincia: Number(formData.id_provincia),
        id_sector: Number(formData.id_sector),
      });
      setMensajeEstado({
        tipo: "exito",
        texto: "Mensaje enviado correctamente. Te respondemos a la brevedad.",
        enfocar: true,
      });
      setFormData(FORM_VACIO);
      setErrores({});
    } catch (error) {
      console.error(error);
      setMensajeEstado({
        tipo: "error",
        texto:
          "No pudimos enviar el mensaje. Probá de nuevo en unos minutos o escribinos por WhatsApp.",
        enfocar: true,
      });
    } finally {
      setEnviando(false);
    }
  };

  /** Props comunes de accesibilidad para cada control. */
  const propsCampo = (name, requerido = false) => ({
    id: name,
    name,
    value: formData[name],
    onChange: handleChange,
    "aria-required": requerido || undefined,
    "aria-invalid": errores[name] ? true : undefined,
    "aria-describedby": errores[name] ? `${name}-error` : undefined,
  });

  const Error = ({ name }) =>
    errores[name] ? (
      <p className="campo-error" id={`${name}-error`}>
        {errores[name]}
      </p>
    ) : null;

  return (
    <section className="container pt-4 pb-5 contacto-page">
      <motion.h1
        className="mb-3 text-white text-center"
        initial={reducir ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contáctenos, envíenos su especificación y solicite su presupuesto o
        información detallada.
      </motion.h1>

      <motion.p
        className="mb-4 text-white text-center"
        initial={reducir ? false : { opacity: 0 }}
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
          initial={reducir ? false : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Formulario de Contacto
        </motion.h2>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={reducir ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="form-contacto-animado"
        noValidate
        aria-describedby="form-ayuda"
      >
        <p className="form-ayuda" id="form-ayuda">
          Los campos marcados con <span aria-hidden="true">*</span>
          <span className="sr-only">asterisco</span> son obligatorios.
        </p>

        <div className="mb-3">
          <label className="form-label" htmlFor="empresa">
            Empresa
          </label>
          <input
            type="text"
            className="form-control"
            autoComplete="organization"
            {...propsCampo("empresa")}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="nombre">
              Nombre <span aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
              autoComplete="given-name"
              {...propsCampo("nombre", true)}
            />
            <Error name="nombre" />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="apellido">
              Apellido <span aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errores.apellido ? "is-invalid" : ""}`}
              autoComplete="family-name"
              {...propsCampo("apellido", true)}
            />
            <Error name="apellido" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="correo">
              Correo electrónico <span aria-hidden="true">*</span>
            </label>
            <input
              type="email"
              className={`form-control ${errores.correo ? "is-invalid" : ""}`}
              autoComplete="email"
              {...propsCampo("correo", true)}
            />
            <Error name="correo" />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="telefono">
              Teléfono <span className="campo-opcional">(opcional)</span>
            </label>
            <input
              type="tel"
              className="form-control"
              autoComplete="tel"
              inputMode="tel"
              {...propsCampo("telefono")}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="id_provincia">
              Provincia <span aria-hidden="true">*</span>
            </label>
            <select
              className={`form-select ${errores.id_provincia ? "is-invalid" : ""}`}
              {...propsCampo("id_provincia", true)}
            >
              <option value="">Seleccionar provincia</option>
              {provincias.map((provincia) => (
                <option key={provincia.id} value={provincia.id}>
                  {provincia.nombre}
                </option>
              ))}
            </select>
            <Error name="id_provincia" />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="id_sector">
              Sector <span aria-hidden="true">*</span>
            </label>
            <select
              className={`form-select ${errores.id_sector ? "is-invalid" : ""}`}
              {...propsCampo("id_sector", true)}
            >
              <option value="">Seleccionar sector</option>
              {sectores.map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.nombre}
                </option>
              ))}
            </select>
            <Error name="id_sector" />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="mensaje">
            Mensaje <span aria-hidden="true">*</span>
          </label>
          <textarea
            className={`form-control ${errores.mensaje ? "is-invalid" : ""}`}
            rows={5}
            {...propsCampo("mensaje", true)}
          />
          <Error name="mensaje" />
        </div>

        {/* Aviso de estado: anunciado por lectores de pantalla y enfocable. */}
        <div
          className="estado-envio"
          role="status"
          aria-live="polite"
          tabIndex={-1}
          ref={estadoRef}
        >
          {mensajeEstado && (
            <div
              className={`alert alert-${mensajeEstado.tipo === "exito" ? "success" : "danger"}`}
            >
              {mensajeEstado.texto}
            </div>
          )}
        </div>

        <motion.button
          type="submit"
          className="btn btn-primary"
          disabled={enviando}
          whileHover={escala({ scale: 1.05 })}
          whileTap={escala({ scale: 0.97 })}
        >
          {enviando ? "Enviando…" : "Enviar"}
        </motion.button>
      </motion.form>
    </section>
  );
}

export default Contacto;
