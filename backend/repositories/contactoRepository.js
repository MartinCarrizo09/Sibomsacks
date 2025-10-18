import RepositorioBase from "./repositorioBase.js";
import { Contacto } from "../models/index.js"; // Asegúrate de que el path sea correcto

class ContactoRepository extends RepositorioBase {
  constructor() {
    super(Contacto);
  }
}

export default new ContactoRepository();