const express = require("express");
const { Recipe } = require("../db"); // Importa el modelo Recipe
const axios = require("axios");
require("dotenv").config();
const { Op } = require("sequelize"); // Importa el operador para realizar consultas LIKE en Sequelize

const getRecipesByName = async (req, res) => {
  const Name = req.query.name;
  try {
    const recipes = await Recipe.findAll({
      where: {
        name: {
          [Op.iLike]: `%${Name}%`,
        },
      },
    });

    if (recipes.length === 0) {
      const apiKey = process.env.API_KEY;
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${Name}`
      );
      const apiRecipes = response.data.results;
      return res.json(apiRecipes);
    }
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = getRecipesByName;
