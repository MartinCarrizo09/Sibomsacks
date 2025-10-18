import { dbProductos, dbContactos } from "../db.js"; // Asegúrate de que estas instancias estén correctamente exportadas en db.js

// 🧱 Modelos
import Producto from "./producto.js";
import CaracteristicasGenerales from "./caracteristicasGenerales.js";
import Contacto from "./contacto.js";
import Provincia from "./provincia.js";
import Sector from "./sector.js";

// 🔗 Asociaciones

// Producto 1:1 Características (por nombre)
Producto.hasOne(CaracteristicasGenerales, {
  foreignKey: "producto_nombre",
  sourceKey: "nombre",
  as: "caracteristicasGenerales",
});
CaracteristicasGenerales.belongsTo(Producto, {
  foreignKey: "producto_nombre",
  targetKey: "nombre",
});


// Sector y Provincia 1:N con Contacto
Sector.hasMany(Contacto, { foreignKey: "id_sector" });
Provincia.hasMany(Contacto, { foreignKey: "id_provincia" });

Contacto.belongsTo(Sector, { foreignKey: "id_sector" });
Contacto.belongsTo(Provincia, { foreignKey: "id_provincia" });

// 🔁 Sincronización (solo si querés validar que funcione, no borra nada)
(async function syncModels() {
  try {
    await dbProductos.authenticate();
    await dbContactos.authenticate();
    console.log("✅ Conexión establecida correctamente.");

    // Sincronizar modelos
    await dbProductos.sync(); // Sincroniza modelos relacionados con productos
    await dbContactos.sync(); // Sincroniza modelos relacionados con contactos
    console.log("🗂️ Modelos sincronizados.");
  } catch (error) {
    console.error("❌ Error al conectar o sincronizar:", error);
  }
})();

// Exportar modelos y bases de datos
export {
  dbProductos,
  dbContactos,
  Producto,
  CaracteristicasGenerales,
  Contacto,
  Provincia,
  Sector,
};
