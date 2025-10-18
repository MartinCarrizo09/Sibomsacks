import { DataTypes, Model } from "sequelize";
import { dbProductos } from "../db.js";
import Producto from "./producto.js";

class CaracteristicasGenerales extends Model {}

CaracteristicasGenerales.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    producto_nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: Producto,
        key: "nombre",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    tipo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id_tipo: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  },
  {
    sequelize: dbProductos, // Cambiado para usar dbProductos
    modelName: "CaracteristicasGenerales",
    tableName: "caracteristicasGenerales",
    timestamps: false,
  }
);

export default CaracteristicasGenerales;
