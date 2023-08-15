const { DataTypes } = require("sequelize");
const Diets = (sequelize) => {
  const Diets = sequelize.define("Diets", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Diets;
};

module.exports = Diets