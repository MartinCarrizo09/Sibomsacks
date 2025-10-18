import productoRepository from "../repositories/productoRepository.js";

class ProductoService {
    async obtenerTodos({ pagina = 1, limite = 10} = {}) {
        const productos = await productoRepository.obtenerTodos({ pagina, limite});
        return productos.map(this.#convertirSalida);
    }

    async obtenerPorId(id) {
        const producto = await productoRepository.obtenerPorId(id);
        return producto ? this.#convertirSalida(producto) : null;
    }

    #convertirSalida(producto) {
    const obj = producto.toJSON();
    return obj;
    }

    // validaciones

    async #validarNombreUnico (nombre, idActual = null) {
        const existe = await productoRepository.buscarPorNombreExacto(nombre);
        if (existe && (!idActual || existe.id !== idActual)) {
            throw new Error(`Ya existe un producto con el nombre "${nombre}".`);
        }
    }
}

export default new ProductoService();