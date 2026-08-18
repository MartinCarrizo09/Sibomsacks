// email.js
import nodemailer from "nodemailer";
import { Provincia, Sector } from "../models/index.js";

// Configurar transportador SMTP con Gmail.
// Las credenciales se leen de variables de entorno, nunca del codigo fuente.
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_TO = process.env.CONTACT_TO || SMTP_USER;

if (!SMTP_USER || !SMTP_PASS) {
  console.warn(
    "⚠️  SMTP_USER / SMTP_PASS no configurados: el formulario de contacto " +
    "guardara los mensajes pero no enviara correos."
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

export async function enviarCorreoContacto({
  empresa,
  nombre,
  apellido,
  correo,
  telefono,
  id_sector,
  id_provincia,
  mensaje
}) {
  let provinciaNombre = `ID ${id_provincia}`;
  let sectorNombre = `ID ${id_sector}`;

  try {
    const provincia = await Provincia.findByPk(Number(id_provincia));
    if (provincia) provinciaNombre = provincia.nombre;
  } catch (e) {
    console.warn("No se pudo obtener la provincia:", e.message);
  }

  try {
    const sector = await Sector.findByPk(Number(id_sector));
    if (sector) sectorNombre = sector.nombre;
  } catch (e) {
    console.warn("No se pudo obtener el sector:", e.message);
  }

  const html = `
    <h2>Nuevo mensaje de contacto</h2>
    <ul>
      <li><strong>Empresa:</strong> ${empresa || "-"}</li>
      <li><strong>Nombre:</strong> ${nombre} ${apellido}</li>
      <li><strong>Correo:</strong> ${correo}</li>
      <li><strong>Teléfono:</strong> ${telefono || "-"}</li>
      <li><strong>Provincia:</strong> ${provinciaNombre}</li>
      <li><strong>Sector:</strong> ${sectorNombre}</li>
    </ul>
    <p><strong>Mensaje:</strong></p>
    <p>${mensaje}</p>
  `;

  const text = `
Nuevo mensaje de contacto:

Empresa: ${empresa || "-"}
Nombre: ${nombre} ${apellido}
Correo: ${correo}
Teléfono: ${telefono || "-"}
Provincia: ${provinciaNombre}
Sector: ${sectorNombre}
Mensaje: ${mensaje}
  `;

  if (!SMTP_USER || !SMTP_PASS) {
    console.warn("⚠️  Correo omitido: faltan SMTP_USER / SMTP_PASS.");
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: `"Formulario Web" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: correo,
      subject: "📩 Nuevo mensaje de contacto desde la web",
      text,
      html
    });

    console.log("✅ Correo enviado:", info.messageId);
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
    throw error;
  }
}
