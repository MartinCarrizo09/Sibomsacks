import { DataTypes, Model } from "sequelize";
import { dbContactos } from "../db.js"; // Cambiado para usar dbContactos
import Sector from "./sector.js";
import Provincia from "./provincia.js";

class Contacto extends Model {}

Contacto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    empresa: {
      type: DataTypes.TEXT
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    /* Opcionales desde que el formulario de la web pide sólo lo mínimo:
       el nombre puede venir completo en un campo y el contacto puede ser
       correo o teléfono, no necesariamente los dos. */
    apellido: {
      type: DataTypes.TEXT
    },
    correo: {
      type: DataTypes.TEXT
    },
    telefono: {
      type: DataTypes.TEXT
    },
    id_sector: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Sector,
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    /* La provincia se conversa después: el formulario no la pregunta. */
    id_provincia: {
      type: DataTypes.INTEGER,
      references: {
        model: Provincia,
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize: dbContactos, // Cambiado para usar dbContactos
    modelName: "Contacto",
    tableName: "contactos",
    timestamps: false
  }
);

export default Contacto;
