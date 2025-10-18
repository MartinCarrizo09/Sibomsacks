import Producto from "../models/producto.js";
import CaracteristicasGenerales from "../models/caracteristicasGenerales.js";
import RepositorioBase from "./repositorioBase.js";
import { Op } from "sequelize";

class ProductoRepository extends RepositorioBase {
    constructor() {
        super(Producto);
    }

    async obtenerTodos({ pagina = 1, limite = 10} = {}) {
        const offset = (pagina - 1) * limite; 
        return this.modelo.findAll({
            limit: limite, 
            offset,
            include: {
                model: CaracteristicasGenerales,
                as: "caracteristicasGenerales"
            }
        });
    }

    async obtenerPorId(id) {
        return this.modelo.findByPk(id, {
            include: {
                model: CaracteristicasGenerales,
                as: "caracteristicasGenerales"
            }
        });
    }

    async buscarPorNombreExacto(nombre) {
        return this.modelo.findOne({
            where: {
                nombre: { [Op.eq]: nombre}
            }
        });
    }
}

export default new ProductoRepository();