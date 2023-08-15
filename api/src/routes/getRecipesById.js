const express = require("express");
const { Recipe, Diets } = require('../db'); 
const axios = require("axios");
require("dotenv").config();

// Ruta para obtener el detalle de una receta específica
const getRecipesById = async (req, res) => {
  console.log("entrando a getRecipesById")
  const idRecipe = req.params.idRecipe;
  console.log(idRecipe)

  try {
    let recipe;
    console.log("Consultando la base de datos para la receta:", idRecipe)
    recipe = await Recipe.findByPk(idRecipe, {
      include: {
        model: Diets,
        through: 'RecipeDiets',
      },
    });
    if (!recipe) {
      const apiKey = process.env.API_KEY;
      console.log("Haciendo petición a la API externa para la receta:", idRecipe);
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${apiKey}`);
      recipe = response.data;
      console.log("ID de la receta:", recipe)
    }
    console.log("Datos de la receta obtenidos:", recipe);
    if (!recipe) {
      return res
        .status(404)
        .json({ message: "Receta no encontrada" });
    }

    res.json(recipe);
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = getRecipesById;