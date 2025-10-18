import { DataTypes, Model } from "sequelize";
import { dbContactos } from "../db.js";

class Sector extends Model {}

Sector.init(
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
    modelName: "Sector",
    tableName: "sectores",
    timestamps: false
  }
);

export default Sector;
