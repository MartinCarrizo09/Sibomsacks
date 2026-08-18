/**
 * Datos de contacto del negocio, en un solo lugar.
 * Cambiar un teléfono acá lo cambia en todo el sitio.
 */

export const TELEFONO = "(0351) 155 081 014";
export const TELEFONO_LINK = "tel:+543511155081014";

export const HORARIO = "Lunes a viernes, 8:00 a 15:30 hs.";

const WHATSAPP_NUMERO = "5493516622764";
const WHATSAPP_MENSAJE =
  "Hola, me gustaría recibir asesoramiento sobre Big Bags. Los contacto desde la web. ¡Gracias!";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
  WHATSAPP_MENSAJE
)}`;

/** Arma un enlace de WhatsApp con un mensaje propio (ej. desde un modelo). */
export function whatsappCon(mensaje) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}
