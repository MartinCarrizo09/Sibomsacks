/**
 * Capa de acceso al backend.
 *
 * Un solo lugar donde se arman las peticiones: si cambia la ruta base o el
 * manejo de errores, se toca acá y no en cada página.
 */

const BASE = import.meta.env.VITE_API_URL ?? "";

async function pedir(ruta, opciones = {}) {
  let respuesta;
  try {
    respuesta = await fetch(`${BASE}${ruta}`, {
      headers: { "Content-Type": "application/json" },
      ...opciones,
    });
  } catch {
    // Falla de red: el servidor no respondió (sin conexión, CORS, caído)
    throw new Error("No pudimos conectarnos. Revisá tu conexión e intentá de nuevo.");
  }

  if (!respuesta.ok) {
    throw new Error(`El servidor respondió ${respuesta.status}.`);
  }
  return respuesta.json();
}

export const api = {
  productos: () => pedir("/api/productos"),
  producto: (id) => pedir(`/api/productos/${id}`),
  provincias: () => pedir("/api/provincias"),
  sectores: () => pedir("/api/sectores"),
  enviarContacto: (datos) =>
    pedir("/api/contacto", { method: "POST", body: JSON.stringify(datos) }),
};

export default api;
