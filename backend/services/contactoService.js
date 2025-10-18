import contactoRepository from "../repositories/contactoRepository.js"; // Ajustá la ruta si es diferente

class ContactoService {
  // Método para guardar un nuevo contacto
  async guardarContacto(datos) {
    return contactoRepository.crear(datos);
  }
}

export default new ContactoService();