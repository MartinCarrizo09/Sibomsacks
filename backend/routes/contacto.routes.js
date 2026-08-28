// contacto.routes.js
import express from "express";
import ContactoService from "../services/contactoService.js";
import { enviarCorreoContacto } from "../utils/email.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      empresa,
      nombre,
      apellido,
      correo,
      telefono,
      id_sector,
      id_provincia,
      mensaje
    } = req.body;

    /* El formulario de la web pide lo mínimo para poder responder: nombre,
       una vía de contacto, sector y mensaje. La provincia se conversa
       después, y el contacto puede ser correo O teléfono, no ambos. */
    if (!nombre || !id_sector || !mensaje) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    if (!correo && !telefono) {
      return res
        .status(400)
        .json({ error: "Hace falta un correo o un teléfono" });
    }

    // Guardar en DB
    await ContactoService.guardarContacto({
      empresa,
      nombre,
      apellido,
      correo,
      telefono,
      id_sector,
      id_provincia,
      mensaje
    });

    // Enviar el correo
    console.log("Llamando a enviarCorreoContacto...");
    await enviarCorreoContacto({
      empresa,
      nombre,
      apellido,
      correo,
      telefono,
      id_sector,
      id_provincia,
      mensaje
    });

    res.status(201).json({ mensaje: "Mensaje recibido correctamente" });
  } catch (error) {
    console.error("❌ Error al procesar el contacto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
