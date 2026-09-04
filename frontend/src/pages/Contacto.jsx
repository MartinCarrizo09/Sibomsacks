import React, { useEffect, useRef, useState } from "react";
import axios from "../services/axios.config";
import { motion } from "framer-motion";
import { useMotionSafe } from "../hooks/useMotionSafe.js";
import "./Contacto.css";
import Seo from "../components/Seo.jsx";

/**
 * Contacto — formulario mínimo.
 *
 * La apuesta es que cuantos menos campos, más gente lo completa: se piden
 * sólo los cuatro datos indispensables para poder responder.
 *
 * Al enviar pasan dos cosas, en este orden:
 *   1. POST a /api/contacto, que guarda en la base y dispara el mail.
 *   2. Se abre WhatsApp con el pedido ya redactado.
 * El paso 2 no depende del 1: si el backend está caído, el pedido igual
 * llega por WhatsApp. Por eso el orden importa.
 */

/** El WhatsApp del sitio, el mismo del header y el footer. */
const WHATSAPP = "5493515081014";

const FORM_VACIO = {
  nombre: "",
  contacto: "",
  id_sector: "",
  mensaje: "",
};

/** Devuelve { campo: mensaje } con los errores encontrados. */
function validar(d) {
  const e = {};
  if (!d.nombre.trim()) e.nombre = "Decinos cómo te llamás.";
  if (!d.contacto.trim()) {
    e.contacto = "Dejanos un teléfono o un correo.";
  } else if (
    // Alcanza con que parezca un correo o un teléfono: no se valida de más.
    !/@/.test(d.contacto) &&
    (d.contacto.replace(/\D/g, "").length < 8)
  ) {
    e.contacto = "Revisá el teléfono o el correo.";
  }
  if (!d.id_sector) e.id_sector = "Elegí tu sector.";
  if (!d.mensaje.trim()) e.mensaje = "Contanos qué necesitás.";
  return e;
}

/** Arma el texto de la consulta que se manda por WhatsApp.
 *  Es el unico canal: no se envia correo, asi que el mensaje tiene que
 *  llevar todo lo necesario para responder sin volver a preguntar. */
function armarMensaje(d, sectorNombre) {
  const esCorreo = /@/.test(d.contacto);
  const fecha = new Date().toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const l = ["*NUEVA CONSULTA — sibomsacks.com.ar*", ""];
  l.push(`*Nombre:* ${d.nombre}`);
  l.push(`*${esCorreo ? "Correo" : "Teléfono"}:* ${d.contacto}`);
  if (sectorNombre) l.push(`*Sector:* ${sectorNombre}`);
  l.push(`*Fecha:* ${fecha}`);
  l.push("");
  l.push("*Qué necesita:*");
  l.push(d.mensaje.trim());
  return l.join("\n");
}

const Contacto = () => {
  const { reducir, cardVariant, staggerContainer } = useMotionSafe();

  const [form, setForm] = useState(FORM_VACIO);
  const [errores, setErrores] = useState({});
  const [sectores, setSectores] = useState([]);
  const [estado, setEstado] = useState({ tipo: "", texto: "" });
  const primerError = useRef(null);

  /* Los sectores vienen de la API: son los mismos que usa el resto del sitio. */
  useEffect(() => {
    let vivo = true;
    axios
      .get("/api/sectores")
      .then(({ data }) => {
        if (vivo) setSectores(data);
      })
      .catch(() => {
        if (!vivo) return;
        /* Si la API no responde, el formulario sigue sirviendo: el pedido
           puede irse igual por WhatsApp. */
        setEstado({
          tipo: "aviso",
          texto:
            "No pudimos cargar los sectores. Podés escribirnos igual por WhatsApp.",
        });
      });
    return () => {
      vivo = false;
    };
  }, []);

  const cambiar = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    /* El error se limpia al corregir, no al enviar de nuevo. */
    setErrores((x) => (x[name] ? { ...x, [name]: undefined } : x));
  };

  const enviar = async (e) => {
    e.preventDefault();

    const errs = validar(form);
    setErrores(errs);
    if (Object.keys(errs).length) {
      primerError.current?.focus();
      return;
    }

    const sectorNombre =
      sectores.find((s) => String(s.id) === String(form.id_sector))?.nombre ||
      "";

    /* La consulta va por WhatsApp, que es el canal que usa la empresa.
       No se guarda en la base ni se manda correo: si el mensaje no llegara
       a salir, queda en el WhatsApp del propio visitante y puede reenviarlo. */
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
      armarMensaje(form, sectorNombre)
    )}`;
    window.open(url, "_blank", "noopener");

    setEstado({
      tipo: "listo",
      texto: "Se abrió WhatsApp con tu consulta. Tocá enviar y nos llega.",
    });
    setForm(FORM_VACIO);
  };

  const subir = reducir
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (


    <>

      <Seo

        titulo="Cotizá tus Big Bags en Córdoba | Contacto Sibom Sacks"

        descripcion="Pedí presupuesto de Big Bags a medida. Respondemos por WhatsApp al 351 662-2764 o por el formulario. Envíos a todo el país desde Córdoba."

        ruta="/contacto"

      />
    <div className="ct">
      <section className="ct-panel">
        <motion.div
          className="ct-in"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.p className="ct-eyebrow" variants={cardVariant}>
            <span className="ct-eyebrow__linea" aria-hidden="true" />
            Contacto
          </motion.p>

          <motion.h1 className="ct-titulo" variants={cardVariant}>
            <span className="ct-titulo__ln">Escribinos y</span>
            <span className="ct-titulo__ln">
              lo <span className="ct-titulo__calado">resolvemos</span>
            </span>
          </motion.h1>

          <motion.p className="ct-bajada" variants={cardVariant}>
            Cuatro datos y listo. Si preferís, escribinos directo por WhatsApp.
          </motion.p>

          <motion.form className="ct-form" onSubmit={enviar} noValidate variants={subir}>
            <label className="ct-campo">
              <span>
                Nombre <b aria-hidden="true">*</b>
              </span>
              <input
                name="nombre"
                value={form.nombre}
                onChange={cambiar}
                placeholder="Juan Pérez"
                autoComplete="name"
                ref={errores.nombre ? primerError : null}
                aria-invalid={!!errores.nombre}
                aria-describedby={errores.nombre ? "err-nombre" : undefined}
              />
              {errores.nombre && (
                <em className="ct-error" id="err-nombre">
                  {errores.nombre}
                </em>
              )}
            </label>

            <label className="ct-campo">
              <span>
                Teléfono o correo <b aria-hidden="true">*</b>
              </span>
              <input
                name="contacto"
                value={form.contacto}
                onChange={cambiar}
                placeholder="351 155 0000"
                autoComplete="tel"
                aria-invalid={!!errores.contacto}
                aria-describedby={errores.contacto ? "err-contacto" : undefined}
              />
              {errores.contacto && (
                <em className="ct-error" id="err-contacto">
                  {errores.contacto}
                </em>
              )}
            </label>

            <label className="ct-campo">
              <span>
                Sector <b aria-hidden="true">*</b>
              </span>
              <select
                name="id_sector"
                value={form.id_sector}
                onChange={cambiar}
                aria-invalid={!!errores.id_sector}
                aria-describedby={errores.id_sector ? "err-sector" : undefined}
              >
                <option value="">Elegí tu sector</option>
                {sectores.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nombre}
                  </option>
                ))}
              </select>
              {errores.id_sector && (
                <em className="ct-error" id="err-sector">
                  {errores.id_sector}
                </em>
              )}
            </label>

            <label className="ct-campo">
              <span>
                Qué necesitás <b aria-hidden="true">*</b>
              </span>
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={cambiar}
                placeholder="Ej: 500 bolsones de 1000 kg para mover maíz."
                aria-invalid={!!errores.mensaje}
                aria-describedby={errores.mensaje ? "err-mensaje" : undefined}
              />
              {errores.mensaje && (
                <em className="ct-error" id="err-mensaje">
                  {errores.mensaje}
                </em>
              )}
            </label>

            <button className="ct-btn" type="submit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7 0-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z" />
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
              </svg>
              Enviar por WhatsApp
            </button>

            {estado.texto && (
              <p className={`ct-estado ct-estado--${estado.tipo}`} role="status">
                {estado.texto}
              </p>
            )}
          </motion.form>

          <motion.div className="ct-directo" variants={subir}>
            <p>¿Preferís escribir vos?</p>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
              </svg>
              Abrir WhatsApp directo
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>

    </>
  );
};

export default Contacto;
