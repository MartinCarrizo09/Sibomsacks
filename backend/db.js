import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";
import { format } from "sql-formatter";

// Ruta dinámica para usar __dirname con ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorio de las bases SQLite. En Railway apunta al volumen montado.
const DATA_DIR = process.env.SQLITE_DATA_DIR || path.join(__dirname, "data");

// Logger SQL personalizado
const customLogger = (label) => (sql) => {
  try {
    const clean = sql.replace("Executing (default): ", "");
    if (!clean.includes("$") && !clean.includes("?")) {
      console.log(`\n📝 ${label} ejecutado:\n${format(clean)}`);
    } else {
      console.log(`\n🔍 ${label}:\n${clean}`);
    }
  } catch (error) {
    console.warn("⚠️ Error en el logger personalizado:", error.message);
    console.log(sql);
  }
};

// Conexión para productos
const dbProductos = new Sequelize({
  dialect: "sqlite",
  storage: path.join(DATA_DIR, "producto.sqlite"),
  logging: customLogger("SQL Productos"),
});

// Conexión para contactos
const dbContactos = new Sequelize({
  dialect: "sqlite",
  storage: path.join(DATA_DIR, "contacto.sqlite"),
  logging: customLogger("SQL Contactos"),
});

// Funciones opcionales para habilitar/deshabilitar logs
function enableDbLog() {
  dbProductos.options.logging = customLogger("SQL Productos");
  dbContactos.options.logging = customLogger("SQL Contactos");
}

function disableDbLog() {
  dbProductos.options.logging = false;
  dbContactos.options.logging = false;
}

// 🔁 Exportar ambas conexiones y helpers
export {
  dbProductos,
  dbContactos,
  enableDbLog,
  disableDbLog
};
