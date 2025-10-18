import { DataTypes, Model } from "sequelize";
import { dbContactos } from "../db.js";

class Provincia extends Model {}

Provincia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: dbContactos, // Cambiado para usar dbContactos
    modelName: "Provincia",
    tableName: "provincias",
    timestamps: false
  }
);

export default Provincia;
