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

// __dirname para ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// robots.txt dinámico
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /

Sitemap: https://sibomsacks-1-ytfc.onrender.com/sitemap.xml`);
});

// sitemap.xml dinámico
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://sibomsacks-1-ytfc.onrender.com/</loc></url>
  <url><loc>https://sibomsacks-1-ytfc.onrender.com/productos</loc></url>
  <url><loc>https://sibomsacks-1-ytfc.onrender.com/productos/1</loc></url>
  <url><loc>https://sibomsacks-1-ytfc.onrender.com/productos/2</loc></url>
  <url><loc>https://sibomsacks-1-ytfc.onrender.com/productos/3</loc></url>
  <url><loc>https://sibomsacks-1-ytfc.onrender.com/productos/4</loc></url>
  <url><loc>https://sibomsacks-1-ytfc.onrender.com/productos/5</loc></url>
  <url><loc>https://sibomsacks-1-ytfc.onrender.com/productos/6</loc></url>
  <url><loc>https://sibomsacks-1-ytfc.onrender.com/contacto</loc></url>
  <url><loc>https://sibomsacks-1-ytfc.onrender.com/sobre-nosotros</loc></url>
  <url><loc>https://sibomsacks-1-ytfc.onrender.com/beneficios</loc></url>
</urlset>`);
});

// Middlewares
const allowedOrigins = [
  "http://localhost:5173",
  "https://sibomsacks-1.onrender.com",
  "https://sibomsacks.onrender.com",
  "https://sibomsacks-1-ytfc.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("🛰️ Origin recibido:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
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
