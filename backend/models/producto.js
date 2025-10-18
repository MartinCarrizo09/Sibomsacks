import { DataTypes, Model } from "sequelize";
import { dbProductos } from "../db.js"; // Cambiado para usar dbProductos

class Producto extends Model {}

Producto.init(
    {
       id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
       }, 
       nombre: {
        type: DataTypes.TEXT,
        field: "nombre",
        allowNull: false, 
        unique: true
       },
       material: {
        type: DataTypes.TEXT,
        field: "material" // Corregido: antes tenía el mismo field que color
       },
       color: {
        type: DataTypes.TEXT,
        field: "color"
       }, 
       tipoCostura: {
        type: DataTypes.TEXT,
        field: "tipoCostura"
       },
       tipoTejido: {
        type: DataTypes.TEXT,
        field: "tipoTejido"
       },
       forroInterior: {
        type: DataTypes.TEXT,
        field: "forroInterior"
       }, 
       paletaRecomendada: {
        type: DataTypes.TEXT,
        field: "paletaRecomendada"
       },
       dimensionesInternas: {
        type: DataTypes.TEXT,
        field: "dimensionesInternas"
       },
       altura: {
        type: DataTypes.INTEGER,
        field: "altura"
       }
    },
    {
        sequelize: dbProductos, // Cambiado para usar dbProductos
        modelName: "Producto",
        tableName: "productos",
        timestamps: false
    }
);

export default Producto;