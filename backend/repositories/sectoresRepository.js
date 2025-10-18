import RepositorioBase from "./repositorioBase.js"; // Ajustá la ruta si es distinta
import { Sector } from "../models/index.js"; // Ajustá si lo exportás distinto

class SectoresRepository extends RepositorioBase {
  constructor() {
    super(Sector);
  }

  async buscarPorNombre(nombre) {
    return this.modelo.findOne({ where: { nombre } });
  }

  // Método adicional para obtener todos los sectores ordenados
  async obtenerTodasOrdenadas() {
    return this.modelo.findAll({
      order: [["nombre", "ASC"]],
      attributes: ["id", "nombre"], // Solo los campos necesarios
    });
  }
}

export default new SectoresRepository();