import sectoresRepository from "../repositories/sectoresRepository.js"; // Ajustá la ruta si es diferente

class SectoresService {
  // Método para obtener los sectores ordenados para un select
  async obtenerOpcionesParaSelect() {
    return sectoresRepository.obtenerTodasOrdenadas();
  }
}

export default new SectoresService();