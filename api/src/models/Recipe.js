const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const Recipe = (sequelize) => {
  // defino el modelo
  const Recipe = sequelize.define("Recipe", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    diets: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    steps: {
      type: DataTypes.JSON,
      allowNull: false
    }
  });
  return Recipe;
}; 

module.exports = Recipe
