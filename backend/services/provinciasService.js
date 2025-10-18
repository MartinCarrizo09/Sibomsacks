import provinciasRepository from "../repositories/provinciasRepository.js"; // Ajustá la ruta si es diferente

class ProvinciasService {
  // Método para obtener las provincias ordenadas para un select
  async obtenerOpcionesParaSelect() {
    return provinciasRepository.obtenerTodasOrdenadas();
  }
}

export default new ProvinciasService();