import RepositorioBase from "./repositorioBase.js"; // Ajustá la ruta si es diferente
import Provincia from "../models/provincia.js"; // Asegúrate de que este sea el path correcto al modelo

class ProvinciasRepository extends RepositorioBase {
  constructor() {
    super(Provincia);
  }

  // Método adicional para obtener todas las provincias ordenadas por nombre
  async obtenerTodasOrdenadas() {
    return this.modelo.findAll({
      order: [["nombre", "ASC"]],
      attributes: ["id", "nombre"], // Solo los campos necesarios
    });
  }
}

export default new ProvinciasRepository();