import express from "express";
import cors from "cors";
import logger from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { dbProductos } from "./models/index.js";

// Importar rutas
import productoRoutes from "./routes/producto.routes.js";
import provinciasRoutes from "./routes/provincias.routes.js";
import sectoresRoutes from "./routes/sectores.routes.js";
import contactoRoutes from "./routes/contacto.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// URL publica del sitio. En Railway se resuelve sola con RAILWAY_PUBLIC_DOMAIN.
const PUBLIC_BASE_URL = (
  process.env.PUBLIC_BASE_URL ||
  (process.env.RAILWAY_PUBLIC_DOMAIN
    ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
    : `http://localhost:${PORT}`)
).replace(/\/+$/, "");

// __dirname para ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// robots.txt dinámico
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /

Sitemap: ${PUBLIC_BASE_URL}/sitemap.xml`);
});

// sitemap.xml dinámico
const RUTAS_SITEMAP = [
  "/",
  "/productos",
  "/productos/1",
  "/productos/2",
  "/productos/3",
  "/productos/4",
  "/productos/5",
  "/productos/6",
  "/contacto",
  "/sobre-nosotros",
  "/beneficios"
];

app.get('/sitemap.xml', (req, res) => {
  const urls = RUTAS_SITEMAP
    .map((ruta) => `  <url><loc>${PUBLIC_BASE_URL}${ruta === "/" ? "/" : ruta}</loc></url>`)
    .join("\n");

  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`);
});

// Middlewares
// Origenes permitidos: locales + el dominio publico propio + los que se agreguen
// por la variable CORS_ORIGINS (separados por coma).
const allowedOrigins = [
  "http://localhost:5173",   // frontend actual (Vite)
  "http://localhost:5174",   // frontend-v2 (Vite)
  "http://localhost:3000",
  PUBLIC_BASE_URL,
  ...(process.env.CORS_ORIGINS || "")
    .split(",")
    .map((o) => o.trim().replace(/\/+$/, ""))
    .filter(Boolean)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin.replace(/\/+$/, ""))) {
      callback(null, true);
    } else {
      console.warn("❌ Origin bloqueado por CORS:", origin);
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true
}));

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(logger("dev"));

// Archivos públicos (favicon, etc.)
app.use(express.static(path.join(__dirname, "public")));

// API
app.use("/api/provincias", provinciasRoutes);
app.use("/api/sectores", sectoresRoutes);
app.use("/api/contacto", contactoRoutes);
app.use("/api/productos", productoRoutes);

// Frontend SPA
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

// ⚠️ El catch-all debe ir al final, después de TODO
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Iniciar servidor
(async function start() {
  try {
    await dbProductos.authenticate();
    console.log("✅ Conexión a la base de datos establecida.");
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:\n", error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
})();
