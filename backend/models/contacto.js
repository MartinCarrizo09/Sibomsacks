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
    apellido: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    correo: {
      type: DataTypes.TEXT,
      allowNull: false
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
    id_provincia: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
